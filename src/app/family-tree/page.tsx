"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import {
  type ChainPerson,
  buildChain,
  getDocumentsForPerson,
} from "@/lib/family-chain";

const chainOptions = [
  { generations: 1, label: "G1", desc: "Parent is the anchor (born in Canada)" },
  { generations: 2, label: "G2", desc: "Grandparent is the anchor" },
  { generations: 3, label: "G3", desc: "Great-grandparent is the anchor" },
  { generations: 4, label: "G4", desc: "Great-great-grandparent is the anchor" },
  { generations: 5, label: "G5", desc: "Great-great-great-grandparent is the anchor" },
];

// Serialize chain for saving (convert Set to Array)
function serializeChain(chain: ChainPerson[]) {
  return chain.map((p) => ({
    ...p,
    checkedDocs: Array.from(p.checkedDocs),
  }));
}

// Deserialize chain from DB (convert Array back to Set)
function deserializeChain(data: unknown[]): ChainPerson[] {
  return (data as Record<string, unknown>[]).map((p) => ({
    ...p,
    checkedDocs: new Set((p.checkedDocs as string[]) || []),
  })) as unknown as ChainPerson[];
}

export default function FamilyTreePage() {
  const { user, isPaid } = useAuth();
  const [chain, setChain] = useState<ChainPerson[] | null>(null);
  const [, setSelectedCount] = useState<number | null>(null);
  const [appId, setAppId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [loadingApp, setLoadingApp] = useState(true);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load existing application for paid users
  useEffect(() => {
    if (!user || !isPaid) {
      setLoadingApp(false);
      return;
    }
    async function loadApp() {
      try {
        const res = await fetch("/api/applications");
        const data = await res.json();
        if (data.applications?.length > 0) {
          const app = data.applications[0];
          setAppId(app.id);
          if (app.chain_data?.length > 0) {
            setChain(deserializeChain(app.chain_data));
            setSelectedCount(app.chain_data.length - 1);
          }
        }
      } catch {
        // silently fail
      }
      setLoadingApp(false);
    }
    loadApp();
  }, [user, isPaid]);

  // Auto-save when chain changes (debounced)
  useEffect(() => {
    if (!chain || !isPaid || !user) return;

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      saveChain(chain);
    }, 1500);

    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain, isPaid, user]);

  async function saveChain(chainToSave: ChainPerson[]) {
    setSaving(true);
    const serialized = serializeChain(chainToSave);
    const generation = `G${chainToSave.length - 1}`;

    try {
      if (appId) {
        // Update existing
        await fetch(`/api/applications/${appId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chain_data: serialized, generation }),
        });
      } else {
        // Create new
        const res = await fetch("/api/applications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "My Application",
            chain_data: serialized,
            generation,
          }),
        });
        const data = await res.json();
        if (data.application?.id) {
          setAppId(data.application.id);
        }
      }
      setLastSaved(new Date().toLocaleTimeString());
    } catch {
      // silently fail
    }
    setSaving(false);
  }

  function startChain(generationCount: number) {
    setSelectedCount(generationCount);
    setChain(buildChain(generationCount));
  }

  const updatePerson = useCallback(
    (index: number, updates: Partial<ChainPerson>) => {
      setChain((prev) => {
        if (!prev) return prev;
        const next = [...prev];
        next[index] = { ...next[index], ...updates };
        return next;
      });
    },
    []
  );

  const toggleDoc = useCallback((personIndex: number, docId: string) => {
    setChain((prev) => {
      if (!prev) return prev;
      const next = [...prev];
      const person = { ...next[personIndex] };
      const checkedDocs = new Set(person.checkedDocs);
      if (checkedDocs.has(docId)) checkedDocs.delete(docId);
      else checkedDocs.add(docId);
      person.checkedDocs = checkedDocs;
      next[personIndex] = person;
      return next;
    });
  }, []);

  // Calculate overall progress
  const totalDocs = chain
    ? chain.reduce((sum, p) => sum + getDocumentsForPerson(p).length, 0)
    : 0;
  const checkedDocs = chain
    ? chain.reduce((sum, p) => sum + p.checkedDocs.size, 0)
    : 0;

  if (loadingApp) {
    return <div className="py-16 text-center text-navy-400">Loading...</div>;
  }

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3 text-navy">
          Family Chain Builder
        </h1>
        <p className="text-navy-400 mb-8">
          Map your line of descent from your Canadian ancestor to you, and track
          the documents needed for each person in the chain. Not sure how many
          generations?{" "}
          <Link href="/eligibility" className="text-red hover:underline font-medium">
            Check your eligibility first.
          </Link>
        </p>

        {/* Generation selector */}
        {!chain && (
          <div>
            <label className="block text-sm font-medium mb-3 text-navy">
              How many generations separate you from your Canadian ancestor?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {chainOptions.map((opt) => (
                <button
                  key={opt.generations}
                  onClick={() => startChain(opt.generations)}
                  className="p-3 rounded-lg border-2 border-gray-200 bg-white hover:border-red text-center transition-all"
                >
                  <span className="block font-bold text-lg text-navy">{opt.label}</span>
                  <span className="block text-[11px] text-navy-400 leading-tight mt-0.5">
                    {opt.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chain display */}
        {chain && (
          <div className="animate-fadeIn">
            {/* Progress bar */}
            <div className="card mb-8">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="font-serif font-semibold text-lg text-navy">
                    Document Progress
                  </h2>
                  <p className="text-sm text-navy-400 mt-0.5">
                    {checkedDocs} of {totalDocs} documents obtained
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {isPaid && (
                    <span className="text-xs text-navy-300">
                      {saving ? "Saving..." : lastSaved ? `Saved ${lastSaved}` : ""}
                    </span>
                  )}
                  <button
                    onClick={() => {
                      setChain(null);
                      setSelectedCount(null);
                    }}
                    className="text-sm text-navy-400 hover:text-red transition-colors"
                  >
                    Start over
                  </button>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="h-3 rounded-full transition-all duration-500 bg-red"
                  style={{
                    width: `${totalDocs > 0 ? (checkedDocs / totalDocs) * 100 : 0}%`,
                  }}
                />
              </div>
              {checkedDocs === totalDocs && totalDocs > 0 && (
                <p className="mt-3 text-sm text-green-600 font-medium">
                  All documents obtained! Ready to{" "}
                  <Link href="/guide" className="text-red hover:underline">
                    submit your application
                  </Link>.
                </p>
              )}
            </div>

            {/* Chain */}
            <div className="relative">
              {chain.map((person, index) => (
                <div key={person.id}>
                  <PersonCard
                    person={person}
                    onUpdate={(updates) => updatePerson(index, updates)}
                    onToggleDoc={(docId) => toggleDoc(index, docId)}
                  />
                  {/* Connector line */}
                  {index < chain.length - 1 && (
                    <div className="flex justify-center py-1">
                      <div className="w-0.5 h-8 bg-gray-300" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Next steps */}
            <div className="mt-10 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
              <Link href="/cover-letter" className="btn-primary">
                Draft a Cover Letter
              </Link>
              {isPaid && (
                <Link href="/vault" className="btn-outline">
                  Open Document Vault
                </Link>
              )}
              <Link href="/guide" className="btn-outline">
                View Application Guide
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PersonCard({
  person,
  onUpdate,
  onToggleDoc,
}: {
  person: ChainPerson;
  onUpdate: (updates: Partial<ChainPerson>) => void;
  onToggleDoc: (docId: string) => void;
}
) {
  const docs = getDocumentsForPerson(person);
  const completedDocs = docs.filter((d) => person.checkedDocs.has(d.id)).length;
  const allComplete = completedDocs === docs.length;

  const roleColors = {
    anchor: "border-red bg-red",
    intermediate: "border-navy bg-navy",
    applicant: "border-red bg-red",
  };

  const roleLabels = {
    anchor: "Anchor \u2014 Born/Naturalized in Canada",
    intermediate: "Born Abroad",
    applicant: "Applicant \u2014 Born Abroad",
  };

  return (
    <div
      className={`card transition-all ${
        allComplete ? "border-green-300 bg-green-50/30" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 ${roleColors[person.role]}`}
        >
          {person.generationLabel}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-semibold text-lg text-navy">
              {person.relationLabel}
            </h3>
            <span className="text-xs text-navy-300">
              {completedDocs}/{docs.length} docs
            </span>
          </div>
          <p className="text-xs text-navy-400">{roleLabels[person.role]}</p>
        </div>
      </div>

      {/* Person info fields */}
      <div className="grid sm:grid-cols-3 gap-3 mb-4">
        <div>
          <label className="block text-xs font-medium text-navy-400 mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={person.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            placeholder={person.role === "applicant" ? "Your full name" : "Full legal name"}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red bg-white text-navy"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-navy-400 mb-1">
            Birth Place
          </label>
          <input
            type="text"
            value={person.birthPlace}
            onChange={(e) => onUpdate({ birthPlace: e.target.value })}
            placeholder={person.role === "anchor" ? "City, Province, Canada" : "City, State/Country"}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red bg-white text-navy"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-navy-400 mb-1">
            Birth Year
          </label>
          <input
            type="text"
            value={person.birthYear}
            onChange={(e) => onUpdate({ birthYear: e.target.value })}
            placeholder="e.g. 1952"
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red bg-white text-navy"
          />
        </div>
      </div>

      {/* Deceased toggle (not for applicant) */}
      {person.role !== "applicant" && (
        <label className="flex items-center gap-2 mb-4 cursor-pointer text-sm text-navy-400">
          <input
            type="checkbox"
            checked={person.isDeceased}
            onChange={(e) => onUpdate({ isDeceased: e.target.checked })}
            className="h-4 w-4 rounded border-gray-300 accent-red"
          />
          This person is deceased
        </label>
      )}

      {/* Document checklist */}
      <div className="border-t border-gray-100 pt-4">
        <p className="text-xs font-medium text-navy-400 uppercase tracking-wide mb-3">
          Required Documents
        </p>
        <div className="space-y-2">
          {docs.map((doc) => {
            const checked = person.checkedDocs.has(doc.id);
            return (
              <label
                key={doc.id}
                className={`flex gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  checked
                    ? "border-green-300 bg-green-50/50"
                    : "border-gray-100 bg-gray-50 hover:border-gray-200"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggleDoc(doc.id)}
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-red shrink-0"
                />
                <div>
                  <span
                    className={`text-sm font-medium ${
                      checked ? "line-through text-navy-300" : "text-navy"
                    }`}
                  >
                    {doc.label}
                  </span>
                  {!doc.required && (
                    <span className="ml-2 text-[10px] font-bold uppercase tracking-wider text-navy-300 bg-gray-100 px-1.5 py-0.5 rounded">
                      Recommended
                    </span>
                  )}
                  <p className="text-xs text-navy-400 mt-0.5">{doc.description}</p>
                </div>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
