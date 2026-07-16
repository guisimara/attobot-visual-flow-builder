import { AttoLogo } from "@/components/brand/AttoLogo";

export function LandingFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4">
        <div className="space-y-3">
          <AttoLogo />
          <p className="text-sm text-muted-foreground">
            AttoBot é um produto <strong>ATTO</strong>. Conversas que viram ação.
          </p>
        </div>
        {[
          { title: "Produto", items: ["Recursos", "Editor visual", "Integrações", "Preços"] },
          { title: "Soluções", items: ["Clínicas", "E-commerce", "Educação", "Agências"] },
          { title: "Empresa", items: ["Sobre", "Blog", "Contato", "Status"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="mb-3 text-sm font-semibold">{col.title}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {col.items.map((i) => <li key={i}><a href="#" className="hover:text-foreground">{i}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t px-4 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} ATTO. Demonstração — nenhuma integração real ativa.
      </div>
    </footer>
  );
}
