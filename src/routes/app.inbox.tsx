import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ConversationList } from "@/components/inbox/ConversationList";
import { ConversationThread } from "@/components/inbox/ConversationThread";
import { ContactPanel } from "@/components/inbox/ContactPanel";
import { conversations, contacts } from "@/data/mock";
import { EmptyState } from "@/components/layout/EmptyState";

export const Route = createFileRoute("/app/inbox")({ component: Inbox });

function Inbox() {
  const contactsMap = useMemo(() => Object.fromEntries(contacts.map((c) => [c.id, c])), []);
  const [selectedId, setSelectedId] = useState(conversations[0]?.id);
  const selected = conversations.find((c) => c.id === selectedId);
  const contact = selected ? contactsMap[selected.contactId] : undefined;

  return (
    <div className="grid h-[calc(100vh-3.5rem)] grid-cols-[320px_1fr_320px]">
      <ConversationList conversations={conversations} contactsMap={contactsMap} selectedId={selectedId} onSelect={setSelectedId} />
      {selected && contact ? (
        <>
          <ConversationThread conversation={selected} contact={contact} />
          <ContactPanel contact={contact} />
        </>
      ) : (
        <div className="col-span-2 flex items-center justify-center p-6">
          <EmptyState title="Selecione uma conversa" description="Ou crie uma nova a partir de um contato." />
        </div>
      )}
    </div>
  );
}
