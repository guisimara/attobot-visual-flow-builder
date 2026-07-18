import { Check, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function EditorSection() {
  return (
    <section className="border-y bg-gradient-to-b from-background to-muted/20 py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:items-center">
        <div>
          <Badge variant="outline" className="mb-3"><Sparkles className="mr-1 h-3 w-3" /> Editor visual</Badge>
          <h2 className="text-3xl font-semibold tracking-tight">Desenhe fluxos como no papel — só que publicável.</h2>
          <p className="mt-4 text-muted-foreground">
            Blocos de mensagem, botões, menus, perguntas, condições, tags, esperas, transferência e encerramento. Simulador de WhatsApp integrado ao editor.
          </p>
          <ul className="mt-6 space-y-2">
            {["21+ blocos prontos", "Condições e horário comercial", "Simulador WhatsApp integrado", "Versionamento e rascunhos"].map((s) => (
              <li key={s} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-primary" />{s}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border bg-card p-4 shadow-xl">
          <div className="grid grid-cols-4 gap-3">
            {["Gatilho", "Mensagem", "Menu", "Capturar", "Condição", "Tag", "Espera", "Transferir"].map((b, i) => (
              <div key={b} className={`rounded-md border px-2 py-3 text-center text-xs ${i === 2 ? "border-primary bg-primary/5" : "bg-background"}`}>{b}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
