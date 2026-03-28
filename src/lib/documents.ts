import { type Generation } from "./eligibility";

export type DocumentCategory =
  | "application"
  | "identity"
  | "chain"
  | "supplementary"
  | "conditional";

export interface DocumentItem {
  id: string;
  label: string;
  description: string;
  required: boolean;
  forPerson: string;
  category: DocumentCategory;
  tip?: string;
}

export interface ConditionalSection {
  id: string;
  label: string;
  description: string;
  documents: DocumentItem[];
}

export function getDocumentChecklist(generation: Generation): DocumentItem[] {
  const docs: DocumentItem[] = [
    // --- Application essentials ---
    {
      id: "cit0001",
      label: "CIT 0001 Application Form",
      description:
        "Application for a Citizenship Certificate for Adults and Minors (Proof of Citizenship) Under Section 3.",
      required: true,
      forPerson: "Applicant",
      category: "application",
      tip: "Must be opened in Adobe Acrobat Reader — not your browser. Write 'NA' for non-applicable sections; never leave a field blank. Print and sign after filling out electronically.",
    },
    {
      id: "id-docs",
      label: "Two pieces of valid ID",
      description:
        "Both must show your full name and date of birth. At least one must include a photo.",
      required: true,
      forPerson: "Applicant",
      category: "identity",
      tip: "Acceptable: driver's license, passport, health card, age of majority card. NOT accepted: birth certificates, SIN cards, bank cards, credit cards, or previous citizenship certificates.",
    },
    {
      id: "photos",
      label: "Two identical citizenship photos",
      description:
        "Must meet IRCC citizenship photo specifications (different from passport photos).",
      required: true,
      forPerson: "Applicant",
      category: "identity",
      tip: "Do NOT staple, glue, or attach photos directly to the application. Your application will be returned if photos don't meet specifications.",
    },
    {
      id: "fee-receipt",
      label: "Fee receipt ($75 CAD)",
      description:
        "IRCC official receipt with barcode from online payment.",
      required: true,
      forPerson: "Applicant",
      category: "application",
      tip: "Print TWO copies — attach one to the application, keep one for your records. Payment accepted: credit card, Debit Mastercard, Visa Debit. Outside Canada/US: pay at Canadian embassy/consulate.",
    },
    {
      id: "applicant-birth-cert",
      label: "Your long-form birth certificate",
      description:
        "Must show: your full name, date of birth, place of birth, and both parents' full names.",
      required: true,
      forPerson: "Applicant",
      category: "chain",
      tip: "Short-form certificates, computer abstracts (wallet-sized cards), and baptismal certificates are NOT accepted. This is the #1 reason for application delays.",
    },
  ];

  // --- Chain documents by generation ---
  if (generation === "G0" || generation === "G1") {
    docs.push({
      id: "parent-proof-g0",
      label: "Parent's proof of Canadian citizenship",
      description:
        "Long-form birth certificate showing birth in Canada, OR Canadian citizenship certificate, OR Canadian passport.",
      required: true,
      forPerson: "Parent (G0 — born in Canada)",
      category: "chain",
    });
  }

  if (
    generation === "G2" ||
    generation === "G3" ||
    generation === "G4" ||
    generation === "G5+"
  ) {
    docs.push(
      {
        id: "cover-letter",
        label: "Cover letter mapping family tree",
        description:
          "Maps each generation from the Canadian ancestor (G0) down to you. Cites the applicable legal section (e.g., s. 3(1)(g)).",
        required: false,
        forPerson: "Applicant",
        category: "application",
        tip: "Not technically required, but strongly recommended for multi-generational claims. Explain any name discrepancies or missing documents. Note if any ancestors are deceased.",
      },
      {
        id: "parent-birth-cert",
        label: "Parent's long-form birth certificate",
        description:
          "Must show parent's full name, date/place of birth, and their parents' (your grandparents') full names.",
        required: true,
        forPerson: "Parent (G1 — born abroad)",
        category: "chain",
      },
      {
        id: "grandparent-anchor",
        label: "Grandparent's Canadian birth certificate or naturalization record",
        description:
          "Proof that the anchor ancestor was born in Canada or became a naturalized Canadian citizen.",
        required: true,
        forPerson: "Grandparent (G0 — anchor)",
        category: "chain",
      },
    );
  }

  if (generation === "G3" || generation === "G4" || generation === "G5+") {
    docs.push(
      {
        id: "grandparent-birth-cert",
        label: "Grandparent's long-form birth certificate",
        description:
          "Must show grandparent's full name, date/place of birth, and their parents' (your great-grandparents') full names.",
        required: true,
        forPerson: "Grandparent (G1 — born abroad)",
        category: "chain",
      },
      {
        id: "great-grandparent-anchor",
        label: "Great-grandparent's Canadian birth certificate or naturalization record",
        description:
          "Proof of the anchor ancestor's Canadian citizenship.",
        required: true,
        forPerson: "Great-grandparent (G0 — anchor)",
        category: "chain",
        tip: "For pre-1900 births, church/baptismal records may be accepted as substitutes if no government record exists.",
      },
    );
  }

  if (generation === "G4" || generation === "G5+") {
    docs.push(
      {
        id: "great-grandparent-birth-cert",
        label: "Great-grandparent's long-form birth certificate",
        description:
          "Must show parents' names to link to the next generation in the chain.",
        required: true,
        forPerson: "Great-grandparent (G1 — born abroad)",
        category: "chain",
      },
      {
        id: "great-great-grandparent-anchor",
        label: "Great-great-grandparent's Canadian birth certificate or naturalization record",
        description:
          "Proof of the anchor ancestor's Canadian citizenship.",
        required: true,
        forPerson: "Great-great-grandparent (G0 — anchor)",
        category: "chain",
        tip: "Historical records may only be available from Library and Archives Canada, provincial archives, or church records.",
      },
    );
  }

  return docs;
}

