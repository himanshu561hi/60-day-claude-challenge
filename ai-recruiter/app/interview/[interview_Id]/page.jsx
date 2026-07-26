import React from 'react';
import { supabase } from '@/services/supabaseClient';
import CandidatePortalContainer from './_components/CandidatePortalContainer';

/**
 * app/interview/[interview_Id]/page.jsx
 *
 * Day 55: Public Candidate Intake & Gemini Resume Analysis Portal
 *
 * URL: /interview/[interview_Id] (Publicly Accessible — No Auth Required)
 *
 * Responsibilities:
 * 1. Unwraps Next.js 15 routing parameters (`interview_Id`).
 * 2. Fetches matching Interview Template details (`job_role`, `job_description`) from Supabase DB.
 * 3. Includes graceful demo fallbacks if an arbitrary or sandbox ID is supplied during local testing.
 * 4. Renders the interactive CandidatePortalContainer interface.
 */
export const metadata = {
  title: 'Candidate Onboarding & AI Screening — AI Interview System',
  description: 'Upload your PDF resume for instant Gemini AI evaluation and customized real-time voice interview setup.'
};

export default async function CandidateIntakePage({ params }) {
  const { interview_Id } = await params;

  let jobRole = 'Senior Full-Stack & AI Systems Engineer (Demo Role)';
  let jobDescription =
    'Looking for an accomplished developer proficient in React 19, Next.js 15 App Router, Tailwind CSS v4, Node.js, and Supabase PostgreSQL. Responsibilities include building responsive low-latency AI interfaces, designing serverless API architectures, and practicing rigorous code reviews.';

  // Attempt to load live interview profile from Supabase PostgreSQL
  try {
    const { data: interviewData, error } = await supabase
      .from('interviews')
      .select('job_role, job_description')
      .eq('id', interview_Id)
      .single();

    if (!error && interviewData) {
      jobRole = interviewData.job_role || jobRole;
      jobDescription = interviewData.job_description || jobDescription;
      console.log(`[Page /interview/${interview_Id}] Loaded template from database:`, jobRole);
    } else {
      console.warn(`[Page /interview/${interview_Id}] Notice: Could not fetch DB record (${error?.message || 'Not found'}). Utilizing high-fidelity Demo Role for seamless candidate evaluation.`);
    }
  } catch (err) {
    console.warn(`[Page /interview/${interview_Id}] Offline Supabase lookup fallback:`, err.message);
  }

  return (
    <main className="min-h-screen relative overflow-x-hidden pb-16 bg-gradient-to-b from-[hsl(222,47%,6%)] via-[hsl(222,47%,8%)] to-[hsl(222,47%,6%)]">
      {/* Ambient background glow decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[hsl(258,90%,66%)]/12 via-[hsl(258,90%,66%)]/5 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Main interactive portal */}
      <CandidatePortalContainer
        interviewId={interview_Id}
        jobRole={jobRole}
        jobDescription={jobDescription}
      />
    </main>
  );
}
