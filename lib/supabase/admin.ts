import { createClient } from "@supabase/supabase-js";

function createSupabaseAdminClient() {
  const url =
    process.env.SUPABASE_URL;

  const key =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) {
    throw new Error(
      "SUPABASE_URL não configurada."
    );
  }

  if (!key) {
    throw new Error(
      "SUPABASE_SECRET_KEY ou SUPABASE_SERVICE_ROLE_KEY não configurada."
    );
  }

  return createClient(
    url,
    key,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}

/**
 * Aqui o ReturnType já não é aplicado à função genérica
 * createClient diretamente.
 *
 * Ele é aplicado à nossa factory concreta, cujo retorno
 * o TypeScript já conseguiu inferir.
 */
type SupabaseAdminClient =
  ReturnType<
    typeof createSupabaseAdminClient
  >;

let supabaseAdmin:
  SupabaseAdminClient | null = null;

export function getSupabaseAdmin():
  SupabaseAdminClient {
  if (!supabaseAdmin) {
    supabaseAdmin =
      createSupabaseAdminClient();
  }

  return supabaseAdmin;
}