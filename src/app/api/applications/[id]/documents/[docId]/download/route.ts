import { createServerSupabaseClient, createServiceRoleClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// GET /api/applications/[id]/documents/[docId]/download
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string; docId: string } }
) {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Verify ownership
  const { data: app } = await supabase
    .from("applications")
    .select("id")
    .eq("id", params.id)
    .eq("user_id", user.id)
    .single();
  if (!app) return NextResponse.json({ error: "Application not found" }, { status: 404 });

  const { data: doc } = await supabase
    .from("documents")
    .select("file_path, file_name")
    .eq("id", params.docId)
    .eq("application_id", params.id)
    .single();
  if (!doc?.file_path) return NextResponse.json({ error: "No file uploaded" }, { status: 404 });

  const serviceClient = createServiceRoleClient();
  const { data: signedUrl, error } = await serviceClient.storage
    .from("document-vault")
    .createSignedUrl(doc.file_path, 3600);

  if (error || !signedUrl) {
    return NextResponse.json({ error: "Failed to generate download link" }, { status: 500 });
  }

  return NextResponse.json({ url: signedUrl.signedUrl, fileName: doc.file_name });
}
