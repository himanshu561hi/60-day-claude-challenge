import { NextResponse } from 'next/server';

/**
 * app/api/ai-feedback/route.jsx — Live Coaching Feedback API
 *
 * POST /api/ai-feedback
 *
 * Full implementation Day 57:
 * - Receive candidate speech snippet from client
 * - Send to Gemini 1.5 Flash for real-time speech coaching
 * - Return a 1-sentence tip to display in the mentor panel
 *
 * Today: Scaffold only.
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { transcript_snippet } = body;

    if (!transcript_snippet) {
      return NextResponse.json({ error: 'transcript_snippet is required' }, { status: 400 });
    }

    // Scaffold — full implementation on Day 57
    return NextResponse.json(
      {
        suggestion: 'Scaffold — AI feedback implementation coming Day 57',
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
