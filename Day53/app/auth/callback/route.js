import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

/**
 * app/auth/callback/route.js — OAuth Callback Handler
 *
 * After the user approves the Google OAuth prompt, Google redirects back
 * to Supabase, which then redirects to THIS endpoint.
 *
 * This route:
 * 1. Receives the authorization `code` from the URL
 * 2. Exchanges it with Supabase for a session token
 * 3. Redirects the user to /dashboard
 *
 * This is a Next.js Route Handler (not a page). It runs server-side.
 */
export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    await supabase.auth.exchangeCodeForSession(code);
  }

  // After successful auth, redirect to the recruiter dashboard
  return NextResponse.redirect(new URL('/dashboard', requestUrl.origin));
}
