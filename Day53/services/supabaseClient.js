import { createClient } from '@supabase/supabase-js';

/**
 * services/supabaseClient.js
 *
 * This file exposes two Supabase client instances:
 *
 * 1. supabase (Browser Client)
 *    - Uses the ANON key — respects Row Level Security (RLS) rules
 *    - Used in React components, hooks, and context providers
 *    - Safe to use on the client side
 *
 * 2. supabaseAdmin (Server Admin Client)
 *    - Uses the SERVICE_ROLE key — BYPASSES Row Level Security
 *    - Used ONLY inside Next.js API route handlers (server-side)
 *    - NEVER import this into any client-side React component
 *    - Required for Vapi webhook updates (post-call scoring, transcript saving)
 */

// ── Browser Client ─────────────────────────────────────────────────────────
// This client runs in the browser and respects all RLS policies.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// ── Server Admin Client ────────────────────────────────────────────────────
// This client is for server-side API routes only. It bypasses RLS.
// Only defined in environments where the service key is available.
export const supabaseAdmin =
  typeof process.env.SUPABASE_SERVICE_ROLE_KEY !== 'undefined'
    ? createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false,
          },
        }
      )
    : null;
