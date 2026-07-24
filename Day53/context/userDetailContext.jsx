'use client';

import { createContext, useState, useEffect } from 'react';
import { supabase } from '@/services/supabaseClient';

/**
 * context/userDetailContext.jsx
 *
 * This is the Global User Context. It solves "prop drilling" — the
 * problem of having to pass the logged-in user's data through every
 * single component as a prop.
 *
 * Instead, any component in the app can simply call useContext(UserDetailContext)
 * or use the custom useUser() hook to access the recruiter's data.
 *
 * What this provides:
 *  - userDetail: The recruiter's profile data (id, email, full_name, avatar_url)
 *  - setUserDetail: Function to update the user detail state
 *  - loading: Whether the user session is still being fetched
 */

// Create the context object (starts with empty/null values)
export const UserDetailContext = createContext(null);

/**
 * UserDetailProvider — Wraps the entire app (or the authenticated section)
 * and provides user data to all children.
 */
export function UserDetailProvider({ children }) {
  const [userDetail, setUserDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // When the component mounts, check if there's already a logged-in session
    const initSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          // Fetch the recruiter's profile from the 'profiles' table
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          // Merge auth user data with profile data
          setUserDetail({
            ...session.user,
            ...profile,
            // Google provides avatar via user_metadata
            avatar_url: session.user.user_metadata?.avatar_url || null,
          });
        }
      } catch (error) {
        console.error('[UserDetailContext] Error fetching session:', error);
      } finally {
        setLoading(false);
      }
    };

    initSession();

    // Listen for auth state changes (login, logout, token refresh)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          setUserDetail({
            ...session.user,
            ...profile,
            avatar_url: session.user.user_metadata?.avatar_url || null,
          });
        }

        if (event === 'SIGNED_OUT') {
          setUserDetail(null);
        }
      }
    );

    // Cleanup the listener when the component unmounts
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail, loading }}>
      {children}
    </UserDetailContext.Provider>
  );
}
