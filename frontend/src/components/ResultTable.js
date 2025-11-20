import React from "react";

export default function ResultTable({ results }) {
  if (!results || results.length === 0) return null;

  return (
    <table className="table" aria-label="results">
      <thead>
        <tr>
          <th>Rule</th>
          <th>Status</th>
          <th>Evidence</th>
          <th>Reasoning</th>
          <th>Confidence</th>
        </tr>
      </thead>
      <tbody>
        {results.map((r, idx) => (
          <tr key={idx}>
            <td>{r.rule}</td>
            <td>
              <span
                className={r.status === "pass" ? "result-pass" : "result-fail"}
              >
                {r.status.toUpperCase()}
              </span>
            </td>
            <td>{r.evidence || "-"}</td>
            <td>{r.reasoning}</td>
            <td>{r.confidence}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
