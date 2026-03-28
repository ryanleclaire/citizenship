import { IRCC_LINKS } from "@/lib/constants";

const officialResources = [
  { label: "Bill C-3 Changes Explained (IRCC)", href: IRCC_LINKS.billC3Changes },
  { label: "CIT 0001 Application Form & Guide", href: IRCC_LINKS.cit0001Guide },
  { label: "CIT 0014 Document Checklist", href: IRCC_LINKS.cit0014Checklist },
  { label: "Citizenship Certificate Application Page", href: IRCC_LINKS.applicationPage },
  { label: "IRCC Online Portal", href: IRCC_LINKS.onlinePortal },
  { label: "Citizenship Photo Specifications", href: IRCC_LINKS.photoSpecs },
  { label: "Fee Payment Portal", href: IRCC_LINKS.feePayment },
  { label: "Bill C-3 Backgrounder (Dec 15, 2025)", href: IRCC_LINKS.backgrounder },
  { label: "Bill C-3 Full Text (LEGISinfo)", href: IRCC_LINKS.billText },
  { label: "Justice Canada Analysis", href: IRCC_LINKS.justiceAnalysis },
  { label: "Citizenship Act (Full Text)", href: IRCC_LINKS.citizenshipAct },
];

const communityResources = [
  { label: "r/Canadiancitizenship", href: IRCC_LINKS.subreddit },
  { label: "r/ImmigrationCanada", href: "https://www.reddit.com/r/ImmigrationCanada/" },
];

export default function ResourcesPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3">
          Resources
        </h1>
        <p className="text-navy-400 mb-10">
          Official government links and community resources for your citizenship application.
        </p>

        <h2 className="text-2xl font-serif font-semibold mb-4">Official Government Resources</h2>
        <div className="card mb-8">
          <ul className="space-y-3">
            {officialResources.map((r) => (
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
              </li>
            ))}
          </ul>
        </div>

        <h2 className="text-2xl font-serif font-semibold mb-4">Community Resources</h2>
        <div className="card">
          <ul className="space-y-3">
            {communityResources.map((r) => (
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
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
