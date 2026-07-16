import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { tenant } from "@/data/mock";

export const Route = createFileRoute("/app/settings")({ component: Settings });

function Settings() {
  return (
    <div>
      <PageHeader title="Configurações" />
      <div className="p-6">
        <Tabs defaultValue="general">
          <TabsList className="mb-4 flex-wrap">
            <TabsTrigger value="general">Geral</TabsTrigger>
            <TabsTrigger value="service">Atendimento</TabsTrigger>
            <TabsTrigger value="automation">Automação</TabsTrigger>
            <TabsTrigger value="notif">Notificações</TabsTrigger>
            <TabsTrigger value="sec">Segurança</TabsTrigger>
            <TabsTrigger value="lgpd">LGPD</TabsTrigger>
            <TabsTrigger value="dev">Desenvolvedor</TabsTrigger>
          </TabsList>

          <TabsContent value="general"><Card><CardHeader><CardTitle>Workspace</CardTitle><CardDescription>Dados da conta.</CardDescription></CardHeader>
            <CardContent className="space-y-4 max-w-md">
              <div className="space-y-2"><Label>Nome</Label><Input defaultValue={tenant.name} /></div>
              <div className="space-y-2"><Label>Fuso horário</Label><Input defaultValue="America/Sao_Paulo" /></div>
              <Button>Salvar</Button>
            </CardContent></Card></TabsContent>

          <TabsContent value="service"><Card><CardHeader><CardTitle>Atendimento</CardTitle></CardHeader>
            <CardContent className="space-y-4 max-w-md">
              <div className="flex items-center justify-between"><Label>Horário comercial</Label><Switch defaultChecked /></div>
              <div className="flex items-center justify-between"><Label>Mensagem fora do expediente</Label><Switch defaultChecked /></div>
              <div className="flex items-center justify-between"><Label>Distribuir conversas automaticamente</Label><Switch /></div>
            </CardContent></Card></TabsContent>

          <TabsContent value="automation"><Card><CardHeader><CardTitle>Automação</CardTitle></CardHeader>
            <CardContent className="space-y-4 max-w-md">
              <div className="flex items-center justify-between"><Label>Pausar bot ao humano responder</Label><Switch defaultChecked /></div>
              <div className="flex items-center justify-between"><Label>Retomar bot após 24h sem resposta</Label><Switch /></div>
            </CardContent></Card></TabsContent>

          <TabsContent value="notif"><Card><CardHeader><CardTitle>Notificações</CardTitle></CardHeader>
            <CardContent className="space-y-4 max-w-md">
              <div className="flex items-center justify-between"><Label>Nova conversa por e-mail</Label><Switch defaultChecked /></div>
              <div className="flex items-center justify-between"><Label>Push no navegador</Label><Switch /></div>
            </CardContent></Card></TabsContent>

          <TabsContent value="sec"><Card><CardHeader><CardTitle>Segurança</CardTitle></CardHeader>
            <CardContent className="space-y-4 max-w-md">
              <div className="flex items-center justify-between"><Label>Autenticação em dois fatores</Label><Switch /></div>
              <div className="flex items-center justify-between"><Label>Exigir SSO</Label><Switch /></div>
            </CardContent></Card></TabsContent>

          <TabsContent value="lgpd"><Card><CardHeader><CardTitle>LGPD</CardTitle><CardDescription>Privacidade e retenção.</CardDescription></CardHeader>
            <CardContent className="space-y-4 max-w-md">
              <div className="space-y-2"><Label>Retenção de conversas</Label><Input defaultValue="12 meses" /></div>
              <Button variant="outline">Exportar dados</Button>
            </CardContent></Card></TabsContent>

          <TabsContent value="dev"><Card><CardHeader><CardTitle>Desenvolvedor</CardTitle><CardDescription>API, webhooks e chaves.</CardDescription></CardHeader>
            <CardContent className="space-y-4 max-w-md">
              <div className="space-y-2"><Label>API Key</Label><Input readOnly defaultValue="atto_demo_••••••••••••" /></div>
              <Button variant="outline">Regenerar</Button>
            </CardContent></Card></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
