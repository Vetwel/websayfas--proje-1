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

    // Keep public pages eligible for rich snippets and large previews.
    ensureMeta('robots', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');

    if (isTurkishRoot) {
      ensureLink('canonical', 'https://vetwel.us/');
      ensureLink('alternate', 'https://vetwel.us/', 'tr');
      ensureLink('alternate', 'https://vetwel.us/en/', 'en');
      ensureLink('alternate', 'https://vetwel.us/', 'x-default');
      ensureProperty('og:url', 'https://vetwel.us/');
    } else if (isEnglishRoot) {
      ensureLink('canonical', 'https://vetwel.us/en/');
      ensureLink('alternate', 'https://vetwel.us/', 'tr');
      ensureLink('alternate', 'https://vetwel.us/en/', 'en');
      ensureLink('alternate', 'https://vetwel.us/', 'x-default');
      ensureProperty('og:url', 'https://vetwel.us/en/');
    } else {
      const canonicalUrl = `https://vetwel.us${pathname}`;
      ensureLink('canonical', canonicalUrl);
      ensureProperty('og:url', canonicalUrl);
    }

    if (isTurkishRoot || isEnglishRoot) {
      const expertUrl = isEnglishRoot
        ? 'https://vetwel.us/en/about-expert.html'
        : 'https://vetwel.us/uzman-hakkinda.html';
      const expertId = `${expertUrl}#person`;
      const educationUrl = isEnglishRoot
        ? 'https://vetwel.us/en/education.html'
        : 'https://vetwel.us/education.html';
      const healthHubUrl = isEnglishRoot
        ? 'https://vetwel.us/en/health-articles.html'
        : 'https://vetwel.us/saglik-makaleleri.html';
      const editorialUrl = isEnglishRoot
        ? 'https://vetwel.us/en/editorial-policy.html'
        : 'https://vetwel.us/editorial-policy.html';

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
              founder: { '@id': expertId },
              publishingPrinciples: editorialUrl,
              knowsAbout: isEnglishRoot ? [
                'Cat and dog health',
                'Veterinary wellness supplements',
                'Clinical nutrition',
                'Phytotherapy',
                'Complementary nutrition'
              ] : [
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
                { '@type': 'CollectionPage', url: healthHubUrl, name: isEnglishRoot ? 'VetWel U.S. Pet Health Articles' : 'VetWel Sağlık Makaleleri' },
                { '@type': 'WebPage', url: educationUrl, name: isEnglishRoot ? 'VetWel Education Center' : 'VetWel Bilgi Merkezi' },
                { '@type': 'ProfilePage', url: expertUrl, name: isEnglishRoot ? 'VetWel Expert Profile' : 'VetWel Uzman Profili' },
                { '@type': 'WebPage', url: editorialUrl, name: isEnglishRoot ? 'VetWel Editorial Policy' : 'VetWel Editoryal İlkeleri' }
              ]
            },
            {
              '@type': 'Person',
              '@id': expertId,
              name: 'Nazif Oben Akşemsettinoğlu',
              honorificPrefix: isEnglishRoot ? 'Veterinarian' : 'Veteriner Hekimi',
              url: expertUrl,
              image: 'https://vetwel.us/assets/images/dr-oben-avatar.png',
              jobTitle: isEnglishRoot
                ? 'VetWel Founder • Phytotherapy & Wellness Consultant'
                : 'VetWel Kurucusu • Fitoterapi & Wellness Danışmanı',
              affiliation: { '@id': 'https://vetwel.us/#organization' },
              alumniOf: {
                '@type': 'CollegeOrUniversity',
                name: 'Istanbul University Faculty of Veterinary Medicine'
              },
              knowsAbout: isEnglishRoot ? [
                'Companion-animal health',
                'Preventive veterinary medicine',
                'Clinical nutrition',
                'Phytotherapy',
                'Complementary nutrition',
                'Pet nutritional supplements'
              ] : [
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

    // Strengthen crawl paths and the conversion hierarchy on the Turkish homepage.
    if (isTurkishRoot) {
      const actions = document.querySelector('.education-actions');
      ensureActionLink(actions, 'saglik-makaleleri.html', 'Sağlık Makaleleri');
      ensureActionLink(actions, 'uzman-hakkinda.html', 'Uzman Profili');

      const homepageDescription = 'VetWel®, kedi ve köpeklerin farklı sağlık ihtiyaçları için veteriner hekimlik yaklaşımıyla geliştirilen bilim temelli sağlık ve beslenme çözümlerini yalnızca veteriner klinikleri aracılığıyla sunar.';
      ensureMeta('description', homepageDescription);
      ensureProperty('og:description', homepageDescription);

      const heroEyebrow = document.querySelector('.hero .eyebrow');
      if (heroEyebrow) heroEyebrow.textContent = 'Veteriner Uzmanlığı • Yalnızca Veteriner Kanalında';

      const heroTitle = document.querySelector('.hero h1');
      if (heroTitle) heroTitle.innerHTML = 'Veteriner hekimlik yaklaşımıyla geliştirilen <span>bilim temelli sağlık çözümleri.</span>';

      const heroDescription = document.querySelector('.hero-description');
      if (heroDescription) {
        heroDescription.textContent = 'VetWel®, kedi ve köpeklerin farklı sağlık ihtiyaçları için geliştirilen sağlık ve beslenme çözümlerini yalnızca veteriner klinikleri aracılığıyla sunar. Ürün seçimi ve kullanım planı için veteriner hekiminize danışın.';
      }

      const heroSecondary = document.querySelector('.hero-actions .button-secondary');
      if (heroSecondary) {
        heroSecondary.href = 'klinik-bul.html';
        heroSecondary.innerHTML = 'Klinik Bul <span aria-hidden="true">→</span>';
      }

      const heroProofItems = document.querySelectorAll('.hero-proof > div');
      if (heroProofItems.length >= 3) {
        heroProofItems[2].innerHTML = '<strong>Veteriner Kanalı</strong><span>Kliniklerde Sunulur</span>';
      }

      const navigation = document.querySelector('.primary-navigation');
      const contactLink = navigation?.querySelector('a[href="#iletisim"]');
      let clinicLink = navigation?.querySelector('a[href="klinik-bul.html"]');
      if (navigation && !clinicLink) {
        clinicLink = document.createElement('a');
        clinicLink.href = 'klinik-bul.html';
        navigation.insertBefore(clinicLink, contactLink || null);
      }
      if (clinicLink) {
        clinicLink.textContent = 'Klinik Bul';
        clinicLink.classList.add('nav-cta');
      }
      if (contactLink) contactLink.classList.remove('nav-cta');

      const purchaseFaqButton = [...document.querySelectorAll('.accordion-button')].find(
        (button) => button.textContent.includes('VetWel ürünlerini nereden satın alabilirim?')
      );
      const purchaseFaqText = purchaseFaqButton?.nextElementSibling?.querySelector('p');
      if (purchaseFaqText) {
        purchaseFaqText.innerHTML = 'VetWel® ürünleri yalnızca veteriner kliniklerinde satılmaktadır. Size yakın VetWel ürünlerinin bulunduğu veteriner kliniklerini <a href="klinik-bul.html"><strong>Klinik Bulucu</strong></a> üzerinden şehir, ilçe veya klinik adına göre görüntüleyebilirsiniz.';
      }

      const footerColumns = [...document.querySelectorAll('.footer-column')];
      const corporateColumn = footerColumns.find((column) => column.querySelector('h3')?.textContent.trim() === 'Kurumsal');
      if (corporateColumn && !corporateColumn.querySelector('a[href="klinik-bul.html"]')) {
        const footerClinicLink = document.createElement('a');
        footerClinicLink.href = 'klinik-bul.html';
        footerClinicLink.textContent = 'Klinik Bul';
        corporateColumn.appendChild(footerClinicLink);
      }

      document.querySelectorAll('a[href="https://www.vetwel.us"],a[href="https://www.vetwel.us/"]').forEach((link) => {
        link.href = 'https://vetwel.us/';
        if (link.textContent.includes('www.vetwel.us')) link.textContent = link.textContent.replace('www.vetwel.us', 'vetwel.us');
      });
    }

    // Give the U.S. homepage the same authority, information and conversion hierarchy,
    // adapted to U.S. availability rather than the Turkish veterinary-clinic directory.
    if (isEnglishRoot) {
      const homepageDescription = 'VetWel® develops science-based veterinary wellness and nutritional support solutions for cats and dogs, with responsible product guidance, veterinary context, and U.S. availability information.';
      ensureMeta('description', homepageDescription);
      ensureProperty('og:description', homepageDescription);

      const heroEyebrow = document.querySelector('.hero .eyebrow');
      if (heroEyebrow) heroEyebrow.textContent = 'Veterinary Expertise • Science-Based Wellness';

      const heroTitle = document.querySelector('.hero h1');
      if (heroTitle) heroTitle.innerHTML = 'Veterinary wellness solutions built around <span>real health needs.</span>';

      const heroDescription = document.querySelector('.hero-description');
      if (heroDescription) {
        heroDescription.textContent = 'VetWel® combines veterinary experience with modern nutrition and botanical formulation to support cats and dogs across kidney, urinary, liver, skin, digestive, cardiovascular, respiratory, oral, and behavioral wellness.';
      }

      const heroSecondary = document.querySelector('.hero-actions .button-secondary');
      if (heroSecondary) {
        heroSecondary.href = 'where-to-buy.html';
        heroSecondary.innerHTML = 'Where to Buy <span aria-hidden="true">→</span>';
      }

      const heroProofItems = document.querySelectorAll('.hero-proof > div');
      if (heroProofItems.length >= 3) {
        heroProofItems[2].innerHTML = '<strong>Responsible Use</strong><span>Veterinary Guidance</span>';
      }

      const actions = document.querySelector('.education-actions');
      ensureActionLink(actions, 'health-articles.html', 'Health Articles');
      ensureActionLink(actions, 'about-expert.html', 'Expert Profile');
      ensureActionLink(actions, 'editorial-policy.html', 'Editorial Policy');

      const navigation = document.querySelector('.primary-navigation');
      const contactLink = navigation?.querySelector('a[href="#contact"]');
      let buyLink = navigation?.querySelector('a[href="where-to-buy.html"]');
      if (navigation && !buyLink) {
        buyLink = document.createElement('a');
        buyLink.href = 'where-to-buy.html';
        navigation.insertBefore(buyLink, contactLink || null);
      }
      if (buyLink) {
        buyLink.textContent = 'Where to Buy';
        buyLink.classList.add('nav-cta');
      }
      if (contactLink) contactLink.classList.remove('nav-cta');

      const purchaseFaqButton = [...document.querySelectorAll('.accordion-button')].find(
        (button) => button.textContent.includes('Where can I purchase VetWel products?')
      );
      const purchaseFaqText = purchaseFaqButton?.nextElementSibling?.querySelector('p');
      if (purchaseFaqText) {
        purchaseFaqText.innerHTML = 'For current U.S. availability, use the <a href="where-to-buy.html"><strong>Where to Buy</strong></a> page. Only verified VetWel purchasing channels are listed as they become available.';
      }

      const footerColumns = [...document.querySelectorAll('.footer-column')];
      const companyColumn = footerColumns.find((column) => {
        const title = column.querySelector('h3')?.textContent.trim().toLowerCase();
        return title === 'company' || title === 'corporate';
      });
      if (companyColumn) {
        const footerLinks = [
          ['about-expert.html', 'Expert Profile'],
          ['editorial-policy.html', 'Editorial Policy'],
          ['where-to-buy.html', 'Where to Buy']
        ];
        footerLinks.forEach(([href, text]) => {
          if (companyColumn.querySelector(`a[href="${href}"]`)) return;
          const link = document.createElement('a');
          link.href = href;
          link.textContent = text;
          companyColumn.appendChild(link);
        });
      }
    }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
