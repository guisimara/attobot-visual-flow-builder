import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { channels } from "@/data/mock";
import { MessageCircle, Instagram, Globe, Mail } from "lucide-react";

export const Route = createFileRoute("/app/channels")({ component: Channels });

const ICONS = { whatsapp: MessageCircle, instagram: Instagram, webchat: Globe, email: Mail } as const;

function Channels() {
  return (
    <div>
      <PageHeader title="Canais" description="Números e canais conectados ao AttoBot." />
      <div className="grid gap-4 p-6 md:grid-cols-2 lg:grid-cols-3">
        {channels.map((c) => {
          const Icon = ICONS[c.type];
          return (
            <Card key={c.id}>
              <CardHeader>
                <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="h-4 w-4" /></div>
                <CardTitle>{c.label}</CardTitle>
                <CardDescription>{c.number ?? "—"}</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <Badge variant={c.status === "connected" ? "default" : c.status === "demo" ? "secondary" : "outline"}>
                  {c.status === "demo" ? "Demonstração" : c.status === "connected" ? "Conectado" : "Desconectado"}
                </Badge>
                <Button size="sm" variant="outline">Configurar</Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
