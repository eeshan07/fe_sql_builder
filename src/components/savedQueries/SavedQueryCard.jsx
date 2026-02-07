import React from "react";

export default function SavedQueryCard({ query }) {
  return (
    <div className="saved-query-card">
      <h4>{query.query_name || "Unnamed Query"}</h4>

      <div className="saved-query-meta">
        <p><b>ID:</b> {query.id}</p>
      </div>

      <div className="saved-query-sql">
        <pre>{query.sql_query}</pre>
      </div>
    </div>
  );
}
