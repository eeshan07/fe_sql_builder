import React, { useCallback, useRef, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import JoinModal from "./JoinModal";
import { parseColumns } from "../../utils/parseColumns";

let id = 0;
const getId = () => `node_${id++}`;

const QueryBuilderCanvas = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [joinInfo, setJoinInfo] = useState(null);

  // -------------------------------
  // DRAG OVER (required)
  // -------------------------------
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // -------------------------------
  // DROP TABLE INTO CANVAS
  // -------------------------------
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (!reactFlowInstance) return;

      const tableRaw = event.dataTransfer.getData("application/reactflow");
      if (!tableRaw) return;

      const table = JSON.parse(tableRaw);

      const bounds = reactFlowWrapper.current.getBoundingClientRect();

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const tableCols = parseColumns(table.columns);

      const newNode = {
        id: getId(),
        position,
        data: {
          tableId: table.id,
          tableName: table.name,
          columns: tableCols,
        },
        type: "default",
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [reactFlowInstance, setNodes]
  );

  // -------------------------------
  // CONNECT (JOIN)
  // -------------------------------
  const onConnect = useCallback(
    (params) => {
      const sourceNode = nodes.find((n) => n.id === params.source);
      const targetNode = nodes.find((n) => n.id === params.target);

      if (!sourceNode || !targetNode) return;

      setJoinInfo({
        sourceNode,
        targetNode,
        params,
      });

      setJoinModalOpen(true);
    },
    [nodes]
  );

  // -------------------------------
  // SAVE JOIN
  // -------------------------------
  const handleSaveJoin = (joinCondition) => {
    if (!joinInfo) return;

    const { params, sourceNode, targetNode } = joinInfo;

    setEdges((eds) =>
      addEdge(
        {
          ...params,
          label: `${sourceNode.data.tableName}.${joinCondition.left} = ${targetNode.data.tableName}.${joinCondition.right}`,
          data: joinCondition,
        },
        eds
      )
    );

    setJoinModalOpen(false);
    setJoinInfo(null);
  };

  const handleCloseJoin = () => {
    setJoinModalOpen(false);
    setJoinInfo(null);
  };

  return (
    <div style={{ width: "100%", height: "100%" }} ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onInit={setReactFlowInstance}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>

      {joinModalOpen && joinInfo && (
        <JoinModal
          open={joinModalOpen}
          sourceNode={joinInfo.sourceNode}
          targetNode={joinInfo.targetNode}
          onClose={handleCloseJoin}
          onSave={handleSaveJoin}
        />
      )}
    </div>
  );
};

export default QueryBuilderCanvas;
