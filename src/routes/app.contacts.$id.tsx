import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { contacts, tags, flows, conversations } from "@/data/mock";

export const Route = createFileRoute("/app/contacts/$id")({ component: ContactDetail });

function ContactDetail() {
  const { id } = Route.useParams();
  const contact = contacts.find((c) => c.id === id);
  if (!contact) return <div className="p-6">Contato não encontrado. <Link to="/app/contacts" className="text-primary">Voltar</Link></div>;
  const contactTags = tags.filter((t) => contact.tags.includes(t.id));
  const contactConversations = conversations.filter((c) => c.contactId === contact.id);

  return (
    <div>
      <PageHeader title={contact.name} description={`${contact.phone} · ${contact.email ?? "sem e-mail"}`}
        actions={<><Button variant="outline">Editar</Button><Button>Iniciar conversa</Button></>} />
      <div className="grid gap-6 p-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Card>
            <CardHeader><CardTitle>Timeline</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {contactConversations.flatMap((c) => c.messages.slice(-3).map((m) => (
                  <li key={c.id + m.id} className="flex gap-3">
                    <Avatar className="h-8 w-8"><AvatarFallback>{m.direction === "in" ? contact.name.slice(0,2).toUpperCase() : "BOT"}</AvatarFallback></Avatar>
                    <div>
                      <p className="text-sm">{m.content}</p>
                      <p className="text-xs text-muted-foreground">{new Date(m.createdAt).toLocaleString("pt-BR")}</p>
                    </div>
                  </li>
                )))}
                {contactConversations.length === 0 && <li className="text-sm text-muted-foreground">Nenhuma interação ainda.</li>}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Automações</CardTitle></CardHeader>
            <CardContent className="text-sm">
              {contact.currentFlowId ? (
                <p>Em execução: <strong>{flows.find((f) => f.id === contact.currentFlowId)?.name}</strong></p>
              ) : <p className="text-muted-foreground">Nenhuma automação em execução.</p>}
            </CardContent>
          </Card>
        </div>
        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle>Tags</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-1">
              {contactTags.map((t) => <Badge key={t.id} variant="outline" style={{ borderColor: t.color, color: t.color }}>{t.name}</Badge>)}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Campos</CardTitle></CardHeader>
            <CardContent>
              <dl className="space-y-1 text-sm">
                {Object.entries(contact.fields).map(([k, v]) => (
                  <div key={k} className="flex justify-between"><dt className="text-muted-foreground">{k}</dt><dd>{v}</dd></div>
                ))}
                {Object.keys(contact.fields).length === 0 && <p className="text-xs text-muted-foreground">Nenhum campo</p>}
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
