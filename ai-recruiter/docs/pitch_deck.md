# Project Pitch Deck
## AI-Powered Interview Taker & Feedback System
*Reimagining Talent Screening through Conversational Voice AI*

---

## Slide 1: Title Slide
* **Product Name**: AI-Powered Interview Taker & Feedback System
* **Tagline**: The scalable, resume-aware, real-time conversational screening platform.
* **Author**: Himanshu Gupta (B.Tech 3rd year student, HIET Ghaziabad)
* **Goal**: Empowers recruiter workflows and improves candidate interview preparation.

---

## Slide 2: The Problem
* **Traditional Screening Is Inefficient**: Recruiters spend hours conducting repetitive initial phone screens that cover the same basic questions.
* **Human Bias & Fatigue**: Interview consistency drops after multiple conversations, leading to unfair assessments.
* **Unstructured Evaluations**: Phone logs are rarely transcribed, creating information gaps for hiring panels.
* **Poor Candidate Support**: Job seekers rarely receive feedback from screening calls, reducing candidate NPS.

---

## Slide 3: The Target Users
* **Recruiters & Hiring Managers**:
  * Seeking to evaluate verbal reasoning, communication skills, and technical alignment at scale.
  * Require clean, quantitative dashboards to easily identify high-potential candidates.
* **Job Seekers & Candidates**:
  * Want stress-free, personalized mock interview practice that mimics real-world scenarios.
  * Desire instant feedback reports to identify clear areas of improvement.

---

## Slide 4: The Solution
* **Conversational AI Screening**: A web platform that conducts live, conversational voice interviews powered by advanced speech models.
* **Resume & Job Aware**: Dynamically adapts its questions by cross-referencing candidate resumes with recruiter job specs.
* **Interactive Coaching**: Offers candidates live scrolling transcripts and on-screen real-time AI suggestions.
* **Granular Dashboards**: Provides recruiters with comprehensive reports, including overall scores, text transcripts, and strength/weakness evaluations.

---

## Slide 5: Key Features (v1.0)
* **Recruiter Portal**: Streamlined dashboard for managing scheduled interviews, tracking responses, and reviewing candidate feedback.
* **Resume-Aware Vapi Agent**: Parses candidate PDF resumes via Gemini to customize the voice bot's persona and questions.
* **Real-time Voice Calls**: Live conversational experience powered by Vapi (limited to 5 questions or 7 minutes to manage costs).
* **Live Transcript & AI Tips**: Live screen updates showing scrolling transcripts and instant feedback suggestions.
* **Comprehensive Review Dialogs**: Deep recruiter reviews highlighting candidate scores, strengths, weaknesses, and full session logs.

---

## Slide 6: Technical Approach
* **Frontend**: Next.js 15, React 19, Tailwind CSS v4, and shadcn/ui.
* **Backend Database & Auth**: Supabase (PostgreSQL with secure RLS policies and Google Auth for recruiters).
* **Voice Agent Routing**: Vapi Web SDK managing real-time audio streams.
* **Artificial Intelligence Engine**: Gemini AI parsing PDF content, customizing Vapi bot instructions, and analyzing transcripts to generate structured evaluations.
* **Deployment**: Netlify hosting for fast performance.

---

## Slide 7: Future Scope
* **Multi-Language Support**: Let candidates practice or screen in their native languages.
* **Video Screenings**: Record webcam streams to capture visual queues and facial confidence metrics.
* **Advanced Analytics**: Generate graphs tracking candidate performance trends over historical attempts.
* **Collaborative Screening**: Enable recruiters to tag teammates, add notes, and collaborate on candidates.

---

## Slide 8: The Vision
* **Democratizing Hiring & Preparation**:
  Our goal is to build an intelligent hiring co-pilot that helps candidate preparation, removes interview bias, and scales recruitment pipelines without losing the conversational quality of a human screening.
