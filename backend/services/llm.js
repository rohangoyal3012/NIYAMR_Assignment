import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const OPENAI_KEY = process.env.OPENAI_API_KEY;
const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

const client = OPENAI_KEY ? new OpenAI({ apiKey: OPENAI_KEY }) : null;

export async function evaluateRules({ rules, pages }) {
  const doc = pages.map((p) => `---PAGE ${p.page}---\n${p.text}`).join("\n\n");

  const prompt = `
You are an LLM evaluating a PDF against rules.
Return ONLY JSON array:

[
  {
    "rule": string,
    "status": "pass" | "fail",
    "evidence": string,
    "reasoning": string,
    "confidence": number
  }
]

Document:
${doc}

Rules:
${rules.join("\n")}
`;

  // If no API key → simple fallback
  if (!client) {
    console.warn("OpenAI API key missing → using fallback.");
    return rules.map((r) => ({
      rule: r,
      status: "fail",
      evidence: "",
      reasoning: "LLM disabled (no API key).",
      confidence: 30,
    }));
  }

  try {
    const completion = await client.chat.completions.create({
      model: MODEL,
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
    });

    const text = completion.choices[0].message.content.trim();
    const jsonStart = text.indexOf("[");
    const jsonEnd = text.lastIndexOf("]") + 1;

    return JSON.parse(text.slice(jsonStart, jsonEnd));
  } catch (err) {
    console.error("LLM error:", err);
    return rules.map((r) => ({
      rule: r,
      status: "fail",
      evidence: "",
      reasoning: "Failed to parse LLM response.",
      confidence: 20,
    }));
  }
}