export function getConditionalSections(generation: Generation): ConditionalSection[] {
  const sections: ConditionalSection[] = [
    {
      id: "deceased",
      label: "Deceased ancestors in the chain",
      description:
        "If any person in the chain of descent has passed away, include their death certificate.",
      documents: [
        {
          id: "death-cert",
          label: "Death certificate(s)",
          description:
            "For each deceased person in the chain. Helps establish identity and timeline.",
          required: true,
          forPerson: "Deceased ancestor(s)",
          category: "conditional",
          tip: "Death does NOT break the chain. Citizenship is recognized retroactively regardless of whether the person ever applied for it.",
        },
      ],
    },
    {
      id: "name-changes",
      label: "Name discrepancies between documents",
      description:
        "If names don't match exactly across birth certificates, marriage certificates, and other records.",
      documents: [
        {
          id: "marriage-cert",
          label: "Marriage certificate(s)",
          description:
            "To explain surname changes between generations.",
          required: true,
          forPerson: "Person with name change",
          category: "conditional",
        },
        {
          id: "name-change-doc",
          label: "Legal name change document(s)",
          description:
            "Court order or other official document for non-marriage name changes.",
          required: true,
          forPerson: "Person with name change",
          category: "conditional",
        },
      ],
    },
    {
      id: "translations",
      label: "Documents not in English or French",
      description:
        "All documents must be submitted in English or French, or with a certified translation.",
      documents: [
        {
          id: "translation",
          label: "Certified English or French translation",
          description:
            "For each document not in English or French.",
          required: true,
          forPerson: "As applicable",
          category: "conditional",
          tip: "The translator must NOT be the applicant or a family member. Include an affidavit from the translator swearing to proficiency and accuracy. Canadian certified translators (provincial/territorial organization members) do NOT need an affidavit.",
        },
      ],
    },
    {
      id: "previous-certs",
      label: "Previous citizenship certificates",
      description:
        "If you are replacing an existing citizenship certificate.",
      documents: [
        {
          id: "prev-cert",
          label: "All original citizenship certificates",
          description:
            "Must return ALL original certificates with your application. You cannot hold more than one valid certificate.",
          required: true,
          forPerson: "Applicant",
          category: "conditional",
        },
      ],
    },
  ];

  // Physical presence section only relevant for prospective cases, but include for awareness
  if (generation === "G2" || generation === "G3" || generation === "G4" || generation === "G5+") {
    sections.push({
      id: "quebec",
      label: "Quebec documents (pre-1994)",
      description:
        "Birth and marriage certificates issued in Quebec BEFORE January 1, 1994 are NOT accepted.",
      documents: [
        {
          id: "quebec-replacement",
          label: "Replacement certificate from Directeur de l'état civil du Québec",
          description:
            "If your chain includes Quebec vital records from before 1994, you must obtain replacement certificates.",
          required: true,
          forPerson: "As applicable",
          category: "conditional",
        },
      ],
    });
  }

  return sections;
}

export const CATEGORY_LABELS: Record<DocumentCategory, string> = {
  application: "Application Essentials",
  identity: "Identity & Photos",
  chain: "Chain of Descent",
  supplementary: "Supplementary",
  conditional: "Conditional",
};
