// Imported incomplete references are not closed merely because setup is pending.
export function closedObject(o,today){return !!(o.closedOn&&o.closedOn<=today)||o.active===false&&!o.requiresSetup||/заверш[её]нный\s+объект|объект\s+закрыт/iu.test(o.name||'');}
export function objectOptions(objects,today,includeClosed=false){return objects.filter(o=>includeClosed||!closedObject(o,today));}
