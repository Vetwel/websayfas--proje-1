// Shared safe merge helper for VetWel clinic directory.
(()=>{if(window.VETWEL_MERGE_CLINICS)return;
const fold=v=>String(v||"").toLocaleLowerCase("tr-TR").replace(/ı/g,"i").replace(/ğ/g,"g").replace(/ü/g,"u").replace(/ş/g,"s").replace(/ö/g,"o").replace(/ç/g,"c").replace(/[^a-z0-9]+/g," ").replace(/\s+/g," ").trim();
const phoneKey=v=>{let n=String(v||"").replace(/\D/g,"");if(n.startsWith("90")&&n.length>=12)n="0"+n.slice(2);return n;};
const generic=new Set(["veteriner","veterinerlik","klinigi","klinik","muayenehanesi","muayenehane","poliklinigi","poliklinik","hizmetleri","hizmet","saglik","ticaret","sanayi","limited","ltd","sti","sirketi","tip","merkezi","hayvan","hastanesi"]);
const brandKey=v=>fold(v).split(" ").filter(x=>x&&!generic.has(x)).join(" ");
const same=(a,b)=>{
 if(fold(a.city)!==fold(b.city))return false;
 const pa=phoneKey(a.phone),pb=phoneKey(b.phone);if(pa&&pb&&pa===pb)return true;
 const aa=fold(a.address),ab=fold(b.address);if(aa&&ab&&aa===ab)return true;
 if(fold(a.district)!==fold(b.district))return false;
 const na=fold(a.name),nb=fold(b.name);if(na&&nb&&na===nb)return true;
 const ka=brandKey(a.name),kb=brandKey(b.name);if(!ka||!kb)return false;
 return ka===kb||(Math.min(ka.length,kb.length)>=5&&(ka.includes(kb)||kb.includes(ka)));
};
window.VETWEL_MERGE_CLINICS=rows=>{
 const target=window.VETWEL_CLINICS||(window.VETWEL_CLINICS=[]);
 rows.map(r=>({name:r[0],city:r[1],district:r[2],address:r[3]||"",phone:r[4]||""})).forEach(c=>{
  const existing=target.find(x=>same(x,c));
  if(existing){if(!existing.phone&&c.phone)existing.phone=c.phone;if(!existing.address&&c.address)existing.address=c.address;return;}
  target.push(c);
 });
};
})();