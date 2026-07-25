'use client';

import React, { useState } from 'react';
import { useUser } from '@/hooks/useUser';
import { supabase } from '@/services/supabaseClient';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Sparkles, Briefcase, FileText, Loader2, Wand2, CheckCircle2 } from 'lucide-react';
import InterviewLink from './InterviewLink';

/**
 * app/(main)/dashboard/create-interview/_components/FormContainer.jsx
 *
 * The interactive Job Details Form for creating a new interview template.
 *
 * Responsibilities:
 * 1. Validates Recruiter inputs (Job Role & Job Description)
 * 2. Inserts a new record into the Supabase 'interviews' table
 * 3. Handles loading and error states with clear visual feedback
 * 4. Triggers the InterviewLink modal upon successful creation
 * 5. Includes a "Load Demo Role" helper for rapid testing
 */
export default function FormContainer() {
  const { userDetail, loading: userLoading } = useUser();
  
  // Form State
  const [jobRole, setJobRole] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Modal Dialog State
  const [createdInterviewId, setCreatedInterviewId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Rapid Test Helper: Auto-fills sample data for testing
   */
  const handleLoadDemo = () => {
    setJobRole('Senior Full-Stack Engineer (React & Next.js)');
    setJobDescription(
      'Looking for an experienced Senior Full-Stack Engineer proficient in React 19, Next.js 15 App Router, Tailwind CSS v4, Node.js, and Supabase PostgreSQL. Responsibilities include designing highly scalable architectures, building real-time AI user interfaces, optimizing serverless APIs, and practicing rigorous code review and CI/CD pipelines. Must demonstrate strong algorithmic problem-solving and clean code aesthetics.'
    );
    setFormError('');
    toast.info('Loaded demo job profile for testing!');
  };

  /**
   * Form Submission & Supabase Database Insertion
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    // 1. Basic Front-End Validation
    if (!jobRole.trim() || jobRole.trim().length < 2) {
      setFormError('Please enter a valid job role (at least 2 characters).');
      return;
    }
    if (!jobDescription.trim() || jobDescription.trim().length < 10) {
      setFormError('Please enter a comprehensive job description (at least 10 characters).');
      return;
    }

    // 2. Ensure Recruiter session exists
    const recruiterId = userDetail?.id;
    if (!recruiterId && !userLoading) {
      toast.error('Authentication Error: You must be logged in to create an interview.');
      setFormError('No authenticated session found. Please refresh or log in again.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 3. Insert record into Supabase 'interviews' table
      const { data, error } = await supabase
        .from('interviews')
        .insert([
          {
            recruiter_id: recruiterId,
            job_role: jobRole.trim(),
            job_description: jobDescription.trim(),
          },
        ])
        .select();

      if (error) {
        console.error('[FormContainer] Supabase insert error:', error);
        throw new Error(error.message || 'Failed to insert interview record.');
      }

      if (data && data.length > 0) {
        const newInterview = data[0];
        toast.success('Interview template generated successfully! 🎉');
        
        // Save ID and open the shareable link modal
        setCreatedInterviewId(newInterview.id);
        setIsModalOpen(true);
      } else {
        throw new Error('Database insert succeeded but returned empty ID.');
      }
    } catch (error) {
      console.error('[FormContainer] Error submitting form:', error);
      toast.error(`Creation Failed: ${error.message || 'Unknown database error'}`);
      setFormError(error.message || 'An error occurred while saving the interview template.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Reset form after modal closes or when user wants to start over
   */
  const handleModalClose = (open) => {
    setIsModalOpen(open);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      {/* ── Header Area ───────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 glass rounded-2xl p-6 relative overflow-hidden">
        <div className="space-y-1 z-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[hsl(258,90%,76%)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Step 1: Template Configuration</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[hsl(210,40%,98%)]">
            Define Target <span className="gradient-text">Job Profile</span>
          </h1>
          <p className="text-xs sm:text-sm text-[hsl(215,20%,55%)]">
            Configure the role requirements. Gemini AI will automatically adapt its questions and voice persona based on this description.
          </p>
        </div>

        {/* Demo Data Filler Button */}
        <div className="z-10 flex-shrink-0">
          <Button
            type="button"
            onClick={handleLoadDemo}
            variant="outline"
            className="text-xs font-medium px-3 py-2 rounded-xl bg-[hsl(258,90%,66%)]/10 border-[hsl(258,90%,66%)]/30 text-[hsl(258,90%,80%)] hover:bg-[hsl(258,90%,66%)]/20 hover:border-[hsl(258,90%,66%)]/50 transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Wand2 className="w-3.5 h-3.5 text-[hsl(258,90%,66%)]" />
            <span>Load Demo Data</span>
          </Button>
        </div>
      </div>

      {/* ── Form Interactive Container ─────────────────────────────────── */}
      <form
        onSubmit={handleSubmit}
        className="glass rounded-2xl p-6 sm:p-8 space-y-6 border border-[hsl(222,47%,14%)] relative shadow-2xl"
      >
        {/* Error Callout Banner */}
        {formError && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs sm:text-sm flex items-start gap-2 animate-in fade-in-0 duration-200">
            <span className="font-bold text-base">⚠️</span>
            <div>
              <p className="font-semibold">Unable to generate template:</p>
              <p className="text-red-400 mt-0.5">{formError}</p>
            </div>
          </div>
        )}

        {/* Field 1: Job Role / Title */}
        <div className="space-y-2">
          <label
            htmlFor="jobRole"
            className="flex items-center gap-2 text-sm font-medium text-[hsl(210,40%,90%)]"
          >
            <Briefcase className="w-4 h-4 text-[hsl(258,90%,66%)]" />
            <span>Job Role / Designation</span>
            <span className="text-red-400 text-xs">*</span>
          </label>
          <div className="relative">
            <input
              id="jobRole"
              type="text"
              required
              disabled={isSubmitting}
              placeholder="e.g. Senior Frontend Engineer (React & TypeScript)"
              value={jobRole}
              onChange={(e) => {
                setJobRole(e.target.value);
                if (formError) setFormError('');
              }}
              className="w-full px-4 py-3 rounded-xl bg-[hsl(222,47%,4%)] border border-[hsl(222,47%,15%)] focus:border-[hsl(258,90%,66%)] text-sm text-[hsl(210,40%,92%)] placeholder-[hsl(215,20%,35%)] focus:outline-none focus:ring-2 focus:ring-[hsl(258,90%,66%)]/20 transition-all duration-200 disabled:opacity-50"
            />
          </div>
          <p className="text-[11px] text-[hsl(215,20%,45%)]">
            This title will be displayed to candidates on the interview landing page.
          </p>
        </div>

        {/* Field 2: Job Description & Requirements */}
        <div className="space-y-2">
          <label
            htmlFor="jobDescription"
            className="flex items-center gap-2 text-sm font-medium text-[hsl(210,40%,90%)]"
          >
            <FileText className="w-4 h-4 text-[hsl(189,94%,43%)]" />
            <span>Job Description, Tech Stack & Evaluation Criteria</span>
            <span className="text-red-400 text-xs">*</span>
          </label>
          <div className="relative">
            <textarea
              id="jobDescription"
              rows={7}
              required
              disabled={isSubmitting}
              placeholder="Detail the core tech stack, daily responsibilities, mandatory qualifications, and specific technical topics you want the AI interviewer to probe..."
              value={jobDescription}
              onChange={(e) => {
                setJobDescription(e.target.value);
                if (formError) setFormError('');
              }}
              className="w-full px-4 py-3 rounded-xl bg-[hsl(222,47%,4%)] border border-[hsl(222,47%,15%)] focus:border-[hsl(189,94%,43%)] text-sm text-[hsl(210,40%,92%)] placeholder-[hsl(215,20%,35%)] focus:outline-none focus:ring-2 focus:ring-[hsl(189,94%,43%)]/20 transition-all duration-200 leading-relaxed disabled:opacity-50 resize-y"
            />
          </div>
          <div className="flex justify-between items-center text-[11px] text-[hsl(215,20%,45%)]">
            <span>💡 Provide at least 2–3 sentences so Gemini can formulate deep technical follow-up questions.</span>
            <span className={jobDescription.length < 10 ? 'text-amber-400/80' : 'text-emerald-400'}>
              {jobDescription.length} chars
            </span>
          </div>
        </div>

        {/* ── Submit Action Divider ────────────────────────────────────── */}
        <div className="pt-4 border-t border-[hsl(222,47%,14%)] flex items-center justify-end gap-3">
          <Button
            type="submit"
            disabled={isSubmitting || userLoading}
            className="px-8 py-6 rounded-xl text-sm font-semibold text-white shadow-xl hover:brightness-110 active:scale-95 transition-all duration-200 cursor-pointer w-full sm:w-auto"
            style={{
              background: isSubmitting
                ? 'hsl(222, 47%, 20%)'
                : 'linear-gradient(135deg, hsl(258, 90%, 66%), hsl(189, 94%, 43%))',
              boxShadow: '0 8px 25px rgba(139, 92, 246, 0.3)',
            }}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Deploying to Database...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Generate Interview & Link</span>
              </div>
            )}
          </Button>
        </div>
      </form>

      {/* ── Modal Dialog Overlay (Renders when template created) ─────── */}
      <InterviewLink
        isOpen={isModalOpen}
        onClose={handleModalClose}
        interviewId={createdInterviewId}
        jobRole={jobRole}
      />
    </div>
  );
}
