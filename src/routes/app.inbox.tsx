import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, User } from "lucide-react";
import { ConversationList } from "@/components/inbox/ConversationList";
import { ConversationThread } from "@/components/inbox/ConversationThread";
import { ContactPanel } from "@/components/inbox/ContactPanel";
import { conversations, contacts } from "@/data/mock";
import { EmptyState } from "@/components/layout/EmptyState";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export const Route = createFileRoute("/app/inbox")({ component: Inbox });

function Inbox() {
  const contactsMap = useMemo(() => Object.fromEntries(contacts.map((c) => [c.id, c])), []);
  const [selectedId, setSelectedId] = useState<string | undefined>(conversations[0]?.id);
  const selected = selectedId ? conversations.find((c) => c.id === selectedId) : undefined;
  const contact = selected ? contactsMap[selected.contactId] : undefined;

  return (
    <div className="grid h-[calc(100vh-3.5rem)] grid-cols-1 md:grid-cols-[300px_1fr] xl:grid-cols-[300px_1fr_320px]">
      {/* Left list — hidden on mobile once a conversation is open */}
      <div className={selected ? "hidden md:block" : "block"}>
        <ConversationList
          conversations={conversations}
          contactsMap={contactsMap}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </div>

      {/* Middle thread */}
      {selected && contact ? (
        <div className="flex min-w-0 flex-col">
          <div className="flex items-center gap-2 border-b bg-background/80 px-2 py-1 md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setSelectedId(undefined)}>
              <ArrowLeft className="mr-1 h-4 w-4" /> Conversas
            </Button>
            <div className="ml-auto">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm"><User className="mr-1 h-4 w-4" /> Contato</Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[320px] p-0 sm:max-w-sm">
                  <SheetHeader className="border-b px-4 py-3"><SheetTitle>Detalhes do contato</SheetTitle></SheetHeader>
                  <ContactPanel contact={contact} />
                </SheetContent>
              </Sheet>
            </div>
          </div>
          <div className="min-h-0 flex-1">
            <ConversationThread conversation={selected} contact={contact} />
          </div>
        </div>
      ) : (
        <div className="hidden items-center justify-center p-6 md:flex">
          <EmptyState title="Selecione uma conversa" description="Ou crie uma nova a partir de um contato." />
        </div>
      )}

      {/* Right panel — only on wide screens; mobile/tablet uses the Sheet above */}
      {selected && contact && (
        <div className="hidden xl:block">
          <ContactPanel contact={contact} />
        </div>
      )}
    </div>
  );
}
