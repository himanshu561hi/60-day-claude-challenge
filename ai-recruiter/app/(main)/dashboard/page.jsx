import WelcomeContainer from './_components/WelcomeContainer';
import RecentInterviews from './_components/RecentInterviews';

/**
 * app/(main)/dashboard/page.jsx — Recruiter Dashboard Home Page
 *
 * This server component defines the landing page after recruiter authentication.
 * Integrates real-time personalized greetings, analytical summary cards,
 * quick action buttons, and active recent interview pipelines.
 */
export const metadata = {
  title: 'Dashboard — AI Interview System',
  description: 'Manage AI-powered interviews, track active role templates, and analyze candidate submissions',
};

export default function DashboardPage() {
  return (
    <div className="min-h-full p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* ── Welcome & Quick Actions Section ─────────────────────────── */}
      <WelcomeContainer />

      {/* ── Recent Active Interviews Section ──────────────────────────── */}
      <RecentInterviews />
    </div>
  );
}
