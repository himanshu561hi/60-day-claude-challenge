# Day 11 — ATS Resume Optimizer & Generator

## 📌 Objective
Build a client-side ATS Resume Optimizer that takes an existing resume and a target job description, then produces:

1. **ATS Match Score** — weighted algorithm based on keyword density, skill overlap, formatting, and structure.
2. **Gap Analysis** — missing keywords, missing skills, and actionable improvement opportunities.
3. **Optimized Resume** — fully restructured and rephrased output ready to copy into Word, Google Docs, FlowCV, Overleaf, or Canva.

## 🔒 Rules
- Never invents experience, projects, employers, certifications, dates, metrics, or skills.
- Only optimizes, reorganizes, and rephrases existing content.
- Uses relevant JD keywords naturally.
- Keeps ATS-friendly formatting.

## ✨ Features
- Dark glassmorphism UI with animated mesh background
- Paste-in inputs for Resume and Job Description
- Client-side NLP keyword & skill extraction engine
- Visual ATS score ring with animated counter
- Keyword match visualization (matched ✓ vs missing ✗ tags)
- Gap analysis cards: Missing Keywords, Missing Skills, Improvements
- Full optimized resume output in standard professional format
- Copy to clipboard, download as .txt, print/PDF export
- Progress stepper UI
- Fully responsive design
- Print-optimized CSS

## 🛠️ Tech Stack
- **HTML5** — Semantic structure
- **CSS3** — Custom properties, glassmorphism, animations, grid
- **Vanilla JavaScript** — Resume parsing, keyword extraction, ATS scoring engine
- **Google Fonts** — Inter, JetBrains Mono

## 📂 Output Format
```
# FULL NAME
Phone | Email | LinkedIn | GitHub

## PROFESSIONAL SUMMARY
## SKILLS
## EXPERIENCE
## PROJECTS
## EDUCATION
## CERTIFICATIONS
## ACHIEVEMENTS
```

## 🚀 How to Use
1. Open `index.html` in any browser
2. Paste your existing resume in the left panel
3. Paste the target job description in the right panel
4. Click "🚀 Optimize Resume"
5. Review your ATS score, gap analysis, and optimized resume
6. Copy, download, or print the result
