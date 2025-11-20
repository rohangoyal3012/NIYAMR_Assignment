import React from "react";

export default function RuleForm({
  rules,
  setRules,
  file,
  setFile,
  onCheck,
  checking,
}) {
  const updateRule = (idx, val) => {
    const updated = [...rules];
    updated[idx] = val;
    setRules(updated);
  };

  return (
    <div>
      <label className="small">Upload PDF (2–10 pages)</label>
      <input
        className="file-input"
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0])}
      />

      {rules.map((rule, i) => (
        <input
          key={i}
          type="text"
          value={rule}
          onChange={(e) => updateRule(i, e.target.value)}
          placeholder={`Rule ${i + 1}`}
        />
      ))}

      <button onClick={onCheck} disabled={checking}>
        {checking ? "Checking..." : "Check Document"}
      </button>
    </div>
  );
}
