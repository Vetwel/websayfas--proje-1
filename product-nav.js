// Shared navigation and botanical explorer for VetWel Turkish product information pages.
document.addEventListener("DOMContentLoaded", () => {
  const isTurkish = document.documentElement.lang === "tr";
  const productPage = document.querySelector(".product-page");
  if (!isTurkish || !productPage) return;

  const productContainer = productPage.querySelector(".product-container");
  if (!productContainer || document.querySelector(".product-site-header")) return;

  // Keep Turkish common names aligned with the scientific names shown on product pages.
  document.querySelectorAll(".ingredient-item").forEach((item) => {
    const scientificText = item.textContent;
    const label = item.querySelector("strong");
    if (!label) return;
    const numberPrefix = label.textContent.match(/^\s*(\d+\.\s*)/)?.[1] || "";

    if (scientificText.includes("Taraxacum officinale") && /\bHindiba\b/.test(label.textContent) && !label.textContent.includes("Karahindiba")) {
      label.textContent = `${numberPrefix}Karahindiba`;
    }
    if (scientificText.includes("Lespedeza capitata") && label.textContent.includes("Java Çayı")) {
      label.textContent = `${numberPrefix}Lespedeza`;
    }
    if (scientificText.includes("Orthosiphon stamineus") && (label.textContent.includes("Yayla Tütünü") || label.textContent.includes("Orthosiphon"))) {
      label.textContent = `${numberPrefix}Java Çayı`;
    }
  });

  const productName = document.querySelector(".product-hero h1")?.textContent.trim() || "Ürün Bilgisi";

  const style = document.createElement("style");
  style.id = "vetwel-product-navigation-styles";
  style.textContent = `
    .product-site-header{position:sticky;top:0;z-index:1200;background:rgba(255,255,255,.96);border-bottom:1px solid #e2e8ef;box-shadow:0 8px 28px rgba(11,36,71,.06);backdrop-filter:blur(14px)}
    .product-site-header *{box-sizing:border-box}.product-site-header-inner{width:min(1180px,calc(100% - 40px));min-height:70px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:24px;position:relative}.product-site-brand{display:inline-flex;align-items:center;gap:10px;color:#0b2447;text-decoration:none;flex-shrink:0}.product-site-brand-mark{width:38px;height:38px;display:grid;place-items:center;border-radius:12px;background:#0b2447;color:#fff;font-size:22px;font-weight:900;line-height:1}.product-site-brand-copy{display:flex;flex-direction:column;line-height:1}.product-site-brand-copy strong{font-size:21px;letter-spacing:-.6px;color:#0b2447}.product-site-brand-copy small{margin-top:5px;font-size:8px;letter-spacing:1.25px;font-weight:800;color:#6b7888;text-transform:uppercase}.product-site-nav{display:flex;align-items:center;gap:17px}.product-site-nav a{color:#47566a;text-decoration:none;font-size:12px;font-weight:750;white-space:nowrap}.product-site-nav a:hover,.product-site-nav a:focus{color:#0b2447}.product-site-nav .product-site-clinic{padding:10px 15px;border-radius:999px;background:#0b2447;color:#fff}.product-site-nav .product-site-clinic:hover{color:#fff;background:#1b4e7a}.product-site-menu{display:none;width:42px;height:42px;padding:9px;border:0;border-radius:10px;background:#f1f5f8;color:#0b2447;font-size:21px;font-weight:900;cursor:pointer}.product-breadcrumb{display:flex;align-items:center;flex-wrap:wrap;gap:8px;margin:0 0 18px;color:#7a8796;font-size:12px;font-weight:700}.product-breadcrumb a{color:#42688d;text-decoration:none}.product-breadcrumb a:hover{text-decoration:underline}.product-back{display:inline-flex!important;align-items:center;gap:7px;padding:10px 15px!important;margin-bottom:24px!important;border:1px solid #d8e2eb;border-radius:999px;background:#fff;color:#294d73!important;text-decoration:none!important;box-shadow:0 7px 20px rgba(23,63,107,.05)}.product-back:hover{background:#eef5fa;text-decoration:none!important}.product-exit-nav{margin-top:34px;padding:30px;border:1px solid #dce5ed;border-radius:22px;background:linear-gradient(135deg,#eef5fa 0%,#f8fbfd 100%);box-shadow:0 10px 30px rgba(11,36,71,.06)}.product-exit-nav h2{margin:0 0 8px!important;color:#0b2447!important;font-size:24px!important}.product-exit-nav p{margin:0 0 20px!important;color:#667587!important;line-height:1.6!important}.product-exit-actions{display:flex;flex-wrap:wrap;gap:11px}.product-exit-actions a{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:11px 18px;border-radius:999px;text-decoration:none;font-size:13px;font-weight:800}.product-exit-primary{background:#0b2447;color:#fff!important}.product-exit-secondary{background:#fff;color:#0b2447!important;border:1px solid #ccd8e3}.product-exit-actions a:hover{transform:translateY(-1px)}
    .botanical-callout{display:flex;align-items:center;justify-content:space-between;gap:15px;margin:18px 0;padding:14px 16px;border:1px solid #d8e7dc;border-radius:14px;background:#f1f8f3;color:#496457;font-size:12px;line-height:1.55}.botanical-callout strong{color:#25533a}.botanical-callout a{color:#255d42;font-weight:800;text-decoration:none;white-space:nowrap}.ingredient-item.botanical-clickable{position:relative;cursor:pointer;padding-bottom:38px!important;transition:transform .18s ease,box-shadow .18s ease,border-color .18s ease}.ingredient-item.botanical-clickable:hover,.ingredient-item.botanical-clickable:focus{transform:translateY(-2px);border-color:#a9ccb2;box-shadow:0 10px 24px rgba(41,94,59,.09);outline:none}.botanical-item-hint{position:absolute;left:16px;bottom:12px;display:inline-flex;align-items:center;gap:5px;color:#34704c;font-size:9px;font-weight:900;letter-spacing:.35px;text-transform:uppercase}.botanical-item-hint:before{content:'✦';font-size:10px}.botanical-modal{position:fixed;inset:0;z-index:3000;display:none;align-items:center;justify-content:center;padding:20px;background:rgba(4,19,34,.62);backdrop-filter:blur(7px)}.botanical-modal.open{display:flex}.botanical-dialog{position:relative;width:min(820px,100%);max-height:min(760px,90vh);overflow:auto;background:#fff;border-radius:26px;box-shadow:0 28px 80px rgba(0,0,0,.28)}.botanical-close{position:absolute;right:18px;top:18px;z-index:2;width:42px;height:42px;border:0;border-radius:50%;background:rgba(255,255,255,.9);color:#173f6b;font-size:25px;cursor:pointer;box-shadow:0 6px 18px rgba(11,36,71,.12)}.botanical-modal-grid{display:grid;grid-template-columns:310px minmax(0,1fr)}.botanical-modal-visual{min-height:410px;padding:42px;display:flex;align-items:center;justify-content:center;background:linear-gradient(150deg,#e9f4ec,#f8fbf9);color:#3f7650}.botanical-modal-visual svg{width:100%;max-width:255px}.botanical-modal-content{padding:42px 40px}.botanical-modal-kicker{margin:0 0 8px;color:#4b765b;font-size:10px;font-weight:900;letter-spacing:1.2px}.botanical-modal-content h2{margin:0;color:#0b2447;font-size:31px}.botanical-modal-latin{display:block;margin-top:5px;color:#718091;font-size:13px;font-style:italic}.botanical-modal-content h3{margin:23px 0 7px;color:#234e72;font-size:11px;letter-spacing:.6px;text-transform:uppercase}.botanical-modal-content p{margin:0;color:#5d6d7d;font-size:13px;line-height:1.7}.botanical-modal-products{display:flex;flex-wrap:wrap;gap:7px;margin-top:10px}.botanical-modal-chip{padding:6px 9px;border-radius:999px;background:#edf4f8;color:#345d7e;font-size:10px;font-weight:800}.botanical-modal-caution{margin-top:17px!important;padding:12px 14px;border-left:4px solid #c89943;border-radius:10px;background:#fff8ea;color:#6e5c39!important}.botanical-modal-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:24px}.botanical-modal-actions a,.botanical-modal-actions button{display:inline-flex;align-items:center;justify-content:center;min-height:43px;padding:10px 15px;border-radius:999px;font:inherit;font-size:11px;font-weight:850;text-decoration:none;cursor:pointer}.botanical-modal-actions a{background:#0b2447;color:#fff}.botanical-modal-actions button{border:1px solid #d4dfe8;background:#fff;color:#294d73}.botanical-schematic-note{margin-top:15px!important;font-size:10px!important;color:#8793a0!important}
    @media(max-width:940px){.product-site-nav{gap:12px}.product-site-nav a{font-size:11px}}
    @media(max-width:860px){.product-site-menu{display:block}.product-site-nav{display:none;position:absolute;top:61px;right:0;left:0;flex-direction:column;align-items:stretch;gap:0;padding:10px;background:#fff;border:1px solid #e1e8ee;border-radius:16px;box-shadow:0 18px 45px rgba(11,36,71,.14)}.product-site-nav.open{display:flex}.product-site-nav a{padding:12px 14px;border-radius:10px;font-size:13px}.product-site-nav .product-site-clinic{margin-top:4px;text-align:center}.botanical-modal-grid{grid-template-columns:245px 1fr}.botanical-modal-content{padding:36px 30px}.botanical-modal-visual{min-height:390px;padding:30px}}
    @media(max-width:650px){.botanical-callout{align-items:flex-start;flex-direction:column}.botanical-modal{padding:10px}.botanical-dialog{border-radius:20px;max-height:94vh}.botanical-modal-grid{grid-template-columns:1fr}.botanical-modal-visual{min-height:210px;height:230px;padding:24px}.botanical-modal-visual svg{max-width:190px;max-height:190px}.botanical-modal-content{padding:28px 22px 25px}.botanical-modal-content h2{font-size:26px}.botanical-close{right:12px;top:12px}}
    @media(max-width:560px){.product-site-header-inner{width:min(100% - 24px,1180px);min-height:64px}.product-site-brand-copy strong{font-size:19px}.product-site-brand-mark{width:35px;height:35px}.product-exit-nav{padding:23px 20px}.product-exit-actions{display:grid;grid-template-columns:1fr}.product-exit-actions a{width:100%}}
  `;
  document.head.appendChild(style);

  const header = document.createElement("header");
  header.className = "product-site-header";
  header.innerHTML = `
    <div class="product-site-header-inner">
      <a class="product-site-brand" href="index.html" aria-label="VetWel ana sayfa">
        <span class="product-site-brand-mark" aria-hidden="true">+</span>
        <span class="product-site-brand-copy"><strong>VetWel<sup>®</sup></strong><small>Veterinary Wellness</small></span>
      </a>
      <button class="product-site-menu" type="button" aria-label="Menüyü aç" aria-expanded="false">☰</button>
      <nav class="product-site-nav" aria-label="Ürün sayfası menüsü">
        <a href="index.html">Ana Sayfa</a>
        <a href="index.html#urunler">Ürünler</a>
        <a href="education.html">Bilgi Merkezi</a>
        <a href="botanik-rehberi.html">Botanik Rehberi</a>
        <a class="product-site-clinic" href="klinik-bul.html">Klinik Bul</a>
        <a href="index.html#iletisim">İletişim</a>
      </nav>
    </div>`;
  document.body.insertBefore(header, productPage);

  const breadcrumb = document.createElement("div");
  breadcrumb.className = "product-breadcrumb";
  breadcrumb.setAttribute("aria-label", "Sayfa yolu");
  breadcrumb.innerHTML = `<a href="index.html">Ana Sayfa</a><span>›</span><a href="index.html#urunler">Ürünler</a><span>›</span><span>${productName}</span>`;
  productContainer.insertBefore(breadcrumb, productContainer.firstChild);

  const backLink = productContainer.querySelector(".product-back");
  if (backLink) {
    backLink.href = "index.html#urunler";
    backLink.textContent = "← Tüm Ürünlere Dön";
  }

  const exitNav = document.createElement("section");
  exitNav.className = "product-exit-nav";
  exitNav.setAttribute("aria-label", "Ürün ve klinik seçenekleri");
  exitNav.innerHTML = `
    <h2>Bu ürün evcil hayvanınız için uygun mu?</h2>
    <p><strong>Veterinerinize VetWel®’i sorun.</strong> VetWel® ürünleri yalnızca veteriner kliniklerinde sunulur. Ürün seçimi ve kullanım planı için veteriner hekiminize danışın; ardından size en yakın VetWel kliniğini bulun.</p>
    <div class="product-exit-actions">
      <a class="product-exit-primary" href="klinik-bul.html">Klinik Bul</a>
      <a class="product-exit-secondary" href="index.html#urunler">Tüm Ürünleri Gör</a>
      <a class="product-exit-secondary" href="botanik-rehberi.html">Botanik Rehberi</a>
      <a class="product-exit-secondary" href="education.html">Bilgi Merkezine Git</a>
    </div>`;
  productContainer.appendChild(exitNav);

  const menuButton = header.querySelector(".product-site-menu");
  const nav = header.querySelector(".product-site-nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!open));
      menuButton.setAttribute("aria-label", open ? "Menüyü aç" : "Menüyü kapat");
      menuButton.textContent = open ? "☰" : "×";
      nav.classList.toggle("open", !open);
    });
    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Menüyü aç");
      menuButton.textContent = "☰";
    }));
  }

  const initBotanicalExplorer = () => {
    if (!window.VETWEL_BOTANICALS || !window.VetWelBotanical) return;
    const clickableItems = [];

    document.querySelectorAll(".ingredient-item").forEach((item) => {
      const label = item.querySelector("strong");
      if (!label) return;
      const plant = window.VetWelBotanical.find(item.textContent, label.textContent);
      if (!plant) return;

      item.classList.add("botanical-clickable");
      item.setAttribute("role", "button");
      item.setAttribute("tabindex", "0");
      item.setAttribute("aria-label", `${plant.name} hakkında botanik bilgiyi aç`);
      item.dataset.botanicalId = plant.id;
      const hint = document.createElement("span");
      hint.className = "botanical-item-hint";
      hint.textContent = "Bitkiyi incele";
      item.appendChild(hint);
      clickableItems.push(item);
    });

    if (!clickableItems.length) return;

    const firstGrid = clickableItems[0].closest(".ingredient-grid");
    if (firstGrid && !document.querySelector(".botanical-callout")) {
      const callout = document.createElement("div");
      callout.className = "botanical-callout";
      callout.innerHTML = `<span><strong>Botanik içerikleri keşfedin.</strong> Yeşil etkileşimli kartlara dokunarak bitkinin şematik görünümünü ve formülasyondaki rolünü inceleyebilirsiniz.</span><a href="botanik-rehberi.html">Tüm rehberi aç →</a>`;
      firstGrid.parentNode.insertBefore(callout, firstGrid);
    }

    const modal = document.createElement("div");
    modal.className = "botanical-modal";
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML = `<div class="botanical-dialog" role="dialog" aria-modal="true" aria-labelledby="botanical-modal-title"><button class="botanical-close" type="button" aria-label="Kapat">×</button><div class="botanical-modal-grid"><div class="botanical-modal-visual"></div><div class="botanical-modal-content"></div></div></div>`;
    document.body.appendChild(modal);

    const closeButton = modal.querySelector(".botanical-close");
    const visual = modal.querySelector(".botanical-modal-visual");
    const content = modal.querySelector(".botanical-modal-content");
    let lastFocused = null;

    const closeModal = () => {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lastFocused) lastFocused.focus();
    };

    const openModal = (plant, trigger) => {
      lastFocused = trigger;
      visual.classList.remove("vetwel-real-photo");
      visual.innerHTML = window.VetWelBotanical.visual(plant.visual);
      content.innerHTML = `
        <p class="botanical-modal-kicker">VETWEL® BOTANİK REHBERİ</p>
        <h2 id="botanical-modal-title">${plant.name}</h2>
        <span class="botanical-modal-latin">${plant.latin}</span>
        <h3>Bitki hakkında</h3><p>${plant.about}</p>
        <h3>VetWel formülasyonundaki rolü</h3><p>${plant.role}</p>
        ${plant.caution ? `<p class="botanical-modal-caution"><strong>Dikkat:</strong> ${plant.caution}</p>` : ""}
        <h3>Geçtiği ürünler</h3><div class="botanical-modal-products">${plant.products.map((product) => `<span class="botanical-modal-chip">${product}</span>`).join("")}</div>
        <div class="botanical-modal-actions"><a href="botanik-rehberi.html#${plant.id}">Botanik Rehberinde Gör</a><button type="button" class="botanical-modal-secondary-close">Kapat</button></div>
        <p class="botanical-schematic-note">Şematik çizim eğitim amaçlıdır ve botanik tanımlama amacıyla kullanılmamalıdır.</p>`;
      content.querySelector(".botanical-modal-secondary-close")?.addEventListener("click", closeModal);
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      closeButton.focus();
    };

    clickableItems.forEach((item) => {
      const plant = window.VETWEL_BOTANICALS.find((entry) => entry.id === item.dataset.botanicalId);
      if (!plant) return;
      item.addEventListener("click", () => openModal(plant, item));
      item.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openModal(plant, item);
        }
      });
    });

    closeButton.addEventListener("click", closeModal);
    modal.addEventListener("click", (event) => { if (event.target === modal) closeModal(); });
    document.addEventListener("keydown", (event) => { if (event.key === "Escape" && modal.classList.contains("open")) closeModal(); });
  };

  if (window.VETWEL_BOTANICALS && window.VetWelBotanical) {
    initBotanicalExplorer();
  } else {
    const botanicalScript = document.createElement("script");
    botanicalScript.src = "botanical-data.js";
    botanicalScript.onload = initBotanicalExplorer;
    botanicalScript.onerror = () => console.warn("VetWel botanical data could not be loaded.");
    document.head.appendChild(botanicalScript);
  }
});

