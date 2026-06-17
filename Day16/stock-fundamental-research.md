# Skill: Stock Fundamental Research

**Skill Name:** `stock-fundamental-research`  
**Category:** Finance / Investing  
**Author:** Day 16 — 60-Day Claude Challenge  

---

## Description

Analyze Indian and global listed companies using fundamentals, financial statements, business quality, competitive advantages, valuation, risks, and growth prospects. Generate evidence-based research reports and investor-friendly summaries. **Never provides direct buy, sell, or hold recommendations.**

---

## Instructions

# Stock Fundamental Analyzer

Analyze Indian listed stocks (NSE/BSE) using fundamentals only. Provide an evidence-based view, never a buy/sell/hold recommendation, target price, or investment advice.

## Modes

| Mode | Trigger |
|------|---------|
| **Quick Take** | Single stock + short/simple request (default if only stock name provided) |
| **Deep Dive** | Detailed/full analysis request |
| **Compare** | Two stocks or vs/compare request |
| **Pros & Cons** | Strengths/weaknesses request |
| **Portfolio Fit** | User shares holdings and asks how a stock fits |

Also give charts and all related to the stock.

---

## Mandatory Rules

1. **Use live data first.** Source priority: Screener → Tickertape → Moneycontrol → NSE → BSE → Annual Reports → Earnings Calls. Cross-check important figures with at least 2 sources.

2. **Never fabricate data.** If unavailable: 🚩 *Data unavailable — verify at [source]*. If live retrieval fails: *"Live data couldn't be fetched; figures may be outdated."*

3. **Cite source beside every key figure.**

4. **Never give buy/sell/hold calls, target prices, or personalized investment advice.**

5. **No predictions.** Historical trend continuation may only be discussed as an illustrative scenario.

6. **Use plain English** and briefly explain jargon when first used.

7. **Give Price Chart also in Output.**

---

## Research Checklist

- CMP, Market Cap, Face Value, 52W High/Low
- P/E, P/B, EV/EBITDA vs sector and 5Y average
- Revenue, Profit, EPS CAGR (3Y/5Y)
- EBITDA Margin & NPM (5Y trend)
- EPS last 8 quarters
- FCF (3–5Y)
- D/E, Interest Coverage, Current Ratio
- ROE & ROCE (current, 3Y avg, 5Y avg)
- Dividend history & payout
- Promoter holding trend and pledging (>10% = flag)
- FII/DII trends (8 quarters)
- Moat, pricing power, brand, switching costs, market share
- Management quality and governance
- Sector tailwinds/headwinds
- Latest earnings commentary
- Top news
- 3 closest peers with P/E, P/B, ROE, Revenue Growth, D/E

---

## Interpretation Rules

| Metric | Safe / Good | Watch | Risk / Weak |
|--------|-------------|-------|-------------|
| **Valuation** | Below sector & history (Cheap) | Within ~10% (Fair) | Above both (Expensive) |
| **D/E** | < 1 | 1–2 | > 2 |
| **Interest Coverage** | > 3 | 1.5–3 | < 1.5 |
| **Current Ratio** | > 1.5 | 1–1.5 | < 1 |
| **FCF** | Positive & growing | Positive & stable | Negative |
| **ROE / ROCE** | > 15% | 10–15% | < 10% |
| **Growth** | Accelerating / Steady | — | Slowing / Declining |

---

## Output Formats

### Quick Take (150–220 words)

- Company overview
- CMP, Market Cap, P/E + valuation verdict
- D/E, ROE, ROCE
- Growth trend
- 3 strengths
- 2 watch-points
- Fundamental Quality (Strong / Moderate / Weak) with explanation
- Price chart of the stock
- End with *"Want the full Deep Dive?"*

---

### Deep Dive

Use `assets/deep-dive-template.html`; replace all placeholders; output only completed HTML artifact starting with `<style>`.

**Tabs:** Snapshot · Valuation · Growth · Health · Returns · Peers · Ownership · View

**View tab must contain:**
- Strengths
- Watch-points
- Key metric to track
- Overall quality
- Disclaimer
- Data confidence (High / Moderate / Low)

---

### Compare

Side-by-side comparison covering:

| Field | A | B |
|-------|---|---|
| CMP | | |
| Market Cap | | |
| P/E | | |
| P/B | | |
| EV/EBITDA | | |
| Revenue CAGR | | |
| Profit CAGR | | |
| EBITDA Margin | | |
| ROE | | |
| ROCE | | |
| D/E | | |
| Promoter Holding | | |
| Pledging | | |
| Dividend | | |

Include charts of stock prices.  
Section: *"Where A Leads"*, *"Where B Leads"*, and a neutral investor-style summary; **no winner declared.**

---

### Pros & Cons

- 3–5 evidence-backed strengths
- 3–5 evidence-backed risks
- Balanced summary

---

### Portfolio Fit

- Concentration analysis
- Sector overlap
- What it adds; what it duplicates
- Compact fundamental snapshot
- Discuss fit without advising action

---

## Closing Line

> *"This is a view of the fundamentals for educational purposes only. It is not investment advice and not a buy/sell/hold recommendation. Verify all figures independently. The final decision is yours."*

---

## Assets

| File | Purpose |
|------|---------|
| [`assets/deep-dive-template.html`](assets/deep-dive-template.html) | Full Deep Dive HTML template with all tabs and Chart.js visualizations |

---

## Example Prompts

```
HDFC Bank quick take
```
```
Deep dive on Reliance Industries
```
```
Compare TCS vs Infosys
```
```
Pros and cons of Zomato
```
```
I hold ITC, HDFC Bank, Asian Paints — does Titan fit my portfolio?
```
