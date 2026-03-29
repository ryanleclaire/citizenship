"use client";

import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/lib/auth-context";
import { useDocuments, type DocumentRecord } from "@/lib/hooks/useDocuments";
import { buildChain, getDocumentsForPerson } from "@/lib/family-chain";
import Link from "next/link";

interface AppSummary {
  id: string;
  name: string;
  chain_data: unknown[];
}

const STATUS_CONFIG = {
  needed: { label: "Needed", bg: "bg-gray-100", text: "text-navy-400", ring: "ring-gray-200" },
  ordered: { label: "Ordered", bg: "bg-amber-50", text: "text-amber-700", ring: "ring-amber-200" },
  received: { label: "Received", bg: "bg-green-50", text: "text-green-700", ring: "ring-green-200" },
  uploaded: { label: "Uploaded", bg: "bg-blue-50", text: "text-blue-700", ring: "ring-blue-200" },
} as const;

const STATUSES = ["needed", "ordered", "received", "uploaded"] as const;

function StatusBadge({ status }: { status: keyof typeof STATUS_CONFIG }) {
  const config = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
}

function ProgressSummary({ documents }: { documents: DocumentRecord[] }) {
  const total = documents.length;
  if (total === 0) return null;

  const counts = {
    needed: documents.filter((d) => d.status === "needed").length,
    ordered: documents.filter((d) => d.status === "ordered").length,
    received: documents.filter((d) => d.status === "received").length,
    uploaded: documents.filter((d) => d.status === "uploaded").length,
  };

  const complete = counts.received + counts.uploaded;

  return (
    <div className="card mb-8">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="font-serif font-semibold text-lg text-navy">
            Document Progress
          </h2>
          <p className="text-sm text-navy-400 mt-0.5">
            {complete} of {total} documents received or uploaded
          </p>
        </div>
        <div className="flex gap-4 text-xs text-navy-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-gray-300" /> {counts.needed} needed
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-400" /> {counts.ordered} ordered
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500" /> {counts.received} received
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-500" /> {counts.uploaded} uploaded
          </span>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 flex overflow-hidden">
        {counts.uploaded > 0 && (
          <div className="h-3 bg-blue-500 transition-all" style={{ width: `${(counts.uploaded / total) * 100}%` }} />
        )}
        {counts.received > 0 && (
          <div className="h-3 bg-green-500 transition-all" style={{ width: `${(counts.received / total) * 100}%` }} />
        )}
        {counts.ordered > 0 && (
          <div className="h-3 bg-amber-400 transition-all" style={{ width: `${(counts.ordered / total) * 100}%` }} />
        )}
      </div>
    </div>
  );
}

