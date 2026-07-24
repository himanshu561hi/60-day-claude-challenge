# SETUP.md — Installation & Setup Guide

## AI-Powered Interview Taker & Feedback System
**Day 53 — Project Foundation Setup**

---

## 1. Prerequisites

Before you begin, you need the following tools installed on your machine.

### 1.1 Node.js & npm

**What it is**: Node.js is the JavaScript runtime that powers Next.js. npm (Node Package Manager) is bundled with it and is used to install all project libraries.

**Why we need it**: Next.js is a Node.js framework. Without Node.js, we cannot run the development server, install packages, or build the app.

**Installation Steps**:
1. Open your browser and go to: **https://nodejs.org**
2. Click the **"LTS" (Long Term Support)** button — this is the stable version recommended for most users.
3. Download the `.msi` Windows installer.
4. Run the installer. Accept all defaults and click **Next** through the wizard.
5. When it asks about **"Tools for Native Modules"**, check the box to automatically install additional tools.
6. Finish the installation.
7. **Restart your terminal (PowerShell/Command Prompt)** after installing.
8. Verify the installation by running:
   ```powershell
   node --version
   npm --version
   ```
   You should see version numbers (e.g., `v20.x.x` and `10.x.x`).

### 1.2 Git

**What it is**: Git is a version control system that tracks changes to your code. GitHub is the cloud platform where your code repository lives.

**Why we need it**: We use Git to commit daily progress and push to GitHub for backup and collaboration.

**Installation Steps**:
1. Go to: **https://git-scm.com/downloads**
2. Click **Download for Windows**.
3. Run the installer. Accept all defaults.
4. Verify with:
   ```powershell
   git --version
   ```

### 1.3 VS Code Extensions (Recommended)

Install these VS Code extensions for the best experience:

| Extension | Why |
|-----------|-----|
| **ESLint** | Catches code quality issues in real-time |
| **Tailwind CSS IntelliSense** | Auto-completes Tailwind class names |
| **Prettier** | Auto-formats your code |
| **GitHub Copilot** *(optional)* | AI code suggestions |

**How to install**: Press `Ctrl+Shift+X` in VS Code → Search for each extension name → Click **Install**.

---

## 2. Accounts & Services

You need accounts on the following free services:

### 2.1 Supabase (Database & Auth)
1. Go to **https://supabase.com** → Sign Up (free)
2. Create a new project (pick any name, e.g., `ai-interview-system`)
3. Save your **Project URL** and **Anon Key** — you'll need them for `.env.local`

### 2.2 Google Cloud Console (OAuth Provider)
1. Go to **https://console.cloud.google.com**
2. Create a new project
3. Navigate to **APIs & Services → Credentials**
4. Create **OAuth 2.0 Client ID** → Web Application
5. Add authorized redirect URI: `https://<your-supabase-project>.supabase.co/auth/v1/callback`
6. Save the **Client ID** and **Client Secret**

### 2.3 Vapi (Voice AI)
1. Go to **https://vapi.ai** → Sign Up (free tier)
2. Get your **Public API Key** from Dashboard → Settings

### 2.4 Google AI Studio (Gemini API)
1. Go to **https://aistudio.google.com**
2. Click **Get API Key** → Create API Key
3. Copy your **Gemini API Key**

---

## 3. Project Installation

### 3.1 Navigate to the Project
Open PowerShell and run:
```powershell
cd "C:\Users\sidhr\OneDrive\Desktop\himanshu\60-day-claude-challenge"
```

### 3.2 Install Node.js Dependencies
Once Node.js is installed:
```powershell
npm install
```
This reads `package.json` and installs all listed packages into `node_modules/`.

### 3.3 Set Up Environment Variables
1. Look for the file `.env.local` in the project root.
2. Open it and fill in all the values from your accounts above.
3. **Never commit this file to GitHub.** It is already in `.gitignore`.

