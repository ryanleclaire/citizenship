import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { PLAN_APPLICATION_LIMITS } from "@/lib/stripe";

function createSupabase() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return cookieStore.get(name)?.value; },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );
}

// GET /api/applications — list user's applications
export async function GET() {
  const supabase = createSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Get the user's plan limit
  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_tier")
    .eq("id", user.id)
    .single();

  const tier = profile?.subscription_tier || "free";
  const limit = PLAN_APPLICATION_LIMITS[tier] ?? 0;

  return NextResponse.json({ applications: data, limit, count: data?.length ?? 0 });
}

// POST /api/applications — create a new application
export async function POST(request: NextRequest) {
  const supabase = createSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check the user's plan and current application count
  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_tier")
    .eq("id", user.id)
    .single();

  const tier = profile?.subscription_tier || "free";
  const limit = PLAN_APPLICATION_LIMITS[tier] ?? 0;

  const { count } = await supabase
    .from("applications")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  if ((count ?? 0) >= limit) {
    return NextResponse.json(
      {
        error: limit === 0
          ? "Subscribe to track applicants."
          : `You've reached the maximum of ${limit} applicant${limit === 1 ? "" : "s"} on your ${tier} plan.`,
        limit,
        count: count ?? 0,
      },
      { status: 403 }
    );
  }

  const body = await request.json();

  const { data, error } = await supabase
    .from("applications")
    .insert({
      user_id: user.id,
      name: body.name || "My Application",
      generation: body.generation || null,
      chain_data: body.chain_data || [],
      checklist_data: body.checklist_data || {},
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ application: data }, { status: 201 });
}
