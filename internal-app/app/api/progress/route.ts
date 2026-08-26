import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { isClerkConfigured } from "@/lib/internal-config";
import { trainingModules } from "@/lib/training-content";
import { normalizeProgress, recordQuizResult, recordRoleplay } from "@/lib/progress";
import { scoreQuizAnswers } from "@/lib/quiz-scoring";

export const runtime = "nodejs";

const ROLEPLAY_PERSONAS = new Set([
  "Kanıt odaklı veteriner",
  "Zamanı çok kısıtlı veteriner",
  "Şüpheci veteriner",
  "Mevcut ürüne sadık veteriner",
  "Pratik / uygulama odaklı veteriner",
]);

const ROLEPLAY_DIFFICULTIES = new Set(["Temel", "Orta", "Zor"]);

function metadataRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

async function getAuthenticatedUser() {
  if (!isClerkConfigured()) return null;
  const { userId } = await auth();
  if (!userId) return null;
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  return { userId, user, client };
}

export async function GET() {
  const session = await getAuthenticatedUser();
  if (!session) {
    return NextResponse.json({ error: "Oturum açmanız gerekiyor." }, { status: 401 });
  }

  const privateMetadata = metadataRecord(session.user.privateMetadata);
  const progress = normalizeProgress(privateMetadata.vetwelProgress);
  return NextResponse.json({ progress });
}

export async function POST(request: Request) {
  const session = await getAuthenticatedUser();
  if (!session) {
    return NextResponse.json({ error: "Oturum açmanız gerekiyor." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const input = body as Record<string, unknown>;
  const privateMetadata = metadataRecord(session.user.privateMetadata);
  const current = normalizeProgress(privateMetadata.vetwelProgress);
  let next = current;
  let quizScore: { correct: number; total: number; percent: number } | undefined;

  if (input.action === "complete_training") {
    const slug = typeof input.slug === "string" ? input.slug : "";
    if (!trainingModules.some((module) => module.slug === slug)) {
      return NextResponse.json({ error: "Geçersiz eğitim modülü." }, { status: 400 });
    }

    next = {
      ...current,
      completedTraining: {
        ...current.completedTraining,
        [slug]: new Date().toISOString(),
      },
    };
  } else if (input.action === "quiz_result") {
    const quiz = input.quiz === "basic" || input.quiz === "advanced" ? input.quiz : null;
    if (!quiz) {
      return NextResponse.json({ error: "Geçersiz sınav türü." }, { status: 400 });
    }

    const scored = scoreQuizAnswers(quiz, input.answers);
    if (!scored) {
      return NextResponse.json({ error: "Geçersiz veya eksik sınav cevapları." }, { status: 400 });
    }

    quizScore = scored;
    next = recordQuizResult(current, quiz, scored.percent);
  } else if (input.action === "roleplay_result") {
    const product = typeof input.product === "string" ? input.product : "";
    const persona = typeof input.persona === "string" ? input.persona : "";
    const difficulty = typeof input.difficulty === "string" ? input.difficulty : "";
    const validProducts = new Set(trainingModules.map((module) => `${module.product} ${module.form}`));

    if (!validProducts.has(product) || !ROLEPLAY_PERSONAS.has(persona) || !ROLEPLAY_DIFFICULTIES.has(difficulty)) {
      return NextResponse.json({ error: "Geçersiz rol-play kaydı." }, { status: 400 });
    }

    next = recordRoleplay(current, product, persona, difficulty);
  } else {
    return NextResponse.json({ error: "Bilinmeyen işlem." }, { status: 400 });
  }

  await session.client.users.updateUserMetadata(session.userId, {
    privateMetadata: {
      ...privateMetadata,
      vetwelProgress: next,
    },
  });

  return NextResponse.json({ progress: next, quizScore });
}
