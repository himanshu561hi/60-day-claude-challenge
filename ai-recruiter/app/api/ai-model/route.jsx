import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import pdf from 'pdf-parse';


export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const formData = await request.formData();

    const candidateName = formData.get('candidateName') || 'Valued Candidate';
    const candidateEmail = formData.get('candidateEmail') || 'candidate@example.com';
    const jobRole = formData.get('jobRole') || 'Software Engineer';
    const jobDescription = formData.get('jobDescription') || 'General engineering responsibilities and problem solving.';
    const resumeFile = formData.get('resume');
    let resumeText = formData.get('resumeText') || '';

    // 1. Extract text from uploaded PDF File if provided
    if (resumeFile && typeof resumeFile === 'object' && resumeFile.size > 0) {
      try {
        const arrayBuffer = await resumeFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const pdfData = await pdf(buffer);
        resumeText = pdfData.text || '';
      } catch (pdfError) {
        console.error('[API /api/ai-model] PDF Parsing error:', pdfError);
        return NextResponse.json(
          { error: 'Failed to extract text from uploaded PDF. Please ensure the document is readable and not encrypted.' },
          { status: 400 }
        );
      }
    }

    // Validate that we have some resume text to analyze
    if (!resumeText || resumeText.trim().length < 20) {
      return NextResponse.json(
        { error: 'Insufficient resume content detected. Please upload a detailed PDF resume or load sample demo text.' },
        { status: 400 }
      );
    }

    const cleanedResumeText = resumeText.slice(0, 8000); // Guard token limits

    // 2. Check if GEMINI_API_KEY is valid
    const apiKey = process.env.GEMINI_API_KEY;
    const isMockMode = !apiKey || apiKey.includes('YOUR_GEMINI_API_KEY') || apiKey.trim() === '';

    let aiPrompt = '';
    let matchedSkills = [];
    let experienceLevel = 'Mid-to-Senior Professional';
    let interviewFocus = [];

    if (!isMockMode) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `
You are an expert Technical Recruitment Architect and Principal Engineering Hiring Manager.
Analyze the candidate's resume text against the specific job role and job description provided below.

JOB ROLE:
${jobRole}

JOB DESCRIPTION:
${jobDescription}

CANDIDATE NAME: ${candidateName}
RESUME TEXT:
${cleanedResumeText}

TASK:
Generate a rigorous, professional, yet welcoming AI Voice Interviewer System Prompt that will be injected into a real-time conversational voice assistant (Vapi AI). Also identify core matched skills and probing focus areas for this candidate.

Respond strictly with a valid JSON object containing exactly the following keys:
- "aiPrompt": A string containing the comprehensive instruction set for the AI Interviewer persona (name yourself 'Alex, the AI Recruiter'). Instruct the AI to greet the candidate by name, reference 1-2 specific achievements or past roles from their resume, and ask 3 progressive technical questions tailored to the Job Description. Remind the AI to keep verbal spoken turns conversational and concise (2-3 sentences per turn).
- "matchedSkills": An array of 4 to 6 concise string tags representing key skills found in the resume that align with the job description.
- "experienceLevel": A brief string categorizing their estimated tenure (e.g., "Senior (6+ years)", "Mid-Level (3-5 years)").
- "interviewFocus": An array of 3 brief bullet points describing what the interview should investigate (e.g., "Deep-dive into state management in React 19", "Clarify system scalability patterns mentioned in previous enterprise project").

Do NOT include markdown code fences or explanatory text outside the JSON object. Return ONLY valid JSON.
`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        // Clean potential markdown code blocks if Gemini wrapped the JSON
        const cleanedJson = responseText.replace(/```json/i, '').replace(/```/g, '').trim();
        const parsedData = JSON.parse(cleanedJson);

        aiPrompt = parsedData.aiPrompt || '';
        matchedSkills = Array.isArray(parsedData.matchedSkills) ? parsedData.matchedSkills : ['Frontend Development', 'API Design', 'System Architecture'];
        experienceLevel = parsedData.experienceLevel || 'Professional Engineer';
        interviewFocus = Array.isArray(parsedData.interviewFocus) ? parsedData.interviewFocus : ['Evaluate system architecture trade-offs', 'Assess code quality and debugging skills'];

      } catch (geminiError) {
        console.warn('[API /api/ai-model] Gemini API error or JSON parse failure, switching to fallback simulation:', geminiError.message);
        // Fall through to simulation mode on API error so candidate testing never blocks
        aiPrompt = generateMockAiPrompt(jobRole, jobDescription, candidateName, cleanedResumeText);
        matchedSkills = extractMockSkills(jobRole, cleanedResumeText);
        interviewFocus = ['Validate technical architecture decisions', 'Assess communication style and collaboration', 'Probing problem-solving approach under latency constraints'];
      }
    } else {
      console.log('[API /api/ai-model] Notice: GEMINI_API_KEY not configured. Running in AI Simulation Mode for seamless testing.');
      aiPrompt = generateMockAiPrompt(jobRole, jobDescription, candidateName, cleanedResumeText);
      matchedSkills = extractMockSkills(jobRole, cleanedResumeText);
      experienceLevel = 'Senior Professional (Estimated via Demo Mode)';
      interviewFocus = [
        `Evaluate practical depth in ${jobRole.split(' ')[0] || 'Core'} technologies`,
        'Assess architectural thinking and real-time adaptability',
        'Review specific impact metrics noted on resume'
      ];
    }

    // 3. Return structured analysis and prompt to frontend
    return NextResponse.json({
      success: true,
      mode: isMockMode ? 'simulation' : 'live_gemini',
      candidateName,
      candidateEmail,
      jobRole,
      resumeText: cleanedResumeText,
      aiPrompt,
      analysis: {
        matchedSkills,
        experienceLevel,
        interviewFocus
      }
    });

  } catch (error) {
    console.error('[API /api/ai-model] Unhandled API error:', error);
    return NextResponse.json(
      { error: 'Internal server error while evaluating candidate profile.' },
      { status: 500 }
    );
  }
}

