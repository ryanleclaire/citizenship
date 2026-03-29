import Link from "next/link";
import { IRCC_LINKS } from "@/lib/constants";

export default function Step2Page() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4">
        <p className="text-sm text-navy-400 uppercase tracking-wide mb-2">Step 2 of 4</p>
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3">Complete the Application</h1>
        <p className="text-navy-400 mb-10">
          You&apos;ll be filling out form <strong>CIT 0001</strong> &mdash; Application for a Citizenship Certificate
          for Adults and Minors (Proof of Citizenship) Under Section 3. Here&apos;s how to do it right the first time.
        </p>

        {/* Before you start */}
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-navy mb-4 pl-4 border-l-4 border-red">
            Before You Start
          </h2>
          <div className="card space-y-4">
            <div className="bg-red-50/50 border border-red-100 rounded-lg p-4">
              <p className="font-semibold text-navy text-sm mb-2">Use Adobe Acrobat Reader</p>
              <p className="text-navy-400 text-sm">
                The CIT 0001 PDF has interactive form fields that <strong>do not work correctly</strong> in
                web browsers (Chrome, Safari, Edge) or other PDF viewers. Download the free{" "}
                <a href="https://get.adobe.com/reader/" target="_blank" rel="noopener noreferrer" className="text-red hover:underline">
                  Adobe Acrobat Reader
                </a>{" "}
                and open the form there. This is the #1 cause of preventable errors.
              </p>
            </div>
            <p className="text-navy-400 text-sm">
              <a href={IRCC_LINKS.cit0001Guide} target="_blank" rel="noopener noreferrer" className="text-red hover:underline">
                Download CIT 0001 form and guide from IRCC &rarr;
              </a>
            </p>
          </div>
        </section>

        {/* Section by section */}
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-navy mb-4 pl-4 border-l-4 border-red">
            Section-by-Section Tips
          </h2>
          <div className="space-y-4">
            <div className="card">
              <p className="font-semibold text-navy mb-2">Personal Information</p>
              <p className="text-navy-400 text-sm">
                Enter your full legal name exactly as it appears on your birth certificate. If your name has
                changed since birth (marriage, legal name change), enter your current legal name and provide
                bridging documents. Include all previous names in the relevant field.
              </p>
            </div>
            <div className="card">
              <p className="font-semibold text-navy mb-2">Citizenship Information</p>
              <p className="text-navy-400 text-sm">
                This is where you indicate <strong>how</strong> you are a citizen. For Bill C-3 multi-generational
                claims, the applicable section is typically <strong>s. 3(1)(g)</strong> of the Citizenship Act
                (for people born before December 15, 2025). If you&apos;re unsure which section applies, explain your
                situation in your cover letter and let IRCC determine it &mdash; getting this wrong is not fatal
                but may cause delays.
              </p>
            </div>
            <div className="card">
              <p className="font-semibold text-navy mb-2">Parent/Guardian Information</p>
              <p className="text-navy-400 text-sm">
                Enter details for the Canadian parent through whom you claim citizenship. For multi-generational
                claims, you&apos;re documenting the most recent link in the chain. Your cover letter will map the
                full chain back to the anchor ancestor.
              </p>
            </div>
            <div className="card">
              <p className="font-semibold text-navy mb-2">Physical Presence in Canada</p>
              <p className="text-navy-400 text-sm">
                This section is primarily for the <strong>substantial connection test</strong> (children born on/after
                Dec 15, 2025). If you were born before that date, this section may not apply to you &mdash; write
                &ldquo;NA&rdquo; if not applicable. <strong>Important:</strong> Check &ldquo;YES&rdquo; on the CBSA
                consent form to let IRCC pull entry/exit records on your behalf. Do NOT request your own CBSA
                records &mdash; it causes delays.
              </p>
            </div>
            <div className="card">
              <p className="font-semibold text-navy mb-2">Declaration and Signature</p>
              <p className="text-navy-400 text-sm">
                After filling out the form electronically, <strong>print it and sign by hand</strong>. An unsigned
                form will be returned. If applying for a minor, the parent or guardian signs on the child&apos;s behalf.
              </p>
            </div>
          </div>
        </section>

        {/* Golden rules */}
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-navy mb-4 pl-4 border-l-4 border-red">
            Golden Rules
          </h2>
          <div className="card">
            <ul className="space-y-3 text-navy-400 text-sm">
              <li className="flex gap-3">
                <span className="text-red font-bold shrink-0">1.</span>
                <span><strong>Never leave a field blank.</strong> If a section doesn&apos;t apply to you, write &ldquo;NA&rdquo; (not applicable). Blank fields can trigger a return.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red font-bold shrink-0">2.</span>
                <span><strong>One form per person.</strong> Each applicant needs their own CIT 0001, photos, and fee payment &mdash; even family members applying together.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red font-bold shrink-0">3.</span>
                <span><strong>Print, then sign.</strong> Fill out the form digitally for legibility, then print and sign with a pen. Don&apos;t forget this step.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red font-bold shrink-0">4.</span>
                <span><strong>For minors, fill out as the child.</strong> The parent completes the form as if they are the child, then signs on the child&apos;s behalf.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red font-bold shrink-0">5.</span>
                <span><strong>Double-check dates and names.</strong> Ensure every name and date matches exactly what appears on the supporting documents you&apos;re submitting.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Which legal section */}
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-navy mb-4 pl-4 border-l-4 border-red">
            Which Legal Section Applies to You?
          </h2>
          <div className="card">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-4 text-navy font-semibold">Your Situation</th>
                    <th className="text-left py-2 text-navy font-semibold">Section</th>
                  </tr>
                </thead>
                <tbody className="text-navy-400">
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4">First generation born abroad, parent born in Canada (before Feb 15, 1977)</td>
                    <td className="py-2">s. 3(1)(b)</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4">First generation born abroad (Feb 15, 1977 &ndash; April 16, 2009)</td>
                    <td className="py-2">s. 3(1)(f)</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4">Second+ generation born abroad, born before Dec 15, 2025 (Bill C-3 retroactive)</td>
                    <td className="py-2 font-semibold text-navy">s. 3(1)(g)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Born on/after Dec 15, 2025, with substantial connection test</td>
                    <td className="py-2">s. 3(1)(g.1)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-navy-400 text-xs mt-3">
              Most Bill C-3 applicants will cite <strong>s. 3(1)(g)</strong>. If unsure, state your situation
              clearly in the cover letter.
            </p>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
          <Link href="/guide/step-1" className="text-navy-400 hover:text-navy text-sm">
            &larr; Step 1: Gather Documents
          </Link>
          <Link href="/guide/step-3" className="btn-primary">
            Step 3: Pay Fees &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
