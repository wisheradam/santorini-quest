(() => {
  "use strict";

  const I18N = {
    en: {
      language: "Language", planner: "Daily Timeline Planner", eyebrow: "Santorini itinerary", autoPlan: "Auto-Plan My Adventure",
      overview: "Multi-day overview", editTrip: "Edit trip dates", day: "Day", activities: "activities", activity: "activity",
      completed: "completed", available: "Available", unscheduled: "Unscheduled Adventures", unscheduledHelp: "Drag an activity into a day, or use Move to Day.",
      emptyDay: "No activities yet. Drag an adventure here or use Auto-Plan.", emptyUnscheduled: "Everything is scheduled. You can return activities here at any time.",
      edit: "Edit", moveTo: "Move to Day", moveUnscheduled: "Return to unscheduled", remove: "Remove", restore: "Restore removed activities",
      startTime: "Start time", duration: "Duration", minutes: "minutes", save: "Save changes", cancel: "Cancel", tripSettings: "Trip dates and times",
      arrivalDate: "Arrival date", arrivalTime: "Arrival time", departureDate: "Departure date", departureTime: "Departure time",
      invalidDates: "Departure must be later than arrival.", confirmPlan: "Auto-planning will replace your current day schedules. Continue?",
      planned: "Your adventure has been auto-planned.", saved: "Changes saved on this device.", moved: "Activity moved.", restored: "Removed activities restored.",
      overlap: "Overlaps another activity", travel: "Not enough travel time from the previous location", outside: "Outside this day’s available travel window",
      opening: "Conflicts with verified opening hours", noDuplicate: "This activity is already in your itinerary.", export: "Save Travel Adventure as Image",
      tripProgress: "Travel Adventure", completeOf: "of", localTime: "Santorini local time", noRemoved: "No removed activities", removeTitle: "Remove from itinerary",
      removeConfirm: "Remove this activity? You can restore it later.", fullDay: "Full travel day", show: "Show", hide: "Hide"
    },
    ru: {
      language: "Язык", planner: "Планировщик по дням", eyebrow: "Маршрут по Санторини", autoPlan: "Спланировать путешествие",
      overview: "Обзор всех дней", editTrip: "Изменить даты", day: "День", activities: "занятий", activity: "занятие",
      completed: "выполнено", available: "Доступно", unscheduled: "Без даты", unscheduledHelp: "Перетащите занятие в день или используйте меню переноса.",
      emptyDay: "На этот день пока ничего нет. Перетащите занятие или запустите автопланирование.", emptyUnscheduled: "Все занятия распределены. Их можно вернуть сюда в любой момент.",
      edit: "Изменить", moveTo: "Перенести в день", moveUnscheduled: "Вернуть без даты", remove: "Удалить", restore: "Восстановить удалённые",
      startTime: "Время начала", duration: "Длительность", minutes: "минут", save: "Сохранить", cancel: "Отмена", tripSettings: "Даты и время поездки",
      arrivalDate: "Дата прибытия", arrivalTime: "Время прибытия", departureDate: "Дата отъезда", departureTime: "Время отъезда",
      invalidDates: "Отъезд должен быть позже прибытия.", confirmPlan: "Автопланирование заменит текущий график. Продолжить?",
      planned: "Путешествие спланировано.", saved: "Изменения сохранены на этом устройстве.", moved: "Занятие перенесено.", restored: "Удалённые занятия восстановлены.",
      overlap: "Пересекается с другим занятием", travel: "Недостаточно времени на дорогу", outside: "За пределами доступного времени этого дня",
      opening: "Конфликт с подтверждёнными часами работы", noDuplicate: "Это занятие уже добавлено.", export: "Сохранить путешествие как изображение",
      tripProgress: "Путешествие", completeOf: "из", localTime: "местное время Санторини", noRemoved: "Нет удалённых занятий", removeTitle: "Удалить из маршрута",
      removeConfirm: "Удалить занятие? Его можно будет восстановить.", fullDay: "Полный день", show: "Показать", hide: "Скрыть"
    },
    he: {
      language: "שפה", planner: "מתכנן מסלול יומי", eyebrow: "מסלול בסנטוריני", autoPlan: "תכנן את ההרפתקה שלי",
      overview: "סקירת כל הימים", editTrip: "עריכת תאריכים", day: "יום", activities: "פעילויות", activity: "פעילות",
      completed: "הושלמו", available: "זמין", unscheduled: "הרפתקאות ללא תאריך", unscheduledHelp: "גררו פעילות ליום או השתמשו בתפריט ההעברה.",
      emptyDay: "אין פעילויות עדיין. גררו הרפתקה לכאן או השתמשו בתכנון אוטומטי.", emptyUnscheduled: "כל הפעילויות שובצו. אפשר להחזיר לכאן פעילויות בכל עת.",
      edit: "עריכה", moveTo: "העברה ליום", moveUnscheduled: "החזרה ללא תאריך", remove: "הסרה", restore: "שחזור פעילויות שהוסרו",
      startTime: "שעת התחלה", duration: "משך", minutes: "דקות", save: "שמירת שינויים", cancel: "ביטול", tripSettings: "תאריכי ושעות הטיול",
      arrivalDate: "תאריך הגעה", arrivalTime: "שעת הגעה", departureDate: "תאריך יציאה", departureTime: "שעת יציאה",
      invalidDates: "היציאה חייבת להיות לאחר ההגעה.", confirmPlan: "התכנון האוטומטי יחליף את לוח הזמנים הנוכחי. להמשיך?",
      planned: "ההרפתקה תוכננה אוטומטית.", saved: "השינויים נשמרו במכשיר זה.", moved: "הפעילות הועברה.", restored: "הפעילויות שהוסרו שוחזרו.",
      overlap: "חופפת לפעילות אחרת", travel: "אין מספיק זמן נסיעה מהמיקום הקודם", outside: "מחוץ לחלון הזמן הזמין ביום זה",
      opening: "התנגשות עם שעות פתיחה מאומתות", noDuplicate: "הפעילות כבר נמצאת במסלול.", export: "שמירת ההרפתקה כתמונה",
      tripProgress: "הרפתקת הטיול", completeOf: "מתוך", localTime: "שעון סנטוריני", noRemoved: "אין פעילויות שהוסרו", removeTitle: "הסרה מהמסלול",
      removeConfirm: "להסיר את הפעילות? אפשר לשחזר אותה בהמשך.", fullDay: "יום טיול מלא", show: "הצגה", hide: "הסתרה"
    }
  };

  const TITLES = {
    oia: { en: "Oia village & blue domes", ru: "Ия и голубые купола", he: "הכפר אויה והכיפות הכחולות" },
    sunset: { en: "Oia sunset viewpoint", ru: "Закатная площадка в Ие", he: "נקודת השקיעה באויה" },
    fira: { en: "Fira old town walk", ru: "Прогулка по старому городу Фиры", he: "סיור בעיר העתיקה של פירה" },
    akrotiri: { en: "Akrotiri archaeological site", ru: "Археологический комплекс Акротири", he: "האתר הארכאולוגי אקרוטירי" },
    redbeach: { en: "Red Beach viewpoint", ru: "Смотровая площадка Красного пляжа", he: "תצפית החוף האדום" },
    volcano: { en: "Volcano & hot springs cruise", ru: "Круиз к вулкану и горячим источникам", he: "שיט להר הגעש ולמעיינות החמים" },
    winery: { en: "Santorini winery tasting", ru: "Дегустация в винодельне", he: "טעימות ביקב סנטוריני" },
    pyrgos: { en: "Pyrgos village & castle", ru: "Деревня Пиргос и крепость", he: "הכפר פירגוס והטירה" },
    perissa: { en: "Perissa black-sand beach", ru: "Чёрный пляж Перисса", he: "החוף השחור פריסה" },
    hike: { en: "Fira to Oia caldera hike", ru: "Поход из Фиры в Ию", he: "טיול קלדרה מפירה לאויה" },
    ammoudi: { en: "Ammoudi Bay seafood dinner", ru: "Ужин с морепродуктами в Аммуди", he: "ארוחת דגים במפרץ אמודי" },
    museum: { en: "Museum of Prehistoric Thera", ru: "Музей доисторической Тиры", he: "מוזיאון תירה הפרהיסטורית" },
    kayak: { en: "South-coast sea kayaking", ru: "Каякинг вдоль южного берега", he: "קיאקים בחוף הדרומי" },
    spa: { en: "Caldera-view wellness session", ru: "Спа с видом на кальдеру", he: "טיפול ספא מול הקלדרה" },
    megalochori: { en: "Megalochori village stroll", ru: "Прогулка по Мегалохори", he: "טיול בכפר מגלוכורי" },
    catamaran: { en: "Caldera catamaran experience", ru: "Катамаран по кальдере", he: "שיט קטמרן בקלדרה" }
  };

  const CATALOG = [
    { id:"oia", icon:"◉", duration:120, area:"north", styles:["Sightseeing & Culture","Instagram & Photography","Romantic","Local & Authentic"] },
    { id:"sunset", icon:"☀", duration:90, area:"north", sunset:true, styles:["Instagram & Photography","Romantic","Wedding & Honeymoon"] },
    { id:"fira", icon:"⌂", duration:120, area:"central", styles:["Sightseeing & Culture","Local & Authentic","Nightlife"] },
    { id:"akrotiri", icon:"◇", duration:120, area:"south", open:[480,930], verified:false, styles:["Sightseeing & Culture","Family"] },
    { id:"redbeach", icon:"≈", duration:75, area:"south", styles:["Beach & Relaxation","Instagram & Photography","Family"] },
    { id:"volcano", icon:"△", duration:300, area:"caldera", styles:["Active & Adventure","Family","Luxury"] },
    { id:"winery", icon:"♢", duration:120, area:"central", styles:["Food & Wine","Romantic","Luxury"] },
    { id:"pyrgos", icon:"♜", duration:120, area:"central", styles:["Sightseeing & Culture","Instagram & Photography","Local & Authentic"] },
    { id:"perissa", icon:"☂", duration:180, area:"south-east", styles:["Beach & Relaxation","Family","Wellness & Slow Travel"] },
    { id:"hike", icon:"↗", duration:240, area:"north", styles:["Active & Adventure","Instagram & Photography"] },
    { id:"ammoudi", icon:"◌", duration:120, area:"north", styles:["Food & Wine","Romantic","Luxury"] },
    { id:"museum", icon:"▦", duration:90, area:"central", open:[510,930], verified:false, styles:["Sightseeing & Culture","Family"] },
    { id:"kayak", icon:"≋", duration:150, area:"south", styles:["Active & Adventure","Beach & Relaxation"] },
    { id:"spa", icon:"✦", duration:90, area:"central", styles:["Wellness & Slow Travel","Luxury","Romantic"] },
    { id:"megalochori", icon:"⌁", duration:90, area:"central", styles:["Local & Authentic","Sightseeing & Culture","Food & Wine"] },
    { id:"catamaran", icon:"◢", duration:300, area:"caldera", styles:["Luxury","Romantic","Wedding & Honeymoon","Beach & Relaxation"] }
  ];

  const planner = document.querySelector("#planner");
  if (!planner) return;
  let quest;
  let state;
  let activeDay = 0;
  let draggedId = null;
  let overview = false;
  let editingId = null;
  let toastTimer;
  let lang = localStorage.getItem("santorini-language") || "en";
  const t = (key) => I18N[lang][key] || I18N.en[key] || key;
  const titleFor = (id) => (TITLES[id] && (TITLES[id][lang] || TITLES[id].en)) || id;
  const byId = (id) => CATALOG.find((item) => item.id === id);
  const pad = (value) => String(value).padStart(2,"0");
  const minutes = (time) => { const [h,m] = time.split(":").map(Number); return h * 60 + m; };
  const timeText = (value) => `${pad(Math.floor(value / 60))}:${pad(value % 60)}`;
  const addDays = (dateText, offset) => { const d = new Date(`${dateText}T12:00:00Z`); d.setUTCDate(d.getUTCDate()+offset); return d.toISOString().slice(0,10); };
  const dateLabel = (value, options={month:"short",day:"numeric"}) => new Intl.DateTimeFormat(lang === "he" ? "he-IL" : lang === "ru" ? "ru-RU" : "en-US", {...options,timeZone:"UTC"}).format(new Date(`${value}T12:00:00Z`));
  const uid = () => `a-${Math.random().toString(36).slice(2,9)}-${Date.now().toString(36)}`;

  function tripKey(q) {
    return `santorini-planner:${q.id || [q.name,q.arrivalDate,q.departureDate].join("-")}`;
  }

  function makeDays(q) {
    const start = new Date(`${q.arrivalDate}T12:00:00Z`);
    const end = new Date(`${q.departureDate}T12:00:00Z`);
    const count = Math.floor((end-start)/86400000)+1;
    return Array.from({length:Math.max(1,count)},(_,index)=>({date:addDays(q.arrivalDate,index),activities:[]}));
  }

  function newState(q) {
    const preferred = new Set(q.styles || []);
    const ordered = [...CATALOG].sort((a,b)=>Number(b.styles.some(x=>preferred.has(x)))-Number(a.styles.some(x=>preferred.has(x))));
    return {
      version: 1,
      trip: { arrivalDate:q.arrivalDate, arrivalTime:q.arrivalTime, departureDate:q.departureDate, departureTime:q.departureTime },
      days: makeDays(q),
      unscheduled: ordered.map(item=>({instanceId:uid(),catalogId:item.id,start:null,duration:item.duration,completed:false})),
      removed: []
    };
  }

  function normalizeState(saved,q) {
    if (!saved || saved.version !== 1) return newState(q);
    const allCatalogIds = new Set([
      ...saved.days.flatMap(day=>day.activities), ...saved.unscheduled, ...saved.removed
    ].map(item=>item.catalogId));
    CATALOG.forEach(item=>{ if(!allCatalogIds.has(item.id)) saved.unscheduled.push({instanceId:uid(),catalogId:item.id,start:null,duration:item.duration,completed:false}); });
    return saved;
  }

  function loadState(q) {
    try { return normalizeState(JSON.parse(localStorage.getItem(tripKey(q))) || q.planner,q); }
    catch { return newState(q); }
  }

  function saveState(silent=true) {
    localStorage.setItem(tripKey(quest),JSON.stringify(state));
    if (!silent) notify(t("saved"));
  }

  function dayWindow(index) {
    const day = state.days[index];
    const first = day.date === state.trip.arrivalDate;
    const last = day.date === state.trip.departureDate;
    return { start:first ? minutes(state.trip.arrivalTime) : 540, end:last ? minutes(state.trip.departureTime) : 1320 };
  }

  function travelMinutes(a,b) {
    if (!a || !b) return 0;
    if (a === b) return 12;
    if (a === "caldera" || b === "caldera") return 35;
    const pair = new Set([a,b]);
    if (pair.has("north") && (pair.has("south") || pair.has("south-east"))) return 45;
    return 28;
  }

  function activityLocation(instanceId) {
    for (let dayIndex=0; dayIndex<state.days.length; dayIndex++) {
      const index = state.days[dayIndex].activities.findIndex(item=>item.instanceId===instanceId);
      if (index>=0) return {type:"day",dayIndex,index,item:state.days[dayIndex].activities[index]};
    }
    let index=state.unscheduled.findIndex(item=>item.instanceId===instanceId);
    if(index>=0) return {type:"unscheduled",index,item:state.unscheduled[index]};
    index=state.removed.findIndex(item=>item.instanceId===instanceId);
    return index>=0 ? {type:"removed",index,item:state.removed[index]} : null;
  }

  function detach(instanceId) {
    const location=activityLocation(instanceId);
    if(!location) return null;
    if(location.type==="day") return state.days[location.dayIndex].activities.splice(location.index,1)[0];
    return state[location.type].splice(location.index,1)[0];
  }

  function moveActivity(instanceId,destination,index=null) {
    const source=activityLocation(instanceId);
    const item=detach(instanceId);
    if(!item) return;
    if(destination==="unscheduled") { item.start=null; state.unscheduled.push(item); }
    else {
      const target=state.days[Number(destination)].activities;
      if(!item.start) item.start=timeText(nextStart(Number(destination)));
      let insertAt=index===null?target.length:index;
      if(index!==null && source?.type==="day" && source.dayIndex===Number(destination) && source.index<index) insertAt--;
      target.splice(Math.max(0,insertAt),0,item);
      if(index!==null){
        const window=dayWindow(Number(destination));
        let cursor=Math.max(window.start,minutes(target[0].start||timeText(window.start)));
        target.forEach((entry,entryIndex)=>{if(entryIndex===0)cursor=Math.max(window.start,minutes(entry.start||timeText(window.start)));entry.start=timeText(cursor);const next=target[entryIndex+1];cursor+=entry.duration+(next?travelMinutes(byId(entry.catalogId).area,byId(next.catalogId).area):0);});
      } else target.sort((a,b)=>minutes(a.start)-minutes(b.start));
    }
    saveState(); render(); notify(t("moved"));
  }

  function nextStart(dayIndex) {
    const window=dayWindow(dayIndex);
    const list=[...state.days[dayIndex].activities].sort((a,b)=>minutes(a.start)-minutes(b.start));
    if(!list.length) return Math.max(window.start,600);
    const last=list[list.length-1];
    return Math.min(window.end-30,minutes(last.start)+last.duration+30);
  }

  function conflictMap(dayIndex) {
    const warnings={};
    const list=[...state.days[dayIndex].activities].sort((a,b)=>minutes(a.start)-minutes(b.start));
    const window=dayWindow(dayIndex);
    list.forEach((item,index)=>{
      const notes=[];
      const start=minutes(item.start), end=start+Number(item.duration);
      const catalog=byId(item.catalogId);
      if(start<window.start || end>window.end) notes.push(t("outside"));
      if(catalog.verified && catalog.open && (start<catalog.open[0] || end>catalog.open[1])) notes.push(t("opening"));
      const previous=list[index-1];
      if(previous){
        const previousEnd=minutes(previous.start)+Number(previous.duration);
        if(start<previousEnd) notes.push(t("overlap"));
        else if(start-previousEnd<travelMinutes(byId(previous.catalogId).area,catalog.area)) notes.push(t("travel"));
      }
      warnings[item.instanceId]=notes;
    });
    return warnings;
  }

  function progress() {
    const scheduled=state.days.flatMap(day=>day.activities);
    return {done:scheduled.filter(item=>item.completed).length,total:scheduled.length};
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));
  }

  function dayOptions(current) {
    const options=state.days.map((day,index)=>`<option value="${index}" ${current===index?"selected":""}>${escapeHtml(t("day"))} ${index+1} · ${escapeHtml(dateLabel(day.date))}</option>`).join("");
    return `<option value="unscheduled">${escapeHtml(t("moveUnscheduled"))}</option>${options}`;
  }

  function activityCard(item,dayIndex=null) {
    const catalog=byId(item.catalogId);
    const warnings=dayIndex===null?[]:conflictMap(dayIndex)[item.instanceId];
    return `<article class="activity-card ${dayIndex===null?"unscheduled-card":""} ${item.completed?"completed":""} ${warnings&&warnings.length?"has-warning":""}" draggable="true" data-instance-id="${item.instanceId}">
      <time class="activity-time">${item.start||"—"}</time>
      <span class="activity-icon" aria-hidden="true">${catalog.icon}</span>
      <div class="activity-main">
        <div class="activity-row"><div><h4 class="activity-title">${escapeHtml(titleFor(item.catalogId))}</h4><p class="activity-meta">${item.duration} ${escapeHtml(t("minutes"))} · ${escapeHtml(catalog.area.replace("-"," "))}</p></div></div>
        ${warnings&&warnings.length?`<div class="warning-list">${warnings.map(note=>`<span>⚠ ${escapeHtml(note)}</span>`).join("")}</div>`:""}
        <div class="activity-controls">
          <button class="complete-control" type="button" data-action="complete" aria-label="${escapeHtml(t("completed"))}" aria-pressed="${item.completed}">✓</button>
          <button type="button" data-action="edit">${escapeHtml(t("edit"))}</button>
          <select data-action="move" aria-label="${escapeHtml(t("moveTo"))}"><option value="" selected disabled>${escapeHtml(t("moveTo"))}</option>${dayOptions(dayIndex)}</select>
        </div>
      </div>
    </article>`;
  }

  function renderTabs() {
    planner.querySelector("#dayTabs").innerHTML=state.days.map((day,index)=>{
      const done=day.activities.filter(item=>item.completed).length, total=day.activities.length;
      const percent=total?Math.round(done/total*100):0;
      return `<button class="day-tab ${index===activeDay?"active":""}" type="button" role="tab" data-day="${index}" aria-selected="${index===activeDay}">
        <strong>${escapeHtml(t("day"))} ${index+1}</strong><span class="day-date">${escapeHtml(dateLabel(day.date,{weekday:"short",month:"short",day:"numeric"}))}</span>
        <span class="day-count">${done} ${escapeHtml(t("completeOf"))} ${total} ${escapeHtml(t("completed"))} · ${percent}%</span>
        <span class="day-progress-track"><span class="day-progress-fill" style="width:${percent}%"></span></span>
      </button>`;
    }).join("");
  }

  function renderProgress() {
    const value=progress();
    planner.querySelector("#tripProgressCopy").textContent=`${t("tripProgress")} — ${value.done} ${t("completeOf")} ${value.total} ${t("activities")} ${t("completed")}`;
    planner.querySelector("#tripProgressFill").style.width=`${value.total?value.done/value.total*100:0}%`;
  }

  function renderTimeline() {
    const day=state.days[activeDay];
    const window=dayWindow(activeDay);
    planner.querySelector("#timelineTitle").textContent=`${t("day")} ${activeDay+1} · ${dateLabel(day.date,{weekday:"long",month:"long",day:"numeric"})}`;
    planner.querySelector("#dayWindow").textContent=`${t("available")}: ${timeText(window.start)}–${timeText(window.end)}`;
    const list=planner.querySelector("#timelineList");
    const ordered=[...day.activities].sort((a,b)=>minutes(a.start)-minutes(b.start));
    list.innerHTML=ordered.length?ordered.map(item=>activityCard(item,activeDay)).join(""):`<div class="timeline-empty">${escapeHtml(t("emptyDay"))}</div>`;
  }

  function renderUnscheduled() {
    planner.querySelector("#unscheduledTitle").textContent=t("unscheduled");
    planner.querySelector("#unscheduledHelp").textContent=t("unscheduledHelp");
    const list=planner.querySelector("#unscheduledList");
    list.innerHTML=state.unscheduled.length?state.unscheduled.map(item=>activityCard(item,null)).join(""):`<div class="unscheduled-empty">${escapeHtml(t("emptyUnscheduled"))}</div>`;
    const restore=planner.querySelector("#restoreRemoved");
    restore.textContent=state.removed.length?`${t("restore")} (${state.removed.length})`:t("noRemoved");
    restore.disabled=!state.removed.length;
  }

  function renderOverview() {
    const panel=planner.querySelector("#overviewGrid");
    panel.hidden=!overview;
    planner.querySelector("#plannerLayout").hidden=overview;
    planner.querySelector("#overviewButton").setAttribute("aria-pressed",String(overview));
    if(!overview) return;
    panel.style.setProperty("--overview-days",Math.min(3,state.days.length));
    panel.innerHTML=state.days.map((day,index)=>`<section class="overview-day"><h3>${escapeHtml(t("day"))} ${index+1} · ${escapeHtml(dateLabel(day.date))}</h3><div class="overview-day-list">${day.activities.length?[...day.activities].sort((a,b)=>minutes(a.start)-minutes(b.start)).map(item=>`<div class="overview-item"><span>${item.start} · ${item.duration} ${escapeHtml(t("minutes"))}</span>${escapeHtml(titleFor(item.catalogId))}</div>`).join(""):`<div class="overview-item">${escapeHtml(t("emptyDay"))}</div>`}</div></section>`).join("");
  }

  function render() {
    activeDay=Math.min(activeDay,state.days.length-1);
    renderTabs(); renderProgress(); renderTimeline(); renderUnscheduled(); renderOverview(); bindCards();
    planner.querySelector("#plannerTitle").textContent=t("planner");
    planner.querySelector("#plannerEyebrow").textContent=t("eyebrow");
    planner.querySelector("#autoPlanButton").textContent=t("autoPlan");
    planner.querySelector("#overviewButton").textContent=t("overview");
    planner.querySelector("#editTripButton").textContent=t("editTrip");
    planner.querySelector("#localTimeLabel").textContent=t("localTime");
    const toggle=planner.querySelector("#toggleUnscheduled"); toggle.textContent=toggle.getAttribute("aria-expanded")==="true"?t("hide"):t("show");
    const saveButton=document.querySelector("#saveButton"); if(saveButton) saveButton.textContent=t("export");
  }

  function bindCards() {
    planner.querySelectorAll(".activity-card").forEach(card=>{
      card.addEventListener("dragstart",event=>{ draggedId=card.dataset.instanceId; card.classList.add("dragging"); event.dataTransfer.effectAllowed="move"; event.dataTransfer.setData("text/plain",draggedId); });
      card.addEventListener("dragend",()=>{ draggedId=null; card.classList.remove("dragging"); planner.querySelectorAll(".drop-before,.drag-target").forEach(el=>el.classList.remove("drop-before","drag-target")); });
      card.addEventListener("dragover",event=>{ if(card.closest("#timelineList")){event.preventDefault();card.classList.add("drop-before");} });
      card.addEventListener("dragleave",()=>card.classList.remove("drop-before"));
      card.addEventListener("drop",event=>{event.preventDefault(); const targetId=card.dataset.instanceId; if(!draggedId||draggedId===targetId)return; const loc=activityLocation(targetId); if(loc&&loc.type==="day") moveActivity(draggedId,loc.dayIndex,loc.index); });
      card.addEventListener("click",event=>{
        const button=event.target.closest("[data-action]"); if(!button)return;
        const id=card.dataset.instanceId, action=button.dataset.action;
        if(action==="complete"){const loc=activityLocation(id);loc.item.completed=!loc.item.completed;saveState();render();}
        if(action==="edit") openActivityDialog(id);
      });
      card.querySelector("select[data-action='move']")?.addEventListener("change",event=>{ if(event.target.value!=="")moveActivity(card.dataset.instanceId,event.target.value); });
    });
  }

  function bindDropZones() {
    const timeline=planner.querySelector("#timelineList");
    timeline.addEventListener("dragover",event=>event.preventDefault());
    timeline.addEventListener("drop",event=>{ if(event.target.closest(".activity-card"))return; event.preventDefault(); if(draggedId)moveActivity(draggedId,activeDay); });
    const unscheduled=planner.querySelector("#unscheduledList");
    unscheduled.addEventListener("dragover",event=>{event.preventDefault();unscheduled.classList.add("drag-target");});
    unscheduled.addEventListener("dragleave",()=>unscheduled.classList.remove("drag-target"));
    unscheduled.addEventListener("drop",event=>{event.preventDefault();unscheduled.classList.remove("drag-target");if(draggedId)moveActivity(draggedId,"unscheduled");});
    planner.querySelector("#dayTabs").addEventListener("dragover",event=>{const tab=event.target.closest(".day-tab");if(tab){event.preventDefault();tab.classList.add("drag-target");}});
    planner.querySelector("#dayTabs").addEventListener("dragleave",event=>event.target.closest(".day-tab")?.classList.remove("drag-target"));
    planner.querySelector("#dayTabs").addEventListener("drop",event=>{const tab=event.target.closest(".day-tab");if(tab&&draggedId){event.preventDefault();moveActivity(draggedId,Number(tab.dataset.day));}});
  }

  function approximateSunset(dateText) {
    const month=Number(dateText.slice(5,7));
    return [0,1040,1070,1110,1160,1200,1225,1215,1170,1100,1035,1000,1010][month];
  }

  function autoPlan() {
    const hasCustomized=state.days.some(day=>day.activities.length);
    if(hasCustomized&&!confirm(t("confirmPlan")))return;
    const pool=[...state.days.flatMap(day=>day.activities),...state.unscheduled];
    state.days.forEach(day=>day.activities=[]); state.unscheduled=[];
    const preferred=new Set(quest.styles||[]);
    pool.sort((a,b)=>Number(byId(b.catalogId).styles.some(s=>preferred.has(s)))-Number(byId(a.catalogId).styles.some(s=>preferred.has(s))) || byId(a.catalogId).area.localeCompare(byId(b.catalogId).area));
    pool.forEach(item=>{
      let best=null;
      state.days.forEach((day,dayIndex)=>{
        const window=dayWindow(dayIndex), catalog=byId(item.catalogId);
        let start=Math.max(window.start,600);
        const existing=[...day.activities].sort((a,b)=>minutes(a.start)-minutes(b.start));
        if(catalog.sunset) start=approximateSunset(day.date)-45;
        else if(existing.length){const last=existing[existing.length-1];start=minutes(last.start)+last.duration+travelMinutes(byId(last.catalogId).area,catalog.area);}
        if(start+item.duration<=window.end){const score=existing.length*20+(existing.length&&byId(existing[existing.length-1].catalogId).area===catalog.area?-30:0);if(!best||score<best.score)best={dayIndex,start,score};}
      });
      if(best){item.start=timeText(best.start);state.days[best.dayIndex].activities.push(item);}else{item.start=null;state.unscheduled.push(item);}
    });
    state.days.forEach(day=>day.activities.sort((a,b)=>minutes(a.start)-minutes(b.start)));
    saveState();render();notify(t("planned"));
  }

  function openActivityDialog(id) {
    editingId=id; const loc=activityLocation(id); if(!loc)return;
    const dialog=document.querySelector("#activityDialog");
    dialog.querySelector("h3").textContent=titleFor(loc.item.catalogId);
    dialog.querySelector("#dialogTimeLabel").textContent=t("startTime");
    dialog.querySelector("#dialogDurationLabel").textContent=t("duration");
    dialog.querySelector("#dialogMoveLabel").textContent=t("moveTo");
    dialog.querySelector("#activityStart").value=loc.item.start||"10:00";
    dialog.querySelector("#activityDuration").value=loc.item.duration;
    dialog.querySelector("#activityDestination").innerHTML=dayOptions(loc.type==="day"?loc.dayIndex:null);
    dialog.querySelector("#activityDestination").value=loc.type==="day"?String(loc.dayIndex):"unscheduled";
    dialog.querySelector("#dialogRemove").textContent=t("remove"); dialog.querySelector("#dialogCancel").textContent=t("cancel"); dialog.querySelector("#dialogSave").textContent=t("save");
    dialog.showModal();
  }

  function saveActivityDialog() {
    const dialog=document.querySelector("#activityDialog"), loc=activityLocation(editingId); if(!loc)return;
    const destination=dialog.querySelector("#activityDestination").value;
    loc.item.start=dialog.querySelector("#activityStart").value;
    loc.item.duration=Math.min(720,Math.max(15,Number(dialog.querySelector("#activityDuration").value)||15));
    if((loc.type==="day"?String(loc.dayIndex):loc.type)!==destination) moveActivity(editingId,destination);
    else {saveState();render();}
    dialog.close();
  }

  function removeActivity() {
    if(!confirm(t("removeConfirm")))return;
    const item=detach(editingId);if(item)state.removed.push(item);
    saveState();render();document.querySelector("#activityDialog").close();
  }

  function openTripDialog() {
    const dialog=document.querySelector("#tripDialog");
    dialog.querySelector("h3").textContent=t("tripSettings");
    [["TripArrivalDate","arrivalDate"],["TripArrivalTime","arrivalTime"],["TripDepartureDate","departureDate"],["TripDepartureTime","departureTime"]].forEach(([id,key])=>dialog.querySelector(`#${id}`).value=state.trip[key]);
    dialog.querySelector("#tripArrivalDateLabel").textContent=t("arrivalDate");dialog.querySelector("#tripArrivalTimeLabel").textContent=t("arrivalTime");dialog.querySelector("#tripDepartureDateLabel").textContent=t("departureDate");dialog.querySelector("#tripDepartureTimeLabel").textContent=t("departureTime");
    dialog.querySelector("#tripDialogMessage").textContent="";dialog.querySelector("#tripCancel").textContent=t("cancel");dialog.querySelector("#tripSave").textContent=t("save");dialog.showModal();
  }

  function saveTripDialog() {
    const dialog=document.querySelector("#tripDialog");
    const trip={arrivalDate:dialog.querySelector("#TripArrivalDate").value,arrivalTime:dialog.querySelector("#TripArrivalTime").value,departureDate:dialog.querySelector("#TripDepartureDate").value,departureTime:dialog.querySelector("#TripDepartureTime").value};
    if(new Date(`${trip.departureDate}T${trip.departureTime}`)<=new Date(`${trip.arrivalDate}T${trip.arrivalTime}`)){dialog.querySelector("#tripDialogMessage").textContent=t("invalidDates");return;}
    const newDays=makeDays(trip), byDate=new Map(state.days.map(day=>[day.date,day.activities]));
    const returned=[]; state.days.forEach(day=>{if(!newDays.some(next=>next.date===day.date))returned.push(...day.activities);});
    newDays.forEach(day=>day.activities=byDate.get(day.date)||[]);
    state.trip=trip; state.days=newDays; state.unscheduled.push(...returned.map(item=>({...item,start:null})));
    activeDay=0;saveState();render();dialog.close();notify(t("saved"));
  }

  function notify(message) {
    const toast=planner.querySelector("#plannerToast");toast.textContent=message;toast.classList.add("visible");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("visible"),2600);
  }

  function applyLanguage(value) {
    lang=I18N[value]?value:"en";localStorage.setItem("santorini-language",lang);document.documentElement.lang=lang;document.documentElement.dir=lang==="he"?"rtl":"ltr";document.querySelector("#languageSelect").value=lang;if(state)render();
  }

  function exportImage() {
    if(!state||!quest)return;
    const rows=state.days.reduce((sum,day)=>sum+Math.max(1,day.activities.length),0);
    const canvas=document.createElement("canvas");canvas.width=1080;canvas.height=Math.max(1200,310+rows*54+state.days.length*82);
    const ctx=canvas.getContext("2d");ctx.fillStyle="#f5f8fc";ctx.fillRect(0,0,canvas.width,canvas.height);ctx.fillStyle="#002349";ctx.fillRect(0,0,canvas.width,230);
    ctx.fillStyle="#9cb7ff";ctx.font="700 22px -apple-system,Arial";ctx.fillText("SANTORINI · TRAVEL ADVENTURE",64,66);
    ctx.fillStyle="#fff";ctx.font="700 52px -apple-system,Arial";ctx.fillText(String(quest.name).slice(0,30),64,132);ctx.font="400 25px -apple-system,Arial";ctx.fillText(`${dateLabel(state.trip.arrivalDate,{month:"long",day:"numeric",year:"numeric"})} — ${dateLabel(state.trip.departureDate,{month:"long",day:"numeric",year:"numeric"})}`,64,181);
    let y=278;
    state.days.forEach((day,index)=>{ctx.fillStyle="#0038ff";ctx.font="700 24px -apple-system,Arial";ctx.fillText(`${t("day")} ${index+1} · ${dateLabel(day.date,{weekday:"short",month:"short",day:"numeric"})}`,64,y);y+=32;ctx.strokeStyle="#d6e1ef";ctx.beginPath();ctx.moveTo(64,y);ctx.lineTo(1016,y);ctx.stroke();y+=20;
      const list=[...day.activities].sort((a,b)=>minutes(a.start)-minutes(b.start));
      if(!list.length){ctx.fillStyle="#77859a";ctx.font="400 20px -apple-system,Arial";ctx.fillText("—",86,y+18);y+=54;}
      list.forEach(item=>{ctx.fillStyle=item.completed?"#218a5b":"#002349";ctx.font="700 20px -apple-system,Arial";ctx.fillText(`${item.completed?"✓ ":""}${item.start}`,86,y+20);ctx.fillStyle="#191c1f";ctx.font="600 20px -apple-system,Arial";ctx.fillText(titleFor(item.catalogId),210,y+20);ctx.fillStyle="#657287";ctx.font="400 17px -apple-system,Arial";ctx.fillText(`${item.duration} ${t("minutes")}`,825,y+20);y+=54;});y+=30;});
    ctx.fillStyle="#657287";ctx.font="500 18px -apple-system,Arial";ctx.fillText("santorini.quest · Powered by Check2Go",64,canvas.height-46);
    const link=document.createElement("a");link.download=`santorini-itinerary-${quest.id||"travel"}.png`;link.href=canvas.toDataURL("image/png");link.click();
  }

  function init(q) {
    if(!q?.arrivalDate)return;
    quest=q;state=loadState(q);planner.hidden=false;applyLanguage(lang);render();
  }

  planner.querySelector("#dayTabs").addEventListener("click",event=>{const tab=event.target.closest(".day-tab");if(tab){activeDay=Number(tab.dataset.day);overview=false;render();}});
  planner.querySelector("#autoPlanButton").addEventListener("click",autoPlan);
  planner.querySelector("#overviewButton").addEventListener("click",()=>{overview=!overview;render();});
  planner.querySelector("#editTripButton").addEventListener("click",openTripDialog);
  planner.querySelector("#toggleUnscheduled").addEventListener("click",event=>{const panel=event.currentTarget.closest(".unscheduled-panel");const expanded=event.currentTarget.getAttribute("aria-expanded")!=="true";event.currentTarget.setAttribute("aria-expanded",String(expanded));event.currentTarget.textContent=expanded?t("hide"):t("show");panel.classList.toggle("collapsed",!expanded);});
  planner.querySelector("#restoreRemoved").addEventListener("click",()=>{state.removed.forEach(item=>{item.start=null;state.unscheduled.push(item);});state.removed=[];saveState();render();notify(t("restored"));});
  document.querySelector("#languageSelect")?.addEventListener("change",event=>applyLanguage(event.target.value));
  document.querySelector("#dialogCancel").addEventListener("click",()=>document.querySelector("#activityDialog").close());
  document.querySelector("#dialogSave").addEventListener("click",saveActivityDialog);
  document.querySelector("#dialogRemove").addEventListener("click",removeActivity);
  document.querySelector("#tripCancel").addEventListener("click",()=>document.querySelector("#tripDialog").close());
  document.querySelector("#tripSave").addEventListener("click",saveTripDialog);
  bindDropZones();
  window.addEventListener("santorini:quest",event=>init(event.detail));
  window.exportPlannerImage=exportImage;
  window.plannerHasData=()=>Boolean(state&&quest);
  window.__santoriniPlanner={getState:()=>structuredClone(state),autoPlan,moveActivity,render,conflictMap,exportImage};
  if(window.santoriniQuest)init(window.santoriniQuest);
})();
