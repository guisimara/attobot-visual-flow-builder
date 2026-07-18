import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
  { q: "Preciso de conta na Meta para começar?", a: "Nesta demonstração não. No produto real haverá conexão com WhatsApp Business API." },
  { q: "Posso desenhar fluxos sem programar?", a: "Sim, o editor é 100% visual." },
  { q: "Existe modo de teste?", a: "Sim, simulador de WhatsApp integrado ao editor." },
  { q: "Meus dados ficam seguros?", a: "O produto final terá controle de permissões, logs e adequação LGPD — nesta demo os dados são simulados e ficam apenas no navegador." },
  { q: "Consigo transferir para um humano?", a: "Sim, com contexto, tags e campos preservados." },
];

export function FAQ() {
  return (
    <section className="border-y bg-muted/20 py-16">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="text-3xl font-semibold tracking-tight">Perguntas frequentes</h2>
        <Accordion type="single" collapsible className="mt-6">
          {FAQS.map((f, i) => (
            <AccordionItem key={f.q} value={`i${i}`}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
