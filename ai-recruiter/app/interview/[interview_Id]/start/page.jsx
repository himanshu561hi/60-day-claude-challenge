import React from 'react';
import Link from 'next/link';

/**
 * app/interview/[interview_Id]/start/page.jsx — Vapi Voice Interview Calling Screen (Placeholder for Day 6)
 *
 * URL: /interview/[interview_Id]/start
 *
 * This route bridges Day 5's completed resume evaluation and custom AI persona creation
 * to Day 6's upcoming real-time Vapi Voice Calling Web SDK integration.
 */
export const metadata = {
  title: 'Live AI Voice Interview — AI Interview System',
};

export default async function StartInterviewPage({ params }) {
  const { interview_Id } = await params;

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-b from-[hsl(222,47%,6%)] via-[hsl(222,47%,8%)] to-[hsl(222,47%,6%)]">
      <div className="glass rounded-3xl p-8 sm:p-12 text-center max-w-lg w-full border border-emerald-500/30 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="w-16 h-16 rounded-2xl bg-[hsl(258,90%,66%)]/20 border border-[hsl(258,90%,66%)]/40 flex items-center justify-center text-[hsl(258,90%,76%)] mx-auto shadow-inner">
          <span className="text-4xl">🎙️</span>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 inline-block">
            ✔ Day 5 Handoff Verified
          </span>
          <h1 className="text-2xl font-extrabold text-[hsl(210,40%,98%)] tracking-tight">
            Vapi Voice Calling <span className="gradient-text">Ready for Day 6</span>
          </h1>
          <p className="text-xs sm:text-sm text-[hsl(215,20%,60%)] leading-relaxed">
            Your resume was analyzed, your technical skills matched, and your customized AI Interviewer system prompt (<strong className="text-[hsl(210,40%,98%)]">Alex</strong>) is securely stored in active session memory.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[hsl(222,47%,10%)] border border-[hsl(222,25%,18%)] text-left space-y-2 text-xs text-[hsl(215,20%,70%)]">
          <p className="font-semibold text-[hsl(258,90%,76%)] uppercase tracking-wider">📅 Coming Next on Day 56 (Day 6):</p>
          <ul className="list-disc pl-4 space-y-1 text-[hsl(215,20%,65%)]">
            <li>Initialize <code className="text-emerald-300 font-mono">@vapi-ai/web</code> browser audio calling SDK.</li>
            <li>Connect active user microphone with real-time speech synthesis.</li>
            <li>Enforce dynamic interview timers and programmatic call termination loops.</li>
          </ul>
        </div>

        <div className="pt-2">
          <Link
            href={`/interview/${interview_Id}`}
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-2xl bg-[hsl(222,47%,14%)] hover:bg-[hsl(222,47%,18%)] text-[hsl(210,40%,98%)] border border-[hsl(222,25%,22%)] font-semibold text-sm transition-all duration-200 shadow-md hover:border-[hsl(258,90%,66%)]/40"
          >
            <span>⬅️ Return to Resume Evaluation</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
