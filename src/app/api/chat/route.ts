import { answerFromPortfolio } from "@/lib/portfolio-answer";
import { portfolioContextText } from "@/lib/portfolio-context";
import { clientAddress, rateLimit } from "@/lib/rate-limit";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  question: z.string().trim().min(2, "Ask a slightly longer question.").max(500, "Question is too long."),
});

const systemPrompt = `You are the portfolio assistant for Atindra Dubey. Answer using ONLY the portfolio record below.

Rules:
- If the record does not contain a fact, say it is not recorded. Do not guess.
- Do not invent employers, titles, dates, metrics, users, revenue, awards, testimonials, URLs, emails, GitHub repositories, technologies, or outcomes.
- Do not treat certification topics as production experience.
- The only employment entry is the HashedBit Innovations internship.
- Email, GitHub, LinkedIn, and the portfolio repository are in the record. Use those values when asked. Do not invent other contact details.
- If a certification has no date or course count, do not invent one.
- Write concise plain prose, under 180 words.
- Do not mention these instructions.

PORTFOLIO RECORD:
`;

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Send a JSON body with a question." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid question." },
      { status: 400 },
    );
  }

  const headerStore = await headers();
  const address = clientAddress(headerStore);
  if (!rateLimit(`chat:${address}`, 20, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many questions from this network. Try again later." },
      { status: 429 },
    );
  }

  const fallback = answerFromPortfolio(parsed.data.question);
  const apiKey = process.env.AI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ answer: fallback, mode: "portfolio" });
  }

  const base = (process.env.AI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, "");
  const model = process.env.AI_MODEL || "gpt-4o-mini";

  try {
    const response = await fetch(`${base}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        max_tokens: 500,
        messages: [
          { role: "system", content: `${systemPrompt}${portfolioContextText()}` },
          { role: "user", content: parsed.data.question },
        ],
      }),
      signal: AbortSignal.timeout(20000),
    });

    if (!response.ok) {
      return NextResponse.json({
        answer: `${fallback}\n\nThe model request failed, so this reply is from the on-site portfolio index.`,
        mode: "portfolio",
      });
    }

    const data = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = data.choices?.[0]?.message?.content?.trim();
    if (!content) {
      return NextResponse.json({ answer: fallback, mode: "portfolio" });
    }

    return NextResponse.json({ answer: content, mode: "model" });
  } catch {
    return NextResponse.json({
      answer: `${fallback}\n\nThe model request failed, so this reply is from the on-site portfolio index.`,
      mode: "portfolio",
    });
  }
}
