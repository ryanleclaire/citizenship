import Link from "next/link";
import { IRCC_LINKS } from "@/lib/constants";

export default function Step3Page() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4">
        <p className="text-sm text-navy-400 uppercase tracking-wide mb-2">Step 3 of 4</p>
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3">Pay Fees</h1>
        <p className="text-navy-400 mb-10">
          The processing fee is <strong>$75 CAD per person</strong>. Each applicant in your family
          needs their own separate payment.
        </p>

        {/* How to pay */}
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-navy mb-4 pl-4 border-l-4 border-red">
            How to Pay
          </h2>
          <div className="card space-y-4">
            <p className="text-navy-400">
              Payment is made online through the IRCC fee payment portal <strong>before</strong> you submit
              your application. You&apos;ll need the receipt as part of your application package.
            </p>
            <div>
              <p className="font-semibold text-navy text-sm mb-2">Accepted payment methods</p>
              <ul className="text-navy-400 text-sm space-y-1 list-disc list-inside">
                <li>Credit card (Visa, Mastercard, American Express)</li>
                <li>Debit Mastercard</li>
                <li>Visa Debit</li>
              </ul>
            </div>
            <p className="text-navy-400 text-sm">
              <a href={IRCC_LINKS.feePayment} target="_blank" rel="noopener noreferrer" className="text-red hover:underline">
                Go to IRCC fee payment portal &rarr;
              </a>
            </p>
          </div>
        </section>

        {/* The receipt */}
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-navy mb-4 pl-4 border-l-4 border-red">
            The Receipt
          </h2>
          <div className="card space-y-4">
            <div className="bg-red-50/50 border border-red-100 rounded-lg p-4">
              <p className="font-semibold text-navy text-sm mb-2">Print two copies</p>
              <p className="text-navy-400 text-sm">
                After payment, IRCC generates an official receipt with a barcode. Print <strong>two copies</strong>:
                attach one to your application package, and keep the other for your records. If your application
                is returned or lost, the receipt is your proof of payment.
              </p>
            </div>
            <p className="text-navy-400 text-sm">
              Make sure the barcode is clearly printed and legible. A blurry or cut-off barcode can delay processing.
            </p>
          </div>
        </section>

        {/* Family applications */}
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-navy mb-4 pl-4 border-l-4 border-red">
            Family Applications
          </h2>
          <div className="card space-y-4">
            <p className="text-navy-400">
              If multiple family members are applying (e.g., siblings, parent + children), each person needs
              their own $75 CAD payment and their own receipt. You can make separate transactions or, in some cases,
              pay for multiple applicants in one session.
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-navy-400 text-sm">
                <strong>Example:</strong> A family of 3 applying together = $225 CAD total ($75 &times; 3).
                Each person&apos;s receipt gets attached to their individual CIT 0001 form.
              </p>
            </div>
          </div>
        </section>

        {/* Outside Canada */}
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-navy mb-4 pl-4 border-l-4 border-red">
            Paying From Outside Canada/US
          </h2>
          <div className="card space-y-4">
            <p className="text-navy-400">
              The online fee payment portal is accessible from Canada and the United States. If you&apos;re outside
              both countries and don&apos;t have internet access, you can pay at the nearest Canadian embassy,
              high commission, or consulate.
            </p>
            <p className="text-navy-400 text-sm">
              <a href={IRCC_LINKS.embassyFinder} target="_blank" rel="noopener noreferrer" className="text-red hover:underline">
                Find a Canadian embassy or consulate &rarr;
              </a>
            </p>
          </div>
        </section>

        {/* Currency note */}
        <div className="bg-navy/5 rounded-lg p-6 mb-10">
          <p className="font-serif font-semibold text-navy mb-2">Note on currency</p>
          <p className="text-navy-400 text-sm">
            The fee is $75 <strong>Canadian dollars</strong>. If you&apos;re paying with a US credit card,
            your bank will convert at the current exchange rate plus any foreign transaction fees. As of
            early 2026, $75 CAD is approximately $52&ndash;55 USD, though rates fluctuate.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
          <Link href="/guide/step-2" className="text-navy-400 hover:text-navy text-sm">
            &larr; Step 2: Complete the Application
          </Link>
          <Link href="/guide/step-4" className="btn-primary">
            Step 4: Submit Application &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
