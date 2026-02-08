import React from "react";
import { Handle, Position } from "reactflow";

const TableNode = ({ data }) => {
  return (
    <div
      style={{
        minWidth: "200px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        background: "#fff",
        overflow: "hidden",
        boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          padding: "10px",
          background: "#007bff",
          color: "white",
          fontWeight: "bold",
          fontSize: "14px",
        }}
      >
        {data?.tableName || "Unknown Table"}
      </div>

      {/* COLUMNS */}
      <div style={{ padding: "10px", fontSize: "12px" }}>
        {data?.columns?.length > 0 ? (
          data.columns.slice(0, 8).map((col, idx) => (
            <div key={idx} style={{ marginBottom: "4px" }}>
              {col.name}{" "}
              <span style={{ color: "#777" }}>({col.type})</span>
            </div>
          ))
        ) : (
          <div style={{ color: "red" }}>No columns</div>
        )}

        {data?.columns?.length > 8 && (
          <div style={{ color: "#555" }}>
            + {data.columns.length - 8} more...
          </div>
        )}
      </div>

      {/* CONNECTION HANDLES */}
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default TableNode;
