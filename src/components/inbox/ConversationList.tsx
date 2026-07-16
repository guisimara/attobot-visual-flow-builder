import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Conversation, Contact } from "@/types";

interface Props {
  conversations: Conversation[];
  contactsMap: Record<string, Contact>;
  selectedId?: string;
  onSelect: (id: string) => void;
}

const STATUS_LABEL: Record<Conversation["status"], string> = {
  open: "Aberta", waiting: "Aguardando", resolved: "Resolvida", snoozed: "Adiada",
};

export function ConversationList({ conversations, contactsMap, selectedId, onSelect }: Props) {
  const [q, setQ] = useState("");
  const filtered = conversations.filter((c) => {
    const contact = contactsMap[c.contactId];
    return !q || contact?.name.toLowerCase().includes(q.toLowerCase());
  });

  return (
    <div className="flex h-full flex-col border-r">
      <div className="border-b p-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar conversas…" className="h-9 pl-8" />
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {["Todas", "Aguardando", "Minhas", "Bot ativo"].map((f, i) => (
            <Badge key={f} variant={i === 0 ? "default" : "outline"} className="cursor-pointer">{f}</Badge>
          ))}
        </div>
      </div>
      <ScrollArea className="flex-1">
        <ul>
          {filtered.map((c) => {
            const contact = contactsMap[c.contactId];
            const active = c.id === selectedId;
            return (
              <li key={c.id}>
                <button
                  onClick={() => onSelect(c.id)}
                  className={cn(
                    "flex w-full gap-3 border-b px-3 py-3 text-left transition hover:bg-muted/50",
                    active && "bg-muted",
                  )}
                >
                  <Avatar className="h-9 w-9"><AvatarFallback>{contact?.name.slice(0,2).toUpperCase()}</AvatarFallback></Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-medium">{contact?.name}</p>
                      <span className="text-[10px] text-muted-foreground">{new Date(c.lastMessageAt).toLocaleDateString()}</span>
                    </div>
                    <p className="truncate text-xs text-muted-foreground">{c.lastMessage}</p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <Badge variant="outline" className="text-[10px]">{STATUS_LABEL[c.status]}</Badge>
                      {c.botActive && <Badge variant="secondary" className="text-[10px]">Bot</Badge>}
                      {c.unread > 0 && <Badge className="ml-auto text-[10px]">{c.unread}</Badge>}
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </ScrollArea>
    </div>
  );
}
