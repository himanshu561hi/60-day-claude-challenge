# UI Wireframes & User Flow

This document details the interface screens, user flow transitions, navigation schemes, and layout wireframes for the **AI-Powered Interview Taker & Feedback System**.

---

## 1. Screen Flow & Navigation Map

```mermaid
graph TD
    %% Roles
    subgraph RecruiterFlow [Recruiter Pipeline]
        RAuth[Login Page: /auth] -->|Google Auth| RDash[Dashboard: /dashboard]
        RDash -->|Click Create| RCreate[Wizard: /dashboard/create-interview]
        RCreate -->|Submit & Generate Link| RDash
        RDash -->|Click Details| RDetails[Submissions: /scheduled-interview/[id]/Details]
        RDetails -->|Click Row| RFeedback[Feedback Dialog Modal]
    end

    subgraph CandidateFlow [Candidate Pipeline]
        PublicLink[Shareable Link] -->|Visit Link| CIntake[Intake Page: /interview/[id]]
        CIntake -->|Register & Upload PDF| CCall[Calling Screen: /interview/[id]/start]
        CCall -->|Complete Call / 7m limit| CEnd[Thank You: /interview/[id]/completed]
    end

    PublicLink -.-> CIntake
```

---

## 2. Low-Fidelity Layout Wireframes (ASCII Designs)

### 2.1 Recruiter Authentication (`/auth`)
A sleek glassmorphism card centered in a dark, clean workspace.
```
+---------------------------------------------------------+
|                                                         |
|                       TALENT AI                         |
|             "Screening Candidates via Voice AI"         |
|                                                         |
|             +-----------------------------+             |
|             |        Recruiter Login      |             |
|             |                             |             |
|             |  Access your candidate list |             |
|             |  and create custom calls.   |             |
|             |                             |             |
|             |    +-------------------+    |             |
|             |    | Sign In with Google |   |             |
|             |    +-------------------+    |             |
|             +-----------------------------+             |
|                                                         |
+---------------------------------------------------------+
```

---

### 2.2 Recruiter Dashboard (`/dashboard`)
A full dashboard layout containing a Sidebar (collapsible) and primary content area.
```
+---------------------------------------------------------------------------------+
| TALENT AI | Welcome, Himanshu (Recruiter)                        [Logout]       |
+-----------+---------------------------------------------------------------------+
| (o) Dash  |                                                                     |
|           |   +--------------+   +-----------------+   +---------------------+  |
| ( ) Jobs  |   | Interviews   |   | Total Screening |   | Avg Candidate Score |  |
|           |   |      12      |   |       86        |   |       74 / 100      |  |
| ( ) Stats |   +--------------+   +-----------------+   +---------------------+  |
|           |                                                                     |
|           |   [ + Create New Interview Template ]                               |
|           |                                                                     |
|           |   Active Job Openings:                                              |
|           |   +----------------------+--------------------+------------------+  |
|           |   | Job Role             | Candidates Screened| Actions          |  |
|           |   +----------------------+--------------------+------------------+  |
|           |   | Frontend Engineer    | 8 Candidates       | [Copy Link] [View|  |
|           |   | Backend Engineer     | 14 Candidates      | [Copy Link] [View|  |
|           |   | UI/UX Designer       | 2 Candidates       | [Copy Link] [View|  |
|           |   +----------------------+--------------------+------------------+  |
+-----------+---------------------------------------------------------------------+
```

---

### 2.3 Create Interview Template (`/dashboard/create-interview`)
Form view to create new configurations.
```
+---------------------------------------------------------------------------------+
| TALENT AI | Dashboard / Create Interview                                        |
+-----------+---------------------------------------------------------------------+
| (o) Dash  |                                                                     |
|           |   Configure AI Interviewer                                          |
| ( ) Jobs  |   -------------------------                                         |
|           |                                                                     |
| ( ) Stats |   Job Role/Title:                                                   |
|           |   [ Frontend Engineer                                            ]  |
|           |                                                                     |
|           |   Job Description / Requirements:                                   |
|           |   +--------------------------------------------------------------+  |
|           |   | We are looking for a frontend developer proficient in        |  |
|           |   | Next.js, React 19, and Tailwind. Must have experience with   |  |
|           |   | WebRTC and API integration.                                  |  |
|           |   +--------------------------------------------------------------+  |
|           |                                                                     |
|           |   [ Cancel ]                              [ Submit Configuration ]  |
+-----------+---------------------------------------------------------------------+
```

---

