# Autonomous Agent Studio

This document outlines the architecture and execution of the multi-agent pipeline built in Day 46.

## Architecture Overview
- **Planner:** Analyzes the problem and breaks it down.
- **Executor:** Implements the initial solution.
- **Evaluator:** Scores the solution on a 0-100 scale, enforcing strict QA.
- **Critic:** Provides actionable feedback for any score under 100.
- **Improver:** Applies the feedback to generate a better iteration.
- **Final Reviewer:** Signs off when stopping conditions are met.

## Execution Flow & Stopping Conditions
The pipeline runs an actual `while(true)` loop. In each iteration:
1. The **Evaluator** scores the current draft.
2. The loop checks three conditions:
   - **Threshold:** Score hits 100/100.
   - **Plateau:** Score improvement is < 2 for two consecutive rounds.
   - **Hard Cap:** Maximum of 5 rounds completed (safety fallback).
3. If a condition is met, the loop breaks to the Final Reviewer.
4. Otherwise, the **Critic** and **Improver** refine the draft and the loop repeats.

## Extension Ideas
- **Memory Manager:** Inject persistent memory across tasks.
- **Safety Monitor:** Pre-flight checks on code execution.
- **Human-in-the-Loop (HITL):** Require manual approval before applying final commits.
