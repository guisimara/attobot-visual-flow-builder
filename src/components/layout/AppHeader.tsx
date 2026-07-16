import { Bell, Search, HelpCircle } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { DemoBadge } from "@/components/layout/Badges";

export function AppHeader() {
  return (
    <header className="flex h-14 items-center gap-3 border-b bg-background px-4">
      <SidebarTrigger />
      <div className="relative hidden max-w-sm flex-1 md:block">
        <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Buscar contatos, conversas, fluxos…" className="h-9 pl-8" />
      </div>
      <div className="ml-auto flex items-center gap-1">
        <DemoBadge className="hidden md:inline-flex" />
        <Button variant="ghost" size="icon" aria-label="Ajuda">
          <HelpCircle className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Notificações">
          <Bell className="h-4 w-4" />
        </Button>
        <ThemeToggle />
        <Avatar className="h-8 w-8">
          <AvatarFallback>MS</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
