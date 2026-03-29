"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";

type Gender = "male" | "female" | "";

interface ChainEntry {
  role: "anchor" | "intermediate" | "applicant";
  generationLabel: string;
  relationLabel: string;
  name: string;
  birthPlace: string;
  birthYear: string;
  gender: Gender;
  isDeceased: boolean;
}

const RELATION_LABELS_M: Record<number, string> = {
  0: "You (Applicant)",
  1: "Father",
  2: "Grandfather",
  3: "Great-Grandfather",
  4: "Great-Great-Grandfather",
  5: "Great-Great-Great-Grandfather",
};

const RELATION_LABELS_F: Record<number, string> = {
  0: "You (Applicant)",
  1: "Mother",
  2: "Grandmother",
  3: "Great-Grandmother",
  4: "Great-Great-Grandmother",
  5: "Great-Great-Great-Grandmother",
};

const RELATION_LABELS_NEUTRAL: Record<number, string> = {
  0: "You (Applicant)",
  1: "Parent",
  2: "Grandparent",
  3: "Great-Grandparent",
  4: "Great-Great-Grandparent",
  5: "Great-Great-Great-Grandparent",
};

function getRelationLabel(distance: number, gender: Gender): string {
  if (gender === "male") return RELATION_LABELS_M[distance] || `${distance}x Great-Grandfather`;
  if (gender === "female") return RELATION_LABELS_F[distance] || `${distance}x Great-Grandmother`;
  return RELATION_LABELS_NEUTRAL[distance] || `${distance}x Great-Grandparent`;
}

function buildEmptyChain(generations: number): ChainEntry[] {
  const chain: ChainEntry[] = [];
  chain.push({
    role: "anchor",
    generationLabel: "G0",
    relationLabel: getRelationLabel(generations, ""),
    name: "",
    birthPlace: "",
    birthYear: "",
    gender: "",
    isDeceased: false,
  });
  for (let i = 1; i < generations; i++) {
    chain.push({
      role: "intermediate",
      generationLabel: `G${i}`,
      relationLabel: getRelationLabel(generations - i, ""),
      name: "",
      birthPlace: "",
      birthYear: "",
      gender: "",
      isDeceased: false,
    });
  }
  chain.push({
    role: "applicant",
    generationLabel: `G${generations}`,
    relationLabel: "You (Applicant)",
    name: "",
    birthPlace: "",
    birthYear: "",
    gender: "",
    isDeceased: false,
  });
  return chain;
}

