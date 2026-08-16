document.addEventListener("DOMContentLoaded", () => {
  const isEnglish = document.documentElement.lang === "en";
  const path = window.location.pathname;
  const isTurkishHomepage = !isEnglish && (path.endsWith("/") || path.endsWith("/index.html"));
  const isTurkishEducation = !isEnglish && path.endsWith("/education.html");
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".primary-navigation");
  const educationNavigation = document.querySelector(".education-nav");
  const backToTopButton = document.querySelector(".back-to-top");
  const currentYear = document.querySelector("#current-year");

  if (navigation && isTurkishHomepage) {
    const existingLanguageLink = navigation.querySelector('a[href="en/index.html"]');
    if (!existingLanguageLink) {
      const languageLink = document.createElement("a");
      languageLink.href = "en/index.html";
      languageLink.textContent = "EN";
      languageLink.setAttribute("aria-label", "English site");
      navigation.appendChild(languageLink);
    }

    if (!navigation.querySelector('a[href="botanik-rehberi.html"]')) {
      const botanicalLink = document.createElement("a");
      botanicalLink.href = "botanik-rehberi.html";
      botanicalLink.textContent = "Botanik Rehberi";
      botanicalLink.className = "mobile-nav-only";
      const contactLink = navigation.querySelector('a[href="#iletisim"]');
      if (contactLink) navigation.insertBefore(botanicalLink, contactLink);
      else navigation.appendChild(botanicalLink);
    }

    if (!document.querySelector("#vetwel-tr-mobile-nav-style")) {
      const navStyle = document.createElement("style");
      navStyle.id = "vetwel-tr-mobile-nav-style";
      navStyle.textContent = `
        .primary-navigation .mobile-nav-only{display:none!important;}
        @media(max-width:820px){
          .primary-navigation .mobile-nav-only{display:block!important;}
          .primary-navigation.open{
            max-height:calc(100vh - var(--header-height))!important;
            max-height:calc(100dvh - var(--header-height))!important;
            overflow-y:auto!important;
            overscroll-behavior:contain;
            -webkit-overflow-scrolling:touch;
          }
        }
      `;
      document.head.appendChild(navStyle);
    }

    if (!navigation.querySelector('a[href="klinik-bul.html"]')) {
      const channelLink = document.createElement("a");
      channelLink.href = "klinik-bul.html";
      channelLink.textContent = "Nereden Alınır?";
      const contactLink = navigation.querySelector('a[href="#iletisim"]');
      if (contactLink) navigation.insertBefore(channelLink, contactLink);
      else navigation.appendChild(channelLink);
    }
  }

  if (educationNavigation && isTurkishEducation && !educationNavigation.querySelector('a[href="klinik-bul.html"]')) {
    const channelLink = document.createElement("a");
    channelLink.href = "klinik-bul.html";
    channelLink.textContent = "Nereden Alınır?";
    const contactLink = educationNavigation.querySelector('a[href="index.html#iletisim"]');
    if (contactLink) educationNavigation.insertBefore(channelLink, contactLink);
    else educationNavigation.appendChild(channelLink);
  }

  if (isTurkishHomepage) {
    document.querySelectorAll(".product-card-tag").forEach((tag) => {
      tag.textContent = tag.textContent.trim().toLocaleUpperCase("en-US");
      tag.style.textTransform = "none";
      tag.setAttribute("lang", "en");
    });

    const purchaseFaqButton = [...document.querySelectorAll(".accordion-button")].find(
      (button) => button.textContent.includes("VetWel ürünlerini nereden satın alabilirim?")
    );
    const purchaseFaqText = purchaseFaqButton?.nextElementSibling?.querySelector("p");
    if (purchaseFaqText) {
      purchaseFaqText.textContent = "VetWel® ürünleri yalnızca veteriner kliniklerinde satılmaktadır. Size yakın VetWel ürünlerinin bulunduğu veteriner kliniklerini Klinik Bulucu üzerinden şehir, ilçe veya klinik adına göre görüntüleyebilirsiniz.";
    }

    const contactIntro = document.querySelector(".contact-content > p");
    if (contactIntro) {
      contactIntro.textContent = "Ürünlerimiz, veteriner iş birlikleri veya VetWel ürünlerinin bulunduğu veteriner klinikleri hakkında bilgi almak için bize ulaşabilirsiniz.";
    }

    const salesSubjectOption = [...document.querySelectorAll("#subject option")].find(
      (option) => option.textContent.trim() === "Satış ve dağıtım"
    );
    if (salesSubjectOption) salesSubjectOption.textContent = "Veteriner kliniği / dağıtım";
  }

  if (isTurkishHomepage && !document.querySelector("#nereden-alinir")) {
    const main = document.querySelector("main");
    const insertionPoint = document.querySelector(".education-section") || document.querySelector(".faq-section");

    if (main) {
      const style = document.createElement("style");
      style.id = "vetwel-turkey-channel-styles";
      style.textContent = `
        .vet-channel-section{background:linear-gradient(135deg,#071b35 0%,#0b3157 58%,#0c466b 100%);color:#fff;overflow:hidden;position:relative}
        .vet-channel-section:before{content:"";position:absolute;width:420px;height:420px;border-radius:50%;background:rgba(117,201,216,.12);right:-160px;top:-180px;pointer-events:none}
        .vet-channel-grid{display:grid;grid-template-columns:1.06fr .94fr;gap:54px;align-items:center;position:relative;z-index:1}
        .vet-channel-badge{display:inline-flex;align-items:center;gap:8px;padding:8px 13px;border-radius:999px;background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.18);font-size:12px;font-weight:800;letter-spacing:.8px;text-transform:uppercase;color:#bfeaf0;margin-bottom:18px}
        .vet-channel-copy h2{font-size:clamp(34px,4.6vw,54px);line-height:1.06;letter-spacing:-1.8px;margin:0 0 18px;color:#fff}
        .vet-channel-copy>p{max-width:670px;margin:0;color:rgba(255,255,255,.78);font-size:17px;line-height:1.75}
        .vet-channel-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:30px}
        .vet-channel-step{padding:18px 16px;border-radius:16px;background:rgba(255,255,255,.075);border:1px solid rgba(255,255,255,.12)}
        .vet-channel-step strong{display:block;color:#9de3ec;font-size:12px;letter-spacing:1px;margin-bottom:7px}
        .vet-channel-step span{display:block;font-weight:750;line-height:1.4;color:#fff}
        .vet-clinic-card{background:#fff;color:#172333;border-radius:24px;padding:31px;box-shadow:0 20px 55px rgba(0,0,0,.22)}
        .vet-clinic-card .clinic-icon{width:54px;height:54px;border-radius:16px;display:grid;place-items:center;background:#eaf4f8;color:#235e82;font-size:24px;margin-bottom:18px}
        .vet-clinic-card h3{margin:0 0 10px;color:#0b2447;font-size:26px;line-height:1.25}
        .vet-clinic-card>p{margin:0 0 23px;color:#657487;line-height:1.65}
        .vet-clinic-features{display:grid;gap:9px;margin:0 0 24px;padding:0;list-style:none;color:#4e6375;font-size:13px}
        .vet-clinic-features li:before{content:"✓";display:inline-grid;place-items:center;width:20px;height:20px;margin-right:8px;border-radius:50%;background:#eaf6ee;color:#377a58;font-size:11px;font-weight:900}
        .vet-clinic-card .button{width:100%;justify-content:center}
        .vet-channel-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:25px}
        .vet-channel-actions .button-secondary{background:#fff;border-color:#fff;color:#0b2447}
        .vet-channel-actions .button-secondary:hover{background:#eaf4fb;border-color:#eaf4fb;color:#0b2447}
        @media(max-width:900px){.vet-channel-grid{grid-template-columns:1fr}.vet-channel-steps{grid-template-columns:1fr 1fr 1fr}}
        @media(max-width:640px){.vet-channel-steps{grid-template-columns:1fr}.vet-clinic-card{padding:24px}.vet-channel-copy h2{letter-spacing:-1px}}
      `;
      document.head.appendChild(style);

      const section = document.createElement("section");
      section.className = "section vet-channel-section";
      section.id = "nereden-alinir";
      section.innerHTML = `
        <div class="container vet-channel-grid">
          <div class="vet-channel-copy reveal">
            <span class="vet-channel-badge">Yalnızca Veteriner Kliniklerinde</span>
            <h2>VetWel bulunan kliniği<br>artık doğrudan bulun.</h2>
            <p><strong>VetWel® ürünleri yalnızca veteriner kliniklerinde satılmaktadır.</strong> Şehir ve ilçenizi seçerek veya klinik adı ve adres içinde arama yaparak VetWel ürünlerinin bulunduğu veteriner kliniklerini görüntüleyebilirsiniz.</p>
            <div class="vet-channel-steps" aria-label="VetWel satın alma adımları">
              <div class="vet-channel-step"><strong>01</strong><span>Ürünü ve kullanım alanını inceleyin</span></div>
              <div class="vet-channel-step"><strong>02</strong><span>Veteriner hekiminizle değerlendirin</span></div>
              <div class="vet-channel-step"><strong>03</strong><span>Size uygun VetWel kliniğini bulun</span></div>
            </div>
            <div class="vet-channel-actions">
              <a class="button button-light" href="klinik-bul.html">Klinik Bul</a>
              <a class="button button-secondary" href="education.html">Bilgi Merkezi</a>
            </div>
          </div>

          <div class="vet-clinic-card reveal">
            <div class="clinic-icon" aria-hidden="true">⌖</div>
            <h3>Gerçek VetWel Klinik Bulucu</h3>
            <p>Artık e-posta göndermeniz gerekmiyor. Mevcut VetWel kliniklerini anında arayın ve doğrudan yol tarifi alın.</p>
            <ul class="vet-clinic-features">
              <li>Şehir ve ilçeye göre filtreleme</li>
              <li>Klinik adı veya adrese göre arama</li>
              <li>Telefon ve Google Maps yol tarifi</li>
            </ul>
            <a class="button button-primary" href="klinik-bul.html">Veteriner Kliniği Bul <span aria-hidden="true">→</span></a>
          </div>
        </div>
      `;

      if (insertionPoint && insertionPoint.parentNode) insertionPoint.parentNode.insertBefore(section, insertionPoint);
      else main.appendChild(section);
    }
  }

  const navigationLinks = document.querySelectorAll(".primary-navigation a");
  const accordionButtons = document.querySelectorAll(".accordion-button");
  const revealElements = document.querySelectorAll(".reveal");
  const contactForm = document.querySelector("#contact-form");
  const formStatus = document.querySelector("#form-status");

  if (currentYear) currentYear.textContent = new Date().getFullYear();

  const closeMenu = () => {
    if (!menuToggle || !navigation) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", isEnglish ? "Open menu" : "Menüyü aç");
    navigation.classList.remove("open");
    document.body.classList.remove("menu-open");
  };

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isEnglish ? (isOpen ? "Open menu" : "Close menu") : (isOpen ? "Menüyü aç" : "Menüyü kapat"));
      navigation.classList.toggle("open", !isOpen);
      document.body.classList.toggle("menu-open", !isOpen);
    });
    navigationLinks.forEach((link) => link.addEventListener("click", closeMenu));
    window.addEventListener("resize", () => { if (window.innerWidth > 820) closeMenu(); });
  }

  const updateScrollState = () => {
    const scrollPosition = window.scrollY;
    if (header) header.classList.toggle("scrolled", scrollPosition > 15);
    if (backToTopButton) backToTopButton.classList.toggle("visible", scrollPosition > 600);
  };
  updateScrollState();
  window.addEventListener("scroll", updateScrollState, { passive: true });

  const productTargets = {
    KidneyWel: ".product-kidney", LiverWel: ".product-liver", SkinWel: ".product-skin", HeartWel: ".product-heart",
    LactoWel: ".product-lacto", CalmWel: ".product-calm", DentaWel: ".product-denta",
    "VetWel Malt Paste": ".product-malt", "Malign Detox": ".product-detox"
  };

  if (isEnglish) {
    const solutionCards = [...document.querySelectorAll(".solution-card")];
    const setSolutionLink = (name, href) => {
      const card = solutionCards.find((item) => item.querySelector("h3")?.textContent.trim() === name);
      const link = card?.querySelector("a");
      if (link) link.href = href;
    };
    const setProductLink = (selector, href, index = 0) => {
      const cards = document.querySelectorAll(selector);
      const link = cards[index]?.querySelector("a");
      if (link) link.href = href;
    };

    setSolutionLink("Breathe Ease", "education-breathe-ease.html");
    setSolutionLink("Cleanse", "education-cleanse.html");
    setSolutionLink("KidneyWel", "education-kidneywel.html");
    setSolutionLink("LiverWel", "education-liverwel-tablet.html");
    setSolutionLink("SkinWel", "education-skinwel.html");
    setSolutionLink("HeartWel", "education-heartwel.html");
    setSolutionLink("LactoWel", "education-lactowel.html");
    setSolutionLink("CalmWel", "education-calmwel-tablet.html");
    setSolutionLink("DentaWel", "education-dentawel.html");
    setSolutionLink("VetWel Malt Paste", "education-malt-paste.html");
    setSolutionLink("Malign Detox", "education-malign-detox.html");

    const cleanseFeaturedLink = document.querySelector("#cleanse a.button");
    if (cleanseFeaturedLink) cleanseFeaturedLink.href = "education-cleanse.html";
    const breatheFeaturedLink = document.querySelector("#breathe-ease a.button");
    if (breatheFeaturedLink) breatheFeaturedLink.href = "education-breathe-ease.html";

    setProductLink(".product-kidney", "education-kidneywel.html", 0);
    setProductLink(".product-kidney", "education-kidneywel-liquid.html", 1);
    setProductLink(".product-liver", "education-liverwel-tablet.html", 0);
    setProductLink(".product-liver", "education-liverwel-liquid.html", 1);
    setProductLink(".product-calm", "education-calmwel-tablet.html", 0);
    setProductLink(".product-calm", "education-calmwel-liquid.html", 1);
    setProductLink(".product-skin", "education-skinwel.html");
    setProductLink(".product-heart", "education-heartwel.html");
    setProductLink(".product-lacto", "education-lactowel.html");
    setProductLink(".product-denta", "education-dentawel.html");
    setProductLink(".product-malt", "education-malt-paste.html");
    setProductLink(".product-detox", "education-malign-detox.html");
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      let target = null;
      if (targetId === "#urunler" && link.closest(".solution-card")) {
        const productName = link.closest(".solution-card").querySelector("h3")?.textContent.trim();
        const productSelector = productTargets[productName];
        if (productSelector) target = document.querySelector(`#urunler ${productSelector}`);
      }
      if (!target) target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      const headerHeight = header ? header.offsetHeight : 0;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - headerHeight - 24, behavior: "smooth" });
      if (!link.closest(".solution-card") || targetId !== "#urunler") history.replaceState(null, "", targetId);
    });
  });

  if (backToTopButton) backToTopButton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  accordionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const isExpanded = button.getAttribute("aria-expanded") === "true";
      const panel = button.nextElementSibling;
      accordionButtons.forEach((otherButton) => {
        if (otherButton === button) return;
        otherButton.setAttribute("aria-expanded", "false");
        const otherPanel = otherButton.nextElementSibling;
        if (otherPanel) otherPanel.style.maxHeight = null;
      });
      button.setAttribute("aria-expanded", String(!isExpanded));
      if (panel) panel.style.maxHeight = isExpanded ? null : `${panel.scrollHeight}px`;
    });
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealElements.forEach((element) => revealObserver.observe(element));
  } else revealElements.forEach((element) => element.classList.add("visible"));

  const pageSections = [...document.querySelectorAll("main section[id]")];
  if ("IntersectionObserver" in window && pageSections.length > 0) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navigationLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
      });
    }, { threshold: 0.35 });
    pageSections.forEach((section) => sectionObserver.observe(section));
  }

  if (contactForm && formStatus) {
    const requiredFields = contactForm.querySelectorAll("[required]");
    requiredFields.forEach((field) => {
      field.addEventListener("input", () => field.classList.remove("invalid"));
      field.addEventListener("change", () => field.classList.remove("invalid"));
    });
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      let formIsValid = true;
      requiredFields.forEach((field) => {
        const value = field.value.trim();
        if (!value) { formIsValid = false; field.classList.add("invalid"); }
        if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) { formIsValid = false; field.classList.add("invalid"); }
      });
      if (!formIsValid) {
        formStatus.textContent = isEnglish ? "Please complete all required fields correctly." : "Lütfen gerekli alanları doğru şekilde doldurun.";
        formStatus.className = "form-status error";
        return;
      }
      const formData = new FormData(contactForm);
      const name = formData.get("name"), email = formData.get("email"), subject = formData.get("subject"), message = formData.get("message");
      const mailSubject = encodeURIComponent(isEnglish ? `VetWel Website: ${subject}` : `VetWel Web Sitesi: ${subject}`);
      const mailBody = encodeURIComponent(isEnglish ? `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}` : `Ad: ${name}\nE-posta: ${email}\n\nMesaj:\n${message}`);
      formStatus.textContent = isEnglish ? "Your email application is opening. You can send your message from there." : "E-posta uygulamanız açılıyor. Mesajınızı oradan gönderebilirsiniz.";
      formStatus.className = "form-status success";
      window.location.href = `mailto:info@vetwel.us?subject=${mailSubject}&body=${mailBody}`;
    });
  }

  if (window.lucide) window.lucide.createIcons();
});

