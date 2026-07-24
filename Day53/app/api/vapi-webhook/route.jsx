import { NextResponse } from 'next/server';

/**
 * app/api/vapi-webhook/route.jsx — Vapi Post-Call Webhook Handler
 *
 * POST /api/vapi-webhook
 *
 * Full implementation Day 58:
 * - Receive end-of-call report from Vapi servers
 * - Validate webhook secret
 * - Send transcript to Gemini for scoring
 * - Update candidate_submissions in Supabase with results
 *
 * Today: Scaffold with signature check placeholder.
 */
export async function POST(request) {
  try {
    const webhookSecret = request.headers.get('x-vapi-secret');
    
    if (webhookSecret !== process.env.VAPI_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Scaffold — full implementation on Day 58
    return NextResponse.json(
      { received: true, message: 'Webhook scaffold — Implementation Day 58' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
