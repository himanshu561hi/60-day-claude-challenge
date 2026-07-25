import React from 'react';
import FormContainer from './_components/FormContainer';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

/**
 * app/(main)/dashboard/create-interview/page.jsx — Create Interview Route
 *
 * This server component defines the /dashboard/create-interview route.
 * It renders a back navigation button and embeds the interactive
 * FormContainer client component.
 */
export const metadata = {
  title: 'Create Interview — AI Interview System',
  description: 'Set up a new AI voice interview role and generate candidate links',
};

export default function CreateInterviewPage() {
  return (
    <div className="min-h-full p-6 md:p-8 space-y-6 max-w-5xl mx-auto">
      {/* Top Back Navigation Link */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-xs font-medium text-[hsl(215,20%,55%)] hover:text-[hsl(258,90%,76%)] transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      {/* Main Interactive Form Component */}
      <section className="mt-2">
        <FormContainer />
      </section>
    </div>
  );
}
