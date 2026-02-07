import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateSQL, executeHiveSQL } from "../../features/queryBuilder/queryBuilderThunks";
import { saveQuery } from "../../features/savedQueries/savedQueriesThunks";

export default function QueryPreview() {
  const dispatch = useDispatch();
  const { graph, sql, results, loading } = useSelector((state) => state.queryBuilder);

  const [queryName, setQueryName] = useState("");

  const handleGenerate = () => {
    dispatch(generateSQL(graph));
  };

  const handleExecute = () => {
    if (!sql) return alert("Generate SQL first");
    dispatch(executeHiveSQL(sql));
  };

  const handleSave = () => {
    if (!sql) return alert("Generate SQL first");
    if (!queryName) return alert("Enter query name");

    dispatch(
      saveQuery({
        query_name: queryName,
        sql_query: sql,
        query_graph: graph
      })
    );
  };

  return (
    <div className="query-preview">
      <h3>Query Preview</h3>

      <div className="query-actions">
        <button className="btn-primary" onClick={handleGenerate}>
          Generate SQL
        </button>

        <button className="btn-secondary" onClick={handleExecute}>
          Execute Hive
        </button>
      </div>

      {loading && <p>Loading...</p>}

      <textarea value={sql} readOnly rows={10} />

      <div className="save-box">
        <input
          placeholder="Enter Query Name"
          value={queryName}
          onChange={(e) => setQueryName(e.target.value)}
        />

        <button className="btn-primary" onClick={handleSave}>
          Save Query
        </button>
      </div>

      {results && (
        <div className="results">
          <h4>Execution Result</h4>
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
