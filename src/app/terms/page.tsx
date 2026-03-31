export default function TermsOfServicePage() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3">Terms of Service</h1>
        <p className="text-navy-400 mb-8">Last updated: March 31, 2026</p>

        <div className="prose prose-navy max-w-none space-y-6 text-navy-400 leading-relaxed text-sm">
          <section>
            <h2 className="text-xl font-serif font-bold text-navy">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Citizenship Mountie at citizenshipmountie.com (the &ldquo;Service&rdquo;),
              you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree
              to these Terms, do not use the Service. We reserve the right to update these Terms at any
              time. Continued use of the Service after changes constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-navy">2. Description of Service</h2>
            <p>
              Citizenship Mountie is an informational tool that provides general guidance for individuals
              navigating the Canadian citizenship certificate application process under Bill C-3 (An Act
              to Amend the Citizenship Act, 2025). The Service includes educational content, an eligibility
              quiz, a family chain builder, a document vault, an AI-powered cover letter drafter, and
              related tools.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-navy">3. Not Legal Advice</h2>
            <p>
              <strong className="text-navy">
                The Service does not constitute legal advice and is not a substitute for consultation
                with a licensed immigration lawyer or Regulated Canadian Immigration Consultant (RCIC).
              </strong>{" "}
              Immigration law is complex, and individual circumstances vary. The information provided by
              the Service is for general informational purposes only. You should not act or refrain from
              acting based solely on information provided by the Service without seeking professional
              legal counsel.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-navy">4. No Government Affiliation</h2>
            <p>
              Citizenship Mountie is not affiliated with, endorsed by, or connected to Immigration,
              Refugees and Citizenship Canada (IRCC), the Government of Canada, or any other government
              entity. We are an independent, privately operated service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-navy">5. Use at Your Own Risk</h2>
            <p>
              <strong className="text-navy">
                You use the Service entirely at your own risk.
              </strong>{" "}
              While we strive to provide accurate and up-to-date information, we make no representations
              or warranties of any kind, express or implied, regarding the completeness, accuracy,
              reliability, suitability, or availability of the Service or the information, products,
              services, or related content contained therein.
            </p>
            <p className="mt-2">
              Government policies, application procedures, forms, fees, and processing times may change
              without notice. It is your responsibility to verify all information with official government
              sources before submitting any application.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-navy">6. Limitation of Liability</h2>
            <p>
              <strong className="text-navy">
                To the fullest extent permitted by applicable law, Citizenship Mountie, its owner,
                operators, affiliates, and contributors shall not be liable for any direct, indirect,
                incidental, special, consequential, or punitive damages arising out of or in connection
                with your use of the Service.
              </strong>{" "}
              This includes, without limitation, damages arising from:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
              <li>Errors, inaccuracies, or omissions in the information provided</li>
              <li>Application delays, rejections, or returns by IRCC or any government body</li>
              <li>Reliance on information, guidance, or AI-generated content from the Service</li>
              <li>Loss of data, documents, or uploaded files</li>
              <li>Unauthorized access to your account</li>
              <li>Service interruptions, downtime, or technical failures</li>
              <li>Any actions taken or decisions made based on the Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-navy">7. AI-Generated Content</h2>
            <p>
              The Cover Letter Drafter uses artificial intelligence (Anthropic Claude) to generate
              draft cover letters based on information you provide. AI-generated content may contain
              errors, inaccuracies, or inappropriate legal references.{" "}
              <strong className="text-navy">
                You are solely responsible for reviewing, verifying, and editing all AI-generated
                content before using it in any application or official document.
              </strong>{" "}
              We accept no liability for the accuracy or suitability of AI-generated content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-navy">8. User Accounts and Data</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and
              for all activities that occur under your account. You agree to provide accurate information
              when creating an account. We reserve the right to suspend or terminate accounts that
              violate these Terms.
            </p>
            <p className="mt-2">
              You retain ownership of all data and documents you upload to the Service. By uploading
              content, you grant us a limited license to store, process, and display that content solely
              for the purpose of providing the Service to you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-navy">9. Subscriptions and Payments</h2>
            <p>
              Paid features are available through monthly subscription plans processed by Stripe.
              Subscriptions automatically renew unless cancelled. You may cancel at any time through
              the Stripe billing portal accessible from your dashboard. Refunds are handled on a
              case-by-case basis; contact us at{" "}
              <a href="mailto:contact@citizenshipmountie.com" className="text-red hover:underline">
                contact@citizenshipmountie.com
              </a>{" "}
              for refund requests.
            </p>
            <p className="mt-2">
              We reserve the right to change subscription pricing at any time. Existing subscribers
              will be notified of price changes before they take effect.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-navy">10. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Use the Service for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to the Service or its systems</li>
              <li>Upload malicious files, viruses, or harmful content</li>
              <li>Scrape, copy, or reproduce the Service&apos;s content for commercial purposes</li>
              <li>Misrepresent your identity or provide false information</li>
              <li>Use the Service to prepare fraudulent citizenship applications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-navy">11. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Citizenship Mountie, its owner,
              operators, and affiliates from and against any claims, liabilities, damages, losses,
              and expenses (including reasonable legal fees) arising out of or in connection with
              your use of the Service, your violation of these Terms, or your violation of any
              rights of a third party.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-navy">12. Disclaimer of Warranties</h2>
            <p>
              <strong className="text-navy">
                The Service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without
                warranties of any kind, whether express or implied, including but not limited to
                implied warranties of merchantability, fitness for a particular purpose, and
                non-infringement.
              </strong>{" "}
              We do not warrant that the Service will be uninterrupted, error-free, or secure, or
              that any defects will be corrected.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-navy">13. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the
              United States. Any disputes arising from these Terms or the Service shall be resolved
              in the courts of competent jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-navy">14. Severability</h2>
            <p>
              If any provision of these Terms is found to be unenforceable or invalid, that provision
              shall be limited or eliminated to the minimum extent necessary, and the remaining
              provisions shall remain in full force and effect.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-navy">15. Contact Us</h2>
            <p>
              If you have questions about these Terms, contact us at{" "}
              <a href="mailto:contact@citizenshipmountie.com" className="text-red hover:underline">
                contact@citizenshipmountie.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