// Botanical Guide entry lives inside the Turkish Information Center, keeping the homepage uncluttered.
document.addEventListener("DOMContentLoaded", () => {
  if (document.documentElement.lang === "en") return;
  if (!window.location.pathname.endsWith("/education.html")) return;

  const educationNavigation = document.querySelector(".education-nav");
  if (educationNavigation && !educationNavigation.querySelector('a[href="botanik-rehberi.html"]')) {
    const botanicalLink = document.createElement("a");
    botanicalLink.href = "botanik-rehberi.html";
    botanicalLink.textContent = "Botanik Rehberi";
    const channelLink = educationNavigation.querySelector('a[href="klinik-bul.html"]');
    const contactLink = educationNavigation.querySelector('a[href="index.html#iletisim"]');
    educationNavigation.insertBefore(botanicalLink, channelLink || contactLink || null);
  }

  const categoryGrid = document.querySelector("#education-categories .education-category-grid");
  if (!categoryGrid || document.querySelector("#botanical-education-card")) return;

  const card = document.createElement("article");
  card.className = "education-category-card";
  card.id = "botanical-education-card";
  card.innerHTML = `
    <div class="education-card-icon">🌿</div>
    <h3>Botanik Rehberi</h3>
    <p>VetWel formüllerinde yer alan 59 bitkisel içeriği, Latince adlarını, temel botanik özelliklerini ve formülasyondaki rollerini inceleyin.</p>
    <a class="education-card-link" href="botanik-rehberi.html">Bitkileri keşfet →</a>
  `;
  categoryGrid.appendChild(card);
});