export default function CoverLetterPage() {
  const { user, isPaid } = useAuth();
  const [generations, setGenerations] = useState<number | null>(null);
  const [chain, setChain] = useState<ChainEntry[]>([]);
  const [applicantAddress, setApplicantAddress] = useState("");
  const [nameDiscrepancies, setNameDiscrepancies] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function selectGenerations(gen: number) {
    setGenerations(gen);
    setChain(buildEmptyChain(gen));
    setCoverLetter("");
    setError("");
  }

  function updateChainPerson(index: number, field: keyof ChainEntry, value: string | boolean) {
    setChain((prev) => {
      const next = [...prev];
      const person = { ...next[index], [field]: value };
      // Recalculate relation label when gender changes
      if (field === "gender" && person.role !== "applicant" && generations) {
        const distance = person.role === "anchor" ? generations : generations - index;
        person.relationLabel = getRelationLabel(distance, person.gender);
      }
      next[index] = person;
      return next;
    });
  }

  async function generateCoverLetter() {
    setLoading(true);
    setError("");
    setCoverLetter("");

    try {
      const res = await fetch("/api/cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chain,
          applicantAddress,
          nameDiscrepancies,
          additionalNotes,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
      } else {
        setCoverLetter(data.coverLetter);
      }
    } catch {
      setError("Failed to connect. Please check your connection and try again.");
    }

    setLoading(false);
  }

  const canGenerate = chain.length >= 2 && chain[0].name && chain[chain.length - 1].name;

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3">
          Cover Letter Drafter
        </h1>
        <p className="text-navy-400 mb-8">
          Generate a personalized cover letter for your CIT 0001 application. The letter maps your
          family tree, cites the applicable legal section, and explains your documentation &mdash;
          making the IRCC officer&apos;s job easier and your application stronger.
        </p>

        {/* Not logged in or not paid */}
        {!user && (
          <div className="card border-red border-2 bg-red-50/30 mb-8">
            <h2 className="font-serif font-semibold text-lg text-navy mb-2">
              Sign in to use the Cover Letter Drafter
            </h2>
            <p className="text-sm text-navy-400 mb-4">
              This feature requires a paid subscription.
            </p>
            <div className="flex gap-3">
              <Link href="/auth/login" className="btn-primary">Log In</Link>
              <Link href="/pricing" className="btn-outline">View Plans</Link>
            </div>
          </div>
        )}

        {user && !isPaid && (
          <div className="card border-red border-2 bg-red-50/30 mb-8">
            <h2 className="font-serif font-semibold text-lg text-navy mb-2">
              Upgrade to Draft Cover Letters
            </h2>
            <p className="text-sm text-navy-400 mb-4">
              The AI Cover Letter Drafter is available on Individual and Family plans.
            </p>
            <Link href="/pricing" className="btn-primary">View Plans &mdash; Starting at $9/mo</Link>
          </div>
        )}

        {/* What makes a good cover letter */}
        {!coverLetter && (
          <div className="card mb-8">
            <h2 className="font-serif font-semibold text-navy mb-3">What your cover letter will include</h2>
            <ul className="space-y-2 text-sm text-navy-400">
              <li className="flex gap-3">
                <span className="w-1.5 h-1.5 bg-red rounded-full mt-2 shrink-0" />
                A clear family tree from your Canadian ancestor (G0) down to you
              </li>
              <li className="flex gap-3">
                <span className="w-1.5 h-1.5 bg-red rounded-full mt-2 shrink-0" />
                The specific legal section that makes you eligible (e.g., s. 3(1)(g))
              </li>
              <li className="flex gap-3">
                <span className="w-1.5 h-1.5 bg-red rounded-full mt-2 shrink-0" />
                A document index listing every item in your application package
              </li>
              <li className="flex gap-3">
                <span className="w-1.5 h-1.5 bg-red rounded-full mt-2 shrink-0" />
                Proactive explanations for name discrepancies, deceased ancestors, or special circumstances
              </li>
            </ul>
          </div>
        )}

        {/* Form */}
        {user && isPaid && !coverLetter && (
          <>
            {/* Generation selector */}
            {!generations && (
              <section className="mb-8">
                <h2 className="text-xl font-serif font-semibold text-navy mb-3">
                  How many generations in your chain?
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((gen) => (
                    <button
                      key={gen}
                      onClick={() => selectGenerations(gen)}
                      className="p-3 rounded-lg border-2 border-gray-200 bg-white hover:border-red text-center transition-all"
                    >
                      <span className="block font-bold text-lg text-navy">G{gen}</span>
                      <span className="block text-[11px] text-navy-400 leading-tight mt-0.5">
                        {gen === 1 && "Parent is anchor"}
                        {gen === 2 && "Grandparent"}
                        {gen === 3 && "Great-grandparent"}
                        {gen === 4 && "Great-great-grandparent"}
                        {gen === 5 && "5th generation"}
                      </span>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Chain form */}
            {generations && (
              <>
                <section className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xl font-serif font-semibold text-navy">
                      Your Family Chain
                    </h2>
                    <button
                      onClick={() => { setGenerations(null); setChain([]); }}
                      className="text-sm text-navy-400 hover:text-red"
                    >
                      Change generations
                    </button>
                  </div>
                  <div className="space-y-4">
                    {chain.map((person, index) => (
                      <div key={index} className="card">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0 ${
                            person.role === "anchor" || person.role === "applicant" ? "bg-red" : "bg-navy"
                          }`}>
                            {person.generationLabel}
                          </div>
                          <div>
                            <p className="font-semibold text-navy text-sm">{person.relationLabel}</p>
                            <p className="text-xs text-navy-400">
                              {person.role === "anchor" && "Born/naturalized in Canada"}
                              {person.role === "intermediate" && "Born abroad"}
                              {person.role === "applicant" && "You \u2014 born abroad"}
                            </p>
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={person.name}
                            onChange={(e) => updateChainPerson(index, "name", e.target.value)}
                            placeholder="Full legal name"
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red bg-white text-navy"
                          />
                          {person.role !== "applicant" && (
                            <select
                              value={person.gender}
                              onChange={(e) => updateChainPerson(index, "gender", e.target.value)}
                              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red bg-white text-navy"
                            >
                              <option value="">Relationship...</option>
                              <option value="male">{getRelationLabel(person.role === "anchor" ? generations! : generations! - index, "male")}</option>
                              <option value="female">{getRelationLabel(person.role === "anchor" ? generations! : generations! - index, "female")}</option>
                            </select>
                          )}
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3 mt-3">
                          <input
                            type="text"
                            value={person.birthPlace}
                            onChange={(e) => updateChainPerson(index, "birthPlace", e.target.value)}
                            placeholder={person.role === "anchor" ? "City, Province, Canada" : "City, State/Country"}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red bg-white text-navy"
                          />
                          <input
                            type="text"
                            value={person.birthYear}
                            onChange={(e) => updateChainPerson(index, "birthYear", e.target.value)}
                            placeholder="Birth year"
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red bg-white text-navy"
                          />
                        </div>
                        {person.role !== "applicant" && (
                          <label className="flex items-center gap-2 mt-3 cursor-pointer text-sm text-navy-400">
                            <input
                              type="checkbox"
                              checked={person.isDeceased}
                              onChange={(e) => updateChainPerson(index, "isDeceased", e.target.checked)}
                              className="h-4 w-4 rounded border-gray-300 accent-red"
                            />
                            This person is deceased
                          </label>
                        )}
                      </div>
                    ))}
                  </div>
                </section>

                {/* Additional info */}
                <section className="mb-8 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">
                      Your mailing address (for the letter header)
                    </label>
                    <textarea
                      value={applicantAddress}
                      onChange={(e) => setApplicantAddress(e.target.value)}
                      placeholder="123 Main Street&#10;City, State ZIP&#10;Country"
                      rows={3}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red bg-white text-navy"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">
                      Name discrepancies or documentation notes
                    </label>
                    <textarea
                      value={nameDiscrepancies}
                      onChange={(e) => setNameDiscrepancies(e.target.value)}
                      placeholder='e.g., "My grandmother appears as Mary Smith on her birth certificate but Mary Jones on my father&apos;s birth certificate due to marriage."'
                      rows={3}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red bg-white text-navy"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">
                      Additional notes or special circumstances
                    </label>
                    <textarea
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      placeholder="e.g., Quebec ancestry, missing records, adopted, etc."
                      rows={3}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red bg-white text-navy"
                    />
                  </div>
                </section>

                {/* Generate button */}
                <div className="mb-8">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm mb-4">
                      {error}
                    </div>
                  )}
                  <button
                    onClick={generateCoverLetter}
                    disabled={loading || !canGenerate}
                    className="btn-primary w-full disabled:opacity-50"
                  >
                    {loading ? "Generating your cover letter..." : "Generate Cover Letter"}
                  </button>
                  {!canGenerate && (
                    <p className="text-xs text-navy-400 mt-2 text-center">
                      Please enter at least the anchor ancestor&apos;s and applicant&apos;s names to generate.
                    </p>
                  )}
                </div>
              </>
            )}
          </>
        )}

        {/* Generated cover letter */}
        {coverLetter && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-serif font-semibold text-navy">
                Your Cover Letter
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(coverLetter);
                  }}
                  className="btn-outline text-sm"
                >
                  Copy to Clipboard
                </button>
                <button
                  onClick={() => setCoverLetter("")}
                  className="text-sm text-navy-400 hover:text-red px-3 py-2"
                >
                  Edit &amp; Regenerate
                </button>
              </div>
            </div>
            <div className="card">
              <div className="prose prose-sm max-w-none text-navy-400 whitespace-pre-wrap font-mono text-xs leading-relaxed">
                {coverLetter}
              </div>
            </div>
            <div className="bg-navy/5 rounded-lg p-4 mt-4">
              <p className="text-sm text-navy-400">
                <strong className="text-navy">Important:</strong> Review this letter carefully before including it in your application.
                Verify all names, dates, and legal section references are accurate. Replace any [BRACKETED PLACEHOLDERS]
                with your actual information. This is a draft to help you get started &mdash; not legal advice.
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
