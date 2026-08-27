const MODEL_DEFAULT = '@cf/meta/llama-3.1-8b-instruct-fp8';
const MAX_MESSAGE = 1200;
const MAX_HISTORY_ITEMS = 6;
const MAX_CONTEXT_CHARS = 9000;
const ALLOWED_ORIGINS = new Set([
  'https://vetwel.us',
  'https://www.vetwel.us'
]);

const STOP_WORDS = new Set([
  've','veya','ile','icin','bir','bu','su','ne','neden','nasil','mi','mu','benim','kedim','kopegim','kedi','kopek','pet','hayvan','evcil',
  'the','a','an','and','or','with','for','my','cat','dog','pet','is','are','what','why','how','does','do','to','of'
]);

const PRODUCT_INDEX = [
  { title:'Breathe Ease®', tr:'/education-breathe-ease.html', en:'/en/education-breathe-ease.html', keys:'solunum nefes oksuruk öksürük hapsirma hapşırma burun bronş respiratory breathing cough sneeze' },
  { title:'Cleanse®', tr:'/education-cleanse.html', en:'/en/education-cleanse.html', keys:'uriner üriner idrar mesane struvit urinary bladder urine' },
  { title:'KidneyWel® Tablet', tr:'/education-kidneywel.html', en:'/en/education-kidneywel.html', keys:'bobrek böbrek renal kidney kreatinin sdma fosfor phosphorus su icme içme idrar tablet' },
  { title:'KidneyWel® Liquid', tr:'/education-kidneywel-liquid.html', en:'/en/education-kidneywel-liquid.html', keys:'bobrek böbrek renal kidney liquid sivi sıvı' },
  { title:'LiverWel® Tablet', tr:'/education-liverwel-tablet.html', en:'/en/education-liverwel-tablet.html', keys:'karaciger karaciğer liver hepatic tablet' },
  { title:'LiverWel® Liquid', tr:'/education-liverwel-liquid.html', en:'/en/education-liverwel-liquid.html', keys:'karaciger karaciğer liver hepatic liquid sivi sıvı' },
  { title:'SkinWel®', tr:'/education-skinwel.html', en:'/en/education-skinwel.html', keys:'deri cilt tuy tüy kasinti kaşıntı pati alerji skin coat itch itching allergy hot spot' },
  { title:'HeartWel®', tr:'/education-heartwel.html', en:'/en/education-heartwel.html', keys:'kalp dolasim dolaşım heart cardiac circulation' },
  { title:'LactoWel®', tr:'/education-lactowel.html', en:'/en/education-lactowel.html', keys:'probiyotik ishal sindirim bagirsak bağırsak mikrobiyota probiotic diarrhea digestive gut microbiome' },
  { title:'CalmWel® Tablet', tr:'/education-calmwel-tablet.html', en:'/en/education-calmwel-tablet.html', keys:'stres korku sakin davranis davranış yolculuk havai fisek fişek ayrilik ayrılık calm stress anxiety fear travel fireworks tablet' },
  { title:'CalmWel® Liquid', tr:'/education-calmwel-liquid.html', en:'/en/education-calmwel-liquid.html', keys:'stres korku sakin davranis davranış calm stress anxiety fear liquid sivi sıvı' },
  { title:'DentaWel®', tr:'/education-dentawel.html', en:'/en/education-dentawel.html', keys:'agiz ağız dis diş diseti dişeti plak koku dental oral tooth teeth gum plaque breath' },
  { title:'VetWel Malt Paste', tr:'/education-malt-paste.html', en:'/en/education-malt-paste.html', keys:'tuy tüy yumagi yumağı hairball malt kusma vomiting' },
  { title:'Malign Detox®', tr:'/education-malign-detox.html', en:'/en/education-malign-detox.html', keys:'ozel özel bakim bakım yasam yaşam kalitesi nutritional special care quality life' }
];

const RED_FLAGS = [
  'idrar yapamiyor','idrar yapamıyor','cannot urinate','cannot pee','cant pee','can’t pee',
  'nefes alamiyor','nefes alamıyor','difficulty breathing','cannot breathe','cant breathe','can’t breathe',
  'bayildi','bayıldı','collapsed','collapse','nobet','nöbet','seizure',
  'zehir','poison','toxic','kanama','bleeding','kan kus','vomiting blood',
  'ip yuttu','oyuncak yuttu','foreign body','string swallowed','choking','bogul','boğul'
];

function normalize(value='') {
  return String(value)
    .toLowerCase()
    .replace(/ı/g,'i')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g,'')
    .replace(/[^a-z0-9\s]/g,' ')
    .replace(/\s+/g,' ')
    .trim();
}

