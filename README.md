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




---

# 🖥 FRONTEND SETUP (React)

### 1️⃣ Navigate into frontend
```bash

cd frontend
Install dependencies
npm install

 Start the frontend
npm start

Frontend will run at:
http://localhost:3000


🖥 BACKEND SETUP (Node.js + Express)

Navigate into backend
cd backend

Install dependencies
npm install

 Create .env file

Copy .env.example → .env:

PORT=4000
OPENAI_API_KEY=your_openai_key_here
OPENAI_MODEL=gpt-4o-mini
MAX_FILE_SIZE=10485760

If no API key is provided → backend switches to fallback mode (local keyword evaluator).


 Start backend
npm start


Backend runs at:

http://localhost:4000
