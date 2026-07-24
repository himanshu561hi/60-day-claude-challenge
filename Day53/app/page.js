import { redirect } from 'next/navigation';

/**
 * Root Page — The landing page at "/"
 *
 * This page immediately redirects to /auth.
 * Recruiters must authenticate before accessing the dashboard.
 * Candidates are linked directly to /interview/[id] and don't land here.
 *
 * The redirect is done server-side (no flash of content).
 */
export default function RootPage() {
  redirect('/auth');
}
