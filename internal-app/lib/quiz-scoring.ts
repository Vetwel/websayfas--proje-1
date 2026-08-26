export type QuizKind = "basic" | "advanced";

const ANSWER_KEYS: Record<QuizKind, number[]> = {
  basic: [1, 0, 0, 2, 2, 2, 1, 2, 1, 2, 2, 1, 0, 2],
  advanced: [2, 2, 1, 2, 1, 2, 1, 2],
};

export function scoreQuizAnswers(quiz: QuizKind, input: unknown) {
  if (!Array.isArray(input)) return null;
  const key = ANSWER_KEYS[quiz];
  if (input.length !== key.length) return null;

  const answers = input.map((value) => typeof value === "number" && Number.isInteger(value) ? value : -1);
  if (answers.some((value) => value < 0 || value > 3)) return null;

  const correct = answers.reduce((total, answer, index) => total + (answer === key[index] ? 1 : 0), 0);
  const percent = Math.round((correct / key.length) * 100);
  return { correct, total: key.length, percent };
}
