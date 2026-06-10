# Day 8 — 🌍 Personal Environmental Health Analyzer

> **#60DaysOfAI · Day 8/60**
> Built with: Claude AI + Live AQI Data + Chart.js

---

## What I Built

A fully interactive **Personal Environmental Health Analyzer** — a dashboard that automatically fetches real-time AQI, PM2.5, PM10, and water quality data for your city and delivers a personalized environmental health report card.

---

## The Problem

Most people have no idea how the air they breathe and the water they use every day is silently affecting their lungs, skin, hair, and sleep — until it's too late. Air quality apps show numbers. But what do those numbers _mean_ for your body?

This tool bridges that gap.

---

## Features Built

### 📊 Dashboard Tab

- 6 live metric cards: Your City AQI, Average AQI, Highest/Lowest AQI city, cities analyzed, environmental health score
- AQI comparison bar chart across 10 major Indian cities
- PM2.5 & PM10 comparison charts
- AQI category distribution donut chart
- City ranking chart (cleanest → most polluted)
- Executive summary paragraph auto-generated from data

### 🏙️ Cities Tab

- Interactive cards for all 10 cities with AQI, PM2.5, PM10, water quality score
- Filters: by AQI category, sort order, pollutant focus
- Visual progress bars colored by AQI level
- "Your City" highlight marker

### 🫀 Health Impact Tab

- City selector to explore any city's health profile
- **Air quality impact** on: lungs, sleep, energy levels, exercise performance, long-term health
- **Water quality impact** on: hair fall, hair dryness, scalp health, skin dryness, acne, sensitive skin
- Risk indicators: 🟢 Low · 🟡 Moderate · 🔴 High
- Dynamic content changes with city selection

### 📋 Report Card Tab

- Environmental Health Score (0–100) with visual score circle
- Breakdown: Air Quality Score, Water Quality Score, Overall Score
- Letter grades: Air Quality, Water Quality, Hair Risk, Skin Risk
- Score breakdown bars showing PM2.5, PM10, and Water TDS contributions

### 💡 Insights Tab

- Top 3 cleanest cities with reasoning
- Top 3 most polluted cities with root causes
- Most surprising observations (e.g., Delhi cleaner than Varanasi today)
- Biggest anomaly detection
- Personalized recommendations: daily actions, outdoor activity guidance, hair care, skin care, water improvement

---

## Data Sources

| Source                          | What it provides                             |
| ------------------------------- | -------------------------------------------- |
| [aqi.in](https://www.aqi.in)    | Real-time AQI, PM2.5, PM10 for Indian cities |
| [IQAir](https://www.iqair.com)  | City-level AQI and health benchmarks         |
| [aqicn.org](https://aqicn.org)  | Multi-station monitoring data                |
| IRE Journals (2025)             | Varanasi Ganga water quality research        |
| Springer Env. Monitoring (2025) | TDS, hardness, coliform data for Ganga       |

---

## Key Findings — Varanasi (June 9, 2026)

| Metric                     | Value        | Status             |
| -------------------------- | ------------ | ------------------ |
| AQI (US Standard)          | 159          | 🔴 Poor            |
| PM2.5                      | 71 µg/m³     | 🔴 10.5× WHO limit |
| PM10                       | 84 µg/m³     | 🔴 Above WHO       |
| Water TDS                  | 202–301 mg/L | 🔴 Exceeds WHO     |
| Global Pollution Rank      | #15          | 🔴 Severe          |
| Environmental Health Score | 34/100       | 🔴 Grade D         |

**Most surprising insight:** On June 8–9, 2026, Delhi's AQI (74) was actually _lower_ than Varanasi (159) — unusual for a city historically among the world's most polluted. Pre-monsoon weather patterns and rains temporarily cleaned Delhi's air while the Indo-Gangetic Plain geography continues to trap pollutants in Varanasi.

---

## Cities Analyzed

| City         | AQI     | Category        |
| ------------ | ------- | --------------- |
| Bengaluru    | 45      | 🟢 Good         |
| Chennai      | 53      | 🟢 Satisfactory |
| Mumbai       | 58      | 🟢 Satisfactory |
| Pune         | 58      | 🟢 Satisfactory |
| Hyderabad    | 71      | 🟢 Satisfactory |
| Delhi        | 74      | 🟡 Satisfactory |
| Kolkata      | 138     | 🟡 Moderate     |
| Jaipur       | 153     | 🟠 Moderate     |
| **Varanasi** | **159** | **🔴 Poor**     |
| Lucknow      | 163     | 🔴 Poor         |

---

## Tech Stack

- **Claude AI** — data analysis, health insights generation, and full dashboard code
- **Chart.js 4.4.1** — interactive bar, donut, and ranking charts
- **Live web search** — real-time AQI data fetched during build
- **HTML / CSS / JavaScript** — single-file responsive dashboard
- **Tabler Icons** — icon library for UI elements
- **CSS variables** — automatic dark/light mode theming

---

## Prompt Design Highlights

This project used a highly structured mega-prompt with explicit sections for:

- Data rules (search if no dataset provided)
- Analysis requirements (cleanest city, anomalies, executive summary)
- Dashboard specifications (tabs, filters, charts, cards)
- Health analysis schema (air + water × body systems)
- Report card format (scores + letter grades)
- Design constraints (dark theme, mobile responsive, LinkedIn-shareable)

---

## What I Learned

1. **Claude can act as a full-stack analyst + developer simultaneously** — fetching real data, cleaning it, generating insights, and building the UI in one pass.
2. **Structured prompts with clear output contracts produce dramatically better results** than open-ended requests.
3. **Environmental data storytelling matters** — raw AQI numbers mean nothing; connecting them to hair fall, sleep quality, and skin health makes the data _personal_.
4. **Combining multiple AI roles** (senior analyst + UX designer + frontend dev) in a single prompt unlocks multi-disciplinary outputs that would normally require a team.

---

## Files

- `personal_environmental_health_analyzer.html` — Full interactive dashboard (rendered as Claude Artifact)
- `day8.md` — This project documentation

---

_Part of my #60DaysOfAI challenge — building one AI-powered project every day for 60 days._

**Tags:** `#AI` `#ClaudeAI` `#AirQuality` `#EnvironmentalHealth` `#DataVisualization` `#30DaysOfAI` `#Varanasi` `#IndiaAQI` `#Dashboard` `#HealthTech`
