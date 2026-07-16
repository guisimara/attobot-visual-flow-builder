import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { activityFeed } from "@/data/mock";

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Atividade recente</CardTitle>
        <CardDescription>Últimos eventos da operação</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activityFeed.map((a) => (
            <li key={a.id} className="flex gap-3 text-sm">
              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
              <div className="flex-1">
                <p><span className="font-medium">{a.who}</span> {a.what}</p>
                <p className="text-xs text-muted-foreground">{a.when}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
