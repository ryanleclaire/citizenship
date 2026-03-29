import {
  IRCC_LINKS,
  LEGAL_ANALYSIS_LINKS,
  PROVINCIAL_VITAL_STATS,
  GENEALOGY_LINKS,
} from "@/lib/constants";

const officialResources = [
  { label: "Bill C-3 Changes Explained (IRCC)", href: IRCC_LINKS.billC3Changes },
  { label: "CIT 0001 Application Form & Guide", href: IRCC_LINKS.cit0001Guide },
  { label: "CIT 0014 Document Checklist", href: IRCC_LINKS.cit0014Checklist },
  { label: "Citizenship Certificate Application Page", href: IRCC_LINKS.applicationPage },
  { label: "Proof of Citizenship Overview", href: IRCC_LINKS.proofOfCitizenship },
  { label: "IRCC Online Portal", href: IRCC_LINKS.onlinePortal },
  { label: "Citizenship Photo Specifications", href: IRCC_LINKS.photoSpecs },
  { label: "Fee Payment Portal", href: IRCC_LINKS.feePayment },
  { label: "Processing Times", href: IRCC_LINKS.processingTimes },
  { label: "Application Status Tracker", href: IRCC_LINKS.applicationTracker },
  { label: "IRCC Web Form (General Inquiries)", href: IRCC_LINKS.irccWebForm },
  { label: "Find a Canadian Embassy/Consulate", href: IRCC_LINKS.embassyFinder },
  { label: "Bill C-3 Backgrounder (Dec 15, 2025)", href: IRCC_LINKS.backgrounder },
  { label: "Bill C-3 Full Text (LEGISinfo)", href: IRCC_LINKS.billText },
  { label: "Justice Canada Analysis", href: IRCC_LINKS.justiceAnalysis },
  { label: "Citizenship Act (Full Text)", href: IRCC_LINKS.citizenshipAct },
];

const legalResources = [
  {
    label: "Hayer Law — \"No, Bill C-3 Does Not Create a New Second-Generation Limit\"",
    href: LEGAL_ANALYSIS_LINKS.hayerLaw,
  },
  {
    label: "Dentons — \"Bill C-3 Restores Canadian Citizenship to Lost Canadians\"",
    href: LEGAL_ANALYSIS_LINKS.dentons,
  },
  {
    label: "EY Global Tax Alert — Bill C-3 Comes Into Force",
    href: LEGAL_ANALYSIS_LINKS.eyTaxAlert,
  },
  {
    label: "Canadian Bar Association — Submission on Bill C-3",
    href: LEGAL_ANALYSIS_LINKS.cbaSubmission,
  },
  {
    label: "LostCanadian.com — Advocacy & Resources for Lost Canadians",
    href: LEGAL_ANALYSIS_LINKS.lostCanadian,
  },
];

const communityResources = [
  { label: "r/Canadiancitizenship", href: IRCC_LINKS.subreddit, description: "The most active community for citizenship-by-descent applicants" },
  { label: "r/Canadiancitizenship Wiki", href: "https://www.reddit.com/r/Canadiancitizenship/wiki/index/", description: "Community-maintained guide and resources" },
  { label: "r/ImmigrationCanada", href: "https://www.reddit.com/r/ImmigrationCanada/", description: "Broader Canadian immigration discussions" },
  { label: "r/AmerExit", href: "https://www.reddit.com/r/AmerExit/", description: "Americans exploring Canadian citizenship and relocation" },
];

const genealogyResources = [
  { label: "Library and Archives Canada — Genealogy", href: GENEALOGY_LINKS.libraryArchivesCanada, description: "Historical citizenship, immigration, and naturalization records" },
  { label: "FamilySearch.org", href: GENEALOGY_LINKS.familySearch, description: "Free genealogy database with extensive Canadian records including Quebec parish registers" },
  { label: "Ancestry.ca", href: GENEALOGY_LINKS.ancestryCa, description: "Canadian census, vital, and immigration records (subscription)" },
  { label: "BAnQ (Bibliothèque et Archives nationales du Québec)", href: GENEALOGY_LINKS.banq, description: "Quebec church records, the Drouin Collection, and provincial archives" },
  { label: "Automated Genealogy", href: GENEALOGY_LINKS.automatedGenealogy, description: "Searchable Canadian census records (1901, 1906, 1911)" },
];

const usResources = [
  { label: "USA.gov — Birth Certificates", href: "https://www.usa.gov/birth-certificates", description: "How to order birth certificates from each US state" },
  { label: "VitalChek", href: "https://www.vitalchek.com/", description: "Authorized vendor for ordering vital records from many US states" },
  { label: "CDC — State Vital Records Contacts", href: "https://www.cdc.gov/nchs/w2w/index.htm", description: "Official directory of all 50 state vital records offices" },
];

function ResourceSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-serif font-semibold mb-1">{title}</h2>
      {description && (
        <p className="text-navy-400 text-sm mb-4">{description}</p>
      )}
      <div className="card">{children}</div>
    </div>
  );
}

function ResourceList({
  items,
}: {
  items: { label: string; href: string; description?: string }[];
}) {
  return (
    <ul className="space-y-3">
      {items.map((r) => (
        <li key={r.href}>
          <a
            href={r.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red hover:underline font-medium text-sm"
          >
            {r.label}
            <span className="text-navy-300 ml-1">&rarr;</span>
          </a>
          {r.description && (
            <p className="text-navy-400 text-xs mt-0.5">{r.description}</p>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function ResourcesPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3">
          Resources
        </h1>
        <p className="text-navy-400 mb-10">
          Official government links, legal analysis, community resources, and
          tools to help you through your citizenship application.
        </p>

        <ResourceSection title="Official Government Resources">
          <ResourceList items={officialResources} />
        </ResourceSection>

        <ResourceSection
          title="Legal Analysis & Guides"
          description="Law firm analyses and expert commentary on Bill C-3 and citizenship by descent."
        >
          <ResourceList items={legalResources} />
        </ResourceSection>

        <ResourceSection
          title="Provincial Vital Statistics Offices"
          description="Order long-form birth certificates from each Canadian province and territory. Always request the \"long form\" showing both parents' names."
        >
          <ResourceList
            items={PROVINCIAL_VITAL_STATS.map((p) => ({
              label: p.province,
              href: p.href,
            }))}
          />
        </ResourceSection>

        <ResourceSection
          title="US Birth Certificate & Document Resources"
          description="For US-based applicants who need to order their own birth certificates."
        >
          <ResourceList items={usResources} />
        </ResourceSection>

        <ResourceSection
          title="Genealogy & Historical Records"
          description="For tracing your Canadian ancestry and finding historical vital records."
        >
          <ResourceList items={genealogyResources} />
        </ResourceSection>

        <ResourceSection title="Community Resources">
          <ResourceList items={communityResources} />
        </ResourceSection>
      </div>
    </div>
  );
}
