import React, { useState } from "react";

export default function SaveQueryModal({ onClose, onSave }) {
  const [queryName, setQueryName] = useState("");

  const handleSave = () => {
    if (!queryName.trim()) {
      alert("Query name is required");
      return;
    }
    onSave(queryName);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Save Query</h2>

        <div className="form-row">
          <label>Query Name</label>
          <input
            placeholder="Enter query name"
            value={queryName}
            onChange={(e) => setQueryName(e.target.value)}
          />
        </div>

        <div className="modal-actions">
          <button className="btn ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="btn primary" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
