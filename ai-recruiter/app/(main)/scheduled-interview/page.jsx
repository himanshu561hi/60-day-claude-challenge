/**
 * app/(main)/scheduled-interview/page.jsx — All Interviews List
 *
 * URL: /scheduled-interview
 *
 * This page will display all interview templates created by the recruiter,
 * along with candidate counts and links to view submissions.
 *
 * Currently a scaffold — full implementation is on Day 59.
 */
export const metadata = {
  title: 'All Interviews — AI Interview System',
};

export default function ScheduledInterviewPage() {
  return (
    <div className="min-h-full p-6 md:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[hsl(210,40%,98%)] mb-1">All Interviews</h1>
        <p className="text-sm text-[hsl(215,20%,55%)]">
          View all interview templates and candidate submissions
        </p>
      </div>

      {/* Coming soon placeholder */}
      <div className="glass rounded-2xl p-16 flex flex-col items-center justify-center text-center">
        <div
          className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6"
          style={{
            background: 'linear-gradient(135deg, hsl(189,94%,43%)/10%, hsl(258,90%,66%)/10%)',
            border: '1px solid rgba(6, 182, 212, 0.2)',
          }}
        >
          <span className="text-4xl">📋</span>
        </div>
        <h2 className="text-lg font-semibold text-[hsl(210,40%,86%)] mb-2">
          Interview List — Coming Day 59
        </h2>
        <p className="text-sm text-[hsl(215,20%,45%)] max-w-sm">
          This section will display all your interview templates with candidate submission counts,
          average scores, and quick access to detailed feedback reports.
        </p>
      </div>
    </div>
  );
}
