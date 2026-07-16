import type { Node } from "@xyflow/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BLOCK_MAP } from "@/data/blocks";
import type { FlowNodeData } from "@/data/demoFlow";
import { EmptyState } from "@/components/layout/EmptyState";
import { MousePointer2 } from "lucide-react";

interface Props {
  node?: Node<FlowNodeData>;
  onUpdate: (id: string, data: Partial<FlowNodeData>) => void;
  onDelete: (id: string) => void;
}

export function NodeInspector({ node, onUpdate, onDelete }: Props) {
  if (!node) {
    return (
      <aside className="w-80 border-l bg-background p-4">
        <EmptyState icon={<MousePointer2 className="h-5 w-5" />} title="Selecione um bloco" description="Clique em qualquer bloco no canvas para configurar." />
      </aside>
    );
  }
  const def = BLOCK_MAP[node.data.blockType];
  return (
    <aside className="w-80 space-y-4 overflow-y-auto border-l bg-background p-4">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{def.label}</p>
        <p className="text-sm text-muted-foreground">{def.description}</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input id="title" value={node.data.title} onChange={(e) => onUpdate(node.id, { title: e.target.value })} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="sub">Conteúdo / Descrição</Label>
        <Textarea id="sub" rows={4} value={node.data.subtitle ?? ""} onChange={(e) => onUpdate(node.id, { subtitle: e.target.value })} />
      </div>
      <div className="rounded-md border border-dashed p-3 text-xs text-muted-foreground">
        Configurações específicas de <strong>{def.label}</strong> aparecerão aqui na versão final.
      </div>
      <Button variant="destructive" size="sm" className="w-full" onClick={() => onDelete(node.id)}>
        Excluir bloco
      </Button>
    </aside>
  );
}
