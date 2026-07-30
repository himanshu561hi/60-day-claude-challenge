# Implementation Blueprint: Days 52-60 (Days 2-10)

This document is the single source of truth for the 10-day capstone project. Each section provides full contextual details, setup parameters, expected behaviors, test scenarios, and handoffs, assuming each day begins in a brand new AI agent session.

All paths in this blueprint refer to the root directory of the application: `c:/Users/sidhr/OneDrive/Desktop/himanshu/60-day-claude-challenge`.

---

## Day 52 (Day 2): Project Setup, Supabase Schema & Auth Configuration

### 🎯 Objective
Initialize the Next.js application, structure the database tables, set up Row Level Security (RLS) policies, and build the Google Auth authentication screen.

### 📖 What I'll Learn
* Setting up Server-side and Client-side Supabase Clients in Next.js 15.
* Creating secure RLS policies in PostgreSQL.
* Implementing Google Auth redirection and session checks in React contexts.

### 🛠 Features to Build
* Database initialization for `profiles`, `interviews`, and `candidate_submissions` tables.
* Recruiter auth gate and Google Sign-in flow.
* Global user context provider (`userDetailContext.jsx`).

### 📝 Step-by-Step Implementation Plan
1. **Initialize Project**: Install dependencies (`@supabase/supabase-js`, `lucide-react`, `sonner`, etc.) and ensure Tailwind CSS config is ready.
2. **Supabase Database Schema Setup**: Run SQL migration commands to create tables:
   * **profiles**: Linked to `auth.users.id`.
   * **interviews**: Linked to `profiles.id`.
   * **candidate_submissions**: Linked to `interviews.id`.
3. **Configure RLS Policies**:
   * Allow public insert access to `candidate_submissions` so anonymous candidates can submit results.
   * Restrict access to `profiles` and `interviews` to the owning `recruiter_id`.
4. **Supabase Client Utilities**: Create `services/supabaseClient.js` to expose browser and server instances.
5. **Context Provider**: Create `context/userDetailContext.jsx` and `hooks/useUser.js` to manage the authenticated recruiter state.
6. **Auth UI Page**: Implement `/auth/page.jsx` using shadcn/ui buttons for "Sign in with Google".

