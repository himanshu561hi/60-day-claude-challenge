import WelcomeContainer from './_components/WelcomeContainer';

/**
 * app/(main)/dashboard/page.jsx — Recruiter Dashboard Home Page
 *
 * This is the main landing page after the recruiter signs in.
 * URL: /dashboard
 *
 * Structure:
 * - Page header with title & subtitle
 * - WelcomeContainer (personalized greeting + quick actions + stats)
 * - Recent interviews list (placeholder for Day 59 implementation)
 *
 * Note: This is a Server Component — it renders on the server.
 * WelcomeContainer is a Client Component (because it uses hooks).
 */
export const metadata = {
  title: 'Dashboard — AI Interview System',
  description: 'Manage your AI-powered interviews and review candidate feedback',
};

export default function DashboardPage() {
  return (
    <div className="min-h-full p-6 md:p-8 space-y-8">
      {/* ── Welcome & Quick Actions Section ─────────────────────────── */}
      <WelcomeContainer />

      {/* ── Recent Interviews (Placeholder) ──────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[hsl(210,40%,92%)]">Recent Interviews</h2>
          <span className="text-xs text-[hsl(215,20%,45%)]">
            Full list on Day 54+
          </span>
        </div>

        {/* Empty state — will be replaced with real data in Day 59 */}
        <div className="glass rounded-2xl p-12 flex flex-col items-center justify-center text-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
            style={{
              background: 'linear-gradient(135deg, hsl(258,90%,66%)/10%, hsl(189,94%,43%)/10%)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
            }}
          >
            <span className="text-3xl">🎙️</span>
          </div>
          <h3 className="text-sm font-semibold text-[hsl(210,40%,80%)] mb-2">
            No interviews yet
          </h3>
          <p className="text-xs text-[hsl(215,20%,45%)] max-w-xs">
            Create your first interview template to get started. Candidates will receive a shareable
            link to complete their AI-powered voice interview.
          </p>
        </div>
      </section>
    </div>
  );
}
