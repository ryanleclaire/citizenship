"use client";

import { useState, useCallback } from "react";

export interface DocumentRecord {
  id: string;
  application_id: string;
  person_id: string;
  document_type: string;
  label: string;
  status: "needed" | "ordered" | "received" | "uploaded";
  order_info: string | null;
  notes: string | null;
  file_path: string | null;
  file_name: string | null;
  file_size_bytes: number | null;
  created_at: string;
  updated_at: string;
}

export function useDocuments(applicationId: string | null) {
  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchDocuments = useCallback(async () => {
    if (!applicationId) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/applications/${applicationId}/documents`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to load documents");
      } else {
        setDocuments(data.documents || []);
      }
    } catch {
      setError("Failed to connect");
    }
    setLoading(false);
  }, [applicationId]);

  const upsertDocument = useCallback(async (doc: {
    person_id: string;
    document_type: string;
    label: string;
    status?: string;
    order_info?: string;
    notes?: string;
  }) => {
    if (!applicationId) return null;
    const res = await fetch(`/api/applications/${applicationId}/documents`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doc),
    });
    const data = await res.json();
    if (res.ok) {
      setDocuments((prev) => {
        const idx = prev.findIndex(
          (d) => d.person_id === doc.person_id && d.document_type === doc.document_type
        );
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = data.document;
          return next;
        }
        return [...prev, data.document];
      });
      return data.document;
    }
    return null;
  }, [applicationId]);

  const updateDocument = useCallback(async (
    docId: string,
    updates: { status?: string; order_info?: string; notes?: string }
  ) => {
    if (!applicationId) return;
    const res = await fetch(`/api/applications/${applicationId}/documents/${docId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    if (res.ok) {
      setDocuments((prev) =>
        prev.map((d) => (d.id === docId ? data.document : d))
      );
    }
  }, [applicationId]);

  const uploadFile = useCallback(async (docId: string, file: File) => {
    if (!applicationId) return;
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch(
      `/api/applications/${applicationId}/documents/${docId}/upload`,
      { method: "POST", body: formData }
    );
    const data = await res.json();
    if (res.ok) {
      setDocuments((prev) =>
        prev.map((d) => (d.id === docId ? data.document : d))
      );
    } else {
      throw new Error(data.error || "Upload failed");
    }
  }, [applicationId]);

  const deleteDocument = useCallback(async (docId: string) => {
    if (!applicationId) return;
    const res = await fetch(
      `/api/applications/${applicationId}/documents/${docId}`,
      { method: "DELETE" }
    );
    if (res.ok) {
      setDocuments((prev) => prev.filter((d) => d.id !== docId));
    }
  }, [applicationId]);

  const getDownloadUrl = useCallback(async (docId: string) => {
    if (!applicationId) return null;
    const res = await fetch(
      `/api/applications/${applicationId}/documents/${docId}/download`
    );
    const data = await res.json();
    return res.ok ? data.url : null;
  }, [applicationId]);

  return {
    documents,
    loading,
    error,
    fetchDocuments,
    upsertDocument,
    updateDocument,
    uploadFile,
    deleteDocument,
    getDownloadUrl,
  };
}
