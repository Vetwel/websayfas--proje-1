// VetWel Turkey clinic-finder visual alignment.
// Presentation only: purchasing-channel logic and clinic-finder behavior are unchanged.
(() => {
  const apply = () => {
    if (document.documentElement.lang === 'en' || !document.querySelector('#nereden-alinir')) return;
    if (document.querySelector('#vetwel-channel-premium-style')) return;

    const style = document.createElement('style');
    style.id = 'vetwel-channel-premium-style';
    style.textContent = `
      #nereden-alinir.vet-channel-section{
        background:linear-gradient(180deg,#f7f9fc 0%,#f1f6f9 100%)!important;
        color:#24384d!important;
        border-top:1px solid #e6edf3!important;
        border-bottom:1px solid #e6edf3!important;
      }
      #nereden-alinir.vet-channel-section:before{
        width:440px!important;height:440px!important;right:-175px!important;top:-185px!important;
        background:rgba(76,145,169,.07)!important;
      }
      #nereden-alinir .vet-channel-grid{gap:58px!important;}
      #nereden-alinir .vet-channel-badge{
        background:#e9f4f5!important;
        border:1px solid #d2e7e9!important;
        color:#317083!important;
        box-shadow:none!important;
      }
      #nereden-alinir .vet-channel-copy h2{
        color:#0b2447!important;
        font-size:clamp(32px,4.15vw,50px)!important;
        line-height:1.08!important;
        letter-spacing:-1.6px!important;
      }
      #nereden-alinir .vet-channel-copy>p{
        color:#607184!important;
        font-size:16px!important;
        line-height:1.75!important;
      }
      #nereden-alinir .vet-channel-copy>p strong{color:#304b65!important;}
      #nereden-alinir .vet-channel-steps{gap:13px!important;margin-top:28px!important;}
      #nereden-alinir .vet-channel-step{
        min-height:104px!important;
        padding:18px 17px!important;
        background:#fff!important;
        border:1px solid #dfe8ef!important;
        border-radius:16px!important;
        box-shadow:0 7px 22px rgba(17,50,78,.045)!important;
      }
      #nereden-alinir .vet-channel-step strong{
        display:inline-grid!important;
        place-items:center!important;
        width:29px!important;height:29px!important;
        margin-bottom:11px!important;
        border-radius:9px!important;
        background:#eaf3f7!important;
        color:#315f7d!important;
        font-size:10px!important;
        letter-spacing:.5px!important;
      }
      #nereden-alinir .vet-channel-step span{
        color:#344c62!important;
        font-size:13px!important;
        font-weight:750!important;
        line-height:1.45!important;
      }
      #nereden-alinir .vet-clinic-card{
        background:#fff!important;
        color:#172333!important;
        border:1px solid #dce6ee!important;
        border-radius:20px!important;
        padding:31px!important;
        box-shadow:0 12px 36px rgba(17,50,78,.08)!important;
      }
      #nereden-alinir .vet-clinic-card .clinic-icon{
        width:50px!important;height:50px!important;
        border-radius:14px!important;
        background:#edf5f7!important;
        border:1px solid #dcebed!important;
        color:#2b6881!important;
      }
      #nereden-alinir .vet-clinic-card h3{color:#0b2447!important;font-size:25px!important;}
      #nereden-alinir .vet-clinic-card>p{color:#69798a!important;}
      #nereden-alinir .vet-clinic-features{color:#53697d!important;}
      #nereden-alinir .vet-clinic-features li:before{
        background:#edf7f1!important;
        color:#397356!important;
      }
      #nereden-alinir .vet-clinic-card .button-primary{
        background:#0b2447!important;
        border-color:#0b2447!important;
        color:#fff!important;
        box-shadow:0 8px 20px rgba(11,36,71,.12)!important;
      }
      #nereden-alinir .vet-clinic-card .button-primary:hover{
        background:#173f6b!important;
        border-color:#173f6b!important;
      }
      #nereden-alinir .vet-channel-actions .button-light{
        background:#0b2447!important;
        border-color:#0b2447!important;
        color:#fff!important;
      }
      #nereden-alinir .vet-channel-actions .button-secondary{
        background:#fff!important;
        border-color:#ccd9e3!important;
        color:#0b2447!important;
      }
      #nereden-alinir .vet-channel-actions .button-secondary:hover{
        background:#eef4f8!important;
        border-color:#c1d2df!important;
      }
      @media(max-width:900px){
        #nereden-alinir .vet-channel-grid{gap:35px!important;}
      }
      @media(max-width:640px){
        #nereden-alinir .vet-channel-copy h2{font-size:34px!important;letter-spacing:-1px!important;}
        #nereden-alinir .vet-channel-step{min-height:auto!important;}
        #nereden-alinir .vet-clinic-card{padding:24px!important;}
      }
    `;
    document.head.appendChild(style);
  };

  if (document.readyState === 'complete') apply();
  else window.addEventListener('load', apply, { once:true });
})();

