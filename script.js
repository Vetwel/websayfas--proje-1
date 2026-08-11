document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".primary-navigation");
  const navigationLinks = document.querySelectorAll(".primary-navigation a");
  const backToTopButton = document.querySelector(".back-to-top");
  const currentYear = document.querySelector("#current-year");
  const accordionButtons = document.querySelectorAll(".accordion-button");
  const revealElements = document.querySelectorAll(".reveal");
  const contactForm = document.querySelector("#contact-form");
  const formStatus = document.querySelector("#form-status");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  const closeMenu = () => {
    if (!menuToggle || !navigation) return;

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Menüyü aç");
    navigation.classList.remove("open");
    document.body.classList.remove("menu-open");
  };

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Menüyü aç" : "Menüyü kapat");
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
  window.addEventListener("scroll", updateScrollState, { passive: true });
  // Aynı sayfa içindeki bağlantıları sabit ve tutarlı konuma kaydır
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
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

    history.replaceState(null, "", targetId);
  });
});

  if (backToTopButton) {
    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  accordionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const isExpanded = button.getAttribute("aria-expanded") === "true";
      const panel = button.nextElementSibling;

      accordionButtons.forEach((otherButton) => {
        if (otherButton === button) return;

        otherButton.setAttribute("aria-expanded", "false");

        const otherPanel = otherButton.nextElementSibling;
        if (otherPanel) {
          otherPanel.style.maxHeight = null;
        }
      });

      button.setAttribute("aria-expanded", String(!isExpanded));

      if (panel) {
        panel.style.maxHeight = isExpanded ? null : `${panel.scrollHeight}px`;
      }
    });
  });

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

  const pageSections = [...document.querySelectorAll("main section[id]")];

  if ("IntersectionObserver" in window && pageSections.length > 0) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          navigationLinks.forEach((link) => {
            const targetId = link.getAttribute("href");
            link.classList.toggle("active", targetId === `#${entry.target.id}`);
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

  if (contactForm && formStatus) {
    const requiredFields = contactForm.querySelectorAll("[required]");

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
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

          if (!emailPattern.test(value)) {
            formIsValid = false;
            field.classList.add("invalid");
          }
        }
      });

      if (!formIsValid) {
        formStatus.textContent = "Lütfen gerekli alanları doğru şekilde doldurun.";
        formStatus.className = "form-status error";
        return;
      }

      const formData = new FormData(contactForm);
      const name = formData.get("name");
      const email = formData.get("email");
      const subject = formData.get("subject");
      const message = formData.get("message");

      const mailSubject = encodeURIComponent(`VetWel Web Sitesi: ${subject}`);
      const mailBody = encodeURIComponent(
        `Ad: ${name}\nE-posta: ${email}\n\nMesaj:\n${message}`
      );

      formStatus.textContent =
        "E-posta uygulamanız açılıyor. Mesajınızı oradan gönderebilirsiniz.";
      formStatus.className = "form-status success";

      window.location.href =
        `mailto:info@vetwel.us?subject=${mailSubject}&body=${mailBody}`;
    });
  }
});
