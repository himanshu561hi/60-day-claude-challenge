'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useUser } from '@/hooks/useUser';
import { supabase } from '@/services/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { 
  Search, 
  Plus, 
  Copy, 
  Check, 
  Users, 
  Calendar, 
  ArrowRight, 
  Loader2, 
  Briefcase,
  ExternalLink,
  Filter
} from 'lucide-react';

/**
 * app/(main)/scheduled-interview/_components/InterviewList.jsx
 *
 * Client component that fetches all interview templates created by the logged-in recruiter,
 * aggregates candidate submission statistics (total candidates, average score),
 * and renders an interactive dashboard table/cards with instant link copying.
 */
export default function InterviewList() {
  const { userDetail, loading: userLoading } = useUser();
  const router = useRouter();
  
  const [interviews, setInterviews] = useState([]);
  const [submissionStats, setSubmissionStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    if (!userLoading && !userDetail) {
      router.push('/auth');
      return;
    }

    if (userDetail?.id) {
      fetchInterviewsAndStats();
    }
  }, [userDetail, userLoading]);

  /**
   * Fetch interview templates and candidate submission counts/scores from Supabase
   */
  const fetchInterviewsAndStats = async () => {
    setLoading(true);
    try {
      // 1. Fetch all interviews belonging to this recruiter
      const { data: interviewsData, error: interviewsError } = await supabase
        .from('interviews')
        .select('*')
        .eq('recruiter_id', userDetail.id)
        .order('created_at', { ascending: false });

      if (interviewsError) throw interviewsError;

      // 2. If interviews exist, fetch corresponding submissions to calculate stats
      if (interviewsData && interviewsData.length > 0) {
        const interviewIds = interviewsData.map((item) => item.id);
        
        const { data: submissionsData, error: subError } = await supabase
          .from('candidate_submissions')
          .select('interview_id, overall_score')
          .in('interview_id', interviewIds);

        if (subError) throw subError;

        // Aggregate counts and average score per interview_id
        const statsMap = {};
        interviewIds.forEach((id) => {
          statsMap[id] = { count: 0, totalScore: 0, avgScore: null };
        });

        if (submissionsData) {
          submissionsData.forEach((sub) => {
            const current = statsMap[sub.interview_id];
            if (current) {
              current.count += 1;
              if (typeof sub.overall_score === 'number') {
                current.totalScore += sub.overall_score;
              }
            }
          });
        }

        // Calculate averages
        Object.keys(statsMap).forEach((id) => {
          const s = statsMap[id];
          s.avgScore = s.count > 0 ? Math.round(s.totalScore / s.count) : null;
        });

        setSubmissionStats(statsMap);
        setInterviews(interviewsData);
      } else {
        setInterviews([]);
      }
    } catch (error) {
      console.error('[InterviewList] Error loading pipeline data:', error);
      toast.error('Failed to load interview pipeline. Please try refreshing.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle copying shareable interview link to clipboard
   */
  const handleCopyLink = (interviewId, e) => {
    e.stopPropagation();
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const shareableUrl = `${origin}/interview/${interviewId}/start`;
    
    navigator.clipboard.writeText(shareableUrl);
    setCopiedId(interviewId);
    toast.success('Candidate interview link copied to clipboard!');
    
    setTimeout(() => setCopiedId(null), 3000);
  };

  /**
   * Filtered list based on search term
   */
  const filteredInterviews = useMemo(() => {
    if (!searchQuery.trim()) return interviews;
    const query = searchQuery.toLowerCase();
    return interviews.filter(
      (item) => 
        item.job_role?.toLowerCase().includes(query) ||
        item.job_description?.toLowerCase().includes(query)
    );
  }, [interviews, searchQuery]);

  if (loading || userLoading) {
    return (
      <div className="glass rounded-2xl p-16 flex flex-col items-center justify-center text-center space-y-4 animate-pulse">
        <Loader2 className="w-10 h-10 text-[hsl(258,90%,66%)] animate-spin" />
        <p className="text-sm text-[hsl(215,20%,60%)]">Loading your interview pipelines and candidate data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(215,20%,50%)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by job role or skills..."
            className="w-full pl-10 pr-4 py-2.5 bg-[hsl(222,47%,11%)] border border-[hsl(222,47%,18%)] rounded-xl text-sm text-[hsl(210,40%,98%)] placeholder-[hsl(215,20%,45%)] focus:outline-none focus:border-[hsl(258,90%,66%)] transition-colors"
          />
        </div>

        <Link
          href="/dashboard/create-interview"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
          style={{ background: 'linear-gradient(135deg, hsl(258,90%,66%), hsl(189,94%,43%))' }}
        >
          <Plus className="w-4 h-4" />
          <span>Create New Interview</span>
        </Link>
      </div>

      {/* No Interviews State */}
      {filteredInterviews.length === 0 ? (
        <div className="glass rounded-2xl p-16 flex flex-col items-center justify-center text-center">
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6"
            style={{
              background: 'linear-gradient(135deg, hsl(258,90%,66%)/15%, hsl(189,94%,43%)/15%)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
            }}
          >
            <Briefcase className="w-10 h-10 text-[hsl(258,90%,76%)]" />
          </div>
          <h2 className="text-lg font-semibold text-[hsl(210,40%,92%)] mb-2">
            {searchQuery ? 'No matching interviews found' : 'No interviews created yet'}
          </h2>
          <p className="text-sm text-[hsl(215,20%,50%)] max-w-md mb-6">
            {searchQuery
              ? `We couldn't find any job templates matching "${searchQuery}". Try a different term or clear the filter.`
              : 'Start by setting up your first job assessment template. Generate custom voice AI prompts and share links directly with candidates.'}
          </p>
          {!searchQuery && (
            <Link
              href="/dashboard/create-interview"
              className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-[hsl(258,90%,66%)] hover:bg-[hsl(258,90%,60%)] transition-colors"
            >
              Set Up First Interview
            </Link>
          )}
        </div>
      ) : (
        /* Interview Pipeline Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInterviews.map((interview) => {
            const stats = submissionStats[interview.id] || { count: 0, avgScore: null };
            const isCopied = copiedId === interview.id;
            const createdDate = new Date(interview.created_at).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });

            return (
              <div
                key={interview.id}
                onClick={() => router.push(`/scheduled-interview/${interview.id}/Details`)}
                className="glass rounded-2xl p-6 hover:border-[hsl(258,90%,66%)]/40 transition-all duration-300 flex flex-col justify-between cursor-pointer group relative overflow-hidden"
                style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}
              >
                {/* Top Subtle Glow */}
                <div 
                  className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-2xl pointer-events-none" 
                  style={{ background: 'radial-gradient(circle, hsl(258, 90%, 66%), transparent)' }}
                />

                <div>
                  {/* Header Row */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[hsl(210,40%,98%)] group-hover:text-[hsl(258,90%,76%)] transition-colors line-clamp-1">
                        {interview.job_role}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-1 text-xs text-[hsl(215,20%,50%)]">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Created on {createdDate}</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => handleCopyLink(interview.id, e)}
                      title="Copy shareable interview link"
                      className="p-2 rounded-xl bg-[hsl(222,47%,14%)] hover:bg-[hsl(222,47%,20%)] border border-[hsl(222,47%,22%)] text-[hsl(215,20%,75%)] hover:text-white transition-colors flex-shrink-0 z-10"
                    >
                      {isCopied ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Description Preview */}
                  <p className="text-xs text-[hsl(215,20%,55%)] line-clamp-2 mb-6 leading-relaxed">
                    {interview.job_description}
                  </p>
                </div>

                {/* Bottom Stats & CTA */}
                <div>
                  <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-[hsl(222,47%,11%)]/80 border border-[hsl(222,47%,16%)] mb-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[hsl(189,94%,53%)]" />
                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-semibold text-[hsl(215,20%,45%)]">Candidates</p>
                        <p className="text-sm font-bold text-[hsl(210,40%,92%)]">{stats.count}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pl-2 border-l border-[hsl(222,47%,16%)]">
                      <div className="w-2 h-2 rounded-full bg-[hsl(142,76%,45%)] animate-pulse" />
                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-semibold text-[hsl(215,20%,45%)]">Avg Score</p>
                        <p className="text-sm font-bold text-[hsl(210,40%,92%)]">
                          {stats.avgScore !== null ? `${stats.avgScore}%` : '—'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-semibold text-[hsl(258,90%,76%)] group-hover:text-white transition-colors pt-2 border-t border-white/5">
                    <span>View Candidates Pipeline</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
