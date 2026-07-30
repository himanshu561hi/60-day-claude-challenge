# 💼 Portfolio & Career Launch Kit: AI Recruiter Platform

**Developer:** Himanshu Gupta  
**Project:** AI Recruiter — Autonomous Voice Interviewer & Screening Platform  
**Live Demo:** [interviewerr.vercel.app](https://interviewerr.vercel.app/)  
**GitHub Repository:** [github.com/himanshu561hi/60-day-claude-challenge](https://github.com/himanshu561hi/60-day-claude-challenge/tree/main/ai-recruiter)  

---

## 📝 1. Executive Portfolio Project Descriptions

### Short Summary (1-2 sentences — for LinkedIn / Portfolio Grid)
> Developed **AI Recruiter**, an autonomous voice-first hiring platform powered by Next.js 15, Vapi.ai, Supabase, and Google Gemini AI. The application enables recruiters to create customized voice interview campaigns in 60 seconds and automatically generates structured candidate evaluation scorecards with 1-10 numerical ratings and full audio dialogue transcripts.

### Full Summary (Paragraph — for Personal Website / Resume Projects)
> **AI Recruiter** is an end-to-end autonomous talent screening web application built to eliminate initial phone-screening bottlenecks in technical recruitment. Utilizing Next.js 15 App Router, Tailwind CSS v4, and Supabase PostgreSQL with strict Row Level Security (RLS), the system connects candidate WebRTC audio streams to Vapi.ai for sub-500ms conversational turn-taking. Completed interview transcripts are ingested by an asynchronous Google Gemini 1.5/2.0 LLM engine that parses candidate responses against job rubrics to generate structured scorecards, technical competency ratings, and hiring recommendations on an intuitive recruiter analytics dashboard.

---

## 🎯 2. Impact-Oriented Resume Bullet Points

- **Architected & Deployed an Autonomous AI Voice Interviewer:** Built a full-stack Next.js 15 and Supabase platform integrating Vapi.ai Web SDK, enabling sub-500ms real-time conversational voice interviews for candidate screening live on Vercel.
- **Engineered Automated LLM Evaluation Pipeline:** Integrated Google Gemini API using structured JSON schema prompting to evaluate candidate interview transcripts, outputting quantitative scores (1-10), technical competency breakdown, and qualitative feedback.
- **Enforced Enterprise Security & Row Level Security (RLS):** Implemented strict Supabase PostgreSQL RLS policies and Google OAuth gates, isolating recruiter data while allowing public candidate submission endpoints.
- **Designed Modern Dark Glassmorphism UI:** Developed responsive UI component systems using Tailwind CSS v4, Lucide React, and Radix UI primitives, featuring real-time audio waveform visualizers and candidate transcript inspection modals.

---

## 🗣️ 3. Technical Interview Talking Points (STAR Method)

### Question 1: "Tell me about a complex full-stack AI system you architected."
* **Situation:** Traditional candidate phone screening is manual, slow, and expensive, taking recruiters weeks to screen applicants.
* **Task:** Architect a voice-first web platform where recruiters configure custom interviews and an AI agent conducts real-time voice interviews and scores candidates automatically.
* **Action:** I built **AI Recruiter** using Next.js 15, Supabase, Vapi.ai Web SDK, and Google Gemini. I integrated Vapi's browser audio hooks for sub-500ms latency voice streaming and designed a serverless API pipeline that formats transcripts into JSON schemas for Gemini evaluation.
* **Result:** Successfully deployed `interviewerr.vercel.app`, allowing recruiters to create interview campaigns in under 60 seconds and receive instant structured scorecards upon candidate interview completion.

### Question 2: "How did you manage security and public access in your database design?"
* **Situation:** Public candidate links must accept interview submissions without authentication, but recruiters' private job listings and competitor candidate data must remain completely isolated.
* **Task:** Implement database security that guarantees strict recruiter isolation without blocking anonymous candidate submissions.
* **Action:** I configured Supabase Row Level Security (RLS) policies in PostgreSQL. I added a public `INSERT` policy for the `candidate_submissions` table while enforcing `auth.uid() = recruiter_id` checks on the `interviews` and `profiles` tables.
* **Result:** Eliminated unauthorized cross-tenant data access while enabling seamless friction-free candidate interviews.

---

## 🎬 4. 90-Second Product Demo Script (Loom / Video Recording)

* **[0:00 - 0:15] Intro & Problem:**  
  *"Hi! I'm Himanshu Gupta, and today I'm demonstrating **AI Recruiter**, an autonomous voice-first screening platform built to streamline technical hiring."*

* **[0:15 - 0:40] Recruiter Dashboard & Creation:**  
  *"Starting on the Recruiter Dashboard at `interviewerr.vercel.app`, I sign in with Google Auth. With one click on 'Create Interview', I can specify a target position like 'Senior React Developer', select required tech stack skills, set interview duration, and add custom questions. In 10 seconds, a unique shareable candidate link is generated."*

* **[0:40 - 1:10] Live Voice Interview Demonstration:**  
  *"Now switching to the candidate experience—when a candidate opens the link on mobile or desktop, they check their microphone and click 'Start Interview'. The Vapi AI voice agent greets them, asks technical questions dynamically, and listens to their audio responses in real-time with an animated waveform visualizer."*

* **[1:10 - 1:30] Gemini Scoring & Recruiter Analytics:**  
  *"Once the interview ends, our asynchronous Google Gemini AI engine ingests the transcript, calculates overall scores out of 10, rates technical depth, and generates hiring recommendations. Returning to the recruiter dashboard, we can inspect candidate scorecards, color-coded ratings, and complete dialogue transcripts."*

---

## 📸 5. Recommended Screenshots & Media Checklist

1. 🖥️ **Hero Dashboard View:** Recruiter main dashboard displaying active interview cards, user greeting, and creation trigger button.
2. 🧙 **Interview Wizard Modal:** `CreateInterviewDialog` filled out with position title, experience level, and tech stack tags.
3. 🎙️ **Active Candidate Voice Screen:** Public candidate portal showing the active Vapi voice visualizer waveform during a live call.
4. 📊 **Recruiter Scorecard Modal:** `CandidateFeedbackDialog` displaying candidate score breakdown, strengths, areas for improvement, and line-by-line transcript logs.

---

## 🏷️ 6. Recommended GitHub Topics & Repository Metadata

* **Repository Topics:** `nextjs15`, `vapi-ai`, `supabase`, `gemini-ai`, `voice-ai`, `ai-recruiter`, `fullstack-javascript`, `tailwind-css`, `ab-talks-challenge`
* **Repository Description:** 🎙️ Autonomous AI Voice Interviewer & Screening Platform built with Next.js 15, Vapi.ai SDK, Supabase PostgreSQL, and Google Gemini AI.
* **Website URL:** `https://interviewerr.vercel.app/`
* **v1.0.0 Release Tag:** `v1.0.0`
* **Release Title:** `v1.0.0 — Production Capstone Release: Autonomous Voice AI Interviewer`

---

*Document finalized on Day 10 of the Capstone Sprint for AI Recruiter v1.0.0 release.*
