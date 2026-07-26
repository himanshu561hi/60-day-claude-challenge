'use client';

import React, { useState, useRef } from 'react';
import { supabase } from '@/services/supabaseClient';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  UploadCloud, 
  FileText, 
  User, 
  Mail, 
  Wand2, 
  Loader2, 
  Briefcase, 
  CheckCircle2, 
  AlertCircle,
  Trash2,
  HelpCircle
} from 'lucide-react';

/**
 * app/interview/[interview_Id]/_components/CandidateIntakeForm.jsx
 *
 * Day 55: Public Candidate Onboarding Form & Resume File Upload Picker
 *
 * Responsibilities:
 * 1. Presents target Job Role & Description to candidate.
 * 2. Captures Candidate Name, Email, and PDF Resume File.
 * 3. Provides a one-click "✨ Load Demo Candidate & Resume" for instantaneous zero-setup testing.
 * 4. Submits form payload to `/api/ai-model` for PDF parsing and Gemini AI persona evaluation.
 * 5. Saves extracted candidate submission details directly into Supabase `candidate_submissions` table.
 * 6. Transitions view to the customized AI Analysis preview screen.
 */
export default function CandidateIntakeForm({ interviewId, jobRole, jobDescription, onAnalysisComplete }) {
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [demoResumeText, setDemoResumeText] = useState('');
  const [isDemoLoaded, setIsDemoLoaded] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formError, setFormError] = useState('');
  const fileInputRef = useRef(null);

  /**
   * Helper: Auto-fills realistic demo candidate data for instant testing
   */
  const handleLoadDemo = () => {
    setCandidateName('Alex Morgan');
    setCandidateEmail('alex.morgan.developer@example.com');
    setSelectedFile(null);
    setDemoResumeText(
      'Senior Full-Stack & Cloud AI Engineer with 7 years of enterprise development experience specializing in React 19, Next.js 15 App Router, Tailwind CSS v4, and Node.js microservices. Deep expertise architecting reliable PostgreSQL databases with Supabase Row Level Security (RLS) and designing low-latency WebSocket conversational interfaces. Over the last 3 years at CorePulse AI, led a team of 6 engineers migrating legacy monolithic infrastructure to serverless architectures, reducing compute latency by 45% while handling 1.5 million interactive user sessions daily. Highly proficient in system resilience, complex state synchronization, algorithm optimization, and automated end-to-end testing pipelines.'
    );
    setIsDemoLoaded(true);
    setFormError('');
    toast.info('Loaded sample senior engineer profile & demo resume text!');
  };

  /**
   * Handle physical file input selection
   */
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast.error('Invalid File Type: Please upload a valid PDF (.pdf) document.');
      setFormError('Only PDF files are accepted for resume parsing.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error('File exceeds 5MB limit. Please provide a smaller document.');
      return;
    }

    setSelectedFile(file);
    setIsDemoLoaded(false);
    setDemoResumeText('');
    setFormError('');
    toast.success(`Attached resume: ${file.name}`);
  };

  /**
   * Clear currently attached file or demo data
   */
  const handleClearAttachment = () => {
    setSelectedFile(null);
    setIsDemoLoaded(false);
    setDemoResumeText('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  /**
   * Submit registration to /api/ai-model and insert into Supabase
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!candidateName.trim() || candidateName.trim().length < 2) {
      setFormError('Please enter your full name (minimum 2 characters).');
      return;
    }
    if (!candidateEmail.trim() || !candidateEmail.includes('@')) {
      setFormError('Please provide a valid contact email address.');
      return;
    }
    if (!selectedFile && !isDemoLoaded) {
      setFormError('Please upload your PDF resume or click "Load Demo Data" to proceed.');
      return;
    }

    setIsAnalyzing(true);
    toast.loading('Extracting resume structure & soliciting Gemini AI instructions...', { id: 'ai-analyze' });

    try {
      // 1. Prepare FormData for serverless API
      const formData = new FormData();
      formData.append('candidateName', candidateName.trim());
      formData.append('candidateEmail', candidateEmail.trim());
      formData.append('jobRole', jobRole || 'Technical Interview Candidate');
      formData.append('jobDescription', jobDescription || '');

      if (selectedFile) {
        formData.append('resume', selectedFile);
      } else if (isDemoLoaded && demoResumeText) {
        formData.append('resumeText', demoResumeText);
      }

      // 2. Execute POST to /api/ai-model
      const response = await fetch('/api/ai-model', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        throw new Error(result.error || 'Failed to parse candidate profile via AI endpoint.');
      }

      toast.dismiss('ai-analyze');

      if (result.mode === 'simulation') {
        toast.success('Profile analyzed successfully (Running in AI Simulation Demo Mode)! ✨');
      } else {
        toast.success('Gemini AI completed customized resume & persona evaluation! 🤖🎉');
      }

      // 3. Save candidate submission record directly into Supabase database
      let submissionId = null;
      try {
        const { data: insertData, error: dbError } = await supabase
          .from('candidate_submissions')
          .insert([
            {
              interview_id: interviewId,
              candidate_name: candidateName.trim(),
              candidate_email: candidateEmail.trim(),
              resume_text: result.resumeText || demoResumeText || 'Extracted resume content',
              strengths: result.analysis?.matchedSkills || [],
              weaknesses: [],
              suggestions: 'Awaiting live call transcription on Day 7.',
              transcript: []
            }
          ])
          .select();

        if (dbError) {
          console.warn('[CandidateIntakeForm] Notice on Supabase insert (might be local demo mode without real DB UUID):', dbError.message);
          // We do NOT interrupt testing if DB insertion encounters local sandbox mismatch
        } else if (insertData && insertData.length > 0) {
          submissionId = insertData[0].id;
          console.log('[CandidateIntakeForm] Saved submission row in PostgreSQL:', submissionId);
        }
      } catch (dbEx) {
        console.warn('[CandidateIntakeForm] Offline Supabase catch:', dbEx.message);
      }

      // 4. Build complete session package and persist in sessionStorage for Day 6 Vapi call
      const sessionData = {
        interviewId,
        submissionId: submissionId || `demo-sub-${Date.now()}`,
        candidateName: candidateName.trim(),
        candidateEmail: candidateEmail.trim(),
        jobRole: jobRole || 'Senior Full-Stack Engineer',
        jobDescription: jobDescription || '',
        resumeText: result.resumeText,
        aiPrompt: result.aiPrompt,
        analysis: result.analysis,
        mode: result.mode
      };

      try {
        sessionStorage.setItem('active_vapi_session', JSON.stringify(sessionData));
        sessionStorage.setItem(`vapi_session_${interviewId}`, JSON.stringify(sessionData));
      } catch (storageErr) {
        console.error('sessionStorage save error:', storageErr);
      }

      // 5. Invoke completion handler to display Results & Preview Card
      if (onAnalysisComplete) {
        onAnalysisComplete(sessionData);
      }

    } catch (error) {
      toast.dismiss('ai-analyze');
      console.error('[CandidateIntakeForm] Submission failure:', error);
      toast.error(`Evaluation Error: ${error.message}`);
      setFormError(error.message || 'An error occurred during profile evaluation.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* ── Role Header Card ────────────────────────────────────────── */}
      <div className="glass rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-[hsl(258,90%,66%)]/20 shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[hsl(258,90%,66%)]/15 via-transparent to-transparent pointer-events-none" />
        
        <div className="space-y-4 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[hsl(258,90%,66%)]/15 text-[hsl(258,90%,80%)] border border-[hsl(258,90%,66%)]/30">
              <Sparkles className="w-3.5 h-3.5 text-[hsl(258,90%,76%)] animate-pulse" />
              <span>AI-Powered Technical Screening</span>
            </div>

            {/* Quick-Fill Demo Button */}
            <Button
              type="button"
              onClick={handleLoadDemo}
              variant="outline"
              className="text-xs font-medium px-3 py-2 rounded-xl bg-[hsl(258,90%,66%)]/10 border-[hsl(258,90%,66%)]/35 text-[hsl(258,90%,80%)] hover:bg-[hsl(258,90%,66%)]/25 hover:border-[hsl(258,90%,66%)]/60 transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-md group"
            >
              <Wand2 className="w-3.5 h-3.5 text-[hsl(258,90%,76%)] group-hover:rotate-12 transition-transform" />
              <span>Load Demo Resume & Candidate</span>
            </Button>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-medium text-[hsl(215,20%,55%)] uppercase tracking-wider">Target Job Opportunity</p>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[hsl(210,40%,98%)]">
              {jobRole || 'Senior Engineering Role'}
            </h1>
          </div>

          <div className="p-4 rounded-2xl bg-[hsl(222,47%,10%)]/70 border border-[hsl(222,25%,18%)]">
            <div className="flex items-center gap-2 text-xs font-semibold text-[hsl(215,20%,75%)] mb-2">
              <Briefcase className="w-4 h-4 text-[hsl(258,90%,76%)]" />
              <span>Role Evaluation Scope</span>
            </div>
            <p className="text-xs sm:text-sm text-[hsl(215,20%,65%)] leading-relaxed line-clamp-4 hover:line-clamp-none transition-all">
              {jobDescription || 'Comprehensive software engineering background evaluation, technical probing, and conversational problem solving assessment.'}
            </p>
          </div>
        </div>
      </div>

      {/* ── Candidate Intake Form Card ─────────────────────────────── */}
      <form onSubmit={handleSubmit} className="glass rounded-3xl p-6 sm:p-8 space-y-6 relative z-10 border border-[hsl(222,25%,18%)] shadow-2xl">
        <div className="border-b border-[hsl(222,25%,18%)] pb-4">
          <h2 className="text-lg font-bold text-[hsl(210,40%,98%)] flex items-center gap-2">
            <User className="w-5 h-5 text-[hsl(258,90%,76%)]" />
            <span>Candidate Onboarding Portal</span>
          </h2>
          <p className="text-xs text-[hsl(215,20%,55%)] mt-1">
            Provide your contact credentials and resume document below. Our Gemini AI engine will parse your achievements and configure your tailored voice interviewer persona.
          </p>
        </div>

        {/* Name & Email Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[hsl(215,20%,70%)] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[hsl(258,90%,76%)]" />
              <span>Full Name</span>
            </label>
            <input
              type="text"
              required
              disabled={isAnalyzing}
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              placeholder="e.g. Alex Morgan"
              className="w-full bg-[hsl(222,47%,10%)] border border-[hsl(222,25%,18%)] focus:border-[hsl(258,90%,66%)] focus:ring-1 focus:ring-[hsl(258,90%,66%)] rounded-xl px-4 py-3 text-sm text-[hsl(210,40%,98%)] placeholder-[hsl(215,20%,40%)] outline-none transition-all disabled:opacity-50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[hsl(215,20%,70%)] flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[hsl(258,90%,76%)]" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              required
              disabled={isAnalyzing}
              value={candidateEmail}
              onChange={(e) => setCandidateEmail(e.target.value)}
              placeholder="alex.morgan@example.com"
              className="w-full bg-[hsl(222,47%,10%)] border border-[hsl(222,25%,18%)] focus:border-[hsl(258,90%,66%)] focus:ring-1 focus:ring-[hsl(258,90%,66%)] rounded-xl px-4 py-3 text-sm text-[hsl(210,40%,98%)] placeholder-[hsl(215,20%,40%)] outline-none transition-all disabled:opacity-50"
            />
          </div>
        </div>

        {/* File Upload / Resume Section */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-[hsl(215,20%,70%)] flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[hsl(258,90%,76%)]" />
              <span>Attach PDF Resume or Profile Statement</span>
            </div>
            <span className="text-[10px] text-[hsl(215,20%,50%)] font-normal">Format: .PDF (Max 5MB)</span>
          </label>

          {/* Upload Drop Zone / Active File View */}
          {!selectedFile && !isDemoLoaded ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[hsl(222,25%,22%)] hover:border-[hsl(258,90%,66%)] bg-[hsl(222,47%,10%)]/50 hover:bg-[hsl(222,47%,12%)] rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 group flex flex-col items-center justify-center space-y-3"
            >
              <div className="w-12 h-12 rounded-full bg-[hsl(258,90%,66%)]/10 flex items-center justify-center text-[hsl(258,90%,76%)] group-hover:scale-110 transition-transform">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[hsl(210,40%,98%)] group-hover:text-[hsl(258,90%,76%)] transition-colors">
                  Click to select PDF resume file
                </p>
                <p className="text-xs text-[hsl(215,20%,55%)] mt-1">
                  Or use <span className="text-[hsl(258,90%,76%)] font-medium">✨ Load Demo Resume</span> above for instant zero-configuration testing
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf,.pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          ) : (
            /* Active File or Demo Loaded Badge */
            <div className="p-5 rounded-2xl bg-[hsl(258,90%,66%)]/10 border border-[hsl(258,90%,66%)]/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[hsl(258,90%,66%)]/20 flex items-center justify-center flex-shrink-0 text-[hsl(258,90%,76%)]">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[hsl(210,40%,98%)] truncate">
                    {selectedFile ? selectedFile.name : '✨ Sample Senior Engineer Resume (Demo Data Mode)'}
                  </p>
                  <p className="text-xs text-[hsl(258,90%,76%)] font-medium flex items-center gap-1.5 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 inline" />
                    <span>{selectedFile ? `${Math.round(selectedFile.size / 1024)} KB Attached & ready for PDF parsing` : 'Pre-configured resume text loaded for instant AI evaluation'}</span>
                  </p>
                </div>
              </div>

              <Button
                type="button"
                variant="ghost"
                onClick={handleClearAttachment}
                disabled={isAnalyzing}
                className="text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 p-2 h-auto rounded-lg flex-shrink-0"
                title="Remove attachment"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Error Message Banner */}
        {formError && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-rose-300 text-xs sm:text-sm animate-in fade-in duration-300">
            <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold">Unable to proceed</p>
              <p>{formError}</p>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          <Button
            type="submit"
            disabled={isAnalyzing}
            className="w-full h-13 py-3.5 px-6 rounded-2xl bg-[hsl(258,90%,66%)] hover:bg-[hsl(258,90%,60%)] text-white font-semibold text-base shadow-lg hover:shadow-[hsl(258,90%,66%)]/30 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer disabled:opacity-70"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Evaluating Resume & Building AI Persona...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Analyze Resume with Gemini AI</span>
              </>
            )}
          </Button>
          <p className="text-[11px] text-center text-[hsl(215,20%,50%)] mt-3">
            🔒 By clicking analyze, your resume is evaluated securely in real-time to customize your interactive AI voice interview.
          </p>
        </div>
      </form>
    </div>
  );
}
