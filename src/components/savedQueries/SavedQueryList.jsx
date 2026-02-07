import React from "react";

const SavedQueriesList = ({ queries = [], onSelect }) => {
  if (!queries || queries.length === 0) {
    return (
      <div style={{ padding: "15px", color: "#777" }}>
        No saved queries found.
      </div>
    );
  }

  return (
    <div style={{ padding: "10px" }}>
      {queries.map((q) => (
        <div
          key={q.id}
          onClick={() => onSelect(q)}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "12px",
            marginBottom: "10px",
            cursor: "pointer",
            background: "#fff",
          }}
        >
          <h4 style={{ margin: "0 0 5px 0" }}>
            {q.query_name || "Untitled Query"}
          </h4>

          <p style={{ margin: 0, fontSize: "13px", color: "#666" }}>
            Status: <b>{q.query_status || "UNKNOWN"}</b>
          </p>

          <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#999" }}>
            Created: {q.created_at ? new Date(q.created_at).toLocaleString() : "N/A"}
          </p>

          <pre
            style={{
              marginTop: "8px",
              padding: "8px",
              background: "#f6f6f6",
              borderRadius: "6px",
              fontSize: "12px",
              maxHeight: "90px",
              overflow: "hidden",
            }}
          >
            {q.sql_text ? q.sql_text.substring(0, 200) : "No SQL stored"}
            {q.sql_text && q.sql_text.length > 200 ? "..." : ""}
          </pre>
        </div>
      ))}
    </div>
  );
};

export default SavedQueriesList;
