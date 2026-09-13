// VetWel Google Analytics 4 loader
// Measurement ID: G-J0BKMVMXHS
(() => {
  const measurementId = "G-J0BKMVMXHS";
  if (window.__VETWEL_GA4_LOADED__) return;
  window.__VETWEL_GA4_LOADED__ = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    send_page_view: true
  });

  const tag = document.createElement("script");
  tag.async = true;
  tag.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(tag);
})();
