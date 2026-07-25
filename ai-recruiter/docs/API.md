# API Endpoints & Contracts

This document maps all backend serverless routes (`/api/*`) and endpoint contracts required for the **AI-Powered Interview Taker & Feedback System (v1.0)**.

---

## 1. Directory Route Mappings

All endpoints are built using Next.js 15 Route Handlers (`route.jsx`) under the `/app/api` directory:

```
app/
└── api/
    ├── interviews/
    │   ├── route.jsx              # GET (List), POST (Create)
    │   └── [id]/
    │       ├── route.jsx          # GET (Fetch Job Details)
    │       └── submissions/
    │           └── route.jsx      # GET (List submissions under interview)
    ├── candidates/
    │   └── register/
    │       └── route.jsx          # POST (Register & Parse Resume PDF)
    ├── ai-feedback/
    │   └── route.jsx              # POST (Asynchronous Live Coach Tips)
    ├── vapi-webhook/
    │   └── route.jsx              # POST (Vapi Webhook: End of Call Grading)
    └── submissions/
        └── [id]/
            └── route.jsx          # GET (Fetch detailed report & transcript)
```

---

## 2. Endpoint Specifications

### 2.1 GET `/api/interviews`
* **Purpose**: Fetch all interview configurations created by the authenticated recruiter.
* **Authentication**: Required (JWT Bearer Token header).
* **Headers**:
  ```http
  Authorization: Bearer <recruiter_jwt_token>
  ```
* **Response (200 OK)**:
  ```json
  [
    {
      "id": "7a3bfa86-c5e3-4b68-80df-8924f7627448",
      "recruiter_id": "d80b2a75-ec43-4e4b-a9b7-b088df2bbd2c",
      "job_role": "Senior React Developer",
      "job_description": "We are seeking a senior React developer...",
      "created_at": "2026-07-23T18:40:23.000Z",
      "_count": {
        "candidate_submissions": 12
      }
    }
  ]
  ```
* **Error Cases**:
  - `401 Unauthorized`: Token is missing or invalid.

---

### 2.2 POST `/api/interviews`
* **Purpose**: Create a new interview configuration template.
* **Authentication**: Required (JWT Bearer Token header).
* **Headers**:
  ```http
  Authorization: Bearer <recruiter_jwt_token>
  ```
* **Request Body**:
  ```json
  {
    "job_role": "Frontend Engineer",
    "job_description": "Minimum 3 years experience with Next.js, React, Tailwind CSS..."
  }
  ```
* **Validation Rules**:
  - `job_role`: String, non-empty, max 100 characters.
  - `job_description`: String, non-empty, max 5000 characters.
* **Response (201 Created)**:
  ```json
  {
    "success": true,
    "interview_id": "7a3bfa86-c5e3-4b68-80df-8924f7627448",
    "job_role": "Frontend Engineer"
  }
  ```
* **Error Cases**:
  - `400 Bad Request`: Missing inputs, empty strings.
  - `401 Unauthorized`: Missing credentials.

---

### 2.3 GET `/api/interviews/[id]`
* **Purpose**: Retrieve the job role name and description for candidate portal loading.
* **Authentication**: None (Public).
* **Response (200 OK)**:
  ```json
  {
    "job_role": "Frontend Engineer",
    "job_description": "Minimum 3 years experience with Next.js, React, Tailwind CSS..."
  }
  ```
* **Error Cases**:
  - `404 Not Found`: Interview config does not exist.

---

### 2.4 POST `/api/candidates/register`
* **Purpose**: Register a candidate, parse their uploaded PDF resume, call Gemini to align resume with job details, create an empty submission entry in DB, and yield Vapi system prompt.
* **Authentication**: None (Public).
* **Content-Type**: `multipart/form-data`
* **Request Data**:
  - `candidate_name`: Text string
  - `candidate_email`: Text string (email format)
  - `interview_id`: UUID
  - `resume`: File binary (PDF format, max 5MB)
* **Response (200 OK)**:
  ```json
  {
    "success": true,
    "submission_id": "fb472b53-48ee-444a-b50a-e3db98242a9b",
    "job_role": "Frontend Engineer",
    "candidate_name": "John Doe",
    "vapi_system_prompt": "You are a professional technical interviewer screening John Doe for a Frontend Engineer position. Their resume states they worked at Acme Corp. Ask them 5 structured questions. Keep answers short."
  }
  ```
* **Error Cases**:
  - `400 Bad Request`: File is not a PDF, file exceeds size, missing text parameters.
  - `500 Internal Server Error`: PDF text parser extraction error or Gemini failure.

---

