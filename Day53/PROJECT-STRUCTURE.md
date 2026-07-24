# PROJECT-STRUCTURE.md — Updated Directory Map
**Day 53 — Reflects actual files created today**

---

## Current Repository Structure (After Day 53)

```
60-day-claude-challenge/
│
├── Day51/                              # Day 1: Pitch Deck & PRD
│   ├── prd.md
│   ├── pitch_deck.md
│   └── implementation_blueprint.md
│
├── Day52/                              # Day 2: System Design Documents
│   ├── ARCHITECTURE.md
│   ├── SCHEMA.md
│   ├── API.md
│   ├── UI-WIREFRAMES.md
│   ├── PROJECT-STRUCTURE.md
│   ├── implementation_blueprint.md
│   └── Day52.md
│
├── Day53/                              # Day 3: Setup Documentation
│   ├── SETUP.md                        ✅ NEW - Installation guide
│   ├── ENVIRONMENT.md                  ✅ NEW - Environment variables guide
│   ├── PROJECT-STRUCTURE.md            ✅ NEW - This file
│   └── DAY3-SUMMARY.md                 ✅ NEW - Day log & LinkedIn post
│
├── app/                               # Next.js 15 App Router (Application Source)
│   │
│   ├── (main)/                        # Route Group: Authenticated Recruiter Area
│   │   ├── layout.js                  ✅ NEW - Sidebar + Provider layout wrapper
│   │   ├── provider.js                ✅ NEW - React Context client wrapper
│   │   ├── _components/
│   │   │   └── AppSidebar.jsx         ✅ NEW - Premium collapsible nav sidebar
│   │   ├── dashboard/
│   │   │   ├── page.jsx               ✅ NEW - Dashboard home page
│   │   │   └── _components/
│   │   │       └── WelcomeContainer.jsx ✅ NEW - Personalized greeting + quick actions
│   │   └── scheduled-interview/
│   │       └── page.jsx               ✅ NEW - All interviews list (scaffold)
│   │
│   ├── auth/                          # Authentication Pages
│   │   ├── page.jsx                   ✅ NEW - Google OAuth login page
│   │   └── callback/
│   │       └── route.js               ✅ NEW - OAuth code exchange handler
│   │
│   ├── interview/                     # Public Candidate Portal (no auth)
│   │   ├── page.jsx                   ✅ NEW - Interview fallback page
│   │   └── [interview_Id]/
│   │       └── page.jsx               ✅ NEW - Candidate intake scaffold (Day 55)
│   │
│   ├── api/                           # Next.js Serverless API Routes
│   │   ├── interviews/
│   │   │   └── route.jsx              ✅ NEW - GET/POST interviews (scaffold)
│   │   ├── candidates/
│   │   │   └── register/
│   │   │       └── route.jsx          ✅ NEW - PDF parser scaffold (Day 55)
│   │   ├── ai-feedback/
│   │   │   └── route.jsx              ✅ NEW - Live coaching scaffold (Day 57)
│   │   └── vapi-webhook/
│   │       └── route.jsx              ✅ NEW - Call scoring scaffold (Day 58)
│   │
│   ├── globals.css                    ✅ NEW - Design tokens, glassmorphism, animations
│   ├── layout.js                      ✅ NEW - Root HTML document wrapper
│   └── page.js                        ✅ NEW - Root redirect to /auth
│
├── components/                        # Shared Component Library
│   └── ui/                            # shadcn/ui components (installed via CLI)
│       ├── sidebar.jsx                Installed via npx shadcn add sidebar
│       ├── button.jsx                 Installed via npx shadcn add button
│       ├── card.jsx                   Installed via npx shadcn add card
│       └── ...                        (More added on demand as needed)
│
├── context/
│   └── userDetailContext.jsx          ✅ NEW - Global recruiter session context
│
├── hooks/
│   └── useUser.js                     ✅ NEW - Custom hook for user context access
│
├── services/
│   └── supabaseClient.js              ✅ NEW - Browser + admin Supabase clients
│
├── lib/
│   └── utils.js                       ✅ NEW - cn() tailwind merge utility
│
├── public/                            # Static assets (empty — images added later)
│
├── .env.local.example                 ✅ NEW - Template for environment variables
├── .gitignore                         ✅ NEW - Git ignore rules
├── next.config.mjs                    ✅ NEW - Next.js configuration
└── package.json                       ✅ NEW - Dependencies manifest
```

---

## Files To Be Created (Upcoming Days)

| File | Day | Purpose |
|------|-----|---------|
| `app/(main)/dashboard/create-interview/page.jsx` | Day 54 | Interview creation form |
| `app/(main)/dashboard/create-interview/_components/FormContainer.jsx` | Day 54 | Form UI |
| `app/(main)/dashboard/create-interview/_components/InterviewLink.jsx` | Day 54 | Shareable link dialog |
| `app/interview/[interview_Id]/page.jsx` | Day 55 | Full candidate intake form |
| `app/api/candidates/register/route.jsx` | Day 55 | PDF parse + Gemini integration |
| `app/interview/[interview_Id]/start/page.jsx` | Day 56 | Vapi voice call UI |
| `app/api/ai-feedback/route.jsx` | Day 57 | Live Gemini coaching |
| `app/interview/[interview_Id]/completed/page.jsx` | Day 58 | Post-call thank you |
| `app/(main)/scheduled-interview/[interview_Id]/Details/page.jsx` | Day 59 | Candidate management |
| `netlify.toml` | Day 60 | Deployment configuration |

---

## Key Architecture Rules

1. **`(main)` Route Group**: Parentheses group routes without affecting the URL. All files here require authentication.
2. **`_components/` folders**: Page-specific components live next to their page. Global components live in `/components`.
3. **Server vs. Client**: `layout.js` files are Server Components. Add `'use client'` at the top of any file that uses hooks (useState, useEffect, useRouter).
4. **API Routes**: All backend logic lives in `app/api/`. Always use `NextResponse` for responses.
5. **Context**: Never import `supabaseAdmin` in client components — it's for server-side API routes only.
