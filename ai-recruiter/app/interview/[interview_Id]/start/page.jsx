import React from 'react';
import VapiCallContainer from './_components/VapiCallContainer';

/**
 * app/interview/[interview_Id]/start/page.jsx
 *
 * Day 6 / Day 56: Vapi Voice Interview Calling Screen (Real-Time Engine)
 *
 * URL: /interview/[interview_Id]/start
 *
 * This route launches the active voice conversational interface where job candidates
 * participate in a structured speech interview with Alex (our AI Recruiter).
 */
export const metadata = {
  title: 'Live AI Voice Screening — AI Interview System',
  description: 'Real-time conversational voice interview powered by Vapi and Google Gemini AI.',
};

export default async function StartInterviewPage({ params }) {
  const { interview_Id } = await params;

  return (
    <main className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[hsl(222,47%,6%)] via-[hsl(222,47%,8%)] to-[hsl(222,47%,6%)]">
      <div className="w-full max-w-7xl mx-auto">
        <VapiCallContainer interviewId={interview_Id} />
      </div>
    </main>
  );
}
