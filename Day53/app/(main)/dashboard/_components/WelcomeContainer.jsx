'use client';

import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Sparkles, Clock, Mic2, TrendingUp, Plus, ArrowRight } from 'lucide-react';
import Link from 'next/link';

/**
 * app/(main)/dashboard/_components/WelcomeContainer.jsx
 *
 * The hero section of the recruiter dashboard.
 *
 * Displays:
 * 1. A personalized greeting using the recruiter's name from Supabase
 * 2. A summary of what the system does
 * 3. Quick action cards (Create Interview, View Submissions)
 * 4. Status pills (placeholder stat cards for Day 54+)
 *
 * Design: Glassmorphism card with gradient text and animated elements
 */
export default function WelcomeContainer() {
  const { userDetail, loading } = useUser();
  const router = useRouter();

  /**
   * Auth Guard — If no user is logged in and loading is done,
   * redirect to the login page.
   */
  useEffect(() => {
    if (!loading && !userDetail) {
      router.push('/auth');
    }
  }, [loading, userDetail, router]);

  // Get the first name only for a friendly greeting
  const firstName = userDetail?.full_name?.split(' ')[0] || 'Recruiter';

  // Get the current time to show an appropriate greeting
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  if (loading) {
    return (
      <div className="p-8 animate-pulse">
        <div className="h-8 bg-[hsl(222,47%,13%)] rounded-lg w-64 mb-4" />
        <div className="h-4 bg-[hsl(222,47%,13%)] rounded w-48" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ── Greeting Header ───────────────────────────────────────────── */}
      <div className="glass rounded-2xl p-6 relative overflow-hidden">
        {/* Background decoration */}
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, hsl(258, 90%, 66%), transparent 70%)' }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[hsl(258,90%,66%)]" />
            <span className="text-xs font-medium text-[hsl(258,90%,76%)] uppercase tracking-wider">
              Recruiter Dashboard
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-[hsl(210,40%,98%)] mb-1">
            {greeting},{' '}
            <span className="gradient-text">{firstName}!</span>
          </h1>

          <p className="text-sm text-[hsl(215,20%,55%)] max-w-lg">
            Your AI-powered interview platform is ready. Create interviews, share candidate links,
            and review detailed AI-generated feedback — all from one place.
          </p>
        </div>
      </div>

      {/* ── Quick Action Cards ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Create Interview CTA */}
        <Link
          href="/dashboard/create-interview"
          id="create-interview-cta"
          className="glass rounded-2xl p-5 hover:border-[hsl(258,90%,66%)]/40 transition-all duration-300 group cursor-pointer"
          style={{ borderColor: 'rgba(139, 92, 246, 0.15)' }}
        >
          <div className="flex items-start justify-between mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, hsl(258,90%,66%)/20%, hsl(258,90%,66%)/10%)',
                border: '1px solid hsl(258,90%,66%)/20%',
              }}
            >
              <Plus className="w-5 h-5 text-[hsl(258,90%,76%)]" />
            </div>
            <ArrowRight className="w-4 h-4 text-[hsl(215,20%,45%)] group-hover:text-[hsl(258,90%,66%)] group-hover:translate-x-1 transition-all duration-200" />
          </div>
          <h3 className="text-sm font-semibold text-[hsl(210,40%,92%)] mb-1">
            Create New Interview
          </h3>
          <p className="text-xs text-[hsl(215,20%,50%)]">
            Set up a job role and generate a shareable candidate link
          </p>
        </Link>

        {/* View Interviews CTA */}
        <Link
          href="/scheduled-interview"
          id="view-interviews-cta"
          className="glass rounded-2xl p-5 hover:border-[hsl(189,94%,43%)]/40 transition-all duration-300 group cursor-pointer"
          style={{ borderColor: 'rgba(6, 182, 212, 0.15)' }}
        >
          <div className="flex items-start justify-between mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, hsl(189,94%,43%)/20%, hsl(189,94%,43%)/10%)',
                border: '1px solid hsl(189,94%,43%)/20%',
              }}
            >
              <Mic2 className="w-5 h-5 text-[hsl(189,94%,53%)]" />
            </div>
            <ArrowRight className="w-4 h-4 text-[hsl(215,20%,45%)] group-hover:text-[hsl(189,94%,43%)] group-hover:translate-x-1 transition-all duration-200" />
          </div>
          <h3 className="text-sm font-semibold text-[hsl(210,40%,92%)] mb-1">
            View All Interviews
          </h3>
          <p className="text-xs text-[hsl(215,20%,50%)]">
            Browse candidate submissions and AI-generated feedback reports
          </p>
        </Link>
      </div>

      {/* ── Placeholder Stats ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            icon: Clock,
            label: 'Active Interviews',
            value: '—',
            color: 'hsl(258, 90%, 66%)',
            note: 'Created by you',
          },
          {
            icon: Mic2,
            label: 'Total Candidates',
            value: '—',
            color: 'hsl(189, 94%, 43%)',
            note: 'Completed calls',
          },
          {
            icon: TrendingUp,
            label: 'Avg Score',
            value: '—',
            color: 'hsl(142, 76%, 36%)',
            note: 'Across all interviews',
          },
        ].map(({ icon: Icon, label, value, color, note }) => (
          <div key={label} className="glass rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Icon className="w-4 h-4" style={{ color }} />
              <span className="text-xs text-[hsl(215,20%,50%)]">{label}</span>
            </div>
            <p className="text-2xl font-bold text-[hsl(210,40%,92%)]">{value}</p>
            <p className="text-xs text-[hsl(215,20%,40%)] mt-1">{note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
