/**
 * app/interview/page.jsx — Interview Fallback Page
 *
 * URL: /interview (without an ID)
 *
 * This is a fallback route for when someone accesses /interview
 * without a specific interview ID. It shows a friendly error message.
 *
 * The real candidate experience starts at /interview/[interview_Id]
 */
export const metadata = {
  title: 'Interview Not Found — AI Interview System',
};

export default function InterviewFallbackPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md glass rounded-3xl p-10">
        <span className="text-5xl mb-6 block">🔗</span>
        <h1 className="text-xl font-bold text-[hsl(210,40%,98%)] mb-3">
          No Interview Link Found
        </h1>
        <p className="text-sm text-[hsl(215,20%,55%)]">
          To start an interview, you need a specific link from a recruiter.
          It looks like:{' '}
          <code className="text-[hsl(258,90%,76%)] bg-[hsl(222,47%,13%)] px-1.5 py-0.5 rounded text-xs">
            /interview/[unique-id]
          </code>
        </p>
        <p className="text-xs text-[hsl(215,20%,40%)] mt-4">
          If you are a recruiter, please{' '}
          <a href="/auth" className="text-[hsl(258,90%,76%)] underline underline-offset-2">
            sign in here
          </a>
          .
        </p>
      </div>
    </main>
  );
}
