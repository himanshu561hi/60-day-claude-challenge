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
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen gradient-bg antialiased">
        {children}
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
      </body>
    </html>
  );
}
