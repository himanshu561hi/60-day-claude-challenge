# Day 55: Public Candidate Intake Portal & Gemini AI Resume Parser (Day 5)

> [!IMPORTANT]
> **📁 Master Code Repository Location:**
> To maintain structural organization and eliminate duplicate dependency artifacts across daily directories, the continuous production full-stack Next.js 15 application for **Days 51–60 (AI-Powered Interview System)** resides directly inside the master folder **`ai-recruiter/`** at the root of the workspace.
> All overarching technical specifications (PRD, Database Schema, Architecture, and Blueprints) are housed in **`ai-recruiter/docs/`**.
> This daily folder (`Day55/`) logs the architectural record and feature deliverables for this specific milestone day.

---

🚀 **Day 55/60: Candidate Resume Upload, PDF Parsing & Google Gemini AI Custom Persona Generator** 🎯

Today (Day 5 of our 10-Day Capstone Blueprint), we reached the midpoint of our Capstone build by constructing the **Public Candidate Onboarding Portal**. Candidates accessing unique interview routing URLs (`/interview/[id]`) can now inspect target job evaluation criteria, upload their PDF resumes for live binary extraction, and trigger our generative AI engine to formulate personalized real-time voice interview instructions!

---

## 📅 Technical Breakdown of Today's Implementation:

### 1️⃣ Serverless PDF Reader & Gemini AI API Endpoint (`/api/ai-model/route.jsx`)
* **Node.js Runtime Integration**: Explicitly assigned `export const runtime = 'nodejs'` to ensure zero bundling conflicts when executing binary memory buffer conversions and invoking `pdf-parse`.
* **Dynamic Prompt Engineering**: Configured Google's Gemini AI SDK (`@google/generative-ai` with `gemini-1.5-flash`) to critically analyze extracted candidate resume text against recruiter-defined job roles and technical specifications.
* **Structured Evaluation Payload**: Instructed Gemini AI to formulate and return a deterministic JSON evaluation containing:
  - **`aiPrompt`**: A detailed, persona-driven system instruction set for our Vapi voice bot ("Alex, AI Recruiter"), primed with 3 progressive technical questions tailored to the candidate's achievements.
  - **`matchedSkills`**: Array of identified core technical competency tags (e.g., `React 19`, `Next.js 15`, `PostgreSQL`, `Tailwind CSS`).
  - **`experienceLevel`**: Automated seniority classification.
  - **`interviewFocus`**: Strategic bullet points defining key investigation areas for the vocal interview.
* **Intelligent Simulation Fallback**: Designed a zero-downtime development fallback mode. If a `GEMINI_API_KEY` is not yet configured in local environment variables, the route gracefully outputs high-fidelity simulated persona structures without throwing 500 server errors!

### 2️⃣ Interactive Candidate Intake UI (`CandidateIntakeForm.jsx`)
* **Vibrant Glassmorphism Theme**: Engineered an intuitive onboarding form using Tailwind CSS v4 featuring ambient glowing gradient decorations, interactive file drop zones, and clear visual attachment indicators (file size in KB, document titles, icon badges).
* **Client-Side Validation & File Filtering**: Enforced `.pdf` format validation and a strict 5MB filesize ceiling before transmitting payloads to the cloud parser.
* **✨ Instant Demo Loader**: Built a one-click **"Load Demo Resume & Candidate"** shortcut that pre-populates a complete Senior Full-Stack & Cloud AI Engineer profile for instant zero-configuration testing!

### 3️⃣ Supabase PostgreSQL Relational Storage
* **Public Candidate Record Creation**: Configured our front-end portal to automatically save candidate submissions directly into the `candidate_submissions` PostgreSQL table upon successful AI evaluation.
* Respects our established Row Level Security (RLS) public insert policies while linking submissions to their parent `interview_id`.

### 4️⃣ Visual AI Analysis Results & Voice Persona Preview (`ResumeAnalysisCard.jsx`)
* Automatically launches upon completion of resume parsing.
* Celebrates candidate readiness with vibrant animations, matched skill pills, and an expandable inspectable preview of the raw system prompt prepared for real-time speech synthesis.
* Persists evaluated parameters in `sessionStorage` and prepares an airtight handoff bridge to Tomorrow's live calling interface (`/interview/[id]/start`).

---

## 📂 Code Files Engineered Today (Inside `ai-recruiter/`)

