document.addEventListener("DOMContentLoaded", () => {
  const isEnglish = document.documentElement.lang === "en";
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".primary-navigation");
  const backToTopButton = document.querySelector(".back-to-top");
  const currentYear = document.querySelector("#current-year");
  const accordionButtons = document.querySelectorAll(".accordion-button");
  const revealElements = document.querySelectorAll(".reveal");
  const contactForm = document.querySelector("#contact-form");
  const formStatus = document.querySelector("#form-status");

  const isTurkishHomepage = !isEnglish && (window.location.pathname.endsWith("/") || window.location.pathname.endsWith("/index.html"));
  if (navigation && isTurkishHomepage) {
    const existingLanguageLink = navigation.querySelector('a[href="en/index.html"]');
    if (!existingLanguageLink) {
      const languageLink = document.createElement("a");
      languageLink.href = "en/index.html";
      languageLink.textContent = "EN";
      languageLink.setAttribute("aria-label", "English site");
      navigation.appendChild(languageLink);
    }
  }

  const navigationLinks = document.querySelectorAll(".primary-navigation a");
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
});