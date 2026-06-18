# Day 17: Build an AI Vehicle Cost & Fuel Analysis Dashboard

## 📌 Project Overview

Transform raw vehicle CSV data into an interactive, high-performance, single-file HTML dashboard using data analysis concepts. The goal is to analyze vehicle cost, fuel efficiency, emission data, and the specific dynamics of the **E85 Paradox** across multiple fuel types (Petrol, Diesel, CNG, EV, E85).

---

## 🛠️ Requirements & Technical Specs

### 1. User & Vehicle Configuration

- **Vehicle:** [YOUR VEHICLE MODEL]
- **Fuel Type:** [Petrol/Diesel/CNG/E85/EV]
- **Usage:** [City/Highway/Mixed/Fleet]
- **Monthly Kilometers:** [e.g., 1000]
- **Car Age:** [e.g., 3 yrs]

### 2. Core Metrics & Computations (Grouped by `Fuel_Type`)

* **Avg Cost/km:** `Fuel_Cost_INR ÷ Distance_km`
- **Avg CO₂/km:** `CO2_emitted_kg ÷ Distance_km`
- **Avg Maintenance/km:** `Maintenance_Cost_INR ÷ Distance_km`
- **Avg Refuel/Recharge Time:** Based on `Refuel_Recharge_time_min`
- **Age Bucket Analysis:** Group data into *New (0-2y)*, *Mid-life (3-5y)*, *Aged (6-9y)*, and *Old (10+y)* to map running costs against vehicle age.
- **The E85 Paradox:** - `Pump Saving %` = `((Petrol_price - E85_price) / Petrol_price) × 100`
  - `Running Penalty %` = `((E85_cpkm - Petrol_cpkm) / Petrol_cpkm) × 100`
  - `Break-even Price` = `(E85_mileage ÷ Petrol_mileage) × Petrol_price`
- **E85 Score (Out of 10):** Weighted by Cost (4pt), CO₂ (3pt), Refuel (2pt), and Maintenance (1pt).

---

## 🎨 UI & UX Design

- **Theme:** Dark navy (`#0a0f1e`) with sleek **Glassmorphism** styling.
- **Color Coding:** - `E85` ➔ Amber
  - `Petrol` ➔ Blue
  - `Diesel` ➔ Grey
  - `CNG` ➔ Green
  - `EV` ➔ Purple
- **Constraints:** Pure HTML/CSS/JS, **zero external CDNs**, pure **SVG-driven charts** (Bar, Doughnut, Line, and Animated Gauge), and fully responsive (375px–1440px).

---

## 🚀 Deliverables

- [ ] Process raw vehicle CSV data via Claude / Data Analyst workflow.
- [ ] Generate a production-ready, interactive `index.html` dashboard.
- [ ] Commit codebase to GitHub.
- [ ] Share insights on LinkedIn.
