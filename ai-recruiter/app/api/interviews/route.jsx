import { NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/services/supabaseClient';

/**
 * app/api/interviews/route.jsx — Interview CRUD API
 *
 * GET  /api/interviews — List all interviews for the authenticated recruiter
 * POST /api/interviews — Create a new interview template
 *
 * Full implementation Day 54. Today we scaffold the route.
 */

// GET — Fetch all interviews for the logged-in recruiter
export async function GET(request) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Placeholder response — will be connected to Supabase on Day 54
    return NextResponse.json({ interviews: [], message: 'Scaffold — Implementation Day 54' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST — Create a new interview template
export async function POST(request) {
  try {
    const body = await request.json();
    const { job_role, job_description } = body;

    if (!job_role || !job_description) {
      return NextResponse.json(
        { error: 'job_role and job_description are required' },
        { status: 400 }
      );
    }

    // Placeholder response — will be connected to Supabase on Day 54
    return NextResponse.json(
      { success: true, message: 'Scaffold — Implementation Day 54' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
