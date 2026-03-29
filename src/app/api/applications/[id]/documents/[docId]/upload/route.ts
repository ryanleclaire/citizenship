import { createServerSupabaseClient, createServiceRoleClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// POST /api/applications/[id]/documents/[docId]/upload
export async function POST(
  request: NextRequest,
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
    .select("*")
    .eq("id", params.docId)
    .eq("application_id", params.id)
    .single();
  if (!doc) return NextResponse.json({ error: "Document not found" }, { status: 404 });

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

  // Validate file type
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: "File type not allowed. Use JPEG, PNG, WebP, or PDF." },
      { status: 400 }
    );
  }

  // Validate file size (10MB)
  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: "File too large. Maximum 10MB." }, { status: 400 });
  }

  const ext = file.name.split(".").pop() || "bin";
  const filePath = `${user.id}/${params.id}/${params.docId}.${ext}`;

  // Delete old file if replacing
  const serviceClient = createServiceRoleClient();
  if (doc.file_path) {
    await serviceClient.storage.from("document-vault").remove([doc.file_path]);
  }

  // Upload new file
  const arrayBuffer = await file.arrayBuffer();
  const { error: uploadError } = await serviceClient.storage
    .from("document-vault")
    .upload(filePath, arrayBuffer, {
      contentType: file.type,
      upsert: true,
    });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  // Update document record
  const { data: updated, error: updateError } = await supabase
    .from("documents")
    .update({
      file_path: filePath,
      file_name: file.name,
      file_size_bytes: file.size,
      status: "uploaded",
    })
    .eq("id", params.docId)
    .select()
    .single();

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ document: updated });
}
