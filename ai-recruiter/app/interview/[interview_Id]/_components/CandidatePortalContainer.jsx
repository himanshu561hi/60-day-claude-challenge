'use client';

import React, { useState } from 'react';
import CandidateIntakeForm from './CandidateIntakeForm';
import ResumeAnalysisCard from './ResumeAnalysisCard';

/**
 * app/interview/[interview_Id]/_components/CandidatePortalContainer.jsx
 *
 * Day 55: Interactive Container switching between Candidate Onboarding & AI Analysis Results.
 */
export default function CandidatePortalContainer({ interviewId, jobRole, jobDescription }) {
  const [analysisResult, setAnalysisResult] = useState(null);

  return (
    <div className="w-full py-8 px-4 sm:px-6">
      {!analysisResult ? (
        <CandidateIntakeForm
          interviewId={interviewId}
          jobRole={jobRole}
          jobDescription={jobDescription}
          onAnalysisComplete={(data) => setAnalysisResult(data)}
        />
      ) : (
        <ResumeAnalysisCard
          sessionData={analysisResult}
          onReset={() => setAnalysisResult(null)}
        />
      )}
    </div>
  );
}