### 2.5 POST `/api/ai-feedback`
* **Purpose**: Generate low-latency speech coaching feedback suggestions in real-time during a call.
* **Authentication**: None (Public).
* **Request Body**:
  ```json
  {
    "transcript_snippet": "Uh, I guess React handles state through hooks like useState. I also used Redux in one project, which was, like, pretty cool because it solved the prop drilling thing.",
    "job_description": "Frontend Engineer position..."
  }
  ```
* **Response (200 OK)**:
  ```json
  {
    "suggestion": "Good explanation of hooks. Try to limit filler words like 'like' or 'pretty cool' to sound more authoritative."
  }
  ```
* **Error Cases**:
  - `400 Bad Request`: Empty snippet.

---

### 2.6 POST `/api/vapi-webhook`
* **Purpose**: Vapi webhook receiver. Called on `end-of-call-report`. Evaluates call, scores transcript via Gemini, and saves results to DB.
* **Authentication**: Handled via Vapi Request Header validation (secret token header verified by Next.js server).
* **Headers**:
  ```http
  x-vapi-secret: <vapi_webhook_secret_key>
  ```
* **Request Body (Summary of Vapi Payload)**:
  ```json
  {
    "message": {
      "type": "end-of-call-report",
      "call": {
        "id": "call_123abc567def",
        "transcript": "Assistant: Hello. Candidate: Hi. Assistant: Can you explain state? Candidate: Sure...",
        "messages": [
          { "role": "assistant", "message": "Hello.", "time": 1000 },
          { "role": "user", "message": "Hi.", "time": 2500 }
        ]
      },
      "customer": {
        "email": "candidate@example.com"
      }
    }
  }
  ```
* **Processing Steps (Internal Serverless Logic)**:
  1. Next.js server verifies the webhook secret.
  2. Queries DB to locate the pending `candidate_submissions` row corresponding to the candidate's email and interview.
  3. Sends full transcript to **Gemini 1.5 Flash** using a Structured output schema.
  4. Updates the database row:
     - `vapi_call_id` = `call.id`
     - `overall_score` = Gemini evaluated score (0-100)
     - `strengths` = Gemini JSON string array
     - `weaknesses` = Gemini JSON string array
     - `suggestions` = Gemini recommendations text
     - `transcript` = Vapi messages array (`role`, `message`, `time` attributes mapped to DB schema format)
     - `completed_at` = NOW()
* **Response (200 OK)**:
  ```json
  {
    "received": true,
    "submission_id": "fb472b53-48ee-444a-b50a-e3db98242a9b"
  }
  ```
* **Error Cases**:
  - `401 Unauthorized`: Webhook signature/secret validation failed.
  - `404 Not Found`: No submission row matched the candidate profile.

---

### 2.7 GET `/api/interviews/[id]/submissions`
* **Purpose**: List candidate submissions for a specific interview template.
* **Authentication**: Required (JWT Bearer Token).
* **Headers**:
  ```http
  Authorization: Bearer <recruiter_jwt_token>
  ```
* **Response (200 OK)**:
  ```json
  [
    {
      "id": "fb472b53-48ee-444a-b50a-e3db98242a9b",
      "candidate_name": "John Doe",
      "candidate_email": "john.doe@example.com",
      "overall_score": 85,
      "created_at": "2026-07-23T18:40:23.000Z",
      "completed_at": "2026-07-23T18:48:12.000Z"
    }
  ]
  ```
* **Error Cases**:
  - `401 Unauthorized`: Invalid recruiter token.
  - `403 Forbidden`: Recruiter does not own the interview template.

---

### 2.8 GET `/api/submissions/[id]`
* **Purpose**: Fetch detailed assessment feedback for a specific candidate submission.
* **Authentication**: Required (JWT Bearer Token).
* **Headers**:
  ```http
  Authorization: Bearer <recruiter_jwt_token>
  ```
* **Response (200 OK)**:
  ```json
  {
    "id": "fb472b53-48ee-444a-b50a-e3db98242a9b",
    "candidate_name": "John Doe",
    "candidate_email": "john.doe@example.com",
    "overall_score": 85,
    "strengths": [
      "Excellent articulation of frontend concepts",
      "Directly linked background skills to job description"
    ],
    "weaknesses": [
      "Used some filler words in answer 3",
      "Pacing was slightly fast"
    ],
    "suggestions": "Practice structure using the STAR method for technical scenario reviews.",
    "transcript": [
      { "role": "assistant", "message": "Welcome! Please describe your experience.", "time": 1000 },
      { "role": "user", "message": "I've been working with Next.js for 3 years...", "time": 2500 }
    ],
    "completed_at": "2026-07-23T18:48:12.000Z"
  }
  ```
* **Error Cases**:
  - `401 Unauthorized`: Invalid credentials.
  - `403 Forbidden`: Recruiter does not own the interview associated with this submission.
  - `404 Not Found`: Submission ID not found.
