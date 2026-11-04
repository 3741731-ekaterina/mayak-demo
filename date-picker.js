// Native date wheels on touch screens; a calendar with explicit month/year lists on desktop.
const months=['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
let picker;
function openCalendar(input){
 if(!picker){picker=document.createElement('dialog');picker.className='quick-calendar';picker.setAttribute('aria-label','Выбор даты');document.body.append(picker);}
 const initial=input.value||new Date().toISOString().slice(0,10);let year=Number(initial.slice(0,4)),month=Number(initial.slice(5,7));
 const draw=()=>{const first=(new Date(Date.UTC(year,month-1,1)).getUTCDay()+6)%7,count=new Date(Date.UTC(year,month,0)).getUTCDate();
 picker.innerHTML=`<div class="calendar-controls"><select aria-label="Месяц календаря">${months.map((m,i)=>`<option value="${i+1}" ${i+1===month?'selected':''}>${m}</option>`).join('')}</select><select aria-label="Год календаря">${Array.from({length:Math.max(2100,year)-Math.min(2000,year)+1},(_,i)=>i+Math.min(2000,year)).map(y=>`<option ${y===year?'selected':''}>${y}</option>`).join('')}</select></div><div class="calendar-days">${['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].map(d=>`<span>${d}</span>`).join('')}${'<span></span>'.repeat(first)}${Array.from({length:count},(_,i)=>`<button type="button" data-day="${i+1}">${i+1}</button>`).join('')}</div><button type="button" class="btn calendar-close">Закрыть календарь</button>`;
 picker.querySelector('[aria-label="Месяц календаря"]').onchange=e=>{month=Number(e.target.value);draw();};picker.querySelector('[aria-label="Год календаря"]').onchange=e=>{year=Number(e.target.value);draw();};picker.querySelector('.calendar-close').onclick=()=>picker.close();
 for(const button of picker.querySelectorAll('[data-day]'))button.onclick=()=>{input.value=`${year}-${String(month).padStart(2,'0')}-${button.dataset.day.padStart(2,'0')}`;input.dispatchEvent(new Event('change',{bubbles:true}));picker.close();input.focus({preventScroll:true});};
 };draw();picker.showModal();
}
function enhance(){for(const input of document.querySelectorAll('[data-quick-date]:not([data-calendar-ready])')){input.dataset.calendarReady='true';const button=document.createElement('button');button.type='button';button.className='date-calendar-button btn';button.textContent='Календарь';button.setAttribute('aria-label','Календарь: '+input.getAttribute('aria-label'));button.onclick=()=>openCalendar(input);input.after(button);}}
new MutationObserver(enhance).observe(document.body,{childList:true,subtree:true});enhance();
