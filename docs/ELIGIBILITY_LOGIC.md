# Eligibility Logic — Bill C-3 Citizenship Wizard

## Overview

This document defines the decision tree logic for the interactive eligibility wizard. The wizard asks sequential questions and routes users to one of several outcomes.

## Key Concepts

### Generation Designation
- **G0 (Anchor)**: Born in Canada OR naturalized in Canada — the root of the citizenship chain
- **G1 (First generation abroad)**: Born outside Canada to a G0 parent
- **G2 (Second generation abroad)**: Born outside Canada to a G1 parent
- **G3 (Third generation abroad)**: Born outside Canada to a G2 parent
- **G4+ (Fourth+ generation abroad)**: Born outside Canada to a G3+ parent

### Two Regimes Under Bill C-3
1. **Retroactive (born BEFORE December 15, 2025)**: No generational limit. Citizenship flows through entire chain of descent. The applicant must prove an unbroken documentary chain to a Canadian anchor ancestor.
2. **Prospective (born ON OR AFTER December 15, 2025)**: Citizenship can pass beyond first generation, BUT the Canadian parent (if born abroad) must demonstrate 1,095 days of cumulative physical presence in Canada before the child's birth/adoption.

## Decision Tree

```
START
│
├─ Q1: Were you born in Canada?
│  ├─ YES → You are likely already a Canadian citizen by birth (jus soli).
│  │         Exception: If a parent was a foreign diplomat at time of birth.
│  │         → Outcome A: CITIZEN BY BIRTH IN CANADA
│  │
│  └─ NO → Continue to Q2
│
├─ Q2: Was at least one of your parents a Canadian citizen at the time of your birth?
│  ├─ NO → You are likely not eligible for citizenship by descent under Bill C-3.
│  │        Consider other pathways (PR → citizenship grant, sponsorship, etc.)
│  │        → Outcome F: NOT ELIGIBLE BY DESCENT
│  │
│  └─ YES → Continue to Q3
│
├─ Q3: Was your Canadian parent born in Canada?
│  ├─ YES → You are G1 (first generation born abroad to a Canadian-born parent).
│  │         You were already a citizen before Bill C-3.
│  │         → Outcome B: CITIZEN (G1 — FIRST GENERATION)
│  │         Note: You may still need a citizenship certificate as proof.
│  │
│  └─ NO → Your Canadian parent was also born outside Canada. Continue to Q4.
│
├─ Q4: Were you born BEFORE December 15, 2025?
│  ├─ YES → Retroactive regime applies. No generational limit.
│  │         Continue to Q5 to determine generation depth.
│  │
│  └─ NO → Prospective regime applies. Continue to Q7.
│
├─ Q5 (Retroactive): Can you trace an unbroken chain of parent-child
│  relationships back to an ancestor who was born in Canada
│  or naturalized as a Canadian citizen?
│  ├─ YES → Continue to Q6
│  │
│  └─ NO / UNSURE → Guidance: Research your family tree. Key records:
│           birth certificates, immigration records, census records,
│           church/baptismal records. Consider hiring a genealogist.
│           → Outcome E: NEEDS MORE RESEARCH
│
├─ Q6 (Retroactive): How many generations separate you from the
│  Canadian-born/naturalized ancestor?
│  │
│  ├─ 1 generation (grandparent is anchor) → You are G2
│  │   → Outcome C: LIKELY ELIGIBLE (G2 — RETROACTIVE)
│  │
│  ├─ 2 generations (great-grandparent is anchor) → You are G3
│  │   → Outcome C: LIKELY ELIGIBLE (G3 — RETROACTIVE)
│  │
│  ├─ 3 generations (great-great-grandparent is anchor) → You are G4
│  │   → Outcome C: LIKELY ELIGIBLE (G4 — RETROACTIVE)
│  │
│  └─ 4+ generations → You are G5+
│      → Outcome C: LIKELY ELIGIBLE (G5+ — RETROACTIVE)
│      Note: Legally possible but documentary challenges increase
│      significantly with each generation. Consider legal counsel.
│
├─ Q7 (Prospective — born on/after Dec 15, 2025):
│  Can your Canadian parent (born abroad) demonstrate at least
│  1,095 days (3 years) of cumulative physical presence in Canada
│  before your birth or adoption?
│  ├─ YES → Outcome D: LIKELY ELIGIBLE (PROSPECTIVE — SUBSTANTIAL CONNECTION MET)
│  │
│  ├─ NO → Your parent does not yet meet the substantial connection test.
│  │        They may be able to accumulate the required days before your birth.
│  │        → Outcome G: NOT YET ELIGIBLE (SUBSTANTIAL CONNECTION NOT MET)
│  │
│  └─ UNSURE → Guidance on how to calculate physical presence days.
│              Link to IRCC's physical presence calculator.
│              → Outcome E: NEEDS MORE RESEARCH
│
END
```

