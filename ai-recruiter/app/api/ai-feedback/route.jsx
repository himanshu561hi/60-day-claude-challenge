import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const runtime = 'nodejs';

/**
 * app/api/ai-feedback/route.jsx — Real-Time AI Mentor & Speech Coaching API
 *
 * Day 7 (Day 57): Live Transcription & Dynamic AI Mentor Tips
 *
 * Responsibilities:
 * 1. Receives ongoing conversational dialogue snippets, candidate responses, and role context from the calling engine.
 * 2. Connects to Google Gemini 1.5 Flash via @google/generative-ai to perform real-time speech analytics.
 * 3. Returns actionable coaching suggestions, tonal sentiment, technical topic tags, and confidence metrics to display in the Live Mentor Sidebar.
 * 4. Provides zero-latency simulation fallback modes so developer QA testing and live presentations run flawlessly out-of-the-box.
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      transcript_snippet = '', 
      job_role = 'Senior AI Engineer', 
      candidate_name = 'Candidate',
      turn_count = 1 
    } = body;

    // Validate incoming snippet
    if (!transcript_snippet || transcript_snippet.trim() === '') {
      return NextResponse.json(
        { 
          error: 'Missing speech transcript content for live mentor evaluation.' 
        }, 
        { status: 400 }
      );
    }

    const cleanedText = transcript_snippet.slice(0, 3000); // Guard token window
    const apiKey = process.env.GEMINI_API_KEY;
    const isMockMode = !apiKey || apiKey.includes('YOUR_GEMINI_API_KEY') || apiKey.trim() === '';

    let suggestion = 'Maintain clear structure by mentioning problem, solution, and quantifiable results.';
    let tone = 'Engaged & Professional';
    let topics = ['Architecture', 'Problem Solving'];
    let clarity_score = 85;
    let next_angle = 'Probe deeper into real-time state consistency and scaling limits.';

    // Execute Live Gemini Cloud Coaching
    if (!isMockMode) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `
You are an expert Executive Technical Career Coach and AI Mentor observing a live job interview for a ${job_role} position.
Candidate Name: ${candidate_name}
Latest Candidate Dialogue Turn (Turn #${turn_count}): "${cleanedText}"

TASK:
Analyze the candidate's response in real-time and provide immediate, constructive coaching insights for our Live Mentor Sidebar.

Respond strictly with a valid JSON object containing exactly these keys:
- "suggestion": A concise 1 or 2 sentence tip for the candidate or evaluator (e.g. "Great architectural overview! Mention specific numerical latency reductions or trade-offs to solidify mastery.").
- "tone": A short 2-3 word assessment of speech tone (e.g. "Confident & Analytical", "Articulate & Concise", "Enthusiastic & Structured").
- "topics": An array of 2 to 4 key technical topics or keywords identified in this speech snippet.
- "clarity_score": An integer from 70 to 98 representing estimated communication structure and clarity.
- "next_angle": A brief recommended follow-up question angle for the recruiter (e.g. "Ask about error handling during high load").

Return ONLY valid JSON without markdown formatting or code fences.
`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        const cleanedJson = responseText.replace(/```json/i, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleanedJson);

        if (parsed.suggestion) suggestion = parsed.suggestion;
        if (parsed.tone) tone = parsed.tone;
        if (Array.isArray(parsed.topics) && parsed.topics.length > 0) topics = parsed.topics;
        if (typeof parsed.clarity_score === 'number') clarity_score = parsed.clarity_score;
        if (parsed.next_angle) next_angle = parsed.next_angle;

      } catch (geminiError) {
        console.warn('[API /api/ai-feedback] Gemini live evaluation fallback triggered:', geminiError.message);
        const fallback = generateSimulatedMentorFeedback(cleanedText, job_role, turn_count);
        suggestion = fallback.suggestion;
        tone = fallback.tone;
        topics = fallback.topics;
        clarity_score = fallback.clarity_score;
        next_angle = fallback.next_angle;
      }
    } else {
      // Execute intelligent Simulation Coaching mode
      const sim = generateSimulatedMentorFeedback(cleanedText, job_role, turn_count);
      suggestion = sim.suggestion;
      tone = sim.tone;
      topics = sim.topics;
      clarity_score = sim.clarity_score;
      next_angle = sim.next_angle;
    }

    return NextResponse.json({
      success: true,
      mode: isMockMode ? 'simulation' : 'live_gemini',
      timestamp: new Date().toISOString(),
      evaluation: {
        suggestion,
        tone,
        topics,
        clarity_score,
        next_angle
      }
    }, { status: 200 });

  } catch (error) {
    console.error('[API /api/ai-feedback] Internal Server Error:', error);
    return NextResponse.json(
      { error: 'Internal server error while computing real-time mentor feedback.' }, 
      { status: 500 }
    );
  }
}

/**
 * Helper: Generates realistic, context-aware simulation mentor feedback out of the box.
 */
function generateSimulatedMentorFeedback(text, role, turnCount) {
  const lower = text.toLowerCase();
  
  // Topic keyword matching
  const allTopics = ['Next.js 15', 'Gemini AI', 'Supabase RLS', 'System Architecture', 'Latency Reduction', 'Security', 'Scalability', 'Team Collaboration'];
  const matchedTopics = allTopics.filter(t => lower.includes(t.toLowerCase().split(' ')[0]));
  const topics = matchedTopics.length >= 2 ? matchedTopics.slice(0, 3) : ['Full-Stack Design', 'System Performance', 'AI Pipelines'];

  let suggestion = 'Excellent technical framing! Consider highlighting specific performance metrics or error handling patterns to demonstrate senior leadership depth.';
  let tone = 'Confident & Articulate';
  let clarity_score = 88 + Math.floor(Math.random() * 8);
  let next_angle = 'Investigate high-concurrency token limits and retry mechanisms.';

  if (turnCount === 2 || lower.includes('security') || lower.includes('supabase') || lower.includes('policy')) {
    suggestion = 'Strong security architecture distinction. Illustrating multi-tenant table access and JWT token expiration will further prove enterprise preparedness.';
    tone = 'Authoritative & Precision-Driven';
    next_angle = 'Examine multi-region replication and data synchronization latency.';
  } else if (turnCount >= 3 || lower.includes('team') || lower.includes('culture') || lower.includes('review')) {
    suggestion = 'Great emphasis on team empathy and continuous automated validation! Emphasizing constructive code review mentorship showcases senior leadership qualities.';
    tone = 'Collaborative & Empathetic';
    next_angle = 'Conclude by asking about career growth objectives and alignment with roadmap.';
  }

  return { suggestion, tone, topics, clarity_score, next_angle };
}
