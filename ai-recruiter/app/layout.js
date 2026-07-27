import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';

// Load Inter font from Google Fonts for modern, clean typography
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

/**
 * Root metadata configuration.
 * This controls the <title> and <meta> tags across the entire app.
 */
export const metadata = {
  title: 'AI Interview System — Powered by Gemini & Vapi',
  description:
    'An AI-powered voice interview platform for recruiters to automate candidate screening and provide instant feedback using real-time speech coaching.',
  keywords: ['AI interview', 'voice interview', 'recruiter', 'Vapi', 'Gemini AI'],
  openGraph: {
    title: 'AI Interview System',
    description: 'Automated voice interviews with real-time AI feedback',
    type: 'website',
  },
};

/**
 * RootLayout — The outermost layout wrapper.
 *
 * Every page in the application is wrapped inside this component.
 * It provides:
 *  - The Inter Google Font
 *  - The global CSS (dark theme, design tokens)
 *  - The Sonner toast notification container
 *  - The mandatory AB Talks 60-Day Claude AI Challenge footer
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen gradient-bg antialiased flex flex-col justify-between">
        <div className="flex-1 flex flex-col">
          {children}
        </div>

        {/* Sonner Toaster — provides pop-up notification messages throughout the app */}
        <Toaster
          position="top-right"
          theme="dark"
          toastOptions={{
            style: {
              background: 'hsl(222 47% 8%)',
              border: '1px solid hsl(222 47% 15%)',
              color: 'hsl(210 40% 98%)',
            },
          }}
        />

        {/* Global Application Challenge Footer — Visible across all local and deployed screens */}
        <footer className="w-full border-t border-[hsl(222,25%,16%)] bg-[hsl(222,47%,6%)]/90 backdrop-blur-md py-5 px-6 text-center shadow-lg relative z-50">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[hsl(215,20%,65%)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold tracking-wide text-[hsl(210,40%,98%)]">AI Recruiter Capstone MVP</span>
            </div>
            <p className="font-medium tracking-wide text-[hsl(215,20%,75%)] bg-[hsl(222,47%,10%)] py-1.5 px-4 rounded-full border border-[hsl(258,90%,66%)]/30 shadow-inner">
              Built with Claude as part of the AB Talks 60-Day Claude AI Challenge.
            </p>
            <div className="text-[11px] text-[hsl(215,20%,50%)]">
              Powered by Next.js 15, Google Gemini AI & Supabase
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
