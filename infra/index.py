import calendar
import hashlib
import hmac
import html
import json
import os
import re
import secrets
import time
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from decimal import Decimal
from zoneinfo import ZoneInfo

import boto3
from boto3.dynamodb.conditions import Attr

TABLE = boto3.resource("dynamodb").Table(os.environ["TABLE_NAME"])
SES = boto3.client("sesv2")
SSM = boto3.client("ssm")
SITE_URL = os.environ["SITE_URL"].rstrip("/")
FROM_EMAIL = os.environ["FROM_EMAIL"]
TURNSTILE_PARAMETER = os.environ["TURNSTILE_PARAMETER"]
CONSENT_PARAMETER = os.environ["CONSENT_PARAMETER"]
SANTORINI_TIMEZONE = ZoneInfo("Europe/Athens")
EMAIL_RE = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")
ALLOWED_LANGUAGES = {"en", "ru", "he"}
ALLOWED_HOSTNAMES = {"santorini.quest", "www.santorini.quest"}
ALLOWED_STYLES = {"Active & Adventure", "Beach & Relaxation", "Sightseeing & Culture", "Instagram & Photography", "Romantic", "Wedding & Honeymoon", "Family", "Food & Wine", "Nightlife", "Wellness & Slow Travel", "Luxury", "Local & Authentic"}
_secrets_cache = {}


def secret_parameter(name):
    if name not in _secrets_cache:
        _secrets_cache[name] = SSM.get_parameter(Name=name, WithDecryption=True)["Parameter"]["Value"]
    return _secrets_cache[name]


def decimal_default(value):
    if isinstance(value, Decimal):
        return int(value) if value == value.to_integral_value() else float(value)
    raise TypeError


def response(status_code, body):
    return {"statusCode": status_code, "headers": {"access-control-allow-origin": SITE_URL, "access-control-allow-headers": "content-type", "access-control-allow-methods": "GET,POST,OPTIONS", "content-type": "application/json", "cache-control": "no-store"}, "body": json.dumps(body, default=decimal_default)}


def add_months(value, months):
    month_index = value.month - 1 + months
    year, month = value.year + month_index // 12, month_index % 12 + 1
    return value.replace(year=year, month=month, day=min(value.day, calendar.monthrange(year, month)[1]))


def parse_local_datetime(date_text, time_text, label):
    try:
        return datetime.fromisoformat(f"{date_text}T{time_text}").replace(tzinfo=SANTORINI_TIMEZONE)
    except (TypeError, ValueError):
        raise ValueError(f"{label} date and time are invalid.")


def validate_payload(payload):
    name = " ".join(str(payload.get("name", "")).strip().split())
    if not 1 <= len(name) <= 100: raise ValueError("Travel Adventure name must contain 1 to 100 characters.")
    arrival_date, arrival_time = str(payload.get("arrivalDate", "")), str(payload.get("arrivalTime", ""))
    departure_date, departure_time = str(payload.get("departureDate", "")), str(payload.get("departureTime", ""))
    arrival, departure = parse_local_datetime(arrival_date, arrival_time, "Arrival"), parse_local_datetime(departure_date, departure_time, "Departure")
    now = datetime.now(SANTORINI_TIMEZONE)
    if arrival <= now: raise ValueError("Arrival date and time must be in the future.")
    if departure <= arrival: raise ValueError("Departure date and time must be later than arrival date and time.")
    if departure.date() > add_months(now.date(), 3): raise ValueError("Departure must be within three months.")
    try: travelers = int(payload.get("travelers", 0))
    except (TypeError, ValueError): raise ValueError("Number of travelers must be between 1 and 50.")
    if not 1 <= travelers <= 50: raise ValueError("Number of travelers must be between 1 and 50.")
    styles = list(dict.fromkeys(payload.get("styles", []))) if isinstance(payload.get("styles"), list) else []
    if not styles or any(style not in ALLOWED_STYLES for style in styles): raise ValueError("Select at least one valid travel style.")
    return {"name": name, "arrivalDate": arrival_date, "arrivalTime": arrival_time, "departureDate": departure_date, "departureTime": departure_time, "arrivalAt": int(arrival.timestamp()), "expiresAt": int(departure.timestamp()), "numberDays": max(1, (departure.date() - arrival.date()).days), "travelers": travelers, "styles": styles}


