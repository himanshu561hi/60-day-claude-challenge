# 🗓️ 30-Day Growth Plan: Post-Graduation Roadmap

**Project:** AI Recruiter — Autonomous Voice Interviewer Platform  
**Baseline Version:** v1.0.0 (Production Release)  
**Tech Stack:** Next.js 15 App Router, Tailwind CSS v4, Supabase (PostgreSQL + RLS), Vapi.ai SDK, Gemini AI API  

---

## 🎯 Goal
Transform the v1.0.0 AI Recruiter MVP into a commercial-grade, multi-tenant candidate screening & evaluation platform over 30 structured, sequential days.

---

## 📅 Week 1: Candidate Experience, Audio Resilience & Proctoring

* **Day 1: Microphone Permission Fallback & Browser Diagnostics**
  * *Milestone:* Implement micro-browser checks before call start, testing audio context, mic permission state, and connection speed with visual feedback indicators.
* **Day 2: Audio Waveform Visualizer Refinement**
  * *Milestone:* Upgrade the voice wave animation to dynamically react to incoming Vapi audio frequency data using the Canvas Web Audio API.
* **Day 3: Candidate Audio Reconnection Protocol**
  * *Milestone:* Build auto-retry network recovery logic in `InterviewStart.jsx` if candidate Wi-Fi drops during a live Vapi session.
* **Day 4: Live Transcript Display for Candidates**
  * *Milestone:* Render real-time candidate and AI voice transcript bubbles during the interview for accessibility and verification.
* **Day 5: Candidate Tab-Switch & Focus Monitor**
  * *Milestone:* Add window `blur` and `visibilitychange` listeners to track candidate tab switches during an active interview session.
* **Day 6: Interview Time Limit Countdown Timer**
  * *Milestone:* Implement a visible countdown timer during candidate interviews that auto-gracefully finishes the call when time expires.
* **Day 7: Candidate End-of-Session Satisfaction Feedback**
  * *Milestone:* Add a 1-5 star candidate feedback rating on the `/completed` screen and save feedback ratings to Supabase.

---

## 📅 Week 2: Deep AI Evaluation, Custom Rubrics & Resume Intelligence

* **Day 8: Custom Recruiter Evaluation Prompts**
  * *Milestone:* Extend `interviews` schema to allow recruiters to write custom evaluation criteria and rubrics per job posting.
* **Day 9: Gemini Multimodal Resume Parsing**
  * *Milestone:* Build `/api/parse-resume` endpoint uploading PDF resumes to Gemini 1.5 Pro to extract candidate work history and skills.
* **Day 10: Resume-to-Interview Cross-Validation**
  * *Milestone:* Instruct Gemini evaluation engine to cross-reference candidate spoken claims with their uploaded resume for discrepancy detection.
* **Day 11: Quantitative Soft-Skills Scoring**
  * *Milestone:* Expand evaluation API to output breakdown scores for Communication, Problem Solving, Technical Depth, and Confidence.
* **Day 12: Sentiment & Tone Analysis Badge**
  * *Milestone:* Render visual sentiment badges (e.g., "Highly Confident", "Hesitant", "Structured") on candidate summary cards.
* **Day 13: Comparative Candidate Ranking Matrix**
  * *Milestone:* Add candidate sorting capabilities on recruiter dashboard by score, completion date, and tech skill match.
* **Day 14: PDF Candidate Scorecard Export**
  * *Milestone:* Create a printable/downloadable PDF candidate evaluation report using `@react-pdf/renderer` or HTML-to-PDF rendering.

---

## 📅 Week 3: Recruiter Collaboration, Email Automation & Workspaces

* **Day 15: Automated Candidate Invitation Email (Resend Integration)**
  * *Milestone:* Integrate Resend API allowing recruiters to email direct interview links to candidates from the dashboard.
* **Day 16: Dynamic Job Posting Sharable Cards (OpenGraph)**
  * *Milestone:* Add OpenGraph metadata tags (`og:title`, `og:image`) to public interview routes for social sharing on LinkedIn/Twitter.
* **Day 17: Candidate Status Workflow Pipeline**
  * *Milestone:* Add candidate status tags (`Shortlisted`, `Under Review`, `Rejected`, `Hired`) managed by recruiters via drag-and-drop or dropdowns.
* **Day 18: Recruiter Comments & Internal Notes**
  * *Milestone:* Build an internal notes thread inside `CandidateFeedbackDialog.jsx` for hiring manager team feedback.
* **Day 19: Multi-Recruiter Organization Workspaces**
  * *Milestone:* Add `organizations` table in Supabase allowing team members under the same domain to share interview pipelines.
* **Day 20: Candidate CSV Bulk Export**
  * *Milestone:* Add single-click CSV export of all candidate scores, emails, and completion dates for external ATS loading.
* **Day 21: Automated Post-Interview Recruiter Notification**
  * *Milestone:* Send instant email notifications to the recruiter via Resend when a candidate completes an interview session.

---

## 📅 Week 4: Enterprise Scale, Security, API Webhooks & v2.0 Release

* **Day 22: API Webhook Dispatcher for ATS Integrations**
  * *Milestone:* Build outgoing HTTP POST webhooks sending completed interview payloads to external endpoints (Greenhouse, Zapier, Make).
* **Day 23: Rate Limiting & API Security Guards**
  * *Milestone:* Implement `@upstash/ratelimit` on public interview endpoints to protect against DDoS and API token depletion.
* **Day 24: Enterprise Role-Based Access Control (RBAC)**
  * *Milestone:* Define Supabase RLS roles (`Admin`, `Interviewer`, `Viewer`) restricting edit privileges.
* **Day 25: Dark/Light Mode Theme Toggle System**
  * *Milestone:* Implement seamless theme switcher with CSS variables and next-themes for recruiter preferences.
* **Day 26: Database Indexing & Query Optimization**
  * *Milestone:* Add PostgreSQL indexes on `interviews.recruiter_id` and `candidate_submissions.interview_id` to guarantee sub-50ms query speeds.
* **Day 27: Stripe Subscription & Usage-Based Billing**
  * *Milestone:* Integrate Stripe Checkout & Webhooks for paid recruiter tiers (e.g., 5 free interviews/mo, $49/mo unlimited).
* **Day 28: E2E Automated Testing Suite (Playwright)**
  * *Milestone:* Write end-to-end Playwright tests verifying candidate sign-in, mic permissions modal, and recruiter detail modal rendering.
* **Day 29: Production Monitoring & Sentry Error Tracking**
  * *Milestone:* Integrate Sentry SDK for client and server runtime error logging and Vercel analytics performance tracking.
* **Day 30: Grand Release of AI Recruiter v2.0 & Public Launch**
  * *Milestone:* Tag v2.0.0 release on GitHub, update live Vercel deployment, author launch post on LinkedIn & Product Hunt.

---

*Document finalized on Day 10 of the Capstone Sprint for AI Recruiter v1.0.0 release.*
