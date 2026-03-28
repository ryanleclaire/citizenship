"use client";

import Link from "next/link";
import { type Outcome, type Generation, outcomeDetails } from "@/lib/eligibility";

interface WizardOutcomeProps {
  outcome: Outcome;
  generation: Generation | null;
  onRestart: () => void;
}

export default function WizardOutcome({ outcome, generation, onRestart }: WizardOutcomeProps) {
  const info = outcomeDetails[outcome];
  const isEligible = outcome === "A" || outcome === "B" || outcome === "C" || outcome === "D";
  const needsResearch = outcome === "E";

  return (
    <div className="animate-fadeIn">
      {/* Status badge */}
      <div className="mb-6">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            isEligible
              ? "bg-sage-100 text-sage-700"
              : needsResearch
              ? "bg-amber-100 text-amber-700"
              : "bg-cream-200 text-navy-400"
          }`}
        >
          {isEligible
            ? "Likely Eligible"
            : needsResearch
            ? "More Research Needed"
            : outcome === "G"
            ? "Not Yet Eligible"
            : "Not Eligible by Descent"}
        </span>
        {generation && (
          <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-navy-100 text-navy-600">
            {generation}
          </span>
        )}
      </div>

      {/* Title & description */}
      <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">{info.title}</h2>
      <p className="text-navy-400 mb-6 leading-relaxed">{info.description}</p>

      {/* Details */}
      {info.details.length > 0 && (
        <div className="card mb-6">
          <h3 className="font-semibold mb-3">Important Details</h3>
          <ul className="space-y-2">
            {info.details.map((detail, i) => (
              <li key={i} className="flex gap-3 text-sm text-navy-400">
                <span className="w-1.5 h-1.5 bg-navy-300 rounded-full mt-2 shrink-0" />
                {detail}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Next steps */}
      <div className="card bg-sage-50/50 border-sage-200 mb-6">
        <h3 className="font-semibold mb-3">Next Steps</h3>
        <ol className="space-y-2">
          {info.nextSteps.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm text-navy-400">
              <span className="w-6 h-6 bg-sage-200 rounded-full flex items-center justify-center text-xs font-bold text-sage-700 shrink-0">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      {/* Flags */}
      {info.paperApplication && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-sm">
          <strong className="text-amber-800">Paper application strongly recommended.</strong>{" "}
          <span className="text-amber-700">
            The IRCC online portal was not designed for multi-generational Bill C-3 claims. A paper
            submission lets you include your full documentary chain and a cover letter.
          </span>
        </div>
      )}

      {info.legalCounselRecommended && (
        <div className="bg-maple-50 border border-maple-200 rounded-lg p-4 mb-6 text-sm">
          <strong className="text-maple-700">Legal counsel recommended.</strong>{" "}
          <span className="text-maple-600">
            Due to the complexity of your case, consider consulting a licensed immigration lawyer or RCIC.
          </span>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        {isEligible && (
          <>
            <Link href="/checklist" className="btn-primary">
              Build Your Document Checklist
            </Link>
            <Link href="/guide" className="btn-secondary">
              View Step-by-Step Guide
            </Link>
          </>
        )}
        <button onClick={onRestart} className="btn-outline">
          Start Over
        </button>
      </div>
    </div>
  );
}
