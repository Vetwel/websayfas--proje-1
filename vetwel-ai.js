(() => {
  if (window.__VETWEL_AI_LOADED__) return;
  window.__VETWEL_AI_LOADED__ = true;

  const isEnglish = (document.documentElement.lang || '').toLowerCase().startsWith('en');
  const copy = isEnglish ? {
    title: 'VetWel AI',
    subtitle: 'Pet Health Information Assistant',
    intro: 'Ask about pet health, VetWel products, or information on this website. I provide educational information and do not replace a veterinary examination.',
    placeholder: 'Type your question…',
    send: 'Send',
    close: 'Close VetWel AI',
    open: 'Open VetWel AI',
    launcher: 'Pet Health Assistant',
    launcherShort: 'Health Assistant',
    launcherBadge: 'AI • Free',
    thinking: 'Reviewing VetWel information…',
    error: 'The AI connection is temporarily unavailable. Please try again shortly.',
    disclaimer: 'AI-generated educational information. For diagnosis, treatment, medication changes, or urgent symptoms, contact a veterinarian.',
    starters: [
      'My pet has a symptom',
      'Help me find a VetWel product',
      'Compare VetWel products',
      'Show me a relevant health article'
    ],
    sourceLabel: 'Sources'
  } : {
    title: 'VetWel AI',
    subtitle: 'Evcil Hayvan Sağlığı Bilgi Asistanı',
    intro: 'Evcil hayvan sağlığı, VetWel ürünleri veya sitedeki bilgiler hakkında sorabilirsiniz. Eğitim amaçlı bilgi veririm; veteriner muayenesinin yerini almam.',
    placeholder: 'Sorunuzu yazın…',
    send: 'Gönder',
    close: 'VetWel AI’ı kapat',
    open: 'VetWel AI’ı aç',
    launcher: 'Evcil Hayvan Sağlık Asistanı',
    launcherShort: 'Sağlık Asistanı',
    launcherBadge: 'AI • Ücretsiz',
    thinking: 'VetWel bilgileri inceleniyor…',
    error: 'AI bağlantısı geçici olarak kullanılamıyor. Lütfen kısa süre sonra tekrar deneyin.',
    disclaimer: 'AI tarafından oluşturulan eğitim amaçlı bilgidir. Tanı, tedavi, ilaç değişikliği veya acil belirtiler için veteriner hekiminize başvurun.',
    starters: [
      'Evcil hayvanımda bir belirti var',
      'Bana uygun VetWel ürününü bul',
      'VetWel ürünlerini karşılaştır',
      'İlgili sağlık makalesini bul'
    ],
    sourceLabel: 'Kaynaklar'
  };

  const endpoint = window.VETWEL_AI_ENDPOINT || '/api/chat';
  const sessionKey = 'vetwel-ai-session-v1';
  const history = [];
  let sessionId = localStorage.getItem(sessionKey);
  if (!sessionId) {
    sessionId = (window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`);
    localStorage.setItem(sessionKey, sessionId);
  }

  const style = document.createElement('style');
  style.id = 'vetwel-ai-style';
  style.textContent = `
    #vetwel-ai-root{position:fixed;right:20px;bottom:20px;z-index:2147483000;font-family:Manrope,Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#172333}
    .vwai-launcher{min-height:62px;padding:7px 12px 7px 8px;border:1px solid rgba(117,201,216,.36);border-radius:19px;background:linear-gradient(135deg,#071b35,#0b3157);color:#fff;display:flex;align-items:center;gap:10px;cursor:pointer;box-shadow:0 14px 38px rgba(11,36,71,.3);transition:transform .2s ease,box-shadow .2s ease;text-align:left}
    .vwai-launcher:hover{transform:translateY(-2px);box-shadow:0 18px 44px rgba(11,36,71,.34)}
    .vwai-launcher:focus-visible{outline:3px solid rgba(117,201,216,.48);outline-offset:3px}
    .vwai-launcher-icon{width:46px;height:46px;flex:0 0 46px;border-radius:14px;background:#75c9d8;color:#082742;display:grid;place-items:center;box-shadow:inset 0 0 0 1px rgba(255,255,255,.45)}
    .vwai-launcher svg{width:25px;height:25px;fill:none;stroke:currentColor;stroke-width:2.15}
    .vwai-launcher-copy{display:flex;min-width:0;flex-direction:column;gap:3px;line-height:1.15}
    .vwai-launcher-label{font-size:13px;font-weight:850;white-space:nowrap;letter-spacing:-.1px}
    .vwai-launcher-short{display:none}
    .vwai-launcher-badge{color:#9de0e9;font-size:9px;font-weight:900;letter-spacing:.65px;text-transform:uppercase}
    .vwai-launcher-arrow{margin-left:2px;color:#9de0e9;font-size:18px;font-weight:900;line-height:1}
    .vwai-launcher.vwai-first-visit{animation:vwai-welcome 2.8s ease-out 1}
    @keyframes vwai-welcome{0%,100%{box-shadow:0 14px 38px rgba(11,36,71,.3)}35%{box-shadow:0 14px 44px rgba(11,36,71,.36),0 0 0 7px rgba(117,201,216,.18)}70%{box-shadow:0 14px 42px rgba(11,36,71,.34),0 0 0 3px rgba(117,201,216,.1)}}
    .vwai-panel{position:absolute;right:0;bottom:70px;width:min(390px,calc(100vw - 28px));height:min(650px,calc(100dvh - 105px));background:#fff;border:1px solid #dfe7ee;border-radius:24px;overflow:hidden;box-shadow:0 24px 70px rgba(11,36,71,.22);display:none;grid-template-rows:auto 1fr auto auto}
    .vwai-panel.open{display:grid}
    .vwai-head{display:flex;align-items:center;gap:12px;padding:17px 18px;background:linear-gradient(135deg,#071b35,#0b3157);color:#fff}
    .vwai-mark{width:42px;height:42px;border-radius:14px;background:rgba(255,255,255,.12);display:grid;place-items:center;font-size:22px;font-weight:900}
    .vwai-title{min-width:0;flex:1}.vwai-title strong{display:flex;align-items:center;gap:8px;font-size:16px}.vwai-title span{display:block;margin-top:2px;color:rgba(255,255,255,.7);font-size:11px}
    .vwai-beta{display:inline-flex!important;margin:0!important;padding:3px 6px;border-radius:999px;background:#75c9d8;color:#082742!important;font-size:8px!important;font-weight:900;letter-spacing:.6px}
    .vwai-close{width:34px;height:34px;border:0;border-radius:10px;background:rgba(255,255,255,.1);color:#fff;cursor:pointer;font-size:20px}
    .vwai-messages{overflow-y:auto;padding:18px;background:linear-gradient(180deg,#f7f9fc,#fff);overscroll-behavior:contain}
    .vwai-msg{max-width:88%;margin:0 0 12px;padding:11px 13px;border-radius:15px;font-size:13px;line-height:1.55;white-space:pre-wrap;overflow-wrap:anywhere}
    .vwai-msg.assistant{background:#fff;border:1px solid #e1e8ef;border-top-left-radius:5px;box-shadow:0 5px 16px rgba(11,36,71,.05)}
    .vwai-msg.user{margin-left:auto;background:#0b2447;color:#fff;border-bottom-right-radius:5px}
    .vwai-intro{margin-bottom:13px}
    .vwai-starters{display:grid;gap:7px;margin-top:11px}
    .vwai-starter{width:100%;padding:9px 11px;text-align:left;border:1px solid #dce6ee;border-radius:12px;background:#fff;color:#245f82;cursor:pointer;font:inherit;font-size:12px;font-weight:750}
    .vwai-starter:hover{background:#eef7fa}
    .vwai-sources{display:grid;gap:6px;margin-top:9px;padding-top:9px;border-top:1px solid #e7edf2}
    .vwai-sources-label{font-size:10px;font-weight:900;letter-spacing:.7px;text-transform:uppercase;color:#718294}
    .vwai-source{display:block;color:#256a93;font-size:11px;font-weight:750;text-decoration:none;line-height:1.35}
    .vwai-source:hover{text-decoration:underline}
    .vwai-thinking{display:flex;gap:6px;align-items:center;color:#718294;font-size:11px}.vwai-dot{width:6px;height:6px;border-radius:50%;background:#75c9d8;animation:vwai-pulse 1s infinite alternate}.vwai-dot:nth-child(2){animation-delay:.15s}.vwai-dot:nth-child(3){animation-delay:.3s}@keyframes vwai-pulse{to{opacity:.25;transform:translateY(-2px)}}
    .vwai-form{display:grid;grid-template-columns:1fr auto;gap:8px;padding:12px 12px 8px;border-top:1px solid #e2e9ef;background:#fff}
    .vwai-input{min-width:0;resize:none;max-height:110px;min-height:43px;padding:11px 12px;border:1px solid #d9e3eb;border-radius:13px;outline:none;font:inherit;font-size:13px;line-height:1.35;color:#172333;background:#fff}
    .vwai-input:focus{border-color:#75a9c8;box-shadow:0 0 0 3px rgba(44,120,168,.09)}
    .vwai-send{align-self:end;height:43px;padding:0 15px;border:0;border-radius:13px;background:#0b2447;color:#fff;cursor:pointer;font:inherit;font-size:12px;font-weight:850}
    .vwai-send:disabled{opacity:.5;cursor:not-allowed}
    .vwai-disclaimer{padding:0 13px 11px;background:#fff;color:#7a8998;font-size:9px;line-height:1.4}
    @media(max-width:600px){#vetwel-ai-root{right:12px;bottom:12px}.vwai-panel{position:fixed;right:10px;left:10px;bottom:86px;width:auto;height:min(650px,calc(100dvh - 102px));border-radius:20px}.vwai-launcher{min-height:58px;padding:6px 10px 6px 7px}.vwai-launcher-icon{width:44px;height:44px;flex-basis:44px}.vwai-launcher-full{display:none}.vwai-launcher-short{display:inline}.vwai-launcher-label{font-size:12px}.vwai-launcher-arrow{display:none}}
    @media(max-width:360px){.vwai-launcher-badge{display:none}.vwai-launcher-copy{max-width:112px}}
    @media(prefers-reduced-motion:reduce){.vwai-launcher,.vwai-dot{animation:none!important;transition:none!important}}
  `;
  document.head.appendChild(style);

  const root = document.createElement('div');
  root.id = 'vetwel-ai-root';
  root.innerHTML = `
    <section class="vwai-panel" role="dialog" aria-label="${copy.title}" aria-modal="false">
      <header class="vwai-head">
        <div class="vwai-mark" aria-hidden="true">✚</div>
        <div class="vwai-title"><strong>${copy.title}<span class="vwai-beta">BETA</span></strong><span>${copy.subtitle}</span></div>
        <button class="vwai-close" type="button" aria-label="${copy.close}">×</button>
      </header>
      <div class="vwai-messages" aria-live="polite"></div>
      <form class="vwai-form">
        <textarea class="vwai-input" rows="1" maxlength="1200" placeholder="${copy.placeholder}" aria-label="${copy.placeholder}"></textarea>
        <button class="vwai-send" type="submit">${copy.send}</button>
      </form>
      <div class="vwai-disclaimer">${copy.disclaimer}</div>
    </section>
    <button class="vwai-launcher" type="button" aria-label="${copy.open}" aria-expanded="false">
      <span class="vwai-launcher-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2h9A3.5 3.5 0 0 1 20 5.5v7a3.5 3.5 0 0 1-3.5 3.5H11l-4.8 4v-4A3.5 3.5 0 0 1 4 12.5z"/><path d="M9 9h6M12 6v6"/></svg></span>
      <span class="vwai-launcher-copy"><span class="vwai-launcher-label"><span class="vwai-launcher-full">${copy.launcher}</span><span class="vwai-launcher-short">${copy.launcherShort}</span></span><span class="vwai-launcher-badge">${copy.launcherBadge}</span></span>
      <span class="vwai-launcher-arrow" aria-hidden="true">›</span>
    </button>`;
  document.body.appendChild(root);

  const panel = root.querySelector('.vwai-panel');
  const launcher = root.querySelector('.vwai-launcher');
  const closeBtn = root.querySelector('.vwai-close');
  const messages = root.querySelector('.vwai-messages');
  const form = root.querySelector('.vwai-form');
  const input = root.querySelector('.vwai-input');
  const sendBtn = root.querySelector('.vwai-send');

  try {
    const welcomeKey = 'vetwel-ai-launcher-seen-v2';
    if (!localStorage.getItem(welcomeKey)) {
      launcher.classList.add('vwai-first-visit');
      localStorage.setItem(welcomeKey, '1');
    }
  } catch {
    launcher.classList.add('vwai-first-visit');
  }

  const safeSource = (source) => {
    try {
      const u = new URL(source.url, window.location.origin);
      if (!/^(https?:)$/.test(u.protocol)) return null;
      const allowed = u.origin === window.location.origin || /(^|\.)vetwel\.us$/i.test(u.hostname);
      return allowed ? { title: String(source.title || u.pathname), url: u.href } : null;
    } catch { return null; }
  };

  const addMessage = (role, text, sources = []) => {
    const wrap = document.createElement('div');
    wrap.className = `vwai-msg ${role}`;
    const body = document.createElement('div');
    body.textContent = text;
    wrap.appendChild(body);
    const validSources = sources.map(safeSource).filter(Boolean).slice(0, 4);
    if (role === 'assistant' && validSources.length) {
      const box = document.createElement('div');
      box.className = 'vwai-sources';
      const label = document.createElement('div');
      label.className = 'vwai-sources-label';
      label.textContent = copy.sourceLabel;
      box.appendChild(label);
      validSources.forEach((s) => {
        const a = document.createElement('a');
        a.className = 'vwai-source';
        a.href = s.url;
        a.target = '_self';
        a.rel = 'noopener';
        a.textContent = `${s.title} →`;
        box.appendChild(a);
      });
      wrap.appendChild(box);
    }
    messages.appendChild(wrap);
    messages.scrollTop = messages.scrollHeight;
    return wrap;
  };

  const addIntro = () => {
    const intro = document.createElement('div');
    intro.className = 'vwai-msg assistant vwai-intro';
    const text = document.createElement('div');
    text.textContent = copy.intro;
    intro.appendChild(text);
    const starters = document.createElement('div');
    starters.className = 'vwai-starters';
    copy.starters.forEach((label) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'vwai-starter';
      b.textContent = label;
      b.addEventListener('click', () => { input.value = label; submitMessage(); });
      starters.appendChild(b);
    });
    intro.appendChild(starters);
    messages.appendChild(intro);
  };
  addIntro();

  const setOpen = (open) => {
    panel.classList.toggle('open', open);
    launcher.setAttribute('aria-expanded', String(open));
    launcher.setAttribute('aria-label', open ? copy.close : copy.open);
    if (open) setTimeout(() => input.focus(), 60);
  };
  launcher.addEventListener('click', () => setOpen(!panel.classList.contains('open')));
  closeBtn.addEventListener('click', () => setOpen(false));

  const thinking = () => {
    const el = document.createElement('div');
    el.className = 'vwai-msg assistant';
    el.innerHTML = `<div class="vwai-thinking"><span>${copy.thinking}</span><span class="vwai-dot"></span><span class="vwai-dot"></span><span class="vwai-dot"></span></div>`;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
    return el;
  };

  async function submitMessage() {
    const message = input.value.trim();
    if (!message || sendBtn.disabled) return;
    input.value = '';
    input.style.height = 'auto';
    addMessage('user', message);
    history.push({ role: 'user', content: message });
    while (history.length > 8) history.shift();
    sendBtn.disabled = true;
    const pending = thinking();

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          history: history.slice(-6),
          lang: isEnglish ? 'en' : 'tr',
          pagePath: window.location.pathname,
          pageTitle: document.title,
          sessionId
        })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.reply) throw new Error(data.error || `HTTP ${response.status}`);
      pending.remove();
      addMessage('assistant', data.reply, Array.isArray(data.sources) ? data.sources : []);
      history.push({ role: 'assistant', content: data.reply });
      while (history.length > 8) history.shift();
    } catch (err) {
      console.warn('VetWel AI:', err);
      pending.remove();
      addMessage('assistant', copy.error);
    } finally {
      sendBtn.disabled = false;
      input.focus();
    }
  }

  form.addEventListener('submit', (event) => { event.preventDefault(); submitMessage(); });
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      submitMessage();
    }
  });
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = `${Math.min(input.scrollHeight, 110)}px`;
  });
})();
