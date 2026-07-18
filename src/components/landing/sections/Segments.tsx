import { Badge } from "@/components/ui/badge";

const SEGMENTS = ["Clínicas & Saúde", "E-commerce", "Educação", "Imobiliárias", "Agências", "Serviços B2B"];

export function Segments() {
  return (
    <section className="border-y bg-muted/20 py-14">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Feito para times de</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {SEGMENTS.map((s) => (
            <Badge key={s} variant="secondary" className="px-3 py-1.5 text-sm">{s}</Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
