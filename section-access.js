// One policy for menu items and direct hash navigation. APIs still enforce action/data rights.
export function sectionAllowed(page,user,has,canRequest=false,hasRequests=false){
 if(has('access.full'))return true;
 if(page==='knowledge')return true;
 if(page==='contacts')return has('contacts.view');
 if(['driver','mechanic'].includes(user.role))return page==='fleet'&&has('fleet.view');
 const any=ps=>ps.some(has);
 switch(page){
 case 'overview':return has('view');
 case 'employees':return user.role!=='foreman'&&has('employees.edit');
 case 'times':return any(['time.edit','time.correct','time.submit','time.approve']);
 case 'requests':return canRequest||hasRequests||has('employees.edit');
 case 'fleet':return has('fleet.view');
 case 'payroll':return any(['finance.view','payroll.edit','payroll.approve']);
 case 'payments':return any(['finance.view','payments.create','payments.confirm']);
 case 'objects':return has('settings.edit');
 case 'reports':return has('export')&&has('finance.view');
 case 'settings':return any(['settings.edit','users.edit']);
 case 'audit':return false;
 default:return false;
 }
}
