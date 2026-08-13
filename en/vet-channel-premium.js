// English bridge to the shared VetWel homepage visual/solution hierarchy layer.
(() => {
  if (document.querySelector('script[data-vetwel-shared-premium]')) return;
  const s = document.createElement('script');
  s.src = '../vet-channel-premium.js';
  s.defer = true;
  s.dataset.vetwelSharedPremium = '1';
  s.onerror = () => console.warn('VetWel shared premium layer could not be loaded.');
  document.head.appendChild(s);
})();
