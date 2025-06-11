import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Database } from '@/types/supabase';
import { authService } from '@/services/api';

// Define types for our Spring Boot backend user
interface SpringUserProfile {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  jobTitle?: string | null;
  phoneNumber?: string | null;
  profileImageUrl?: string | null;
}

// Legacy Supabase profile type
interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  role: string;
  avatar_url: string | null;
  email: string | null;
  phone?: string | null;
  position?: string | null;
  department?: string | null;
}

// Combined type to handle both authentication systems during transition
interface AuthContextType {
  // Legacy Supabase auth
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;

  // New Spring Boot auth
  springUser: SpringUserProfile | null;

  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  refreshProfile: () => Promise<void>;

  // New Spring Boot methods
  springSignIn: (username: string, password: string) => Promise<void>;
  springSignUp: (userData: any) => Promise<void>;
  springSignOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [springUser, setSpringUser] = useState<SpringUserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // First check if we have a springUser in localStorage
    const storedSpringUser = localStorage.getItem('edifice-user');
    if (storedSpringUser) {
      try {
        setSpringUser(JSON.parse(storedSpringUser));
        setIsLoading(false);
        return; // We're using Spring auth, don't set up Supabase listeners
      } catch (e) {
        console.error('Error parsing stored spring user:', e);
        // Continue with Supabase auth if parsing fails
      }
    }

    // If no Spring user, fall back to Supabase auth (legacy)
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        if (currentSession?.user) {
          try {
            // Use setTimeout to avoid potential auth deadlocks
            setTimeout(() => {
              fetchProfile(currentSession.user.id);
            }, 0);
          } catch (error) {
            console.error('Error fetching profile during auth change:', error);
          } finally {
            // Ensure loading state is updated even if profile fetch fails
            setIsLoading(false);
          }
        } else {
          setProfile(null);
          setIsLoading(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      if (currentSession?.user) {
        fetchProfile(currentSession.user.id).catch(error => {
          console.error('Error fetching profile during initial load:', error);
        }).finally(() => {
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Legacy Supabase profile fetching function
  async function fetchProfile(userId: string) {
    try {
      console.log('Fetching profile for user:', userId);

      const { data: existingProfile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) {
        console.error('Supabase error fetching profile:', profileError);

        // If profile doesn't exist, create one
        if (profileError.code === 'PGRST116') { // No rows returned
          await createProfile(userId);
          return;
        }
        throw profileError;
      }

      if (existingProfile) {
        console.log('Found existing profile:', existingProfile);
        setProfile(existingProfile as unknown as UserProfile);
      } else {
        console.warn('No profile found for user:', userId);
        await createProfile(userId);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  }

  // Legacy Supabase profile creation function
  async function createProfile(userId: string) {
    try {
      // Get user data
      const { data: userData } = await supabase.auth.getUser(userId);

      if (!userData?.user) {
        console.error('Could not find user data for profile creation');
        return;
      }

      // Create a default profile with user data
      const newProfile = {
        id: userId,
        first_name: userData.user.user_metadata?.first_name || '',
        last_name: userData.user.user_metadata?.last_name || '',
        email: userData.user.email,
        role: 'user',
        avatar_url: null
      };

      console.log('Creating new profile:', newProfile);

      const { error: insertError } = await supabase
        .from('profiles')
        .insert(newProfile);

      if (insertError) {
        console.error('Error creating profile:', insertError);
        throw insertError;
      }

      setProfile(newProfile as UserProfile);
      console.log('Profile created successfully');
    } catch (error) {
      console.error('Error in profile creation:', error);
    }
  }

  async function refreshProfile(): Promise<void> {
    if (user) {
      try {
        await fetchProfile(user.id);
      } catch (error) {
        console.error('Error refreshing profile:', error);
      }
    }
  }

  // Legacy Supabase sign in function
  async function signIn(email: string, password: string) {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) throw error;

      navigate('/');
      toast({
        title: 'Welcome back!',
        description: 'You have successfully signed in.',
      });
    } catch (error: any) {
      toast({
        title: 'Error signing in',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  // Legacy Supabase sign up function
  async function signUp(email: string, password: string, firstName: string, lastName: string) {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          }
        }
      });

      if (error) throw error;

      toast({
        title: 'Account created!',
        description: 'Check your email for the confirmation link.',
      });

    } catch (error: any) {
      toast({
        title: 'Error creating account',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  // Legacy Supabase sign out function
  async function signOut() {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      navigate('/auth');
    } catch (error: any) {
      toast({
        title: 'Error signing out',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  // Legacy Supabase update profile function
  async function updateProfile(updates: Partial<UserProfile>): Promise<void> {
    try {
      if (!user) throw new Error('No user logged in');

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      setProfile(prev => prev ? { ...prev, ...updates } : null);

      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      });
    } catch (error: any) {
      toast({
        title: 'Error updating profile',
        description: error.message,
        variant: 'destructive',
      });
    }
  }

  // New Spring Boot sign in function
  async function springSignIn(username: string, password: string) {
    try {
      setIsLoading(true);
      const userData = await authService.login(username, password);
      setSpringUser(userData);
      setUser(null); // Clear Supabase user if exists
      setProfile(null); // Clear Supabase profile if exists

      navigate('/');
      toast({
        title: 'Welcome back!',
        description: 'You have successfully signed in.',
      });
    } catch (error: any) {
      toast({
        title: 'Error signing in',
        description: error.response?.data?.message || 'Authentication failed',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  // New Spring Boot sign up function
  async function springSignUp(userData: any) {
    try {
      setIsLoading(true);
      await authService.register(userData);

      toast({
        title: 'Account created!',
        description: 'Your account has been created successfully. You can now sign in.',
      });

      navigate('/auth'); // Navigate to login page
    } catch (error: any) {
      toast({
        title: 'Error creating account',
        description: error.response?.data?.message || 'Registration failed',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  // New Spring Boot sign out function
  function springSignOut() {
    authService.logout();
    setSpringUser(null);
    navigate('/auth');
    toast({
      title: 'Signed out',
      description: 'You have been signed out successfully.',
    });
  }

  const value = {
    // Legacy Supabase auth
    session,
    user,
    profile,

    // New Spring Boot auth
    springUser,

    isLoading,

    // Legacy methods
    signIn,
    signUp,
    signOut,
    updateProfile,
    refreshProfile,

    // New Spring Boot methods
    springSignIn,
    springSignUp,
    springSignOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
