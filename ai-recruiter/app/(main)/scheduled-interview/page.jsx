import React from 'react';
import InterviewList from './_components/InterviewList';

/**
 * app/(main)/scheduled-interview/page.jsx — All Interviews & Candidate Pipelines
 *
 * Server component that sets page metadata and renders the client-side
 * InterviewList container for managing created interview templates and submissions.
 */
export const metadata = {
  title: 'All Interviews — AI Interview System',
  description: 'Manage interview templates, track candidate submission pipelines, and analyze feedback.',
};

export default function ScheduledInterviewPage() {
  return (
    <div className="min-h-full p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[hsl(222,47%,16%)] pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[hsl(210,40%,98%)] mb-1">
            All Interviews
          </h1>
          <p className="text-sm text-[hsl(215,20%,55%)]">
            Manage your interview pipelines, copy shareable assessment links, and review candidate evaluations.
          </p>
        </div>
      </div>

      {/* Main Interactive List */}
      <InterviewList />
    </div>
  );
}
