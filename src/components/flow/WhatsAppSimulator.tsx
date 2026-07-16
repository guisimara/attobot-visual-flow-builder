import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { tenant } from "@/data/mock";

const DEMO_MESSAGES = [
  { from: "bot", text: "Olá! Sou o assistente da Clínica Aurora 👋" },
  { from: "bot", text: "Como posso te ajudar hoje?\n1) Agendar consulta\n2) Retorno\n3) Falar com atendente" },
  { from: "user", text: "1" },
  { from: "bot", text: "Perfeito! Qual é o seu nome completo?" },
  { from: "user", text: "Ana Ribeiro" },
  { from: "bot", text: "Obrigada, Ana! Estamos verificando o horário comercial…" },
  { from: "bot", text: "Vou te transferir para nossa recepção agora." },
];

export function WhatsAppSimulator() {
  return (
    <div className="flex h-full w-[320px] flex-col border-l bg-[#0b141a]">
      <div className="flex items-center gap-2 border-b border-white/10 bg-[#202c33] px-3 py-2 text-white">
        <div className="h-8 w-8 rounded-full bg-primary/40" />
        <div className="flex-1">
          <p className="text-sm font-medium">{tenant.name}</p>
          <p className="text-[10px] text-white/60">online</p>
        </div>
        <Badge variant="outline" className="border-white/20 text-[10px] text-white/80">Simulador</Badge>
      </div>
      <ScrollArea className="flex-1 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-cover">
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
