# Day 5: Context Engineering (Personalized AI Roadmaps)

## Overview

On Day 5 of the ABTalks 60-Day AI Challenge, the focus was on **Context Engineering**. This practice involves providing relevant background, current skill levels, explicit goals, constraints, and preferred styles to an AI before executing a task. The quality and specificity of the context provided often impact the utility of the output far more than a basic, generic prompt.

In this experiment, I tested two different prompting approaches to generate a 30-day learning roadmap and compared the results.

---

## The Experiment

### 1. Prompt A (Without Context)

This prompt was executed blindly without giving any details about my current background, tech stack, or availability.

#### The Full Prompt:

```text
Create a 30-day learning roadmap.

Include:
- Weekly milestones
- Daily tasks
- Resources
- Projects
- Final outcome

Make it practical and beginner-friendly.
```

### 2. Prompt B (With Context)

This prompt asking question from you to understanf your tech stack avalibility etc..

```text
Create a 30-day learning roadmap.

Context:
- Current Situation: Student (3rd Year Computer Science and Engineering)
- Current Skills: MERN Stack (MongoDB, Express, React, Node.js), Tailwind CSS, basic AI/ML integrations
- Goal: Master Advanced Production Architecture & AI Automation Workflows (e.g., self-hosted cron automation engines & production proctoring tools)
- Available Time: 3-4 Hours per Day
- Experience Level: Intermediate
- Preferred Learning Style: Hands-on Project Building & Documentation

Include:
- Weekly milestones
- Daily tasks
- Resources
- Projects
- Final outcome

Make it practical and beginner-friendly.
```