### 3.4 Run the Development Server
```powershell
npm run dev
```
Open your browser at **http://localhost:3000**. You should see the app running.

### 3.5 Install shadcn/ui Components
```powershell
npx shadcn@latest add button
npx shadcn@latest add sidebar
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add dialog
npx shadcn@latest add badge
npx shadcn@latest add avatar
npx shadcn@latest add tooltip
npx shadcn@latest add dropdown-menu
npx shadcn@latest add separator
```

---

## 4. Supabase Database Setup

After creating your Supabase project, run these SQL scripts in the **Supabase SQL Editor**:

### Step 1 — Create Tables
```sql
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE public.interviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recruiter_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    job_role TEXT NOT NULL CHECK (CHAR_LENGTH(job_role) > 0),
    job_description TEXT NOT NULL CHECK (CHAR_LENGTH(job_description) > 0),
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);
CREATE INDEX idx_interviews_recruiter ON public.interviews(recruiter_id);

CREATE TABLE public.candidate_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    interview_id UUID NOT NULL REFERENCES public.interviews(id) ON DELETE CASCADE,
    candidate_name TEXT NOT NULL CHECK (CHAR_LENGTH(candidate_name) > 0),
    candidate_email TEXT NOT NULL CHECK (CHAR_LENGTH(candidate_email) > 0),
    resume_text TEXT NOT NULL,
    vapi_call_id TEXT UNIQUE,
    overall_score INTEGER CHECK (overall_score >= 0 AND overall_score <= 100),
    strengths JSONB DEFAULT '[]'::jsonb NOT NULL,
    weaknesses JSONB DEFAULT '[]'::jsonb NOT NULL,
    suggestions TEXT,
    transcript JSONB DEFAULT '[]'::jsonb NOT NULL,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);
CREATE INDEX idx_submissions_interview ON public.candidate_submissions(interview_id);
```

### Step 2 — Profile Auto-Sync Trigger
```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (
        new.id,
        new.email,
        COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', 'Recruiter')
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### Step 3 — Enable Row Level Security
```sql
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow recruiters to view own profile"
ON public.profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Allow recruiters to edit own profile"
ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Allow public read access to interviews"
ON public.interviews FOR SELECT USING (true);

CREATE POLICY "Allow owners to manage interviews"
ON public.interviews FOR ALL USING (auth.uid() = recruiter_id);

CREATE POLICY "Allow public to submit candidate registration"
ON public.candidate_submissions FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow recruiters to view submissions under their interviews"
ON public.candidate_submissions FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.interviews
        WHERE public.interviews.id = public.candidate_submissions.interview_id
        AND public.interviews.recruiter_id = auth.uid()
    )
);
```

### Step 4 — Enable Google OAuth in Supabase
1. Go to **Supabase Dashboard → Authentication → Providers**
2. Find **Google** and enable it
3. Paste your **Google Client ID** and **Client Secret** from Google Cloud Console
4. Set the **Site URL** to `http://localhost:3000` in **Authentication → URL Configuration**
5. Add `http://localhost:3000/auth/callback` to **Redirect URLs**

---

## 5. Verification Checklist

- [ ] `npm run dev` starts without errors
- [ ] Browser shows the app at `http://localhost:3000`
- [ ] Navigating to `/dashboard` redirects to `/auth`
- [ ] Clicking "Sign in with Google" opens Google sign-in
- [ ] After Google sign-in, user is redirected to dashboard
- [ ] Supabase dashboard shows a new row in the `profiles` table

---

## 6. Troubleshooting

| Issue | Solution |
|-------|----------|
| `node` not recognized | Restart PowerShell after installing Node.js |
| `npm install` fails | Delete `node_modules/` folder and try again |
| Auth redirect loop | Check Supabase Site URL and Redirect URLs match exactly |
| Google OAuth error | Verify Client ID/Secret and redirect URI in Google Cloud Console |
| Tailwind styles not loading | Ensure `globals.css` imports are correct in `layout.js` |
