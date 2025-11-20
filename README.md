# NIYAMR Fullstack PDF Rule Checker

A fullstack application (React + Node.js) that allows users to upload a PDF, enter rules in plain English, and get AI-powered rule evaluation.

This project is built for the **NIYAMR Assignment**.

---

# 🚀 Features

- Upload a PDF document (2–10 pages)
- Enter 3 rules to check
- AI (LLM) evaluates each rule
- Returns:
  - PASS / FAIL  
  - Evidence (with page number)  
  - Reasoning  
  - Confidence score (0–100)
- Clean and simple UI
- Backend fallback mode if no OpenAI key is provided

---

# 🧩 Tech Stack

### **Frontend**
- React (CRA)
- CSS
- Fetch API
- FormData for file uploads

### **Backend**
- Node.js
- Express.js
- Multer (file upload)
- pdf-parse (PDF text extraction)
- OpenAI SDK
- dotenv
- CORS

---




