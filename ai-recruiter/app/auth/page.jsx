'use client';

import { useState } from 'react';
import { supabase } from '@/services/supabaseClient';
import { toast } from 'sonner';
import { Mic, Brain, Users, ArrowRight, Loader2 } from 'lucide-react';

/**
 * app/auth/page.jsx — Recruiter Authentication Page
 *
 * This is the login gate for recruiters. It uses Supabase's Google OAuth.
 * Candidates never see this page — they access /interview/[id] directly.
 *
 * Flow:
 * 1. Recruiter clicks "Sign in with Google"
 * 2. Supabase redirects to Google's OAuth consent screen
 * 3. After Google approval, Supabase redirects back to /auth/callback
 * 4. The session is established and the user is sent to /dashboard
 *
 * Design: Premium dark glassmorphism card with animated background orbs
 */
export default function AuthPage() {
  const [loading, setLoading] = useState(false);

  /**
   * handleGoogleSignIn
   * Initiates the Google OAuth flow via Supabase.
   * The `redirectTo` URL is where the user lands AFTER Google approves.
   */
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        toast.error('Authentication failed. Please try again.');
        console.error('[Auth] Google OAuth error:', error.message);
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
      console.error('[Auth] Unexpected error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* ── Animated Background Orbs ─────────────────────────────────── */}
      <div
        className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(258, 90%, 66%), transparent 70%)' }}
      />
      <div
        className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(189, 94%, 43%), transparent 70%)' }}
      />

      <div className="w-full max-w-md relative z-10 animate-slide-up">
        {/* ── Brand Header ─────────────────────────────────────────────── */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary mb-4 animate-pulse-glow">
            <Mic className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold gradient-text mb-2">AI Interview System</h1>
          <p className="text-[hsl(215,20%,55%)] text-sm">
            Powered by Gemini AI · Vapi Voice Engine
          </p>
        </div>

        {/* ── Auth Card ────────────────────────────────────────────────── */}
        <div className="glass rounded-3xl p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-[hsl(210,40%,98%)] mb-1">
              Recruiter Portal
            </h2>
            <p className="text-sm text-[hsl(215,20%,55%)]">
              Sign in to manage interviews and review candidate results
            </p>
          </div>

          {/* ── Feature Highlights ───────────────────────────────────── */}
          <div className="space-y-3 mb-8">
            {[
              { icon: Brain, label: 'AI-powered candidate screening' },
              { icon: Mic, label: 'Real-time voice interviews' },
              { icon: Users, label: 'Structured feedback & scoring' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 text-sm text-[hsl(215,20%,65%)]">
                <div className="w-8 h-8 rounded-lg bg-[hsl(258,90%,66%)]/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-[hsl(258,90%,66%)]" />
                </div>
                <span>{label}</span>
              </div>
            ))}
          </div>

          {/* ── Google Sign In Button ─────────────────────────────────── */}
          <button
            id="google-signin-button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: 'linear-gradient(135deg, hsl(258, 90%, 66%), hsl(189, 94%, 43%))',
              boxShadow: '0 4px 24px rgba(139, 92, 246, 0.3)',
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.boxShadow = '0 6px 32px rgba(139, 92, 246, 0.5)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 24px rgba(139, 92, 246, 0.3)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                {/* Google SVG Icon */}
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="white"
                    fillOpacity="0.9"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="white"
                    fillOpacity="0.9"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="white"
                    fillOpacity="0.9"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="white"
                    fillOpacity="0.9"
                  />
                </svg>
                <span>Continue with Google</span>
                <ArrowRight className="w-4 h-4 ml-auto" />
              </>
            )}
          </button>

          <p className="text-center text-xs text-[hsl(215,20%,45%)] mt-4">
            Only recruiters need to sign in. Candidates access interviews via a shared link.
          </p>
        </div>
      </div>
    </main>
  );
}
