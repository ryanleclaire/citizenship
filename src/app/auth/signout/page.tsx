"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SignOutPage() {
  useEffect(() => {
    const supabase = createClient();
    // Redirect after 2s even if signOut hangs
    const timeout = setTimeout(() => {
      window.location.href = "/";
    }, 2000);
    supabase.auth.signOut().finally(() => {
      clearTimeout(timeout);
      window.location.href = "/";
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg text-gray-600">Signing out...</p>
    </div>
  );
}