| File Name | Location in Master Repository | Purpose |
| :--- | :--- | :--- |
| **`route.jsx`** | `ai-recruiter/app/api/ai-model/route.jsx` | Serverless API route handling FormData PDF buffer extraction via `pdf-parse` and Google Gemini AI prompt generation. |
| **`CandidateIntakeForm.jsx`** | `ai-recruiter/app/interview/[interview_Id]/_components/CandidateIntakeForm.jsx` | Responsive candidate intake card with file drop zones, validation, demo quick-loader, and Supabase insertion. |
| **`ResumeAnalysisCard.jsx`** | `ai-recruiter/app/interview/[interview_Id]/_components/ResumeAnalysisCard.jsx` | Visual results showcase displaying matched skills, experience evaluation, and inspectable AI bot instructions. |
| **`CandidatePortalContainer.jsx`** | `ai-recruiter/app/interview/[interview_Id]/_components/CandidatePortalContainer.jsx` | Reactive state manager transitioning views between form submission and analysis showcase. |
| **`page.jsx` (Intake)** | `ai-recruiter/app/interview/[interview_Id]/page.jsx` | Public Server Component fetching recruiter job specs from Supabase with resilient demo fallback profiles. |
| **`page.jsx` (Start Bridge)** | `ai-recruiter/app/interview/[interview_Id]/start/page.jsx` | Placeholder handoff screen bridging Day 5 evaluation to Day 6 Vapi voice call execution without 404 dead ends. |

---

## 🧪 Verification & Test Results

* **Zero-Setup Demo Verification**: Tested "✨ Load Demo Resume & Candidate"; confirmed payload successfully transmits to `/api/ai-model` and renders simulated persona insights immediately when running offline/sandbox mode.
* **Cloud API Verification**: When supplied with a valid Google Gemini API key (`gemini-1.5-flash`), confirmed accurate JSON schema formatting and customized conversational prompt creation.
* **Handoff Bridge**: Clicking "Proceed to Live Voice Call (Day 6)" successfully directs users to the dedicated `/interview/[interview_Id]/start` verification screen while confirming that `sessionStorage` retains all necessary instructions for Vapi SDK initialization.

---

## 🚀 LinkedIn Progress Draft for Day 55/60

```text
🚀 Day 55/60: Public Candidate Onboarding Portal & Google Gemini AI Resume Parser! 🎯📄🤖

We have officially hit the halfway milestone (Day 5 of 10) in my AI Interview Capstone build! Today, I engineered the public candidate gateway—enabling job applicants to upload their PDF resumes for real-time AI parsing and persona generation!

Here is what I built today in our master full-stack app (`ai-recruiter/`):
📄 Server-Side PDF Extractor: Built a Next.js 15 Node runtime route (`/api/ai-model`) that ingests multipart file streams and decodes binary PDF buffers into structured plaintext using `pdf-parse`.
🧠 Google Gemini AI Pipeline: Integrated `@google/generative-ai` (`gemini-1.5-flash`) to cross-evaluate candidate achievements against target job descriptions and dynamically write custom interviewer instructions ("Meet Alex, AI Recruiter").
⚡ Zero-Config Demo Mode: Designed a high-speed "Load Demo Resume" trigger and fallback simulation engine so developer QA testing never stalls, even before attaching cloud API keys!
🗄️ Resilient DB Persistence: Linked completed candidate profiles directly to our Supabase PostgreSQL `candidate_submissions` relational table with Row Level Security (RLS).
✨ Vibrant Visual Showcase: Engineered a glassmorphic results UI displaying identified skill tags, estimated tenure, interview focus topics, and an inspectable preview of the live Vapi system prompt!

With candidates now fully onboarded and custom voice interviewer personas configured in memory, tomorrow’s focus shifts to Day 6: Connecting the real-time Vapi Web SDK & Activating Live Microphone Voice Conversations! 🎙️🌐

#Nextjs #GeminiAI #Supabase #AI #WebDevelopment #FullStack #BuildInPublic #60DaysOfCode #SoftwareEngineering #Tech
```

---

## ➡️ Handoff Notes for Day 56 (Day 6)
* **Tomorrow's Goal**: Connect the `@vapi-ai/web` calling SDK to our frontend browser, request microphone audio permissions, and spawn real-time conversational voice calls.
* **Frontend Target**: Replace the placeholder screen at `/interview/[interview_Id]/start/page.jsx` with active audio controllers, volume indicators, and dynamic call duration limits (5–7 minutes).
* **State Recovery**: Read `sessionStorage.getItem('active_vapi_session')` to inject the `aiPrompt` generated today into the live Vapi assistant initialization loop.
