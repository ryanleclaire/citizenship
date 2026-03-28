export type Outcome = "A" | "B" | "C" | "D" | "E" | "F" | "G";
export type Generation = "G0" | "G1" | "G2" | "G3" | "G4" | "G5+";
export type BirthTiming = "before" | "onOrAfter";

export interface WizardState {
  bornInCanada: boolean | null;
  parentIsCitizen: boolean | null;
  parentBornInCanada: boolean | null;
  birthDate: BirthTiming | null;
  canTraceChain: boolean | null;
  generationsFromAnchor: number | null;
  parentPhysicalPresenceMet: boolean | null;
  outcome: Outcome | null;
  generation: Generation | null;
}

export const initialWizardState: WizardState = {
  bornInCanada: null,
  parentIsCitizen: null,
  parentBornInCanada: null,
  birthDate: null,
  canTraceChain: null,
  generationsFromAnchor: null,
  parentPhysicalPresenceMet: null,
  outcome: null,
  generation: null,
};

export function getGenerationLabel(generations: number): Generation {
  if (generations <= 0) return "G1";
  if (generations === 1) return "G2";
  if (generations === 2) return "G3";
  if (generations === 3) return "G4";
  return "G5+";
}

export interface OutcomeInfo {
  title: string;
  description: string;
  details: string[];
  nextSteps: string[];
  paperApplication: boolean;
  legalCounselRecommended: boolean;
}

export const outcomeDetails: Record<Outcome, OutcomeInfo> = {
  A: {
    title: "You are likely a Canadian citizen by birth in Canada",
    description:
      "Because you were born in Canada, you are a Canadian citizen under section 3(1)(a) of the Citizenship Act.",
    details: [
      "This is the most straightforward path to citizenship.",
      "An exception applies if a parent was a foreign diplomat at the time of your birth.",
    ],
    nextSteps: [
      "If you need proof of citizenship, apply for a Citizenship Certificate using form CIT 0001.",
      "Online application is likely acceptable for this straightforward case.",
    ],
    paperApplication: false,
    legalCounselRecommended: false,
  },
  B: {
    title: "You are a Canadian citizen (First Generation abroad)",
    description:
      "As a first-generation person born abroad to a Canadian-born parent, you were already a citizen before Bill C-3. This was true under both pre-2009 law and the 2009 amendments.",
    details: [
      "You may already have a citizenship certificate.",
      "If not, you can apply for one as proof of your existing citizenship.",
    ],
    nextSteps: [
      "Apply for a Citizenship Certificate using form CIT 0001.",
      "Online application is likely acceptable for this straightforward case.",
    ],
    paperApplication: false,
    legalCounselRecommended: false,
  },
  C: {
    title: "You are likely eligible under Bill C-3 (Retroactive)",
    description:
      "Bill C-3 retroactively removes the first-generation limit for people born before December 15, 2025. Your intermediate ancestors are retroactively recognized as Canadian citizens, and citizenship flows through the entire chain of descent to you.",
    details: [
      "Your ancestors in the chain do NOT need to have applied for or held citizenship certificates.",
      "You need to document every generation in the chain with long-form birth certificates.",
      "A cover letter mapping your family tree is strongly recommended.",
      "Processing time is approximately 10+ months.",
    ],
    nextSteps: [
      "Gather long-form birth certificates for every person in the chain.",
      "Complete form CIT 0001.",
      "Write a cover letter mapping the family tree and citing the applicable legal section.",
      "Submit a paper application (strongly recommended for multi-generational claims).",
    ],
    paperApplication: true,
    legalCounselRecommended: false,
  },
  D: {
    title: "You are likely eligible (Prospective \u2014 Substantial Connection Met)",
    description:
      "Born on or after December 15, 2025, with a Canadian parent born abroad who meets the 1,095-day physical presence requirement. Your parent has demonstrated a substantial connection to Canada.",
    details: [
      "You will need proof of your parent\u2019s physical presence in Canada.",
      "Acceptable evidence includes employment records, tax slips, academic transcripts, health cards, rental agreements, utility bills, and passport stamps.",
      "Days do NOT need to be consecutive \u2014 cumulative total of 1,095 days at any time before your birth counts.",
    ],
    nextSteps: [
      "Gather proof of your parent\u2019s physical presence in Canada.",
      "Apply using form CIT 0001.",
    ],
    paperApplication: false,
    legalCounselRecommended: false,
  },
  E: {
    title: "More Research Needed",
    description:
      "Based on your answers, you may be eligible but need to do more research into your family history to confirm the chain of descent to a Canadian ancestor.",
    details: [
      "Many people discover Canadian ancestry they didn\u2019t know about.",
      "Key records to look for: birth certificates, immigration records, census records, church/baptismal records.",
      "Library and Archives Canada, provincial vital statistics offices, and Ancestry.ca are good starting points.",
    ],
    nextSteps: [
      "Research your family tree to identify a Canadian-born or naturalized ancestor.",
      "Gather birth certificates for each generation in the chain.",
      "Consider hiring a genealogist if records are difficult to find.",
      "Once you\u2019ve confirmed the chain, return to this tool to continue.",
    ],
    paperApplication: false,
    legalCounselRecommended: false,
  },
  F: {
    title: "Not Eligible by Descent Under Bill C-3",
    description:
      "Based on your answers, you do not appear to be eligible for Canadian citizenship by descent. However, there are other pathways to Canadian citizenship you may wish to explore.",
    details: [
      "Bill C-3 applies to people with at least one Canadian parent (including retroactively recognized parents).",
      "Without a Canadian parent in your lineage, citizenship by descent does not apply.",
    ],
    nextSteps: [
      "Explore other pathways: permanent residency leading to citizenship grant, spousal/family sponsorship, Express Entry, or Provincial Nominee Programs.",
      "Verify your family history \u2014 some people discover Canadian ancestry they weren\u2019t aware of.",
      "Consult an immigration lawyer for personalized advice on your options.",
    ],
    paperApplication: false,
    legalCounselRecommended: false,
  },
  G: {
    title: "Not Yet Eligible (Substantial Connection Not Met)",
    description:
      "Your Canadian parent has not yet accumulated the required 1,095 days (3 years) of physical presence in Canada. However, there is no deadline \u2014 your parent can continue to accumulate days.",
    details: [
      "The 1,095-day requirement applies to children born on or after December 15, 2025, to a Canadian parent born abroad.",
      "Days do NOT need to be consecutive.",
      "Your parent can accumulate the required days over time.",
    ],
    nextSteps: [
      "Track your parent\u2019s physical presence days in Canada.",
      "Use IRCC\u2019s physical presence calculator to determine how many days have been accumulated.",
      "There is no deadline \u2014 your parent can continue accumulating days at any time.",
    ],
    paperApplication: false,
    legalCounselRecommended: false,
  },
};
