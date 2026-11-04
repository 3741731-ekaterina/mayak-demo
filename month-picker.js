// Keep the native wheel picker on touch devices; desktop gets named months and years.
export function enhanceMonths(root=document){
 for(const input of root.querySelectorAll('input[type="month"]:not([data-month-picker])')){
  input.dataset.monthPicker='true';input.classList.add('month-native');
  const box=document.createElement('span');box.className='month-desktop';
  const month=document.createElement('select'),year=document.createElement('select');
  const label=input.getAttribute('aria-label')||'Период';
  month.setAttribute('aria-label',label+': месяц');year.setAttribute('aria-label',label+': год');
  ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'].forEach((name,i)=>month.add(new Option(name,String(i+1).padStart(2,'0'))));
  const current=input.value||new Date().toISOString().slice(0,7);
  for(let y=Math.min(2020,Number(current.slice(0,4)));y<=Math.max(2100,Number(current.slice(0,4)));y++)year.add(new Option(String(y),String(y)));
  const sync=()=>{year.value=(input.value||current).slice(0,4);month.value=(input.value||current).slice(5,7);};sync();
  const change=()=>{input.value=year.value+'-'+month.value;input.dispatchEvent(new Event('input',{bubbles:true}));input.dispatchEvent(new Event('change',{bubbles:true}));};
  month.addEventListener('change',change);year.addEventListener('change',change);input.addEventListener('change',sync);
  box.append(month,year);input.after(box);
 }
}
new MutationObserver(()=>enhanceMonths()).observe(document.body,{childList:true,subtree:true});
enhanceMonths();
