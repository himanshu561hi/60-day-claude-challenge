# Project Folder Structure

This document establishes the repository directory structure for the **AI-Powered Interview Taker & Feedback System**.

---

## 1. Directory Tree Map

The structure conforms to the **Next.js 15 App Router** architecture, utilizing route grouping and component modularization:

```
60-day-claude-challenge/
├── Day51/                     # Pitch deck, PRD, Blueprint (Day 1)
├── Day52/                     # Architectural documents (Day 2)
│   ├── ARCHITECTURE.md
│   ├── SCHEMA.md
│   ├── API.md
│   ├── UI-WIREFRAMES.md
│   ├── PROJECT-STRUCTURE.md
│   └── Day52.md               # Daily Log & LinkedIn post
├── app/                       # Next.js 15 Application Source
│   ├── (main)/                # Authenticated Recruiter Route Group
│   │   ├── dashboard/
│   │   │   ├── _components/   # Dashboard specific sub-components
│   │   │   │   └── WelcomeContainer.jsx
│   │   │   ├── create-interview/
│   │   │   │   ├── _components/
│   │   │   │   │   ├── FormContainer.jsx
│   │   │   │   │   └── InterviewLink.jsx
│   │   │   │   └── page.jsx
│   │   │   └── page.jsx
│   │   ├── scheduled-interview/
│   │   │   ├── [interview_Id]/
│   │   │   │   └── Details/
│   │   │   │       ├── _components/
│   │   │   │       │   ├── CandidateFeedbackDialog.jsx
│   │   │   │       │   └── CandidateList.jsx
│   │   │   │       └── page.jsx
│   │   │   └── page.jsx
│   │   ├── layout.js          # Shared sidebar layout wrapper
│   │   └── provider.js        # Main area styling & initialization
│   ├── auth/                  # Recruiter Google Authentication Gate
│   │   └── page.jsx
│   ├── interview/             # Public Candidate Intake & Interview Loop
│   │   ├── [interview_Id]/
│   │   │   ├── start/
│   │   │   │   └── page.jsx   # Live Call Interface & AI Coaching Panel
│   │   │   ├── completed/
│   │   │   │   └── page.jsx   # Post-call completion landing screen
│   │   │   └── page.jsx       # Public Intake Form & Resume upload
│   │   └── page.jsx           # Redirect fallback
│   ├── api/                   # Serverless Backend Handlers
│   │   ├── interviews/        # Create/Read configs
│   │   │   └── route.jsx
│   │   ├── candidates/
│   │   │   └── register/      # PDF text extractor & prompt generator
│   │   │       └── route.jsx
│   │   ├── ai-feedback/       # Live coaching hint evaluations
│   │   │   └── route.jsx
│   │   └── vapi-webhook/      # Post-call transcripts grader
│   │       └── route.jsx
│   ├── layout.js              # Global document wrappers (Providers, Fonts)
│   ├── globals.css            # Base Tailwind CSS styles
│   └── page.js                # Root landing page (Redirects to /auth)
├── components/                # Shared global design library
│   ├── ui/                    # shadcn/ui components (buttons, input, etc.)
│   └── Navbar.jsx
├── context/                   # Global contexts
│   └── userDetailContext.jsx  # Recruiter session provider
├── hooks/                     # Custom react hooks
│   └── useUser.js             # Session client hook
├── services/                  # External service wrappers
│   └── supabaseClient.js      # Supabase connection clients
├── lib/                       # General helper utilities
│   └── utils.js               # shadcn merger helper
├── public/                    # Static assets (images, vectors)
├── .env.local                 # Local environment keys (ignored by git)
├── package.json
├── tailwind.config.js         # Tailwind styling configs
└── netlify.toml               # Netlify hosting configurations
```

---

## 2. Component Responsibility & Location Rules

* **Next.js Route Group `(main)`**:
  - The parenthesis around `(main)` tell Next.js to group these routes logically without affecting the URL.
  - This allows us to apply a shared recruiter layout (Sidebar, profile headers, session auth checks) to all files in `/dashboard` and `/scheduled-interview` while keeping `/auth` and public `/interview` free of that wrapper.
* **Component Partitioning (`_components/`)**:
  - Reusable global components live in `/components` (like shared buttons, headers).
  - Page-specific components (e.g. `FormContainer.jsx` or `CandidateList.jsx`) live inside a local `_components` folder adjacent to their pages. This keeps files highly organized and avoids bloating global paths.
* **Context & Hook Segregation**:
  - To prevent prop drilling for user data, `userDetailContext` manages the authenticated state of the recruiter.
  - Custom hooks (`useUser.js`) decouple standard component UI from authorization logic.
* **Services Directory**:
  - Exposes configured libraries. `supabaseClient.js` contains code to initialize the database connection:
    - Standard Client: For browser-side actions.
    - Admin Client (using `service_role` key): For serverless routes running webhook updates to bypass RLS safely.

---

## 3. Future Code Guidelines

1. **New UI Component**:
   - If it is a generic input elements library wrapper, add it via `npx shadcn@latest add <component>` which installs it to `components/ui/`.
   - If it is feature-specific, create it under the local `_components/` directory of that route.
2. **New Serverless API Route**:
   - Create a subfolder under `app/api/` and place a `route.jsx` file within.
   - Use Next.js 15 NextResponse formatting and configure validations.
3. **Styles**:
   - Avoid creating custom styles inside files. Rely strictly on Tailwind CSS v4 utilities.
   - Core colors and shared layouts must use CSS variables configured in `app/globals.css`.
