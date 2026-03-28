# Bill C-3 Canadian Citizenship Certificate Guidance App

## Project Overview

A step-by-step web application that guides individuals through the process of applying for a Canadian citizenship certificate under **Bill C-3, An Act to Amend the Citizenship Act (2025)**. Bill C-3 came into effect on December 15, 2025, and removed the first-generation limit on citizenship by descent, retroactively recognizing potentially 350,000–500,000 new Canadian citizens worldwide.

The app's primary audience is people in the United States (and globally) who have Canadian ancestry and are newly eligible for citizenship under Bill C-3 but are overwhelmed by the complexity of the application process.

## Problem Statement

Despite Bill C-3 being a landmark change, the actual process of obtaining a citizenship certificate is:
- Scattered across multiple government pages, Reddit threads, and legal blogs
- Full of generation-counting complexity that confuses people
- Document-intensive (long-form birth certificates for EVERY generation in the chain)
- Procedurally split between paper and online applications depending on the case
- Prone to rejection if incomplete — and processing times average ~10 months

This app consolidates everything into a single guided experience.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS 4
- **State Management**: React Context + useReducer for wizard state
- **Database**: Supabase (PostgreSQL) for user progress saving (optional Phase 2)
- **Deployment**: Vercel
- **AI Integration**: Anthropic Claude API (for personalized cover letter drafting assistance in Phase 2)

## Core Features (Phase 1 — MVP)

### 1. Eligibility Wizard
An interactive questionnaire that determines whether the user likely qualifies under Bill C-3. Key decision points:
- Were you born outside Canada?
- Was your parent born outside Canada?
- Was your grandparent (or further ancestor) born in Canada or naturalized in Canada?
- Were you born before or after December 15, 2025?
- If born after Dec 15, 2025: Can your Canadian parent demonstrate 1,095+ days of physical presence in Canada?

**Output**: A clear eligibility assessment with the user's generation designation (G1, G2, G3, G4+), the applicable section of the Citizenship Act, and next steps.

### 2. Generation Calculator & Family Tree Mapper
A visual tool that helps users:
- Map their lineage back to the Canadian "anchor" ancestor (born/naturalized in Canada)
- Understand how Bill C-3 applies to their specific chain of descent
- See which generations are retroactively recognized vs. which need the 1,095-day substantial connection test

Display: A simple vertical family tree diagram showing each generation, their status, and what documents are needed for each person in the chain.

### 3. Personalized Document Checklist Generator
Based on the user's answers in the eligibility wizard, generate a tailored checklist of required documents:

**For every person in the chain:**
- Long-form birth certificate (NOT short-form, NOT computer abstract, NOT baptismal certificate)
- Must show: child's full name, date of birth, place of birth, AND parents' full names

**For the anchor ancestor (G0):**
- Proof of Canadian citizenship (birth certificate showing birth in Canada, OR naturalization certificate)

**For the applicant:**
- Two pieces of valid ID (name + DOB on both, photo on at least one)
- Two identical citizenship photos meeting IRCC specifications
- Completed CIT 0001 form
- Fee receipt ($75 CAD per person, online payment only from within Canada/US)
- Cover letter (strongly recommended) mapping the family tree and citing applicable legal section

**For deceased ancestors in the chain:**
- Death certificate (helps establish identity and timeline)

**For name discrepancies between documents:**
- Marriage certificates, legal name change documents

**If applicable:**
- Translation + affidavit for documents not in English/French
- Consent form for IRCC to pull CBSA entry/exit records (do NOT request your own — it causes delays)
- Physical presence evidence (if substantial connection test applies): T4 slips, employment records, school transcripts, health cards, rental agreements, utility bills

### 4. Step-by-Step Application Guide
A linear walkthrough of the 4-step IRCC process:

**Step 1: Gather Documents**
- Link to CIT 0014 Document Checklist
- Guidance on obtaining vital records from different provinces/states/countries
- Tips on photo specifications

**Step 2: Complete the Application (CIT 0001)**
- Section-by-section guidance for filling out the form
- Emphasis: Use Adobe Acrobat Reader (not browser) to open the PDF
- Reminder: If a section doesn't apply, write "NA" — never leave blank
- For minors: complete as if you are the child

**Step 3: Pay Fees**
- $75 CAD per person
- Online payment only (credit card, Debit Mastercard, Visa Debit)
- Print TWO copies of the receipt — attach one, keep one
- Outside Canada/US without internet: pay at Canadian embassy/consulate

