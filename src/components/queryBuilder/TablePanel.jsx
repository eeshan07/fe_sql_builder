import React from "react";
import { useSelector } from "react-redux";

const TablePanel = () => {
  const { tables, loading } = useSelector((state) => state.metadata);

  if (loading) return <p>Loading tables...</p>;

  if (!tables || tables.length === 0) return <p>No tables loaded</p>;

  return (
    <div>
      <h3>Tables</h3>

      {tables.map((t) => (
        <div
          key={t.id}
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData("tableName", t.name);
          }}
          style={{
            padding: "10px",
            marginBottom: "8px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            cursor: "grab",
          }}
        >
          {t.name}
        </div>
      ))}
    </div>
  );
};

export default TablePanel;
