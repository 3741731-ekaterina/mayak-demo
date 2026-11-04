export function monthBounds(period){return {from:period+'-01',to:period+'-'+new Date(Date.UTC(Number(period.slice(0,4)),Number(period.slice(5)),0)).getUTCDate()};}
export function rangeDays(from,to){
 const valid=v=>/^\d{4}-\d{2}-\d{2}$/.test(v||'')&&Number.isFinite(Date.parse(v))&&new Date(v).toISOString().slice(0,10)===v;
 if(!valid(from)||!valid(to))throw Error('Выберите обе даты периода');
 const count=Math.round((Date.parse(to)-Date.parse(from))/86400000)+1;
 if(count<1)throw Error('Дата окончания не может быть раньше начала');
 if(count>366)throw Error('Выберите период не больше 366 дней');
 return Array.from({length:count},(_,i)=>new Date(Date.parse(from)+i*86400000).toISOString().slice(0,10));
}
