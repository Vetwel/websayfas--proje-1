"use client";

import { useMemo, useState } from "react";

type Question = {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  category: string;
};

const questions: Question[] = [
  {
    category: "KidneyWel Tablet",
    question: "KidneyWel Tablet için aşağıdaki ifadelerden hangisi doğrudur?",
    options: [
      "Güçlü bir fosfor bağlayıcıdır.",
      "Fosfor emilimini azaltmaya yönelik destek yaklaşımı ve antioksidan destek ile konumlandırılır.",
      "Primer renal tedavinin yerine geçer.",
      "Liquid form ile aynı dozda kullanılır.",
    ],
    correct: 1,
    explanation: "KidneyWel Tablet fosfor bağlayıcı olarak konumlandırılmaz. Doğru dil, fosfor emilimini azaltmaya yönelik destek yaklaşımı ve antioksidan destektir.",
  },
  {
    category: "KidneyWel Tablet",
    question: "KidneyWel Tablet başlangıç kullanım sıklığı hangisidir?",
    options: [
      "İlk 3 gün günde 3 doz, sonra günde 2 doz; minimum 21 gün.",
      "İlk 7 gün günde 1 doz, sonra kesilir.",
      "Her zaman günde 1 doz.",
      "Sadece gerektiğinde kullanılır.",
    ],
    correct: 0,
    explanation: "Doğrulanmış kayıt: ilk 3 gün TID, sonrasında BID ve minimum 21 gün.",
  },
  {
    category: "KidneyWel Liquid",
    question: "KidneyWel Liquid doğrulanmış doz bilgisi hangisidir?",
    options: [
      "0,5 mL/kg/doz, günde 2 kez.",
      "1 mL/kg, günde 1 kez.",
      "Tablet sayısına göre çevrilir.",
      "Doz henüz doğrulanmamıştır.",
    ],
    correct: 0,
    explanation: "KidneyWel Liquid için doğrulanmış doz her uygulamada 0,5 mL/kg ve günde 2 kezdir.",
  },
  {
    category: "KidneyWel Liquid",
    question: "KidneyWel Liquid için hangisi söylenmemelidir?",
    options: [
      "Renal ve üriner sistemi çok yönlü destekleyen bitkisel sıvı formüldür.",
      "26 bitkisel içerik içerir.",
      "Primer tedavi veya renal diyetin yerine geçer.",
      "Kullanım süresi veteriner hekimin değerlendirmesine göre belirlenir.",
    ],
    correct: 2,
    explanation: "KidneyWel Liquid tamamlayıcı destek olarak konumlandırılır; primer tedavi veya renal diyet yerine geçmez.",
  },
  {
    category: "LiverWel Tablet",
    question: "LiverWel Tablet doğrulanmış formülasyon bilgisinde kaç bitkisel ekstrakt bulunur?",
    options: ["12", "18", "21", "26"],
    correct: 2,
    explanation: "LiverWel Tablet kayıtlarında 21 bitkisel ekstrakt doğrulanmıştır.",
  },
  {
    category: "Form ayrımı",
    question: "LiverWel Liquid dozu sorulduğunda ne yapmalısın?",
    options: [
      "Tablet dozunu aynen kullanmalısın.",
      "Köpeğin kilosuna göre tahmin etmelisin.",
      "Liquid dozunun doğrulama beklediğini söylemeli ve Tablet bilgisini taşımamalısın.",
      "Her hayvana 1 mL önermelisin.",
    ],
    correct: 2,
    explanation: "LiverWel Liquid ayrı form olarak doğrulama bekliyor. Tablet dozu Liquid forma kopyalanmaz.",
  },
  {
    category: "CalmWel Tablet",
    question: "CalmWel Tablet'in doğru konumlandırması hangisidir?",
    options: [
      "Belirgin sedasyon oluşturmak için kullanılır.",
      "Stresli/değişken koşullarda sakinlik, davranış dengesi ve adaptasyon desteği için konumlandırılır.",
      "Psikolojik kaşıntıyı tedavi eder.",
      "Yalnız kediler içindir.",
    ],
    correct: 1,
    explanation: "CalmWel Tablet sakinlik, davranış dengesi ve çevresel adaptasyon desteği üzerinden anlatılır; sedasyon veya tedavi iddiası yapılmaz.",
  },
  {
    category: "Veri güvenliği",
    question: "15 kg bir köpek için SkinWel dozu soruldu. Veritabanında her 10 kg için 1 tablet/doz yazıyor ancak ara kilo yuvarlama kuralı yok. Ne yapmalısın?",
    options: [
      "2 tablete yuvarlamalısın.",
      "1 tablete yuvarlamalısın.",
      "Ara kilo kuralının doğrulanması gerektiğini söylemeli, tahmin etmemelisin.",
      "3 tablet vermelisin.",
    ],
    correct: 2,
    explanation: "AI ve çalışan doğrulanmamış ara kilo kuralını kendi başına yuvarlamamalıdır.",
  },
  {
    category: "Cleanse",
    question: "Cleanse için pet sahibine evde kullanım talimatı sorulduğunda doğru yaklaşım nedir?",
    options: [
      "Evde uygulanabileceğini söylemek.",
      "Mevcut kaydın ürünü veteriner klinik protokolü içinde tarif ettiğini ve evde kullanımın onaylı olmadığını belirtmek.",
      "Dozu yarıya indirerek evde önermek.",
      "İnternetten benzer bir protokol bulmak.",
    ],
    correct: 1,
    explanation: "Cleanse mevcut kayıtta veteriner klinik protokolü içinde tanımlıdır; onaylanmamış evde kullanım talimatı verilmez.",
  },
  {
    category: "VetWel iletişim standardı",
    question: "Bir veteriner 'Bu ürün hastalığı tedavi eder mi?' diye sorarsa en doğru yaklaşım hangisidir?",
    options: [
      "Kesinlikle tedavi ettiğini söylemek.",
      "Rakiplerden daha iyi tedavi ettiğini söylemek.",
      "Ürünü tanı veya tedavinin yerine koymadan ilgili sağlık alanını destekleme amacı ve formülasyon mantığını anlatmak.",
      "Soruyu yanıtsız bırakmak.",
    ],
    correct: 2,
    explanation: "VetWel iletişim standardı ürünü tanı veya tedavinin yerine koymaz; destek amacı ve doğrulanmış formülasyon mantığı anlatılır.",
  },
];

export default function QuizClient() {
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
          <span>Geçme hedefi: %80</span>
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
                        name={`question-${index}`}
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
                  <strong>{isCorrect ? "Doğru" : "Tekrar et"}</strong>
                  <p>{question.explanation}</p>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>

      {!submitted ? (
        <button className="primary-button" disabled={!completed} onClick={() => setSubmitted(true)} type="button">
          Sınavı değerlendir
        </button>
      ) : (
        <section className="quiz-result">
          <span className="eyebrow">Yetkinlik sonucu</span>
          <h2>%{percent}</h2>
          <p>
            {percent >= 80
              ? "Temel VetWel bilgi güvenliği ve ürün eğitimi hedefini geçtin. Yanlışlarını yine de gözden geçir."
              : "Bu aşamada tekrar eğitim önerilir. Özellikle yanlış yaptığın ürün/form sınırlarını yeniden çalış."}
          </p>
          <div className="quiz-result-meta">
            <strong>{score}/{questions.length} doğru</strong>
            <span>{percent >= 80 ? "Geçti" : "Tekrar eğitim"}</span>
          </div>
          <button className="secondary-button" onClick={reset} type="button">Sınavı yeniden başlat</button>
        </section>
      )}
    </div>
  );
}
