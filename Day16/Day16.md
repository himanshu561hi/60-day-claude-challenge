# Day 16 — Stock Fundamental Research Skill

## 🎯 Skill: `stock-fundamental-research`

A comprehensive **AI skill** for analyzing Indian (NSE/BSE) and global listed companies using fundamental analysis. Generates evidence-based, investor-friendly research reports across multiple modes — without ever providing buy/sell/hold recommendations.

---

## 📁 Files Created

| File | Description |
|------|-------------|
| [`stock-fundamental-research.md`](stock-fundamental-research.md) | Full skill definition with instructions, modes, rules, and output formats |
| [`assets/deep-dive-template.html`](assets/deep-dive-template.html) | Premium dark-mode HTML template with 8 tabs and Chart.js visualizations |

---

## 🔍 What the Skill Does

### Modes
- **Quick Take** — 150–220 word snapshot (default when just a stock name is given)
- **Deep Dive** — Full HTML report with 8 tabbed sections
- **Compare** — Side-by-side peer comparison with charts
- **Pros & Cons** — Evidence-backed strengths and risks
- **Portfolio Fit** — Concentration and overlap analysis

### Research Checklist Covers
- CMP, Market Cap, 52W High/Low, Face Value
- P/E, P/B, EV/EBITDA vs sector & 5Y average
- Revenue, Profit, EPS CAGR (3Y / 5Y)
- EBITDA Margin & Net Profit Margin trend
- FCF, D/E, Interest Coverage, Current Ratio
- ROE & ROCE (current, 3Y, 5Y averages)
- Promoter holding + pledging (>10% flagged)
- FII/DII trends (8 quarters)
- Moat, pricing power, management quality
- Latest earnings commentary & top news
- 3 closest peers comparison

---

## 🎨 Deep Dive Template Features

The [`assets/deep-dive-template.html`](assets/deep-dive-template.html) is a **premium dark-mode report** with:

- **8 Tabs:** Snapshot · Valuation · Growth · Health · Returns · Peers · Ownership · View
- **10+ Charts** via Chart.js:
  - 1Y Price History (line + gradient fill)
  - Revenue Segment Breakdown (doughnut)
  - P/E Trend vs Sector (line)
  - Annual Revenue & Net Profit (bar + line combo)
  - Quarterly EPS — last 8 quarters (bar, green/red coded)
  - EBITDA & Net Profit Margin Trend (line)
  - Free Cash Flow — 5Y (bar, green/red coded)
  - ROE vs ROCE Trend (line)
  - Ownership Doughnut (Promoter/FII/DII/Public)
  - FII/DII Trend — 8 quarters (line)
  - Peer Bubble Chart — ROE vs P/E
- **Quality Score Ring** (0–10) with animated SVG
- **Moat Progress Bars** (Brand, Pricing Power, Switching Costs, Market Share)
- **Evidence Cards** for strengths, watch-points, risks, news
- **Data Confidence Badge** (High / Moderate / Low)
- All placeholders use `{{DOUBLE_BRACE}}` syntax for easy replacement

---

## 🛡️ Guardrails

- ❌ No buy/sell/hold recommendations
- ❌ No target prices
- ❌ No personalized investment advice
- ❌ No fabricated data (flags unavailable figures)
- ✅ Source cited beside every key figure
- ✅ Jargon explained on first use
- ✅ Mandatory closing disclaimer on every output

---

## 💡 Example Prompts

```
HDFC Bank quick take
Deep dive on Reliance Industries
Compare TCS vs Infosys
Pros and cons of Zomato
I hold ITC, HDFC Bank, Asian Paints — does Titan fit my portfolio?
```
