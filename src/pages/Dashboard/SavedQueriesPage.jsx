import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSavedQueries } from "../../features/savedQueries/savedQueriesSlice";

const SavedQueriesPage = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.savedQueries);

  useEffect(() => {
    dispatch(fetchSavedQueries());
  }, [dispatch]);

  if (loading) return <div style={{ padding: "20px" }}>Loading...</div>;

  if (error)
    return (
      <div style={{ padding: "20px", color: "red" }}>
        Error: {JSON.stringify(error)}
      </div>
    );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Saved Queries</h2>

      {list.length === 0 ? (
        <div style={{ marginTop: "20px", color: "#777" }}>
          No saved queries found.
        </div>
      ) : (
        <div style={{ marginTop: "20px" }}>
          {list.map((q) => (
            <div
              key={q.id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                borderRadius: "10px",
                marginBottom: "12px",
                background: "#fff",
              }}
            >
              <h3 style={{ margin: "0 0 6px 0" }}>
                {q.query_name || "Untitled Query"}
              </h3>

              <p style={{ margin: "0 0 6px 0", fontSize: "13px", color: "#666" }}>
                Status: <b>{q.query_status || "UNKNOWN"}</b>
              </p>

              <p style={{ margin: "0 0 10px 0", fontSize: "12px", color: "#999" }}>
                Created:{" "}
                {q.created_at ? new Date(q.created_at).toLocaleString() : "N/A"}
              </p>

              <pre
                style={{
                  background: "#f7f7f7",
                  padding: "10px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  maxHeight: "100px",
                  overflow: "hidden",
                }}
              >
                {q.sql_text || "No SQL saved"}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedQueriesPage;
