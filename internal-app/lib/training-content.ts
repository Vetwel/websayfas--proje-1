export type TrainingStatus = "ONAYLI" | "KISMEN ONAYLI" | "DOĞRULAMA GEREKİYOR";

export type TrainingModule = {
  slug: string;
  product: string;
  form: string;
  supportArea: string;
  target: string;
  status: TrainingStatus;
  positioning: string;
  dose: string;
  formulation: string[];
  clinicPitch: string;
  doSay: string[];
  dontSay: string[];
  limitations?: string[];
  checkpoints: { question: string; answer: string }[];
};

export const trainingModules: TrainingModule[] = [
  {
    slug: "kidneywel-tablet",
    product: "KidneyWel",
    form: "Tablet",
    supportArea: "Böbrek sağlığı desteği",
    target: "Kedi + Köpek",
    status: "ONAYLI",
    positioning:
      "Kidney Health Support. Fosfor bağlayıcı olarak konumlandırılmaz; yaklaşım fosfor emilimini azaltmaya yönelik destek ve antioksidan destektir.",
    dose:
      "Kedi: 1 tablet. Köpek: 1–10 kg 1; 10–20 kg 2; 20–30 kg 3; 30–40 kg 4; 40–50 kg 5; 50–120 kg 5 tablet/doz. İlk 3 gün günde 3 doz; sonrasında günde 2 doz. Minimum 21 gün.",
    formulation: [
      "Fosfor bağlayıcı değildir.",
      "Fosfor emilimini azaltmaya yönelik destek yaklaşımı kullanılır.",
      "Antioksidan destek ekseni bulunur.",
    ],
    clinicPitch:
      "KidneyWel Tablet böbrek sağlığı desteği için konumlandırılır. Fosfor bağlayıcı olduğunu söylemiyoruz; formülasyon yaklaşımını fosfor emilimini azaltmaya yönelik destek ve antioksidan destek üzerinden anlatıyoruz.",
    doSay: [
      "Böbrek sağlığı desteği olarak konumlandırılır.",
      "Dozu ürünün doğrulanmış kilo tablosuna göre ver.",
      "Başlangıç protokolünü ilk 3 gün TID, sonra BID ve minimum 21 gün olarak anlat.",
    ],
    dontSay: [
      "Fosfor bağlayıcıdır.",
      "Böbrek hastalığını tedavi eder.",
      "Liquid formun dozu Tablet ile aynıdır.",
    ],
    checkpoints: [
      {
        question: "KidneyWel Tablet fosfor bağlayıcı mıdır?",
        answer:
          "Hayır. Fosfor bağlayıcı olarak konumlandırılmaz; fosfor emilimini azaltmaya yönelik destek yaklaşımı ve antioksidan destek anlatılır.",
      },
      {
        question: "Başlangıç kullanım sıklığı nedir?",
        answer: "İlk 3 gün günde 3 doz; sonrasında günde 2 doz. Minimum 21 gün.",
      },
    ],
  },
  {
    slug: "kidneywel-liquid",
    product: "KidneyWel",
    form: "Liquid",
    supportArea: "Böbrek ve üriner sistem desteği",
    target: "Kedi + Köpek",
    status: "ONAYLI",
    positioning:
      "Renal ve üriner sistemi çok yönlü destekleyen bitkisel sıvı formül; primer tedavi veya renal diyet yerine geçmez.",
    dose:
      "Kedi + Köpek: her uygulamada 0,5 mL/kg. Günde 2 kez. Doğrudan ağızdan veya mama/içme suyuna karıştırılabilir. Kullanım süresi veteriner hekimin klinik değerlendirmesine göre belirlenir.",
    formulation: [
      "26 bitkisel içerik.",
      "Ana eksenler: renal fonksiyon, diürez, azotlu metabolitlerin doğal eliminasyonu ve üriner akış/konfor desteği.",
      "Fosfor emiliminin azaltılması ikincil eksendir; fosfor bağlayıcı değildir.",
    ],
    clinicPitch:
      "KidneyWel Liquid, renal ve üriner sistemi çok yönlü desteklemek üzere tasarlanmış 26 bitkisel içerikli sıvı formdur. Dozu 0,5 mL/kg/doz, günde iki kezdir; primer tedavi veya renal diyetin yerine konumlandırılmaz.",
    doSay: [
      "Tablet ve Liquid ayrı formül ve ayrı doz kaydıdır.",
      "0,5 mL/kg/doz, günde 2 kez bilgisini kullan.",
      "Süreyi veteriner hekimin klinik değerlendirmesine bağla.",
    ],
    dontSay: [
      "Tablet dozu Liquid için de geçerlidir.",
      "Renal diyetin yerini alır.",
      "Primer tedavi yerine kullanılabilir.",
    ],
    checkpoints: [
      {
        question: "KidneyWel Liquid dozu nedir?",
        answer: "Her uygulamada 0,5 mL/kg, günde 2 kez.",
      },
      {
        question: "KidneyWel Liquid renal diyet yerine geçer mi?",
        answer: "Hayır. Tamamlayıcı destek olarak konumlandırılır; primer tedavi veya renal diyet yerine geçmez.",
      },
    ],
  },
  {
    slug: "liverwel-tablet",
    product: "LiverWel",
    form: "Tablet",
    supportArea: "Karaciğer sağlığı desteği",
    target: "Kedi + Köpek",
    status: "ONAYLI",
    positioning:
      "Çok yönlü hepatik destek; veteriner hekimin oluşturduğu bakım planına tamamlayıcı olarak konumlandırılır.",
    dose:
      "Kedi: her uygulamada 1 tablet. Köpek: 1–10 kg 1; 10–20 kg 2; 20–30 kg 3; 30–40 kg 4; 40–50 kg 5; 50–120 kg 5 tablet/doz. İlk 3 gün günde 3 doz; 4. günden itibaren günde 2 doz. Minimum 21 gün; veteriner değerlendirmesiyle uzatılabilir.",
    formulation: [
      "21 bitkisel ekstrakt.",
      "Hepatik fonksiyon desteği.",
      "Safra/sindirim ve iştah-sindirim konforu eksenleri.",
      "Antioksidan savunma ve eliminasyon/metabolik denge desteği.",
    ],
    clinicPitch:
      "LiverWel Tablet, 21 bitkisel ekstraktla hepatik fonksiyon, safra-sindirim, antioksidan savunma ve metabolik denge eksenlerini birlikte desteklemek üzere konumlandırılır. Veteriner hekimin bakım planına tamamlayıcıdır.",
    doSay: [
      "21 bitkisel ekstrakt ve çok yönlü hepatik destek eksenlerini anlat.",
      "Veteriner hekimin bakım planına tamamlayıcı olduğunu belirt.",
      "Doz ve kullanım süresinde doğrulanmış Tablet kaydını kullan.",
    ],
    dontSay: [
      "Karaciğer hastalığını tedavi eder.",
      "Liquid formun dozu Tablet ile aynıdır.",
      "Doğrulanmamış Liquid bilgilerini Tablet üzerinden türet.",
    ],
    checkpoints: [
      {
        question: "LiverWel Tablet kaç bitkisel ekstrakt içerir?",
        answer: "21 bitkisel ekstrakt.",
      },
      {
        question: "LiverWel Tablet nasıl konumlandırılır?",
        answer: "Çok yönlü hepatik destek; veteriner hekimin bakım planına tamamlayıcı olarak.",
      },
    ],
  },
  {
    slug: "calmwel-tablet",
    product: "CalmWel",
    form: "Tablet",
    supportArea: "Sakinleşme / stres desteği",
    target: "Kedi + Köpek",
    status: "ONAYLI",
    positioning:
      "Stresli veya değişken çevresel koşullarda sakinlik, davranış dengesi ve adaptasyon desteği; tedavi veya sedasyon iddiası yapılmaz.",
    dose:
      "Kedi: her uygulamada 1 tablet. Köpek: 1–10 kg 1; 10–20 kg 2; 20–30 kg 3; 30–40 kg 4; 40–50 kg 5; 50–120 kg 5 tablet/doz. İlk 3 gün günde 3 kez; 4. günden itibaren günde 2 kez. Minimum 21 gün.",
    formulation: [
      "Çok bileşenli bitkisel fitokompleks.",
      "Sakinlik, korku/stres yanıtı ve davranış dengesi eksenleri.",
      "Çevresel adaptasyon ve gerginlik desteği.",
      "Amaç belirgin sedasyon değil, sakin ve dengeli davranış desteğidir.",
    ],
    clinicPitch:
      "CalmWel Tablet, stresli veya değişken koşullarda sakinlik, davranış dengesi ve çevresel adaptasyonu desteklemek için konumlandırılır. Sedatif veya tedavi edici bir ürün dili kullanmıyoruz.",
    doSay: [
      "Sakinlik, davranış dengesi ve adaptasyon desteğini anlat.",
      "Amaç belirgin sedasyon değil şeklinde sınırı net tut.",
      "Tablet dozunu doğrulanmış kilo tablosuna göre kullan.",
    ],
    dontSay: [
      "Sedatiftir.",
      "Psikolojik kaşıntıyı tedavi eder.",
      "Liquid formun dozu Tablet ile aynıdır.",
    ],
    checkpoints: [
      {
        question: "CalmWel Tablet'in amacı belirgin sedasyon mudur?",
        answer: "Hayır. Amaç sakin ve dengeli davranış ile adaptasyon desteğidir.",
      },
      {
        question: "CalmWel Tablet hangi ana alanlarda konumlandırılır?",
        answer: "Stres/sakinlik, davranış dengesi ve çevresel adaptasyon desteği.",
      },
    ],
  },
  {
    slug: "skinwel-tablet",
    product: "SkinWel",
    form: "Tablet",
    supportArea: "Deri ve tüy sağlığı desteği",
    target: "Kedi + Köpek",
    status: "KISMEN ONAYLI",
    positioning: "Skin / coat health support. Doz temeli kayıtlıdır; tam içerik listesi ve ara kilo kuralı doğrulama bekler.",
    dose:
      "Kedi: 1 tablet/doz. Köpek: her 10 kg için 1 tablet/doz. İlk 3 gün günde 3 doz; 4. günden sonra günde 2 doz. Minimum 21 gün; uzatılabilir. Ara kilo yuvarlama kuralı doğrulanmamıştır.",
    formulation: [
      "Toplam 20 içerik bilgisi kayıtlıdır.",
      "Tam 20 içerik listesi henüz resmi kaynakla doğrulanmamıştır.",
      "Eğitimde doğrulanmamış tek tek içerik veya mekanizma uydurulmaz.",
    ],
    clinicPitch:
      "SkinWel deri ve tüy sağlığı desteği için konumlandırılır. Kedi dozu ve her 10 kg için köpek doz temeli kayıtlıdır; ancak ara kilo yuvarlama kuralını tahmin etmiyoruz ve tam içerik listesi doğrulama bekliyor.",
    doSay: [
      "Deri ve tüy sağlığı desteği olarak anlat.",
      "İlk 3 gün TID, sonra BID ve minimum 21 gün kullanım sıklığını kayıtlı şekliyle ver.",
      "Ara kilo sorusunda resmi yuvarlama kuralının doğrulanmadığını açıkça belirt.",
    ],
    dontSay: [
      "15 kg köpeği kendi başına 1 veya 2 tablete yuvarla.",
      "20 içeriğin isimlerini doğrulanmadan say.",
      "Deri hastalığını tedavi eder de.",
    ],
    limitations: [
      "20 içeriğin tam resmi listesi doğrulanmalı.",
      "Köpeklerde 10 kg katları arasındaki ağırlıklar için yuvarlama kuralı doğrulanmalı.",
    ],
    checkpoints: [
      {
        question: "15 kg köpek için SkinWel kaç tablet denir?",
        answer: "Kesin sayı tahmin edilmez; ara kilo yuvarlama kuralının doğrulanması gerekir.",
      },
      {
        question: "SkinWel kullanım sıklığı nasıl kayıtlı?",
        answer: "İlk 3 gün günde 3 doz; 4. günden sonra günde 2 doz; minimum 21 gün.",
      },
    ],
  },
  {
    slug: "lactowel-tablet",
    product: "LactoWel",
    form: "Tablet",
    supportArea: "Sindirim ve mikrobiyota desteği",
    target: "Kedi + Köpek",
    status: "KISMEN ONAYLI",
    positioning: "Digestive / microbiome wellness support. Probiotic + botanical yaklaşımı kayıtlıdır; tam formül doğrulama bekler.",
    dose:
      "Kedi: 1 tablet/doz. Köpek: her 10 kg için 1 tablet/doz. Günde 2 kez, sabah-akşam. Kullanım süresi veteriner hekimin değerlendirmesine bağlıdır. Ara kilo yuvarlama kuralı doğrulanmamıştır.",
    formulation: [
      "Probiotic + botanical yaklaşımı kayıtlıdır.",
      "Tam formül ve miktarlar doğrulama beklemektedir.",
      "Doğrulanmamış spesifik içerik veya miktar söylenmez.",
    ],
    clinicPitch:
      "LactoWel sindirim ve mikrobiyota desteği için probiotic + botanical yaklaşımıyla konumlandırılır. Kedide 1 tablet/doz, köpekte her 10 kg için 1 tablet/doz ve günde iki kez kullanım kayıtlıdır; süre veteriner hekime bağlıdır.",
    doSay: [
      "Sindirim ve mikrobiyota desteği olarak konumlandır.",
      "Günde 2 kez, sabah-akşam kullanım bilgisini ver.",
      "Süreyi veteriner hekimin değerlendirmesine bağla.",
    ],
    dontSay: [
      "Ara kiloda tablet sayısını tahmin et.",
      "Tam formülü doğrulanmış gibi anlat.",
      "Gastrointestinal hastalığı tedavi eder de.",
    ],
    limitations: [
      "Köpeklerde ara kilo yuvarlama kuralı doğrulanmalı.",
      "Tam formül ve içerik miktarları doğrulanmalı.",
    ],
    checkpoints: [
      {
        question: "LactoWel kullanım sıklığı nedir?",
        answer: "Günde 2 kez, sabah-akşam.",
      },
      {
        question: "LactoWel için ara kilo köpek dozu tahmin edilir mi?",
        answer: "Hayır. Resmi yuvarlama kuralı doğrulanana kadar tahmin edilmez.",
      },
    ],
  },
  {
    slug: "breathe-ease",
    product: "Breathe Ease",
    form: "Saşe / püre",
    supportArea: "Solunum sistemi desteği",
    target: "Kedi + Köpek",
    status: "KISMEN ONAYLI",
    positioning: "Respiratory / breathing wellness support. Tedavi veya 'cough relief' benzeri güçlü iddialar kontrollü yönetilir.",
    dose:
      "Kedi: 1 tüp/gün. Köpek: 11 lb'a kadar 1 tüp; 11–22 lb için 2 tüp. 22 lb üzerindeki köpekler için resmi doz tablosu doğrulanmalıdır.",
    formulation: [
      "Kayıtlı başlıca içerikler: Propolis, Chitosan, Chlorella vulgaris, Dandelion, Magnesium Oxide ve Pear Extract.",
      "Ana konumlandırma solunum / breathing wellness desteğidir.",
      "Güçlü tedavi veya öksürük giderme claim'i kullanılmaz.",
    ],
    clinicPitch:
      "Breathe Ease kedi ve köpeklerde solunum sistemi desteği için saşe/püre formunda konumlandırılır. Kayıtlı içerik eksenlerini anlatırız; ancak ürünü tedavi veya kesin öksürük giderici olarak sunmayız.",
    doSay: [
      "Hem kedi hem köpek için konumlandırıldığını söyle.",
      "Kedide 1 tüp/gün ve 22 lb'a kadar kayıtlı köpek dozunu kullan.",
      "22 lb üzeri için resmi doz doğrulaması gerektiğini açıkça belirt.",
    ],
    dontSay: [
      "22 lb üzeri köpek dozunu orantı kurarak tahmin et.",
      "Cough relief / öksürüğü tedavi eder şeklinde kesin claim kullan.",
      "Solunum hastalığının primer tedavisi olarak sun.",
    ],
    limitations: ["22 lb üzeri köpekler için resmi doz tablosu doğrulanmalı."],
    checkpoints: [
      {
        question: "Breathe Ease hangi türler için kayıtlı?",
        answer: "Kedi ve köpek.",
      },
      {
        question: "22 lb üzeri köpek için doz nasıl verilir?",
        answer: "Tahmin edilmez; resmi doz tablosunun doğrulanması gerekir.",
      },
    ],
  },
  {
    slug: "cleanse",
    product: "Cleanse",
    form: "Steril sıvı",
    supportArea: "Üriner sistem / struvit ilişkili klinik destek",
    target: "Kedi",
    status: "KISMEN ONAYLI",
    positioning:
      "Veteriner hekim uygulamasında üriner sistem destek ürünü. Genel tüketiciye tanı veya tedavi yerine geçecek şekilde konumlandırılmaz.",
    dose:
      "Kayıtlı klinik protokol: kateter tıkanıklığa ilerletilir ve Cleanse kateterden uygulanır; opsiyonel mesane instilasyonu 5–6 cc; işlem sonrası 7 gün boyunca günde 2 kez 2 cc. Bu kayıt veteriner klinik protokolüdür.",
    formulation: [
      "Steril sıvı form.",
      "Ayrıntılı içerik/formülasyon doğrulaması tamamlanmamıştır.",
      "Ham dahili güçlü claim'ler kullanıcıya aynen aktarılmaz; kontrollü üriner/struvit destek dili kullanılır.",
    ],
    clinicPitch:
      "Cleanse mevcut kayıtlarda kedi üriner/struvit ilişkili klinik kullanım bağlamında, veteriner hekim uygulamasına yönelik destek ürünü olarak yer alıyor. Evde kullanım önerisi vermiyoruz ve ürünü tanı veya tedavinin yerine koymuyoruz.",
    doSay: [
      "Veteriner klinik protokolü içinde anlat.",
      "Üriner/struvit yönetimine yönelik kontrollü destek dilini kullan.",
      "Evde kullanım güvenliği onaylı değilse bunu açıkça belirt.",
    ],
    dontSay: [
      "Pet sahibine evde uygulama talimatı ver.",
      "Ham 'strüvit taşını eritir' claim'ini aynen kullan.",
      "Tanı veya primer tedavi yerine geçtiğini söyle.",
    ],
    limitations: [
      "Ayrıntılı içerik/formülasyon doğrulanmalı.",
      "Evde kullanım için onaylı güvenlik/talimat kaydı bulunmuyor.",
    ],
    checkpoints: [
      {
        question: "Cleanse pet sahibine evde kullanım için önerilir mi?",
        answer: "Hayır. Mevcut kayıt veteriner klinik protokolüdür; onaylanmamış ev kullanım talimatı verilmez.",
      },
      {
        question: "Ham 'strüvit taşını eritir' claim'i temsilci yanıtında aynen kullanılır mı?",
        answer: "Hayır. Kontrollü üriner/struvit destek diline dönüştürülür.",
      },
    ],
  },
];

export const verificationQueue = [
  {
    name: "LiverWel Liquid",
    status: "DOĞRULAMA GEREKİYOR" as const,
    note: "Liquid doz, içerik ve formülasyon mantığı ayrı doğrulanmalı; Tablet bilgisi taşınmaz.",
  },
  {
    name: "CalmWel Liquid",
    status: "DOĞRULAMA GEREKİYOR" as const,
    note: "Liquid doz, içerik ve onaylı konumlandırma ayrı doğrulanmalı; Tablet bilgisi taşınmaz.",
  },
  {
    name: "HeartWel",
    status: "DOĞRULAMA GEREKİYOR" as const,
    note: "Doz, içerik ve formülasyon mantığı doğrulanmalı.",
  },
  {
    name: "DentaWel",
    status: "DOĞRULAMA GEREKİYOR" as const,
    note: "Kesin form, doz ve tam içerik doğrulanmalı.",
  },
  {
    name: "Malign Detox / Malt Paste",
    status: "DOĞRULAMA GEREKİYOR" as const,
    note: "Amaç, form, doz ve içerik doğrulanmadan tam eğitim modülü açılmaz.",
  },
];

export function getTrainingModule(slug: string) {
  return trainingModules.find((module) => module.slug === slug);
}
