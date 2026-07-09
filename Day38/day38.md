# Day 38 – Typing Speed Studio ⌨️

> **Challenge:** Build a premium, single-page typing speed application with real-time analytics, multiple modes, and a polished commercial UI — using only HTML, CSS, and vanilla JavaScript.

---

## 🚀 What Was Built

**Typing Speed Studio** — a fully self-contained, premium typing platform inspired by Monkeytype. No external libraries, no frameworks. Pure HTML + CSS + JS.

### Files
| File | Description |
|------|-------------|
| [`index.html`](./index.html) | Complete single-page application |
| [`day38.md`](./day38.md) | This documentation |

---

## ✨ Features

### Typing Modes
| Mode | Description |
|------|-------------|
| ⏱ **Time** | 15 / 30 / 60 / 120 second countdown |
| 📝 **Words** | 25 / 50 / 100 / 250 word targets |
| 💬 **Quote** | 25 famous quotes typed to completion |
| ✏️ **Custom** | Paste any text you want to practice |
| 🔍 **Focus** | Only the current line is visible — all others are dimmed |
| 🧘 **Zen** | No timer, no pressure, distraction-free freeform practice |

### Difficulty Levels
- **Easy** — Common vocabulary, short familiar sentences
- **Medium** — Longer passages with varied structure (default)
- **Hard** — Complex academic and philosophical prose

### Live Typing Statistics (real-time)
- **WPM** — Net (correct characters only)
- **Raw WPM** — All keystrokes including errors
- **CPM** — Characters per minute
- **Accuracy** — Percentage correct
- **Streak** — Consecutive correct characters
- **Errors** — Running mistake count
- **Timer** — Countdown / words left / elapsed
- **Progress bar** — Glowing gradient fill animation
- **Live WPM badge** — Floating in the typing card corner

### Character Highlighting
| State | Visual |
|-------|--------|
| Correct | Green |
| Incorrect | Red + background tint |
| Pending | Muted gray |
| Extra (beyond text) | Red + wavy underline |
| Cursor | Blinking — Line / Block / Underline |

---

## 📊 Analytics Dashboard (Post-Session)

After every completed session a results modal appears with full analytics.

### Hero Stats
- Net WPM · Raw WPM · Accuracy · Consistency · Completion % · Duration
- **🏆 Personal Best badge** if a new record is set

### Charts (pure SVG — no library)
- **WPM Over Time** — smooth bezier line chart sampled every second
- **Accuracy Over Time** — parallel accuracy trend line

### Deep Analytics
- **Character Breakdown** — Correct / Incorrect / Extra / Missed counts
- **Error Heatmap** — Full QWERTY keyboard, keys colored by error frequency
- **Speed Percentile** — Estimated ranking vs. general population
- **Consistency Score** — Derived from WPM standard deviation
- **Typing Rhythm** — Very Steady / Steady / Moderate / Variable / Erratic

### Achievement Badges (earned dynamically)
`Lightning Fingers` · `Speed Demon` · `On Fire` · `Taking Off` · `Diamond Accuracy` · `Sharpshooter` · `Precise` · `Metronome` · `Steady Hands` · `Zero Mistakes` · `Streak Legend` · `Personal Best` · `Zen Practitioner` · `Focused Mind`

### Performance Summary
- Session strengths identified automatically
- Weaknesses with specific actionable suggestions
- Top 3 most mistyped keys highlighted
- Personalised improvement tips based on WPM tier

---

## 🎨 Themes (5 total)

| Theme | Palette |
|-------|---------|
| 🌑 Dark | Deep navy · cyan · purple (default) |
| ☀️ Light | Clean white · sky blue |
| 🌌 Midnight | Very dark blue · indigo |
| 🌿 Forest | Dark green · lime |
| 🌊 Ocean | Deep sea · teal |

---

## ⚙️ Settings & Customization

