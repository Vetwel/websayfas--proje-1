import {
  getTrainingModule,
  trainingModules,
  verificationQueue,
  type TrainingModule,
} from "./training-content";

export const malignDetoxModule: TrainingModule = {
  slug: "malign-detox",
  product: "Malign Detox",
  form: "Tablet",
  supportArea: "Onkolojik bakım / özel beslenme desteği",
  target: "Kedi + Köpek",
  status: "KISMEN ONAYLI",
  positioning:
    "Onkolojik bakım sürecinde genel kondisyon, besinsel destek, antioksidan savunma, metabolik denge ve yaşam kalitesi eksenlerinde veteriner hekimin ana tedavi planına tamamlayıcı çok bileşenli fitokompleks. Dahili eğitimde VEDA Phytoelita Metastop ile aynı formülasyon ve kullanım mantığı referans alınır; dış iletişimde antitümör veya antimetastatik tedavi iddiası kullanılmaz.",
  dose:
    "Dahili benchmark — VEDA Phytoelita Metastop resmi kullanım talimatı: kedi 1 tablet/doz; köpek her 10 kg için 1 tablet/doz. Preoperatif referans protokolünde operasyondan 3 gün önce başlayarak günde 3 doz; postoperatif referans protokolünde yaşam boyunca her 3 ayda bir, 7 günlük kürler halinde günde 3 doz kullanımı yer alır. Bu şema Malign Detox için otomatik reçete talimatı değildir; onkolojik hastada kullanım, eş zamanlı ilaçlar ve klinik durum veteriner hekim tarafından bireyselleştirilmelidir.",
  formulation: [
    "Dahili ürün eşleştirmesi: Malign Detox formülasyon mantığı, VEDA Phytoelita Metastop ile aynı içerik ailesi üzerinden değerlendirilir. Bu bilgi ekip eğitimi içindir; dış iletişimde rakip ürünle kanıtlanmış eşdeğerlik claim'i olarak kullanılmaz.",
    "Fonksiyonel mantar ekseni: Shiitake (Lentinula edodes), Reishi (Ganoderma lucidum) ve Chaga (Inonotus obliquus). Shiitake kaynaklı lentinan/beta-glukanlar ile Reishi ve Chaga polisakkaritleri immün yanıt ve hücresel savunma mekanizmaları açısından literatürde araştırılmış bileşenlerdir.",
    "Brokoli tohumu ekseni: glukozinolat/indol türevleri ve hücresel savunma yolları açısından incelenen bitkisel bileşen grubunu temsil eder. Ürün anlatımında doğrudan antikanser sonuç garantisi verilmez.",
    "Geniş botanik fitokompleks: oregano/kekik, atkuyruğu, koyun otu, çoban çantası, ölmezçiçek, yoğurt otu, kırlangıç otu, ısırgan, huş, yakı otu, sarı kantaron, ekinezya, karakafes, tekesakalı/meadowsweet, melisa, dulavrat, kırmızı yonca, meyan, aynısafa ve çayır düğmesi/burnet.",
    "Formülasyonun eğitim eksenleri: genel kondisyon → besinsel destek → antioksidan savunma → metabolik/eliminasyon desteği → yaşam kalitesi.",
    "VEDA referansında ürün için antitümör, antimetastatik, antitoksik ve adaptogen ifadeleri kullanılır. VetWel saha dilinde bunlar doğrudan klinik sonuç claim'ine çevrilmez; içeriklerin araştırılmış biyolojik mekanizmaları ve tamamlayıcı destek yaklaşımı anlatılır.",
  ],
  clinicPitch:
    "Malign Detox, onkolojik hastada cerrahi, kemoterapi, radyoterapi veya diğer ana tedavilerin yerine değil, onların yanında genel kondisyonu, besinsel ve antioksidan desteği, metabolik dengeyi ve yaşam kalitesini desteklemek üzere konumlandırılır. Shiitake, Reishi, Chaga, brokoli tohumu ve geniş botanik fitokompleks yapısı ürünün temel formülasyon mantığıdır.",
  doSay: [
    "Onkolojik bakım planına tamamlayıcı destek olarak konumlandır.",
    "Genel kondisyon, besinsel destek, antioksidan savunma, metabolik/eliminasyon desteği ve yaşam kalitesi eksenlerini anlat.",
    "Shiitake, Reishi, Chaga ve brokoli tohumu başta olmak üzere çok bileşenli fitokompleks yapısını vurgula.",
    "VEDA Metastop referansındaki formülasyon ve perioperatif kullanım mantığını dahili bilgi olarak bil.",
    "Aktif onkolojik tedavi veya cerrahi planı varsa kullanımı tedaviyi yöneten veteriner hekimle birlikte değerlendirmek gerektiğini belirt.",
  ],
  dontSay: [
    "Kanseri tedavi eder.",
    "Metastazı durdurur, yok eder veya kesin olarak önler.",
    "Kemoterapi, cerrahi, radyoterapi, hedefe yönelik tedavi ya da immünoterapinin yerine geçer.",
    "Metastop ile aynı üründür bilgisini dış iletişimde kanıtlanmış terapötik eşdeğerlik iddiası olarak kullan.",
    "Metastop referansındaki perioperatif protokolü her hastaya otomatik reçete gibi uygula.",
  ],
  limitations: [
    "Metastop ile aynı ürün/formülasyon bilgisi dahili eğitim referansıdır; dış iletişimde terapötik eşdeğerlik claim'i değildir.",
    "Metastop kaynaklı perioperatif kullanım şeması, Malign Detox için bağımsız resmi etiket/protokol doğrulaması yapılmadan dış doz talimatına dönüştürülmez.",
    "Sarı kantaron dahil çok bileşenli botanik yapı nedeniyle eş zamanlı ilaç etkileşimleri veteriner hekim tarafından değerlendirilmelidir.",
    "Chaga böbrek hastalığında, karakafes karaciğer hastalığında ve kırmızı yonca hormona duyarlı tümörlerde ayrıca klinik değerlendirme gerektirir.",
  ],
  checkpoints: [
    {
      question: "Malign Detox sahada nasıl konumlandırılır?",
      answer:
        "Onkolojik bakımda ana tedaviye tamamlayıcı; genel kondisyon, besinsel/antioksidan destek, metabolik denge ve yaşam kalitesi eksenlerinde konumlandırılır.",
    },
    {
      question: "Metastop'un 'antimetastatik' dili VetWel dış iletişiminde aynen kullanılır mı?",
      answer:
        "Hayır. Dahili benchmark olarak formülasyon ve kullanım mantığı bilinir; dış iletişimde metastazı önleme veya tedavi sonucu garantileyen claim kullanılmaz.",
    },
    {
      question: "Metastop referansındaki doz yaklaşımı nedir?",
      answer:
        "Kedi 1 tablet/doz; köpek her 10 kg için 1 tablet/doz. Referans protokolünde operasyondan 3 gün önce TID ve sonrasında her 3 ayda bir 7 günlük TID kürler yer alır. Malign Detox hastasında kullanım veteriner hekim tarafından bireyselleştirilir.",
    },
    {
      question: "Malign Detox ana onkolojik tedavinin yerine geçer mi?",
      answer:
        "Hayır. Cerrahi, kemoterapi, radyoterapi ve diğer veteriner onkoloji tedavilerine tamamlayıcı destek olarak konumlandırılır.",
    },
  ],
};

export const internalTrainingModules: TrainingModule[] = [
  ...trainingModules,
  malignDetoxModule,
];

export const internalVerificationQueue = verificationQueue.flatMap((item) => {
  if (item.name !== "Malign Detox / Malt Paste") return [item];

  return [
    {
      ...item,
      name: "Malt Paste",
      note: "Amaç, form, doz ve içerik doğrulanmadan tam eğitim modülü açılmaz.",
    },
  ];
});

export function getInternalTrainingModule(slug: string) {
  if (slug === malignDetoxModule.slug) return malignDetoxModule;
  return getTrainingModule(slug);
}
