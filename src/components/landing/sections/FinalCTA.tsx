import { Link } from "@tanstack/react-router";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl rounded-2xl border bg-gradient-to-br from-primary/10 via-background to-primary/5 p-10 text-center">
        <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
          <Zap className="h-5 w-5" />
        </div>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight">Pronto para conversas que viram ação?</h2>
        <p className="mt-3 text-muted-foreground">Crie sua conta demo em 30 segundos.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg"><Link to="/signup">Testar grátis</Link></Button>
          <Button asChild variant="outline" size="lg"><Link to="/app/dashboard">Ver demo</Link></Button>
        </div>
      </div>
    </section>
  );
}
