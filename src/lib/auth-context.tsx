"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export type SubscriptionTier = "free" | "individual" | "family" | null;

interface Profile {
  id: string;
  subscription_tier: SubscriptionTier;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  isPaid: boolean;
  isFamily: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  isPaid: false,
  isFamily: false,
  signOut: async () => {},
  refreshProfile: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  async function fetchProfile(_userId: string) {
    try {
      const res = await fetch("/api/profile");
      const data = await res.json();
      console.log("Profile fetched:", data.profile?.subscription_tier);
      setProfile(data.profile || null);
    } catch (err) {
      console.error("Profile fetch error:", err);
      setProfile(null);
    }
  }

  async function refreshProfile() {
    if (user) {
      await fetchProfile(user.id);
    }
  }

  useEffect(() => {
    // Safety timeout — never stay stuck on loading
    const timeout = setTimeout(() => setLoading(false), 3000);

    // Check initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      clearTimeout(timeout);
      console.log("Initial session check:", { user: session?.user?.email, error: error?.message });
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        fetchProfile(currentUser.id).then(() => setLoading(false));
      } else {
        setLoading(false);
      }
    }).catch(() => {
      clearTimeout(timeout);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email);
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        if (currentUser) {
          await fetchProfile(currentUser.id);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  }

  const isPaid =
    profile?.subscription_tier === "individual" ||
    profile?.subscription_tier === "family";
  const isFamily = profile?.subscription_tier === "family";

  return (
    <AuthContext.Provider
      value={{ user, profile, loading, isPaid, isFamily, signOut, refreshProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
