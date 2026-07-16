import { Handle, Position, type NodeProps } from "@xyflow/react";
import * as Icons from "lucide-react";
import { BLOCK_MAP } from "@/data/blocks";
import type { FlowNodeData } from "@/data/demoFlow";
import { cn } from "@/lib/utils";

const CATEGORY_COLORS: Record<string, string> = {
  start: "border-emerald-500/60 bg-emerald-50 dark:bg-emerald-950/30",
  send: "border-sky-500/60 bg-sky-50 dark:bg-sky-950/30",
  capture: "border-amber-500/60 bg-amber-50 dark:bg-amber-950/30",
  logic: "border-violet-500/60 bg-violet-50 dark:bg-violet-950/30",
  action: "border-primary/60 bg-primary/5",
  end: "border-rose-500/60 bg-rose-50 dark:bg-rose-950/30",
};

export function AttoBlockNode({ data, selected }: NodeProps) {
  const nodeData = data as FlowNodeData;
  const def = BLOCK_MAP[nodeData.blockType];
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[def.icon] ?? Icons.Square;
  const colorClass = CATEGORY_COLORS[def.category];

  return (
    <div className={cn(
      "min-w-[220px] rounded-lg border-2 bg-card p-3 shadow-sm transition",
      colorClass,
      selected && "ring-2 ring-primary ring-offset-2 ring-offset-background",
    )}>
      <Handle type="target" position={Position.Top} className="!h-2 !w-2 !bg-primary" />
      <div className="flex items-start gap-2">
        <div className="rounded-md bg-background/70 p-1.5"><Icon className="h-4 w-4" /></div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-muted-foreground">{def.label}</p>
          <p className="truncate text-sm font-semibold">{nodeData.title}</p>
          {nodeData.subtitle && (
            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{nodeData.subtitle}</p>
          )}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!h-2 !w-2 !bg-primary" />
    </div>
  );
}
