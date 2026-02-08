import React, { useRef } from "react";
import QueryBuilderCanvas from "../../components/queryBuilder/QueryBuilderCanvas";
import TablePanel from "../../components/queryBuilder/TablePanel";

const CreateQueryPage = () => {
  const canvasRef = useRef(null);

  return (
    <div style={{ display: "flex", height: "100vh", width: "100%" }}>
      {/* LEFT SIDE */}
      <div
        style={{
          width: "320px",
          borderRight: "1px solid #ddd",
          background: "#fff",
          overflowY: "auto",
          padding: "10px",
        }}
      >
        <TablePanel
          onAddTable={(table) => {
            if (canvasRef.current) {
              canvasRef.current.addTable(table);
            }
          }}
        />
      </div>

      {/* CANVAS */}
      <div style={{ flex: 1, height: "100%" }}>
        <QueryBuilderCanvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default CreateQueryPage;
