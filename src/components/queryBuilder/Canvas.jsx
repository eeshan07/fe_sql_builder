import React, { useCallback, useState } from "react";
import ReactFlow, { addEdge, Controls, Background } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import { addNode, addJoin } from "../../features/queryBuilder/queryBuilderSlice";
import { v4 as uuidv4 } from "uuid";
import JoinModal from "./JoinModal";

export default function Canvas() {
  const dispatch = useDispatch();
  const graph = useSelector((state) => state.queryBuilder.graph);

  const [elements, setElements] = useState([]);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [pendingJoin, setPendingJoin] = useState(null);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const raw = event.dataTransfer.getData("application/reactflow");
      if (!raw) return;

      const table = JSON.parse(raw);

      const nodeId = uuidv4();
      const node = {
        nodeId: nodeId,
        tableName: table.table_name,
        alias: table.table_name.substring(0, 2).toLowerCase()
      };

      dispatch(addNode(node));

      const reactFlowNode = {
        id: nodeId,
        type: "default",
        position: { x: event.clientX - 350, y: event.clientY - 150 },
        data: { label: `${table.table_name} (${node.alias})` }
      };

      setElements((els) => [...els, reactFlowNode]);
    },
    [dispatch]
  );

  const onConnect = useCallback(
    (params) => {
      const joinId = uuidv4();

      setPendingJoin({
        joinId,
        leftNodeId: params.source,
        rightNodeId: params.target
      });

      setJoinModalOpen(true);

      setElements((els) => addEdge(params, els));
    },
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const handleJoinSubmit = (joinData) => {
    dispatch(
      addJoin({
        joinId: pendingJoin.joinId,
        joinType: joinData.joinType,
        leftNodeId: pendingJoin.leftNodeId,
        rightNodeId: pendingJoin.rightNodeId,
        conditions: joinData.conditions
      })
    );

    setJoinModalOpen(false);
    setPendingJoin(null);
  };

  return (
    <div className="canvas-area">
      <ReactFlow
        elements={elements}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onConnect={onConnect}
      >
        <Controls />
        <Background />
      </ReactFlow>

      {joinModalOpen && pendingJoin && (
        <JoinModal
          leftNode={graph.nodes[pendingJoin.leftNodeId]}
          rightNode={graph.nodes[pendingJoin.rightNodeId]}
          onClose={() => setJoinModalOpen(false)}
          onSubmit={handleJoinSubmit}
        />
      )}
    </div>
  );
}
