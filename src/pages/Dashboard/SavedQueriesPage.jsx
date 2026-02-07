import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSavedQueries, deleteQuery } from "../../features/savedQueries/savedQueriesSlice";
import { setQueryGraph } from "../../features/queryBuilder/queryBuilderSlice";
import { useNavigate } from "react-router-dom";

export default function SavedQueriesPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, loading } = useSelector((state) => state.savedQueries);

  useEffect(() => {
    dispatch(fetchSavedQueries());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteQuery(id));
  };

  const handleOpen = (query) => {
    if (!query.query_graph) {
      alert("This saved query does not contain graph data.");
      return;
    }

    dispatch(setQueryGraph(query.query_graph));
    navigate("/app/create");
  };

  

  return (
    <div className="page">
      <div className="page-header">
        <h1>Saved Queries</h1>
      </div>

      {loading && <p>Loading...</p>}

      {!loading && list.length === 0 && (
        <div className="empty-state">
          <h2>No Saved Queries</h2>
          <p>Create your first query using drag & drop builder.</p>
        </div>
      )}

      {!loading && list.length > 0 && (
        <div className="saved-list">
          {list.map((q) => (
            <div key={q.id} className="saved-card">
              <h3>{q.query_name || q.name}</h3>
              <pre className="sql-preview">{q.sql_query}</pre>

              <div className="card-actions">
                <button className="btn primary" onClick={() => handleOpen(q)}>
                  Open
                </button>

                <button
                  className="btn danger"
                  onClick={() => handleDelete(q.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
