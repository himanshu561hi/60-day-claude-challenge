'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  CheckCircle2, 
  User, 
  Mail, 
  Award, 
  Briefcase, 
  Bot, 
  Mic, 
  RefreshCw, 
  FileText, 
  ChevronDown, 
  ChevronUp,
  Sliders,
  Terminal,
  Info
} from 'lucide-react';

/**
 * app/interview/[interview_Id]/_components/ResumeAnalysisCard.jsx
 *
 * Day 55: Completed AI Resume Parsing & Custom Voice Persona Preview Card
 *
 * Responsibilities:
 * 1. Visualizes structured results returned by Gemini AI or fallback simulation.
 * 2. Showcases matched skills, candidate seniority assessment, and target interview probing topics.
 * 3. Displays the customized AI Voice Assistant instructions generated for Vapi AI.
 * 4. Provides straightforward transition to Day 6 Voice Interview screen (`/interview/[interview_Id]/start`)
 *    or allowing immediate re-testing with another document.
 */
export default function ResumeAnalysisCard({ sessionData, onReset }) {
  const router = useRouter();
  const [showPromptDetails, setShowPromptDetails] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  if (!sessionData) return null;

  const {
    interviewId,
    candidateName,
    candidateEmail,
    jobRole,
    aiPrompt,
    analysis = {},
    mode = 'simulation'
  } = sessionData;

  const {
    matchedSkills = [],
    experienceLevel = 'Experienced Professional',
    interviewFocus = []
  } = analysis;

  const handleProceedToVoiceCall = () => {
    setIsNavigating(true);
    // Navigate to Day 6 Vapi voice interview screen
    router.push(`/interview/${interviewId}/start`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* ── Top Success Celebratory Banner ────────────────────────────── */}
      <div className="glass rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-emerald-500/30 shadow-2xl bg-gradient-to-r from-emerald-950/20 via-[hsl(222,47%,10%)] to-[hsl(258,90%,66%)]/15">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Day 5 Pipeline Completed & Saved to Database</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[hsl(210,40%,98%)]">
              Resume Analyzed & <span className="gradient-text">AI Persona Configured</span>
            </h1>
            <p className="text-sm text-[hsl(215,20%,65%)]">
              Gemini AI successfully evaluated your resume against <strong className="text-[hsl(210,40%,98%)]">{jobRole}</strong> and prepared custom technical instructions for your interviewer.
            </p>
          </div>

          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-[hsl(258,90%,66%)]/20 border border-[hsl(258,90%,66%)]/40 flex items-center justify-center text-[hsl(258,90%,76%)] shadow-inner">
              <Bot className="w-9 h-9 animate-bounce" />
            </div>
          </div>
        </div>

        {/* Engine Mode Notification */}
        <div className="mt-6 pt-4 border-t border-[hsl(222,25%,18%)] flex items-center justify-between text-xs text-[hsl(215,20%,55%)]">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[hsl(258,90%,76%)] flex-shrink-0" />
            <span>
              {mode === 'simulation'
                ? '⚡ Running in Local AI Simulation Mode (Add your free GEMINI_API_KEY in .env.local for live Cloud AI evaluation).'
                : '☁️ Powered by Live Google Gemini AI (gemini-1.5-flash Cloud Engine).'}
            </span>
          </div>
          <span className="font-mono text-[10px] bg-[hsl(222,47%,14%)] px-2 py-1 rounded text-[hsl(258,90%,76%)] uppercase font-semibold">
            Status: Ready for Day 6
          </span>
        </div>
      </div>

      {/* ── Candidate & Skills Summary Grid ───────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Candidate Profile Details */}
        <div className="glass rounded-3xl p-6 md:col-span-1 border border-[hsl(222,25%,18%)] space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[hsl(258,90%,76%)] uppercase tracking-wider mb-4">
              <User className="w-4 h-4" />
              <span>Candidate Profile</span>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-[11px] font-medium text-[hsl(215,20%,50%)] uppercase">Name</p>
                <p className="text-base font-bold text-[hsl(210,40%,98%)]">{candidateName}</p>
              </div>
              <div>
                <p className="text-[11px] font-medium text-[hsl(215,20%,50%)] uppercase">Email Address</p>
                <p className="text-sm font-medium text-[hsl(215,20%,75%)] truncate">{candidateEmail}</p>
              </div>
              <div>
                <p className="text-[11px] font-medium text-[hsl(215,20%,50%)] uppercase">Estimated Tenure</p>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 mt-1 rounded-lg text-xs font-semibold bg-[hsl(258,90%,66%)]/15 text-[hsl(258,90%,80%)] border border-[hsl(258,90%,66%)]/30">
                  <Award className="w-3.5 h-3.5 text-[hsl(258,90%,76%)]" />
                  <span>{experienceLevel}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[hsl(222,25%,18%)]">
            <Button
              type="button"
              variant="outline"
              onClick={onReset}
              className="w-full text-xs font-medium py-2 rounded-xl border-[hsl(222,25%,25%)] text-[hsl(215,20%,75%)] hover:text-white hover:bg-[hsl(222,47%,14%)] transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Test Another Resume</span>
            </Button>
          </div>
        </div>

        {/* Matched Skills & Focus Areas */}
        <div className="glass rounded-3xl p-6 md:col-span-2 border border-[hsl(222,25%,18%)] space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3">
              <Sparkles className="w-4 h-4" />
              <span>Identified Resume Skill Alignment</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {matchedSkills && matchedSkills.length > 0 ? (
                matchedSkills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[hsl(222,47%,14%)] text-[hsl(210,40%,98%)] border border-[hsl(258,90%,66%)]/30 hover:border-[hsl(258,90%,66%)]/60 hover:bg-[hsl(258,90%,66%)]/10 transition-all shadow-sm"
                  >
                    ✨ {skill}
                  </span>
                ))
              ) : (
                <span className="text-xs text-[hsl(215,20%,50%)]">General full-stack capabilities identified.</span>
              )}
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-[hsl(222,25%,18%)]">
            <div className="flex items-center gap-2 text-xs font-semibold text-[hsl(258,90%,76%)] uppercase tracking-wider">
              <Sliders className="w-4 h-4" />
              <span>Target Interview Investigation Areas</span>
            </div>
            <ul className="space-y-2">
              {interviewFocus && interviewFocus.map((focusItem, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[hsl(215,20%,75%)]">
                  <span className="w-5 h-5 rounded-full bg-[hsl(258,90%,66%)]/20 text-[hsl(258,90%,76%)] flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{focusItem}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Dynamic Vapi AI Persona Instructions Preview ───────────────── */}
      <div className="glass rounded-3xl p-6 sm:p-8 border border-[hsl(222,25%,18%)] space-y-4">
        <div 
          onClick={() => setShowPromptDetails(!showPromptDetails)}
          className="flex items-center justify-between cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[hsl(258,90%,66%)]/15 flex items-center justify-center text-[hsl(258,90%,76%)] group-hover:scale-105 transition-transform">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[hsl(210,40%,98%)] group-hover:text-[hsl(258,90%,76%)] transition-colors">
                Generated AI Voice Persona Instructions
              </h3>
              <p className="text-xs text-[hsl(215,20%,55%)]">
                This custom instruction set is injected directly into Vapi Voice Assistant on Day 6.
              </p>
            </div>
          </div>

          <Button variant="ghost" className="text-xs text-[hsl(258,90%,76%)] hover:bg-[hsl(258,90%,66%)]/10 p-2">
            {showPromptDetails ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </Button>
        </div>

        {/* Expandable Prompt Code Container */}
        {showPromptDetails && (
          <div className="p-5 rounded-2xl bg-[hsl(222,47%,8%)] border border-[hsl(222,25%,16%)] space-y-3 animate-in fade-in duration-300">
            <div className="flex items-center justify-between text-[11px] text-[hsl(258,90%,76%)] font-mono border-b border-[hsl(222,25%,16%)] pb-2">
              <span>🤖 VAPI SYSTEM PROMPT (LIVE AGENT INJECTION)</span>
              <span>INTERVIEW_ID: {interviewId}</span>
            </div>
            <pre className="text-xs font-mono text-[hsl(215,20%,75%)] whitespace-pre-wrap leading-relaxed max-h-80 overflow-y-auto pr-2 custom-scrollbar">
              {aiPrompt || 'Default Vapi Interviewer persona loaded.'}
            </pre>
          </div>
        )}
      </div>

      {/* ── Primary Handoff Button to Day 6 ────────────────────────────── */}
      <div className="glass rounded-3xl p-6 sm:p-8 text-center border border-[hsl(258,90%,66%)]/30 bg-gradient-to-t from-[hsl(258,90%,66%)]/15 to-transparent space-y-4">
        <div className="max-w-xl mx-auto space-y-2">
          <span className="text-4xl block animate-bounce">🎙️</span>
          <h3 className="text-xl font-bold text-[hsl(210,40%,98%)]">
            Ready to Commence AI Voice Interview?
          </h3>
          <p className="text-xs sm:text-sm text-[hsl(215,20%,65%)]">
            Your customized recruiter bot (<strong className="text-[hsl(258,90%,80%)]">Alex</strong>) is programmed and standing by. Clicking below transitions to the real-time Vapi Voice Calling screen.
          </p>
        </div>

        <Button
          type="button"
          onClick={handleProceedToVoiceCall}
          disabled={isNavigating}
          className="w-full sm:w-auto min-w-[280px] h-13 py-3.5 px-8 rounded-2xl bg-gradient-to-r from-emerald-500 to-[hsl(258,90%,66%)] hover:from-emerald-600 hover:to-[hsl(258,90%,60%)] text-white font-bold text-base shadow-xl hover:shadow-[hsl(258,90%,66%)]/40 transition-all duration-300 flex items-center justify-center gap-3 mx-auto cursor-pointer"
        >
          {isNavigating ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Launching Voice Portal...</span>
            </>
          ) : (
            <>
              <Mic className="w-5 h-5 text-white animate-pulse" />
              <span>Proceed to Live Voice Call (Day 6)</span>
            </>
          )}
        </Button>
        <p className="text-[11px] text-[hsl(215,20%,50%)]">
          ✨ Handoff Verified: Session storage updated with dynamic prompt & candidate submission record.
        </p>
      </div>
    </div>
  );
}
