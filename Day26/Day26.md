# Day 26: Build a Prior Authorization Workflow Simulator

## Project Overview

Build a single-file, self-contained HTML application using vanilla web technologies to visually simulate the US healthcare Prior Authorization (PA) workflow. The app must be an interactive, gamified, drag-and-drop experience that educates users on healthcare administration pathways.

* **Difficulty:** Intermediate
* **Estimated Time:** 60 minutes
* **Deliverable:** GitHub Commit/Repository URL

---

## Technical Constraints

* **Single File:** Everything must live inside a single `.html` file containing HTML, CSS, and JavaScript.
* **Vanilla Tech Only:** No frameworks (React, Vue, etc.), no build steps, and no external CDNs (Tailwind via CDN, Bootstrap, FontAwesome, etc.).
* **State Management:** Pure JavaScript memory only. Do **not** use `localStorage` or `sessionStorage`.
* **Data Layer:** Scenario data must be stored in an editable array clearly visible near the top of the script.
* **Code Quality:** Well-commented code explaining the state transitions.

---

## Core Features & Requirements

### 1. Board Architecture (Three Workflow Lanes)

* **Patient Lane:** Initial tracking, intake, and scenario assignment.
* **Provider Lane:** Medical necessity evaluation, document collection, and authorization submission.
* **Payer Lane:** Review, processing, and final decision outcome.

### 2. Interactive Gameplay

* **Drag-and-Drop:** Smooth drag-and-drop capabilities to move case files between lanes and processing stages.
* **Patient Scenarios:** Must include at least four distinct clinical situations:
  * Elective Surgery
  * MRI / Diagnostic Imaging
  * Specialty Medication
  * Inpatient Admission
* **Step-by-Step Education:** Interactive educational modal or text overlay explaining the real-world significance of each administrative milestone after a step is completed.

### 3. Payer Review & Resolution Outcomes

The simulator must handle the following standard insurance response states:

* **Approval:** Case meets criteria; triggers a celebration animation.
* **Pend:** Additional information requested from the provider.
* **Denial:** Claim rejected based on lack of medical necessity or criteria mismatch.
* **Appeal:** Provider challenges the rejection with extra evidence.
* **Peer-to-Peer Review:** Direct doctor-to-medical-director discussion to resolve complex cases.

### 4. Metrics & Feedback Loop

* **Progress Tracker:** Visual status tracker pinned to the top of the interface.
* **Days Elapsed Counter:** A step-based or time-based ticker reflecting how long a typical PA takes in reality.
* **Efficiency Score:** Gamified score dynamically calculated based on correct handling, speed, and document accuracy.
* **Workflow Summary:** A final breakdown screen summarizing performance, total time taken, and key learning points upon completion.

### 5. UI & Polish

* **Theme:** Responsive, modern design prioritizing shades of blue with clean, legible black text.
* **Reset Lifecycle:** Fully functional **Restart / New Patient** buttons to wipe memory states and begin a fresh scenario smoothly.

---

## Submission Checklist

- [ ] Complete single-file application developed.
* [ ] Code committed and pushed to GitHub.
* [ ] Verification of zero external assets/CDNs loading.
* [ ] Optional: Record walkthrough or write a LinkedIn summary post to boost synergy points.