**Step 4: Submit Application**
- **Paper vs Online decision tree:**
  - Online: Only for straightforward first-generation claims where parent was born in Canada
  - Paper: Required/strongly recommended for all Bill C-3 multi-generational claims
- Paper mailing address:
  - Courier (FedEx/UPS/DHL): Case Processing Centre – Sydney-Proofs, 49 Dorchester Street, Sydney, Nova Scotia B1P 5Z2
  - Use tracked shipping
- Outside Canada: Submit at Canadian embassy/consulate in your country

### 5. Cover Letter Template & Guidance
A tool that helps users draft a cover letter to include with their paper application. The cover letter should:
- Map out the family tree clearly (Generation 0 through applicant)
- Cite the specific legal section that makes the applicant eligible (e.g., s. 3(1)(g))
- Explain any name discrepancies or missing documents
- Note if any ancestors in the chain are deceased

### 6. FAQ & Knowledge Base
Curated answers to the most common questions from r/Canadiancitizenship and immigration lawyer guides:
- "Can I claim through a grandparent?" → Yes, but you can't skip a generation. Bill C-3 retroactively restores your parent's citizenship, which then flows to you.
- "Does my parent need to apply first?" → No. You document the chain yourself. IRCC doesn't require citizenship certificates for ancestors.
- "Is there a deadline?" → No deadline. Citizenship is a recognized right, not a grant.
- "What if my ancestor is deceased?" → Death does not break the chain. Provide a death certificate.
- "Paper or online?" → Paper for most Bill C-3 claims.
- "How long does processing take?" → ~10 months as of early 2026, potentially longer for complex multi-generational claims.
- "Do I owe Canadian taxes?" → Generally no if you reside outside Canada. Canada taxes based on residency. Consult a cross-border tax advisor.
- "What about dual citizenship?" → Canada allows dual citizenship. Check your other country's rules.

### 7. Resource Hub
Links to official and community resources:
- IRCC official page on Bill C-3 changes: https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/act-changes/rules-2025.html
- CIT 0001 application form & guide
- CIT 0014 document checklist
- IRCC online portal (for eligible online applicants)
- IRCC "Am I a Citizen?" tool
- r/Canadiancitizenship subreddit
- Provincial vital statistics offices (for ordering birth certificates)
- IRCC processing times page
- IRCC fee payment portal

## Phase 2 Features (Post-MVP)

- **AI-Powered Cover Letter Drafter**: User inputs their family chain details → Claude generates a draft cover letter citing the correct legal sections
- **Progress Tracker**: Save your place and check off completed steps (Supabase auth)
- **Provincial Records Guide**: How to order long-form birth certificates from each Canadian province
- **US State Records Guide**: How to order birth certificates from each US state
- **Processing Time Estimator**: Based on generation complexity and current IRCC backlogs
- **Community Q&A Forum**: Moderated space for applicants to share experiences
- **Multi-language Support**: French version (given Canadian bilingual requirements)

## Design Direction

