'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Copy, Check, Sparkles, Share2, ExternalLink, CalendarClock, Plus } from 'lucide-react';

/**
 * app/(main)/dashboard/create-interview/_components/InterviewLink.jsx
 *
 * Success Dialog Modal that triggers automatically when a new interview
 * template is successfully inserted into Supabase.
 *
 * Features:
 * 1. Automatically formats the absolute candidate URL (/interview/[id])
 * 2. One-click copy-to-clipboard button with custom visual success state
 * 3. Quick action buttons to view all interviews or create another one
 * 4. Premium dark glassmorphism styling
 */
export default function InterviewLink({ isOpen, onClose, interviewId, jobRole }) {
  const router = useRouter();
  const [isCopied, setIsCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  // Safely formulate the complete shareable candidate URL in browser
  useEffect(() => {
    if (typeof window !== 'undefined' && interviewId) {
      setShareUrl(`${window.location.origin}/interview/${interviewId}`);
    }
  }, [interviewId]);

  /**
   * Copy to Clipboard Helper
   */
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      toast.success('Candidate interview link copied to clipboard!');

      // Reset copied state after 3 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    } catch (error) {
      toast.error('Failed to copy link. Please select and copy manually.');
      console.error('[InterviewLink] Clipboard error:', error);
    }
  };

  /**
   * Redirect handler to view all scheduled interviews
   */
  const handleGoToInterviews = () => {
    onClose();
    router.push('/scheduled-interview');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-6 overflow-hidden">
        {/* Decorative ambient lighting glow */}
        <div
          className="absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, hsl(258, 90%, 66%), transparent)' }}
        />
        <div
          className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, hsl(189, 94%, 43%), transparent)' }}
        />

        <DialogHeader className="relative z-10 space-y-3 text-left">
          {/* Header Icon badge */}
          <div className="flex items-center justify-between">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
              style={{
                background: 'linear-gradient(135deg, hsl(258, 90%, 66%), hsl(189, 94%, 43%))',
                boxShadow: '0 8px 24px rgba(139, 92, 246, 0.3)',
              }}
            >
              <Share2 className="w-6 h-6 text-white" />
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-[hsl(142,76%,70%)] bg-[hsl(142,76%,36%)]/10 border border-[hsl(142,76%,36%)]/20">
              <Sparkles className="w-3.5 h-3.5" />
              Live Template
            </span>
          </div>

          <DialogTitle className="text-xl md:text-2xl font-bold tracking-tight text-[hsl(210,40%,98%)]">
            Interview Ready to Share!
          </DialogTitle>

          <DialogDescription className="text-sm text-[hsl(215,20%,60%)] leading-relaxed">
            Your custom interview template for <span className="text-white font-medium underline decoration-[hsl(258,90%,66%)]">{jobRole || 'the specified role'}</span> has been deployed. Candidates visiting this link will interact with the real-time AI voice interviewer.
          </DialogDescription>
        </DialogHeader>

        {/* Shareable Link Box & Copy Action */}
        <div className="relative z-10 mt-5 space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-[hsl(215,20%,50%)]">
            Public Candidate Link
          </label>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-[hsl(222,47%,4%)] border border-[hsl(222,47%,15%)] focus-within:border-[hsl(258,90%,66%)] transition-colors">
            <input
              type="text"
              readOnly
              value={shareUrl}
              onClick={(e) => e.target.select()}
              className="flex-1 bg-transparent text-xs sm:text-sm font-mono text-[hsl(210,40%,85%)] focus:outline-none px-2 select-all truncate"
            />
            <Button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg text-white transition-all duration-200 cursor-pointer"
              style={{
                background: isCopied
                  ? 'hsl(142, 76%, 36%)'
                  : 'linear-gradient(135deg, hsl(258, 90%, 66%), hsl(189, 94%, 43%))',
              }}
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white animate-in zoom-in-50" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Link</span>
                </>
              )}
            </Button>
          </div>
          <p className="text-[11px] text-[hsl(215,20%,45%)] italic">
            💡 Tip: Anyone with this link can onboard and upload their resume for this interview.
          </p>
        </div>

        {/* Action Buttons Footer */}
        <div className="relative z-10 mt-6 pt-4 border-t border-[hsl(222,47%,15%)] flex flex-col sm:flex-row items-center gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-[hsl(210,40%,80%)] hover:text-white rounded-xl bg-[hsl(222,47%,10%)] hover:bg-[hsl(222,47%,14%)] border border-[hsl(222,47%,16%)] transition-all duration-200 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[hsl(258,90%,76%)]" />
            Create Another
          </button>

          <button
            type="button"
            onClick={handleGoToInterviews}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-medium text-white rounded-xl shadow-lg hover:brightness-110 transition-all duration-200 cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, hsl(258, 90%, 66%), hsl(189, 94%, 43%))',
            }}
          >
            <CalendarClock className="w-3.5 h-3.5" />
            View All Interviews
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
