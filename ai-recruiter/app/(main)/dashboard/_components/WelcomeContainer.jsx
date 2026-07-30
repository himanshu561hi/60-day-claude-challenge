'use client';

import { useUser } from '@/hooks/useUser';
import { supabase } from '@/services/supabaseClient';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Sparkles, Clock, Mic2, TrendingUp, Plus, ArrowRight } from 'lucide-react';
import Link from 'next/link';

/**
 * app/(main)/dashboard/_components/WelcomeContainer.jsx
 *
 * Hero section of the recruiter dashboard with live analytics.
 *
 * Displays:
 * 1. Personalized greeting using recruiter profile credentials
 * 2. System summary & feature highlights
 * 3. Quick action navigation cards (Create Interview, View Submissions)
 * 4. Real-time statistics fetched dynamically from Supabase
 */
export default function WelcomeContainer() {
  const { userDetail, loading } = useUser();
  const router = useRouter();

  const [stats, setStats] = useState({
    activeInterviews: '0',
    totalCandidates: '0',
    avgScore: '—',
  });
  const [statsLoading, setStatsLoading] = useState(true);

  /**
   * Auth Guard — Redirect to login if unauthenticated
   */
  useEffect(() => {
    if (!loading && !userDetail) {
      router.push('/auth');
    } else if (userDetail?.id) {
      fetchDashboardStats();
    }
  }, [loading, userDetail, router]);

  /**
   * Fetch aggregate recruiter statistics from Supabase
   */
  const fetchDashboardStats = async () => {
    setStatsLoading(true);
    try {
      const { data: interviewsData, error: intError } = await supabase
        .from('interviews')
        .select('id')
        .eq('recruiter_id', userDetail.id);

      if (intError) throw intError;

      const interviewCount = interviewsData?.length || 0;
      let candidateCount = 0;
      let avgScoreStr = '—';

      if (interviewCount > 0) {
        const ids = interviewsData.map((item) => item.id);
        const { data: subsData, error: subError } = await supabase
          .from('candidate_submissions')
          .select('overall_score')
          .in('interview_id', ids);

        if (!subError && subsData) {
          candidateCount = subsData.length;
          const validScores = subsData.filter((s) => typeof s.overall_score === 'number');
          if (validScores.length > 0) {
            const total = validScores.reduce((acc, curr) => acc + curr.overall_score, 0);
            avgScoreStr = `${Math.round(total / validScores.length)}%`;
          }
        }
      }

      setStats({
        activeInterviews: interviewCount.toString(),
        totalCandidates: candidateCount.toString(),
        avgScore: avgScoreStr,
      });
    } catch (err) {
      console.error('[WelcomeContainer] Failed to compute analytics:', err);
    } finally {
      setStatsLoading(false);
    }
  };

  const firstName = userDetail?.full_name?.split(' ')[0] || 'Recruiter';
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  if (loading) {
    return (
      <div className="p-8 animate-pulse space-y-4">
        <div className="h-28 bg-[hsl(222,47%,13%)] rounded-2xl w-full" />
        <div className="grid grid-cols-2 gap-4">
          <div className="h-24 bg-[hsl(222,47%,13%)] rounded-2xl" />
          <div className="h-24 bg-[hsl(222,47%,13%)] rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ── Greeting Header ───────────────────────────────────────────── */}
      <div className="glass rounded-2xl p-6 relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, hsl(258, 90%, 66%), transparent 70%)' }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[hsl(258,90%,66%)]" />
            <span className="text-xs font-medium text-[hsl(258,90%,76%)] uppercase tracking-wider">
              Recruiter Command Center
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-[hsl(210,40%,98%)] mb-2">
            {greeting},{' '}
            <span className="gradient-text">{firstName}!</span>
          </h1>

          <p className="text-sm text-[hsl(215,20%,55%)] max-w-xl leading-relaxed">
            Your high-performance AI interviewing platform is live. Configure autonomous voice interviews, dispatch assessment links, and inspect deep AI diagnostic reports in real-time.
          </p>
        </div>
      </div>

      {/* ── Quick Action Cards ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/dashboard/create-interview"
          id="create-interview-cta"
          className="glass rounded-2xl p-5 hover:border-[hsl(258,90%,66%)]/40 transition-all duration-300 group cursor-pointer relative overflow-hidden"
          style={{ borderColor: 'rgba(139, 92, 246, 0.15)' }}
        >
          <div className="flex items-start justify-between mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
              style={{
                background: 'linear-gradient(135deg, hsl(258,90%,66%)/20%, hsl(258,90%,66%)/10%)',
                border: '1px solid hsl(258,90%,66%)/20%',
              }}
            >
              <Plus className="w-5 h-5 text-[hsl(258,90%,76%)]" />
            </div>
            <ArrowRight className="w-4 h-4 text-[hsl(215,20%,45%)] group-hover:text-[hsl(258,90%,66%)] group-hover:translate-x-1 transition-all duration-200" />
          </div>
          <h3 className="text-base font-bold text-[hsl(210,40%,95%)] mb-1 group-hover:text-[hsl(258,90%,76%)] transition-colors">
            Create New Interview
          </h3>
          <p className="text-xs text-[hsl(215,20%,52%)]">
            Configure job specifications & generate shareable voice AI prompts
          </p>
        </Link>

        <Link
          href="/scheduled-interview"
          id="view-interviews-cta"
          className="glass rounded-2xl p-5 hover:border-[hsl(189,94%,43%)]/40 transition-all duration-300 group cursor-pointer relative overflow-hidden"
          style={{ borderColor: 'rgba(6, 182, 212, 0.15)' }}
        >
          <div className="flex items-start justify-between mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
              style={{
                background: 'linear-gradient(135deg, hsl(189,94%,43%)/20%, hsl(189,94%,43%)/10%)',
                border: '1px solid hsl(189,94%,43%)/20%',
              }}
            >
              <Mic2 className="w-5 h-5 text-[hsl(189,94%,53%)]" />
            </div>
            <ArrowRight className="w-4 h-4 text-[hsl(215,20%,45%)] group-hover:text-[hsl(189,94%,43%)] group-hover:translate-x-1 transition-all duration-200" />
          </div>
          <h3 className="text-base font-bold text-[hsl(210,40%,95%)] mb-1 group-hover:text-[hsl(189,94%,53%)] transition-colors">
            View All Interviews
          </h3>
          <p className="text-xs text-[hsl(215,20%,52%)]">
            Review candidate submission logs and diagnostic AI feedback reports
          </p>
        </Link>
      </div>

      {/* ── Live Analytics Stats ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            icon: Clock,
            label: 'Active Interviews',
            value: stats.activeInterviews,
            color: 'hsl(258, 90%, 66%)',
            note: 'Configured role templates',
          },
          {
            icon: Mic2,
            label: 'Total Candidates',
            value: stats.totalCandidates,
            color: 'hsl(189, 94%, 43%)',
            note: 'Submitted evaluations',
          },
          {
            icon: TrendingUp,
            label: 'Average Score',
            value: stats.avgScore,
            color: 'hsl(142, 76%, 45%)',
            note: 'Across all assessments',
          },
        ].map(({ icon: Icon, label, value, color, note }) => (
          <div key={label} className="glass rounded-2xl p-5 border border-white/5 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-3">
              <Icon className="w-4 h-4" style={{ color }} />
              <span className="text-xs font-semibold uppercase tracking-wider text-[hsl(215,20%,55%)]">{label}</span>
            </div>
            <p className="text-3xl font-extrabold text-[hsl(210,40%,98%)] tracking-tight">
              {statsLoading ? '...' : value}
            </p>
            <p className="text-xs text-[hsl(215,20%,45%)] mt-1.5">{note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
