# Day 9: Building & Enhancing an AI Nutrition Analytics App (NutriScope)

## Overview

Today's challenge focused on the power of **iterative AI application development**. Instead of trying to build a massive, complex application with a single prompt—which often leads to bugs and incomplete logic—I practiced building a clean Minimum Viable Product (MVP) first and then incrementally layering on advanced features using a secondary enhancement prompt.

---

## Development Phases

### Phase 1: The NutriScope MVP

Built a complete, self-contained single-file HTML application using a modern, dark-themed SaaS UI.

- **Core Features:** User profiling (age, weight, height, activity, dietary preferences), an interactive food logging table with a 20-item starter food database, macro/micro tracking, and visual breakdown charts utilizing Chart.js.
- **Screenshot:**
  ![NutriScope MVP](./mvp_screenshot.png) _(Note: Replace with your actual MVP screenshot filename)_

### Phase 2: The Enhanced Version

Using a clean context loop, I expanded the core application to transition it into a feature-rich analytics engine.

- **Added Features:** CSV data upload, an expanded 60-food database, advanced micronutrient metrics, a 2-day meal planner generator, health risk analysis, and structured medical/educational disclaimers.
- **Screenshot:**
  ![NutriScope Enhanced](./enhanced_screenshot.png) _(Note: Replace with your actual enhanced screenshot filename)_

---

## Comparison & Learnings

| Feature Layer     | Phase 1 (MVP)                    | Phase 2 (Enhanced)                         |
| :---------------- | :------------------------------- | :----------------------------------------- |
| **Database Size** | 20 Common Foods                  | 60+ Diverse Foods                          |
| **Data Input**    | Manual Logging Only              | Manual Logging + CSV Upload                |
| **Insights**      | Basic Targets & Top Deficiencies | 2-Day Meal Planner & Risk Analysis         |
| **Compliance**    | Clean UI Dashboard               | Educational Disclaimer & Nutrition Sources |

### Key Takeaways

1. **Context Management is Key:** Starting small ensures the foundation of the app (the core state, calculations, and UI styling) is incredibly stable before scaling up the feature set.
2. **Iterative Refinement over Single-Shot Prompting:** Modifying and layering features sequentially with specific prompt constraints keeps the generated code modular and prevents AI "forgetfulness" or truncated code outputs.
3. **Vanilla Portability:** Packing heavy logic, dynamic charts (Chart.js), and clean state management into a single mobile-responsive HTML file makes deploying and testing micro-apps instantly seamless.
