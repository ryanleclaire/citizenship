import Link from "next/link";
import { IRCC_LINKS } from "@/lib/constants";

export default function Step1Page() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4">
        <p className="text-sm text-navy-400 uppercase tracking-wide mb-2">Step 1 of 4</p>
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3">Gather Documents</h1>
        <p className="text-navy-400 mb-10">
          Before you fill out a single form, you need to collect the right documents for every
          person in your chain of descent. This is the most time-consuming step &mdash; start early.
        </p>

        {/* Birth Certificates */}
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-navy mb-4 pl-4 border-l-4 border-red">
            Long-Form Birth Certificates
          </h2>
          <div className="card space-y-4">
            <p className="text-navy-400">
              You need a <strong>long-form birth certificate</strong> for every person in your chain
              of descent &mdash; from you all the way back to the Canadian-born (or naturalized) anchor ancestor.
              This is the single most important document category.
            </p>
            <div className="bg-red-50/50 border border-red-100 rounded-lg p-4">
              <p className="font-semibold text-navy text-sm mb-2">What counts as &ldquo;long-form&rdquo;?</p>
              <p className="text-navy-400 text-sm">
                The certificate must show the child&apos;s <strong>full name</strong>, <strong>date of birth</strong>,{" "}
                <strong>place of birth</strong>, and <strong>both parents&apos; full names</strong>.
                If any of these are missing, it&apos;s the wrong format.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="font-semibold text-navy text-sm mb-2">Not accepted by IRCC</p>
              <ul className="text-navy-400 text-sm space-y-1 list-disc list-inside">
                <li>Short-form birth certificates</li>
                <li>Computer abstracts (wallet-sized cards)</li>
                <li>Baptismal certificates (unless no government record exists &mdash; see Quebec note below)</li>
                <li>Hospital-issued birth records</li>
              </ul>
            </div>
            <p className="text-navy-400 text-sm">
              Order from the vital statistics office of the province or state where each person was born.
              Processing times vary from days to weeks &mdash; don&apos;t wait.
              See our{" "}
              <Link href="/resources" className="text-red hover:underline">
                Resources page
              </Link>{" "}
              for links to every Canadian provincial office and US ordering services.
            </p>
          </div>
        </section>

        {/* Quebec */}
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-navy mb-4 pl-4 border-l-4 border-red">
            Quebec Ancestors
          </h2>
          <div className="card space-y-4">
            <p className="text-navy-400">
              Quebec did not have government birth registration until 1994. Before that, births were
              recorded by churches (primarily Catholic parish registers). If your ancestor was born in Quebec
              before 1994:
            </p>
            <ol className="text-navy-400 text-sm space-y-3 list-decimal list-inside">
              <li>
                <strong>Start with the Directeur de l&apos;&eacute;tat civil</strong> &mdash; request a
                &ldquo;copie d&apos;acte de naissance&rdquo; (the Quebec equivalent of a long-form birth certificate).
                Many pre-1994 church records have been transferred to the civil registry.
              </li>
              <li>
                <strong>If the Directeur has no record</strong>, request a &ldquo;lettre de recherche
                n&eacute;gative&rdquo; (negative search letter), then obtain a certified baptismal extract
                from the parish or diocesan archives.
              </li>
              <li>
                <strong>Include a cover letter</strong> explaining Quebec&apos;s civil registration history
                to the IRCC officer processing your case.
              </li>
            </ol>
            <p className="text-navy-400 text-sm">
              French-language documents do <strong>not</strong> need translation &mdash; French is an official
              language of Canada. Very old records in Latin do require certified translation.
            </p>
          </div>
        </section>

        {/* Anchor ancestor */}
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-navy mb-4 pl-4 border-l-4 border-red">
            Anchor Ancestor (G0) Proof
          </h2>
          <div className="card space-y-4">
            <p className="text-navy-400">
              Your anchor ancestor is the person in your chain who was born in Canada or naturalized
              as a Canadian citizen. You need proof of their Canadian status:
            </p>
            <ul className="text-navy-400 text-sm space-y-2 list-disc list-inside">
              <li>Long-form birth certificate showing birth in Canada, OR</li>
              <li>Canadian citizenship certificate, OR</li>
              <li>Naturalization certificate or record (for those who immigrated to Canada and became citizens)</li>
            </ul>
            <p className="text-navy-400 text-sm">
              For ancestors naturalized before 1947 (when Canadians were &ldquo;British subjects&rdquo;),
              historical naturalization records may be available from Library and Archives Canada.
            </p>
          </div>
        </section>

        {/* Applicant ID and photos */}
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-navy mb-4 pl-4 border-l-4 border-red">
            Your Identity Documents &amp; Photos
          </h2>
          <div className="card space-y-4">
            <div>
              <p className="font-semibold text-navy text-sm mb-2">Two pieces of ID</p>
              <p className="text-navy-400 text-sm">
                Both must show your full name and date of birth. At least one must have a photo.
                Common combination for US applicants: driver&apos;s license + passport. Birth certificates,
                SIN cards, bank cards, and credit cards are <strong>not</strong> accepted as ID.
              </p>
            </div>
            <div>
              <p className="font-semibold text-navy text-sm mb-2">Two citizenship photos</p>
              <p className="text-navy-400 text-sm">
                These are <strong>not the same as passport photos</strong>. Canadian citizenship photos are
                50mm &times; 70mm (2&quot; &times; 2.75&quot;) with specific head size, white background, no glasses,
                and the photographer must stamp/sign the back. Go to a professional photographer and
                specifically ask for &ldquo;Canadian citizenship photo specifications.&rdquo;
                Do not staple or glue photos &mdash; place them in a small envelope and paper-clip it to your application.
              </p>
              <p className="text-navy-400 text-sm mt-2">
                <a href={IRCC_LINKS.photoSpecs} target="_blank" rel="noopener noreferrer" className="text-red hover:underline">
                  View IRCC photo specifications &rarr;
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Supporting docs */}
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-navy mb-4 pl-4 border-l-4 border-red">
            Supporting Documents
          </h2>
          <div className="card space-y-4">
            <div>
              <p className="font-semibold text-navy text-sm mb-2">For deceased ancestors in the chain</p>
              <p className="text-navy-400 text-sm">
                Provide a death certificate. Death does not break the chain &mdash; it helps IRCC
                establish identity and timeline.
              </p>
            </div>
            <div>
              <p className="font-semibold text-navy text-sm mb-2">For name discrepancies between documents</p>
              <p className="text-navy-400 text-sm">
                Marriage certificates, legal name change documents, or statutory declarations
                that bridge the different names. Explain each discrepancy in your cover letter.
              </p>
            </div>
            <div>
              <p className="font-semibold text-navy text-sm mb-2">For documents not in English or French</p>
              <p className="text-navy-400 text-sm">
                Provide a certified translation plus a translator&apos;s affidavit swearing to accuracy.
                The translator must not be the applicant or a family member. Canadian certified translators
                (members of a provincial/territorial translators&apos; organization) do not need an affidavit.
              </p>
            </div>
            <div>
              <p className="font-semibold text-navy text-sm mb-2">For the substantial connection test (born on/after Dec 15, 2025)</p>
              <p className="text-navy-400 text-sm">
                If applicable, the Canadian parent must demonstrate 1,095 days of physical presence in Canada.
                Gather: T4 tax slips, employment records, school transcripts, health cards, rental agreements,
                utility bills, bank statements. Days do not need to be consecutive.
              </p>
            </div>
          </div>
        </section>

        {/* Tip box */}
        <div className="bg-navy/5 rounded-lg p-6 mb-10">
          <p className="font-serif font-semibold text-navy mb-2">Pro tip: Start gathering documents now</p>
          <p className="text-navy-400 text-sm">
            Ordering birth certificates from vital statistics offices can take 2&ndash;8 weeks depending
            on the jurisdiction. Quebec records can take longer. If you need records from church archives
            or Library and Archives Canada, allow even more time. Don&apos;t wait until you&apos;re ready to
            submit &mdash; order everything as soon as possible.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
          <Link href="/guide" className="text-navy-400 hover:text-navy text-sm">
            &larr; Back to Guide
          </Link>
          <Link href="/guide/step-2" className="btn-primary">
            Step 2: Complete the Application &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
