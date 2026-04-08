"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const { user, profile, loading, isPaid, refreshProfile } = useAuth();
  const router = useRouter();
  const [portalLoading, setPortalLoading] = useState(false);
  const [justSubscribed, setJustSubscribed] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [loading, user, router]);

  // Refresh profile if coming from checkout
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("subscribed") === "true") {
      setJustSubscribed(true);
      window.history.replaceState({}, "", "/dashboard");

      // Poll for subscription activation (webhook may take a few seconds)
      let attempts = 0;
      const interval = setInterval(async () => {
        await refreshProfile();
        attempts++;
        if (attempts >= 10) {
          clearInterval(interval);
        }
      }, 2000);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Clear the banner once the tier updates
  useEffect(() => {
    if (justSubscribed && isPaid) {
      setJustSubscribed(false);
    }
  }, [justSubscribed, isPaid]);

  async function openPortal() {
    setPortalLoading(true);
    try {
      const res = await fetch("/api/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      alert("Something went wrong.");
    }
    setPortalLoading(false);
  }

  if (loading || !user) {
    return (
      <div className="py-16 text-center text-navy-400">Loading...</div>
    );
  }

  const tierLabel =
    profile?.subscription_tier === "family"
      ? "Family"
      : profile?.subscription_tier === "individual"
      ? "Individual"
      : "Free";

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-navy">
              Dashboard
            </h1>
            <p className="text-navy-400 text-sm mt-1">{user.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                isPaid
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-navy-400"
              }`}
            >
              {tierLabel}
            </span>
          </div>
        </div>

        {/* Subscription activating banner */}
        {justSubscribed && !isPaid && (
          <div className="card border-green-300 border-2 bg-green-50/30 mb-8">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-green-600 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <div>
                <p className="font-serif font-semibold text-navy">
                  Payment received! Your subscription is being activated...
                </p>
                <p className="text-sm text-navy-400 mt-0.5">
                  This usually takes just a few seconds.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Upgrade prompt for free users */}
        {!isPaid && !justSubscribed && (
          <div className="card border-red border-2 bg-red-50/30 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif font-semibold text-lg text-navy">
                  Upgrade to Save Your Progress
                </h2>
                <p className="text-sm text-navy-400 mt-1">
                  Get the Family Chain Builder, saved checklists, and cover
                  letter tools starting at $9/month.
                </p>
              </div>
              <Link href="/pricing" className="btn-primary shrink-0">
                View Plans
              </Link>
            </div>
          </div>
        )}

        {/* Quick links */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <Link
            href="/eligibility"
            className="card group hover:shadow-md transition-shadow"
          >
            <h3 className="font-serif font-semibold text-navy group-hover:text-red transition-colors">
              Eligibility Check
            </h3>
            <p className="text-sm text-navy-400 mt-1">
              Determine if you qualify under Bill C-3.
            </p>
          </Link>
          <Link
            href="/family-tree"
            className={`card group hover:shadow-md transition-shadow ${
              !isPaid ? "opacity-60" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-semibold text-navy group-hover:text-red transition-colors">
                Family Chain
              </h3>
              {!isPaid && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-red bg-red-50 px-1.5 py-0.5 rounded">
                  Pro
                </span>
              )}
            </div>
            <p className="text-sm text-navy-400 mt-1">
              Build and save your line of descent.
            </p>
          </Link>
          <Link
            href="/checklist"
            className={`card group hover:shadow-md transition-shadow ${
              !isPaid ? "opacity-60" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-semibold text-navy group-hover:text-red transition-colors">
                Document Checklist
              </h3>
              {!isPaid && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-red bg-red-50 px-1.5 py-0.5 rounded">
                  Pro
                </span>
              )}
            </div>
            <p className="text-sm text-navy-400 mt-1">
              Track the documents you&apos;ve gathered.
            </p>
          </Link>
          <Link
            href="/vault"
            className={`card group hover:shadow-md transition-shadow ${
              !isPaid ? "opacity-60" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-semibold text-navy group-hover:text-red transition-colors">
                Document Vault
              </h3>
              {!isPaid && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-red bg-red-50 px-1.5 py-0.5 rounded">
                  Pro
                </span>
              )}
            </div>
            <p className="text-sm text-navy-400 mt-1">
              Track, organize &amp; upload your documents.
            </p>
          </Link>
          <Link
            href="/guide"
            className="card group hover:shadow-md transition-shadow"
          >
            <h3 className="font-serif font-semibold text-navy group-hover:text-red transition-colors">
              Application Guide
            </h3>
            <p className="text-sm text-navy-400 mt-1">
              Step-by-step application walkthrough.
            </p>
          </Link>
        </div>

        {/* Subscription management */}
        {isPaid && (
          <div className="card">
            <h2 className="font-serif font-semibold text-navy mb-2">
              Subscription
            </h2>
            <p className="text-sm text-navy-400 mb-4">
              You&apos;re on the <strong>{tierLabel}</strong> plan. Manage your
              billing, update your payment method, or cancel through Stripe.
            </p>
            <button
              onClick={openPortal}
              disabled={portalLoading}
              className="btn-outline text-sm disabled:opacity-50"
            >
              {portalLoading ? "Loading..." : "Manage Subscription"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
