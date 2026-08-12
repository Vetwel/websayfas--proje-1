// English adapter for VetWel botanical reference data.
(()=>{
const N={"sweet-flag":"Sweet Flag","yarrow":"Yarrow","agrimony":"Agrimony","burdock":"Greater Burdock","barberry":"Barberry","betony":"Betony","birch":"Birch","bidens":"Bidens","broccoli-seed":"Broccoli Seed","calendula":"Calendula","shepherds-purse":"Shepherd's Purse","centaury":"Common Centaury","chamomile":"German Chamomile","celandine":"Greater Celandine","hawthorn":"Hawthorn","echinacea":"Echinacea","horsetail":"Horsetail","willowherb":"Willowherb","meadowsweet":"Meadowsweet","fennel":"Fennel","bedstraw":"Bedstraw","ground-ivy":"Ground Ivy","licorice":"Licorice Root","cudweed":"Cudweed","immortelle":"Immortelle / Sandy Everlasting","hops":"Hops","st-johns-wort":"St. John's Wort","motherwort":"Motherwort","lespedeza":"Lespedeza","sweet-clover":"Sweet Clover","lemon-balm":"Lemon Balm","mint":"Mint","catnip":"Catnip","restharrow":"Restharrow","oregano":"Oregano","java-tea":"Java Tea","peony":"Peony","common-bean":"Common Bean","plantain":"Plantain","knotgrass":"Knotgrass","persicaria":"Persicaria / Smartweed","oak-leaf":"English Oak Leaf","madder":"Madder","sage":"Sage","salsola":"Salsola","great-burnet":"Great Burnet","comfrey":"Comfrey","dandelion":"Dandelion","thyme":"Thyme","linden":"Linden","red-clover":"Red Clover","nettle":"Nettle","valerian":"Valerian","wild-pansy":"Wild Pansy","eucalyptus":"Eucalyptus","pine-leaf":"Pine Leaf","maple-leaf":"Maple Leaf","keklik-herb":"Keklik Herb","pear-extract":"Pear Extract"};
const A={
flower:"A flowering botanical used as a plant-derived ingredient in VetWel formulations.",
leaf:"A leaf-rich or aromatic botanical used as a plant-derived ingredient in VetWel formulations.",
root:"A botanical whose root or rhizome is an important plant source.",
spike:"An herbaceous botanical with upright or spike-like growth structures.",
shrub:"A shrub- or tree-derived botanical ingredient."
};
const role=(products=[])=>{
 const p=products.join(" ");
 const areas=[];
 if(/KidneyWel|Cleanse/.test(p))areas.push("renal and urinary wellness");
 if(/LiverWel/.test(p))areas.push("hepatic and digestive wellness");
 if(/SkinWel/.test(p))areas.push("skin and coat wellness");
 if(/HeartWel/.test(p))areas.push("cardiovascular wellness");
 if(/CalmWel/.test(p))areas.push("calm behavior and environmental adaptation");
 if(/LactoWel/.test(p))areas.push("digestive, microbiota and gut wellness");
 if(/DentaWel/.test(p))areas.push("oral and gum care");
 if(/Breathe Ease/.test(p))areas.push("respiratory wellness");
 if(/Malt Paste/.test(p))areas.push("digestive and hairball-care support");
 if(/Malign Detox/.test(p))areas.push("specialized multi-botanical nutritional support");
 const unique=[...new Set(areas)];
 return unique.length?`Included as part of VetWel’s multi-botanical approach to ${unique.join(", ")}.`:"Included as part of VetWel’s multi-botanical formulation approach.";
};
const base=window.VETWEL_BOTANICALS||[];
window.VETWEL_BOTANICALS_EN=base.map(p=>({...p,name:N[p.id]||p.name,about:A[p.visual]||A.leaf,role:role(p.products),caution:p.id==="sari-kantaron"||p.id==="st-johns-wort"?"St. John's Wort may have interaction potential with some medications; animals receiving regular medication should be evaluated by a veterinarian.":undefined}));
window.VetWelBotanicalEN={
 normalize(v){return String(v||"").toLocaleLowerCase("en-US").replace(/^\s*\d+\.\s*/,"").replace(/[®™]/g,"").replace(/\s+/g," ").trim();},
 find(fullText,labelText){
  const full=String(fullText||"").toLocaleLowerCase("en-US");
  const label=this.normalize(labelText);
  return window.VETWEL_BOTANICALS_EN.find(p=>{
   const latin=String(p.latin||"").toLocaleLowerCase("en-US");
   if(latin&&!latin.includes("belirtilmemiş")){
    const parts=latin.split("/").map(x=>x.trim().replace(/\s+l\.$/,"")).filter(Boolean);
    if(parts.some(part=>full.includes(part)))return true;
   }
   return [p.name,p.latin,...(p.aliases||[])].map(x=>this.normalize(x)).includes(label);
  });
 },
 visual(type="leaf"){return window.VetWelBotanical.visual(type);}
};
})();
