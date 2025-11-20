import express from "express";
import { upload } from "../config/multer.config.js";
import { checkPdfRules } from "../controllers/rulesCheck.controller.js";

const router = express.Router();

router.post("/check", upload.single("file"), checkPdfRules);

export default router;
