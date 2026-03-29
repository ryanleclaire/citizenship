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
  { label: "Hayer Law \u2014 No, Bill C-3 Does Not Create a New Second-Generation Limit", href: LEGAL_ANALYSIS_LINKS.hayerLaw },
  { label: "Dentons \u2014 Bill C-3 Restores Canadian Citizenship to Lost Canadians", href: LEGAL_ANALYSIS_LINKS.dentons },
  { label: "EY Global Tax Alert \u2014 Bill C-3 Comes Into Force", href: LEGAL_ANALYSIS_LINKS.eyTaxAlert },
  { label: "Canadian Bar Association \u2014 Submission on Bill C-3", href: LEGAL_ANALYSIS_LINKS.cbaSubmission },
  { label: "LostCanadian.com \u2014 Advocacy & Resources for Lost Canadians", href: LEGAL_ANALYSIS_LINKS.lostCanadian },
];

const communityResources = [
  { label: "r/Canadiancitizenship", href: IRCC_LINKS.subreddit, desc: "The most active community for citizenship-by-descent applicants" },
  { label: "r/Canadiancitizenship Wiki", href: "https://www.reddit.com/r/Canadiancitizenship/wiki/index/", desc: "Community-maintained guide and resources" },
  { label: "r/ImmigrationCanada", href: "https://www.reddit.com/r/ImmigrationCanada/", desc: "Broader Canadian immigration discussions" },
  { label: "r/AmerExit", href: "https://www.reddit.com/r/AmerExit/", desc: "Americans exploring Canadian citizenship and relocation" },
];

const genealogyResources = [
  { label: "Library and Archives Canada \u2014 Genealogy", href: GENEALOGY_LINKS.libraryArchivesCanada, desc: "Historical citizenship, immigration, and naturalization records" },
  { label: "FamilySearch.org", href: GENEALOGY_LINKS.familySearch, desc: "Free genealogy database with extensive Canadian records including Quebec parish registers" },
  { label: "Ancestry.ca", href: GENEALOGY_LINKS.ancestryCa, desc: "Canadian census, vital, and immigration records (subscription)" },
  { label: "BAnQ (Biblioth\u00e8que et Archives nationales du Qu\u00e9bec)", href: GENEALOGY_LINKS.banq, desc: "Quebec church records, the Drouin Collection, and provincial archives" },
  { label: "Automated Genealogy", href: GENEALOGY_LINKS.automatedGenealogy, desc: "Searchable Canadian census records (1901, 1906, 1911)" },
];

const usResources = [
  { label: "USA.gov \u2014 Birth Certificates", href: "https://www.usa.gov/birth-certificates", desc: "How to order birth certificates from each US state" },
  { label: "VitalChek", href: "https://www.vitalchek.com/", desc: "Authorized vendor for ordering vital records from many US states" },
  { label: "CDC \u2014 State Vital Records Contacts", href: "https://www.cdc.gov/nchs/w2w/index.htm", desc: "Official directory of all 50 state vital records offices" },
];

function LinkList({ items }: { items: { label: string; href: string; desc?: string }[] }) {
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
          {r.desc && (
            <p className="text-navy-400 text-xs mt-0.5">{r.desc}</p>
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

        <h2 className="text-2xl font-serif font-semibold mb-4">Official Government Resources</h2>
        <div className="card mb-8">
          <LinkList items={officialResources} />
        </div>

        <h2 className="text-2xl font-serif font-semibold mb-1">Legal Analysis &amp; Guides</h2>
        <p className="text-navy-400 text-sm mb-4">Law firm analyses and expert commentary on Bill C-3 and citizenship by descent.</p>
        <div className="card mb-8">
          <LinkList items={legalResources} />
        </div>

        <h2 className="text-2xl font-serif font-semibold mb-1">Provincial Vital Statistics Offices</h2>
        <p className="text-navy-400 text-sm mb-4">Order long-form birth certificates from each Canadian province and territory. Always request the long form showing both parents&apos; names.</p>
        <div className="card mb-8">
          <LinkList items={PROVINCIAL_VITAL_STATS.map((p) => ({ label: p.province, href: p.href }))} />
        </div>

        <h2 className="text-2xl font-serif font-semibold mb-1">US Birth Certificate &amp; Document Resources</h2>
        <p className="text-navy-400 text-sm mb-4">For US-based applicants who need to order their own birth certificates.</p>
        <div className="card mb-8">
          <LinkList items={usResources} />
        </div>

        <h2 className="text-2xl font-serif font-semibold mb-1">Genealogy &amp; Historical Records</h2>
        <p className="text-navy-400 text-sm mb-4">For tracing your Canadian ancestry and finding historical vital records.</p>
        <div className="card mb-8">
          <LinkList items={genealogyResources} />
        </div>

        <h2 className="text-2xl font-serif font-semibold mb-4">Community Resources</h2>
        <div className="card">
          <LinkList items={communityResources} />
        </div>
      </div>
    </div>
  );
}