function DocumentRow({
  doc,
  onUpdate,
  onUpload,
  onDownload,
}: {
  doc: DocumentRecord;
  onUpdate: (updates: { status?: string; order_info?: string; notes?: string }) => void;
  onUpload: (file: File) => void;
  onDownload: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [orderInfo, setOrderInfo] = useState(doc.order_info || "");
  const [notes, setNotes] = useState(doc.notes || "");
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleStatusChange(newStatus: string) {
    setSaving(true);
    await onUpdate({ status: newStatus });
    setSaving(false);
  }

  async function handleSaveNotes() {
    setSaving(true);
    await onUpdate({ order_info: orderInfo, notes });
    setSaving(false);
  }

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setSaving(true);
      try {
        await onUpload(file);
      } catch {
        alert("Upload failed. Please try again.");
      }
      setSaving(false);
    }
  }

  return (
    <div className={`border rounded-lg transition-all ${expanded ? "border-red/30 shadow-sm" : "border-gray-100"}`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left px-4 py-3 flex items-center justify-between gap-3"
      >
        <div className="flex items-center gap-3 min-w-0">
          <StatusBadge status={doc.status} />
          <span className="text-sm font-medium text-navy truncate">{doc.label}</span>
          {doc.file_name && (
            <span className="text-navy-300 shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </span>
          )}
        </div>
        <svg
          className={`w-4 h-4 text-navy-300 shrink-0 transition-transform ${expanded ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-4 animate-fadeIn">
          {/* Status selector */}
          <div>
            <label className="block text-xs font-medium text-navy-400 mb-2">Status</label>
            <div className="flex gap-1">
              {STATUSES.map((s) => {
                const config = STATUS_CONFIG[s];
                const active = doc.status === s;
                return (
                  <button
                    key={s}
                    onClick={() => handleStatusChange(s)}
                    disabled={saving}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ring-1 ${
                      active
                        ? `${config.bg} ${config.text} ${config.ring}`
                        : "bg-white text-navy-400 ring-gray-200 hover:ring-gray-300"
                    }`}
                  >
                    {config.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Order info */}
          <div>
            <label className="block text-xs font-medium text-navy-400 mb-1">
              Order Info (tracking numbers, PINs, etc.)
            </label>
            <input
              type="text"
              value={orderInfo}
              onChange={(e) => setOrderInfo(e.target.value)}
              onBlur={handleSaveNotes}
              placeholder="e.g., VitalChek Order #217400793, PIN: 575366"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red bg-white text-navy"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-medium text-navy-400 mb-1">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={handleSaveNotes}
              placeholder="Any additional notes about this document..."
              rows={2}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red bg-white text-navy"
            />
          </div>

          {/* File upload / download */}
          <div>
            <label className="block text-xs font-medium text-navy-400 mb-1">File</label>
            {doc.file_name ? (
              <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                <svg className="w-5 h-5 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-navy truncate">{doc.file_name}</p>
                  <p className="text-xs text-navy-400">
                    {doc.file_size_bytes ? `${(doc.file_size_bytes / 1024).toFixed(0)} KB` : ""}
                  </p>
                </div>
                <button onClick={onDownload} className="text-xs text-red hover:underline shrink-0">
                  Download
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs text-navy-400 hover:text-navy shrink-0"
                >
                  Replace
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={saving}
                className="w-full border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-red/30 transition-colors"
              >
                <p className="text-sm text-navy-400">
                  {saving ? "Uploading..." : "Click to upload (JPEG, PNG, PDF \u2014 max 10MB)"}
                </p>
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.webp,.pdf"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function VaultPage() {
  const { user, isPaid, loading: authLoading } = useAuth();
  const [apps, setApps] = useState<AppSummary[]>([]);
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [initLoading, setInitLoading] = useState(true);

  const {
    documents,
    loading: docsLoading,
    fetchDocuments,
    upsertDocument,
    updateDocument,
    uploadFile,
    getDownloadUrl,
  } = useDocuments(selectedAppId);

  // Load user's applications
  useEffect(() => {
    if (!user || !isPaid) return;
    async function loadApps() {
      const res = await fetch("/api/applications");
      const data = await res.json();
      if (data.applications?.length > 0) {
        setApps(data.applications);
        setSelectedAppId(data.applications[0].id);
      }
      setInitLoading(false);
    }
    loadApps();
  }, [user, isPaid]);

  // Fetch documents when app selected
  useEffect(() => {
    if (selectedAppId) fetchDocuments();
  }, [selectedAppId, fetchDocuments]);

  // Initialize document rows from chain data
  useEffect(() => {
    if (!selectedAppId || !apps.length || documents === undefined) return;
    const app = apps.find((a) => a.id === selectedAppId);
    if (!app?.chain_data?.length) return;

    async function initDocs() {
      const chain = app!.chain_data as { id: string; role: string; generationLabel: string; relationLabel: string; isDeceased: boolean }[];
      // Build expected documents from chain using family-chain lib
      for (const person of chain) {
        const builtChain = buildChain(chain.length - 1);
        const builtPerson = builtChain.find((p) => p.id === person.id);
        if (!builtPerson) continue;

        const expectedDocs = getDocumentsForPerson({
          ...builtPerson,
          isDeceased: person.isDeceased || false,
        });

        for (const doc of expectedDocs) {
          const exists = documents.find(
            (d) => d.person_id === person.id && d.document_type === doc.id
          );
          if (!exists) {
            await upsertDocument({
              person_id: person.id,
              document_type: doc.id,
              label: doc.label,
              status: "needed",
            });
          }
        }
      }
    }

    if (documents.length === 0 && app.chain_data.length > 0) {
      initDocs().then(() => fetchDocuments());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAppId, apps, documents.length]);

  if (authLoading || initLoading) {
    return <div className="py-16 text-center text-navy-400">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3">Document Vault</h1>
          <div className="card border-red border-2 bg-red-50/30">
            <h2 className="font-serif font-semibold text-lg text-navy mb-2">Sign in to use the Document Vault</h2>
            <p className="text-sm text-navy-400 mb-4">Track, organize, and upload your citizenship application documents.</p>
            <div className="flex gap-3">
              <Link href="/auth/login" className="btn-primary">Log In</Link>
              <Link href="/pricing" className="btn-outline">View Plans</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isPaid) {
    return (
      <div className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3">Document Vault</h1>
          <p className="text-navy-400 mb-8">
            Track every document in your citizenship application &mdash; from ordering through upload.
          </p>
          <div className="card border-red border-2 bg-red-50/30">
            <h2 className="font-serif font-semibold text-lg text-navy mb-2">Upgrade to Access the Document Vault</h2>
            <p className="text-sm text-navy-400 mb-4">
              Track document status, store order info, and upload files for your entire family chain.
            </p>
            <Link href="/pricing" className="btn-primary">View Plans &mdash; Starting at $9/mo</Link>
          </div>
        </div>
      </div>
    );
  }

  if (apps.length === 0) {
    return (
      <div className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3">Document Vault</h1>
          <div className="card text-center py-10">
            <p className="text-navy-400 mb-4">
              You don&apos;t have any saved applications yet. Build your family chain first, then come back here to track your documents.
            </p>
            <Link href="/family-tree" className="btn-primary">Build Your Family Chain</Link>
          </div>
        </div>
      </div>
    );
  }

  // Group documents by person
  const selectedApp = apps.find((a) => a.id === selectedAppId);
  const chainPersons = (selectedApp?.chain_data || []) as {
    id: string; name: string; role: string; generationLabel: string; relationLabel: string;
  }[];

  const groupedDocs: { person: typeof chainPersons[0]; docs: DocumentRecord[] }[] = chainPersons.map(
    (person) => ({
      person,
      docs: documents.filter((d) => d.person_id === person.id),
    })
  );

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-3xl md:text-4xl font-serif font-bold">Document Vault</h1>
          {apps.length > 1 && (
            <select
              value={selectedAppId || ""}
              onChange={(e) => setSelectedAppId(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-navy"
            >
              {apps.map((app) => (
                <option key={app.id} value={app.id}>{app.name}</option>
              ))}
            </select>
          )}
        </div>
        <p className="text-navy-400 mb-8">
          Track every document from ordering through upload. Expand any row to update its status, add order info, or attach a file.
        </p>

        {docsLoading && documents.length === 0 ? (
          <div className="text-center py-10 text-navy-400">Loading documents...</div>
        ) : (
          <>
            <ProgressSummary documents={documents} />

            {groupedDocs.map(({ person, docs }) => (
              <div key={person.id} id={person.id} className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0 ${
                    person.role === "anchor" || person.role === "applicant" ? "bg-red" : "bg-navy"
                  }`}>
                    {person.generationLabel}
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-navy">
                      {person.name || person.relationLabel}
                    </h3>
                    <p className="text-xs text-navy-400">{person.relationLabel}</p>
                  </div>
                  <span className="text-xs text-navy-300 ml-auto">
                    {docs.filter((d) => d.status === "received" || d.status === "uploaded").length}/{docs.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {docs.map((doc) => (
                    <DocumentRow
                      key={doc.id}
                      doc={doc}
                      onUpdate={(updates) => updateDocument(doc.id, updates)}
                      onUpload={(file) => uploadFile(doc.id, file)}
                      onDownload={async () => {
                        const url = await getDownloadUrl(doc.id);
                        if (url) window.open(url, "_blank");
                      }}
                    />
                  ))}
                  {docs.length === 0 && (
                    <p className="text-sm text-navy-300 italic pl-11">
                      No documents initialized yet for this person.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
