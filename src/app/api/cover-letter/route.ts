import Anthropic from "@anthropic-ai/sdk";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

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

interface ChainPersonInput {
  role: "anchor" | "intermediate" | "applicant";
  generationLabel: string;
  relationLabel: string;
  name: string;
  birthPlace: string;
  birthYear: string;
  isDeceased: boolean;
}

interface CoverLetterRequest {
  chain: ChainPersonInput[];
  nameDiscrepancies: string;
  additionalNotes: string;
  applicantAddress: string;
}

export async function POST(request: NextRequest) {
  // Auth check
  const supabase = createSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check paid subscription
  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_tier")
    .eq("id", user.id)
    .single();

  const tier = profile?.subscription_tier;
  if (tier !== "individual" && tier !== "family") {
    return NextResponse.json(
      { error: "A paid subscription is required to generate cover letters." },
      { status: 403 }
    );
  }

  const body: CoverLetterRequest = await request.json();
  const { chain, nameDiscrepancies, additionalNotes, applicantAddress } = body;

  if (!chain || chain.length < 2) {
    return NextResponse.json(
      { error: "Please provide at least an anchor ancestor and applicant." },
      { status: 400 }
    );
  }

  // Build the chain description for the prompt
  const chainDescription = chain.map((person) => {
    const parts = [
      `${person.generationLabel} (${person.relationLabel}): ${person.name || "[Name not provided]"}`,
      `Born: ${person.birthPlace || "[Place not provided]"}, ${person.birthYear || "[Year not provided]"}`,
      `Role: ${person.role}`,
    ];
    if (person.isDeceased) parts.push("Status: Deceased");
    return parts.join("\n  ");
  }).join("\n\n");

  const generationCount = chain.length - 1;
  const applicant = chain[chain.length - 1];
  const anchor = chain[0];

  const systemPrompt = `You are an expert Canadian immigration document writer specializing in citizenship by descent applications under Bill C-3 (An Act to Amend the Citizenship Act, 2025). You draft professional, clear cover letters to accompany CIT 0001 applications submitted to Immigration, Refugees and Citizenship Canada (IRCC).

Key legal facts you must know:
- Bill C-3 received Royal Assent on November 20, 2025, and came into force on December 15, 2025.
- For people born BEFORE December 15, 2025, there is no generational limit on citizenship by descent.
- The applicable section for second+ generation born abroad (retroactive) is s. 3(1)(g) of the Citizenship Act.
- Citizenship is recognized by operation of law — the applicant is not requesting a grant, but proof of existing citizenship.
- The application is for a Citizenship Certificate under Section 3 of the Citizenship Act.
- You cannot skip generations — each link in the chain must be documented.

Your cover letters should:
- Be professional but accessible — not overly legalistic
- Clearly map the generational chain from anchor (G0) to applicant
- Cite the specific applicable section of the Citizenship Act
- List all documents included and what each proves
- Proactively explain any name discrepancies, deceased ancestors, or unusual documentation
- Be formatted as a proper letter with date, address, salutation, body, and closing
- Include a document list/index at the end

IMPORTANT: Do not fabricate details. Use only information provided by the user. If information is missing, use placeholder brackets like [INSERT DATE] so the user can fill them in.`;

  const userPrompt = `Please draft a cover letter for a Canadian citizenship certificate application (CIT 0001) based on the following information:

FAMILY CHAIN (${generationCount} generation${generationCount > 1 ? "s" : ""} of descent):
${chainDescription}

APPLICANT ADDRESS:
${applicantAddress || "[Address not provided — please add your mailing address]"}

NAME DISCREPANCIES OR DOCUMENTATION NOTES:
${nameDiscrepancies || "None noted."}

ADDITIONAL NOTES OR SPECIAL CIRCUMSTANCES:
${additionalNotes || "None."}

Please draft a complete cover letter that:
1. Opens with who the applicant is and what they are applying for
2. Maps the family tree clearly, generation by generation
3. Cites s. 3(1)(g) of the Citizenship Act as amended by Bill C-3 (or the appropriate section based on the chain)
4. Lists and explains every document included
5. Addresses any name discrepancies or special circumstances mentioned above
6. Notes any deceased ancestors in the chain
7. Closes professionally with contact information placeholder
8. Includes a document index at the end

Format as a proper letter ready to print and include in the application package.`;

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      messages: [
        { role: "user", content: userPrompt },
      ],
      system: systemPrompt,
    });

    const textContent = message.content.find((block) => block.type === "text");
    const coverLetter = textContent?.text || "Unable to generate cover letter. Please try again.";

    return NextResponse.json({ coverLetter });
  } catch (err) {
    console.error("Claude API error:", err);
    return NextResponse.json(
      { error: "Failed to generate cover letter. Please try again." },
      { status: 500 }
    );
  }
}