## Outcome Descriptions

### Outcome A: Citizen by Birth in Canada
- You are likely already a Canadian citizen
- If you need proof, apply for a citizenship certificate (replacement/first-time)
- Use form CIT 0001
- Straightforward case — online application likely acceptable

### Outcome B: Citizen (G1 — First Generation)
- You were already a Canadian citizen before Bill C-3
- This was true under the pre-2009 law and the 2009 amendments
- You may already have a citizenship certificate; if not, apply for one
- Online application likely acceptable for this straightforward case

### Outcome C: Likely Eligible (Retroactive — G2, G3, G4, G5+)
- Bill C-3 retroactively removes the first-generation limit for you
- Your intermediate ancestors are retroactively recognized as citizens
- You need to document every generation in the chain
- **Paper application strongly recommended**
- Include a cover letter mapping the family tree and citing the applicable legal section
- Processing time: ~10+ months
- Documentary complexity increases with each generation
- For G4+: Strongly consider consulting an immigration lawyer

### Outcome D: Likely Eligible (Prospective — Substantial Connection Met)
- Born on/after December 15, 2025, with a Canadian parent born abroad
- Parent meets the 1,095-day physical presence requirement
- Need proof of parent's physical presence in Canada
- Standard application process applies

### Outcome E: Needs More Research
- User is unsure about ancestry or documentation
- Provide guidance on genealogical research resources
- Suggest: Ancestry.ca, Library and Archives Canada, provincial vital statistics, church records
- Note: Many people discover Canadian ancestry they didn't know about

### Outcome F: Not Eligible by Descent
- No Canadian parent identified
- Provide information about other pathways to Canadian citizenship:
  - Permanent residency → citizenship grant
  - Spousal/family sponsorship
  - Express Entry
  - Provincial Nominee Programs

### Outcome G: Not Yet Eligible (Substantial Connection Not Met)
- Parent hasn't yet accumulated 1,095 days in Canada
- Provide guidance on tracking physical presence
- Link to IRCC physical presence calculator
- Note that there's no deadline — the parent can accumulate days over time

## Edge Cases to Handle

1. **Adopted children**: Different rules apply. Pre-Dec 15, 2025 adoptions may qualify for a direct grant. Post-Dec 15, 2025 adoptions require the substantial connection test.
2. **Crown servants**: Special exceptions exist for children of Canadian Armed Forces, federal public administration, or provincial/territorial public service employees serving abroad.
3. **Pre-1947 ancestors**: Canadian citizenship didn't technically exist before January 1, 1947. But Bill C-3 includes deeming provisions for people born before that date to Canadian parents.
4. **Gender discrimination in old laws**: Before 1977, Canadian women who married foreign nationals could not always pass citizenship to children born abroad (while men could). Bill C-3 addresses many of these historical inequities.
5. **Section 8 Lost Canadians**: People who lost citizenship under old retention requirements.
6. **Deceased ancestors who never claimed citizenship**: Death does NOT break the chain. Citizenship is recognized retroactively regardless of whether the person ever applied for or knew about their status.

## Data Model for Wizard State

```typescript
interface WizardState {
  // Basic info
  bornInCanada: boolean | null;
  parentIsCitizen: boolean | null;
  parentBornInCanada: boolean | null;
  birthDate: 'before' | 'onOrAfter' | null; // relative to Dec 15, 2025

  // Ancestry chain
  anchorAncestorType: 'bornInCanada' | 'naturalized' | 'unknown' | null;
  generationsFromAnchor: number | null; // 1 = grandparent, 2 = great-grandparent, etc.
  chainComplete: boolean | null; // Can document every generation?

  // Prospective only
  parentPhysicalPresenceMet: boolean | null; // 1,095 days

  // Edge cases
  isAdopted: boolean | null;
  crownServant: boolean | null;
  hasDeceasedAncestorsInChain: boolean | null;
  hasNameDiscrepancies: boolean | null;

  // Result
  outcome: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | null;
  generation: string | null; // 'G1', 'G2', etc.
}
```
