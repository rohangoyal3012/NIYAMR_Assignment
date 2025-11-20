import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const client = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export const evaluateRules = async ({ rules, pages }) => {
  const document = pages
    .map((p) => `---PAGE ${p.page}---\n${p.text}`)
    .join("\n\n");

  const prompt = `
You are an AI that checks rules against a PDF.
Return ONLY JSON array:

[
  {
    "rule": "",
    "status": "pass" | "fail",
    "evidence": "",
    "reasoning": "",
    "confidence": 0-100
  }
]

Document:
${document}

Rules:
${rules.join("\n")}
`;

  // Fallback mode
  if (!client) {
    console.warn("No API key → fallback mode");
    return rules.map((rule) => ({
      rule,
      status: "fail",
      evidence: "",
      reasoning: "LLM disabled (fallback mode)",
      confidence: 30,
    }));
  }

  try {
    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
    });

    const text = completion.choices[0].message.content.trim();
    const start = text.indexOf("[");
    const end = text.lastIndexOf("]") + 1;

    return JSON.parse(text.slice(start, end));
  } catch (err) {
    console.error("LLM Error:", err);
    return rules.map((rule) => ({
      rule,
      status: "fail",
      evidence: "",
      reasoning: "LLM failed to evaluate rule",
      confidence: 20,
    }));
  }
};
