'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

type UserRole = 'rider' | 'chauffeur' | 'ea' | 'partner_admin' | 'ops_agent' | 'ops_manager' | 'super_admin';

interface AuthUser extends User {
  role?: UserRole;
  profile?: {
    first_name: string;
    last_name: string;
    profile_photo_url?: string;
  };
  membership?: {
    tier: 'select' | 'premier' | 'obsidian' | 'corporate';
    status: string;
  };
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, metadata: any) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserDetails = async (userId: string) => {
    try {
      const { data: userData } = await supabase
        .from('users')
        .select('role, metadata')
        .eq('id', userId)
        .maybeSingle();

      const { data: profileData } = await supabase
        .from('profiles')
        .select('first_name, last_name, profile_photo_url')
        .eq('id', userId)
        .maybeSingle();

      const { data: membershipData } = await supabase
        .from('memberships')
        .select('tier, status')
        .eq('user_id', userId)
        .maybeSingle();

      return {
        role: userData?.role,
        profile: profileData,
        membership: membershipData,
      };
    } catch (error) {
      console.error('Error fetching user details:', error);
      return {};
    }
  };

  const refreshUser = async () => {
    const { data: { user: authUser } } = await supabase.auth.getUser();

    if (authUser) {
      const details = await fetchUserDetails(authUser.id);
      setUser({ ...authUser, ...details } as AuthUser);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
          const details = await fetchUserDetails(session.user.id);
          setUser({ ...session.user, ...details } as AuthUser);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          const details = await fetchUserDetails(session.user.id);
          setUser({ ...session.user, ...details } as AuthUser);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      await refreshUser();

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signUp = async (email: string, password: string, metadata: any) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });

      if (error) throw error;

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
