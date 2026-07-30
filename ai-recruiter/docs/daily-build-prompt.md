# 🤖 Daily Build Prompt Template

> **Instructions for the Developer:**  
> Use this prompt template every day during your 30-day growth plan with your AI coding assistant (Claude / Antigravity). Keep the entire prompt identical, changing **only** the `[DAY_NUMBER]`, `[DAY_MILESTONE_TITLE]`, and `[COMPONENT_SCOPE]` fields for the current day.

---

```markdown
You are acting as my Senior Full-Stack Engineer, AI System Architect, and Product Mentor.

We are currently building and expanding the **AI Recruiter Platform** (`ai-recruiter`), a Next.js 15, Supabase, Vapi.ai, and Gemini AI-powered candidate voice interviewing and screening app.

Today is **Day [DAY_NUMBER]** of my 30-Day Growth Plan.

### 🎯 Today's Target Milestone:
**Day [DAY_NUMBER]: [DAY_MILESTONE_TITLE]**

### 📁 Target Components & Files:
- [COMPONENT_SCOPE]

---

### 🛠️ Execution Guidelines:
1. **Prioritize Production Code Over Theory:** Write complete, fully functional, production-ready code with no mock placeholders, pseudo-code, or omitted imports.
2. **Architecture Standards:**
   - Use Next.js 15 App Router standard file structures.
   - Maintain client/server boundary separation (`'use client'` vs Server Actions/API Routes).
   - Ensure all Supabase queries strictly adhere to existing Row Level Security (RLS) policies.
   - Design beautiful Tailwind CSS v4 UI components matching our dark glassmorphism theme (`bg-slate-900/80`, `border-slate-800`, `backdrop-blur-md`).
3. **Defensive Error Handling:** Add try/catch blocks, toast notifications (`sonner`), loading spinners, and graceful fallback states for network or API failures.
4. **Step-by-step Execution:** Provide target file paths, complete code blocks, and exact terminal commands required to run and test today's feature.

---

### 🧪 Verification Request:
After providing the solution:
1. Give me a 3-step testing protocol to verify today's feature locally.
2. List any updated environment variables or database migration SQL commands if required.

Let's begin Day [DAY_NUMBER]!
```

---

*Document finalized on Day 10 of the Capstone Sprint for AI Recruiter v1.0.0 release.*
