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

// Match the English homepage Solutions behavior to the Turkish homepage:
// Explore Solution first scrolls to the matching product card; View Product opens the detail page.
(() => {
  const applyEnglishSolutionLinks = (attempt = 0) => {
    if (document.documentElement.lang !== 'en') return;

    const solutionGrid = document.querySelector('#solutions .solutions-grid');
    const productSection = document.querySelector('#products');
    if (!solutionGrid || !productSection) {
      if (attempt < 40) setTimeout(() => applyEnglishSolutionLinks(attempt + 1), 100);
      return;
    }

    const targets = {
      'Breathe Ease': { href: '#breathe-ease', selector: '#breathe-ease' },
      'Cleanse': { href: '#cleanse', selector: '#cleanse' },
      'KidneyWel': { href: '#products', selector: '#products .product-kidney' },
      'LiverWel': { href: '#products', selector: '#products .product-liver' },
      'SkinWel': { href: '#products', selector: '#products .product-skin' },
      'HeartWel': { href: '#products', selector: '#products .product-heart' },
      'LactoWel': { href: '#products', selector: '#products .product-lacto' },
      'CalmWel': { href: '#products', selector: '#products .product-calm' },
      'DentaWel': { href: '#products', selector: '#products .product-denta' },
      'VetWel Malt Paste': { href: '#products', selector: '#products .product-malt' },
      'Malign Detox': { href: '#products', selector: '#products .product-detox' }
    };

    solutionGrid.querySelectorAll('.solution-card').forEach((card) => {
      const name = card.querySelector('h3')?.textContent.trim();
      const config = targets[name];
      const link = card.querySelector('a');
      if (!config || !link) return;

      link.href = config.href;
      link.dataset.vetwelTargetSelector = config.selector;

      if (link.dataset.vetwelEnglishScroll === '1') return;
      link.dataset.vetwelEnglishScroll = '1';

      link.addEventListener('click', (event) => {
        const selector = link.dataset.vetwelTargetSelector;
        const target = selector ? document.querySelector(selector) : null;
        if (!target) return;

        event.preventDefault();
        const header = document.querySelector('.site-header');
        const headerHeight = header ? header.offsetHeight : 0;
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - headerHeight - 24,
          behavior: 'smooth'
        });

        const href = link.getAttribute('href');
        if (href === '#breathe-ease' || href === '#cleanse') {
          history.replaceState(null, '', href);
        }
      });
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => applyEnglishSolutionLinks(), { once: true });
  } else {
    applyEnglishSolutionLinks();
  }
})();

// English mobile navigation has more items than Turkish (Botanical Guide + Where to Buy).
// Let the open menu use the available viewport height so the final TR language link is never clipped.
(() => {
  if (document.documentElement.lang !== 'en') return;
  if (document.querySelector('#vetwel-en-mobile-nav-fix')) return;

  const style = document.createElement('style');
  style.id = 'vetwel-en-mobile-nav-fix';
  style.textContent = `
    @media (max-width: 820px) {
      .primary-navigation.open {
        max-height: calc(100vh - var(--header-height)) !important;
        max-height: calc(100dvh - var(--header-height)) !important;
        overflow-y: auto !important;
        overscroll-behavior: contain;
        -webkit-overflow-scrolling: touch;
      }
    }
  `;
  document.head.appendChild(style);
})();
