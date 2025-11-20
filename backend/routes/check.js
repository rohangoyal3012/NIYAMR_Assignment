import express from "express";
import multer from "multer";
import { extractTextFromPdf } from "../utils/pdfExtract.js";
import { evaluateRules } from "../services/llm.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: Number(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024 },
});

router.post("/check", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    let rules = req.body.rules;

    if (!file) return res.status(400).json({ error: "No file uploaded" });

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

    const pages = await extractTextFromPdf(file.buffer);

    const result = await evaluateRules({ rules, pages });

    res.json({ results: result });
  } catch (err) {
    console.error("Check error:", err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

export default router;
