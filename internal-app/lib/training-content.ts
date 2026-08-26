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
  checkpoints: { question: string; answer: string }[];
};

export const verifiedTrainingModules: TrainingModule[] = [
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
    name: "SkinWel",
    status: "KISMEN ONAYLI" as const,
    note: "Doz temeli kayıtlı; 20 içeriğin tam listesi ve ara kilo yuvarlama kuralı doğrulanmalı.",
  },
  {
    name: "LactoWel",
    status: "KISMEN ONAYLI" as const,
    note: "Kedi ve 10 kg başına köpek dozu kayıtlı; ara kilo yuvarlama kuralı ve tam formül doğrulanmalı.",
  },
  {
    name: "Breathe Ease",
    status: "KISMEN ONAYLI" as const,
    note: "Kedi + köpek konumlandırması kayıtlı; yüksek köpek ağırlıkları için resmi doz tablosu tamamlanmalı.",
  },
  {
    name: "Cleanse",
    status: "KISMEN ONAYLI" as const,
    note: "Veteriner klinik protokolü içinde değerlendirilir; evde kullanım talimatı verilmez.",
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
];

export function getTrainingModule(slug: string) {
  return verifiedTrainingModules.find((module) => module.slug === slug);
}
