// Five-day Russian production calendar. Explicit selection preserves legacy norms.
// Source: https://government.ru/docs/all/161028/ (24.09.2025 № 1466).
export const calendar2026={year:2026,source:'https://government.ru/docs/all/161028/',
 holidays:['01-01','01-02','01-05','01-06','01-07','01-08','01-09','02-23','03-09','05-01','05-11','06-12','11-04','12-31'],
 shortened:['04-30','05-08','06-11','11-03'],working:[]};
export function calendarNorm(period,shift,calendar=calendar2026){
 if(Number(period.slice(0,4))!==calendar.year)return null;
 const days=new Date(Date.UTC(calendar.year,Number(period.slice(5)),0)).getUTCDate();
 let hours=0,workingDays=0;
 for(let d=1;d<=days;d++){
  const key=period.slice(5)+'-'+String(d).padStart(2,'0');
  const wd=new Date(`${period}-${String(d).padStart(2,'0')}T12:00:00Z`).getUTCDay();
  if(calendar.working.includes(key)||(![0,6].includes(wd)&&!calendar.holidays.includes(key))){workingDays++;hours+=Math.max(0,Number(shift)-(calendar.shortened.includes(key)?1:0));}
 }
 return {hours:Math.round(hours*100)/100,workingDays};
}
export function calendarEmployeeNorm(s,e,period){
 if(e.recordState==='incomplete')return null;
 if(e.normMode!=='calendar')return e.trackTime===false?0:e.periodNorm;
 const c=s.get('calendars',period.slice(0,4));if(!c)return null;
 let total=0;
 const end=new Date(Date.UTC(Number(period.slice(0,4)),Number(period.slice(5)),0)).getUTCDate();
 for(let n=1;n<=end;n++){
  const dt=`${period}-${String(n).padStart(2,'0')}`,a=s.at('employees',e.id,dt)||e;
  if(a.trackTime===false||dt<a.hireDate||(a.endDate&&dt>a.endDate))continue;
  const obj=s.at('objects',a.objectId,dt),shift=a.shiftHours??obj?.normHours;
  const key=dt.slice(5),wd=new Date(dt+'T12:00:00Z').getUTCDay();
  if(c.working.includes(key)||(![0,6].includes(wd)&&!c.holidays.includes(key))){if(shift==null)return null;total+=Math.max(0,shift-(c.shortened.includes(key)?1:0));}
 }
 return Math.round(total*100)/100;
}
