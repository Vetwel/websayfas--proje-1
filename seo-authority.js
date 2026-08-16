// VetWel search-authority layer.
// Adds machine-readable entity signals and stronger internal discovery links
// without changing the site's existing product or clinical content.
(() => {
  const run = () => {
    const lang = document.documentElement.lang === 'en' ? 'en' : 'tr';
    const pathname = window.location.pathname;
    const isRoot = pathname === '/' || pathname.endsWith('/index.html');
    const isEnglishRoot = lang === 'en' && (pathname.endsWith('/en/') || pathname.endsWith('/en/index.html'));
    const isTurkishRoot = lang === 'tr' && isRoot;

    const ensureLink = (rel, href, hreflang) => {
      let selector = `link[rel="${rel}"]`;
      if (hreflang) selector += `[hreflang="${hreflang}"]`;
      let node = document.head.querySelector(selector);
      if (!node) {
        node = document.createElement('link');
        node.rel = rel;
        if (hreflang) node.hreflang = hreflang;
        document.head.appendChild(node);
      }
      node.href = href;
    };

    const ensureMeta = (name, content) => {
      let node = document.head.querySelector(`meta[name="${name}"]`);
      if (!node) {
        node = document.createElement('meta');
        node.name = name;
        document.head.appendChild(node);
      }
      node.content = content;
    };

    const ensureProperty = (property, content) => {
      let node = document.head.querySelector(`meta[property="${property}"]`);
      if (!node) {
        node = document.createElement('meta');
        node.setAttribute('property', property);
        document.head.appendChild(node);
      }
      node.content = content;
    };

    const ensureActionLink = (container, href, text, className = 'button button-light') => {
      if (!container || container.querySelector(`a[href="${href}"]`)) return;
      const link = document.createElement('a');
      link.className = className;
      link.href = href;
      link.textContent = text;
      container.appendChild(link);
    };

    // Keep all public pages eligible for rich snippets and large previews.
    ensureMeta('robots', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');

    if (isTurkishRoot) {
      ensureLink('canonical', 'https://vetwel.us/');
      ensureLink('alternate', 'https://vetwel.us/', 'tr');
      ensureLink('alternate', 'https://vetwel.us/en/', 'en');
      ensureLink('alternate', 'https://vetwel.us/', 'x-default');
      ensureProperty('og:url', 'https://vetwel.us/');
    }

    if (isEnglishRoot) {
      ensureLink('canonical', 'https://vetwel.us/en/');
      ensureLink('alternate', 'https://vetwel.us/', 'tr');
      ensureLink('alternate', 'https://vetwel.us/en/', 'en');
      ensureLink('alternate', 'https://vetwel.us/', 'x-default');
      ensureProperty('og:url', 'https://vetwel.us/en/');
    }

    if (isTurkishRoot || isEnglishRoot) {
      if (!document.querySelector('#vetwel-entity-schema')) {
        const schema = document.createElement('script');
        schema.id = 'vetwel-entity-schema';
        schema.type = 'application/ld+json';
        schema.textContent = JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Organization',
              '@id': 'https://vetwel.us/#organization',
              name: 'VetWel',
              alternateName: 'VetWel Veterinary Wellness',
              url: 'https://vetwel.us/',
              email: 'info@vetwel.us',
              founder: { '@id': 'https://vetwel.us/uzman-hakkinda.html#person' },
              publishingPrinciples: 'https://vetwel.us/editorial-policy.html',
              knowsAbout: [
                'Kedi ve köpek sağlığı',
                'Veteriner destek ürünleri',
                'Klinik beslenme',
                'Fitoterapi',
                'Tamamlayıcı beslenme'
              ]
            },
            {
              '@type': 'WebSite',
              '@id': 'https://vetwel.us/#website',
              url: 'https://vetwel.us/',
              name: 'VetWel',
              publisher: { '@id': 'https://vetwel.us/#organization' },
              inLanguage: lang === 'en' ? ['en-US', 'tr-TR'] : ['tr-TR', 'en-US'],
              hasPart: [
                { '@type': 'CollectionPage', '@id': 'https://vetwel.us/saglik-makaleleri.html#collection', url: 'https://vetwel.us/saglik-makaleleri.html', name: 'VetWel Sağlık Makaleleri' },
                { '@type': 'WebPage', url: 'https://vetwel.us/education.html', name: 'VetWel Bilgi Merkezi' },
                { '@type': 'ProfilePage', url: 'https://vetwel.us/uzman-hakkinda.html', name: 'VetWel Uzman Profili' }
              ]
            },
            {
              '@type': 'Person',
              '@id': 'https://vetwel.us/uzman-hakkinda.html#person',
              name: 'Nazif Oben Akşemsettinoğlu',
              honorificPrefix: 'Veteriner Hekimi',
              url: 'https://vetwel.us/uzman-hakkinda.html',
              image: 'https://vetwel.us/assets/images/dr-oben-avatar.png',
              jobTitle: 'VetWel Kurucusu • Fitoterapi & Wellness Danışmanı',
              affiliation: { '@id': 'https://vetwel.us/#organization' },
              alumniOf: {
                '@type': 'CollegeOrUniversity',
                name: 'İstanbul Üniversitesi Veteriner Fakültesi'
              },
              knowsAbout: [
                'Kedi ve köpek sağlığı',
                'Koruyucu hekimlik',
                'Klinik beslenme',
                'Fitoterapi',
                'Tamamlayıcı beslenme',
                'Pet supplementleri'
              ]
            }
          ]
        });
        document.head.appendChild(schema);
      }
    }

    // Strengthen crawl paths from the Turkish homepage to high-value informational pages.
    if (isTurkishRoot) {
      const actions = document.querySelector('.education-actions');
      ensureActionLink(actions, 'saglik-makaleleri.html', 'Sağlık Makaleleri');
      ensureActionLink(actions, 'uzman-hakkinda.html', 'Uzman Profili');

      document.querySelectorAll('a[href="https://www.vetwel.us"],a[href="https://www.vetwel.us/"]').forEach((link) => {
        link.href = 'https://vetwel.us/';
        if (link.textContent.includes('www.vetwel.us')) link.textContent = link.textContent.replace('www.vetwel.us', 'vetwel.us');
      });
    }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
