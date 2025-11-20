# NIYAMR Fullstack PDF Rule Checker

A complete full-stack application using **React (Frontend)** and **Node.js/Express (Backend)** that allows users to upload a PDF and enter custom rules.  
The backend extracts text from the PDF and uses an **AI LLM (OpenAI)** to evaluate whether each rule is satisfied.

This project is built for the **NIYAMR Fullstack Assignment**.

---

# ✨ Features

✔ Upload PDF (2–10 pages)  
✔ Enter 3 rules in plain English  
✔ AI evaluates each rule  
✔ Shows:  
- Pass / Fail  
- Evidence (with page number)  
- Reasoning  
- Confidence Score (0–100)  
✔ Clean frontend UI  
✔ Backend fallback mode if no OpenAI API key is provided  
✔ Fully modular architecture (routes → controllers → services → utils → config)

---

# 📁 Project Folder Structure

niyamr-fullstack/
│
├── backend/
│ ├── server.js
│ ├── package.json
│ ├── .env.example
│ │
│ ├── routes/
│ │ └── rulesCheck.routes.js
│ │
│ ├── controllers/
│ │ └── rulesCheck.controller.js
│ │
│ ├── services/
│ │ └── rulesCheck.service.js ← (PDF extraction + rule evaluation)
│ │
│ ├── utils/
│ │ └── llm.service.js ← (OpenAI LLM handler)
│ │
│ └── config/
│ └── multerConfig.js ← (PDF upload config)
│
└── frontend/
├── package.json
│
├── public/
│ └── index.html
│
└── src/
├── index.js
├── App.js
├── styles.css
│
└── components/
├── RuleForm.js
└── ResultTable.js

yaml
Copy code

---

# 🛠 Backend Setup (Node.js + Express)

### 1️⃣ Navigate into backend
```bash
cd backend
2️⃣ Install dependencies
bash
Copy code
npm install
3️⃣ Create .env file
Copy .env.example → .env:

ini
Copy code
PORT=4000
OPENAI_API_KEY=your_openai_key_here
OPENAI_MODEL=gpt-4o-mini
MAX_FILE_SIZE=10485760
📌 If you do NOT provide an OpenAI API key →
Backend uses built-in fallback mode (simple rule matching).

4️⃣ Start backend
bash
Copy code
npm start
Backend runs at:

arduino
Copy code
http://localhost:4000
🔗 Backend API Details
POST /api/check
📤 Request (multipart/form-data):
Field	Type	Description
file	PDF File	The uploaded PDF
rules	string	JSON string array of rules

Example rules input:

json
Copy code
["Document must mention a date","Document must have a purpose","Document must define a term"]
📥 Response:
json
Copy code
{
  "results": [
    {
      "rule": "Document must mention a date.",
      "status": "pass",
      "evidence": "Found in page 1: 'Published on: 2024'",
      "reasoning": "The document contains a date.",
      "confidence": 92
    }
  ]
}
🎨 Frontend Setup (React)
1️⃣ Navigate into frontend
bash
Copy code
cd frontend
2️⃣ Install dependencies
bash
Copy code
npm install
3️⃣ Start frontend
bash
Copy code
npm start
Frontend runs at:

arduino
Copy code
http://localhost:3000
If 3000 is busy → React will auto-select another port.

🔧 Configure Backend URL in Frontend (Optional)
If backend runs on another port or deployed URL, create:

frontend/.env
bash
Copy code
REACT_APP_API_URL=http://localhost:4000/api
Restart frontend after adding this file.

🧠 How the System Works (Simple Explanation)
User uploads a PDF

User enters rules in plain English

Backend extracts all PDF text

Backend sends PDF + rules to LLM (OpenAI)

LLM evaluates each rule and returns structured JSON

Frontend displays the results in a clean table

🛡 Fallback Mode (No API Key Needed)
If OPENAI_API_KEY is missing:

Backend uses keyword-based fallback

Still returns pass/fail

Confidence is lower

Assignment still works completely

🧪 Testing the App
Use this sample PDF:

👉 Includes: Purpose, Date, Definition, Owner
👉 Perfect for verifying Pass/Fail logic

vbnet
Copy code
Purpose: This document explains the sample data.
Published on: 2024
Definition: 'SampleTerm' means example definition for testing.
The owner of this document is the IT Department.