- **Theme selector** with live colour-swatch previews
- **Font Size** — Small / Medium / Large / XL
- **Caret Style** — Line / Block / Underline
- **Sound Effects** — Web Audio API (key click · error buzz · completion fanfare)
- **Smooth Scroll** — Text scrolls upward as cursor advances
- **CPM display** — Toggle characters-per-minute stat
- **Live WPM badge** — Toggle floating in-card indicator
- **Clear History** — With confirmation dialog

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Restart current test |
| `Ctrl + P` | Pause / Resume |
| `Esc` | Open Settings (or close any open modal) |
| `H` | Open History panel (when not typing) |
| `N` | Load next text (when idle) |

---

## 💾 Local Storage (No Account Required)

All data persisted in `localStorage` automatically:
- Full session history (last 100 sessions)
- Personal bests per mode + time/word-limit combination
- All settings and preferences survive page refresh

---

## 🏗️ Technical Architecture

```
HTML
├── Header       — logo · mode pills · icon buttons
├── Main
│   ├── Config   — time/word selector + difficulty
│   ├── Stats    — 7 live metric panels
│   ├── Typing   — character renderer + hidden textarea + overlay
│   └── Controls — restart · pause · next + shortcut hints
├── Results Modal   — full analytics dashboard
├── History Panel   — slide-in session list
├── Settings Panel  — slide-in preferences
└── Toast           — notification system

CSS
├── 5 themes via CSS custom properties (--acc, --bg0, --t1, …)
├── Glassmorphism cards with backdrop-filter blur
├── Micro-animations: fade-up, pop-in, blink, pulse, error flash
├── Responsive breakpoints (680px, 400px)
└── Toggle switches, caret styles, custom scrollbars

JavaScript Modules (vanilla ES6+)
├── POOL / QUOTES / WORDS  — passage & word data
├── Engine      — state machine: idle → running → paused → finished
├── Calc        — WPM / Raw / CPM / Accuracy / Consistency / Percentile
├── UI          — character renderer, scroll, stat updater, overlay
├── Results     — SVG charts, heatmap, badges, summary generator
├── SFX         — Web Audio API sound engine
├── Themes      — theme switcher with CSS var injection
├── DB          — localStorage persistence layer
├── Hist        — history panel renderer
└── Toast       — notification manager
```

### WPM Formulas
```
Net WPM  = (correct characters ÷ 5) ÷ elapsed minutes
Raw WPM  = (total typed characters ÷ 5) ÷ elapsed minutes
Accuracy = (correct characters ÷ total typed) × 100%

All values capped: Net ≤ 250 WPM, Raw ≤ 300 WPM
```

### Consistency Formula
```
CV          = (std deviation of WPM samples) ÷ mean WPM × 100
Consistency = clamp(100 − CV × 0.5, 0, 100)
```

### SVG Chart Rendering
- Smooth cubic bezier paths drawn from first principles
- No canvas, no chart.js, no external dependency
- Gradient area fill + endpoint dot marker

---

## 🖼️ UI Design Highlights

- **Glassmorphism typing card** — glows cyan when test is active
- **Animated progress bar** — gradient fill with trailing light bloom
- **Error flash animation** — card border pulses red on mistake
- **Smooth scroll** — `translateY` transform as cursor advances lines
- **Focus Mode dimming** — non-current lines fade to 12% opacity
- **5 complete colour themes** — every token re-mapped via CSS vars
- **Slide-in panels** — settings + history with overlay backdrop
- **Staggered badge animation** — achievements pop in with spring easing
- **Fully responsive** — usable on phones, tablets, and desktops

---

## 📈 Passage Pool

| Difficulty | Count | Topics |
|------------|-------|--------|
| Easy | 10 | Daily life, nature, coffee, music, gardens, cooking |
| Medium | 12 | Philosophy, science, language, memory, printing press, habit |
| Hard | 6 | Quantum mechanics, neuroplasticity, thermodynamics, evolution |
| Quotes | 25 | Einstein, Mandela, Roosevelt, Twain, Keller, Jobs, and more |
| Word pool | 200+ | Common English words for word-count mode |

---

*Day 38 of the 60-Day Claude Challenge*
