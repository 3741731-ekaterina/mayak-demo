export function matchesAssignment(row,filters){return (!filters.object||row.objectId===filters.object)&&(!filters.brigade||row.brigadeId===filters.brigade)&&(!filters.entity||row.entityId===filters.entity);}
export function gridEmployees(employees,times,filters){
 return employees.filter(e=>(!e.sharedTimeSecondary||times.some(t=>t.employeeId===e.id&&t.date<e.sharedTimeFrom))&&(e.trackTime!==false||times.some(t=>t.employeeId===e.id))&&(!filters.search||`${e.name} ${e.code}`.toLowerCase().includes(filters.search.toLowerCase()))&&(matchesAssignment(e,filters)||times.some(t=>t.employeeId===e.id&&matchesAssignment(t,filters))));
}
export function gridTimes(times,filters){return times.filter(t=>t.status!=='cancelled'&&matchesAssignment(t,filters)&&(!filters.status||t.status===filters.status));}
