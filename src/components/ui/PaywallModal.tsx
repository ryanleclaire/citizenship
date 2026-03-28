"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PaywallModal({ isOpen, onClose }: PaywallModalProps) {
  const { user } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-8 animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-navy-300 hover:text-navy transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-serif font-bold text-navy mb-2">
            Subscribe to Save Your Progress
          </h2>
          <p className="text-navy-400 text-sm mb-6">
            Keep your family chain, document checklist, and cover letter saved
            across sessions. Pick up right where you left off.
          </p>

          <div className="space-y-3">
            <Link
              href="/pricing"
              className="btn-primary w-full block text-center"
            >
              View Plans — Starting at $9/mo
            </Link>
            {!user && (
              <Link
                href="/auth/signup"
                className="btn-outline w-full block text-center"
              >
                Create Free Account
              </Link>
            )}
          </div>

          <p className="text-xs text-navy-300 mt-4">
            Cancel anytime. No commitment.
          </p>
        </div>
      </div>
    </div>
  );
}
