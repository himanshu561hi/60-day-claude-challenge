'use client';

import { UserDetailProvider } from '@/context/userDetailContext';

/**
 * app/(main)/provider.js — Context Provider Wrapper
 *
 * This is a "Client Component" wrapper that provides all the
 * global context to the authenticated recruiter pages.
 *
 * Why do we need this?
 * - Next.js Server Components (like layout.js) cannot contain
 *   React Context or useState hooks.
 * - So we create a separate Client Component file to wrap
 *   child components with providers.
 *
 * The UserDetailProvider:
 * - Starts fetching the recruiter's session on mount
 * - Makes userDetail available to any component via useUser() hook
 */
export default function Provider({ children }) {
  return <UserDetailProvider>{children}</UserDetailProvider>;
}