def create_quest(payload):
    values = validate_payload(payload)
    for _ in range(5):
        quest_id = secrets.token_urlsafe(18)
        item = {"id": quest_id, **values, "createdAt": datetime.now(timezone.utc).isoformat()}
        try:
            TABLE.put_item(Item=item, ConditionExpression=Attr("id").not_exists())
            return response(201, {"quest": item, "url": f"{SITE_URL}/?quest={quest_id}"})
        except TABLE.meta.client.exceptions.ConditionalCheckFailedException: pass
    return response(500, {"message": "Could not create a unique Travel Adventure. Please retry."})


def get_quest(quest_id):
    item = TABLE.get_item(Key={"id": quest_id}, ConsistentRead=True).get("Item")
    if not item: return response(404, {"message": "Travel Adventure not found."})
    if int(item["expiresAt"]) <= int(time.time()):
        TABLE.delete_item(Key={"id": quest_id})
        return response(410, {"message": "This Travel Adventure has expired."})
    return response(200, {"quest": item})


def client_ip(event):
    return event.get("requestContext", {}).get("http", {}).get("sourceIp", "unknown")


def rate_limit(kind, value, maximum):
    window = int(time.time()) // 3600
    digest = hashlib.sha256(value.encode()).hexdigest()
    key = f"rate#{kind}#{digest}#{window}"
    try:
        TABLE.update_item(Key={"id": key}, UpdateExpression="SET expiresAt=:ttl ADD #count :one", ExpressionAttributeNames={"#count": "count"}, ExpressionAttributeValues={":ttl": int(time.time()) + 7200, ":one": 1, ":max": maximum}, ConditionExpression="attribute_not_exists(#count) OR #count < :max")
    except TABLE.meta.client.exceptions.ConditionalCheckFailedException:
        raise ValueError("Too many requests. Please try again later.")


def verify_turnstile(token, ip):
    if not token: return False
    body = urllib.parse.urlencode({"secret": secret_parameter(TURNSTILE_PARAMETER), "response": token, "remoteip": ip}).encode()
    request = urllib.request.Request("https://challenges.cloudflare.com/turnstile/v0/siteverify", data=body, method="POST")
    with urllib.request.urlopen(request, timeout=4) as result:
        data = json.loads(result.read())
    return bool(data.get("success") and data.get("action") == "send_itinerary" and data.get("hostname") in ALLOWED_HOSTNAMES)


def safe_planner(value):
    if value is None: return None
    encoded = json.dumps(value, separators=(",", ":"))
    if len(encoded.encode()) > 180000: raise ValueError("The itinerary is too large to email.")
    if not isinstance(value, dict) or value.get("version") != 1 or not isinstance(value.get("days"), list): raise ValueError("The itinerary data is invalid.")
    return json.loads(encoded, parse_float=Decimal)


def email_content(quest, link, language):
    translations = {
        "en": ("Your Santorini Travel Adventure", "View My Travel Adventure", "You requested a link to your personalized Santorini itinerary.", "Unsubscribe from promotional email"),
        "ru": ("Ваше путешествие по Санторини", "Открыть моё путешествие", "Вы запросили ссылку на персональный маршрут по Санторини.", "Отписаться от рекламных писем"),
        "he": ("הרפתקת הטיול שלכם בסנטוריני", "לצפייה בהרפתקת הטיול", "ביקשתם קישור למסלול האישי שלכם בסנטוריני.", "הסרה מדיוור שיווקי")}
    title, button, intro, _ = translations[language]
    subject = f"{title} — {quest['name']}"
    dates = f"{quest['arrivalDate']} {quest['arrivalTime']} — {quest['departureDate']} {quest['departureTime']}"
    escaped_link, escaped_name = html.escape(link), html.escape(str(quest["name"]))
    html_body = f'''<!doctype html><html><body style="margin:0;background:#f5f8fc;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;color:#002349"><div style="max-width:620px;margin:0 auto;padding:32px 20px"><div style="background:linear-gradient(145deg,#002349,#0038ff);color:white;border-radius:24px;padding:36px"><div style="font-size:13px;letter-spacing:.14em;color:#b8c8ff">SANTORINI.QUEST</div><h1 style="font-size:34px;margin:18px 0 8px">{html.escape(title)}</h1><h2 style="font-size:25px;margin:0 0 16px">{escaped_name}</h2><p style="color:#dbe4ff">{html.escape(dates)}</p></div><div style="background:white;border-radius:24px;padding:32px;margin-top:16px"><p>{html.escape(intro)}</p><p style="margin:28px 0"><a href="{escaped_link}" style="display:inline-block;padding:15px 22px;background:#0038ff;color:white;text-decoration:none;border-radius:12px;font-weight:700">{html.escape(button)}</a></p><p style="font-size:13px;word-break:break-all"><a href="{escaped_link}">{escaped_link}</a></p></div></div></body></html>'''
    text_body = f"{title}\n\n{quest['name']}\n{dates}\n\n{intro}\n{link}"
    return subject, html_body, text_body


