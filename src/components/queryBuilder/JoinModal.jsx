import React, { useMemo, useState } from "react";

const JoinModal = ({ open, sourceNode, targetNode, onClose, onSave }) => {
  const sourceCols = useMemo(() => sourceNode?.data?.columns || [], [sourceNode]);
  const targetCols = useMemo(() => targetNode?.data?.columns || [], [targetNode]);

  const [leftCol, setLeftCol] = useState("");
  const [rightCol, setRightCol] = useState("");
  const [joinType, setJoinType] = useState("INNER");

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: "650px",
          background: "white",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <h3 style={{ marginBottom: "15px" }}>Create Join</h3>

        <div style={{ marginBottom: "15px" }}>
          <label>Join Type:</label>
          <select
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            value={joinType}
            onChange={(e) => setJoinType(e.target.value)}
          >
            <option value="INNER">INNER JOIN</option>
            <option value="LEFT">LEFT JOIN</option>
            <option value="RIGHT">RIGHT JOIN</option>
            <option value="FULL">FULL OUTER JOIN</option>
          </select>
        </div>

        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ flex: 1 }}>
            <h4>{sourceNode?.data?.tableName}</h4>

            <select
              style={{ width: "100%", padding: "8px" }}
              value={leftCol}
              onChange={(e) => setLeftCol(e.target.value)}
            >
              <option value="">Select Column</option>
              {sourceCols.map((c, idx) => (
                <option key={idx} value={c.name}>
                  {c.name} ({c.type})
                </option>
              ))}
            </select>

            {sourceCols.length === 0 && (
              <p style={{ color: "red", fontSize: "12px" }}>
                No columns available for this table
              </p>
            )}
          </div>

          <div style={{ flex: 1 }}>
            <h4>{targetNode?.data?.tableName}</h4>

            <select
              style={{ width: "100%", padding: "8px" }}
              value={rightCol}
              onChange={(e) => setRightCol(e.target.value)}
            >
              <option value="">Select Column</option>
              {targetCols.map((c, idx) => (
                <option key={idx} value={c.name}>
                  {c.name} ({c.type})
                </option>
              ))}
            </select>

            {targetCols.length === 0 && (
              <p style={{ color: "red", fontSize: "12px" }}>
                No columns available for this table
              </p>
            )}
          </div>
        </div>

        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <button
            style={{
              flex: 1,
              padding: "10px",
              background: "#ddd",
              border: "none",
              borderRadius: "6px",
            }}
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            style={{
              flex: 1,
              padding: "10px",
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
            onClick={() => {
              if (!leftCol || !rightCol) {
                alert("Please select both join columns");
                return;
              }

              onSave({
                left: leftCol,
                right: rightCol,
                joinType,
              });
            }}
          >
            Save Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinModal;
