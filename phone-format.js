export function formatPhone(value){
 const raw=String(value||'').trim(),digits=raw.replace(/\D/g,'');
 if(!digits)return raw==='+'?'+':'';
 if(raw.startsWith('+')&&!digits.startsWith('7'))return raw;
 let n=digits;
 if(n[0]==='8')n='7'+n.slice(1);
 else if(n[0]!=='7')n='7'+n;
 if(n.length>11)return raw;
 return '+7'+[n.slice(1,4),n.slice(4,7),n.slice(7,9),n.slice(9,11)].filter(Boolean).map(x=>'-'+x).join('');
}
export function phoneError(value){const v=String(value||'').trim(),n=v.replace(/\D/g,'');if(!v)return '';if(v.startsWith('+')&&!n.startsWith('7'))return '';return (n.length===11&&['7','8'].includes(n[0]))||n.length===10?'':'Введите 10 цифр номера или 11 цифр с кодом 7/8. Например: +7-932-200-66-76';}
export function bindPhones(){
 const selector='input[name="phone"],input[name="phoneExtra"]';
 const apply=(i,editing=false)=>{const old=i.value,pos=i.selectionStart??old.length,tail=old.length-pos;i.value=formatPhone(old);i.type='tel';i.placeholder='+7-932-200-66-76';i.setCustomValidity(phoneError(i.value));if(editing){const p=Math.max(0,i.value.length-tail);i.setSelectionRange(p,p);}};
 document.addEventListener('input',ev=>{if(ev.target.matches(selector))apply(ev.target,true);});
 document.addEventListener('focusin',ev=>{if(ev.target.matches(selector))apply(ev.target);});
 document.addEventListener('focusout',ev=>{if(ev.target.matches(selector))apply(ev.target);});
}
