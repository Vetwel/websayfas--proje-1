// Shared safe merge helper for VetWel clinic directory.
(()=>{if(window.VETWEL_MERGE_CLINICS)return;
const base=window.VETWEL_CLINICS||(window.VETWEL_CLINICS=[]);
const viapet=base.find(x=>x.name==="Viapet Veteriner Kliniği"&&x.city==="İstanbul"&&x.district==="Pendik");
if(viapet&&!viapet.phone)viapet.phone="05349780038";
const kori=base.find(x=>x.name==="Köri Veteriner Poliklinik Hizmetleri"&&x.city==="İstanbul"&&x.district==="Tuzla");
if(kori){kori.phone="05423957634";kori.address="Postane Mah. Manastır Yolu Cad. No:86";}
const fold=v=>String(v||"").toLocaleLowerCase("tr-TR").replace(/ı/g,"i").replace(/ğ/g,"g").replace(/ü/g,"u").replace(/ş/g,"s").replace(/ö/g,"o").replace(/ç/g,"c").replace(/[^a-z0-9]+/g," ").replace(/\s+/g," ").trim();
const cleanAddress=v=>{
 let s=String(v||"").replace(/\s+/g," ").trim();
 const m=s.match(/\s*\(([^()]*)\)\s*$/);
 if(!m)return s;
 const tail=fold(m[1]);
 const businessWords=["veteriner","vet","klinik","klinigi","poliklinik","poliklinigi","muayenehane","muayenehanesi","hayvan","hastanesi","pet","hizmet","hizmetleri","saglik","ticaret","limited","ltd","sti","sirketi"];
 if(businessWords.some(w=>tail.split(" ").includes(w)))s=s.slice(0,m.index).trim();
 return s;
};
const upperName=v=>String(v||"").replace(/\s+/g," ").trim().toLocaleUpperCase("tr-TR");
base.forEach(x=>{x.address=cleanAddress(x.address);x.name=upperName(x.name);});
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
 rows.map(r=>({name:upperName(r[0]),city:r[1],district:r[2],address:cleanAddress(r[3]),phone:r[4]||""})).forEach(c=>{
  const existing=target.find(x=>same(x,c));
  if(existing){if(!existing.phone&&c.phone)existing.phone=c.phone;if(!existing.address&&c.address)existing.address=c.address;existing.address=cleanAddress(existing.address);existing.name=upperName(existing.name);return;}
  target.push(c);
 });
};
["a","b","c","d","e","f"].forEach(part=>{
 try{
  const xhr=new XMLHttpRequest();
  xhr.open("GET",`clinic-import-2026-${part}.js`,false);
  xhr.send(null);
  if(xhr.status>=200&&xhr.status<300)(0,eval)(xhr.responseText);
 }catch(err){console.error("VetWel clinic import load failed",part,err);}
});
})();