// Benefit-first hierarchy for homepage Solutions cards in both Turkish and English.
// The original H3 product name is kept in place (but visually secondary) so existing
// product-link and scrolling logic continues to work without changing navigation behavior.
(() => {
  const applySolutionHierarchy = () => {
    const grid = document.querySelector('.solutions-grid');
    if (!grid || grid.dataset.vetwelBenefitFirst === '1') return;

    const isEnglish = document.documentElement.lang === 'en';
    const copy = {
      '.solution-respiratory': {
        tr: 'Solunum yolları ve günlük solunum konforu desteği',
        en: 'Respiratory wellness & everyday breathing comfort'
      },
      '.solution-urinary': {
        tr: 'Üriner sistem bakımı ve normal üriner konfor desteği',
        en: 'Urinary tract care & normal urinary comfort'
      },
      '.solution-kidney': {
        tr: 'Böbrek fonksiyonları ve mineral dengesi desteği',
        en: 'Kidney function & mineral balance support'
      },
      '.solution-liver': {
        tr: 'Karaciğer fonksiyonları ve antioksidan destek',
        en: 'Liver function & antioxidant support'
      },
      '.solution-skin': {
        tr: 'Deri bariyeri ve tüy kalitesi desteği',
        en: 'Skin barrier & coat quality support'
      },
      '.solution-heart': {
        tr: 'Kalp ve dolaşım fonksiyonlarının desteği',
        en: 'Heart & circulatory function support'
      },
      '.solution-digestive': {
        tr: 'Sindirim, mikrobiyota ve dışkı kalitesi desteği',
        en: 'Digestive, microbiota & stool quality support'
      },
      '.solution-calm': {
        tr: 'Sakinlik ve davranış dengesi desteği',
        en: 'Calm behavior & environmental adaptation support'
      },
      '.solution-dental': {
        tr: 'Ağız hijyeni, diş eti ve mukoza bakımı',
        en: 'Oral hygiene, gum & mucosal care'
      },
      '.solution-daily': {
        tr: 'Tüy yumağı yönetimi ve sindirim desteği',
        en: 'Hairball management & digestive support'
      },
      '.solution-advanced': {
        tr: 'Özel bakım dönemlerinde beslenme ve yaşam kalitesi desteği',
        en: 'Nutritional & quality-of-life support during special-care periods'
      }
    };

    if (!document.querySelector('#vetwel-solution-hierarchy-style')) {
      const style = document.createElement('style');
      style.id = 'vetwel-solution-hierarchy-style';
      style.textContent = `
        .solution-card .solution-main-title{
          margin:8px 0 7px;
          color:#0b2447;
          font-size:clamp(18px,1.55vw,22px);
          font-weight:800;
          line-height:1.28;
          letter-spacing:-.35px;
        }
        .solution-card h3.solution-product-name{
          margin:0 0 11px!important;
          font-size:13px!important;
          line-height:1.35!important;
          font-weight:800!important;
          letter-spacing:.15px!important;
          opacity:.78;
        }
        .solution-card h3.solution-product-name:before{
          content:'VetWel®  ·  ';
          font-size:9px;
          font-weight:800;
          letter-spacing:.55px;
          text-transform:uppercase;
          opacity:.72;
        }
        .solution-card>a{
          margin-top:2px;
        }
        @media(max-width:700px){
          .solution-card .solution-main-title{font-size:19px;}
        }
      `;
      document.head.appendChild(style);
    }

    Object.entries(copy).forEach(([selector, labels]) => {
      const card = grid.querySelector(selector);
      if (!card) return;
      const productName = card.querySelector('h3');
      const category = card.querySelector('.solution-category');
      if (!productName || !category || card.querySelector('.solution-main-title')) return;

      const mainTitle = document.createElement('div');
      mainTitle.className = 'solution-main-title';
      mainTitle.textContent = isEnglish ? labels.en : labels.tr;
      productName.before(mainTitle);
      productName.classList.add('solution-product-name');

      const link = card.querySelector('a');
      if (link) {
        link.innerHTML = `${isEnglish ? 'Explore Solution' : 'Çözümü İncele'} <span aria-hidden="true">→</span>`;
      }
    });

    grid.dataset.vetwelBenefitFirst = '1';
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applySolutionHierarchy, { once:true });
  } else {
    applySolutionHierarchy();
  }
})();

// Keep the two CalmWel forms next to each other on the Turkish homepage product grid.
// Malign Detox is moved immediately before the CalmWel pair, preserving every card's
// existing content, links, IDs and visual styling.
(() => {
  const applyCalmWelOrder = () => {
    if (document.documentElement.lang === 'en') return;
    const grid = document.querySelector('#urunler .product-grid');
    if (!grid || grid.dataset.calmwelGrouped === '1') return;

    const calmTablet = grid.querySelector('a[href="education-calmwel-tablet.html"]')?.closest('.product-card');
    const calmLiquid = grid.querySelector('a[href="education-calmwel-liquid.html"]')?.closest('.product-card');
    const malignDetox = grid.querySelector('a[href="education-malign-detox.html"]')?.closest('.product-card');

    if (!calmTablet || !calmLiquid || !malignDetox) return;

    grid.insertBefore(malignDetox, calmTablet);
    grid.dataset.calmwelGrouped = '1';
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyCalmWelOrder, { once:true });
  } else {
    applyCalmWelOrder();
  }
})();
