# Day 28: Hospital Admission Readiness Simulator

## Project Overview

An interactive healthcare workflow simulation built as a single-file HTML application using Tailwind CSS and Vanilla JavaScript. The user acts as a Hospital Admission Coordinator to evaluate and process patient admissions based on prior authorization, clinical documentation, and insurance verification.

## Core Features

- **Task-First Interface:** Direct access to the admission setup without pre-loaded dashboards.
- **Dynamic Rule Triggers:** Automatically displays the CMS 2-Midnight Rule for Observation status and InterQual/Milliman thresholds for Acute MI/CHF diagnoses.
- **Weighted Readiness Scoring:** - Prior Authorization (PA) Status: 25%
  - Clinical Documentation: 20%
  - Physician Orders: 20%
  - Insurance Verification: 15%
  - Consent Forms: 10%
  - Bed Assignment: 10%
- **Interactive Workflow Actions:** Interactive buttons to resolve pending/denied PAs, assign beds, verify insurance, and upload missing documentation to drive the readiness score above 90% for final admission approval.
- **Milestone Timeline & Governance Snapshot:** Displays real-time progress through healthcare compliance milestones and industry benchmark metrics upon reaching $\ge 75\%$ readiness.

## Tech Stack

- HTML5
- Tailwind CSS (via CDN)
- Vanilla JavaScript (ES6+)
