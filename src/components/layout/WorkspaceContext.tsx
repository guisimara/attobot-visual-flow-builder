import { Check } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { workspace, channels } from "@/data/mock";
import { useCurrentWorkspace } from "@/hooks/use-current-workspace";

/**
 * Compact workspace + channel context strip shown in the sidebar header.
 * Kept intentionally light — no dropdown yet — because the demo only has
 * one active workspace. Structure is ready for a real switcher.
 */
export function WorkspaceContext({ collapsed }: { collapsed: boolean }) {
  const current = useCurrentWorkspace();
  const primaryChannel = channels.find((c) => c.workspaceId === (current?.id ?? workspace.id) && c.type === "whatsapp");

  if (collapsed) {
    return (
      <div className="flex items-center justify-center py-2" title={current?.name}>
        <div className="grid h-8 w-8 place-items-center rounded-md bg-primary/10 text-xs font-semibold text-primary">
          {(current?.name ?? "AT").slice(0, 2).toUpperCase()}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2 px-2 pb-2">
      <div className="flex items-center gap-2 rounded-md border bg-muted/30 px-2 py-1.5">
        <div className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-primary/10 text-[11px] font-semibold text-primary">
          {(current?.name ?? "AT").slice(0, 2).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium">{current?.name}</p>
          <p className="truncate text-[10px] text-muted-foreground">{current?.planLabel}</p>
        </div>
      </div>
      {primaryChannel?.number && (
        <div className="flex items-center gap-1.5 px-1 text-[10px] text-muted-foreground">
          <Check className="h-3 w-3 text-primary" />
          <span className="truncate">WhatsApp {primaryChannel.number}</span>
          <Badge variant="outline" className="ml-auto h-4 px-1 text-[9px]">demo</Badge>
        </div>
      )}
      <Link to="/app/settings" className="block px-1 text-[10px] text-muted-foreground hover:text-foreground">
        Trocar workspace →
      </Link>
    </div>
  );
}
