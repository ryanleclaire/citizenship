import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

async function verifyOwnership(applicationId: string) {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized", status: 401, user: null, supabase };

  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_tier")
    .eq("id", user.id)
    .single();

  const tier = profile?.subscription_tier;
  if (tier !== "individual" && tier !== "family") {
    return { error: "A paid subscription is required.", status: 403, user: null, supabase };
  }

  const { data: app } = await supabase
    .from("applications")
    .select("id")
    .eq("id", applicationId)
    .eq("user_id", user.id)
    .single();

  if (!app) return { error: "Application not found", status: 404, user: null, supabase };

  return { error: null, status: 200, user, supabase };
}

// GET /api/applications/[id]/documents
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { error, status, supabase } = await verifyOwnership(params.id);
  if (error) return NextResponse.json({ error }, { status });

  const { data, error: dbError } = await supabase
    .from("documents")
    .select("*")
    .eq("application_id", params.id)
    .order("person_id")
    .order("document_type");

  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 });

  return NextResponse.json({ documents: data });
}

// POST /api/applications/[id]/documents — upsert a document record
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { error, status, supabase } = await verifyOwnership(params.id);
  if (error) return NextResponse.json({ error }, { status });

  const body = await request.json();
  const { person_id, document_type, label, status: docStatus, order_info, notes } = body;

  if (!person_id || !document_type || !label) {
    return NextResponse.json(
      { error: "person_id, document_type, and label are required." },
      { status: 400 }
    );
  }

  const { data, error: dbError } = await supabase
    .from("documents")
    .upsert(
      {
        application_id: params.id,
        person_id,
        document_type,
        label,
        status: docStatus || "needed",
        order_info: order_info || null,
        notes: notes || null,
      },
      { onConflict: "application_id,person_id,document_type" }
    )
    .select()
    .single();

  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 });

  return NextResponse.json({ document: data }, { status: 201 });
}
