// Shared navigation for VetWel Turkish product information pages.
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
    .product-site-header *{box-sizing:border-box}
    .product-site-header-inner{width:min(1180px,calc(100% - 40px));min-height:70px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:24px;position:relative}
    .product-site-brand{display:inline-flex;align-items:center;gap:10px;color:#0b2447;text-decoration:none;flex-shrink:0}
    .product-site-brand-mark{width:38px;height:38px;display:grid;place-items:center;border-radius:12px;background:#0b2447;color:#fff;font-size:22px;font-weight:900;line-height:1}
    .product-site-brand-copy{display:flex;flex-direction:column;line-height:1}
    .product-site-brand-copy strong{font-size:21px;letter-spacing:-.6px;color:#0b2447}
    .product-site-brand-copy small{margin-top:5px;font-size:8px;letter-spacing:1.25px;font-weight:800;color:#6b7888;text-transform:uppercase}
    .product-site-nav{display:flex;align-items:center;gap:23px}
    .product-site-nav a{color:#47566a;text-decoration:none;font-size:13px;font-weight:750;white-space:nowrap}
    .product-site-nav a:hover,.product-site-nav a:focus{color:#0b2447}
    .product-site-nav .product-site-clinic{padding:10px 15px;border-radius:999px;background:#0b2447;color:#fff}
    .product-site-nav .product-site-clinic:hover{color:#fff;background:#1b4e7a}
    .product-site-menu{display:none;width:42px;height:42px;padding:9px;border:0;border-radius:10px;background:#f1f5f8;color:#0b2447;font-size:21px;font-weight:900;cursor:pointer}
    .product-breadcrumb{display:flex;align-items:center;flex-wrap:wrap;gap:8px;margin:0 0 18px;color:#7a8796;font-size:12px;font-weight:700}
    .product-breadcrumb a{color:#42688d;text-decoration:none}
    .product-breadcrumb a:hover{text-decoration:underline}
    .product-back{display:inline-flex!important;align-items:center;gap:7px;padding:10px 15px!important;margin-bottom:24px!important;border:1px solid #d8e2eb;border-radius:999px;background:#fff;color:#294d73!important;text-decoration:none!important;box-shadow:0 7px 20px rgba(23,63,107,.05)}
    .product-back:hover{background:#eef5fa;text-decoration:none!important}
    .product-exit-nav{margin-top:34px;padding:30px;border:1px solid #dce5ed;border-radius:22px;background:linear-gradient(135deg,#eef5fa 0%,#f8fbfd 100%);box-shadow:0 10px 30px rgba(11,36,71,.06)}
    .product-exit-nav h2{margin:0 0 8px!important;color:#0b2447!important;font-size:24px!important}
    .product-exit-nav p{margin:0 0 20px!important;color:#667587!important;line-height:1.6!important}
    .product-exit-actions{display:flex;flex-wrap:wrap;gap:11px}
    .product-exit-actions a{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:11px 18px;border-radius:999px;text-decoration:none;font-size:13px;font-weight:800}
    .product-exit-primary{background:#0b2447;color:#fff!important}
    .product-exit-secondary{background:#fff;color:#0b2447!important;border:1px solid #ccd8e3}
    .product-exit-actions a:hover{transform:translateY(-1px)}
    @media(max-width:860px){
      .product-site-menu{display:block}
      .product-site-nav{display:none;position:absolute;top:61px;right:0;left:0;flex-direction:column;align-items:stretch;gap:0;padding:10px;background:#fff;border:1px solid #e1e8ee;border-radius:16px;box-shadow:0 18px 45px rgba(11,36,71,.14)}
      .product-site-nav.open{display:flex}
      .product-site-nav a{padding:12px 14px;border-radius:10px}
      .product-site-nav .product-site-clinic{margin-top:4px;text-align:center}
    }
    @media(max-width:560px){
      .product-site-header-inner{width:min(100% - 24px,1180px);min-height:64px}
      .product-site-brand-copy strong{font-size:19px}
      .product-site-brand-mark{width:35px;height:35px}
      .product-exit-nav{padding:23px 20px}
      .product-exit-actions{display:grid;grid-template-columns:1fr}
      .product-exit-actions a{width:100%}
    }
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
        <a href="index.html#nereden-alinir">Nereden Alınır?</a>
        <a class="product-site-clinic" href="index.html#iletisim">İletişim</a>
      </nav>
    </div>
  `;
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
  exitNav.setAttribute("aria-label", "VetWel navigasyon seçenekleri");
  exitNav.innerHTML = `
    <h2>VetWel'de keşfetmeye devam edin</h2>
    <p>Diğer ürünleri inceleyebilir, Bilgi Merkezi'ne dönebilir veya size en yakın VetWel satış noktası hakkında bilgi alabilirsiniz.</p>
    <div class="product-exit-actions">
      <a class="product-exit-primary" href="index.html#urunler">Tüm Ürünleri Gör</a>
      <a class="product-exit-secondary" href="index.html#nereden-alinir">Nereden Alınır?</a>
      <a class="product-exit-secondary" href="education.html">Bilgi Merkezine Git</a>
    </div>
  `;
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
});