// Load the shared scientific evidence layer for Turkish product pages.
(() => {
  const scientificScript = document.createElement("script");
  scientificScript.src = "scientific-evidence.js";
  scientificScript.async = true;
  scientificScript.onerror = () => console.warn("VetWel scientific evidence data could not be loaded.");
  document.head.appendChild(scientificScript);
})();

// Keep product-page botanical modals aligned with the real photos used in the Botanical Guide.
(() => {
  const photoScript = document.createElement("script");
  photoScript.src = "botanical-modal-photos.js";
  photoScript.async = true;
  photoScript.onerror = () => console.warn("VetWel botanical modal photos could not be loaded.");
  document.head.appendChild(photoScript);
})();

// Load the public VetWel health assistant on product information pages.
(() => {
  if (window.__VETWEL_AI_LOADED__ || document.querySelector('[data-vetwel-ai-loader]')) return;
  window.VETWEL_AI_ENDPOINT = "https://vetwel-public-ai.oben-ak.workers.dev/api/chat";
  const assistantScript = document.createElement("script");
  assistantScript.src = "https://vetwel-public-ai.oben-ak.workers.dev/vetwel-ai.js";
  assistantScript.defer = true;
  assistantScript.dataset.vetwelAiLoader = "1";
  assistantScript.onerror = () => console.warn("VetWel health assistant could not be loaded.");
  document.head.appendChild(assistantScript);
})();
