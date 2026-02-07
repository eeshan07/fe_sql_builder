import React, { useCallback, useMemo, useState } from "react";
import ReactFlow, {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Background,
  Controls,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";

import { useSelector } from "react-redux";
import JoinModal from "./JoinModal";

const QueryBuilderCanvas = () => {
  const { tablesByName } = useSelector((state) => state.metadata);

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [pendingConnection, setPendingConnection] = useState(null);

  const [joins, setJoins] = useState([]); // store join metadata

  const nodeTypes = useMemo(() => ({}), []);

  // Node movement support
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  // When user creates connection between two tables
  const onConnect = useCallback((params) => {
    setPendingConnection(params);
    setJoinModalOpen(true);
  }, []);

  const handleJoinSave = (joinData) => {
    if (!pendingConnection) return;

    const newEdge = {
      ...pendingConnection,
      id: `e-${pendingConnection.source}-${pendingConnection.target}-${Date.now()}`,
      label: `${joinData.joinType}: ${joinData.leftColumn} = ${joinData.rightColumn}`,
      animated: true,
      style: { strokeWidth: 2 },
    };

    setEdges((eds) => [...eds, newEdge]);

    setJoins((prev) => [
      ...prev,
      {
        source: pendingConnection.source,
        target: pendingConnection.target,
        ...joinData,
      },
    ]);

    setJoinModalOpen(false);
    setPendingConnection(null);
  };

  // Allow drop
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Drop table on canvas
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const tableName = event.dataTransfer.getData("tableName");

      if (!tableName) return;

      const table = tablesByName?.[tableName];
      if (!table) return;

      const reactFlowBounds = event.currentTarget.getBoundingClientRect();

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const nodeId = `${tableName}-${Date.now()}`;

      const newNode = {
        id: nodeId,
        position,
        data: {
          label: tableName,
          tableName: tableName,
        },
        style: {
          padding: 10,
          borderRadius: 8,
          border: "1px solid #888",
          background: "#fff",
          minWidth: 180,
        },
      };

      setNodes((prev) => [...prev, newNode]);
    },
    [tablesByName]
  );

  const resetCanvas = () => {
    setNodes([]);
    setEdges([]);
    setJoins([]);
  };

  const generateSQL = () => {
    if (nodes.length === 0) {
      alert("No tables added.");
      return;
    }

    const tableNames = nodes.map((n) => n.data.tableName);

    let sql = `SELECT *\nFROM ${tableNames[0]}`;

    joins.forEach((j) => {
      const sourceTable = nodes.find((n) => n.id === j.source)?.data?.tableName;
      const targetTable = nodes.find((n) => n.id === j.target)?.data?.tableName;

      if (!sourceTable || !targetTable) return;

      sql += `\n${j.joinType} JOIN ${targetTable} ON ${sourceTable}.${j.leftColumn} = ${targetTable}.${j.rightColumn}`;
    });

    sql += ";";

    alert(sql);
  };

  return (
    <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
      {/* TOP BAR (RESTORED) */}
      <div
        style={{
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 15px",
          borderBottom: "1px solid #ddd",
          background: "#f8f8f8",
        }}
      >
        <div>
          <h3 style={{ margin: 0 }}>Query Builder</h3>
          <small style={{ color: "#666" }}>
            Tables: {nodes.length} | Joins: {edges.length}
          </small>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={resetCanvas} style={{ padding: "8px 14px" }}>
            Reset
          </button>
          <button onClick={generateSQL} style={{ padding: "8px 14px" }}>
            Generate SQL
          </button>
        </div>
      </div>

      {/* REACTFLOW AREA */}
      <div style={{ flex: 1, width: "100%" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          nodesDraggable={true}
          panOnDrag={true}
          zoomOnScroll={true}
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>

      {/* JOIN MODAL */}
      <JoinModal
        isOpen={joinModalOpen}
        onClose={() => {
          setJoinModalOpen(false);
          setPendingConnection(null);
        }}
        sourceNode={nodes.find((n) => n.id === pendingConnection?.source)}
        targetNode={nodes.find((n) => n.id === pendingConnection?.target)}
        onSave={handleJoinSave}
      />
    </div>
  );
};

export default QueryBuilderCanvas;
