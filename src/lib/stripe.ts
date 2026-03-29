import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
  typescript: true,
});

export const PLANS = {
  individual: {
    name: "Individual",
    priceId: process.env.STRIPE_INDIVIDUAL_PRICE_ID!,
    price: "$9",
    period: "month",
    features: [
      "Family Chain Builder (save & edit)",
      "Document checklist (save progress)",
      "Cover letter builder",
      "PDF export",
      "1 application",
    ],
  },
  family: {
    name: "Family",
    priceId: process.env.STRIPE_FAMILY_PRICE_ID!,
    price: "$14",
    period: "month",
    features: [
      "Everything in Individual",
      "Up to 10 family member applications",
      "Manage all applications from one account",
    ],
  },
} as const;

export type PlanType = keyof typeof PLANS;

export const PLAN_APPLICATION_LIMITS: Record<string, number> = {
  free: 0,
  individual: 1,
  family: 10,
};
