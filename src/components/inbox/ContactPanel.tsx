import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { tags as allTags, flows, team } from "@/data/mock";
import type { Contact } from "@/types";

interface Props { contact: Contact; }

export function ContactPanel({ contact }: Props) {
  const contactTags = allTags.filter((t) => contact.tags.includes(t.id));
  const flow = flows.find((f) => f.id === contact.currentFlowId);
  const owner = team.find((t) => t.id === contact.ownerId);

  return (
    <ScrollArea className="h-full border-l">
      <div className="space-y-6 p-4">
        <div className="text-center">
          <Avatar className="mx-auto h-16 w-16"><AvatarFallback className="text-lg">{contact.name.slice(0,2).toUpperCase()}</AvatarFallback></Avatar>
          <p className="mt-3 font-medium">{contact.name}</p>
          <p className="text-xs text-muted-foreground">{contact.phone}</p>
          {contact.email && <p className="text-xs text-muted-foreground">{contact.email}</p>}
        </div>

        <Section title="Tags">
          <div className="flex flex-wrap gap-1">
            {contactTags.map((t) => (
              <Badge key={t.id} variant="outline" style={{ borderColor: t.color, color: t.color }}>{t.name}</Badge>
            ))}
            <Button variant="ghost" size="sm" className="h-6 text-xs">+ Adicionar</Button>
          </div>
        </Section>

        <Section title="Responsável">
          {owner ? <p className="text-sm">{owner.name}</p> : <p className="text-xs text-muted-foreground">Sem atendente</p>}
        </Section>

        <Section title="Fluxo atual">
          {flow ? (
            <div>
              <p className="text-sm">{flow.name}</p>
              <p className="text-xs text-muted-foreground">Gatilho: {flow.trigger}</p>
            </div>
          ) : <p className="text-xs text-muted-foreground">Nenhum fluxo ativo</p>}
        </Section>

        <Section title="Campos personalizados">
          {Object.keys(contact.fields).length === 0 ? (
            <p className="text-xs text-muted-foreground">Nenhum campo preenchido</p>
          ) : (
            <dl className="space-y-1 text-sm">
              {Object.entries(contact.fields).map(([k, v]) => (
                <div key={k} className="flex justify-between"><dt className="text-muted-foreground">{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
          )}
        </Section>

        <Section title="Notas">
          <p className="rounded-md border border-dashed p-3 text-xs text-muted-foreground">Adicione anotações internas visíveis apenas para a equipe.</p>
        </Section>

        <Separator />
        <div>
          <p className="mb-2 text-xs font-medium uppercase text-muted-foreground">Ações rápidas</p>
          <div className="flex flex-col gap-1.5">
            <Button variant="outline" size="sm">Marcar como aguardando</Button>
            <Button variant="outline" size="sm">Reabrir conversa</Button>
            <Button variant="outline" size="sm">Iniciar automação</Button>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase text-muted-foreground">{title}</p>
      {children}
    </div>
  );
}
