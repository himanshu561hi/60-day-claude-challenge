import { NextResponse } from 'next/server';

/**
 * app/api/candidates/register/route.jsx — Candidate Registration & PDF Parser
 *
 * POST /api/candidates/register
 *
 * Full implementation Day 55:
 * - Accept multipart/form-data with candidate info + PDF resume
 * - Parse PDF with pdf-parse
 * - Send to Gemini for resume analysis + system prompt generation
 * - Create candidate_submissions row in Supabase
 * - Return Vapi system prompt
 *
 * Today: Scaffold with validation only.
 */
export async function POST(request) {
  try {
    // Scaffold — full implementation on Day 55
    return NextResponse.json(
      {
        message: 'Candidate registration scaffold — Implementation Day 55',
        success: false,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
