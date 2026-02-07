import React, { useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";

const JoinModal = ({ isOpen, onClose, sourceNode, targetNode, onSave }) => {
  const { tablesByName } = useSelector((state) => state.metadata);

  // Hooks must ALWAYS run (never after a return)
  const [leftCol, setLeftCol] = useState("");
  const [rightCol, setRightCol] = useState("");
  const [joinType, setJoinType] = useState("INNER");

  // Reset dropdown values whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setLeftCol("");
      setRightCol("");
      setJoinType("INNER");
    }
  }, [isOpen]);

  const sourceTable = useMemo(() => {
    if (!sourceNode?.data?.tableName) return null;
    return tablesByName?.[sourceNode.data.tableName] || null;
  }, [tablesByName, sourceNode]);

  const targetTable = useMemo(() => {
    if (!targetNode?.data?.tableName) return null;
    return tablesByName?.[targetNode.data.tableName] || null;
  }, [tablesByName, targetNode]);

  const sourceCols = sourceTable?.columns?.columns || [];
  const targetCols = targetTable?.columns?.columns || [];

  const handleSave = () => {
    if (!leftCol || !rightCol) {
      alert("Please select both join columns.");
      return;
    }

    onSave({
      joinType,
      leftColumn: leftCol,
      rightColumn: rightCol,
    });
  };

  // Render nothing only AFTER hooks are declared
  if (!isOpen) return null;

  // Safe fallback UI if metadata missing
  if (!sourceTable || !targetTable) {
    return (
      <div className="modal-overlay">
        <div className="modal-box">
          <h3>Error</h3>
          <p>Table metadata not loaded properly.</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Create Join</h2>

        <div style={{ marginBottom: "10px" }}>
          <label>Join Type</label>
          <select value={joinType} onChange={(e) => setJoinType(e.target.value)}>
            <option value="INNER">INNER</option>
            <option value="LEFT">LEFT</option>
            <option value="RIGHT">RIGHT</option>
            <option value="FULL">FULL</option>
          </select>
        </div>

        <div className="join-row">
          <div>
            <label>{sourceTable.name} Columns</label>
            <select value={leftCol} onChange={(e) => setLeftCol(e.target.value)}>
              <option value="">Select Column</option>
              {sourceCols.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name} ({c.type})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>{targetTable.name} Columns</label>
            <select value={rightCol} onChange={(e) => setRightCol(e.target.value)}>
              <option value="">Select Column</option>
              {targetCols.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name} ({c.type})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave}>Save Join</button>
        </div>
      </div>
    </div>
  );
};

export default JoinModal;
