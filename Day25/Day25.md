# 🦈 Day 25 — AI Shark Tank Simulator

> **60-Day Claude Challenge · Day 25 of 60**

---

## 📌 Project Overview

A fully interactive, production-quality **AI Shark Tank Simulator** built as a single self-contained HTML file — no backend, no dependencies beyond a CDN-loaded PDF library. Users pitch their startup idea to 4 distinct AI judge personas and receive scoring, investment decisions, valuations, and real-looking feedback.

---

## 🚀 Live Features

### 1. 🎯 Pitch Input Form
- **Startup Name** — Your company's identity
- **Problem Statement** — The pain point you're solving
- **Solution** — Your unique approach
- **Revenue Model** — How you make money
- **Target Audience** — Who you're building for
- **Funding Ask + Equity %** — What you want from the sharks

### 2. 🦈 4 AI Judge Personas

| Judge | Persona | Focus Area |
|-------|---------|------------|
| 🏙️ Marcus Chen | Venture Capitalist | Market size & scalability |
| ⚡ Priya Sharma | Serial Founder | Execution & team |
| 🛍️ Jordan Lee | Consumer Expert | Usefulness & UX |
| 💎 Sofia Ruiz | Angel Investor | Profitability & exit |

Each judge has a distinct personality that drives their questions, reactions, and final verdict.

### 3. 🎤 Pitch Round (Q&A)
- Each judge asks **2 contextual questions** dynamically generated from your pitch content
- Questions drawn from a personality-specific question bank (20+ unique questions)
- User can **answer each question** to boost their score
- Judges **react dynamically** with a typewriter-animated response unique to their persona
- Answers are optional — skipping any lowers the score bonus

### 4. 📊 Scoring System (out of 100)

| Category | What It Measures |
|----------|-----------------|
| 🌍 Market Potential | TAM signals, scalability keywords, audience size |
| 💡 Innovation | AI/ML/novel tech, unique methodology |
| 💼 Business Model | Revenue clarity, subscription/recurring signals |
| ⚡ Execution | Traction, team, MVP evidence in pitch text |
| 💰 Investment Worthiness | Ask size, equity fairness, financial structure |

Answer bonus: Up to **+20 points** added for answering all judge questions.

### 5. 💼 Investment Decision Engine

| Decision | Trigger |
|----------|---------|
| 🤝 **INVEST** | Score ≥ 80 (or ≥ 65 with 60% probability) |
| 🏢 **ACQUIRE** | Score 50–65 |
| ⏳ **COME BACK LATER** | Score 50–65 (alternate outcome) |
| 🚫 **REJECT** | Score < 50 |

Each decision includes:
- **Implied Valuation** — Based on ask amount ÷ equity %, adjusted by score
- **Offer Amount** — What the sharks counter-offer
- **Final Reasoning** — 3–4 sentence narrative explanation
- **Individual Judge Verdicts** — One verdict quote per judge

### 6. 🎁 Bonus Features
- 🎉 **Confetti Animation** — Fires on INVEST or ACQUIRE decision (120 particles, multiple shapes/colors)
- 📄 **PDF Report Download** — Full pitch report with scores, financials, and reasoning via html2pdf.js
- 🏆 **Leaderboard** — Persisted in `localStorage`, top 20 startups by score with rank medals
- 📤 **Share Result** — Generates a formatted shareable text block, one-click copy to clipboard
- 🔄 **Pitch Again** — Reset and start fresh without page reload

---

## 🎨 Design System

| Property | Value |
|----------|-------|
| Theme | Ultra-dark navy (`#050a14`) with blue-gold accents |
| Primary Font | Inter (Google Fonts) |
| Display Font | Space Grotesk (headings, numbers) |
| Accent Colors | Cyan `#0ea5e9`, Gold `#f59e0b`, Green `#10b981`, Purple `#8b5cf6` |
| Animations | CSS keyframe grid scroll, confetti, typewriter text, score bar fills, modal pops |
| Cards | Glassmorphism-lite with glow-on-hover borders |
| Responsive | Full mobile/tablet support via CSS Grid breakpoints |

### UI Components Built
- Animated grid background with floating dot pattern
- Gradient header title with drop shadow glow
- Step progress indicator (3-step flow tracker)
- Judge cards with unique color schemes and glow effects
- Q&A cards with per-judge color coding
- Typewriter reaction text with blinking cursor
- Animated score bars with glow fills
- Decision badge with color-coded pulsing animation
- Confetti engine (circles, squares, triangles)
- Share text modal with backdrop blur
- PDF printable layout (hidden div, separate styling)
- Leaderboard with medal ranks (🥇🥈🥉)

---

## 🗂️ File Structure

```
Day25/
├── shark_tank_simulator.html   # ← Complete simulator (single file)
└── Day25.md                    # ← This documentation
```

---

## 🛠️ Technical Implementation

- **Zero backend** — 100% client-side JavaScript
- **Zero framework** — Vanilla JS + CSS only
- **Single CDN dependency** — `html2pdf.bundle.min.js` (for PDF export)
- **Persistence** — `localStorage` for leaderboard data
- **AI scoring** — Keyword analysis engine scoring 5 dimensions from pitch text
- **Dynamic Q&A** — Contextual question injection using pitch field values
- **Typewriter effect** — Custom character-by-character animation with cursor
- **PDF generation** — Separate hidden printable DOM with white-background styling

---

## 💡 What I Learned / Built Today

1. **Persona-driven AI simulation** — Creating believable judge personalities without an actual LLM by using curated question banks and reaction libraries mapped to archetypes
2. **Score enrichment via user interaction** — The answer bonus system rewards engagement and makes the experience feel responsive to what the user types
3. **PDF from HTML** — Using `html2pdf.js` to render a hidden, separately styled div as a clean PDF without affecting the main dark-theme UI
4. **Confetti engine from scratch** — Pure CSS animations with randomized positioning, sizes, shapes, and fall durations
5. **Leaderboard persistence** — `localStorage` as a lightweight scoreboard across sessions

---

## 🔮 Possible Enhancements (Future Days)
- Real LLM integration (OpenAI/Gemini API) for truly dynamic judge responses
- Voice pitch input with Web Speech API
- Multi-round negotiation (counter-offers back and forth)
- Animated judge avatars / lip-sync effects
- Social sharing with OG image generation
- Firebase leaderboard for cross-device competition

---

*Built on Day 25 of the 60-Day Claude AI Challenge* 🦈
