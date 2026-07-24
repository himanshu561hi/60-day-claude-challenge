/**
 * app/interview/[interview_Id]/page.jsx — Candidate Intake Form
 *
 * URL: /interview/[interview_Id] (public — no auth required)
 *
 * This is the public-facing page where candidates:
 * 1. See the job role they're applying for
 * 2. Enter their name and email
 * 3. Upload their PDF resume
 * 4. Click "Start Interview" to begin
 *
 * Full implementation is Day 55 (PDF parsing + Gemini integration).
 * Today we scaffold the route so routing works correctly.
 */
export const metadata = {
  title: 'Start Your Interview — AI Interview System',
};

export default async function CandidateIntakePage({ params }) {
  const { interview_Id } = await params;

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="glass rounded-3xl p-10 text-center max-w-md w-full">
        <span className="text-5xl mb-6 block">🎤</span>
        <h1 className="text-xl font-bold text-[hsl(210,40%,98%)] mb-2">
          Interview Ready
        </h1>
        <p className="text-sm text-[hsl(215,20%,55%)] mb-4">
          Interview ID:{' '}
          <code className="text-[hsl(258,90%,76%)] bg-[hsl(222,47%,13%)] px-1.5 py-0.5 rounded text-xs">
            {interview_Id}
          </code>
        </p>
        <div
          className="text-xs text-[hsl(215,20%,40%)] px-4 py-3 rounded-xl"
          style={{ background: 'hsl(222,47%,10%)' }}
        >
          📅 Full candidate intake form coming on Day 55 — resume upload, Gemini parsing, and Vapi voice call integration.
        </div>
      </div>
    </main>
  );
}
