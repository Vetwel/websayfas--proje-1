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

    if (!navigation.querySelector('a[href="#nereden-alinir"]')) {
      const channelLink = document.createElement("a");
      channelLink.href = "#nereden-alinir";
      channelLink.textContent = "Nereden Alınır?";
      const contactLink = navigation.querySelector('a[href="#iletisim"]');
      if (contactLink) navigation.insertBefore(channelLink, contactLink);
      else navigation.appendChild(channelLink);
    }
  }

  if (educationNavigation && isTurkishEducation && !educationNavigation.querySelector('a[href="index.html#nereden-alinir"]')) {
    const channelLink = document.createElement("a");
    channelLink.href = "index.html#nereden-alinir";
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
      purchaseFaqText.textContent = "VetWel® ürünleri yalnızca veteriner klinikleri ve yetkili veteriner satış noktaları aracılığıyla sunulmaktadır. Size en yakın VetWel satış noktası hakkında bilgi almak için bizimle iletişime geçebilirsiniz.";
    }

    const contactIntro = document.querySelector(".contact-content > p");
    if (contactIntro) {
      contactIntro.textContent = "Ürünlerimiz, veteriner iş birlikleri veya yetkili veteriner klinik satış noktaları hakkında bilgi almak için bize ulaşabilirsiniz.";
    }

    const salesSubjectOption = [...document.querySelectorAll("#subject option")].find(
      (option) => option.textContent.trim() === "Satış ve dağıtım"
    );
    if (salesSubjectOption) salesSubjectOption.textContent = "Veteriner satış noktası / dağıtım";
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
        .vet-channel-grid{display:grid;grid-template-columns:1.02fr .98fr;gap:54px;align-items:center;position:relative;z-index:1}
        .vet-channel-badge{display:inline-flex;align-items:center;gap:8px;padding:8px 13px;border-radius:999px;background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.18);font-size:12px;font-weight:800;letter-spacing:.8px;text-transform:uppercase;color:#bfeaf0;margin-bottom:18px}
        .vet-channel-copy h2{font-size:clamp(34px,4.6vw,54px);line-height:1.06;letter-spacing:-1.8px;margin:0 0 18px;color:#fff}
        .vet-channel-copy>p{max-width:660px;margin:0;color:rgba(255,255,255,.78);font-size:17px;line-height:1.75}
        .vet-channel-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:30px}
        .vet-channel-step{padding:18px 16px;border-radius:16px;background:rgba(255,255,255,.075);border:1px solid rgba(255,255,255,.12)}
        .vet-channel-step strong{display:block;color:#9de3ec;font-size:12px;letter-spacing:1px;margin-bottom:7px}
        .vet-channel-step span{display:block;font-weight:750;line-height:1.4;color:#fff}
        .vet-clinic-card{background:#fff;color:#172333;border-radius:24px;padding:30px;box-shadow:0 20px 55px rgba(0,0,0,.22)}
        .vet-clinic-card h3{margin:0 0 8px;color:#0b2447;font-size:25px}
        .vet-clinic-card>p{margin:0 0 22px;color:#657487;line-height:1.65}
        .vet-clinic-form{display:grid;grid-template-columns:1fr 1fr;gap:14px}
        .vet-clinic-field{display:grid;gap:7px}
        .vet-clinic-field.full{grid-column:1/-1}
        .vet-clinic-field label{font-size:13px;font-weight:800;color:#33465a}
        .vet-clinic-field input,.vet-clinic-field select{width:100%;min-height:48px;border:1px solid #d8e1e9;border-radius:12px;padding:0 13px;background:#fff;color:#172333;font:inherit;outline:none}
        .vet-clinic-field input:focus,.vet-clinic-field select:focus{border-color:#2c78a8;box-shadow:0 0 0 3px rgba(44,120,168,.10)}
        .vet-clinic-submit{grid-column:1/-1;border:0;cursor:pointer;margin-top:3px}
        .vet-clinic-note{grid-column:1/-1;margin:0;color:#788695;font-size:12px;line-height:1.55}
        .vet-channel-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:25px}
        .vet-channel-actions .button-secondary{background:#fff;border-color:#fff;color:#0b2447}
        .vet-channel-actions .button-secondary:hover{background:#eaf4fb;border-color:#eaf4fb;color:#0b2447}
        @media(max-width:900px){.vet-channel-grid{grid-template-columns:1fr}.vet-channel-steps{grid-template-columns:1fr 1fr 1fr}}
        @media(max-width:640px){.vet-channel-steps,.vet-clinic-form{grid-template-columns:1fr}.vet-clinic-field.full,.vet-clinic-submit,.vet-clinic-note{grid-column:1}.vet-clinic-card{padding:24px}.vet-channel-copy h2{letter-spacing:-1px}}
      `;
      document.head.appendChild(style);

      const section = document.createElement("section");
      section.className = "section vet-channel-section";
      section.id = "nereden-alinir";
      section.innerHTML = `
        <div class="container vet-channel-grid">
          <div class="vet-channel-copy reveal">
            <span class="vet-channel-badge">Yalnızca Veteriner Kliniklerinde</span>
            <h2>Doğru ürünü öğrenin.<br>Veteriner hekiminizle değerlendirin.</h2>
            <p><strong>VetWel® ürünleri yalnızca veteriner klinikleri ve yetkili veteriner satış noktaları aracılığıyla sunulmaktadır.</strong> Ürün bilgilerini inceleyebilir, evcil hayvanınız için uygun seçeneği veteriner hekiminizle değerlendirebilir ve bulunduğunuz bölgedeki VetWel satış noktasını bizden öğrenebilirsiniz.</p>
            <div class="vet-channel-steps" aria-label="VetWel satın alma adımları">
              <div class="vet-channel-step"><strong>01</strong><span>Ürünü ve kullanım alanını inceleyin</span></div>
              <div class="vet-channel-step"><strong>02</strong><span>Veteriner hekiminizle değerlendirin</span></div>
              <div class="vet-channel-step"><strong>03</strong><span>VetWel bulunan kliniğe ulaşın</span></div>
            </div>
            <div class="vet-channel-actions">
              <a class="button button-light" href="#urunler">Ürünleri İncele</a>
              <a class="button button-secondary" href="education.html">Bilgi Merkezi</a>
            </div>
          </div>

          <div class="vet-clinic-card reveal">
            <h3>Size en yakın VetWel kliniğini öğrenin</h3>
            <p>İl ve ilçe bilginizi bırakın; talebinizi mevcut VetWel satış noktalarına göre yönlendirelim.</p>
            <form class="vet-clinic-form" id="vet-clinic-form">
              <div class="vet-clinic-field">
                <label for="vet-clinic-city">İl</label>
                <input id="vet-clinic-city" name="city" type="text" placeholder="Örn. İstanbul" required>
              </div>
              <div class="vet-clinic-field">
                <label for="vet-clinic-district">İlçe</label>
                <input id="vet-clinic-district" name="district" type="text" placeholder="Örn. Kadıköy" required>
              </div>
              <div class="vet-clinic-field full">
                <label for="vet-clinic-product">İlgilendiğiniz ürün</label>
                <select id="vet-clinic-product" name="product">
                  <option value="">Ürün seçmek zorunlu değil</option>
                  <option>Breathe Ease</option><option>Cleanse</option><option>KidneyWel</option><option>LiverWel</option><option>SkinWel</option><option>HeartWel</option><option>LactoWel</option><option>CalmWel</option><option>DentaWel</option><option>VetWel Malt Paste</option><option>Malign Detox</option>
                </select>
              </div>
              <button class="button button-primary vet-clinic-submit" type="submit">En Yakın Kliniği Sor <span aria-hidden="true">→</span></button>
              <p class="vet-clinic-note" id="vet-clinic-status" role="status" aria-live="polite">Buton, e-posta uygulamanızı açar. Klinik bilgisi mevcut VetWel satış noktalarına göre paylaşılır.</p>
            </form>
          </div>
        </div>
      `;

      if (insertionPoint && insertionPoint.parentNode) insertionPoint.parentNode.insertBefore(section, insertionPoint);
      else main.appendChild(section);

      const clinicForm = section.querySelector("#vet-clinic-form");
      const clinicStatus = section.querySelector("#vet-clinic-status");
      if (clinicForm) {
        clinicForm.addEventListener("submit", (event) => {
          event.preventDefault();
          const city = clinicForm.elements.city.value.trim();
          const district = clinicForm.elements.district.value.trim();
          const product = clinicForm.elements.product.value.trim();
          if (!city || !district) {
            if (clinicStatus) clinicStatus.textContent = "Lütfen il ve ilçe bilgilerini doldurun.";
            return;
          }
          const subject = encodeURIComponent(`VetWel Klinik Bilgisi Talebi - ${city} / ${district}`);
          const body = encodeURIComponent(`Merhaba VetWel,\n\n${city} / ${district} bölgesinde VetWel ürünlerini bulabileceğim veteriner kliniği veya satış noktası hakkında bilgi rica ediyorum.${product ? `\n\nİlgilendiğim ürün: ${product}` : ""}\n\nTeşekkürler.`);
          if (clinicStatus) clinicStatus.textContent = "E-posta uygulamanız açılıyor. Talebinizi oradan gönderebilirsiniz.";
          window.location.href = `mailto:info@vetwel.us?subject=${subject}&body=${body}`;
        });
      }
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