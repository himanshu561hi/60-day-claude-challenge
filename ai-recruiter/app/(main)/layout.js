import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppSidebar from './_components/AppSidebar';
import Provider from './provider';

/**
 * app/(main)/layout.js — Authenticated Recruiter Layout
 *
 * This layout wraps all pages inside the (main) route group:
 *   /dashboard, /scheduled-interview
 *
 * The parentheses around (main) are a Next.js feature called a
 * "Route Group". It means:
 *  - The folder name "(main)" does NOT appear in the URL
 *  - /app/(main)/dashboard/page.jsx becomes → /dashboard
 *
 * This layout adds:
 * 1. Provider — Wraps with React Context (user session)
 * 2. SidebarProvider — shadcn Sidebar state manager
 * 3. AppSidebar — The collapsible left navigation sidebar
 * 4. SidebarTrigger — The ☰ button that opens/closes the sidebar on mobile
 */
export const metadata = {
  title: 'Recruiter Dashboard — AI Interview System',
};

export default function MainLayout({ children }) {
  return (
    <Provider>
      <SidebarProvider>
        <div className="flex h-screen w-full overflow-hidden">
          {/* ── Left Sidebar Navigation ─────────────────────────────── */}
          <AppSidebar />

          {/* ── Main Content Area ────────────────────────────────────── */}
          <main className="flex-1 flex flex-col overflow-hidden">
            {/* Top bar with sidebar toggle button (visible on mobile) */}
            <div className="flex items-center h-14 px-4 border-b border-[hsl(222,47%,15%)] md:hidden">
              <SidebarTrigger />
              <span className="ml-3 text-sm font-semibold gradient-text">AI Interview System</span>
            </div>

            {/* Page content scrolls independently */}
            <div className="flex-1 overflow-auto">
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </Provider>
  );
}
