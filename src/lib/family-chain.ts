export interface PersonDocument {
  id: string;
  label: string;
  description: string;
  required: boolean;
}

export interface ChainPerson {
  id: string;
  role: "anchor" | "intermediate" | "applicant";
  generationLabel: string;
  relationLabel: string;
  name: string;
  birthPlace: string;
  birthYear: string;
  isDeceased: boolean;
  documents: PersonDocument[];
  checkedDocs: Set<string>;
}

const RELATION_LABELS: Record<number, string> = {
  0: "You (Applicant)",
  1: "Parent",
  2: "Grandparent",
  3: "Great-Grandparent",
  4: "Great-Great-Grandparent",
  5: "Great-Great-Great-Grandparent",
};

function getRelationLabel(distanceFromApplicant: number): string {
  return RELATION_LABELS[distanceFromApplicant] ?? `${distanceFromApplicant}x Great-Grandparent`;
}

function getAnchorDocuments(): PersonDocument[] {
  return [
    {
      id: "anchor-birth-cert",
      label: "Canadian birth certificate",
      description: "Long-form birth certificate showing birth in Canada.",
      required: true,
    },
    {
      id: "anchor-naturalization",
      label: "OR Naturalization certificate/record",
      description: "If naturalized rather than born in Canada.",
      required: false,
    },
  ];
}

function getIntermediateDocuments(relation: string): PersonDocument[] {
  return [
    {
      id: `${relation}-birth-cert`,
      label: "Long-form birth certificate",
      description: "Must show full name, date/place of birth, and both parents' full names.",
      required: true,
    },
  ];
}

function getApplicantDocuments(): PersonDocument[] {
  return [
    {
      id: "app-birth-cert",
      label: "Your long-form birth certificate",
      description: "Must show full name, date/place of birth, and both parents' full names.",
      required: true,
    },
    {
      id: "app-id-docs",
      label: "Two pieces of valid ID",
      description: "Both must show full name and date of birth. At least one must have a photo.",
      required: true,
    },
    {
      id: "app-photos",
      label: "Two identical citizenship photos",
      description: "Must meet IRCC citizenship photo specifications.",
      required: true,
    },
    {
      id: "app-cit0001",
      label: "CIT 0001 Application Form",
      description: "Completed in Adobe Acrobat Reader, printed, and signed.",
      required: true,
    },
    {
      id: "app-fee",
      label: "Fee receipt ($75 CAD)",
      description: "Print two copies of the IRCC receipt with barcode.",
      required: true,
    },
    {
      id: "app-cover-letter",
      label: "Cover letter mapping family tree",
      description: "Maps each generation and cites the applicable legal section.",
      required: false,
    },
  ];
}

function getDeceasedDocuments(personId: string): PersonDocument {
  return {
    id: `${personId}-death-cert`,
    label: "Death certificate",
    description: "Helps establish identity and timeline. Death does NOT break the chain.",
    required: true,
  };
}

function getNameChangeDocuments(personId: string): PersonDocument[] {
  return [
    {
      id: `${personId}-marriage-cert`,
      label: "Marriage certificate",
      description: "To explain surname changes.",
      required: true,
    },
    {
      id: `${personId}-name-change`,
      label: "Legal name change document",
      description: "If name changed for reasons other than marriage.",
      required: false,
    },
  ];
}

export function buildChain(generationCount: number): ChainPerson[] {
  const chain: ChainPerson[] = [];

  // Anchor (G0) — furthest back
  chain.push({
    id: "person-0",
    role: "anchor",
    generationLabel: "G0",
    relationLabel: getRelationLabel(generationCount),
    name: "",
    birthPlace: "",
    birthYear: "",
    isDeceased: false,
    documents: getAnchorDocuments(),
    checkedDocs: new Set(),
  });

  // Intermediate generations
  for (let i = 1; i < generationCount; i++) {
    const distanceFromApplicant = generationCount - i;
    chain.push({
      id: `person-${i}`,
      role: "intermediate",
      generationLabel: `G${i}`,
      relationLabel: getRelationLabel(distanceFromApplicant),
      name: "",
      birthPlace: "",
      birthYear: "",
      isDeceased: false,
      documents: getIntermediateDocuments(`person-${i}`),
      checkedDocs: new Set(),
    });
  }

  // Applicant
  chain.push({
    id: `person-${generationCount}`,
    role: "applicant",
    generationLabel: `G${generationCount}`,
    relationLabel: "You (Applicant)",
    name: "",
    birthPlace: "",
    birthYear: "",
    isDeceased: false,
    documents: getApplicantDocuments(),
    checkedDocs: new Set(),
  });

  return chain;
}

export function getDocumentsForPerson(person: ChainPerson): PersonDocument[] {
  const docs = [...person.documents];
  if (person.isDeceased && person.role !== "applicant") {
    docs.push(getDeceasedDocuments(person.id));
  }
  return docs;
}

export { getNameChangeDocuments, getDeceasedDocuments };
