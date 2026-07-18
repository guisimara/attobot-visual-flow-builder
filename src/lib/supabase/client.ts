import { createClient, type PostgrestSingleResponse } from "@supabase/supabase-js";
import type { Database } from "./types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.warn(
    "[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY não configuradas. " +
      "Copie .env.local.example para .env.local e preencha com os dados do seu projeto Supabase."
  );
}

// Cliente único para uso no browser (usa a chave anon — segura para expor no frontend).
// Nunca importe a service_role key aqui; ela só deve ser usada em Edge Functions / server-side.
export const supabase = createClient<Database>(
  supabaseUrl ?? "https://placeholder.supabase.co",
  supabaseAnonKey ?? "placeholder-anon-key"
);

type FunctionName = keyof Database["public"]["Functions"];
type FunctionArgs<Fn extends FunctionName> = Database["public"]["Functions"][Fn]["Args"];
type FunctionReturns<Fn extends FunctionName> = Database["public"]["Functions"][Fn]["Returns"];

// Wrapper tipado para `supabase.rpc(...)`.
//
// Por que existe: @supabase/supabase-js@2.110.x (postgrest-js) tem um bug de
// inferência de generics no `.rpc()` quando `Database["public"]["Tables"]`
// não está vazio — o TS resolve o tipo dos `Args` como `undefined`/`never`
// mesmo com a função corretamente declarada em `types.ts` (reproduzido
// isoladamente fora deste projeto também). Até a lib corrigir isso, chamamos
// `.rpc` via um cast único aqui dentro, mantendo o restante do app 100% tipado.
export function callRpc<Fn extends FunctionName>(
  fn: Fn,
  args: FunctionArgs<Fn>
): PromiseLike<PostgrestSingleResponse<FunctionReturns<Fn>>> {
  const untypedRpc = supabase.rpc as unknown as (
    fn: string,
    args: FunctionArgs<Fn>
  ) => PromiseLike<PostgrestSingleResponse<FunctionReturns<Fn>>>;
  return untypedRpc(fn, args);
}
