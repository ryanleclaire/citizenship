import Link from "next/link";

const steps = [
  {
    number: 1,
    title: "Gather Documents",
    description: "Collect long-form birth certificates, identity documents, photos, and supporting records for your application.",
    href: "/guide/step-1",
  },
  {
    number: 2,
    title: "Complete the Application",
    description: "Fill out form CIT 0001 section by section using Adobe Acrobat Reader.",
    href: "/guide/step-2",
  },
  {
    number: 3,
    title: "Pay Fees",
    description: "Pay the $75 CAD processing fee online and print two copies of your receipt.",
    href: "/guide/step-3",
  },
  {
    number: 4,
    title: "Submit Application",
    description: "Determine whether to submit online or by paper, and mail your complete application package.",
    href: "/guide/step-4",
  },
];

export default function GuidePage() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3">
          Step-by-Step Application Guide
        </h1>
        <p className="text-navy-400 mb-10">
          Follow these four steps to complete your Canadian citizenship certificate application.
        </p>
        <div className="space-y-4">
          {steps.map((step) => (
            <Link key={step.number} href={step.href} className="card block group hover:shadow-md transition-shadow">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-maple rounded-full flex items-center justify-center text-white font-bold shrink-0">
                  {step.number}
                </div>
                <div>
                  <h2 className="text-xl font-serif font-semibold group-hover:text-maple transition-colors">
                    {step.title}
                  </h2>
                  <p className="text-navy-400 text-sm mt-1">{step.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
