import React, { useState } from "react";
import RuleForm from "./components/RuleForm";
import ResultTable from "./components/ResultTable";

export default function App() {
  const [rules, setRules] = useState([
    "Document must have a purpose section.",
    "Document must mention at least one date.",
    "Document must define at least one term.",
  ]);

  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);
  const [checking, setChecking] = useState(false);

  const API = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

  const onCheck = async () => {
    if (!file) return alert("Please upload a PDF.");

    const trimmed = rules.map((r) => (r || "").trim()).filter(Boolean);
    if (trimmed.length < 1) return alert("Please provide at least one rule.");

    setChecking(true);
    setResults([]);

    const form = new FormData();
    form.append("file", file);
    form.append("rules", JSON.stringify(trimmed));

    try {
      const res = await fetch(`${API}/check`, {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      alert("Server error");
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>NIYAMR PDF Rule Checker</h1>
      </div>

      <RuleForm
        rules={rules}
        setRules={setRules}
        file={file}
        setFile={setFile}
        onCheck={onCheck}
        checking={checking}
      />

      <ResultTable results={results} />
    </div>
  );
}
