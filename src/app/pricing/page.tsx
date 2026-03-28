"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

const plans = [
  {
    key: "individual" as const,
    name: "Individual",
    price: "$9",
    period: "/month",
    description: "Everything you need to complete your application.",
    features: [
      "Family Chain Builder — save & edit",
      "Document checklist — save progress",
      "Cover letter builder",
      "PDF export of chain & checklist",
      "1 application per account",
      "Cancel anytime",
    ],
    highlight: true,
  },
  {
    key: "family" as const,
    name: "Family",
    price: "$14",
    period: "/month",
    description: "For families applying together.",
    features: [
      "Everything in Individual",
      "Unlimited family member applications",
      "Manage all applications from one account",
      "Cancel anytime",
    ],
    highlight: false,
  },
];

export default function PricingPage() {
  const { user, isPaid } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  async function handleSubscribe(plan: "individual" | "family") {
    if (!user) {
      router.push("/auth/signup");
      return;
    }

    setLoading(plan);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    }
    setLoading(null);
  }

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-navy mb-3">
            Unlock Your Full Application Toolkit
          </h1>
          <p className="text-navy-400 max-w-2xl mx-auto">
            Save your family chain, track your documents, and get step-by-step
            guidance through your entire citizenship application.
          </p>
        </div>

        {/* Free tier callout */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 text-sm text-navy-400">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Eligibility check, FAQ, guide & resources are always free
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.key}
              className={`card relative ${
                plan.highlight
                  ? "border-red border-2 shadow-md"
                  : "border-gray-200"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Most Popular
                </div>
              )}
              <h2 className="text-2xl font-serif font-bold text-navy mb-1">
                {plan.name}
              </h2>
              <p className="text-navy-400 text-sm mb-4">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-navy">{plan.price}</span>
                <span className="text-navy-400">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2 text-sm text-navy-400">
                    <svg className="w-5 h-5 text-red shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSubscribe(plan.key)}
                disabled={loading !== null || isPaid}
                className={`w-full py-3 rounded-lg font-medium transition-colors disabled:opacity-50 ${
                  plan.highlight
                    ? "bg-red text-white hover:bg-red-700"
                    : "bg-navy text-white hover:bg-navy-700"
                }`}
              >
                {isPaid
                  ? "Already Subscribed"
                  : loading === plan.key
                  ? "Redirecting..."
                  : `Get ${plan.name}`}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
