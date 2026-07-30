import React from 'react';
import CandidateList from './_components/CandidateList';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

/**
 * app/(main)/scheduled-interview/[interview_Id]/Details/page.jsx
 *
 * Server component that defines the candidate pipeline review route for a specific
 * interview template. Emphasizes clean navigation and renders the interactive
 * CandidateList table and feedback review interface.
 */
export const metadata = {
  title: 'Candidate Pipeline & AI Evaluations — AI Interview System',
  description: 'Inspect submitted candidate interview recordings, review Gemini AI diagnostic competency scores, and analyze conversational transcript logs.',
};

export default function InterviewDetailsPage() {
  return (
    <div className="min-h-full p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Back Navigation Link */}
      <div>
        <Link
          href="/scheduled-interview"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[hsl(215,20%,55%)] hover:text-[hsl(258,90%,76%)] transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Interviews Pipeline</span>
        </Link>
      </div>

      {/* Main Interactive Candidate Pipeline List & Feedback Dialog */}
      <CandidateList />
    </div>
  );
}
