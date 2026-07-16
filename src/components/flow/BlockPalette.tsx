import * as Icons from "lucide-react";
import { BLOCKS, CATEGORY_LABELS } from "@/data/blocks";
import type { BlockDefinition } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Props {
  onDragStart?: (block: BlockDefinition) => void;
}

export function BlockPalette({ onDragStart }: Props) {
  const [q, setQ] = useState("");
  const filtered = BLOCKS.filter((b) => b.label.toLowerCase().includes(q.toLowerCase()));
  const grouped = filtered.reduce<Record<string, BlockDefinition[]>>((acc, b) => {
    (acc[b.category] ||= []).push(b); return acc;
  }, {});

  return (
    <aside className="flex h-full w-64 flex-col border-r bg-background">
      <div className="border-b p-3">
        <p className="mb-2 text-xs font-medium uppercase text-muted-foreground">Blocos</p>
        <Input placeholder="Buscar bloco…" value={q} onChange={(e) => setQ(e.target.value)} className="h-8 text-sm" />
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-4 p-3">
          {Object.entries(grouped).map(([cat, items]) => (
            <div key={cat}>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                {CATEGORY_LABELS[cat as BlockDefinition["category"]]}
              </p>
              <div className="space-y-1">
                {items.map((b) => {
                  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[b.icon] ?? Icons.Square;
                  return (
                    <div
                      key={b.type}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("application/atto-block", b.type);
                        e.dataTransfer.effectAllowed = "move";
                        onDragStart?.(b);
                      }}
                      className="flex cursor-grab items-center gap-2 rounded-md border bg-card px-2 py-1.5 text-xs transition hover:border-primary hover:shadow-sm active:cursor-grabbing"
                    >
                      <Icon className="h-3.5 w-3.5 text-primary" />
                      <span className="truncate">{b.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
}
