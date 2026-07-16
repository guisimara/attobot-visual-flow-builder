import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { AttoLogo } from "@/components/brand/AttoLogo";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-sm">
          <Link to="/" className="mb-8 inline-block">
            <AttoLogo size="lg" />
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-6 text-sm text-muted-foreground">{footer}</div>}
        </div>
      </div>
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/5 lg:block">
        <div className="absolute inset-0 flex flex-col justify-center px-16">
          <blockquote className="max-w-md text-2xl font-medium leading-snug">
            "Reduzimos o tempo de resposta em 78% e mantivemos o atendimento humano onde ele importa."
          </blockquote>
          <p className="mt-6 text-sm text-muted-foreground">
            Marina Souza · Coordenadora, Clínica Aurora
          </p>
          <div className="mt-12 rounded-2xl border bg-card p-6 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              ATTO · AttoBot
            </p>
            <p className="mt-2 text-lg font-semibold">Conversas que viram ação.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
