import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Inbox, Workflow, Files, Users, Tags, MessageSquareText,
  Megaphone, BarChart3, UserCog, Radio, Puzzle, CreditCard, Settings,
} from "lucide-react";

import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { AttoLogo } from "@/components/brand/AttoLogo";
import { WorkspaceContext } from "@/components/layout/WorkspaceContext";

const groups = [
  {
    label: "Operação",
    items: [
      { title: "Visão geral", url: "/app/dashboard", icon: LayoutDashboard },
      { title: "Caixa de entrada", url: "/app/inbox", icon: Inbox },
      { title: "Contatos", url: "/app/contacts", icon: Users },
    ],
  },
  {
    label: "Automação",
    items: [
      { title: "Automações", url: "/app/automations", icon: Workflow },
      { title: "Modelos de fluxo", url: "/app/flow-templates", icon: Files },
      { title: "Templates WhatsApp", url: "/app/templates", icon: MessageSquareText },
      { title: "Campanhas", url: "/app/campaigns", icon: Megaphone },
    ],
  },
  {
    label: "Organização",
    items: [
      { title: "Tags e segmentos", url: "/app/tags", icon: Tags },
      { title: "Relatórios", url: "/app/reports", icon: BarChart3 },
      { title: "Equipe", url: "/app/team", icon: UserCog },
    ],
  },
  {
    label: "Configurar",
    items: [
      { title: "Canais", url: "/app/channels", icon: Radio },
      { title: "Integrações", url: "/app/integrations", icon: Puzzle },
      { title: "Plano e cobrança", url: "/app/billing", icon: CreditCard },
      { title: "Configurações", url: "/app/settings", icon: Settings },
    ],
  },
] as const;

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (url: string) => pathname === url || pathname.startsWith(url + "/");

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b">
        <Link to="/app/dashboard" className="flex items-center gap-2 px-2 py-1.5">
          <AttoLogo showText={!collapsed} size="sm" />
        </Link>
        <WorkspaceContext collapsed={collapsed} />
      </SidebarHeader>

      <SidebarContent>
        {groups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                      <Link to={item.url} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {!collapsed && (
        <SidebarFooter className="border-t">
          <p className="px-2 py-1 text-[11px] text-muted-foreground">
            ATTO · Conversas que viram ação.
          </p>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
