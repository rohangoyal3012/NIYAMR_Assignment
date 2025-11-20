import { extractPdfText } from "../services/rulesCheckPdf.service.js";
import { evaluateRules } from "../utils/llm.utils.js";

export const checkPdfRules = async (req, res) => {
  try {
    const file = req.file;
    let rules = req.body.rules;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Parse rules
    if (typeof rules === "string") {
      try {
        rules = JSON.parse(rules);
      } catch {
        rules = [rules];
      }
    }

    if (!Array.isArray(rules) || rules.length === 0) {
      return res.status(400).json({ error: "No rules provided" });
    }

    // Extract PDF text
    const pages = await extractPdfText(file.buffer);

    // Evaluate rules using LLM service
    const results = await evaluateRules({ rules, pages });

    return res.json({ results });
  } catch (err) {
    console.error("Controller Error:", err);
    return res.status(500).json({
      error: "Internal Server Error",
      details: err.message,
    });
  }
};
