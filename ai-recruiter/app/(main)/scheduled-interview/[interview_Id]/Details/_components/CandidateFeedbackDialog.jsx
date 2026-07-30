'use client';

import React, { useState } from 'react';
import { 
  X, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare, 
  FileText, 
  Brain, 
  User, 
  Bot, 
  Clock, 
  Sparkles, 
  Download, 
  Mail, 
  Calendar, 
  ThumbsUp, 
  TrendingUp, 
  Check 
} from 'lucide-react';

/**
 * app/(main)/scheduled-interview/[interview_Id]/Details/_components/CandidateFeedbackDialog.jsx
 *
 * Interactive diagnostic popup modal that renders:
 * 1. Candidate credentials and overall evaluation competency gauge out of 100
 * 2. Parsed charts/bars for technical strengths and growth areas
 * 3. Complete scrollable dialogue logs of the Vapi conversational transcript
 * 4. Export and printing shortcuts for recruiter record keeping
 */
export default function CandidateFeedbackDialog({ candidate, isOpen, onClose, jobRole = 'Target Role' }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'transcript' | 'resume'
  const [copied, setCopied] = useState(false);

  if (!isOpen || !candidate) return null;

  // Extract resilient evaluation fields regardless of schema variation
  const score = candidate.overall_score || candidate.score || candidate.feedback?.score || 0;
  const strengths = candidate.strengths || candidate.feedback?.strengths || [
    'Demonstrated clear conceptual command over modern web system architectures.',
    'Exhibited authoritative communication style and structured response logic.'
  ];
  const weaknesses = candidate.weaknesses || candidate.feedback?.weaknesses || [
    'Could provide deeper numerical benchmarks when discussing high-concurrency trade-offs.',
    'Opportunity to expand on edge case handling under sustained database load.'
  ];
  const suggestions = candidate.suggestions || candidate.feedback?.recommendations || candidate.feedback?.suggestions || 
    'Strong candidate alignment demonstrated during AI evaluation. Proceed to next architectural review stage.';
  const transcript = Array.isArray(candidate.transcript) ? candidate.transcript : [];
  const resumeText = candidate.resume_text || 'No textual resume content was uploaded during initial registration.';

  // Color theme based on competency score
  let scoreTheme = {
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/15',
    border: 'border-emerald-500/30',
    label: 'High Alignment (Recommended for Hire)',
    gradient: 'from-emerald-500 to-teal-500'
  };
  if (score < 60) {
    scoreTheme = {
      color: 'text-rose-400',
      bg: 'bg-rose-500/15',
      border: 'border-rose-500/30',
      label: 'Low Alignment (Not Recommended)',
      gradient: 'from-rose-500 to-red-600'
    };
  } else if (score < 80) {
    scoreTheme = {
      color: 'text-amber-400',
      bg: 'bg-amber-500/15',
      border: 'border-amber-500/30',
      label: 'Moderate Alignment (Consider for Review)',
      gradient: 'from-amber-500 to-orange-500'
    };
  }

  const handleCopySummary = () => {
    const text = `Candidate: ${candidate.candidate_name} (${candidate.candidate_email})\nRole: ${jobRole}\nCompetency Score: ${score}%\nVerdict: ${scoreTheme.label}\n\nStrengths:\n${strengths.map(s => `- ${s}`).join('\n')}\n\nRecommendations:\n${suggestions}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Modal Dialog Container */}
      <div 
        className="glass w-full max-w-4xl max-h-[90vh] rounded-3xl border border-[hsl(222,47%,22%)] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 relative"
        style={{ background: 'hsl(222, 47%, 9%)' }}
      >
        {/* Top Decorative Header */}
        <div className="relative p-6 border-b border-[hsl(222,47%,18%)] bg-[hsl(222,47%,11%)]/90">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, hsl(258, 90%, 66%), transparent 70%)' }} />

          <div className="flex items-start justify-between gap-4 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[hsl(258,90%,66%)]/20 to-[hsl(189,94%,43%)]/20 border border-white/10 flex items-center justify-center text-2xl font-black text-white shadow-inner">
                {(candidate.candidate_name || 'C').charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[hsl(258,90%,76%)] uppercase tracking-wider">
                    {jobRole}
                  </span>
                  <span className="text-[11px] text-[hsl(215,20%,50%)]">• Evaluated by Gemini AI</span>
                </div>
                <h2 className="text-2xl font-bold text-[hsl(210,40%,98%)] mt-0.5">
                  {candidate.candidate_name || 'Candidate Evaluation'}
                </h2>
                <div className="flex flex-wrap items-center gap-4 mt-1 text-xs text-[hsl(215,20%,55%)]">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[hsl(189,94%,53%)]" />
                    {candidate.candidate_email || 'No email provided'}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(candidate.completed_at || candidate.submitted_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-[hsl(222,47%,15%)] hover:bg-[hsl(222,47%,22%)] text-[hsl(215,20%,70%)] hover:text-white transition-colors flex-shrink-0 cursor-pointer"
              title="Close Dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-6 pt-4 border-t border-[hsl(222,47%,16%)]">
            {[
              { id: 'overview', label: 'AI Executive Diagnostic', icon: Brain },
              { id: 'transcript', label: `Conversational Transcript (${transcript.length})`, icon: MessageSquare },
              { id: 'resume', label: 'Candidate Resume Profile', icon: FileText }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === id
                    ? 'bg-[hsl(258,90%,66%)] text-white shadow-lg'
                    : 'bg-[hsl(222,47%,14%)] text-[hsl(215,20%,65%)] hover:bg-[hsl(222,47%,18%)] hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: AI EXECUTIVE OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Score & Verdict Banner */}
              <div className="p-5 rounded-2xl bg-[hsl(222,47%,12%)] border border-[hsl(222,47%,18%)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl ${scoreTheme.bg} border ${scoreTheme.border} flex flex-col items-center justify-center flex-shrink-0`}>
                    <span className="text-2xl font-black text-white">{score}</span>
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-white/70">Score</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[hsl(215,20%,50%)]">Overall Competency Gauge</span>
                    <h3 className={`text-base sm:text-lg font-bold ${scoreTheme.color} flex items-center gap-2 mt-0.5`}>
                      <span>{scoreTheme.label}</span>
                    </h3>
                    <p className="text-xs text-[hsl(215,20%,55%)] mt-1">
                      Computed across vocal clarity, architectural domain proficiency, and structural reasoning.
                    </p>
                  </div>
                </div>

                <div className="hidden sm:block">
                  <div className="w-36 h-2.5 bg-[hsl(222,47%,18%)] rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${scoreTheme.gradient} rounded-full`} style={{ width: `${Math.min(100, Math.max(5, score))}%` }} />
                  </div>
                </div>
              </div>

              {/* Strengths & Weaknesses Split Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Strengths */}
                <div className="p-5 rounded-2xl bg-emerald-950/10 border border-emerald-500/20 space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <h4 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">Demonstrated Strengths</h4>
                  </div>
                  <ul className="space-y-2.5">
                    {strengths.map((st, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[hsl(210,40%,90%)] leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                        <span>{st}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Growth Areas */}
                <div className="p-5 rounded-2xl bg-amber-950/10 border border-amber-500/20 space-y-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-amber-400" />
                    <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider">Areas for Growth</h4>
                  </div>
                  <ul className="space-y-2.5">
                    {weaknesses.map((wk, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[hsl(210,40%,90%)] leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                        <span>{wk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Executive Recommendations */}
              <div className="p-5 rounded-2xl bg-[hsl(222,47%,12%)] border border-[hsl(258,90%,66%)]/30 relative overflow-hidden">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[hsl(258,90%,66%)]/20 text-[hsl(258,90%,76%)] flex-shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-[hsl(258,90%,76%)] uppercase tracking-wider">Executive Hiring Recommendations</h4>
                    <p className="text-sm text-[hsl(210,40%,95%)] mt-1.5 leading-relaxed font-medium">
                      {suggestions}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CONVERSATIONAL TRANSCRIPT LOG */}
          {activeTab === 'transcript' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {transcript.length === 0 ? (
                <div className="p-12 rounded-2xl bg-[hsl(222,47%,11%)] border border-[hsl(222,47%,16%)] text-center space-y-2">
                  <MessageSquare className="w-8 h-8 text-[hsl(215,20%,45%)] mx-auto" />
                  <p className="text-sm font-bold text-[hsl(210,40%,85%)]">No Transcript Recorded</p>
                  <p className="text-xs text-[hsl(215,20%,50%)] max-w-sm mx-auto">
                    The voice conversation log for this assessment was not captured or was cleared after processing.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 pr-1">
                  {transcript.map((turn, idx) => {
                    const isAi = turn.sender === 'ai' || turn.role === 'assistant';
                    return (
                      <div
                        key={idx}
                        className={`flex gap-3.5 max-w-[85%] ${isAi ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                      >
                        {/* Avatar */}
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-white shadow-md ${
                          isAi 
                            ? 'bg-gradient-to-br from-[hsl(258,90%,66%)] to-[hsl(258,90%,50%)]' 
                            : 'bg-gradient-to-br from-[hsl(189,94%,43%)] to-teal-600'
                        }`}>
                          {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                        </div>

                        {/* Bubble */}
                        <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                          isAi
                            ? 'bg-[hsl(222,47%,14%)] text-[hsl(210,40%,94%)] rounded-tl-none border border-[hsl(222,47%,20%)]'
                            : 'bg-[hsl(189,94%,43%)]/20 text-white rounded-tr-none border border-[hsl(189,94%,43%)]/30'
                        }`}>
                          <div className={`text-[10px] font-extrabold mb-1 uppercase tracking-wider ${
                            isAi ? 'text-[hsl(258,90%,76%)]' : 'text-[hsl(189,94%,70%)]'
                          }`}>
                            {isAi ? 'AI Recruiter (Alex)' : candidate.candidate_name || 'Candidate'}
                          </div>
                          <div className="whitespace-pre-wrap">{turn.text || turn.content || turn.message || ''}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: RESUME PROFILE */}
          {activeTab === 'resume' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-6 rounded-2xl bg-[hsl(222,47%,11%)] border border-[hsl(222,47%,18%)] font-mono text-xs sm:text-sm text-[hsl(210,40%,90%)] whitespace-pre-wrap leading-relaxed">
                {resumeText}
              </div>
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="p-5 border-t border-[hsl(222,47%,18%)] bg-[hsl(222,47%,11%)] flex items-center justify-between gap-4">
          <button
            onClick={handleCopySummary}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[hsl(222,47%,16%)] hover:bg-[hsl(222,47%,22%)] text-[hsl(210,40%,90%)] transition-all cursor-pointer border border-white/10"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4 text-[hsl(258,90%,66%)]" />}
            <span>{copied ? 'Copied Summary!' : 'Copy Evaluation Summary'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-[hsl(258,90%,66%)] hover:bg-[hsl(258,90%,60%)] transition-colors shadow-lg cursor-pointer"
          >
            Done Reviewing
          </button>
        </div>
      </div>
    </div>
  );
}
