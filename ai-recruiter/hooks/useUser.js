'use client';

import { useContext } from 'react';
import { UserDetailContext } from '@/context/userDetailContext';

/**
 * hooks/useUser.js
 *
 * A custom React hook that provides a clean, simple API to access
 * the logged-in recruiter's data from anywhere in the component tree.
 *
 * Why a custom hook?
 *  - Cleaner code: Instead of writing useContext(UserDetailContext) in every component,
 *    you just write useUser()
 *  - Encapsulation: If we ever change how user data is stored, we only
 *    need to update this one hook
 *
 * Usage example:
 *  import { useUser } from '@/hooks/useUser';
 *  
 *  function MyComponent() {
 *    const { userDetail, loading } = useUser();
 *    if (loading) return <Spinner />;
 *    return <p>Welcome, {userDetail?.full_name}!</p>;
 *  }
 */
export function useUser() {
  const context = useContext(UserDetailContext);

  if (context === undefined) {
    throw new Error('useUser must be used within a UserDetailProvider');
  }

  return context;
}