### 📂 Files to Create/Modify
* [NEW] [supabaseClient.js](file:///c:/Users/sidhr/OneDrive/Desktop/himanshu/60-day-claude-challenge/services/supabaseClient.js)
* [NEW] [userDetailContext.jsx](file:///c:/Users/sidhr/OneDrive/Desktop/himanshu/60-day-claude-challenge/context/userDetailContext.jsx)
* [NEW] [useUser.js](file:///c:/Users/sidhr/OneDrive/Desktop/himanshu/60-day-claude-challenge/hooks/useUser.js)
* [NEW] [auth/page.jsx](file:///c:/Users/sidhr/OneDrive/Desktop/himanshu/60-day-claude-challenge/app/auth/page.jsx)

### 🔗 APIs/Tools
* Supabase Database + Authentication (Google OAuth provider configuration in Supabase Dashboard).

### 🧪 Testing Tasks
* Try accessing `/dashboard` without signing in. Validate redirect to `/auth`.
* Click "Sign in with Google" and verify redirect to Google sign-in.
* Check database to see if a row was created in `profiles` table upon first sign-in.

### 🐞 Debugging Tips
* **Auth Redirect Loop**: Ensure `siteUrl` and redirect URIs in Supabase Auth settings match `http://localhost:3000`.

### ✅ End-of-Day Checklist
- [x] Database schema is set up.
- [ ] Google Sign-In is functional.
- [ ] Recruiter details context updates with user credentials.

### 📸 Expected State
* Visual: `/auth` page showing a premium login card.
* Database: Supabase dashboard shows matching user profile rows.

### ➡️ Handoff Notes
* Ready for Day 53 to construct the recruiter shell and dashboard UI.

---

## Day 53 (Day 3): Recruiter Dashboard Shell & Sidebar UI

### 🎯 Objective
Create a responsive recruiter dashboard shell featuring a premium sidebar, user profile switcher, and a greeting dashboard area.

### 📖 What I'll Learn
* Using shadcn/ui collapsible sidebar systems.
* Layout route grouping `(main)` in Next.js.
* Managing responsive viewport transitions using Tailwind CSS.

### 🛠 Features to Build
* Sidebar component with links to Dashboard, All Interviews, and Scheduled Interviews.
* Recruiter welcome card displaying customized greetings based on login credentials.
* Placeholder stats components for active interviews and submissions.

### 📝 Step-by-Step Implementation Plan
1. **Route Group**: Create layout under `app/(main)/layout.js` incorporating the global state providers.
2. **Sidebar Component**: Create `_components/AppSidebar.jsx` using shadcn `sidebar.jsx` parts. Add profile dropdown at bottom to logout.
3. **Theme and Layout Integration**: Configure the sidebar toggle button inside `app/(main)/layout.js`.
4. **Welcome UI**: Implement `dashboard/_components/WelcomeContainer.jsx` to render a modern glassmorphism welcome section.
5. **Dashboard Content Shell**: Create `dashboard/page.jsx` integrating `WelcomeContainer` and placeholders for historical interview lists.

### 📂 Files to Create/Modify
* [NEW] [app/\(main\)/layout.js](file:///c:/Users/sidhr/OneDrive/Desktop/himanshu/60-day-claude-challenge/app/\(main\)/layout.js)
* [NEW] [app/\(main\)/provider.js](file:///c:/Users/sidhr/OneDrive/Desktop/himanshu/60-day-claude-challenge/app/\(main\)/provider.js)
* [NEW] [AppSidebar.jsx](file:///c:/Users/sidhr/OneDrive/Desktop/himanshu/60-day-claude-challenge/app/\(main\)/_components/AppSidebar.jsx)
* [NEW] [dashboard/page.jsx](file:///c:/Users/sidhr/OneDrive/Desktop/himanshu/60-day-claude-challenge/app/\(main\)/dashboard/page.jsx)
* [NEW] [WelcomeContainer.jsx](file:///c:/Users/sidhr/OneDrive/Desktop/himanshu/60-day-claude-challenge/app/\(main\)/dashboard/_components/WelcomeContainer.jsx)

### 🧪 Testing Tasks
* Verify responsive sidebar hides and opens correctly on mobile/desktop screens.
* Check that logging out logs out the user and redirects to `/auth`.

### 🐞 Debugging Tips
* Ensure the `@radix-ui/react-tooltip` is present since shadcn's sidebar requires it.

### ✅ End-of-Day Checklist
- [ ] Recruiter layout contains Sidebar.
- [ ] Dashboard displays recruiter's name from context.
- [ ] Sidebar collapses dynamically.

### ➡️ Handoff Notes
* Dashboard shell is active. Ready to build the interview template creation forms on Day 54.

---

## Day 54 (Day 4): Interview Template Creation Flow

### 🎯 Objective
Build the form interface for creating new custom interview templates and generate candidate interview links.

### 📖 What I'll Learn
* Validating input fields with React state.
* Generating unique, secure URLs for external candidate access.
* Handling form submissions and database insertions via client-side Supabase calls.

### 🛠 Features to Build
* Job details form (Role, Job Description text areas).
* Database insert logic for `interviews` table.
* Success UI displaying the shareable candidate link with a "Copy to Clipboard" button.

### 📝 Step-by-Step Implementation Plan
1. **Creation Route**: Define page at `/dashboard/create-interview/page.jsx`.
2. **Form Layout**: Create `FormContainer.jsx` using inputs, buttons, and custom design layouts.
3. **Database Insertion**: Save `job_role`, `job_description`, and `recruiter_id` to Supabase.
4. **Link Generator Dialog**: Build `InterviewLink.jsx` to render the shareable link `/interview/[id]` with visual copy states.

### 📂 Files to Create/Modify
* [NEW] [create-interview/page.jsx](file:///c:/Users/sidhr/OneDrive/Desktop/himanshu/60-day-claude-challenge/app/\(main\)/dashboard/create-interview/page.jsx)
* [NEW] [FormContainer.jsx](file:///c:/Users/sidhr/OneDrive/Desktop/himanshu/60-day-claude-challenge/app/\(main\)/dashboard/create-interview/_components/FormContainer.jsx)
* [NEW] [InterviewLink.jsx](file:///c:/Users/sidhr/OneDrive/Desktop/himanshu/60-day-claude-challenge/app/\(main\)/dashboard/create-interview/_components/InterviewLink.jsx)

### 🧪 Testing Tasks
* Create a test interview role. Verify success dialog opens.
* Test "Copy to Clipboard" and ensure it copies the valid URL path.

### ✅ End-of-Day Checklist
- [ ] Form validates entries.
- [ ] Database updates with new interview rows.
- [ ] Success dialog prints correct shareable link.

---

## Day 55 (Day 5): Candidate Resume Upload & Gemini Parser API

### 🎯 Objective
Implement the public candidate onboarding portal where candidates input their details and upload their PDF resumes for Gemini analysis.

### 📖 What I'll Learn
* Reading PDF buffers server-side in Next.js APIs.
* Structuring prompt payloads for Gemini's document parsing capabilities.
* Customizing System Prompts dynamically based on parsed resume text.

### 🛠 Features to Build
* Public landing page `/interview/[interview_Id]` for candidates.
* Server-side PDF reader API route `/api/ai-model`.
* Prompt customization logic generating Vapi agent configuration based on target role + candidate background.

### 📝 Step-by-Step Implementation Plan
1. **Public Intake Route**: Create `/interview/[interview_Id]/page.jsx`.
2. **Candidate Form & File Upload**: Design a responsive card for candidate name, email, and PDF file picker.
3. **API Upload Endpoint**: Build `/api/ai-model/route.jsx` using `multer` or parsing standard stream requests.
4. **PDF Parser Setup**: Extract text contents from files.
5. **Gemini Parser Hook**: Prompt Gemini AI to parse candidate resume details, match them with the job description, and format custom Vapi interviewer instructions (e.g., custom persona, questions to ask).

### 📂 Files to Create/Modify
* [NEW] [interview/page.jsx](file:///c:/Users/sidhr/OneDrive/Desktop/himanshu/60-day-claude-challenge/app/interview/page.jsx)
* [NEW] [interview/\[interview_Id\]/page.jsx](file:///c:/Users/sidhr/OneDrive/Desktop/himanshu/60-day-claude-challenge/app/interview/\[interview_Id\]/page.jsx)
* [NEW] [api/ai-model/route.jsx](file:///c:/Users/sidhr/OneDrive/Desktop/himanshu/60-day-claude-challenge/app/api/ai-model/route.jsx)

### 🧪 Testing Tasks
* Open the shareable URL, fill out information, upload a dummy PDF, and click next.
* Assert server API responds with a structured custom bot persona.

### ✅ End-of-Day Checklist
- [ ] Candidates can access route without logging in.
- [ ] PDFs successfully parse server-side.
- [ ] Dynamic bot prompts are generated.

---

## Day 56 (Day 6): Vapi Voice Interview Integration & Call Interface

### 🎯 Objective
Connect Vapi Web SDK to the browser, spawn real-time voice calls, and build the live calling UI.

### 📖 What I'll Learn
* Managing active audio device permissions.
* Implementing the `@vapi-ai/web` calling events (call-start, call-end, error).
* Setting limits on call duration and questions dynamically.

### 🛠 Features to Build
* Calling screen `/interview/[interview_Id]/start` with microphone controls.
* Vapi connection managers.
* Auto-termination loops.

### 📝 Step-by-Step Implementation Plan
1. **Calling Screen Route**: Create `/interview/[interview_Id]/start/page.jsx`.
2. **Retrieve Prompt**: Read instructions generated on Day 55 from state/context.
3. **Install and Connect Vapi**: Import `@vapi-ai/web`, initialize Vapi instance with the custom instructions prompt.
4. **Limit Controls**: Configure maximum interview duration (7 minutes) and program call termination states.

### 📂 Files to Create/Modify
* [NEW] [interview/\[interview_Id\]/start/page.jsx](file:///c:/Users/sidhr/OneDrive/Desktop/himanshu/60-day-claude-challenge/app/interview/\[interview_Id\]/start/page.jsx)

### 🔗 APIs/Tools
* Vapi Web SDK client library.

### 🧪 Testing Tasks
* Launch a call, check browser audio alerts, verify the voice bot introduces itself.
* Let call run or end, and verify hook states.

### ✅ End-of-Day Checklist
- [ ] Browser requests audio permissions successfully.
- [ ] Audio call establishes with low latency.
- [ ] Hanging up terminates the connection cleanly.

---

## Day 57 (Day 7): Live Transcription & Dynamic AI Mentor Tips

### 🎯 Objective
Subscribe to Vapi transcript streams, build a scrolling transcript board, and serve live AI tips chunk-by-chunk.

### 📖 What I'll Learn
* Capturing event streams via WebSockets/Vapi SDK.
* Real-time text analytics with low latency.
* Rendering active conversation timelines in React.

### 🛠 Features to Build
* Live transcript container.
* Dynamic feedback API route `/api/ai-feedback`.
* Sliding real-time suggestions sidebar.

### 📝 Step-by-Step Implementation Plan
1. **Vapi Event Listeners**: Listen to `transcript` messages using Vapi client hooks inside the start interview page.
2. **Live Feed Panel**: Display candidate and AI dialogue side-by-side in real-time.
3. **Debounced Suggestion API**: Send completed answers to `/api/ai-feedback`.
4. **Live Mentor Panel**: Update the sidebar screen with tips when feedback completes.

### 📂 Files to Create/Modify
* [NEW] [api/ai-feedback/route.jsx](file:///c:/Users/sidhr/OneDrive/Desktop/himanshu/60-day-claude-challenge/app/api/ai-feedback/route.jsx)
* [MODIFY] [interview/\[interview_Id\]/start/page.jsx](file:///c:/Users/sidhr/OneDrive/Desktop/himanshu/60-day-claude-challenge/app/interview/\[interview_Id\]/start/page.jsx) (Include live text boards)

### 🧪 Testing Tasks
* Speak into the microphone. Check if the text updates on screen.
* Verify suggestions refresh with constructive tips after speech pauses.

### ✅ End-of-Day Checklist
- [ ] Speeches are transcribed and displayed.
- [ ] Hints update every 30-40 seconds during silence.

---

## Day 58 (Day 8): Post-Call Interview Feedback & Results Page

### 🎯 Objective
Aggregate transcripts after calls, execute full evaluations via Gemini, store feedback in Supabase, and redirect candidates to completion screens.

### 📖 What I'll Learn
* Crafting evaluation prompts for LLM assessments.
* Managing candidate state redirects after calls.
* Saving complex JSON values to PostgreSQL.

### 🛠 Features to Build
* Post-call webhook or API trigger to generate scores, strengths, weaknesses, and recommendations.
* Database record updater for `candidate_submissions`.
* Public completion screen `/interview/[interview_Id]/completed`.

### 📝 Step-by-Step Implementation Plan
1. **Completion Route**: Create `/interview/[interview_Id]/completed/page.jsx`.
2. **Analysis Route**: In `/api/ai-feedback`, add a complete analysis flow triggered on call termination.
3. **Structured Gemini Schema**: Instruct Gemini to output structured JSON: `{ score, strengths, weaknesses, suggestions }`.
4. **Save Results**: Insert details and transcript array into `candidate_submissions` matching the session IDs.

### 📂 Files to Create/Modify
* [NEW] [interview/\[interview_Id\]/completed/page.jsx](file:///c:/Users/sidhr/OneDrive/Desktop/himanshu/60-day-claude-challenge/app/interview/\[interview_Id\]/completed/page.jsx)

### 🧪 Testing Tasks
* Complete a voice call. Wait for the redirect.
* Verify that the entry is updated in Supabase with correct scores and parsed JSON.

### ✅ End-of-Day Checklist
- [ ] Call ends -> Redirect triggers.
- [ ] Gemini computes scores and feedback.
- [ ] Database contains candidate transcript record.

---

## Day 59 (Day 9): Recruiter Dashboard & Candidate Management

### 🎯 Objective
Connect recruiter pipelines, displaying candidate submission lists, and building candidate detailed review interfaces.

### 📖 What I'll Learn
* Constructing tabular layouts using shadcn components.
* Fetching relational tables via Supabase clients.
* Creating interactive dialogue overlays in Next.js.

### 🛠 Features to Build
* Shared details route `/scheduled-interview/[interview_Id]/Details`.
* Interactive lists (`CandidateList.jsx`).
* Detailed overlay review cards (`CandidateFeedbackDialog.jsx`).

### 📝 Step-by-Step Implementation Plan
1. **Details Route**: Create `/scheduled-interview/[interview_Id]/Details/page.jsx`.
2. **List Layout**: Fetch candidate rows under current interview templates. Build table sorted by completion dates.
3. **Feedback Popup**: Integrate dialog popups. When clicked, render the candidate's name, email, score, parsed charts, and complete transcript dialogue logs.

### 📂 Files to Create/Modify
* [NEW] [scheduled-interview/page.jsx](file:///c:/Users/sidhr/OneDrive/Desktop/himanshu/60-day-claude-challenge/app/\(main\)/scheduled-interview/page.jsx)
* [NEW] [scheduled-interview/\[interview_Id\]/Details/page.jsx](file:///c:/Users/sidhr/OneDrive/Desktop/himanshu/60-day-claude-challenge/app/\(main\)/scheduled-interview/\[interview_Id\]/Details/page.jsx)
* [NEW] [CandidateList.jsx](file:///c:/Users/sidhr/OneDrive/Desktop/himanshu/60-day-claude-challenge/app/\(main\)/scheduled-interview/\[interview_Id\]/Details/_components/CandidateList.jsx)
* [NEW] [CandidateFeedbackDialog.jsx](file:///c:/Users/sidhr/OneDrive/Desktop/himanshu/60-day-claude-challenge/app/\(main\)/scheduled-interview/\[interview_Id\]/Details/_components/CandidateFeedbackDialog.jsx)

### 🧪 Testing Tasks
* Check recruiter dashboard views. Verify the candidate counts match.
* Open candidate details popup, review transcripts, and confirm scrolling behavior works.

### ✅ End-of-Day Checklist
- [x] Recruiter can view candidate list.
- [x] Scores are color-coded (red, yellow, green).
- [x] Full transcripts are readable.

---

## Day 60 (Day 10): Deployment & Final Testing

### 🎯 Objective
Deploy project live, setup production variables, execute regressions, and freeze project milestones.

### 📖 What I'll Learn
* Setting up Netlify pipelines for Next.js app hosting.
* Securing API keys in production variables.
* Resolving responsive layouts and deployment lints.

### 🛠 Features to Build
* Config files for builds (`netlify.toml`).
* Production test runs.

### 📝 Step-by-Step Implementation Plan
1. **Netlify Config**: Set up redirections and Next.js overrides.
2. **Build Optimizations**: Resolve type issues and dynamic routing parameters.
3. **Key Syncing**: Add environment variables on Netlify settings dashboard.
4. **E2E Validation**: Create a recruiter slot, run a voice interview as a candidate, check transcription, check feedback logs, and review details as recruiter.

### 📂 Files to Create/Modify
* [NEW] [netlify.toml](file:///c:/Users/sidhr/OneDrive/Desktop/himanshu/60-day-claude-challenge/netlify.toml)

### 🧪 Testing Tasks
* Access production application URLs.
* Take a mock interview on a mobile device to test microphone responsiveness.

### ✅ End-of-Day Checklist
- [ ] Netlify build builds without warnings.
- [ ] Production site handles audio cleanly.
- [ ] Project v1.0 is successfully deployed and shared.
