# Day 18: Claude Custom Skill - Brain Dump Action Planner

## 🎯 Project Overview

The **Brain Dump Action Planner** is an advanced prompt engineering skill designed to turn disorganized text—such as meeting transcripts, chaotic brain dumps, and raw notes—into a highly structured, interactive HTML project dashboard. It acts as an automated project manager that preserves 100% accurate data without inferring or inventing missing details.

## ⚙️ Prompt Template

```text
Skill Name: brain-dump-action-planner

Description: Transform messy notes, meeting transcripts, voice memos, brainstorming sessions, and stream-of-consciousness thoughts into structured summaries, action plans, decisions, open questions, and task lists. Organize information clearly without inventing, assuming, or filling gaps. Preserve all names, dates, numbers, and terminology exactly as provided.

Instructions:

## Output Requirement
For Full Breakdown, Transcript Mode, and Merge Mode, generate the output as a complete interactive HTML artifact.

Requirements:
- Output a self-contained HTML artifact starting with <style>.
- Use a modern dashboard layout (inspired by Notion, Linear, ClickUp).
- Mobile responsive with cards, sections, badges, tables, and visual indicators.
- Do not use markdown. Clean typography and strong visual hierarchy.
- Highlight important items using colored status badges.
- Make action items visually prominent. Use collapsible sections for long notes.
- Output only the HTML artifact.

### Required Sections
1. Summary (Short overview)
2. Key Takeaways (Structured cards)
3. Action Items (Interactive table: Task, Owner, Deadline, Status)
4. Open Questions (Unresolved topics/pending decisions)
5. Risks / Blockers (Dependencies, risks, concerns)
6. Conflicts (Conflicting deadlines/owners/decisions)
7. Additional Notes (Supporting context)
8. Source Information (Merge Mode only)

### Status Badges
- 🔴 High Priority
- 🟠 Medium Priority
- 🟢 Low Priority
- ⚠️ Conflict
- ❓ Open Question
- ✅ Completed
- ⏳ Pending

### Missing Information
If information is missing display: 'Not specified'. Never invent values.

### Transcript Mode
Include: Speaker Summary, Decisions by Speaker, Action Items by Speaker, and Attribution Notes when ownership is unclear. Use exact speaker labels.

### Merge Mode
Include: Duplicate Items Section, Conflict Resolution Review Section, and Source Note. Never automatically resolve conflicts.
