'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@/hooks/useUser';
import { supabase } from '@/services/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mic2, Calendar, ArrowRight, Users, Briefcase, Sparkles, Loader2 } from 'lucide-react';

/**
 * app/(main)/dashboard/_components/RecentInterviews.jsx
 *
 * Client component that displays the recruiter's recent interview templates
 * on the dashboard landing page, replacing the previous Day 59 placeholder.
 */
export default function RecentInterviews() {
  const { userDetail, loading: userLoading } = useUser();
  const router = useRouter();
  
  const [recentInterviews, setRecentInterviews] = useState([]);
  const [candidateCounts, setCandidateCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userDetail?.id) {
      fetchRecentInterviews();
    }
  }, [userDetail]);

  const fetchRecentInterviews = async () => {
    setLoading(true);
    try {
      // Fetch up to 4 most recent interview templates for this recruiter
      const { data, error } = await supabase
        .from('interviews')
        .select('*')
        .eq('recruiter_id', userDetail.id)
        .order('created_at', { ascending: false })
        .limit(4);

      if (error) throw error;

      if (data && data.length > 0) {
        const ids = data.map(i => i.id);
        const { data: subs, error: subErr } = await supabase
          .from('candidate_submissions')
          .select('interview_id')
          .in('interview_id', ids);

        if (!subErr && subs) {
          const counts = {};
          subs.forEach(s => {
            counts[s.interview_id] = (counts[s.interview_id] || 0) + 1;
          });
          setCandidateCounts(counts);
        }
        setRecentInterviews(data);
      } else {
        setRecentInterviews([]);
      }
    } catch (err) {
      console.error('[RecentInterviews] Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || userLoading) {
    return (
      <div className="glass rounded-2xl p-12 flex flex-col items-center justify-center text-center animate-pulse">
        <Loader2 className="w-8 h-8 text-[hsl(258,90%,66%)] animate-spin mb-3" />
        <p className="text-xs text-[hsl(215,20%,55%)]">Loading recent interviews...</p>
      </div>
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-[hsl(258,90%,66%)]" />
          <h2 className="text-lg font-semibold text-[hsl(210,40%,98%)]">Recent Interviews</h2>
        </div>
        <Link
          href="/scheduled-interview"
          className="text-xs font-semibold text-[hsl(258,90%,76%)] hover:text-white flex items-center gap-1 transition-colors"
        >
          <span>View All Pipelines</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {recentInterviews.length === 0 ? (
        <div className="glass rounded-2xl p-12 flex flex-col items-center justify-center text-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
            style={{
              background: 'linear-gradient(135deg, hsl(258,90%,66%)/10%, hsl(189,94%,43%)/10%)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
            }}
          >
            <span className="text-3xl">🎙️</span>
          </div>
          <h3 className="text-base font-semibold text-[hsl(210,40%,90%)] mb-2">
            No interviews created yet
          </h3>
          <p className="text-xs text-[hsl(215,20%,50%)] max-w-sm mb-6">
            Create your first AI voice interview template to generate shareable candidate assessment links.
          </p>
          <Link
            href="/dashboard/create-interview"
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[hsl(258,90%,66%)] hover:bg-[hsl(258,90%,60%)] transition-colors shadow-lg"
          >
            Create First Interview
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentInterviews.map((interview) => {
            const count = candidateCounts[interview.id] || 0;
            const createdDate = new Date(interview.created_at).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            });

            return (
              <div
                key={interview.id}
                onClick={() => router.push(`/scheduled-interview/${interview.id}/Details`)}
                className="glass rounded-2xl p-5 hover:border-[hsl(258,90%,66%)]/40 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                style={{ borderColor: 'rgba(255, 255, 255, 0.06)' }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-base font-bold text-[hsl(210,40%,96%)] group-hover:text-[hsl(258,90%,76%)] transition-colors line-clamp-1">
                      {interview.job_role}
                    </h3>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[hsl(258,90%,66%)]/15 text-[hsl(258,90%,76%)] border border-[hsl(258,90%,66%)]/20">
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-[hsl(215,20%,55%)] line-clamp-2 mb-4">
                    {interview.job_description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs text-[hsl(215,20%,50%)]">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[hsl(189,94%,53%)]" />
                    <span>{count} {count === 1 ? 'Candidate' : 'Candidates'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{createdDate}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
