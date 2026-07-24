# ENVIRONMENT.md — Environment Variables & Configuration Guide

## AI-Powered Interview Taker & Feedback System
**Day 53 — All Environment Variables, Tools, and Configuration**

---

## 1. What is an Environment Variable?

An environment variable is a **secret value** stored outside your source code. Instead of writing your API keys directly in the code (which would expose them to anyone who sees your repository), you store them in a special file called `.env.local` that Git ignores.

Think of it like a locked drawer — your app knows where the key is kept, but it's never left out in the open.

---

## 2. The `.env.local` File

Create this file in the **root of the project** (same level as `package.json`):

```
60-day-claude-challenge/
├── .env.local     ← create this file here
├── package.json
├── next.config.mjs
└── ...
```

### Complete `.env.local` Template

Copy this into your `.env.local` file and fill in the real values:

```bash
# ============================================================
# SUPABASE — Database & Authentication
# ============================================================
# Found in: Supabase Dashboard → Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Service Role Key — NEVER expose in browser code (server-side only)
# Found in: Supabase Dashboard → Settings → API → service_role key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ============================================================
# GOOGLE GEMINI AI — Resume Parsing & Feedback
# ============================================================
# Found in: https://aistudio.google.com → Get API Key
GEMINI_API_KEY=AIzaSy...

# ============================================================
# VAPI — Voice Interview Engine
# ============================================================
# Found in: https://vapi.ai → Dashboard → Settings → API Keys
NEXT_PUBLIC_VAPI_PUBLIC_KEY=vapi_pub_...

# Webhook secret for validating Vapi callback POST requests
# Found in: Vapi Dashboard → Webhooks → create a secret
VAPI_WEBHOOK_SECRET=your_vapi_webhook_secret_here

# ============================================================
# APP CONFIGURATION
# ============================================================
# Your local development URL — do NOT change this for local development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 3. Variable Reference Table

| Variable | Required | Used Where | Description |
|----------|----------|------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Browser + Server | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Browser + Server | Public anonymous key for client-side queries |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | Server only | Admin key that bypasses RLS (used in webhook handlers) |
| `GEMINI_API_KEY` | ✅ | Server only | Gemini 1.5 Flash API key for AI operations |
| `NEXT_PUBLIC_VAPI_PUBLIC_KEY` | ✅ | Browser | Vapi SDK public key for starting voice calls |
| `VAPI_WEBHOOK_SECRET` | ✅ | Server only | Secret token to validate Vapi webhook requests |
| `NEXT_PUBLIC_APP_URL` | ✅ | Browser + Server | Base URL of the app (for building shareable links) |

> **🔒 Security Rule**: Any variable starting with `NEXT_PUBLIC_` is visible in the browser. NEVER put sensitive secrets like `SERVICE_ROLE_KEY` or `GEMINI_API_KEY` with the `NEXT_PUBLIC_` prefix!

---

## 4. Where to Find Each Key

### Supabase Keys
1. Log in to **https://supabase.com/dashboard**
2. Select your project
3. Click **Settings** (gear icon in left sidebar)
4. Click **API**
5. Under **Project URL** → copy the URL
6. Under **Project API Keys**:
   - `anon/public` → this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` (click "Reveal") → this is your `SUPABASE_SERVICE_ROLE_KEY`

### Gemini API Key
1. Go to **https://aistudio.google.com**
2. Sign in with your Google account
3. Click **Get API key** in the top right
4. Click **Create API key** → **Create API key in new project**
5. Copy the key immediately (it's shown only once)

### Vapi Public Key
1. Go to **https://vapi.ai** and log in
2. Click **Dashboard** in the top menu
3. Click **Settings** (gear icon)
4. Under **API Keys**, copy the **Public Key**

### Vapi Webhook Secret
1. In the Vapi Dashboard, go to **Settings → Webhooks**
2. Create a new webhook pointing to: `http://localhost:3000/api/vapi-webhook` (for dev)
3. Set a webhook secret and save it

---

## 5. Installed Tools & Their Purpose

| Tool | Version | Purpose |
|------|---------|---------|
| **Node.js** | v20+ LTS | JavaScript runtime environment |
| **npm** | v10+ | Package manager for installing libraries |
| **Next.js** | 15.x | React framework with App Router, API routes |
| **React** | 19.x | UI component library |
| **Tailwind CSS** | v4 | Utility-first styling framework |
| **shadcn/ui** | latest | Headless UI component library built on Radix UI |
| **@supabase/supabase-js** | latest | Supabase JavaScript client |
| **@vapi-ai/web** | latest | Vapi Web SDK for browser-based voice calls |
| **@google/generative-ai** | latest | Gemini AI SDK for text generation |
| **pdf-parse** | latest | Server-side PDF text extraction |
| **sonner** | latest | Toast notification library |
| **lucide-react** | latest | Icon library |

---

## 6. Configuration Files

### `next.config.mjs`
Controls Next.js behavior. Key settings:
- Image domains for avatars from Google OAuth
- Strict mode enabled

### `tailwind.config.js`
Configures Tailwind CSS v4:
- Custom color tokens
- Font configurations
- Dark mode setup

### `.gitignore`
Prevents sensitive files from being committed:
```
.env.local
.env*.local
node_modules/
.next/
```

---

## 7. Production Environment (Netlify)

When deploying to Netlify, you must add all environment variables through the Netlify dashboard:
1. Go to **Netlify Dashboard → Your Site → Site Configuration → Environment Variables**
2. Add each variable from `.env.local` with its production value
3. Change `NEXT_PUBLIC_APP_URL` to your Netlify domain (e.g., `https://ai-interview.netlify.app`)
4. Update Vapi webhook URL to your production domain
5. Add your production domain to Supabase Redirect URLs
