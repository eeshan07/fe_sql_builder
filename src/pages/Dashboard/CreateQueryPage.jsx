import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import QueryBuilderCanvas from "../../components/queryBuilder/QueryBuilderCanvas";
import TablePanel from "../../components/queryBuilder/TablePanel";

import { fetchTables } from "../../features/metadata/metadataSlice";

const CreateQueryPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTables());
  }, [dispatch]);

  return (
    <div style={{ display: "flex", height: "100vh", width: "100%" }}>
      {/* LEFT SIDE TABLE LIST */}
      <div
        style={{
          width: "280px",
          borderRight: "1px solid #ddd",
          background: "#fff",
          overflowY: "auto",
          padding: "10px",
        }}
      >
        <TablePanel />
      </div>

      {/* CANVAS */}
      <div style={{ flex: 1, height: "100%" }}>
        <QueryBuilderCanvas />
      </div>
    </div>
  );
};

export default CreateQueryPage;
