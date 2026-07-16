import { Paperclip, Send, Smile, UserCheck, ArrowRightLeft, Pause, StickyNote, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Conversation, Contact } from "@/types";

interface Props {
  conversation: Conversation;
  contact: Contact;
}

export function ConversationThread({ conversation, contact }: Props) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar><AvatarFallback>{contact.name.slice(0,2).toUpperCase()}</AvatarFallback></Avatar>
          <div>
            <p className="text-sm font-medium">{contact.name}</p>
            <p className="text-xs text-muted-foreground">{contact.phone} · WhatsApp</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1">
          <Button size="sm" variant="outline"><UserCheck className="mr-1 h-3.5 w-3.5" /> Assumir</Button>
          <Button size="sm" variant="outline"><ArrowRightLeft className="mr-1 h-3.5 w-3.5" /> Transferir</Button>
          <Button size="sm" variant="outline"><Pause className="mr-1 h-3.5 w-3.5" /> {conversation.botActive ? "Pausar bot" : "Retomar bot"}</Button>
          <Button size="sm" variant="outline"><StickyNote className="mr-1 h-3.5 w-3.5" /> Nota</Button>
          <Button size="sm"><CheckCircle2 className="mr-1 h-3.5 w-3.5" /> Resolver</Button>
        </div>
      </div>

      <ScrollArea className="flex-1 bg-muted/20 px-4 py-4">
        <div className="space-y-3">
          {conversation.messages.map((m) => {
            if (m.direction === "system") {
              return (
                <div key={m.id} className="text-center">
                  <Badge variant="outline" className="text-[10px]">{m.content}</Badge>
                </div>
              );
            }
            const out = m.direction === "out";
            return (
              <div key={m.id} className={cn("flex", out ? "justify-end" : "justify-start")}>
                <div className={cn(
                  "max-w-[70%] rounded-2xl px-4 py-2 text-sm shadow-sm",
                  out ? "bg-primary text-primary-foreground" : "bg-card border",
                )}>
                  {m.authorName && out && <p className="text-[10px] opacity-80">{m.authorName}</p>}
                  <p>{m.content}</p>
                  <p className={cn("mt-1 text-[10px]", out ? "text-primary-foreground/70" : "text-muted-foreground")}>
                    {new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      <div className="border-t p-3">
        <div className="flex items-end gap-2">
          <Button variant="ghost" size="icon"><Paperclip className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon"><Smile className="h-4 w-4" /></Button>
          <Textarea placeholder="Escreva uma resposta…" className="min-h-[40px] resize-none" rows={1} />
          <Button size="icon"><Send className="h-4 w-4" /></Button>
        </div>
      </div>
    </div>
  );
}
