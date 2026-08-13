// Real botanical photos for VetWel product-page botanical modals.
(() => {
  const files = {
    'egir-otu':['Acorus Calamus Oulu 20150707.jpg','Wikimedia Commons · CC0'],
    'civanpercemi':['20220727 Achillea millefolium.jpg','Wikimedia Commons · CC0'],
    'koyun-otu':['20170715Agrimonia eupatoria.jpg','Wikimedia Commons · CC0'],
    'dulavrat-otu':['20190512Arctium lappa.jpg','Wikimedia Commons · CC0'],
    'kadintuzlugu':['Berberis vulgaris 5878.jpg','Wikimedia Commons · CC0'],
    'kestere-otu':['Stachys officinalis.JPG','Wikimedia Commons · Public Domain'],
    'hus':['Betula pendula leaves.jpg','Wikimedia Commons · CC0'],
    'pitrak':['Bidens pilosa at Elmina West in Seksyen U15, Shah Alam 20231126 101332.jpg','Wikimedia Commons · CC0'],
    'brokoli-tohumu':['Brassica oleracea var. italica 01.jpg','Σ64 · CC BY 4.0 · Wikimedia Commons'],
    'aynisafa':['20141003Calendula officinalis3.jpg','Wikimedia Commons · CC0'],
    'coban-cantasi':['20150524Capsella bursa-pastoris.jpg','Temsilî tür: Capsella bursa-pastoris · CC0'],
    'kizil-kantaron':['Centaurium erythraea 215056939.jpg','Wikimedia Commons · CC0'],
    'papatya':['20160520Matricaria chamomilla1.jpg','Wikimedia Commons · CC0'],
    'kirlangic-otu':['20230527Chelidonium majus.jpg','Temsilî tür: Chelidonium majus · CC0'],
    'alic':['Crataegus orientalis 1.jpg','Crataegus orientalis · Public Domain'],
    'ekinezya':['Echinacea purpurea, 2015-07-07, Kane Woods, 01.jpg','Wikimedia Commons · CC0'],
    'atkuyrugu':['20190326 Equisetum arvense 3.jpg','Wikimedia Commons · CC0'],
    'yaki-otu':['Epilobium montanum 307316865.jpg','Wikimedia Commons · CC0'],
    'tekesakali':['20140715Filipendula ulmaria.jpg','Wikimedia Commons · CC0'],
    'rezene':['Foeniculum vulgare - Jardim Botânico de Brasília - DSC09655.JPG','Wikimedia Commons · CC0'],
    'yogurt-otu':['20220624Galium verum.jpg','Tür seçeneklerinden Galium verum · CC0'],
    'yer-sarmasigi':['20130424Glechoma hederacea.jpg','Wikimedia Commons · CC0'],
    'meyan-koku':['Gycyrrhiza glabra - Christchurch Botanic Gardens - Christchurch, NZ - DSC02097.jpg','Wikimedia Commons · CC0'],
    'bozagan-otu':['20160814Gnaphalium uliginosum03.jpg','Tür seçeneklerinden Gnaphalium uliginosum · CC0'],
    'altin-otu':['20150613Helichrysum arenarium5.jpg','Wikimedia Commons · CC0'],
    'serbetci-otu':['20170531Humulus lupulus3.jpg','Wikimedia Commons · CC0'],
    'sari-kantaron':['20140629Hypericum perforatum.jpg','Wikimedia Commons · CC0'],
    'aslan-otu':['Leonurus cardiaca, Soho, 2025-06-04-1.jpg','Wikimedia Commons · CC0'],
    'lespedeza':['Lespedeza capitata habit.jpg','Wikimedia Commons · Public Domain'],
    'sari-yonca':['20140517Melilotus officinalis.jpg','Wikimedia Commons · CC0'],
    'melisa':['Melissa officinalis, 2020-07-11, Beechview, 01.jpg','Wikimedia Commons · CC0'],
    'nane':['Mentha piperita - Flickr - aspidoscelis (1).jpg','Patrick Alexander · Mentha × piperita · CC0'],
    'kedi-nanesi':['Nepeta cataria, 2021-07-04, Bethel Park, 03.jpg','Wikimedia Commons · CC0'],
    'tarla-kayiskirani':['Ononis arvensis.jpeg','Kristian Peters · CC BY-SA 3.0'],
    'oregano':['20120720Origanum vulgare.jpg','Wikimedia Commons · CC0'],
    'keklik-otu':['20120720Origanum vulgare.jpg','Temsilî eşleşme: Origanum vulgare · CC0'],
    'java-cayi':['Orthosiphon aristatus at Kepong Botanical Garden 20230625 103153.jpg','Wikimedia Commons · CC0'],
    'sakayik':['Paeonia lactiflora 2025.jpg','Paeonia lactiflora · CC0'],
    'fasulye':['Phaseolus Vulgaris.jpg','Aldrina A Manashe · Phaseolus vulgaris · CC0'],
    'sinirli-ot':['Plantago afra kz01.jpg','Krzysztof Ziarnek, Kenraiz · CC BY-SA 4.0'],
    'kus-otu':['Polygonum aviculare (9056317484).jpg','Kevin Thiele · CC BY 2.0'],
    'su-biberi':["Persicaria maculosa - Lady's Thumb 02.jpg",'Wikimedia Commons · CC0'],
    'mese-yapragi':['20181114Quercus robur2.jpg','Wikimedia Commons · CC0'],
    'kokboya':['Rubia tinctorum.jpg','Janakiraman janaki · CC BY-SA 4.0'],
    'adacayi':['Salvia officinalis L. 3355742911.jpg','Temsilî tür: Salvia officinalis · CC0'],
    'cayir-dugmesi':['20130712Sanguisorba officinalis1.jpg','Sanguisorba officinalis · CC0'],
    'salsola':['20170823Salsola tragus4.jpg','Temsilî tür: Salsola tragus · CC0'],
    'karakafes':['20180920Symphytum officinale.jpg','Temsilî tür: Symphytum officinale · CC0'],
    'karahindiba':['Taraxacum officinale, 2020-04-18, Beechview.jpg','Wikimedia Commons · CC0'],
    'kekik':['Thymus vulgaris 54555.jpg','Temsilî tür: Thymus vulgaris · Public Domain'],
    'ihlamur':['20161107Tilia cordata.jpg','Linden ağacı · Tilia cordata · CC0'],
    'kirmizi-yonca':['20180510Trifolium pratense1.jpg','Wikimedia Commons · CC0'],
    'isirgan':['Urtica dioica.jpg','Wikimedia Commons · Public Domain'],
    'kedi-otu':['20190929Valeriana officinalis2.jpg','Wikimedia Commons · CC0'],
    'menekse':['Viola tricolor0.jpg','Viola tricolor · CC BY-SA 3.0'],
    'okaliptus':['Green branch of Eucalyptus.jpg','Mayumi Kataoka · Eucalyptus scoparia yapraklı dal · CC BY-SA 4.0'],
    'cam-yapragi':['Pinus sylvestris.1.jpg','Temsilî tür: Pinus sylvestris · CC0'],
    'akcaagac-yapragi':['Yeelllow maplee leaf.jpg','Maple leaf · CC0'],
    'armut-ekstresi':['Pears.jpg','Armut / Pyrus communis · Public Domain'],
    'shiitake':['Shiitake mushroom.jpg','Keith Weller / USDA-ARS · Public Domain'],
    'reishi':['Ganoderma lucidum (37502564906).jpg','gailhampshire · CC BY 2.0'],
    'chaga':['Inonotus obliquus (35578063011).jpg','Björn Sothmann · CC BY-SA 2.0']
  };

  const mushrooms = {
    Shiitake:{id:'shiitake',name:'Shiitake',latin:'Lentinula edodes',about:'Odun üzerinde gelişen, kahverengi şapkasıyla tanınan yenilebilir ve fonksiyonel bir mantardır.',role:'Malign Detox® formülündeki fonksiyonel mantar kompleksinin bir parçası olarak genel besinsel ve fizyolojik destek yaklaşımında yer alır.',products:['Malign Detox®']},
    Reishi:{id:'reishi',name:'Reishi',latin:'Ganoderma lucidum',about:'Parlak, cilalı görünümlü kırmızımsı-kahverengi meyve gövdesiyle tanınan polipor bir mantardır.',role:'Malign Detox® formülündeki fonksiyonel mantar kompleksinin bir parçası olarak genel fizyolojik ve besinsel destek yaklaşımında yer alır.',products:['Malign Detox®']},
    Chaga:{id:'chaga',name:'Chaga',latin:'Inonotus obliquus',about:'Özellikle huş ağaçlarında koyu renkli, düzensiz kütleler oluşturarak gelişen fonksiyonel bir mantardır.',role:'Malign Detox® formülündeki fonksiyonel mantar kompleksinin bir parçası olarak genel besinsel ve antioksidan destek yaklaşımında yer alır.',products:['Malign Detox®'],caution:'Böbrek hastalığı bulunan hayvanlarda kullanım veteriner hekim tarafından özellikle değerlendirilmelidir.'}
  };

  const enc = (s) => encodeURIComponent(s).replace(/%2F/g, '/');
  const style = document.createElement('style');
  style.textContent = `.botanical-modal-visual.vetwel-real-photo{padding:0!important;position:relative;overflow:hidden;background:#e9eef2!important}.botanical-modal-visual.vetwel-real-photo img{width:100%;height:100%;min-height:410px;display:block;object-fit:cover}.botanical-modal-photo-credit{position:absolute;left:10px;right:10px;bottom:10px;padding:7px 9px;border-radius:9px;background:rgba(7,25,47,.82);color:#fff!important;font-size:9px!important;line-height:1.35!important;text-decoration:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;z-index:2}@media(max-width:650px){.botanical-modal-visual.vetwel-real-photo img{min-height:230px;height:230px}}`;
  document.head.appendChild(style);

  const photoMarkup = (id, name, latin) => {
    const p = files[id];
    if (!p) return '';
    const page = `https://commons.wikimedia.org/wiki/File:${enc(p[0].replace(/ /g,'_'))}`;
    const src = `https://commons.wikimedia.org/wiki/Special:FilePath/${enc(p[0])}?width=900`;
    return `<img decoding="async" src="${src}" alt="${name} (${latin}) gerçek fotoğrafı"><a class="botanical-modal-photo-credit" href="${page}" target="_blank" rel="noopener noreferrer">${p[1]} · Wikimedia Commons</a>`;
  };

  const replaceVisual = (item) => {
    const id = item?.dataset?.botanicalId;
    const p = id ? files[id] : null;
    if (!p) return;
    requestAnimationFrame(() => {
      const visual = document.querySelector('.botanical-modal.open .botanical-modal-visual');
      const plant = window.VETWEL_BOTANICALS?.find((entry) => entry.id === id);
      if (!visual || !plant) return;
      visual.classList.add('vetwel-real-photo');
      visual.innerHTML = photoMarkup(id, plant.name, plant.latin);
      const note = document.querySelector('.botanical-modal.open .botanical-schematic-note');
      if (note) note.textContent = 'Gerçek botanik fotoğrafı; kaynak ve lisans bilgisi görsel üzerinde belirtilmiştir.';
    });
  };

  const openMushroom = (mushroom, trigger) => {
    const modal = document.querySelector('.botanical-modal');
    const visual = modal?.querySelector('.botanical-modal-visual');
    const content = modal?.querySelector('.botanical-modal-content');
    if (!modal || !visual || !content) return;
    visual.classList.add('vetwel-real-photo');
    visual.innerHTML = photoMarkup(mushroom.id, mushroom.name, mushroom.latin);
    content.innerHTML = `
      <p class="botanical-modal-kicker">VETWEL® BOTANİK & FONKSİYONEL İÇERİK REHBERİ</p>
      <h2 id="botanical-modal-title">${mushroom.name}</h2>
      <span class="botanical-modal-latin">${mushroom.latin}</span>
      <h3>İçerik hakkında</h3><p>${mushroom.about}</p>
      <h3>VetWel formülasyonundaki rolü</h3><p>${mushroom.role}</p>
      ${mushroom.caution ? `<p class="botanical-modal-caution"><strong>Dikkat:</strong> ${mushroom.caution}</p>` : ''}
      <h3>Geçtiği ürünler</h3><div class="botanical-modal-products">${mushroom.products.map((product) => `<span class="botanical-modal-chip">${product}</span>`).join('')}</div>
      <div class="botanical-modal-actions"><a href="botanik-rehberi.html#${mushroom.id}">Botanik Rehberinde Gör</a><button type="button" class="botanical-modal-secondary-close">Kapat</button></div>
      <p class="botanical-schematic-note">Gerçek mantar fotoğrafı; kaynak ve lisans bilgisi görsel üzerinde belirtilmiştir.</p>`;
    content.querySelector('.botanical-modal-secondary-close')?.addEventListener('click', () => modal.querySelector('.botanical-close')?.click());
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
    trigger?.setAttribute('aria-expanded','true');
  };

  const initMushroomCards = () => {
    const modal = document.querySelector('.botanical-modal');
    if (!modal) return false;
    let found = false;
    document.querySelectorAll('.ingredient-item').forEach((item) => {
      const label = item.querySelector('strong')?.textContent?.trim();
      const mushroom = mushrooms[label];
      if (!mushroom) return;
      found = true;
      if (item.dataset.vetwelMushroomReady === '1') return;
      item.dataset.vetwelMushroomReady = '1';
      item.dataset.botanicalId = mushroom.id;
      item.classList.add('botanical-clickable');
      item.setAttribute('role','button');
      item.setAttribute('tabindex','0');
      item.setAttribute('aria-label',`${mushroom.name} hakkında içeriği incele`);
      const hint = document.createElement('span');
      hint.className = 'botanical-item-hint';
      hint.textContent = 'İçeriği incele';
      item.appendChild(hint);
      item.addEventListener('click', (event) => { event.stopPropagation(); openMushroom(mushroom, item); });
      item.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        event.stopPropagation();
        openMushroom(mushroom, item);
      });
    });
    return found;
  };

  document.addEventListener('click', (event) => {
    const item = event.target.closest?.('.ingredient-item.botanical-clickable');
    if (item && !item.dataset.vetwelMushroomReady) replaceVisual(item);
  }, true);

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const item = event.target.closest?.('.ingredient-item.botanical-clickable');
    if (item && !item.dataset.vetwelMushroomReady) replaceVisual(item);
  }, true);

  let attempts = 0;
  const timer = setInterval(() => {
    attempts += 1;
    if (initMushroomCards() || attempts > 50) clearInterval(timer);
  }, 100);
  if (document.readyState !== 'loading') initMushroomCards();
  else document.addEventListener('DOMContentLoaded', initMushroomCards);
})();
