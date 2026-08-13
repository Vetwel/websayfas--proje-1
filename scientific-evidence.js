// Shared scientific evidence layer for VetWel Turkish product information pages.
(() => {
  const ref = (label, title, url) => ({ label, title, url });

  const kidney = {
    lead: "Böbrek sağlığında beslenme, fosfor dengesi, proteinüri, kan basıncı ve hastalığın evresine göre bireyselleştirilmiş veteriner yaklaşımı birlikte değerlendirilir. KidneyWel® bu çerçevede tamamlayıcı besinsel/botanik destek olarak konumlandırılır.",
    cards: [
      ["KONSENSÜS / REHBER", "IRIS yaklaşımı", "IRIS, kronik böbrek hastalığında evreleme ve tedavinin hastaya göre düzenlenmesini; renal beslenme, fosfor kontrolü, proteinüri ve kan basıncının klinik gereksinime göre yönetilmesini temel yaklaşım olarak ele alır."],
      ["KONTROLLÜ KÖPEK ÇALIŞMASI", "Renal diyetin klinik önemi", "Kronik böbrek hastalığı olan köpeklerde randomize kontrollü bir çalışmada renal diyet, standart yetişkin diyetine kıyasla üremik kriz ve mortalite açısından avantaj göstermiştir."],
      ["KLİNİK VERİ", "Fosfor ve beslenme", "Köpeklerde CKD çalışmalarında serum fosforu, vücut/muscle kondisyonu ve beslenme biçimi prognozla ilişkili bulunmuştur. Bu nedenle takviye yaklaşımı renal diyet ve veteriner takibinin yerine geçmez."],
      ["TAKVİYE LİTERATÜRÜ", "Formüle özgü kanıt gerekir", "Bazı renal destek kombinasyonları kontrollü çalışmalarda değerlendirilmiştir; sonuçlar kullanılan ürün, doz ve içerik kombinasyonuna özgüdür ve doğrudan KidneyWel® klinik etkinliği olarak yorumlanamaz."]
    ],
    limit: "KidneyWel®'in tamamını CKD'li kedi veya köpeklerde değerlendiren yayımlanmış kontrollü klinik çalışma burada sunulmamaktadır. Ürün renal diyet, fosfor bağlayıcı gerektiğinde, proteinüri/hipertansiyon tedavileri, sıvı desteği veya diğer veteriner uygulamalarının yerine geçmez. KidneyWel® için kullanılan ifade 'fosfor bağlayıcı' değil, formülasyon yaklaşımı kapsamında intestinal fosfor emiliminin azaltılmasına yönelik destektir.",
    refs: [
      ref("1. IRIS", "IRIS CKD Guidelines and Treatment Recommendations", "https://www.iris-kidney.com/iris-guidelines-1"),
      ref("2. Jacob F, et al.", "Clinical evaluation of dietary modification for treatment of spontaneous chronic renal failure in dogs.", "https://pubmed.ncbi.nlm.nih.gov/11990962/"),
      ref("3. Pedrinelli V, et al.", "Nutritional and laboratory parameters affect the survival of dogs with chronic kidney disease.", "https://pubmed.ncbi.nlm.nih.gov/32603378/"),
      ref("4. Zatelli A, et al.", "Effect of dietary supplements in reducing probability of death for uremic crises in dogs affected by chronic kidney disease.", "https://pubmed.ncbi.nlm.nih.gov/22593665/")
    ]
  };

  const liver = {
    lead: "Karaciğer hastalıklarında tanı, nedenin belirlenmesi, laboratuvar ve görüntüleme bulgularının yorumlanması ile gerektiğinde histopatoloji temel klinik çerçeveyi oluşturur. LiverWel® bu süreçlerin yerine değil, tamamlayıcı hepatik beslenme/botanik desteği olarak değerlendirilir.",
    cards: [
      ["VETERİNER ÇERÇEVESİ", "Tanı önce gelir", "Hepatik enzim yüksekliği tek başına spesifik bir tanı değildir. Klinik bulgular, laboratuvar, görüntüleme ve gerektiğinde ileri tanısal testler birlikte değerlendirilir."],
      ["NUTRASÖTİK LİTERATÜRÜ", "Kanıt düzeyi değişkendir", "Veteriner hepatoloji literatüründe silymarin/silybin ve diğer nutrösötikler incelenmiştir; ancak kanıtın gücü içerik, preparat ve hastalık tipine göre değişir."],
      ["KÖPEK ÇALIŞMASI", "Silybin içeren destek", "Köpeklerde silybin içeren ticari hepatoprotektif bir ürünle yapılan çalışma bazı karaciğer belirteçlerinde değişiklik göstermiştir. Sonuçlar o çalışmadaki spesifik ürüne aittir."],
      ["KANIT SINIRI", "Bütün formül eşit değildir", "Tek bir bileşen veya başka bir ticari ürünle elde edilen sonuçlar LiverWel® formülünün tamamı için klinik etkinlik kanıtı sayılmaz."]
    ],
    limit: "LiverWel® tanı koymaz ve hepatit, kolestaz, hepatik lipidozis, toksisite veya diğer karaciğer hastalıklarının gerekli veteriner tedavisinin yerine geçmez. Kaynaklar formülasyon mantığını destekleyen genel ve bileşen-temelli bilimsel çerçeveyi gösterir.",
    refs: [
      ref("1. Center SA.", "Nutraceuticals for canine liver disease: assessing the evidence.", "https://doi.org/10.1016/j.cvsm.2013.05.003"),
      ref("2. BMC Veterinary Research", "Clinical evaluation of a silybin-containing hepatoprotective supplement in dogs.", "https://doi.org/10.1186/s12917-021-02929-3"),
      ref("3. WSAVA", "Global veterinary guidance and resources.", "https://wsava.org/global-guidelines/")
    ]
  };

  const calm = {
    lead: "Davranış ve stres yönetiminde çevresel düzenleme, davranışsal değerlendirme, öğrenme ilkeleri ve gerektiğinde veteriner hekim tarafından seçilen farmakolojik yaklaşım birlikte ele alınır. CalmWel® tamamlayıcı bir destek olarak konumlandırılır.",
    cards: [
      ["DAVRANIŞ REHBERİ", "Bütüncül değerlendirme", "Davranış sorunlarında tıbbi nedenlerin dışlanması, tetikleyicilerin belirlenmesi ve bireye özgü davranış planı temel yaklaşımın parçasıdır."],
      ["KONTROLLÜ ÇALIŞMA", "Nutrösötik veri mevcut", "Köpeklerde belirli bir nutrösötik formülün randomize kontrollü çalışmasında bazı davranış ölçütlerinde iyileşme bildirilmiştir; bu sonuç CalmWel®'in kendisine ait değildir."],
      ["FORMÜLE ÖZGÜLÜK", "İçerik ve doz önemlidir", "Davranış destek ürünlerinde bir formülün sonucu başka bir formüle otomatik olarak aktarılamaz. Etki değerlendirmesi kullanılan içerik, doz ve hedef davranışa bağlıdır."],
      ["KLİNİK SINIR", "Şiddetli belirtiler", "Panik, kendine zarar verme, saldırganlık, ani davranış değişikliği veya yaşam kalitesini belirgin etkileyen durumlar veteriner davranış değerlendirmesi gerektirir."]
    ],
    limit: "CalmWel® anksiyete bozukluğu tanısı veya tedavisi yerine geçmez. Buradaki yayınlar davranış yönetimi ve nutrösötik yaklaşımın bilimsel çerçevesini gösterir; CalmWel® formülünün tamamına ait kontrollü klinik etkinlik çalışması olarak sunulmaz.",
    refs: [
      ref("1. AAHA", "Canine and Feline Behavior Management Guidelines.", "https://www.aaha.org/for-veterinary-professionals/aaha-guidelines/"),
      ref("2. Pirrone F, et al.", "Effects of a Nutritional Supplement (DìRelax) on Anxiety in Dogs in a Randomized Control Trial Design.", "https://pubmed.ncbi.nlm.nih.gov/35203143/")
    ]
  };

  const skin = {
    lead: "Dermatolojik problemlerde deri bariyeri, altta yatan alerjik/paraziter/enfeksiyöz nedenler ve bireysel klinik tablo birlikte değerlendirilir. SkinWel® cilt ve tüy yapısının besinsel/botanik desteklenmesine yönelik tamamlayıcı bir üründür.",
    cards: [
      ["DERMATOLOJİ REHBERİ", "Multimodal yaklaşım", "Köpek atopik dermatiti gibi kronik dermatolojik tabloların yönetimi tek bir ürün veya tek mekanizmaya dayanmaz; tetikleyici kontrolü, enfeksiyon yönetimi, topikal ve sistemik seçenekler hastaya göre birleştirilebilir."],
      ["DERİ BARİYERİ", "Bariyer desteği", "Epidermal bariyer bütünlüğü dermatolojik konforun önemli parçalarındandır. Besinsel destek yaklaşımı klinik tanı ve hedefe yönelik tedavilerin yanında değerlendirilir."],
      ["BİLEŞEN KANITI", "Formüle genellenemez", "Yağ asitleri, antioksidanlar veya botanikler üzerine yayımlanmış veriler, kullanılan spesifik preparat ve doza bağlıdır; SkinWel®'in tamamı için doğrudan klinik kanıt değildir."],
      ["KLİNİK SINIR", "Kaşıntının nedeni araştırılmalı", "Şiddetli kaşıntı, alopesi, püstül, kötü koku, otitis veya tekrarlayan deri lezyonlarında veteriner dermatolojik değerlendirme gerekir."]
    ],
    limit: "SkinWel® atopik dermatit, bakteriyel/mayasal enfeksiyon, paraziter hastalık veya diğer dermatolojik tanıların tedavisi yerine geçmez. Bilimsel kaynaklar multimodal dermatoloji yaklaşımını ve besinsel desteğin yerini açıklar.",
    refs: [
      ref("1. Olivry T, et al.", "Treatment of canine atopic dermatitis: 2015 updated guidelines from the International Committee on Allergic Diseases of Animals.", "https://doi.org/10.1186/s12917-015-0514-6")
    ]
  };

  const heart = {
    lead: "Kalp hastalıklarında tanı ve evreleme; fizik muayene, görüntüleme ve hastalığa özgü tedavi planıyla yürütülür. HeartWel® kardiyovasküler besinsel/botanik destek olarak bu klinik yaklaşımın yanında değerlendirilir.",
    cards: [
      ["ACVIM KONSENSÜSÜ", "Evreye göre tedavi", "Köpeklerde miksomatöz mitral kapak hastalığı için ACVIM konsensüsü tanı, evreleme ve medikal/diyetetik tedaviyi kanıt düzeyine göre ele alır."],
      ["BESLENME", "Destekleyici rol", "Kardiyak hastalarda beslenme planı hastalığın evresi, vücut kondisyonu, iştah ve eşlik eden hastalıklara göre bireyselleştirilmelidir."],
      ["BOTANİK / NUTRASÖTİK", "Kanıt ürüne özgüdür", "Tek tek kardiyovasküler nutrösötikler veya botanikler üzerine çalışmalar, HeartWel® formülünün tamamının klinik etkinliğini kanıtlamaz."],
      ["ACİL BELİRTİLER", "Gecikmeden değerlendirme", "İstirahatte solunum güçlüğü, senkop, belirgin egzersiz intoleransı veya akut kötüleşme veteriner değerlendirmesi gerektirir."]
    ],
    limit: "HeartWel® kalp hastalığı tanısı koymaz; pimobendan, diüretik, RAAS modülasyonu veya veteriner hekimin gerekli gördüğü diğer kardiyak tedavilerin yerine geçmez.",
    refs: [
      ref("1. Keene BW, et al.", "ACVIM consensus guidelines for the diagnosis and treatment of myxomatous mitral valve disease in dogs.", "https://pubmed.ncbi.nlm.nih.gov/30974015/")
    ]
  };

  const dental = {
    lead: "Periodontal hastalıkta temel hedef dental plağın düzenli uzaklaştırılması ve gerektiğinde profesyonel periodontal tedavidir. DentaWel® ağız hijyeni ve mukozal bakımın tamamlayıcı desteği olarak değerlendirilir.",
    cards: [
      ["SİSTEMATİK DERLEME", "Evde ağız bakımı", "Köpeklerde periodontal hastalık için farklı ev bakım ürünleri incelenmiştir; aktif ajan ve uygulama biçimine göre değişen faydalar bildirilmiştir."],
      ["MEKANİK PLAK KONTROLÜ", "Diş fırçalama temel yöntem", "Veteriner dental literatüründe günlük diş fırçalama plak kontrolünün temel ev bakım yöntemi olarak kabul edilir."],
      ["TAMAMLAYICI ÜRÜNLER", "Ek destek", "Dental çiğneme, jel, solüsyon veya benzeri ürünler mekanik bakımın yanında yardımcı olabilir; etkinlik ürün ve kullanım sıklığına göre değişir."],
      ["KLİNİK SINIR", "Profesyonel bakım", "İleri tartar, gingival kanama, periodontal cep, mobil diş veya ağız ağrısı profesyonel dental değerlendirme gerektirir."]
    ],
    limit: "DentaWel® profesyonel diş taşı temizliği, periodontal tedavi veya düzenli mekanik plak kontrolünün yerine geçmez. Ürün, veteriner dental bakım planının tamamlayıcı parçası olarak değerlendirilmelidir.",
    refs: [
      ref("1. Barbosa E, et al.", "Strategies to improve the home care of periodontal disease in dogs: A systematic review.", "https://pubmed.ncbi.nlm.nih.gov/36375270/"),
      ref("2. Gorrel C, Rawlings JM.", "The role of tooth-brushing and diet in the maintenance of periodontal health in dogs.", "https://pubmed.ncbi.nlm.nih.gov/9520789/"),
      ref("3. Enlund KB, et al.", "Adherence to dental home care in dogs with periodontitis.", "https://pubmed.ncbi.nlm.nih.gov/38115050/")
    ]
  };

  const breathe = {
    lead: "Öksürük ve solunum bulguları çok farklı nedenlerden kaynaklanabilir. Breathe Ease® solunum konforunun besinsel desteği olarak konumlandırılır; tanısal değerlendirme ve gerekli veteriner tedavisinin yerine geçmez.",
    cards: [
      ["VETERİNER SOLUNUM LİTERATÜRÜ", "Öksürüğün nedeni araştırılmalı", "Kronik bronşit gibi tabloların değerlendirilmesinde fizik muayene, görüntüleme ve gerektiğinde hava yolu örneklemesi gibi yöntemler kullanılabilir."],
      ["TEDAVİ ÇERÇEVESİ", "Hedef neden ve inflamasyon", "Kronik bronşitte irritan maruziyetinin azaltılması, hava yolu inflamasyonunun ve öksürüğün kontrolü temel tedavi eksenlerindendir."],
      ["ANTİMİKROBİYAL YÖNETİM", "Enfeksiyon varsa hedefe yönelik", "Solunum yolu antibiyotik kullanımı bakteriyel hastalık şüphesi ve uygun klinik değerlendirmeye dayanmalıdır; destek ürünleri antimikrobiyal tedavinin alternatifi değildir."],
      ["ACİL BELİRTİLER", "Dispne acildir", "Açık ağız solunumu, siyanoz, belirgin solunum eforu veya hızlı kötüleşme acil veteriner değerlendirmesi gerektirir."]
    ],
    limit: "Breathe Ease® öksürüğün nedenini tedavi ettiği, enfeksiyonu ortadan kaldırdığı veya bronkodilatör/antiinflamatuvar tedavinin yerini aldığı şeklinde değerlendirilmemelidir.",
    refs: [
      ref("1. Rozanski EA.", "Canine Chronic Bronchitis: An Update.", "https://pubmed.ncbi.nlm.nih.gov/31812219/"),
      ref("2. ISCAID", "Antimicrobial use guidelines for respiratory tract disease in dogs and cats.", "https://doi.org/10.1111/jvim.14627")
    ]
  };

  const cleanse = {
    lead: "Feline üretral obstrüksiyon yaşamı tehdit edebilen bir acildir. Standart yaklaşım obstrüksiyonun giderilmesi, uygun kateterizasyon, analjezi, sıvı/elektrolit yönetimi ve nedene yönelik veteriner takibidir. Cleanse® yalnızca veteriner hekim tarafından belirlenen tamamlayıcı protokol bağlamında ele alınmalıdır.",
    cards: [
      ["RANDOMİZE ÇALIŞMA", "Mesane lavajı ve tekrar tıkanma", "137 erkek kedide yapılan randomize kontrollü çalışmada, kateterizasyon sonrası salin mesane lavajı hastane içi tekrar obstrüksiyon oranını veya kateter/hastanede kalış süresini anlamlı biçimde azaltmamıştır."],
      ["RANDOMİZE ÇALIŞMA", "İntermittan flushing", "72 kedilik randomize çalışmada aralıklı salin mesane yıkaması güvenli görünmüş ancak 7 ve 30 günlük tekrar obstrüksiyon oranını azaltmamıştır."],
      ["İNTRAVEZİKAL YAKLAŞIM", "Formül içeriği önemlidir", "İntravezikal uygulamalarda sonuçlar kullanılan ajan, konsantrasyon, asepsi ve klinik protokole özgüdür; bir ajanla elde edilen sonuç başka bir ürüne genellenemez."],
      ["GÜVENLİK", "Yalnızca veteriner uygulaması", "Kateter veya intravezikal uygulama; travma, enfeksiyon ve diğer komplikasyon riskleri nedeniyle veteriner hekim kontrolünde ve aseptik koşullarda yürütülmelidir."]
    ],
    limit: "Cleanse® üretral obstrüksiyonun standart tedavisinin yerine geçmez ve 'obstrüksiyonu çözen' bağımsız bir tedavi olarak sunulmaz. Ürünün tamamıyla yapılmış yayımlanmış kontrollü klinik çalışma burada sunulmamaktadır; mevcut mesane yıkama literatürü de rutin flushing'in tekrar tıkanmayı azalttığını göstermemektedir.",
    refs: [
      ref("1. Dorsey TI, et al.", "Effect of urinary bladder lavage on in-hospital recurrence of urethral obstruction in male cats.", "https://pubmed.ncbi.nlm.nih.gov/30714866/"),
      ref("2. Tsuruta K, et al.", "Effect of intermittent bladder flushing on recurrence rate in feline urethral obstruction: 72 cases.", "https://pubmed.ncbi.nlm.nih.gov/36467381/"),
      ref("3. Zezza L, et al.", "Intravesical application of lidocaine and sodium bicarbonate in obstructive idiopathic lower urinary tract disease in cats.", "https://pubmed.ncbi.nlm.nih.gov/22435459/")
    ]
  };

  const malign = {
    lead: "Onkoloji hastalarında tanı, tümör tipi, evreleme, tedavi hedefi, ağrı kontrolü ve beslenme durumu birlikte değerlendirilir. Malign Detox® yalnızca tamamlayıcı besinsel/botanik destek olarak ele alınmalı; antikanser tedavi iddiasıyla kullanılmamalıdır.",
    cards: [
      ["2026 AAHA ONKOLOJİ", "Tanı ve evreleme esastır", "AAHA'nın 2026 onkoloji rehberi, uygun tedavi planı için tümör tipinin doğrulanması ve gerektiğinde evre/grade belirlenmesini temel yaklaşım olarak vurgular."],
      ["BESLENME DERLEMESİ", "Onkolojide beslenme önemlidir", "Kedi ve köpek onkolojisinde beslenme; vücut kondisyonu, iştah, kaşeksi ve tedavi toleransı açısından önem taşır, ancak birçok takviye için klinik kanıt sınırlı veya formüle özgüdür."],
      ["KONTROLLÜ ÖRNEK", "Sonuç spesifik formüle aittir", "Lenfomalı köpeklerde balık yağı ve arjinin içeren belirli bir diyet kemoterapiyle birlikte kontrollü olarak çalışılmıştır. Bu sonuç farklı içerikteki bir ürüne veya 'detoks' iddiasına genellenemez."],
      ["ETKİLEŞİM GÜVENLİĞİ", "Onkologla paylaşılmalı", "Botanikler ve antioksidan takviyeler kemoterapi veya diğer ilaçlarla etkileşebileceğinden kullanılan tüm takviyeler veteriner hekim/onkologla paylaşılmalıdır."]
    ],
    limit: "Malign Detox® kanseri önlediği, tümörü küçülttüğü, kemoterapinin yerini aldığı veya vücudu/tümörü 'detoksifiye ettiği' şeklinde sunulmaz. Ürün, yalnızca veteriner onkoloji planı içinde tamamlayıcı destek olarak değerlendirilmelidir.",
    refs: [
      ref("1. AAHA", "2026 AAHA Oncology Guidelines for Dogs and Cats.", "https://www.aaha.org/resources/2026-aaha-oncology-guidelines-for-dogs-and-cats/"),
      ref("2. Amaral AR, et al.", "Connection between nutrition and oncology in dogs and cats: perspectives, evidence, and implications.", "https://pubmed.ncbi.nlm.nih.gov/40046187/"),
      ref("3. Ogilvie GK, et al.", "Effect of fish oil, arginine, and doxorubicin chemotherapy on remission and survival time for dogs with lymphoma.", "https://pubmed.ncbi.nlm.nih.gov/10760770/")
    ]
  };

  const malt = {
    lead: "Tüy yumağı yönetiminde gastrointestinal motilite, lif tipi, tüy yutma miktarı ve altta yatan dermatolojik/gastrointestinal nedenler birlikte düşünülür. Malt Paste® tamamlayıcı beslenme desteği olarak değerlendirilir.",
    cards: [
      ["KEDİ BESLENME ÇALIŞMASI", "Lif tipi sonuçları değiştirebilir", "Kedilerde belirli uzun çözünmeyen lif kaynaklarının tüy yumağıyla ilişkili ölçütleri etkileyebildiğini gösteren çalışmalar vardır."],
      ["NEGATİF SONUÇ DA VAR", "Her lif aynı değildir", "Başka bir kontrollü çalışmada beet pulp içeren diyet tüy yumağı sayısı veya büyüklüğünde beklenen azalmayı göstermemiştir. Bu, etkinliğin lif kaynağı ve formüle özgü olduğunu gösterir."],
      ["KLİNİK DEĞERLENDİRME", "Tekrarlayan kusma normal değildir", "Sık kusma, iştahsızlık, kilo kaybı, konstipasyon veya obstrüksiyon şüphesi yalnızca 'hairball' kabul edilmemeli ve veteriner hekim tarafından değerlendirilmelidir."],
      ["TAMAMLAYICI YAKLAŞIM", "Bakımın bir parçası", "Tüy bakımı, deri hastalıklarının kontrolü, yeterli sıvı alımı ve uygun diyet tüy yumağı yönetiminin diğer parçalarıdır."]
    ],
    limit: "Malt Paste® gastrointestinal obstrüksiyon veya tekrarlayan kusmanın tedavisi değildir. Bilimsel veriler farklı lif/formülasyonların farklı sonuçlar verebildiğini gösterir; bu nedenle başka ürünlerdeki bulgular Malt Paste®'e doğrudan aktarılmaz.",
    refs: [
      ref("1. Loureiro BA, et al.", "Sugarcane fibre may prevent hairball formation in cats.", "https://doi.org/10.1017/jns.2014.27"),
      ref("2. Weber M, et al.", "Effect of dietary beet pulp on hairball-related outcomes in cats.", "https://doi.org/10.1111/jpn.12745")
    ]
  };

  const evidenceByPage = {
    "education-kidneywel.html": kidney,
    "education-kidneywel-liquid.html": kidney,
    "education-liverwel-tablet.html": liver,
    "education-liverwel-liquid.html": liver,
    "education-calmwel-tablet.html": calm,
    "education-calmwel-liquid.html": calm,
    "education-skinwel.html": skin,
    "education-heartwel.html": heart,
    "education-dentawel.html": dental,
    "education-breathe-ease.html": breathe,
    "education-cleanse.html": cleanse,
    "education-malign-detox.html": malign,
    "education-malt-paste.html": malt
  };

  const init = () => {
    if (document.documentElement.lang !== "tr" || document.getElementById("bilimsel-dayanak")) return;
    const page = location.pathname.split("/").pop() || "";
    const evidence = evidenceByPage[page];
    if (!evidence) return;
    const container = document.querySelector(".product-container");
    if (!container) return;

    if (!document.getElementById("vetwel-scientific-evidence-styles")) {
      const style = document.createElement("style");
      style.id = "vetwel-scientific-evidence-styles";
      style.textContent = `
        .vetwel-evidence-section{margin-top:28px;background:#fff;border:1px solid #dce6f0;border-radius:20px;padding:30px;box-shadow:0 8px 30px rgba(0,0,0,.045)}
        .vetwel-evidence-section h2{margin:0 0 12px;color:#173f6b}.vetwel-evidence-lead{color:#596775;line-height:1.75;margin:0}
        .vetwel-evidence-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:15px;margin-top:22px}
        .vetwel-evidence-card{border:1px solid #dfe8e1;background:#f7faf7;border-radius:15px;padding:19px}.vetwel-evidence-card h3{margin:0 0 9px;color:#315f42;font-size:16px}.vetwel-evidence-card p{margin:0;color:#596775;line-height:1.65;font-size:14px}
        .vetwel-evidence-level{display:inline-block;margin-bottom:10px;padding:5px 9px;border-radius:999px;background:#e7f1e9;color:#356744;font-size:10px;font-weight:800;letter-spacing:.4px}
        .vetwel-evidence-limit{margin-top:20px;background:#fff8eb;border-left:5px solid #c99a42;border-radius:13px;padding:17px 19px;color:#65583c;line-height:1.7}
        .vetwel-reference-list{margin:22px 0 0;padding:0;list-style:none;display:grid;gap:11px}.vetwel-reference-list li{border-top:1px solid #e7edf2;padding-top:11px;color:#596775;line-height:1.55;font-size:13px}.vetwel-reference-list a{color:#1d5e92;font-weight:700;text-decoration:none}.vetwel-reference-list a:hover{text-decoration:underline}.vetwel-reference-label{font-weight:800;color:#173f6b}.vetwel-evidence-method{margin-top:18px;font-size:12px;color:#718093;line-height:1.65}
        @media(max-width:760px){.vetwel-evidence-section{padding:24px 22px}}
      `;
      document.head.appendChild(style);
    }

    const productName = document.querySelector(".product-hero h1")?.textContent.trim() || "Bu ürün";
    const section = document.createElement("section");
    section.className = "vetwel-evidence-section";
    section.id = "bilimsel-dayanak";
    section.innerHTML = `
      <h2>Bilimsel Dayanak</h2>
      <p class="vetwel-evidence-lead">${evidence.lead}</p>
      <div class="vetwel-evidence-grid">${evidence.cards.map(([level,title,text]) => `<article class="vetwel-evidence-card"><span class="vetwel-evidence-level">${level}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div>
      <div class="vetwel-evidence-limit"><strong>Kanıtın sınırı:</strong> ${evidence.limit}</div>
      <ul class="vetwel-reference-list">${evidence.refs.map((r) => `<li><span class="vetwel-reference-label">${r.label}</span> ${r.title} <a href="${r.url}" target="_blank" rel="noopener noreferrer">Kaynağı Gör</a></li>`).join("")}</ul>
      <p class="vetwel-evidence-method"><strong>Kaynak yaklaşımı:</strong> Kaynaklar ${productName} için doğrudan tedavi iddiası üretmek amacıyla değil; ürünün hedeflediği fizyolojik alanı, veteriner standart bakımını ve ilgili besinsel/nutrasötik yaklaşımın bilimsel çerçevesini göstermek için seçilmiştir. Başka bir ürün, içerik veya formülle elde edilen sonuçlar VetWel® ürününe ait klinik etkinlik kanıtı olarak sunulmaz.</p>`;

    const anchor = container.querySelector(".clinical-note, .usage-box, .product-note, .product-exit-nav");
    if (anchor) container.insertBefore(section, anchor); else container.appendChild(section);
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