### 2.4 Candidate Intake Onboarding (`/interview/[interview_Id]`)
Public candidate submission form.
```
+---------------------------------------------------------+
|                                                         |
|                       TALENT AI                         |
|             Candidate Screening Onboarding              |
|                                                         |
|   You are applying for: Frontend Engineer               |
|   Please provide your details and resume PDF below.     |
|                                                         |
|   Full Name:                                            |
|   [ John Doe                                         ]  |
|                                                         |
|   Email Address:                                        |
|   [ john.doe@example.com                             ]  |
|                                                         |
|   Upload Resume (PDF only):                             |
|   +-------------------------------------------------+   |
|   |         [Drag & Drop Resume PDF Here]           |   |
|   |                      - or -                     |   |
|   |               [ Select PDF File ]               |   |
|   +-------------------------------------------------+   |
|                                                         |
|                              [ Begin Mock Interview ]   |
+---------------------------------------------------------+
```

---

### 2.5 Candidate Call & Speech Coach Screen (`/interview/[interview_Id]/start`)
Split-screen calling interface. Left panel handles VoIP call states; right panel streams transcription & real-time mentorship tips.
```
+---------------------------------------------------------------------------------+
| TALENT AI | Interview Session: Frontend Engineer                                 |
+--------------------------------------+------------------------------------------+
|                                      |                                          |
|             AI INTERVIEWER           |  LIVE CONVERSATION TRANSCRIPT            |
|                [ Active ]            |  ----------------------------            |
|                                      |  [AI] Hi John, please introduce          |
|                 / \ / \              |       yourself and your Next.js exp.     |
|                /   v   \             |  [You] Yeah, sure! I am John. I've been  |
|                ( Visual Wave )       |        using Next.js for 3 years, like   |
|                \   ^   /             |        mostly App router and it's nice.  |
|                 \ / \ /              |                                          |
|                                      |  --------------------------------------- |
|                                      |  DYNAMIC SPEECH COACH (LIVE MENTOR TIPS) |
|           [Mute Mic]  [End Call]     |  --------------------------------------- |
|                                      |  > Tip: Try to reduce filler words       |
|  Call Duration: 03:14 / 07:00        |    such as 'mostly' or 'like'.           |
|  Questions Checked: 2 / 5            |  > Tip: Elaborate on specific libraries  |
|                                      |    or APIs you wrote in Next.js.         |
|                                      |                                          |
+--------------------------------------+------------------------------------------+
```

---

### 2.6 Recruiter Candidate Submissions List (`/scheduled-interview/[id]/Details`)
Lists candidate screening outcomes.
```
+---------------------------------------------------------------------------------+
| TALENT AI | Dashboard / Job Submissions / Frontend Engineer                     |
+-----------+---------------------------------------------------------------------+
| ( ) Dash  |                                                                     |
|           |   Candidate Screening Submissions                                   |
| (o) Jobs  |   -------------------------------                                   |
|           |                                                                     |
| ( ) Stats |   Candidates Screened:                                              |
|           |   +------------------+-----------------------+---------+----------+  |
|           |   | Candidate Name   | Email                 | Score   | Date     |  |
|           |   +------------------+-----------------------+---------+----------+  |
|           |   | John Doe         | john.doe@example.com  | [ 85 ]  | Jul 23   |  |
|           |   | Alice Smith      | alice.s@example.com   | [ 92 ]  | Jul 22   |  |
|           |   | Bob Johnson      | bob.j@example.com     | [ 42 ]  | Jul 21   |  |
|           |   +------------------+-----------------------+---------+----------+  |
|           |   * Click on any candidate row to view detailed transcripts/scores.  |
|           |                                                                     |
+-----------+---------------------------------------------------------------------+
```

---

### 2.7 Recruiter Candidate Feedback Modal
Interactive modal showing complete evaluation dashboard.
```
+---------------------------------------------------------------------------------+
| [X] John Doe - Candidate Assessment Report                                      |
+---------------------------------------------------------------------------------+
| Email: john.doe@example.com   | Score: 85/100 (Pass/Excellent)                  |
+--------------------------------------+------------------------------------------+
| STRENGTHS                            | TRANSCRIPT LOGS                          |
| * Understood Server vs Client comp.  | -----------------------                  |
| * Used STAR method in project answer | [AI]: Hi John, please introduce...       |
|                                      | [John]: Yeah, sure! I am John...         |
| WEAKNESSES                           | [AI]: What's the difference between...   |
| * Pacing was fast when speaking      | [John]: Server components render on the  |
| * Used filler words ('like', 'yeah') |         server while client components   |
|                                      |         hydrate in the browser.          |
| MENTOR SUGGESTIONS                   |                                          |
| Practice calming techniques to slow  |                                          |
| down pacing and replace filler words |                                          |
| with controlled pauses.              |                                          |
|                                      |                                          |
+--------------------------------------+------------------------------------------+
|                                                          [ Close Evaluation ]   |
+---------------------------------------------------------------------------------+
```
