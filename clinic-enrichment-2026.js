// Verified public contact enrichment for VetWel clinic directory — 2026-08-13.
// Safety rule: only fills currently blank address/phone fields; existing distributor data is never overwritten.
(()=>{
  const fold=v=>String(v||"")
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g,"i").replace(/ğ/g,"g").replace(/ü/g,"u")
    .replace(/ş/g,"s").replace(/ö/g,"o").replace(/ç/g,"c")
    .replace(/[^a-z0-9]+/g," ").replace(/\s+/g," ").trim();

  const patches=[
    {name:"GÖKSU VETERİNER KLİNİĞİ",city:"İstanbul",district:"Beykoz",phone:"02164652130"},
    {name:"VANİLYA VETERİNER KLİNİĞİ",city:"İstanbul",district:"Çekmeköy",address:"Mimar Sinan Mah. Ceren Sok. No:18C",phone:"05425503181"},
    {name:"KEMERBURGAZ VETSENSE VETERİNER KLİNİĞİ",city:"İstanbul",district:"Eyüpsultan",address:"Mimar Sinan Mah. İstanbul Cad. No:22 D:24B",phone:"05347654373"},
    {name:"TARABYA VETLIFE VETERİNERLİK",city:"İstanbul",district:"Sarıyer",address:"Ferahevler Mah. Adnan Kahveci Cad. No:31",phone:"02122232575"},
    {name:"BREMEN VETERİNER HİZMETLERİ",city:"İstanbul",district:"Beşiktaş",phone:"02122874500"},
    {name:"PANVET VETERİNERLİK HİZMETLERİ",city:"İstanbul",district:"Beşiktaş",address:"Nisbetiye Mah. Okul Sok. No:6/A",phone:"02122645258"},
    {name:"PETİMİN VETERİNERLİK",city:"İstanbul",district:"Beylikdüzü",address:"Kavaklı Mah. Şehitler Cad. Marmara 4 Evleri Dükkanları 5D/76",phone:"08502554555"},
    {name:"YAKACIK VETERİNER KLİNİĞİ",city:"İstanbul",district:"Kartal",address:"Hürriyet Mah. Vatansever Cad. No:40/A",phone:"02163099004"},
    {name:"PATİVERA VETERİNER KLİNİĞİ-SERKAN BİLMEZ",city:"İstanbul",district:"Maltepe",address:"Feyzullah Mah. Buğracan Sok. No:6B",phone:"05366420367"},
    {name:"ELİFOĞLU VETERİNER HİZMETLERİ-SAHRAYİCEDİT",city:"İstanbul",district:"Kadıköy",address:"Sahrayıcedit Mah. Osman Nuri Ergin Sk. No:9A",phone:"02163026202"},
    {name:"VETGROUP VETERİNER HİZMETLERİ",city:"Muğla",district:"Fethiye",address:"Babataşı Mah. Mustafa Kemal Blv. No:106",phone:"05326299048"},
    {name:"NOTA VETERİNER KLİNİĞİ",city:"Düzce",district:"Merkez",address:"Uzun Mustafa Mah. Uzun Mustafa Cad. No:40/A",phone:"05336695699"},
    {name:"MASAL VETERİNERLİK",city:"Kocaeli",district:"İzmit",address:"Yahyakaptan Mah. Beril Sk. No:7/C",phone:"05412796141"},
    {name:"MALTEPE HAYVAN HASTANESİ",city:"İstanbul",district:"Maltepe",phone:"05451621700"},
    {name:"MUSTAFA HAKKI TAHTASIZ (DOBBY VET)",city:"Bursa",district:"Nilüfer",address:"Ataevler Mah. Ata Blv. No:25",phone:"05302427838"},
    {name:"CANBU VETERİNERLİK HİZMETLERİ",city:"Bursa",district:"Yıldırım",address:"Millet Mah. Cengizhan Cad. Zümrüt Apt. No:28/A",phone:"05527210505"},
    {name:"ÇANAKKALE VETERİNER KLİNİĞİ",city:"Çanakkale",district:"Merkez",address:"Barbaros Mah. 100. Yıl Cad. No:13",phone:"05301717149"},
    {name:"CATFATHER VETERİNER KLİNİĞİ",city:"İstanbul",district:"Ataşehir",address:"Atatürk Mah. Ataşehir Bulvarı Ata 3-1 Blokları No:10/I",phone:"05400061881"},
    {name:"TRENDVET VETERİNERLİK HİZMETLERİ",city:"İstanbul",district:"Ataşehir",address:"Yenişehir Mah. Baraj Yolu Cad. No:5 D:7D",phone:"05528595969"},
    {name:"VETALLİCA VETERİNERLİK HİZMETLERİ",city:"İstanbul",district:"Kadıköy",address:"19 Mayıs Mah. Şemsettin Günaltay Cad. No:122B"},
    {name:"VETMOON VETERİNERLİK",city:"Bursa",district:"Osmangazi",address:"Demirtaş Cumhuriyet Mah. Panayır Yolu Cad. No:10D"},
    {name:"PATİMANİA VETERİNER KLİNİĞİ MEHMET ÖZKAN",city:"Çanakkale",district:"Merkez",address:"Cumhuriyet Mah. Atatürk Cad. No:142/D, Kepez",phone:"05467139253"},
    {name:"FATİH VETERİNER KLİNİĞİ",city:"İstanbul",district:"Fatih",addressIncludes:"Turgut Özal Millet",phone:"02126232321"},
    {name:"MİNT VETERİNERLİK HİZMETLERİ",city:"İstanbul",district:"Şişli",address:"Teşvikiye Mah. Ahmet Fetgari Sok. No:60/A",phone:"05426994881"},
    {name:"İPEK ÖZER-FAUNA",city:"İstanbul",district:"Üsküdar",address:"Ünalan Mah. Çağla Sok. No:2",phone:"05616187261"},
    {name:"PENDİK VETERİNER KLİNİĞİ - BİROL MUMCU",city:"İstanbul",district:"Pendik",address:"Doğu Mah. 23 Nisan Cad. No:76/B",phone:"05543491501"}
  ];

  const apply=()=>{
    const clinics=window.VETWEL_CLINICS||[];
    patches.forEach(p=>{
      const matches=clinics.filter(c=>
        fold(c.name)===fold(p.name) &&
        fold(c.city)===fold(p.city) &&
        fold(c.district)===fold(p.district) &&
        (!p.addressIncludes || fold(c.address).includes(fold(p.addressIncludes)))
      );
      if(matches.length!==1){
        if(matches.length>1) console.warn("VetWel clinic enrichment ambiguous",p.name,matches.length);
        return;
      }
      const c=matches[0];
      if(!String(c.address||"").trim() && p.address) c.address=p.address;
      if(!String(c.phone||"").trim() && p.phone) c.phone=p.phone;
    });
  };

  window.VETWEL_APPLY_CLINIC_ENRICHMENT=apply;
  apply();
})();
