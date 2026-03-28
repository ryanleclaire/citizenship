"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { type Generation } from "@/lib/eligibility";
import {
  type DocumentItem,
  type DocumentCategory,
  getDocumentChecklist,
  getConditionalSections,
  CATEGORY_LABELS,
} from "@/lib/documents";

const generations: { value: Generation; label: string; desc: string }[] = [
  { value: "G1", label: "G1", desc: "Parent born in Canada" },
  { value: "G2", label: "G2", desc: "Grandparent born in Canada" },
  { value: "G3", label: "G3", desc: "Great-grandparent born in Canada" },
  { value: "G4", label: "G4", desc: "Great-great-grandparent born in Canada" },
  { value: "G5+", label: "G5+", desc: "Further back" },
];

function CheckboxItem({
  doc,
  checked,
  onToggle,
}: {
  doc: DocumentItem;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`p-4 rounded-lg border-2 transition-colors ${
        checked
          ? "border-sage-400 bg-sage-50/50"
          : "border-cream-300 bg-white"
      }`}
    >
      <label className="flex gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={onToggle}
          className="mt-1 h-5 w-5 rounded border-cream-300 text-sage accent-sage shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <span
              className={`font-medium ${
                checked ? "line-through text-navy-300" : ""
              }`}
            >
              {doc.label}
            </span>
            {doc.required ? (
              <span className="text-[10px] font-bold uppercase tracking-wider text-maple bg-maple-50 px-1.5 py-0.5 rounded shrink-0">
                Required
              </span>
            ) : (
              <span className="text-[10px] font-bold uppercase tracking-wider text-sage-600 bg-sage-100 px-1.5 py-0.5 rounded shrink-0">
                Recommended
              </span>
            )}
          </div>
          <p className="text-sm text-navy-400 mt-1">{doc.description}</p>
          <p className="text-xs text-navy-300 mt-0.5">For: {doc.forPerson}</p>
          {doc.tip && (
            <div className="mt-2 bg-cream-100 rounded px-3 py-2 text-xs text-navy-400">
              <strong className="text-navy-500">Tip:</strong> {doc.tip}
            </div>
          )}
        </div>
      </label>
    </div>
  );
}