// English-site navigation: expose U.S. health articles, Botanical Guide and purchase channels without Turkish clinic data.
document.addEventListener("DOMContentLoaded", () => {
  if (document.documentElement.lang !== "en") return;
  const nav = document.querySelector(".primary-navigation");
  if (nav) {
    const contact = nav.querySelector('a[href="#contact"]');
    const tr = nav.querySelector('a[href="../index.html"]');
    if (!nav.querySelector('a[href="health-articles.html"]')) {
      const health = document.createElement("a");
      health.href = "health-articles.html";
      health.textContent = "Health Articles";
      nav.insertBefore(health, contact || tr || null);
    }
    if (!nav.querySelector('a[href="botanical-guide.html"]')) {
      const botanical = document.createElement("a");
      botanical.href = "botanical-guide.html";
      botanical.textContent = "Botanical Guide";
      nav.insertBefore(botanical, contact || tr || null);
    }
    if (!nav.querySelector('a[href="where-to-buy.html"]')) {
      const buy = document.createElement("a");
      buy.href = "where-to-buy.html";
      buy.textContent = "Where to Buy";
      nav.insertBefore(buy, contact || tr || null);
    }
  }

  const educationActions = document.querySelector(".education-actions");
  if (educationActions && !educationActions.querySelector('a[href="health-articles.html"]')) {
    const health = document.createElement("a");
    health.className = "button button-light";
    health.href = "health-articles.html";
    health.textContent = "U.S. Health Articles";
    educationActions.appendChild(health);
  }
  if (educationActions && !educationActions.querySelector('a[href="botanical-guide.html"]')) {
    const botanical = document.createElement("a");
    botanical.className = "button button-light";
    botanical.href = "botanical-guide.html";
    botanical.textContent = "Botanical Guide";
    educationActions.appendChild(botanical);
  }

  const purchaseFaqButton = [...document.querySelectorAll(".accordion-button")].find((button) => button.textContent.includes("Where can I purchase VetWel products?"));
  const purchaseFaqText = purchaseFaqButton?.nextElementSibling?.querySelector("p");
  if (purchaseFaqText) {
    purchaseFaqText.innerHTML = 'For U.S. availability, use the <a href="where-to-buy.html">Where to Buy</a> page. Verified Amazon and other authorized online or retail channels will be listed there as they become available.';
  }
});

// Apply the VetWel-aligned visual treatment to the Turkish clinic finder section.
(() => {
  const s = document.createElement('script');
  s.src = 'vet-channel-premium.js';
  s.defer = true;
  s.onerror = () => console.warn('VetWel clinic-finder visual layer could not be loaded.');
  document.head.appendChild(s);
})();