import { Badge } from "@/components/ui/badge";

export function DemoBadge({ className }: { className?: string }) {
  return (
    <Badge variant="outline" className={className}>
      Demonstração
    </Badge>
  );
}

export function ComingSoonBadge() {
  return <Badge variant="secondary">Em breve</Badge>;
}
