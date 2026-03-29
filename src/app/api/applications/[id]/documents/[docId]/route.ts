import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

async function verifyDocumentOwnership(applicationId: string, docId: string) {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized", status: 401, supabase };

  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_tier")
    .eq("id", user.id)
    .single();

  const tier = profile?.subscription_tier;
  if (tier !== "individual" && tier !== "family") {
    return { error: "A paid subscription is required.", status: 403, supabase };
  }

  const { data: app } = await supabase
    .from("applications")
    .select("id")
    .eq("id", applicationId)
    .eq("user_id", user.id)
    .single();

  if (!app) return { error: "Application not found", status: 404, supabase };

  const { data: doc } = await supabase
    .from("documents")
    .select("*")
    .eq("id", docId)
    .eq("application_id", applicationId)
    .single();

  if (!doc) return { error: "Document not found", status: 404, supabase };

  return { error: null, status: 200, supabase, doc, user };
}

// PATCH /api/applications/[id]/documents/[docId]
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string; docId: string } }
) {
  const result = await verifyDocumentOwnership(params.id, params.docId);
  if (result.error) return NextResponse.json({ error: result.error }, { status: result.status });

  const body = await request.json();
  const updates: Record<string, unknown> = {};
  if (body.status !== undefined) updates.status = body.status;
  if (body.order_info !== undefined) updates.order_info = body.order_info;
  if (body.notes !== undefined) updates.notes = body.notes;
  if (body.label !== undefined) updates.label = body.label;

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "No updates provided" }, { status: 400 });
  }

  const { data, error } = await result.supabase
    .from("documents")
    .update(updates)
    .eq("id", params.docId)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ document: data });
}

// DELETE /api/applications/[id]/documents/[docId]
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string; docId: string } }
) {
  const result = await verifyDocumentOwnership(params.id, params.docId);
  if (result.error) return NextResponse.json({ error: result.error }, { status: result.status });

  // Delete file from storage if it exists
  if (result.doc?.file_path) {
    const serviceClient = createServiceRoleClient();
    await serviceClient.storage.from("document-vault").remove([result.doc.file_path]);
  }

  const { error } = await result.supabase
    .from("documents")
    .delete()
    .eq("id", params.docId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
