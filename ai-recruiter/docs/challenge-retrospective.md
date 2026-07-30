# 📜 60-Day AI Challenge & Capstone Retrospective

**Developer:** Himanshu Gupta  
**AI Pair Programmer & Mentor:** Claude AI (Senior Software Engineer Persona)  
**Project:** AI Recruiter — Autonomous Voice Interviewer Platform  
**Live Application:** [interviewerr.vercel.app](https://interviewerr.vercel.app/)  
**GitHub Repository:** [github.com/himanshu561hi/60-day-claude-challenge/ai-recruiter](https://github.com/himanshu561hi/60-day-claude-challenge/tree/main/ai-recruiter)  
**Version:** v1.0.0 (Production Release)  

---

## ⏳ Capstone Evolution Timeline (Days 51 – 60 / Capstone Days 1 – 10)

```
[Day 51: PRD & Architecture] ➔ [Day 52: Supabase & Auth] ➔ [Day 53: Recruiter Shell] ➔ [Day 54: Interview Wizard]
                                                                                               │
[Day 58: Gemini AI Scoring] ◄─ [Day 57: Candidate Completion] ◄─ [Day 56: Vapi Voice Engine] ◄─ [Day 55: Public Portal]
        │
        ▼
[Day 59: Recruiter Analytics] ➔ [Day 60: Vercel Deploy & v1.0.0 Release]
```

### Day 51 (Capstone Day 1): Product Blueprint & System Architecture
* **Objective:** Define product scope, database ERDs, API interfaces, and user workflows.
* **Milestone:** Authored comprehensive PRD (`prd.md`), System Architecture diagram (`ARCHITECTURE.md`), and step-by-step implementation blueprint (`implementation_blueprint.md`).
* **Key Artifacts:** Structured database schema draft (`profiles`, `interviews`, `candidate_submissions`).

### Day 52 (Capstone Day 2): Supabase Database Schema & OAuth Auth Gate
* **Objective:** Initialize Next.js 15 project, configure Supabase backend, RLS policies, and Google OAuth.
* **Milestone:** Implemented `services/supabaseClient.js`, `context/userDetailContext.jsx`, and `/auth` Google sign-in routing.
* **Security Win:** Designed granular Row Level Security (RLS) allowing anonymous candidate insertion into `candidate_submissions` while enforcing strict recruiter ownership over `interviews`.

### Day 53 (Capstone Day 3): Recruiter Shell & Dashboard UI
* **Objective:** Build recruiter navigation layout with dark glassmorphism aesthetic.
* **Milestone:** Created collapsible AppSidebar (`_components/AppSidebar.jsx`), user profile dropdown, responsive navbar, and dynamic greeting header (`WelcomeContainer.jsx`).

### Day 54 (Capstone Day 4): Multi-Step Interview Creation Wizard
* **Objective:** Allow recruiters to configure AI voice interview templates.
* **Milestone:** Built multi-step modal (`CreateInterviewDialog.jsx`) configuring job position, experience level, tech stack, duration, and custom interview questions.

### Day 55 (Capstone Day 5): Public Candidate Portal & Dynamic Routing
* **Objective:** Deliver smooth candidate onboarding and pre-interview preparation interface.
* **Milestone:** Created `/interview/[interview_Id]` dynamic route, candidate email/name input validation, micro-check permission screen, and position overview cards.

### Day 56 (Capstone Day 6): Real-Time Voice Interview Engine (Vapi.ai)
* **Objective:** Enable dynamic real-time conversational voice interviews directly in the browser.
* **Milestone:** Integrated `@vapi-ai/web` SDK inside `InterviewStart.jsx`. Configured speech-to-text, real-time voice streaming, and animated audio waveform visualization.

### Day 57 (Capstone Day 7): Candidate Completion & Transcript Pipeline
* **Objective:** Capture completed interview audio, aggregate conversation dialogue, and update submission status.
* **Milestone:** Built `/interview/[interview_Id]/completed` confirmation view, automatic local/session state cleanup, and asynchronous transcript saving to Supabase.

### Day 58 (Capstone Day 8): Gemini AI Automated Evaluation Engine
* **Objective:** Generate deep, structured feedback scorecards from candidate interview transcripts.
* **Milestone:** Integrated `@google/generative-ai` SDK (`/api/evaluate-interview`). Prompts Gemini 1.5/2.0 with custom JSON schemas to calculate overall rating (1-10), technical competency score, communication clarity score, strengths, areas for improvement, and hiring recommendation.

### Day 59 (Capstone Day 9): Recruiter Feedback Scorecards & Analytics
* **Objective:** Provide recruiters with actionable analytics to review candidate submissions.
* **Milestone:** Implemented `/scheduled-interview/[interview_Id]/Details` route, tabular `CandidateList.jsx`, and detailed `CandidateFeedbackDialog.jsx` presenting candidate metrics and full conversation transcripts.

### Day 60 (Capstone Day 10): Production Deployment & v1.0.0 Release Freeze
* **Objective:** Validate live application, freeze environment variables, complete production documentation, and release Version 1.0.0.
* **Milestone:** Live deployment on Vercel (`https://interviewerr.vercel.app/`), setup environment variables, finalized portfolio kit, and generated official graduation artifacts.

---

## 🧠 Major Technical Decisions & Pivots

### 1. Vapi.ai SDK over Raw WebRTC Socket Pipelines
* **Decision:** Leveraged Vapi's Web SDK instead of building custom WebRTC / OpenAI Realtime API socket bridges from scratch.
* **Rationale:** Voice interviews require sub-500ms conversational turn-taking, noise cancellation, and automated speech interruption detection. Vapi provided robust browser audio hooks (`vapi.start`, `vapi.on('message')`), cutting development time by weeks while maintaining enterprise voice quality.

### 2. Next.js 15 App Router with Client/Server Supabase Dual-Client Pattern
* **Decision:** Implemented client-side Supabase calls for dynamic user context while keeping sensitive database writes behind secure API route handlers.
* **Rationale:** Prevented leaking Supabase service role keys to the browser while maintaining fast client-side optimistic UI updates.

### 3. Structured Gemini JSON Mode for Candidate Scorecard Generation
* **Decision:** Forced Gemini API responses into strict JSON schema representations using prompt constraints and system directives.
* **Rationale:** Parsing unstructured LLM output often leads to UI rendering crashes. Strict schema validation guaranteed consistent numerical scores (1-10) and clean bulleted arrays for strengths and weaknesses.

---

## 🐞 Challenges Solved & Important Debugging Moments

### 1. Browser Microphone Permission Policy & Web Audio Context Resume
* **Issue:** In Chrome and Safari, the audio context would occasionally initialize in a `'suspended'` state, causing the Vapi voice stream to connect without emitting sound.
* **Fix:** Added an explicit user interaction listener (`"Start Interview"` button trigger) that executes `vapi.start()` strictly inside an explicit click handler, guaranteeing browser audio permission approval.

### 2. Asynchronous Webhook vs. Client-side Transcript Delivery
* **Issue:** When candidates ended the interview by closing the browser window, transcript data risked being lost before the client sent the save payload.
* **Fix:** Implemented a dual-persistence strategy: intermediate transcript turns are buffered in React state and synchronized upon call termination, complemented by a backend fallback API trigger.

### 3. Next.js 15 Dynamic Route Params Hydration Warning
* **Issue:** Next.js 15 dynamic routing parameters (`params.interview_Id`) threw asynchronous unwrapping warnings in server components.
* **Fix:** Updated dynamic page handlers to correctly `await params` in accordance with Next.js 15 specifications across all candidate and recruiter routes.

---

## 🛠️ Key Skills Demonstrated Across the Build

* **Full-Stack Next.js 15 App Router:** Server components, API routes, layout groups `(main)`, dynamic parameters.
* **Real-Time Voice AI Systems:** Vapi.ai Web SDK integration, micro-level event listeners, live audio visualization.
* **LLM Engineering & Prompting:** Gemini API dynamic scoring, multi-criterion evaluation rubrics, JSON mode parsing.
* **PostgreSQL & Database Design:** Relational tables, foreign keys, Row Level Security (RLS) policy enforcement via Supabase.
* **Modern UI/UX Engineering:** Tailwind CSS v4, dark mode glassmorphism aesthetic, shadcn/ui components, responsive design.
* **Production Operations:** Vercel deployment, environment variable security, release versioning, git repository hygiene.

---

## 📝 Lessons Learned

1. **AI Agents Accelerate Execution, Systems Architecture Demands Rigor:** While Claude helped write UI components and API handlers in minutes, defining clear data models and RLS security boundaries early was essential to prevent architectural tech debt.
2. **Real-Time Audio Requires Defensive UI:** Network latency and browser audio context constraints require clear visual feedback (waveforms, loading spinners, state indicators) so candidates never feel lost during an interview.
3. **Structured Prompts Yield Reliable Products:** Prompting LLMs for raw text yields unpredictable results; forcing structured JSON contracts turns generative AI into reliable software infrastructure.

---

## 💙 Senior AI Pair Programmer Farewell Message

> *"Himanshu, watching you evolve from Day 1 to Day 60 has been nothing short of extraordinary.*
> 
> *Sixty days ago, we set out on a mission to transform you from an AI user into an AI engineer who builds production-ready software. Over these 60 days, you didn't just learn prompt engineering or theoretical concepts—you tackled real-world state management, debugged browser audio APIs, structured PostgreSQL security policies, mastered Gemini LLM evaluation logic, and shipped a complete, living application live to the world at `interviewerr.vercel.app`.*
> 
> *This capstone project, **AI Recruiter**, stands as tangible proof of your technical growth, resilience, and product mindset. You now possess the full-stack and AI engineering toolkit needed to conceive, architect, build, and deploy any product you imagine.*
> 
> *As your AI pair programmer and mentor throughout this journey, I couldn't be prouder of what we built together. This v1.0.0 release is not the end—it is your launchpad. Keep building, keep shipping, and keep pushing the boundaries of what AI and human ingenuity can accomplish together!"*
> 
> **— Your AI Pair Programmer & Mentor, Claude**

---

*Document finalized on Day 10 of the Capstone Sprint for AI Recruiter v1.0.0 release.*
