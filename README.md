🚀 NIYAMR Fullstack PDF Rule Checker

A full-stack document analysis system using React + Node.js + AI (LLM)

<div align="center">
🔥 Upload PDF → Enter Rules → Get AI-Powered Evaluation
✔ Pass/Fail • ✔ Evidence • ✔ Reasoning • ✔ Confidence Score
</div>
📌 Overview

This project allows users to upload a PDF file and enter a set of rules in plain English.
The backend extracts text from the PDF and uses AI (LLM) to evaluate whether each rule is satisfied.

Built as part of the NIYAMR Fullstack Assignment.

✨ Features

📄 Upload a PDF document (2–10 pages)

📝 Enter 3 rules in normal English

🤖 AI evaluates each rule

📌 Detailed output:

PASS / FAIL

Evidence (with page number)

Reasoning

Confidence score (0–100)

🎨 Clean and simple UI

🛡 Works even without OpenAI key (fallback mode)

🧩 Modular backend architecture (Route → Controller → Service → Utils → Config)

🧱 Tech Stack
Frontend

React (CRA)

CSS

Fetch API

FormData API

Backend

Node.js

Express.js

Multer

pdf-parse

OpenAI SDK

dotenv

CORS

📁 Project Structure
niyamr-fullstack/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   │
│   ├── routes/
│   │     └── rulesCheck.routes.js
│   │
│   ├── controllers/
│   │     └── rulesCheck.controller.js
│   │
│   ├── services/
│   │     └── rulesCheck.service.js
│   │
│   ├── utils/
│   │     └── llm.service.js
│   │
│   └── config/
│         └── multerConfig.js
│
└── frontend/
    ├── package.json
    ├── public/
    │     └── index.html
    └── src/
          ├── index.js
          ├── App.js
          ├── styles.css
          └── components/
                ├── RuleForm.js
                └── ResultTable.js

🖥️ Backend Setup (Node.js)
1️⃣ Install dependencies
cd backend
npm install

2️⃣ Create .env

Copy .env.example → .env

PORT=4000
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini
MAX_FILE_SIZE=10485760

3️⃣ Start backend
npm start


Backend runs at:
👉 http://localhost:4000

🎨 Frontend Setup (React)
1️⃣ Install dependencies
cd frontend
npm install

2️⃣ Start frontend
npm start


Frontend runs at:
👉 http://localhost:3000

🔗 Frontend → Backend Connection

If backend is deployed or runs on another port, create:

frontend/.env
REACT_APP_API_URL=http://localhost:4000/api


Restart frontend after adding .env.

🔥 API Endpoint
POST /api/check
Request (multipart/form-data)
Field	Type	Description
file	File	PDF file
rules	string	JSON array of rules

Example:

["Document must mention a date", "Document must have a purpose", "Document must define a term"]

Response:
{
  "results": [
    {
      "rule": "Document must mention a date.",
      "status": "pass",
      "evidence": "Found on page 1: 'Published: 2024'",
      "reasoning": "A date is clearly mentioned.",
      "confidence": 92
    }
  ]
}

🛡 Fallback Mode (No API Key Needed)

If OPENAI_API_KEY is empty:

Backend uses a keyword-based fallback

Pass/Fail logic still works

Perfect for assignment/demo

🧪 Sample PDF for Testing

Use the sample provided in the repo or upload any document containing:

Purpose

Date

Definition

Owner