function CategoryGroup({
  category,
  docs,
  checkedIds,
  onToggle,
}: {
  category: DocumentCategory;
  docs: DocumentItem[];
  checkedIds: Set<string>;
  onToggle: (id: string) => void;
}) {
  const completed = docs.filter((d) => checkedIds.has(d.id)).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-serif font-semibold text-lg">
          {CATEGORY_LABELS[category]}
        </h3>
        <span className="text-xs text-navy-400">
          {completed}/{docs.length} complete
        </span>
      </div>
      <div className="space-y-3">
        {docs.map((doc) => (
          <CheckboxItem
            key={doc.id}
            doc={doc}
            checked={checkedIds.has(doc.id)}
            onToggle={() => onToggle(doc.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default function ChecklistPage() {
  const [selectedGen, setSelectedGen] = useState<Generation | null>(null);
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
  const [activeConditionals, setActiveConditionals] = useState<Set<string>>(
    new Set()
  );

  const docs = useMemo(
    () => (selectedGen ? getDocumentChecklist(selectedGen) : []),
    [selectedGen]
  );

  const conditionalSections = useMemo(
    () => (selectedGen ? getConditionalSections(selectedGen) : []),
    [selectedGen]
  );

  const conditionalDocs = useMemo(
    () =>
      conditionalSections
        .filter((s) => activeConditionals.has(s.id))
        .flatMap((s) => s.documents),
    [conditionalSections, activeConditionals]
  );

  const allDocs = useMemo(() => [...docs, ...conditionalDocs], [docs, conditionalDocs]);

  const grouped = useMemo(() => {
    const map = new Map<DocumentCategory, DocumentItem[]>();
    for (const doc of docs) {
      const list = map.get(doc.category) || [];
      list.push(doc);
      map.set(doc.category, list);
    }
    return map;
  }, [docs]);

  function toggleCheck(id: string) {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleConditional(id: string) {
    setActiveConditionals((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const totalRequired = allDocs.filter((d) => d.required).length;
  const completedRequired = allDocs.filter(
    (d) => d.required && checkedIds.has(d.id)
  ).length;
  const totalAll = allDocs.length;
  const completedAll = allDocs.filter((d) => checkedIds.has(d.id)).length;

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3">
          Document Checklist
        </h1>
        <p className="text-navy-400 mb-8">
          Select your generation to get a personalized checklist of every
          document you need. Not sure?{" "}
          <Link
            href="/eligibility"
            className="text-maple hover:underline font-medium"
          >
            Check your eligibility first.
          </Link>
        </p>

        {/* Generation selector */}
        <div className="mb-10">
          <label className="block text-sm font-medium mb-3">
            What is your generation?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {generations.map((g) => (
              <button
                key={g.value}
                onClick={() => {
                  setSelectedGen(g.value);
                  setCheckedIds(new Set());
                  setActiveConditionals(new Set());
                }}
                className={`p-3 rounded-lg border-2 text-center transition-all ${
                  selectedGen === g.value
                    ? "border-maple bg-maple-50 text-maple-700"
                    : "border-cream-300 bg-white hover:border-navy-200"
                }`}
              >
                <span className="block font-bold text-lg">{g.label}</span>
                <span className="block text-[11px] text-navy-400 leading-tight mt-0.5">
                  {g.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Checklist */}
        {selectedGen && (
          <div className="animate-fadeIn">
            {/* Progress summary */}
            <div className="card mb-8">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="font-serif font-semibold text-lg">
                    Your {selectedGen} Checklist
                  </h2>
                  <p className="text-sm text-navy-400 mt-0.5">
                    {completedRequired} of {totalRequired} required documents
                    checked off
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-navy">
                    {completedAll}/{totalAll}
                  </span>
                  <p className="text-xs text-navy-300">total</p>
                </div>
              </div>
              <div className="w-full bg-cream-200 rounded-full h-3">
                <div
                  className="h-3 rounded-full transition-all duration-500 bg-sage"
                  style={{
                    width: `${totalAll > 0 ? (completedAll / totalAll) * 100 : 0}%`,
                  }}
                />
              </div>
              {completedAll === totalAll && totalAll > 0 && (
                <p className="mt-3 text-sm text-sage-600 font-medium">
                  All documents checked off! Ready to move on to the{" "}
                  <Link
                    href="/guide"
                    className="text-maple hover:underline"
                  >
                    application guide
                  </Link>
                  .
                </p>
              )}
            </div>

            {/* Document groups */}
            <div className="space-y-10">
              {(
                ["application", "identity", "chain"] as DocumentCategory[]
              ).map((cat) => {
                const catDocs = grouped.get(cat);
                if (!catDocs || catDocs.length === 0) return null;
                return (
                  <CategoryGroup
                    key={cat}
                    category={cat}
                    docs={catDocs}
                    checkedIds={checkedIds}
                    onToggle={toggleCheck}
                  />
                );
              })}
            </div>

            {/* Conditional sections */}
            <div className="mt-12">
              <h3 className="font-serif font-semibold text-lg mb-2">
                Does any of the following apply?
              </h3>
              <p className="text-sm text-navy-400 mb-4">
                Select all that apply to add the relevant documents to your
                checklist.
              </p>
              <div className="space-y-2">
                {conditionalSections.map((section) => (
                  <div key={section.id}>
                    <button
                      onClick={() => toggleConditional(section.id)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        activeConditionals.has(section.id)
                          ? "border-navy-300 bg-navy-50"
                          : "border-cream-300 bg-white hover:border-navy-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                            activeConditionals.has(section.id)
                              ? "border-navy bg-navy"
                              : "border-cream-300"
                          }`}
                        >
                          {activeConditionals.has(section.id) && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                        <div>
                          <span className="font-medium">{section.label}</span>
                          <span className="block text-sm text-navy-400 mt-0.5">
                            {section.description}
                          </span>
                        </div>
                      </div>
                    </button>

                    {activeConditionals.has(section.id) && (
                      <div className="ml-8 mt-2 space-y-2 animate-fadeIn">
                        {section.documents.map((doc) => (
                          <CheckboxItem
                            key={doc.id}
                            doc={doc}
                            checked={checkedIds.has(doc.id)}
                            onToggle={() => toggleCheck(doc.id)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Warnings */}
            {(selectedGen === "G2" ||
              selectedGen === "G3" ||
              selectedGen === "G4" ||
              selectedGen === "G5+") && (
              <div className="mt-10 space-y-3">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm">
                  <strong className="text-amber-800">
                    Paper application strongly recommended.
                  </strong>{" "}
                  <span className="text-amber-700">
                    The IRCC online portal was not designed for multi-generational
                    Bill C-3 claims.
                  </span>
                </div>
                <div className="bg-cream-200 border border-cream-300 rounded-lg p-4 text-sm">
                  <strong className="text-navy-500">
                    All copies must be clear, legible COLOR copies.
                  </strong>{" "}
                  <span className="text-navy-400">
                    Poor quality photocopies are a common reason for application
                    returns.
                  </span>
                </div>
              </div>
            )}

            {selectedGen === "G5+" && (
              <div className="mt-3 bg-maple-50 border border-maple-200 rounded-lg p-4 text-sm">
                <strong className="text-maple-700">
                  Legal counsel strongly recommended.
                </strong>{" "}
                <span className="text-maple-600">
                  G5+ claims involve significant documentary complexity. Older
                  records may only be available from Library and Archives Canada,
                  provincial archives, or church records.
                </span>
              </div>
            )}

            {/* Next step CTA */}
            <div className="mt-10 pt-8 border-t border-cream-300 flex flex-col sm:flex-row gap-3">
              <Link href="/guide" className="btn-primary">
                Continue to Application Guide
              </Link>
              <Link href="/cover-letter" className="btn-outline">
                Draft a Cover Letter
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
