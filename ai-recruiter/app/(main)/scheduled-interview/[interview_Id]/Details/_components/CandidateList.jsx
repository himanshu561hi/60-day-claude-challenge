'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/services/supabaseClient';
import { toast } from 'sonner';
import CandidateFeedbackDialog from './CandidateFeedbackDialog';
import { 
  Users, 
  Search, 
  Calendar, 
  Award, 
  ArrowUpRight, 
  Sparkles, 
  Loader2, 
  Mail, 
  FileText, 
  Filter, 
  Wand2, 
  AlertCircle, 
  CheckCircle2, 
  Clock,
  ExternalLink
} from 'lucide-react';

/**
 * app/(main)/scheduled-interview/[interview_Id]/Details/_components/CandidateList.jsx
 *
 * Interactive candidate submissions dashboard for a specific interview template.
 * Features:
 * 1. Fetches interview metadata and candidate submissions from Supabase
 * 2. Color-coded evaluation scoring tags (Green >=80%, Yellow 60-79%, Red <60%)
 * 3. Search and filtering capabilities
 * 4. "Load Demo Candidates" QA simulation trigger for instant presentations
 * 5. Launches detailed CandidateFeedbackDialog overlay upon selection
 */
export default function CandidateList() {
  const params = useParams();
  const router = useRouter();
  const interviewId = params?.interview_Id;

  const [interview, setInterview] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDemoLoaded, setIsDemoLoaded] = useState(false);

  useEffect(() => {
    if (interviewId) {
      fetchInterviewAndCandidates();
    }
  }, [interviewId]);

  /**
   * Fetch job role specs and candidate evaluation results
   */
  const fetchInterviewAndCandidates = async () => {
    setLoading(true);
    try {
      // 1. Fetch interview details
      const { data: interviewData, error: intError } = await supabase
        .from('interviews')
        .select('*')
        .eq('id', interviewId)
        .single();

      if (intError && intError.code !== 'PGRST116') {
        console.warn('[CandidateList] Notice while fetching interview template:', intError.message);
      }

      setInterview(interviewData || {
        job_role: 'Senior Full-Stack AI Engineer',
        job_description: 'Architecting scalable serverless web applications and real-time LLM multi-modal pipelines.',
        created_at: new Date().toISOString()
      });

      // 2. Fetch candidate submissions
      const { data: submissionsData, error: subError } = await supabase
        .from('candidate_submissions')
        .select('*')
        .eq('interview_id', interviewId)
        .order('created_at', { ascending: false });

      if (subError) throw subError;

      if (submissionsData && submissionsData.length > 0) {
        setCandidates(submissionsData);
      } else {
        setCandidates([]);
      }
    } catch (error) {
      console.error('[CandidateList] Error fetching pipeline data:', error);
      toast.error('Could not connect to online candidate records. Switch to demo QA simulation if testing locally.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * QA Simulation Helper: Instantly injects 3 high-fidelity candidate records
   */
  const handleLoadDemoCandidates = () => {
    const demoRecords = [
      {
        id: 'demo-cand-1',
        candidate_name: 'Elena Rostova',
        candidate_email: 'elena.rostova@devai.tech',
        overall_score: 94,
        resume_text: 'Senior Full Stack Engineer with 7 years of experience in React, Next.js, Edge Serverless architectures, and Supabase vector embeddings. Proven track record leading high-concurrency systems at scale.',
        strengths: [
          'Exhibited masterful understanding of Next.js 15 App Router caching methodologies and Server-Sent Events (SSE).',
          'Demonstrated deep expertise in Supabase Row Level Security (RLS) policies and database partition performance.',
          'Articulated trade-offs between WebSocket audio token streaming and RESTful chunked polling seamlessly.'
        ],
        weaknesses: [
          'Could provide slightly more detail on automated canary deploy rollbacks in Kubernetes architectures.',
          'Minor hesitation when discussing edge runtime memory limit optimizations under severe sustained load.'
        ],
        suggestions: 'Strong HIRE recommendation. Elena demonstrated top 5th-percentile communication and technical precision. Progress to Final System Design Round.',
        transcript: [
          { sender: 'ai', text: "Hello Elena! Welcome to your technical interview for the Senior Full-Stack AI Engineer role. Let's begin by discussing how you structure modern state management and real-time audio token streaming in Next.js applications." },
          { sender: 'candidate', text: "Hello Alex! Thank you. In Next.js 15 App Router, I advocate separating static server-rendered presentation layers from real-time client boundaries. For audio streaming, using WebSockets via custom web worklet pipelines ensures sub-150ms latency while avoiding React re-render cascades." },
          { sender: 'ai', text: "Fascinating architectural approach. How do you handle Row Level Security and authentication validation when streaming candidate audio records into Supabase PostgreSQL tables?" },
          { sender: 'candidate', text: "Great question. I leverage Supabase Auth JWT tokens passed securely via custom headers in the connection upgrade request, pairing them with strict Postgres policies matching auth.uid() directly against the owning recruiter or candidate submission ID." }
        ],
        created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
        completed_at: new Date(Date.now() - 3600000 * 1.5).toISOString()
      },
      {
        id: 'demo-cand-2',
        candidate_name: 'Marcus Vance',
        candidate_email: 'm.vance@cloudsolutions.org',
        overall_score: 76,
        resume_text: 'Mid-Senior Node.js and React developer experienced in microservices, Docker, and standard Express backend integrations.',
        strengths: [
          'Strong practical grasp of standard Node.js event loops and asynchronous JavaScript processing.',
          'Clear communication regarding team Git workflows and automated unit testing practices.'
        ],
        weaknesses: [
          'Unfamiliar with real-time WebRTC audio processing or Vapi voice assistant event handling.',
          'Struggled to articulate optimal indexing strategies for JSONB conversational logs in PostgreSQL.'
        ],
        suggestions: 'Moderate alignment (CONSIDER). Experienced generalist backend engineer, but requires mentorship on voice generative AI infrastructure and specialized embedding schemas.',
        transcript: [
          { sender: 'ai', text: "Welcome Marcus! Can you walk me through your experience building real-time interactive dashboards with relational PostgreSQL backends?" },
          { sender: 'candidate', text: "Hi Alex! Sure, in my recent projects we built React dashboards communicating with Express APIs over HTTP polling. We used standard PostgreSQL tables with foreign key relationships for reporting." },
          { sender: 'ai', text: "I see! Have you had the chance to integrate LLM token generation or voice conversational interfaces into those backends?" },
          { sender: 'candidate', text: "To be honest, most of my LLM work has been standard REST calls to text completion endpoints. I haven't worked with real-time bi-directional audio WebSockets yet, but I'm eager to learn." }
        ],
        created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
        completed_at: new Date(Date.now() - 3600000 * 23.5).toISOString()
      },
      {
        id: 'demo-cand-3',
        candidate_name: 'David K.',
        candidate_email: 'david.k.developer@test.com',
        overall_score: 52,
        resume_text: 'Junior Web Developer familiar with HTML5, CSS3, basic jQuery, and responsive webpage builds.',
        strengths: [
          'Showed genuine passion for frontend visual aesthetics and responsive mobile styling.'
        ],
        weaknesses: [
          'Lacks familiarity with Next.js modern architecture, TypeScript, or serverless API paradigms.',
          'Could not explain basic database normalization or REST authentication security protocols.',
          'Answers were overly short and lacked architectural reasoning.'
        ],
        suggestions: 'DO NOT HIRE for Senior Engineer position. Candidate is currently at a junior frontend level and does not meet technical qualifications for advanced scalable systems.',
        transcript: [
          { sender: 'ai', text: "Hello David! To begin our session, describe how you would design a highly scalable database schema for storing asynchronous LLM chat transcripts." },
          { sender: 'candidate', text: "Uhm, hello! Well, I guess I would create a simple table in a SQL database with columns for user name and text string." },
          { sender: 'ai', text: "Understood. What indexing or optimization techniques would you implement to ensure fast keyword retrieval across millions of conversation turns?" },
          { sender: 'candidate', text: "I'm not totally sure about indexing millions of rows yet. Usually my databases only have a few hundred test items." }
        ],
        created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
        completed_at: new Date(Date.now() - 3600000 * 47).toISOString()
      }
    ];

    setCandidates(demoRecords);
    setIsDemoLoaded(true);
    toast.success('Loaded 3 realistic candidate AI evaluations for presentation! 🎉');
  };

  /**
   * Open feedback modal for a chosen candidate
   */
  const handleSelectCandidate = (candidate) => {
    setSelectedCandidate(candidate);
    setIsDialogOpen(true);
  };

  /**
   * Filter candidates via search input
   */
  const filteredCandidates = useMemo(() => {
    if (!searchQuery.trim()) return candidates;
    const q = searchQuery.toLowerCase();
    return candidates.filter(
      (c) =>
        c.candidate_name?.toLowerCase().includes(q) ||
        c.candidate_email?.toLowerCase().includes(q) ||
        c.suggestions?.toLowerCase().includes(q)
    );
  }, [candidates, searchQuery]);

  if (loading) {
    return (
      <div className="glass rounded-2xl p-16 flex flex-col items-center justify-center text-center space-y-4 animate-pulse">
        <Loader2 className="w-10 h-10 text-[hsl(258,90%,66%)] animate-spin" />
        <p className="text-sm text-[hsl(215,20%,60%)]">Retrieving job template specifications & candidate evaluation logs...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Job Template Title & Meta Banner */}
      <div className="glass rounded-2xl p-6 relative overflow-hidden border border-[hsl(258,90%,66%)]/20">
        <div 
          className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none" 
          style={{ background: 'radial-gradient(circle, hsl(189, 94%, 43%), transparent 70%)' }}
        />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[hsl(258,90%,66%)]/20 text-[hsl(258,90%,76%)] uppercase tracking-wider border border-[hsl(258,90%,66%)]/30">
                Active Assessment Role
              </span>
              <span className="text-xs text-[hsl(215,20%,50%)] flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Created {new Date(interview?.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[hsl(210,40%,98%)] mt-1">
              {interview?.job_role || 'Candidate Assessments'}
            </h1>
            <p className="text-sm text-[hsl(215,20%,55%)] max-w-2xl mt-1 line-clamp-2">
              {interview?.job_description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
            {!isDemoLoaded && (
              <button
                onClick={handleLoadDemoCandidates}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[hsl(222,47%,16%)] hover:bg-[hsl(222,47%,22%)] text-[hsl(258,90%,76%)] border border-[hsl(258,90%,66%)]/30 transition-all shadow-md cursor-pointer"
                title="Inject sample evaluations to preview color-coded diagnostic charts"
              >
                <Wand2 className="w-4 h-4 text-[hsl(258,90%,66%)]" />
                <span>Load Demo Candidates</span>
              </button>
            )}
            
            <a
              href={`/interview/${interviewId}/start`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white transition-all shadow-lg hover:brightness-110 cursor-pointer"
              style={{ background: 'linear-gradient(135deg, hsl(189,94%,43%), hsl(258,90%,66%))' }}
            >
              <span>Test Candidate Experience</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Search Bar & Summary Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(215,20%,50%)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search candidates by name or email..."
            className="w-full pl-10 pr-4 py-2.5 bg-[hsl(222,47%,11%)] border border-[hsl(222,47%,18%)] rounded-xl text-sm text-[hsl(210,40%,98%)] placeholder-[hsl(215,20%,45%)] focus:outline-none focus:border-[hsl(258,90%,66%)] transition-colors"
          />
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold text-[hsl(215,20%,55%)]">
          <span className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-[hsl(189,94%,53%)]" />
            Total: <strong className="text-[hsl(210,40%,95%)]">{candidates.length}</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-emerald-400" />
            Top Score: <strong className="text-emerald-400">
              {candidates.length > 0
                ? Math.max(...candidates.map(c => c.overall_score || c.score || c.feedback?.score || 0)) + '%'
                : '—'}
            </strong>
          </span>
        </div>
      </div>

      {/* Candidate Submissions Table / Cards */}
      {filteredCandidates.length === 0 ? (
        <div className="glass rounded-2xl p-16 flex flex-col items-center justify-center text-center">
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6"
            style={{
              background: 'linear-gradient(135deg, hsl(189,94%,43%)/15%, hsl(258,90%,66%)/15%)',
              border: '1px solid rgba(6, 182, 212, 0.2)',
            }}
          >
            <Users className="w-10 h-10 text-[hsl(189,94%,53%)]" />
          </div>
          <h2 className="text-lg font-bold text-[hsl(210,40%,94%)] mb-2">
            {searchQuery ? 'No matching candidates found' : 'No Candidate Submissions Yet'}
          </h2>
          <p className="text-sm text-[hsl(215,20%,52%)] max-w-md mb-6">
            {searchQuery
              ? `No evaluated candidates match "${searchQuery}". Clear your search query to view all records.`
              : 'When candidates complete their AI voice interview via your shareable link, their parsed transcript records, competency scores out of 100, and executive feedback reports will populate right here.'}
          </p>
          {!searchQuery && (
            <button
              onClick={handleLoadDemoCandidates}
              className="px-6 py-3 rounded-xl text-sm font-bold text-white transition-all shadow-xl bg-[hsl(258,90%,66%)] hover:bg-[hsl(258,90%,60%)] flex items-center gap-2 cursor-pointer"
            >
              <Wand2 className="w-4 h-4" />
              <span>Load Sample Candidate Evaluations</span>
            </button>
          )}
        </div>
      ) : (
        <div className="glass rounded-2xl border border-[hsl(222,47%,16%)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-[hsl(222,47%,18%)] bg-[hsl(222,47%,11%)]/80 text-[11px] font-bold uppercase tracking-wider text-[hsl(215,20%,50%)]">
                  <th className="py-4 px-6">Candidate Details</th>
                  <th className="py-4 px-6 text-center">AI Competency Score</th>
                  <th className="py-4 px-6">Evaluation Verdict</th>
                  <th className="py-4 px-6">Submission Date</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[hsl(222,47%,15%)]">
                {filteredCandidates.map((cand) => {
                  const score = cand.overall_score || cand.score || cand.feedback?.score || 0;
                  
                  // Color-coded evaluation badge criteria
                  let badgeStyle = "bg-rose-500/15 text-rose-400 border-rose-500/30";
                  let verdictText = "Low Alignment";
                  let IconComponent = AlertCircle;

                  if (score >= 80) {
                    badgeStyle = "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
                    verdictText = "High Alignment (Hire)";
                    IconComponent = CheckCircle2;
                  } else if (score >= 60) {
                    badgeStyle = "bg-amber-500/15 text-amber-400 border-amber-500/30";
                    verdictText = "Moderate (Consider)";
                    IconComponent = Clock;
                  }

                  const dateStr = new Date(cand.completed_at || cand.submitted_at || cand.created_at || Date.now()).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  });

                  return (
                    <tr
                      key={cand.id}
                      onClick={() => handleSelectCandidate(cand)}
                      className="hover:bg-[hsl(222,47%,14%)]/60 transition-colors duration-150 cursor-pointer group"
                    >
                      {/* Candidate Name & Email */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(258,90%,66%)]/20 to-[hsl(189,94%,43%)]/20 border border-white/10 flex items-center justify-center font-bold text-base text-[hsl(210,40%,95%)] flex-shrink-0">
                            {(cand.candidate_name || 'C').charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-[hsl(210,40%,98%)] group-hover:text-[hsl(258,90%,76%)] transition-colors">
                              {cand.candidate_name || 'Anonymous Candidate'}
                            </p>
                            <p className="text-xs text-[hsl(215,20%,50%)] flex items-center gap-1 mt-0.5">
                              <Mail className="w-3 h-3" />
                              {cand.candidate_email || 'No email provided'}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Color-Coded Competency Score */}
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-flex items-center justify-center px-3.5 py-1.5 rounded-xl text-sm font-extrabold border ${badgeStyle} shadow-sm`}>
                          {score}%
                        </span>
                      </td>

                      {/* Evaluation Verdict */}
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[hsl(210,40%,90%)]">
                          <IconComponent className="w-4 h-4 flex-shrink-0" />
                          <span>{verdictText}</span>
                        </span>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-6 text-xs text-[hsl(215,20%,55%)]">
                        {dateStr}
                      </td>

                      {/* Action Button */}
                      <td className="py-4 px-6 text-right">
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[hsl(222,47%,16%)] group-hover:bg-[hsl(258,90%,66%)] text-[hsl(215,20%,80%)] group-hover:text-white transition-all">
                          <span>Review Report</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detailed Candidate Evaluation Overlay Modal */}
      <CandidateFeedbackDialog
        candidate={selectedCandidate}
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedCandidate(null);
        }}
        jobRole={interview?.job_role || 'Senior Full-Stack AI Engineer'}
      />
    </div>
  );
}