function tokens(value='') {
  return [...new Set(normalize(value).split(' ').filter(t => t.length > 2 && !STOP_WORDS.has(t)))];
}

function decodeHtml(value='') {
  return value
    .replace(/&nbsp;/gi,' ')
    .replace(/&amp;/gi,'&')
    .replace(/&quot;/gi,'"')
    .replace(/&#39;|&apos;/gi,"'")
    .replace(/&lt;/gi,'<')
    .replace(/&gt;/gi,'>');
}

function stripHtml(html='') {
  return decodeHtml(
    html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ')
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ')
      .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi,' ')
      .replace(/<[^>]+>/g,' ')
      .replace(/\s+/g,' ')
      .trim()
  );
}

function extractTitle(html='', fallback='VetWel') {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match ? stripHtml(match[1]).replace(/\s*\|\s*VetWel.*$/i,'').trim() : fallback;
}

function extractArticleItems(html='') {
  const out = [];
  const re = /"name"\s*:\s*"([^"]+)"\s*,\s*"url"\s*:\s*"https?:\\?\/\\?\/(?:www\.)?vetwel\.us\/([^"]+)"/gi;
  let m;
  while ((m = re.exec(html)) && out.length < 120) {
    const path = '/' + m[2].replace(/\\\//g,'/').replace(/^\/+/, '');
    const title = m[1].replace(/\\u([0-9a-fA-F]{4})/g, (_,h) => String.fromCharCode(parseInt(h,16)));
    if (!out.some(x => x.path === path)) out.push({ title, path });
  }
  return out;
}

function scoreText(query, candidate) {
  const qTokens = tokens(query);
  const hay = normalize(candidate);
  if (!qTokens.length) return 0;
  let score = 0;
  for (const t of qTokens) {
    if (hay.includes(t)) score += 4;
    if (hay.startsWith(t)) score += 1;
  }
  const q = normalize(query);
  if (q.length > 4 && hay.includes(q)) score += 12;
  return score;
}

function relevantProducts(message, lang) {
  return PRODUCT_INDEX
    .map(p => ({ ...p, score:scoreText(message, `${p.title} ${p.keys}`) }))
    .filter(p => p.score > 0)
    .sort((a,b) => b.score - a.score)
    .slice(0, 2)
    .map(p => ({ title:p.title, path:lang === 'en' ? p.en : p.tr, score:p.score, kind:'product' }));
}

function isUrgent(message) {
  const q = normalize(message);
  return RED_FLAGS.some(flag => q.includes(normalize(flag)));
}

function corsHeaders(request) {
  const origin = request.headers.get('origin');
  if (!origin || ALLOWED_ORIGINS.has(origin) || origin === new URL(request.url).origin) {
    return origin ? {
      'Access-Control-Allow-Origin':origin,
      'Access-Control-Allow-Methods':'POST, OPTIONS',
      'Access-Control-Allow-Headers':'Content-Type',
      'Access-Control-Max-Age':'86400',
      'Vary':'Origin'
    } : {};
  }
  return null;
}

async function readAsset(env, request, path) {
  try {
    const url = new URL(path, request.url);
    const response = await env.ASSETS.fetch(new Request(url, {
      method:'GET',
      headers:{ 'Accept':'text/html' }
    }));
    if (!response.ok) return null;
    return await response.text();
  } catch {
    return null;
  }
}

async function collectKnowledge(env, request, message, lang, pagePath) {
  const hubPath = lang === 'en' ? '/en/health-articles.html' : '/saglik-makaleleri.html';
  const hubHtml = await readAsset(env, request, hubPath);
  const articleItems = hubHtml ? extractArticleItems(hubHtml) : [];

  const rankedArticles = articleItems
    .map(a => ({ ...a, score:scoreText(message, a.title), kind:'article' }))
    .filter(a => a.score > 0)
    .sort((a,b) => b.score - a.score)
    .slice(0, 3);

  const selected = [
    ...rankedArticles.slice(0, 2),
    ...relevantProducts(message, lang).slice(0, 2)
  ];

  if (
    pagePath &&
    /^\/(?:en\/)?[^?#]+\.html$/i.test(pagePath) &&
    !selected.some(x => x.path === pagePath)
  ) {
    selected.push({ title:'Current VetWel page', path:pagePath, kind:'page', score:2 });
  }

  const sources = [];
  const contextParts = [];
  let used = 0;

  for (const item of selected.slice(0, 4)) {
    const html = await readAsset(env, request, item.path);
    if (!html) continue;

    const title = extractTitle(html, item.title);
    const text = stripHtml(html).slice(0, 3200);
    if (!text) continue;

    const remaining = MAX_CONTEXT_CHARS - used;
    if (remaining <= 400) break;

    const clipped = text.slice(0, remaining);
    used += clipped.length;
    contextParts.push(`SOURCE: ${title}\nPATH: ${item.path}\nCONTENT: ${clipped}`);
    sources.push({ title, path:item.path, kind:item.kind });
  }

  if (!contextParts.length && hubHtml) {
    const names = articleItems
      .slice(0, 36)
      .map(a => `- ${a.title} (${a.path})`)
      .join('\n');
    contextParts.push(`VetWel health article index:\n${names}`);
  }

  return {
    context:contextParts.join('\n\n---\n\n'),
    sources
  };
}

function buildInstructions(lang, urgent) {
  const shared = `You are VetWel AI, an educational pet-health information assistant for VetWel.

RULES:
- Never diagnose a pet or present a supplement as a treatment, cure, or substitute for veterinary care.
- Never tell a user to start, stop, or change a prescription medication.
- Product-specific claims must come only from the APPROVED VETWEL SOURCE CONTEXT supplied in the request. If the source does not support a claim, say you do not have verified VetWel information for it.
- For general pet-health education, be cautious, practical, and clearly distinguish possibilities from diagnosis.
- If urgent warning signs are present, clearly recommend prompt/emergency veterinary assessment before discussing optional supportive products.
- Do not give pet owners catheterization, bladder instillation, or other invasive procedural instructions for Cleanse or any product.
- Do not invent links, ingredients, dosages, studies, or VetWel product benefits.
- Do not claim that a supplement treats or cures disease.
- Keep answers concise enough for a chat widget.
- Do not ask for unnecessary personal information.
- If a relevant VetWel product is mentioned, describe it only as supportive/complementary and keep veterinary evaluation primary.
- Use only the supplied VetWel source context for VetWel-specific facts.`;

  if (lang === 'en') {
    return shared + `
Respond in English. End medical guidance with a brief reminder to consult a veterinarian when appropriate.${urgent ? '\nURGENT FLAG: Start by telling the user this may need prompt veterinary evaluation.' : ''}`;
  }

  return shared + `
Türkçe yanıt ver. Dil sıcak, profesyonel ve anlaşılır olsun. Sağlıkla ilgili yanıtlarda uygun olduğunda veteriner hekime danışma hatırlatması yap. Bir VetWel ürünü ilgiliyse Türkiye için doğrudan satış dili kullanma; en fazla “Veterinerinize VetWel®’i sorun” veya ürün bilgisini incelemeye yönlendir.${urgent ? '\nACİL UYARI: Yanıta bu durumun gecikmeden veteriner değerlendirmesi gerektirebileceğini belirterek başla.' : ''}`;
}

function extractWorkersText(data) {
  if (typeof data?.response === 'string' && data.response.trim()) {
    return data.response.trim();
  }

  const content = data?.choices?.[0]?.message?.content;
  if (typeof content === 'string' && content.trim()) {
    return content.trim();
  }

  if (Array.isArray(content)) {
    const text = content
      .map(item => typeof item === 'string' ? item : (item?.text || ''))
      .join('\n')
      .trim();
    if (text) return text;
  }

  if (typeof data?.output_text === 'string' && data.output_text.trim()) {
    return data.output_text.trim();
  }

  return '';
}

async function callWorkersAI(env, payload, knowledge, urgent) {
  if (!env.AI || typeof env.AI.run !== 'function') {
    throw new Error('AI_BINDING_MISSING');
  }

  const history = Array.isArray(payload.history)
    ? payload.history.slice(-MAX_HISTORY_ITEMS)
    : [];

  const compactHistory = history
    .map(x => `${x.role === 'assistant' ? 'Assistant' : 'User'}: ${String(x.content || '').slice(0,550)}`)
    .join('\n');

  const input = `${compactHistory ? `RECENT CONVERSATION:\n${compactHistory}\n\n` : ''}CURRENT USER QUESTION:
${payload.message}

APPROVED VETWEL SOURCE CONTEXT:
${knowledge.context || 'No directly relevant VetWel source was retrieved.'}`;

  let result;
  try {
    result = await env.AI.run(env.VETWEL_AI_MODEL || MODEL_DEFAULT, {
      messages:[
        {
          role:'system',
          content:buildInstructions(payload.lang === 'en' ? 'en' : 'tr', urgent)
        },
        {
          role:'user',
          content:input
        }
      ],
      max_tokens:450,
      temperature:0.2
    });
  } catch (error) {
    const detail = String(error?.message || error || '');
    console.log('Workers AI error', detail.slice(0,300));

    if (/quota|allocation|limit|3036|exceeded|too many requests|429/i.test(detail)) {
      throw new Error('AI_FREE_QUOTA_EXHAUSTED');
    }

    throw new Error('WORKERS_AI_REQUEST_FAILED');
  }

  const text = extractWorkersText(result);
  if (!text) throw new Error('EMPTY_MODEL_RESPONSE');
  return text;
}

function json(data, status=200, extraHeaders={}) {
  return new Response(JSON.stringify(data), {
    status,
    headers:{
      'Content-Type':'application/json; charset=utf-8',
      'Cache-Control':'no-store',
      'X-Content-Type-Options':'nosniff',
      ...extraHeaders
    }
  });
}

async function handleChat(request, env) {
  const cors = corsHeaders(request);
  if (!cors) {
    return json({ error:'Origin not allowed.' }, 403);
  }

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status:204,
      headers:{ 'Allow':'POST, OPTIONS', ...cors }
    });
  }

  if (request.method !== 'POST') {
    return json({ error:'Method not allowed' }, 405, { 'Allow':'POST, OPTIONS', ...cors });
  }

  const length = Number(request.headers.get('content-length') || 0);
  if (length > 20000) {
    return json({ error:'Request too large.' }, 413, cors);
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error:'Invalid JSON.' }, 400, cors);
  }

  const message = String(payload?.message || '').trim();
  if (!message || message.length > MAX_MESSAGE) {
    return json({ error:'Message must be between 1 and 1200 characters.' }, 400, cors);
  }

  const lang = payload?.lang === 'en' ? 'en' : 'tr';
  const pagePath = String(payload?.pagePath || '').slice(0,300);
  const sessionId = String(payload?.sessionId || '').slice(0,128);
  if (!/^[a-zA-Z0-9-]{8,128}$/.test(sessionId)) {
    return json({ error:'Invalid session.' }, 400, cors);
  }

  if (env.AI_RATE_LIMITER) {
    const { success } = await env.AI_RATE_LIMITER.limit({ key:sessionId });
    if (!success) {
      return json({ error:'Too many requests. Please try again shortly.' }, 429, cors);
    }
  }

  const urgent = isUrgent(message);

  try {
    const knowledge = await collectKnowledge(env, request, message, lang, pagePath);
    const reply = await callWorkersAI(
      env,
      { ...payload, message, lang },
      knowledge,
      urgent
    );

    const base = new URL(request.url);
    const requestOrigin = request.headers.get('origin');
    const publicOrigin = requestOrigin && ALLOWED_ORIGINS.has(requestOrigin)
      ? requestOrigin
      : base.origin;
    const sources = knowledge.sources
      .slice(0,4)
      .map(s => ({
        title:s.title,
        url:new URL(s.path, publicOrigin).href
      }));

    return json({ reply, urgent, sources }, 200, cors);
  } catch (error) {
    const code = String(error?.message || error);

    if (code === 'AI_BINDING_MISSING') {
      return json({
        error:lang === 'en'
          ? 'VetWel AI is being activated.'
          : 'VetWel AI bağlantısı etkinleştiriliyor.'
      }, 503, cors);
    }

    if (code === 'AI_FREE_QUOTA_EXHAUSTED') {
      return json({
        error:lang === 'en'
          ? 'Today’s free AI allowance has been reached. Please try again later.'
          : 'Bugünkü ücretsiz AI kotasına ulaşıldı. Lütfen daha sonra tekrar deneyin.'
      }, 429, cors);
    }

    console.log('VetWel AI failure', code);
    return json({
      error:lang === 'en'
        ? 'AI service is temporarily unavailable.'
        : 'AI servisi geçici olarak kullanılamıyor.'
    }, 502, cors);
  }
}

class VetWelAiInjector {
  element(element) {
    element.append(
      '<script src="/vetwel-ai.js" defer data-vetwel-ai="1"></script>',
      { html:true }
    );
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/chat') {
      return handleChat(request, env);
    }

    const response = await env.ASSETS.fetch(request);
    const contentType = response.headers.get('content-type') || '';

    if (request.method === 'GET' && contentType.includes('text/html')) {
      return new HTMLRewriter()
        .on('body', new VetWelAiInjector())
        .transform(response);
    }

    return response;
  }
};
