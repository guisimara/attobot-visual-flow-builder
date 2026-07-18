import { useCallback, useMemo, useRef, useState } from "react";
import {
  Background, BackgroundVariant, Controls, MiniMap, ReactFlow, ReactFlowProvider,
  addEdge, useEdgesState, useNodesState, useReactFlow,
  type Connection, type Edge, type Node, type NodeChange,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { AttoBlockNode } from "./AttoBlockNode";
import { BlockPalette } from "./BlockPalette";
import { NodeInspector } from "./NodeInspector";
import { WhatsAppSimulator } from "./WhatsAppSimulator";
import { demoEdges, demoNodes, type FlowNodeData } from "@/data/demoFlow";
import { BLOCK_MAP } from "@/data/blocks";
import type { BlockType } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Save, PlayCircle, ShieldCheck, Rocket, MessageCircle, PanelLeft, PanelRight,
} from "lucide-react";
import { toast } from "sonner";

const nodeTypes = { attoBlock: AttoBlockNode };

interface Props {
  flowName: string;
}

function FlowEditorInner({ flowName }: Props) {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<FlowNodeData>>(demoNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(demoEdges);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showSim, setShowSim] = useState(false);
  const [showPalette, setShowPalette] = useState(true);
  const [showInspector, setShowInspector] = useState(true);
  const [name, setName] = useState(flowName);
  const wrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();

  const selectedNode = useMemo(() => nodes.find((n) => n.id === selectedId), [nodes, selectedId]);

  const onConnect = useCallback((c: Connection) => setEdges((eds) => addEdge({ ...c, animated: false }, eds)), [setEdges]);

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const type = event.dataTransfer.getData("application/atto-block") as BlockType;
    if (!type) return;
    const def = BLOCK_MAP[type];
    const position = screenToFlowPosition({ x: event.clientX, y: event.clientY });
    const newNode: Node<FlowNodeData> = {
      id: `n_${Date.now()}`,
      type: "attoBlock",
      position,
      data: { blockType: type, title: def.label, subtitle: def.description },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [screenToFlowPosition, setNodes]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const updateNode = useCallback((id: string, data: Partial<FlowNodeData>) => {
    setNodes((nds) => nds.map((n) => (n.id === id ? { ...n, data: { ...n.data, ...data } } : n)));
  }, [setNodes]);

  const deleteNode = useCallback((id: string) => {
    setNodes((nds) => nds.filter((n) => n.id !== id));
    setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
    setSelectedId(null);
  }, [setNodes, setEdges]);

  const handleNodesChange = useCallback((changes: NodeChange<Node<FlowNodeData>>[]) => {
    onNodesChange(changes);
    const sel = changes.find((c) => c.type === "select" && c.selected);
    if (sel && "id" in sel) setSelectedId(sel.id as string);
  }, [onNodesChange]);

  return (
    <div className="flex h-full flex-col">
      {/* Top bar */}
      <div className="flex flex-wrap items-center gap-2 border-b bg-background px-3 py-2">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setShowPalette((v) => !v)} aria-label="Alternar paleta">
          <PanelLeft className="h-4 w-4" />
        </Button>
        <Input value={name} onChange={(e) => setName(e.target.value)} className="h-8 min-w-0 max-w-[180px] flex-1 border-transparent bg-transparent px-2 font-semibold hover:border-input sm:max-w-xs" />
        <Badge variant="secondary" className="shrink-0">Rascunho</Badge>
        <div className="ml-auto flex flex-wrap items-center gap-1.5">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setShowInspector((v) => !v)} aria-label="Alternar inspetor">
            <PanelRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowSim((v) => !v)}>
            <MessageCircle className="mr-1 h-3.5 w-3.5" /> Simulador
          </Button>
          <Button variant="outline" size="sm" onClick={() => toast.success("Fluxo salvo (demo)")}>
            <Save className="mr-1 h-3.5 w-3.5" /> Salvar
          </Button>
          <Button variant="outline" size="sm" onClick={() => toast.info("Teste iniciado (demo)")}>
            <PlayCircle className="mr-1 h-3.5 w-3.5" /> Testar
          </Button>
          <Button variant="outline" size="sm" onClick={() => toast.success("Fluxo válido ✓ (demo)")}>
            <ShieldCheck className="mr-1 h-3.5 w-3.5" /> Validar
          </Button>
          <Button size="sm" onClick={() => toast.success("Publicado (demo)")}>
            <Rocket className="mr-1 h-3.5 w-3.5" /> Publicar
          </Button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* Palette — collapsible on mobile, fixed on md+ */}
        <div className={`${showPalette ? "block" : "hidden"} md:block absolute md:relative z-20 h-full bg-background md:z-auto`}>
          <BlockPalette />
        </div>
        <div className="relative flex-1" ref={wrapper} onDrop={onDrop} onDragOver={onDragOver}>
          <ReactFlow
            nodes={nodes} edges={edges}
            onNodesChange={handleNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            proOptions={{ hideAttribution: true }}
          >
            <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
            <Controls />
            <MiniMap pannable zoomable className="!bg-card hidden sm:block" />
          </ReactFlow>
        </div>
        {selectedNode && showInspector && (
          <div className="absolute md:relative right-0 z-20 h-full bg-background md:z-auto">
            <NodeInspector node={selectedNode} onUpdate={updateNode} onDelete={deleteNode} />
          </div>
        )}
        {showSim && (
          <div className="absolute md:relative right-0 z-30 h-full bg-background md:z-auto">
            <WhatsAppSimulator />
          </div>
        )}
      </div>
    </div>
  );
}

export function FlowEditor(props: Props) {
  return (
    <ReactFlowProvider>
      <FlowEditorInner {...props} />
    </ReactFlowProvider>
  );
}