### Aesthetic
- **Clean, authoritative, and reassuring** — users are anxious about a complex bureaucratic process
- Think: calm government-adjacent design but warmer and more human
- Muted palette: deep navy (#1a2744), warm white (#faf8f5), maple red accent (#d4213d), soft sage (#8ba888)
- Typography: A refined serif for headings (e.g., Playfair Display or Lora) paired with a highly legible sans-serif for body (e.g., Source Sans 3 or DM Sans)
- Subtle maple leaf motifs or Canadian-inspired geometric accents — but tasteful, not kitschy
- Progress indicators and step counters should be prominent and calming
- Mobile-first responsive design (many users will be on phones)

### UX Principles
- **Progressive disclosure**: Don't overwhelm. Show one step at a time.
- **Confidence building**: After each step, confirm what the user has accomplished.
- **Plain language**: Avoid legalese. When legal terms are unavoidable, provide inline definitions.
- **No dead ends**: Every screen should tell the user what to do next.
- **Disclaimer prominent**: "This is an informational guide, not legal advice. For complex cases, consult a licensed immigration lawyer."

## Key Legal/Factual Accuracy Notes

These facts MUST be accurate throughout the app:

1. **Bill C-3** received Royal Assent on November 20, 2025, and came into force on December 15, 2025.
2. **Retroactive effect**: For people born BEFORE December 15, 2025, there is NO generational limit — citizenship flows through the entire chain of descent as long as there's a Canadian anchor ancestor.
3. **Prospective effect**: For people born ON OR AFTER December 15, 2025, the Canadian parent (if born abroad) must demonstrate 1,095 days (3 years) of cumulative physical presence in Canada before the child's birth/adoption.
4. **You cannot skip a generation**: Citizenship doesn't pass directly from grandparent to grandchild. But Bill C-3 retroactively restores intermediate generations.
5. **No deadline to apply**: Citizenship is recognized by operation of law, not granted as a new benefit.
6. **The application is for "proof of citizenship"** (a Citizenship Certificate), not a grant of citizenship.
7. **Processing fee**: $75 CAD per person.
8. **Form**: CIT 0001 (Application for a Citizenship Certificate for Adults and Minors under Section 3).
9. **Processing time**: ~10 months as of early 2026, though IRCC targets 80% of grants within 12 months.
10. **Paper applications are strongly recommended** for multi-generational Bill C-3 claims. The online portal was designed for first-generation cases.
11. **Long-form birth certificates are required** — short-form, computer abstracts, and baptismal certificates are generally not accepted.
12. **Do NOT request your own CBSA entry/exit report** — check "YES" on the consent form and let IRCC pull records directly.

## Disclaimer

This app must prominently display on every page:

> **Disclaimer**: This tool provides general guidance only and does not constitute legal advice. Immigration law is complex, and individual circumstances vary. For personalized advice, consult a licensed immigration lawyer or Regulated Canadian Immigration Consultant (RCIC). This app is not affiliated with or endorsed by Immigration, Refugees and Citizenship Canada (IRCC) or the Government of Canada.

## File Structure

```
bill-c3-guide/
├── CLAUDE.md                    # This file
├── docs/
│   ├── RESEARCH.md              # Compiled research and source material
│   ├── ELIGIBILITY_LOGIC.md     # Decision tree logic for the eligibility wizard
│   └── DOCUMENT_REQUIREMENTS.md # Detailed document requirements by scenario
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx             # Landing page
│   │   ├── eligibility/
│   │   │   └── page.tsx         # Eligibility wizard
│   │   ├── checklist/
│   │   │   └── page.tsx         # Document checklist generator
│   │   ├── guide/
│   │   │   ├── page.tsx         # Step-by-step guide overview
│   │   │   ├── step-1/page.tsx  # Gather documents
│   │   │   ├── step-2/page.tsx  # Complete application
│   │   │   ├── step-3/page.tsx  # Pay fees
│   │   │   └── step-4/page.tsx  # Submit application
│   │   ├── cover-letter/
│   │   │   └── page.tsx         # Cover letter template
│   │   ├── faq/
│   │   │   └── page.tsx         # FAQ
│   │   └── resources/
│   │       └── page.tsx         # Resource hub
│   ├── components/
│   │   ├── ui/                  # Shared UI components
│   │   ├── wizard/              # Eligibility wizard components
│   │   ├── family-tree/         # Family tree visualization
│   │   └── checklist/           # Document checklist components
│   ├── lib/
│   │   ├── eligibility.ts       # Eligibility determination logic
│   │   ├── documents.ts         # Document requirement logic
│   │   └── constants.ts         # Legal sections, URLs, etc.
│   └── styles/
│       └── globals.css
├── public/
│   └── images/
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## Development Approach

1. Start with the eligibility wizard — it's the hook that gets users engaged
2. Build the document checklist generator next — it provides immediate value
3. Then the step-by-step guide — the core content experience
4. Cover letter template and FAQ last — supporting features
5. Polish design and mobile responsiveness throughout

## Sources & References

- IRCC Official: https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/act-changes/rules-2025.html
- CIT 0001 Guide: https://www.canada.ca/en/immigration-refugees-citizenship/services/application/application-forms-guides/guide-0001-application-citizenship-certificate-adults-minors-proof-citizenship-section-3.html
- Bill C-3 Text: https://www.parl.ca/legisinfo/en/bill/45-1/c-3
- Justice Canada Analysis: https://www.justice.gc.ca/eng/csj-sjc/pl/charter-charte/c3_2.html
- IRCC Backgrounder: https://www.canada.ca/en/immigration-refugees-citizenship/news/2025/12/bill-c-3-an-act-to-amend-the-citizenship-act-2025-comes-into-effect.html
- r/Canadiancitizenship: https://www.reddit.com/r/Canadiancitizenship/
- CBA Submission on Bill C-3: https://cba.org/Our-Impact/Submissions/Bill-C-3-An-Act-to-amend-the-Citizenship-Act-2025
