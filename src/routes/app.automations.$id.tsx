import { createFileRoute } from "@tanstack/react-router";
import { FlowEditor } from "@/components/flow/FlowEditor";
import { flows } from "@/data/mock";

export const Route = createFileRoute("/app/automations/$id")({ component: Editor });

function Editor() {
  const { id } = Route.useParams();
  const flow = flows.find((f) => f.id === id);
  const name = flow?.name ?? "Novo fluxo";
  return (
    <div className="h-[calc(100vh-3.5rem)]">
      <FlowEditor flowName={name} />
    </div>
  );
}
