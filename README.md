# NIYAMR Fullstack PDF Rule Checker

## 🎥 Project Demo (Video)

👉 Watch the full working demo here:  
https://drive.google.com/file/d/1vgT8K5quj9kuQ5HkcJ5KvjYZSdok7g5R/view

---

# ✨ Features

- Upload PDF document
- Enter rules in plain English
- AI evaluates rules (PASS/FAIL, evidence, reasoning, confidence)
- Works without OpenAI Key (fallback mode)

---

# 🧱 Tech Stack

### Frontend

- React (CRA)
- CSS
- Fetch API

### Backend

- Node.js
- Express.js
- Multer
- pdf-parse
- OpenAI SDK
- dotenv

---

# 📁 Folder Structure

```
niyamr-fullstack/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   ├── routes/
│   │     └── rulesCheck.routes.js
│   ├── controllers/
│   │     └── rulesCheck.controller.js
│   ├── services/
│   │     └── rulesCheck.service.js
│   ├── utils/
│   │     └── llm.service.js
│   └── config/
│         └── multerConfig.js
│
└── frontend/
    ├── package.json
    ├── public/
    └── src/
```

---

# 🖥 Backend Setup

```
cd backend
npm install
npm start
```

---

# 🎨 Frontend Setup

```
cd frontend
npm install
npm start
```

---

# 🔗 API Endpoint

### POST /api/check

Returns rule evaluation results with AI.

---

# 📌 Notes (For Submission)

I developed a full-stack PDF Rule Checker using React and Node.js/Express with AI-based rule validation.  
GitHub Repo: https://github.com/rohangoyal3012/NIYAMR_Assignment
