(() => {
  "use strict";
  const API_URL = "https://pbvoeysg9a.execute-api.us-east-1.amazonaws.com";
  const CONSENT_VERSION = "2026-10-11-v1";
  const copy = {
    en: { heading:"Get Your Travel Adventure", description:"Enter your email address and we’ll send you a link to your personalized Santorini itinerary.", label:"Your email address", consent:"I agree to receive travel news, special offers, promotions, and updates about new travel experiences and partner offers by email.", send:"Send My Travel Adventure", sending:"Sending…", legal:'Subscription is optional. You can unsubscribe at any time. See our <a href="/privacy.html">Privacy Policy</a> and <a href="/subscription-terms.html">Subscription Terms</a>.', invalid:"Enter a valid email address.", captcha:"Please complete the security check.", success:"Your Travel Adventure is on its way! Check your inbox.", error:"We couldn’t send your Travel Adventure. Please try again." },
    ru: { heading:"Получите своё путешествие", description:"Введите email, и мы отправим ссылку на ваш персональный маршрут по Санторини.", label:"Ваш email", consent:"Я согласен(на) получать по email новости о путешествиях, специальные предложения, акции, обновления и предложения партнёров.", send:"Отправить моё путешествие", sending:"Отправляем…", legal:'Подписка необязательна. Отписаться можно в любое время. См. <a href="/privacy.html">Политику конфиденциальности</a> и <a href="/subscription-terms.html">Условия подписки</a>.', invalid:"Введите корректный email.", captcha:"Пройдите проверку безопасности.", success:"Ваше путешествие уже в пути! Проверьте почту.", error:"Не удалось отправить путешествие. Попробуйте ещё раз." },
    he: { heading:"קבלו את הרפתקת הטיול שלכם", description:"הזינו כתובת אימייל ונשלח קישור למסלול האישי שלכם בסנטוריני.", label:"כתובת האימייל שלכם", consent:"אני מסכים/ה לקבל באימייל חדשות תיירות, מבצעים, הטבות, עדכונים וחוויות חדשות והצעות משותפים.", send:"שליחת הרפתקת הטיול", sending:"שולחים…", legal:'ההרשמה אינה חובה. ניתן להסיר את ההרשמה בכל עת. ראו <a href="/privacy.html">מדיניות פרטיות</a> ו<a href="/subscription-terms.html">תנאי הרשמה</a>.', invalid:"יש להזין כתובת אימייל תקינה.", captcha:"יש להשלים את בדיקת האבטחה.", success:"הרפתקת הטיול בדרך! בדקו את תיבת הדואר.", error:"לא הצלחנו לשלוח את ההרפתקה. נסו שוב." }
  };
  const form = document.querySelector("#emailAdventureForm");
  if (!form || form.hidden) return;
  const status = document.querySelector("#emailStatus");
  const button = document.querySelector("#sendAdventureButton");
  const language = () => copy[localStorage.getItem("santorini-language")] ? localStorage.getItem("santorini-language") : "en";
  const applyCopy = () => {
    const c=copy[language()];
    document.querySelector("#emailHeading").textContent=c.heading;
    document.querySelector("#emailDescription").textContent=c.description;
    document.querySelector("#emailLabel").textContent=c.label;
    document.querySelector("#consentText").textContent=c.consent;
    button.textContent=c.send;
    document.querySelector("#emailLegal").innerHTML=c.legal;
  };
  document.querySelector("#languageSelect")?.addEventListener("change",()=>setTimeout(applyCopy));
  applyCopy();
  form.addEventListener("submit", async event => {
    event.preventDefault();
    const c=copy[language()], email=document.querySelector("#adventureEmail");
    status.className="email-status"; status.textContent="";
    if(!email.checkValidity()){ status.classList.add("error"); status.textContent=c.invalid; email.focus(); return; }
    const token=window.turnstile?.getResponse?.();
    if(!token){ status.classList.add("error"); status.textContent=c.captcha; return; }
    if(!window.santoriniQuest?.id){ status.classList.add("error"); status.textContent=c.error; return; }
    button.disabled=true; button.textContent=c.sending;
    try {
      const response=await fetch(`${API_URL}/quests/${encodeURIComponent(window.santoriniQuest.id)}/email`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({email:email.value.trim(),language:language(),marketingConsent:document.querySelector("#marketingConsent").checked,consentVersion:CONSENT_VERSION,consentWording:copy.en.consent,planner:window.__santoriniPlanner?.getState?.()||null,turnstileToken:token})});
      const result=await response.json().catch(()=>({}));
      if(!response.ok) throw new Error(result.message||c.error);
      status.classList.add("success"); status.textContent=c.success; form.reset(); window.turnstile?.reset?.();
    } catch(error) { status.classList.add("error"); status.textContent=error.message||c.error; window.turnstile?.reset?.(); }
    finally { button.disabled=false; button.textContent=c.send; }
  });
})();