def consent_token(email_hash):
    return hmac.new(secret_parameter(CONSENT_PARAMETER).encode(), email_hash.encode(), hashlib.sha256).hexdigest()


def send_adventure(event, quest_id, payload):
    email = str(payload.get("email", "")).strip().lower()
    if len(email) > 254 or not EMAIL_RE.fullmatch(email): raise ValueError("Enter a valid email address.")
    language = payload.get("language") if payload.get("language") in ALLOWED_LANGUAGES else "en"
    ip = client_ip(event)
    if not verify_turnstile(str(payload.get("turnstileToken", "")), ip): raise ValueError("Security verification failed. Please try again.")
    rate_limit("ip", ip, 10); rate_limit("email", email, 3)
    original = TABLE.get_item(Key={"id": quest_id}, ConsistentRead=True).get("Item")
    if not original or int(original["expiresAt"]) <= int(time.time()): return response(404, {"message": "Travel Adventure not found."})
    share_id = secrets.token_urlsafe(32)
    shared = {**original, "id": share_id, "sourceQuestId": quest_id, "planner": safe_planner(payload.get("planner")), "sharedAt": datetime.now(timezone.utc).isoformat()}
    TABLE.put_item(Item=shared, ConditionExpression=Attr("id").not_exists())
    link = f"{SITE_URL}/?quest={share_id}"
    subject, html_body, text_body = email_content(shared, link, language)
    SES.send_email(FromEmailAddress=FROM_EMAIL, Destination={"ToAddresses": [email]}, Content={"Simple": {"Subject": {"Data": subject, "Charset": "UTF-8"}, "Body": {"Html": {"Data": html_body, "Charset": "UTF-8"}, "Text": {"Data": text_body, "Charset": "UTF-8"}}}})
    if payload.get("marketingConsent") is True:
        email_hash = hashlib.sha256(email.encode()).hexdigest()
        TABLE.put_item(Item={"id": f"consent#{email_hash}", "email": email, "emailHash": email_hash, "consentStatus": True, "consentTimestamp": datetime.now(timezone.utc).isoformat(), "consentVersion": str(payload.get("consentVersion", ""))[:80], "consentWording": str(payload.get("consentWording", ""))[:1000], "source": "Santorini.quest", "language": language, "unsubscribeToken": consent_token(email_hash)})
    return response(202, {"message": "Your Travel Adventure is on its way! Check your inbox."})


def unsubscribe(payload):
    token = str(payload.get("token", ""))
    if not re.fullmatch(r"[0-9a-f]{64}", token): raise ValueError("Invalid unsubscribe link.")
    scan = TABLE.scan(FilterExpression=Attr("unsubscribeToken").eq(token), ProjectionExpression="id,emailHash")
    item = next(iter(scan.get("Items", [])), None)
    if item and hmac.compare_digest(consent_token(item["emailHash"]), token):
        TABLE.update_item(Key={"id": item["id"]}, UpdateExpression="SET consentStatus=:status, unsubscribedAt=:at", ExpressionAttributeValues={":status": False, ":at": datetime.now(timezone.utc).isoformat()})
    return response(200, {"message": "Unsubscribed."})


def lambda_handler(event, context):
    method = event.get("requestContext", {}).get("http", {}).get("method", "")
    path = event.get("rawPath", "")
    if method == "OPTIONS": return response(204, {})
    try:
        payload = json.loads(event.get("body") or "{}") if method == "POST" else {}
        if method == "POST" and path == "/quests": return create_quest(payload)
        if method == "POST" and path == "/unsubscribe": return unsubscribe(payload)
        if method == "POST" and path.startswith("/quests/") and path.endswith("/email"):
            return send_adventure(event, path.split("/")[2], payload)
        if method == "GET" and path.startswith("/quests/"): return get_quest(path.rsplit("/", 1)[-1])
        return response(404, {"message": "Not found."})
    except ValueError as error: return response(400, {"message": str(error)})
    except json.JSONDecodeError: return response(400, {"message": "Request body must be valid JSON."})
    except Exception as error:
        print(json.dumps({"level": "error", "type": type(error).__name__, "requestId": getattr(context, "aws_request_id", None)}))
        return response(500, {"message": "Unexpected server error."})
