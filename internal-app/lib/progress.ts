export type QuizProgress = {
  best: number;
  last: number;
  attempts: number;
  updatedAt: string;
};

export type RoleplayProgress = {
  attempts: number;
  lastProduct: string;
  lastPersona: string;
  lastDifficulty: string;
  updatedAt: string;
};

export type VetWelProgress = {
  completedTraining: Record<string, string>;
  basicQuiz?: QuizProgress;
  advancedQuiz?: QuizProgress;
  roleplay?: RoleplayProgress;
};

export const EMPTY_PROGRESS: VetWelProgress = {
  completedTraining: {},
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function normalizeQuiz(value: unknown): QuizProgress | undefined {
  if (!isRecord(value)) return undefined;

  const best = typeof value.best === "number" ? Math.max(0, Math.min(100, Math.round(value.best))) : 0;
  const last = typeof value.last === "number" ? Math.max(0, Math.min(100, Math.round(value.last))) : 0;
  const attempts = typeof value.attempts === "number" ? Math.max(0, Math.round(value.attempts)) : 0;
  const updatedAt = typeof value.updatedAt === "string" ? value.updatedAt : "";

  return { best, last, attempts, updatedAt };
}

function normalizeRoleplay(value: unknown): RoleplayProgress | undefined {
  if (!isRecord(value)) return undefined;

  const attempts = typeof value.attempts === "number" ? Math.max(0, Math.round(value.attempts)) : 0;
  const lastProduct = typeof value.lastProduct === "string" ? value.lastProduct.slice(0, 120) : "";
  const lastPersona = typeof value.lastPersona === "string" ? value.lastPersona.slice(0, 120) : "";
  const lastDifficulty = typeof value.lastDifficulty === "string" ? value.lastDifficulty.slice(0, 40) : "";
  const updatedAt = typeof value.updatedAt === "string" ? value.updatedAt : "";

  return { attempts, lastProduct, lastPersona, lastDifficulty, updatedAt };
}

export function normalizeProgress(value: unknown): VetWelProgress {
  if (!isRecord(value)) return { ...EMPTY_PROGRESS, completedTraining: {} };

  const completedTraining: Record<string, string> = {};
  if (isRecord(value.completedTraining)) {
    for (const [slug, timestamp] of Object.entries(value.completedTraining)) {
      if (typeof timestamp === "string" && timestamp) completedTraining[slug] = timestamp;
    }
  }

  return {
    completedTraining,
    basicQuiz: normalizeQuiz(value.basicQuiz),
    advancedQuiz: normalizeQuiz(value.advancedQuiz),
    roleplay: normalizeRoleplay(value.roleplay),
  };
}

export function recordQuizResult(
  current: VetWelProgress,
  quiz: "basic" | "advanced",
  percent: number,
): VetWelProgress {
  const safePercent = Math.max(0, Math.min(100, Math.round(percent)));
  const key = quiz === "basic" ? "basicQuiz" : "advancedQuiz";
  const previous = current[key];
  const next: QuizProgress = {
    best: Math.max(previous?.best ?? 0, safePercent),
    last: safePercent,
    attempts: (previous?.attempts ?? 0) + 1,
    updatedAt: new Date().toISOString(),
  };

  return { ...current, [key]: next };
}

export function recordRoleplay(
  current: VetWelProgress,
  product: string,
  persona: string,
  difficulty: string,
): VetWelProgress {
  const next: RoleplayProgress = {
    attempts: (current.roleplay?.attempts ?? 0) + 1,
    lastProduct: product,
    lastPersona: persona,
    lastDifficulty: difficulty,
    updatedAt: new Date().toISOString(),
  };

  return { ...current, roleplay: next };
}
