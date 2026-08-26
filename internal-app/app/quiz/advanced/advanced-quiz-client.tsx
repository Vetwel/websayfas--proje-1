"use client";

import { useMemo, useState } from "react";

type Question = {
  category: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

const questions: Question[] = [
  {
    category: "Renal saha görüşmesi",
    question: "Veteriner renal destek ürünü soruyor ama Tablet mi Liquid mi istediğini belirtmedi. En doğru ilk adım hangisidir?",
    options: [
      "KidneyWel Tablet dozunu söylemek.",
      "İki formun dozunu birleştirerek genel bir doz vermek.",
      "Önce hangi formun konuşulduğunu netleştirmek; Tablet ve Liquid kayıtlarını ayrı tutmak.",
      "Kilosunu tahmin edip Liquid dozunu hesaplamak.",
    ],
    correct: 2,
    explanation: "VetWel bilgi güvenliği standardında ürün + form netleşmeden doz verilmez. Tablet ve Liquid ayrı kayıtlar olarak değerlendirilir.",
  },
  {
    category: "SkinWel",
    question: "Veteriner 15 kg köpek için SkinWel dozu soruyor. Güvenilir cevap hangisidir?",
    options: [
      "2 tablet/doz; her zaman yukarı yuvarlanır.",
      "1 tablet/doz; her zaman aşağı yuvarlanır.",
      "Her 10 kg için 1 tablet/doz temeli kayıtlı; ara kilo yuvarlama kuralı doğrulanmadığı için kesin sayı tahmin edilmez.",
      "3 tablet/doz.",
    ],
    correct: 2,
    explanation: "Ara kilo yuvarlama kuralı veri tabanında doğrulanmış değil. Çalışan veya AI kendi kuralını üretemez.",
  },
  {
    category: "CalmWel",
    question: "CalmWel'i güçlü ama güvenli anlatan cümle hangisidir?",
    options: [
      "Davranış problemlerini tedavi eden güçlü bir sedatiftir.",
      "Stresli/değişken koşullarda sakinlik, davranış dengesi ve adaptasyon desteği için konumlandırılır; amaç belirgin sedasyon değildir.",
      "Tüm anksiyete vakalarında kesin sonuç verir.",
      "CalmWel Liquid ile aynı doz ve içeriktedir.",
    ],
    correct: 1,
    explanation: "Doğru saha dili destek, davranış dengesi ve adaptasyon eksenindedir; sedasyon veya tedavi iddiası kullanılmaz.",
  },
  {
    category: "Breathe Ease",
    question: "30 lb köpek için Breathe Ease dozu soruldu. Ne yapmalısın?",
    options: [
      "22 lb üzeri için dozu lineer olarak artırmalısın.",
      "Kedi dozunu kullanmalısın.",
      "22 lb üzeri resmi doz tablosunun doğrulanmadığını söylemeli ve tahmin etmemelisin.",
      "3 tüp kesin önermelisin.",
    ],
    correct: 2,
    explanation: "Mevcut kayıt 22 lb üzerine ilişkin resmi doz tablosunu tamamlamıyor. Matematiksel tahmin yapılmaz.",
  },
  {
    category: "Cleanse",
    question: "Bir pet sahibi Cleanse'i evde nasıl uygulayacağını soruyor. En doğru yaklaşım hangisidir?",
    options: [
      "Klinik dozu azaltıp evde kullanım tarif etmek.",
      "Mevcut kaydın Cleanse'i veteriner klinik protokolü içinde tanımladığını ve onaylı ev kullanımı bulunmadığını belirtmek.",
      "İnternetten benzer bir uygulama bulmak.",
      "Ürünün güçlü claim'ini aynen söylemek.",
    ],
    correct: 1,
    explanation: "Cleanse mevcut kayıtta veteriner klinik protokolü içinde değerlendirilir. Evde uygulama talimatı uydurulmaz.",
  },
  {
    category: "Marka konumlandırma",
    question: "Veteriner 'VetWel'i diğer supplementlerden ayıran nedir?' diye soruyor. En iyi cevap yaklaşımı hangisidir?",
    options: [
      "Rakiplerden kesin olarak daha iyi olduğunu söylemek.",
      "Her ürünü hastalık tedavisi üzerinden anlatmak.",
      "Hedeflenen sağlık alanı, ürün/form ayrımı, doğrulanmış kullanım bilgisi ve kontrollü iletişim standardını vurgulamak.",
      "Sadece içerik sayısını söylemek.",
    ],
    correct: 2,
    explanation: "VetWel'in güvenilir saha yaklaşımı; hedeflenen destek alanı, form ayrımı, doğrulanmış bilgi ve iddia sınırlarını birlikte korumaktır.",
  },
  {
    category: "LactoWel",
    question: "LactoWel için hangisini güvenle söyleyebilirsin?",
    options: [
      "Tam formül ve tüm miktarlar doğrulanmıştır.",
      "Kedide 1 tablet/doz; köpekte her 10 kg için 1 tablet/doz, günde iki kez; ara kilo yuvarlama kuralı ayrıca doğrulanmalıdır.",
      "Her köpeğe aynı doz verilir.",
      "Sindirim hastalıklarını tedavi eder.",
    ],
    correct: 1,
    explanation: "Kullanım temeli kayıtlıdır fakat ara kilo kuralı ve tam formül hâlâ doğrulama sınırındadır.",
  },
  {
    category: "Saha iletişim standardı",
    question: "Bir ürün için bilgi tabanında 'DOĞRULAMA GEREKİYOR' yazıyorsa en profesyonel davranış hangisidir?",
    options: [
      "Benzer üründen bilgi kopyalamak.",
      "Muhtemel cevabı söyleyip sonra kontrol etmek.",
      "Eksik bilgiyi açıkça belirtmek, tahmin yapmamak ve doğrulanmış bilgiye kadar sınırı korumak.",
      "Soruyu değiştirmek.",
    ],
    correct: 2,
    explanation: "VetWel sisteminde veri boşluğunu gizlemek yerine görünür kılmak güvenilirliğin bir parçasıdır.",
  },
];

export default function AdvancedQuizClient() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(
    () => questions.reduce((total, question, index) => total + (answers[index] === question.correct ? 1 : 0), 0),
    [answers],
  );

  const completed = Object.keys(answers).length === questions.length;
  const percent = Math.round((score / questions.length) * 100);

  function reset() {
    setAnswers({});
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="quiz-shell">
      <div className="quiz-progress">
        <div>
          <strong>{Object.keys(answers).length}/{questions.length} yanıtlandı</strong>
          <span>Seviye 2 geçme hedefi: %80</span>
        </div>
        <div className="quiz-progress-track">
          <span style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }} />
        </div>
      </div>

      <div className="quiz-list">
        {questions.map((question, index) => {
          const selected = answers[index];
          const isCorrect = selected === question.correct;

          return (
            <article className="quiz-question" key={question.question}>
              <div className="quiz-question-head">
                <span className="quiz-number">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <span className="eyebrow">{question.category}</span>
                  <h2>{question.question}</h2>
                </div>
              </div>

              <div className="quiz-options">
                {question.options.map((option, optionIndex) => {
                  const checked = selected === optionIndex;
                  const revealCorrect = submitted && optionIndex === question.correct;
                  const revealWrong = submitted && checked && optionIndex !== question.correct;
                  const className = [
                    "quiz-option",
                    checked ? "quiz-option-selected" : "",
                    revealCorrect ? "quiz-option-correct" : "",
                    revealWrong ? "quiz-option-wrong" : "",
                  ].filter(Boolean).join(" ");

                  return (
                    <label className={className} key={option}>
                      <input
                        checked={checked}
                        disabled={submitted}
                        name={`advanced-question-${index}`}
                        onChange={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))}
                        type="radio"
                      />
                      <span>{option}</span>
                    </label>
                  );
                })}
              </div>

              {submitted ? (
                <div className={`quiz-explanation ${isCorrect ? "quiz-explanation-good" : "quiz-explanation-bad"}`}>
                  <strong>{isCorrect ? "Doğru" : "Düzelt"}</strong>
                  <p>{question.explanation}</p>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>

      {!submitted ? (
        <button className="primary-button" disabled={!completed} onClick={() => setSubmitted(true)} type="button">
          Seviye 2 sınavını değerlendir
        </button>
      ) : (
        <section className="quiz-result">
          <span className="eyebrow">Saha yetkinliği • Seviye 2</span>
          <h2>%{percent}</h2>
          <p>
            {percent >= 80
              ? "Saha senaryolarında güvenli ürün dili, form ayrımı ve doğrulama sınırlarını yeterli düzeyde uyguladın."
              : "Gerçek saha senaryolarında tekrar eğitim önerilir. Yanlış yaptığın soruların ilgili ürün eğitimlerine dön."}
          </p>
          <div className="quiz-result-meta">
            <strong>{score}/{questions.length} doğru</strong>
            <span>{percent >= 80 ? "Seviye 2 geçti" : "Tekrar eğitim"}</span>
          </div>
          <button className="secondary-button" onClick={reset} type="button">Sınavı yeniden başlat</button>
        </section>
      )}
    </div>
  );
}
