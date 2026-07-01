# Day 30: Supply Chain Builder

## Objective
Build a complete single-file HTML app named 'Supply Chain Builder'. Design it so a complete beginner can understand supply chains. Before every decision, explain what the concept means, why it matters, and how it affects a business.

## Requirements
* Output ONLY one HTML file.
* React via CDN + Babel JSX.
* Plain HTML, CSS, and JavaScript only.
* No Tailwind, npm, backend, APIs, images, or external assets.
* Runs offline by opening the HTML file.
* No placeholders or incomplete features.

## Features & Flow
1. **Welcome Screen:** Introduces supply chains in simple language.
2. **Company Generation:** Randomizes industry, products, countries served, and demand level.
3. **Interactive Decisions:** Guides the player through building their supply chain by choosing:
   * Number of suppliers (single or multiple)
   * Factory location (local or offshore)
   * Warehouse strategy (centralized or decentralized)
   * Transportation method (road, sea, air)
   * Inventory strategy (JIT, balanced, high buffer)
4. **Educational Concept Boxes:** After every choice, explains the trade-offs in plain English.
5. **Live Business Metrics:** Displays metrics that update after each decision: Cost Efficiency, Delivery Speed, Resilience, Customer Satisfaction, Sustainability.
6. **Results Dashboard:** Generates an Overall Supply Chain Score (0-100), identifies strengths/weaknesses, and gives three practical improvements.

## Design
* Premium enterprise dashboard aesthetic.
* Dark theme.
* Responsive, using CSS Grid and Flexbox.
* Smooth transitions and CSS animations.
* Rounded cards with hover effects.
* Animated progress bars and radial score gauge.
* Fully state-driven using React Hooks.
