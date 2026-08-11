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

  /*
  --------------------------------------------------
  LANGUAGE SWITCH
  --------------------------------------------------
  Add an EN link only to the Turkish homepage. The English homepage
  already contains its own TR link in the HTML.
  */

  const isTurkishHomepage =
    !isEnglish &&
    (window.location.pathname.endsWith("/") ||
      window.location.pathname.endsWith("/index.html"));

  if (navigation && isTurkishHomepage) {
    const existingLanguageLink = navigation.querySelector(
      'a[href="en/index.html"]'
    );

    if (!existingLanguageLink) {
      const languageLink = document.createElement("a");
      languageLink.href = "en/index.html";
      languageLink.textContent = "EN";
      languageLink.setAttribute("aria-label", "English site");
      navigation.appendChild(languageLink);
    }
  }

  const navigationLinks = document.querySelectorAll(
    ".primary-navigation a"
  );

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  const closeMenu = () => {
    if (!menuToggle || !navigation) return;

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute(
      "aria-label",
      isEnglish ? "Open menu" : "Menüyü aç"
    );
    navigation.classList.remove("open");
    document.body.classList.remove("menu-open");
  };

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isEnglish
          ? isOpen
            ? "Open menu"
            : "Close menu"
          : isOpen
            ? "Menüyü aç"
            : "Menüyü kapat"
      );

      navigation.classList.toggle("open", !isOpen);
      document.body.classList.toggle("menu-open", !isOpen);
    });

    navigationLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 820) {
        closeMenu();
      }
    });
  }

  const updateScrollState = () => {
    const scrollPosition = window.scrollY;

    if (header) {
      header.classList.toggle("scrolled", scrollPosition > 15);
    }

    if (backToTopButton) {
      backToTopButton.classList.toggle("visible", scrollPosition > 600);
    }
  };

  updateScrollState();

  window.addEventListener("scroll", updateScrollState, {
    passive: true
  });

  /*
  --------------------------------------------------
  ÇÖZÜMLER → DOĞRU ÜRÜN KARTINA GİT
  --------------------------------------------------
  */

  const productTargets = {
    KidneyWel: ".product-kidney",
    LiverWel: ".product-liver",
    SkinWel: ".product-skin",
    HeartWel: ".product-heart",
    LactoWel: ".product-lacto",
    CalmWel: ".product-calm",
    DentaWel: ".product-denta",
    "VetWel Malt Paste": ".product-malt",
    "Malign Detox": ".product-detox"
  };

  /*
  --------------------------------------------------
  ENGLISH PRODUCT LINKS
  --------------------------------------------------
  English product pages are connected one by one as they are created.
  Keep untranslated product links unchanged until their English pages
  are ready.
  */

  if (isEnglish) {
    const solutionCards = [...document.querySelectorAll(".solution-card")];

    const kidneySolutionCard = solutionCards.find(
      (card) => card.querySelector("h3")?.textContent.trim() === "KidneyWel"
    );
    const kidneySolutionLink = kidneySolutionCard?.querySelector("a");
    if (kidneySolutionLink) {
      kidneySolutionLink.href = "education-kidneywel.html";
    }

    const kidneyProductCards = document.querySelectorAll(".product-kidney");
    const kidneyTabletLink = kidneyProductCards[0]?.querySelector("a");
    const kidneyLiquidLink = kidneyProductCards[1]?.querySelector("a");
    if (kidneyTabletLink) {
      kidneyTabletLink.href = "education-kidneywel.html";
    }
    if (kidneyLiquidLink) {
      kidneyLiquidLink.href = "education-kidneywel-liquid.html";
    }

    const liverSolutionCard = solutionCards.find(
      (card) => card.querySelector("h3")?.textContent.trim() === "LiverWel"
    );
    const liverSolutionLink = liverSolutionCard?.querySelector("a");
    if (liverSolutionLink) {
      liverSolutionLink.href = "education-liverwel-tablet.html";
    }

    const liverProductCards = document.querySelectorAll(".product-liver");
    const liverTabletLink = liverProductCards[0]?.querySelector("a");
    const liverLiquidLink = liverProductCards[1]?.querySelector("a");
    if (liverTabletLink) {
      liverTabletLink.href = "education-liverwel-tablet.html";
    }
    if (liverLiquidLink) {
      liverLiquidLink.href = "education-liverwel-liquid.html";
    }
  }

  /*
  --------------------------------------------------
  SAYFA İÇİ BAĞLANTILAR
  --------------------------------------------------
  */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      let target = null;

      if (
        targetId === "#urunler" &&
        link.closest(".solution-card")
      ) {
        const solutionCard = link.closest(".solution-card");
        const productName =
          solutionCard.querySelector("h3")?.textContent.trim();

        const productSelector = productTargets[productName];

        if (productSelector) {
          target = document.querySelector(
            `#urunler ${productSelector}`
          );
        }
      }

      if (!target) {
        target = document.querySelector(targetId);
      }

      if (!target) return;

      event.preventDefault();

      const headerHeight = header ? header.offsetHeight : 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight -
        24;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

      if (!link.closest(".solution-card") || targetId !== "#urunler") {
        history.replaceState(null, "", targetId);
      }
    });
  });

  /*
  --------------------------------------------------
  YUKARI ÇIK BUTONU
  --------------------------------------------------
  */

  if (backToTopButton) {
    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  /*
  --------------------------------------------------
  AKORDİYONLAR
  --------------------------------------------------
  */

  accordionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const isExpanded =
        button.getAttribute("aria-expanded") === "true";

      const panel = button.nextElementSibling;

      accordionButtons.forEach((otherButton) => {
        if (otherButton === button) return;

        otherButton.setAttribute("aria-expanded", "false");

        const otherPanel = otherButton.nextElementSibling;

        if (otherPanel) {
          otherPanel.style.maxHeight = null;
        }
      });

      button.setAttribute(
        "aria-expanded",
        String(!isExpanded)
      );

      if (panel) {
        panel.style.maxHeight =
          isExpanded ? null : `${panel.scrollHeight}px`;
      }
    });
  });

  /*
  --------------------------------------------------
  SAYFA GÖRÜNÜM ANİMASYONLARI
  --------------------------------------------------
  */

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  /*
  --------------------------------------------------
  MENÜDE AKTİF BÖLÜM
  --------------------------------------------------
  */

  const pageSections = [
    ...document.querySelectorAll("main section[id]")
  ];

  if (
    "IntersectionObserver" in window &&
    pageSections.length > 0
  ) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          navigationLinks.forEach((link) => {
            const targetId = link.getAttribute("href");

            link.classList.toggle(
              "active",
              targetId === `#${entry.target.id}`
            );
          });
        });
      },
      {
        threshold: 0.35
      }
    );

    pageSections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  /*
  --------------------------------------------------
  İLETİŞİM FORMU
  --------------------------------------------------
  */

  if (contactForm && formStatus) {
    const requiredFields =
      contactForm.querySelectorAll("[required]");

    requiredFields.forEach((field) => {
      field.addEventListener("input", () => {
        field.classList.remove("invalid");
      });

      field.addEventListener("change", () => {
        field.classList.remove("invalid");
      });
    });

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      let formIsValid = true;

      requiredFields.forEach((field) => {
        const value = field.value.trim();

        if (!value) {
          formIsValid = false;
          field.classList.add("invalid");
        }

        if (field.type === "email" && value) {
          const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

          if (!emailPattern.test(value)) {
            formIsValid = false;
            field.classList.add("invalid");
          }
        }
      });

      if (!formIsValid) {
        formStatus.textContent = isEnglish
          ? "Please complete all required fields correctly."
          : "Lütfen gerekli alanları doğru şekilde doldurun.";

        formStatus.className =
          "form-status error";

        return;
      }

      const formData = new FormData(contactForm);

      const name = formData.get("name");
      const email = formData.get("email");
      const subject = formData.get("subject");
      const message = formData.get("message");

      const mailSubject =
        encodeURIComponent(
          isEnglish
            ? `VetWel Website: ${subject}`
            : `VetWel Web Sitesi: ${subject}`
        );

      const mailBody =
        encodeURIComponent(
          isEnglish
            ? `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
            : `Ad: ${name}\nE-posta: ${email}\n\nMesaj:\n${message}`
        );

      formStatus.textContent = isEnglish
        ? "Your email application is opening. You can send your message from there."
        : "E-posta uygulamanız açılıyor. Mesajınızı oradan gönderebilirsiniz.";

      formStatus.className =
        "form-status success";

      window.location.href =
        `mailto:info@vetwel.us?subject=${mailSubject}&body=${mailBody}`;
    });
  }
});