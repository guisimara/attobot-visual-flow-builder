import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { workspace } from "@/data/mock";

const DEMO_MESSAGES = [
  { from: "bot", text: "Olá! Sou o assistente da Clínica Aurora 👋" },
  { from: "bot", text: "Como posso te ajudar hoje?\n1) Agendar consulta\n2) Retorno\n3) Falar com atendente" },
  { from: "user", text: "1" },
  { from: "bot", text: "Perfeito! Qual é o seu nome completo?" },
  { from: "user", text: "Ana Ribeiro" },
  { from: "bot", text: "Obrigada, Ana! Estamos verificando o horário comercial…" },
  { from: "bot", text: "Vou te transferir para nossa recepção agora." },
];

// CSS-only WhatsApp-ish backdrop (no external CDN images).
const wallpaper: React.CSSProperties = {
  backgroundColor: "#0b141a",
  backgroundImage:
    "radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)",
  backgroundSize: "22px 22px, 44px 44px",
  backgroundPosition: "0 0, 11px 11px",
};

export function WhatsAppSimulator() {
  return (
    <div className="flex h-full w-full max-w-[340px] flex-col border-l bg-[#0b141a] md:w-[320px]">
      <div className="flex items-center gap-2 border-b border-white/10 bg-[#202c33] px-3 py-2 text-white">
        <div className="h-8 w-8 shrink-0 rounded-full bg-primary/40" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{workspace.name}</p>
          <p className="text-[10px] text-white/60">simulador · não envia mensagens reais</p>
        </div>
        <Badge variant="outline" className="border-white/20 text-[10px] text-white/80">Demo</Badge>
      </div>
      <ScrollArea className="flex-1" style={wallpaper}>
        <div className="space-y-2 p-3">
          {DEMO_MESSAGES.map((m, i) => (
            <div key={i} className={m.from === "bot" ? "flex justify-start" : "flex justify-end"}>
              <div className={`max-w-[80%] whitespace-pre-line rounded-lg px-3 py-1.5 text-xs shadow ${m.from === "bot" ? "bg-white text-[#111]" : "bg-[#005c4b] text-white"}`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="border-t border-white/10 bg-[#202c33] px-3 py-2">
        <div className="rounded-full bg-[#2a3942] px-3 py-2 text-xs text-white/50">Digite uma mensagem…</div>
      </div>
    </div>
  );
}