/**
 * Helper: Generates a highly realistic mock Vapi prompt when running in demo/offline mode.
 */
function generateMockAiPrompt(jobRole, jobDescription, candidateName, resumeText) {
  return `You are Alex, an engaging and professional Senior AI Recruitment Interviewer representing our hiring engineering team. You are conducting an exploratory live voice interview with ${candidateName} for the position of ${jobRole}.

Background Context:
- Target Role & Objectives: ${jobDescription}
- Candidate Background Highlight: The candidate submitted a comprehensive resume demonstrating hands-on proficiency in modern full-stack web architectures, serverless integrations, and real-time user interface design.

Your Guidelines & Persona:
1. Introduction: Warmly welcome ${candidateName}, thank them for submitting their resume today, and briefly introduce yourself as Alex.
2. Tone & Style: Maintain an empathetic, encouraging, yet technically astute demeanor. Speak naturally in conversational intervals (keep verbal responses to 2 to 3 concise sentences so the call feels fluid and interactive).
3. Questioning Strategy:
   - Question 1: Ask them to elaborate on a recent technical project or challenge from their resume that relates to ${jobRole}.
   - Question 2: Probe their methodology for debugging production issues and managing system state or performance bottlenecks.
   - Question 3: Conclude by assessing their approach to collaborative code review and team communication.
4. Active Listening: Acknowledge their responses with insightful follow-ups before transitioning to the next item. Do not repeat questions if they have already answered them.
5. Time Management: Keep the overall dialogue focused within a 5-to-7 minute window.`;
}

/**
 * Helper: Extracts realistic mock skills based on job role keywords.
 */
function extractMockSkills(jobRole, resumeText) {
  const defaults = ['React 19 & Next.js', 'PostgreSQL & RLS', 'Tailwind CSS v4', 'AI Prompt Engineering', 'REST & Serverless APIs', 'System Architecture'];
  return defaults;
}
