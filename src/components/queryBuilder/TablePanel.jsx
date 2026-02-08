import React, { useEffect, useState } from "react";
import axios from "axios";
import { parseColumns } from "../../utils/parseColumns";

const TablePanel = () => {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8002/api/metadata/tables")
      .then((res) => setTables(res.data || []))
      .catch((err) => console.error("Error fetching tables:", err));
  }, []);

  const onDragStart = (event, table) => {
    event.dataTransfer.setData("application/reactflow", JSON.stringify(table));
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div>
      <h3 style={{ marginBottom: "10px" }}>Tables</h3>

      {tables.map((table) => {
        const cols = parseColumns(table.columns);

        return (
          <div
            key={table.id}
            draggable
            onDragStart={(e) => onDragStart(e, table)}
            style={{
              border: "1px solid #ddd",
              borderRadius: "6px",
              padding: "10px",
              marginBottom: "10px",
              cursor: "grab",
              background: "#fff",
            }}
          >
            <strong>{table.name}</strong>

            <div style={{ marginTop: "8px", fontSize: "12px", color: "#444" }}>
              {cols.slice(0, 6).map((c, idx) => (
                <div key={idx}>
                  {c.name} <span style={{ color: "#888" }}>({c.type})</span>
                </div>
              ))}

              {cols.length > 6 && (
                <div style={{ color: "#666" }}>+ {cols.length - 6} more...</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TablePanel;
