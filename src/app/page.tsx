import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-navy text-white py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <img
            src="/images/logo.png"
            alt="Citizenship Mountie"
            width={120}
            height={120}
            className="mx-auto mb-8"
          />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
            Discover Your Canadian Citizenship
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-4 max-w-2xl mx-auto">
            Bill C-3 removed the generational limit on Canadian citizenship by
            descent. If you have a Canadian ancestor, you may already be a
            citizen.
          </p>
          <p className="text-white/50 mb-10 text-sm">
            Effective December 15, 2025 &mdash; an estimated 350,000&ndash;500,000
            people worldwide are newly eligible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/eligibility" className="btn-primary text-lg px-8 py-4">
              Check Your Eligibility
            </Link>
            <Link href="/guide" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-navy transition-colors duration-200 text-lg">
              View the Guide
            </Link>
          </div>
        </div>
      </section>

      {/* What Changed Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
            What Changed Under Bill C-3?
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-navy-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2">Before Bill C-3</h3>
              <p className="text-navy-400">
                Canadian citizenship by descent was limited to <strong>one generation</strong> born
                outside Canada. If your parent was the first generation born abroad, the chain
                stopped with you. Grandchildren and further descendants were excluded.
              </p>
            </div>
            <div className="card border-red-200 bg-red-50/30">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2">After Bill C-3</h3>
              <p className="text-navy-400">
                For anyone born <strong>before December 15, 2025</strong>, there is{" "}
                <strong>no generational limit</strong>. Citizenship flows through the entire chain of
                descent, no matter how many generations back your Canadian ancestor was born.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-4">
            How This Guide Helps
          </h2>
          <p className="text-center text-navy-400 mb-12 max-w-2xl mx-auto">
            We walk you through the entire process, from checking your eligibility to
            submitting your application.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Check Eligibility",
                desc: "Answer a few questions to determine if you qualify under Bill C-3 and which generation you are.",
                href: "/eligibility",
              },
              {
                step: "2",
                title: "Build Your Checklist",
                desc: "Get a personalized list of every document you need, tailored to your specific family chain.",
                href: "/checklist",
              },
              {
                step: "3",
                title: "Apply Step by Step",
                desc: "Follow our detailed guide through form completion, fee payment, and application submission.",
                href: "/guide",
              },
            ].map((item) => (
              <Link key={item.step} href={item.href} className="card group hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-red rounded-full flex items-center justify-center text-white font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-serif font-semibold mb-2 group-hover:text-red transition-colors">
                  {item.title}
                </h3>
                <p className="text-navy-400 text-sm">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Key Facts */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
            Key Facts
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { label: "Application Fee", value: "$75 CAD per person" },
              { label: "Processing Time", value: "~10 months" },
              { label: "Application Form", value: "CIT 0001" },
              { label: "Deadline to Apply", value: "None \u2014 no deadline" },
              { label: "Paper or Online?", value: "Paper recommended for multi-gen claims" },
              { label: "Dual Citizenship", value: "Canada allows dual citizenship" },
            ].map((fact) => (
              <div key={fact.label} className="flex gap-4 items-start">
                <div className="w-2 h-2 bg-red rounded-full mt-2 shrink-0" />
                <div>
                  <p className="font-semibold text-sm">{fact.label}</p>
                  <p className="text-navy-400 text-sm">{fact.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-red text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/80 mb-8">
            The eligibility check takes about 2 minutes. Find out if Bill C-3 applies to you.
          </p>
          <Link href="/eligibility" className="inline-flex items-center justify-center px-8 py-4 bg-white text-red font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200 text-lg">
            Check Your Eligibility
          </Link>
        </div>
      </section>
    </>
  );
}
