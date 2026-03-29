import Link from "next/link";
import { IRCC_LINKS, MAILING_ADDRESS } from "@/lib/constants";

export default function Step4Page() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4">
        <p className="text-sm text-navy-400 uppercase tracking-wide mb-2">Step 4 of 4</p>
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3">Submit Application</h1>
        <p className="text-navy-400 mb-10">
          You&apos;ve gathered your documents, completed CIT 0001, and paid the fee. Now it&apos;s time to
          assemble your package and send it in.
        </p>

        {/* Paper vs Online */}
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-navy mb-4 pl-4 border-l-4 border-red">
            Paper vs. Online
          </h2>
          <div className="card space-y-4">
            <div className="bg-red-50/50 border border-red-100 rounded-lg p-4">
              <p className="font-semibold text-navy text-sm mb-2">Most Bill C-3 applicants should submit by paper</p>
              <p className="text-navy-400 text-sm">
                The IRCC online portal was designed for straightforward first-generation claims where a parent
                was born in Canada. It does not have adequate fields or document upload capability for
                multi-generational chains. If you are a G2 or beyond, <strong>submit by paper</strong>.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="font-semibold text-navy text-sm mb-2">When online may work</p>
              <p className="text-navy-400 text-sm">
                If you are G1 (parent born in Canada) with a straightforward case &mdash; no name discrepancies,
                no deceased ancestors, no complex documentation &mdash; you may be able to use the{" "}
                <a href={IRCC_LINKS.onlinePortal} target="_blank" rel="noopener noreferrer" className="text-red hover:underline">
                  IRCC online portal
                </a>. Even then, many G1 applicants prefer paper for the ability to include a cover letter
                and organized supporting documents.
              </p>
            </div>
          </div>
        </section>

        {/* Organize your package */}
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-navy mb-4 pl-4 border-l-4 border-red">
            Organize Your Package
          </h2>
          <div className="card">
            <p className="text-navy-400 mb-4">
              Assemble your application in this order. Use tabs or dividers to separate sections &mdash;
              making it easy for the officer to find everything reduces processing delays.
            </p>
            <ol className="space-y-3 text-navy-400 text-sm">
              <li className="flex gap-3">
                <span className="bg-red text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</span>
                <span><strong>Cover letter</strong> &mdash; maps your family tree, cites the applicable legal section, explains any complexities</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-red text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</span>
                <span><strong>CIT 0001 form</strong> &mdash; filled out, printed, and signed</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-red text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</span>
                <span><strong>Fee receipt</strong> &mdash; one copy attached (keep the second copy at home)</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-red text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">4</span>
                <span><strong>Two citizenship photos</strong> &mdash; in a small envelope, paper-clipped (not stapled or glued)</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-red text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">5</span>
                <span><strong>Your documents</strong> &mdash; your birth certificate and two pieces of ID (color photocopies)</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-red text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">6</span>
                <span><strong>Chain of descent documents</strong> &mdash; in generational order, G0 (anchor) first, working forward to you</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-red text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">7</span>
                <span><strong>Supporting documents</strong> &mdash; marriage certificates, death certificates, name change documents</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-red text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">8</span>
                <span><strong>CIT 0014 checklist</strong> &mdash; filled out as a table of contents for your package</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-red text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">9</span>
                <span><strong>Translations &amp; affidavits</strong> &mdash; if any documents are not in English or French</span>
              </li>
            </ol>
            <p className="text-navy-400 text-sm mt-4">
              <a href={IRCC_LINKS.cit0014Checklist} target="_blank" rel="noopener noreferrer" className="text-red hover:underline">
                Download CIT 0014 document checklist from IRCC &rarr;
              </a>
            </p>
          </div>
        </section>

        {/* Where to mail */}
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-navy mb-4 pl-4 border-l-4 border-red">
            Where to Mail It
          </h2>
          <div className="card space-y-4">
            <div>
              <p className="font-semibold text-navy text-sm mb-2">From Canada or the United States (courier)</p>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm text-navy-400">
                <p>{MAILING_ADDRESS.courier.name}</p>
                <p>{MAILING_ADDRESS.courier.street}</p>
                <p>{MAILING_ADDRESS.courier.city} {MAILING_ADDRESS.courier.postal}</p>
                <p>{MAILING_ADDRESS.courier.country}</p>
              </div>
            </div>
            <div className="bg-red-50/50 border border-red-100 rounded-lg p-4">
              <p className="font-semibold text-navy text-sm mb-2">Always use tracked shipping</p>
              <p className="text-navy-400 text-sm">
                FedEx, UPS, DHL, or Canada Post Xpresspost. <strong>Never use untracked regular mail.</strong>{" "}
                Keep your tracking number &mdash; it&apos;s your proof of delivery if anything goes wrong.
                Use the street address above (courier companies cannot deliver to PO boxes).
              </p>
            </div>
            <div>
              <p className="font-semibold text-navy text-sm mb-2">From outside Canada and the US</p>
              <p className="text-navy-400 text-sm">
                Submit your application at the nearest Canadian embassy, high commission, or consulate.{" "}
                <a href={IRCC_LINKS.embassyFinder} target="_blank" rel="noopener noreferrer" className="text-red hover:underline">
                  Find your nearest office &rarr;
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Family submissions */}
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-navy mb-4 pl-4 border-l-4 border-red">
            Submitting for Multiple Family Members
          </h2>
          <div className="card space-y-4">
            <p className="text-navy-400">
              If multiple family members are applying, put all individual application packages into
              <strong> one envelope</strong> with a master cover letter explaining the relationships.
              This helps IRCC process them together and reduces the chance of inconsistent decisions.
            </p>
            <p className="text-navy-400 text-sm">
              Each person still needs their own CIT 0001, photos, fee receipt, and supporting documents.
              The shared cover letter ties everything together.
            </p>
          </div>
        </section>

        {/* What happens next */}
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-navy mb-4 pl-4 border-l-4 border-red">
            What Happens After You Submit
          </h2>
          <div className="card">
            <ol className="space-y-4 text-navy-400 text-sm">
              <li className="flex gap-3">
                <span className="bg-navy/10 text-navy w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</span>
                <div>
                  <strong className="text-navy">Acknowledgment of Receipt (AOR)</strong>
                  <p className="mt-1">IRCC sends a letter confirming they received your application. Expect this within 4&ndash;8 weeks of mailing. If you haven&apos;t received it after 8 weeks, follow up with IRCC.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="bg-navy/10 text-navy w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</span>
                <div>
                  <strong className="text-navy">Processing</strong>
                  <p className="mt-1">Your application is reviewed by a citizenship officer. This is the longest phase &mdash; currently averaging about 10 months as of early 2026. Multi-generational claims may take longer.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="bg-navy/10 text-navy w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</span>
                <div>
                  <strong className="text-navy">Procedural Fairness Letter (if needed)</strong>
                  <p className="mt-1">If IRCC has questions or concerns, they&apos;ll send a letter giving you a chance to respond. This is <strong>not a rejection</strong> &mdash; it&apos;s an opportunity to provide clarification or additional documents.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="bg-navy/10 text-navy w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">4</span>
                <div>
                  <strong className="text-navy">Decision</strong>
                  <p className="mt-1">If approved, your citizenship certificate is mailed to you. This is your official proof of Canadian citizenship. You can then use it to apply for a Canadian passport.</p>
                </div>
              </li>
            </ol>
            <p className="text-navy-400 text-sm mt-4">
              <a href={IRCC_LINKS.processingTimes} target="_blank" rel="noopener noreferrer" className="text-red hover:underline">
                Check current IRCC processing times &rarr;
              </a>
            </p>
          </div>
        </section>

        {/* Final checklist */}
        <div className="bg-navy/5 rounded-lg p-6 mb-10">
          <p className="font-serif font-semibold text-navy mb-3">Before you seal the envelope</p>
          <ul className="text-navy-400 text-sm space-y-2">
            <li className="flex gap-2">
              <span className="text-red">&#10003;</span>
              <span>CIT 0001 is filled out completely (no blank fields) and signed</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red">&#10003;</span>
              <span>Fee receipt is attached</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red">&#10003;</span>
              <span>Two photos in an envelope, paper-clipped</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red">&#10003;</span>
              <span>Two pieces of ID (color photocopies)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red">&#10003;</span>
              <span>Birth certificates for every person in the chain (long-form)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red">&#10003;</span>
              <span>Anchor ancestor&apos;s proof of Canadian citizenship</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red">&#10003;</span>
              <span>Cover letter mapping the family tree</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red">&#10003;</span>
              <span>Supporting documents (death certificates, marriage certificates, translations)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red">&#10003;</span>
              <span>CIT 0014 checklist filled out</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red">&#10003;</span>
              <span>Shipping is tracked (FedEx, UPS, DHL, or Xpresspost)</span>
            </li>
          </ul>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
          <Link href="/guide/step-3" className="text-navy-400 hover:text-navy text-sm">
            &larr; Step 3: Pay Fees
          </Link>
          <Link href="/guide" className="text-navy-400 hover:text-navy text-sm">
            Back to Guide Overview &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
