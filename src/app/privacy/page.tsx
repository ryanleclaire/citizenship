export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3">Privacy Policy</h1>
        <p className="text-navy-400 mb-8">Last updated: March 31, 2026</p>

        <div className="prose prose-navy max-w-none space-y-6 text-navy-400 leading-relaxed text-sm">
          <section>
            <h2 className="text-xl font-serif font-bold text-navy">1. Introduction</h2>
            <p>
              Citizenship Mountie (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates
              the website citizenshipmountie.com (the &ldquo;Service&rdquo;). This Privacy Policy explains
              how we collect, use, disclose, and safeguard your information when you use our Service.
              By using the Service, you consent to the practices described in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-navy">2. Information We Collect</h2>
            <h3 className="text-lg font-semibold text-navy mt-4">Account Information</h3>
            <p>
              When you create an account, we collect your email address and, if you sign in via Google
              OAuth, your name and profile information as provided by Google. We use Supabase for
              authentication and data storage.
            </p>
            <h3 className="text-lg font-semibold text-navy mt-4">Application Data</h3>
            <p>
              If you use our paid features, you may provide personal information about yourself and your
              family members, including names, birth dates, birth places, and relationship information.
              This data is stored securely in our database to power the Family Chain Builder, Document
              Vault, and Cover Letter Drafter features.
            </p>
            <h3 className="text-lg font-semibold text-navy mt-4">Uploaded Documents</h3>
            <p>
              If you use the Document Vault, you may upload scanned copies of vital records (birth
              certificates, marriage certificates, etc.). These files are stored in a private, encrypted
              storage bucket. Only you can access your uploaded documents through your authenticated account.
            </p>
            <h3 className="text-lg font-semibold text-navy mt-4">Payment Information</h3>
            <p>
              Payment processing is handled entirely by Stripe. We do not store your credit card number,
              CVV, or full payment details on our servers. We receive from Stripe only your Stripe customer
              ID and subscription status for the purpose of managing your account tier.
            </p>
            <h3 className="text-lg font-semibold text-navy mt-4">Usage Data</h3>
            <p>
              We may collect standard usage data such as pages visited, browser type, and IP address
              through our hosting provider (Vercel). This data is used to maintain and improve the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-navy">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Provide, maintain, and improve the Service</li>
              <li>Authenticate your identity and manage your account</li>
              <li>Process your subscription payments through Stripe</li>
              <li>Store and display your family chain, document tracking, and cover letter data</li>
              <li>Generate personalized cover letters using AI (Anthropic Claude API)</li>
              <li>Respond to your inquiries and provide customer support</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-navy">4. AI-Generated Content</h2>
            <p>
              The Cover Letter Drafter feature sends the family chain information you provide to the
              Anthropic Claude API to generate a personalized cover letter. The data sent includes
              names, birth places, birth years, relationships, and any notes you enter. Anthropic&apos;s
              API does not retain your data for training purposes. The generated content is returned
              to you and stored only within your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-navy">5. Data Sharing and Disclosure</h2>
            <p>We do not sell, rent, or trade your personal information. We share data only with:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>Supabase</strong> &mdash; authentication and database hosting</li>
              <li><strong>Stripe</strong> &mdash; payment processing</li>
              <li><strong>Anthropic</strong> &mdash; AI cover letter generation (only data you submit through the Cover Letter Drafter)</li>
              <li><strong>Vercel</strong> &mdash; website hosting</li>
            </ul>
            <p className="mt-2">
              We may also disclose information if required by law, regulation, or legal process.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-navy">6. Data Security</h2>
            <p>
              We implement reasonable technical and organizational measures to protect your data,
              including encrypted storage, row-level security policies on our database, private
              storage buckets for uploaded documents, and HTTPS encryption for all data in transit.
              However, no method of electronic storage or transmission is 100% secure, and we cannot
              guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-navy">7. Data Retention</h2>
            <p>
              We retain your account data and application data for as long as your account is active.
              If you delete your account or cancel your subscription, your data may be retained for
              a reasonable period for backup and legal compliance purposes before being permanently deleted.
              You may request deletion of your data at any time by contacting us at{" "}
              <a href="mailto:contact@citizenshipmountie.com" className="text-red hover:underline">
                contact@citizenshipmountie.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-navy">8. Your Rights</h2>
            <p>Depending on your jurisdiction, you may have the right to:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to or restrict processing of your data</li>
              <li>Request a portable copy of your data</li>
            </ul>
            <p className="mt-2">
              To exercise any of these rights, contact us at{" "}
              <a href="mailto:contact@citizenshipmountie.com" className="text-red hover:underline">
                contact@citizenshipmountie.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-navy">9. Children&apos;s Privacy</h2>
            <p>
              The Service is not directed at children under 13. We do not knowingly collect personal
              information from children under 13. If you believe a child has provided us with personal
              information, please contact us so we can delete it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-navy">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page
              with an updated &ldquo;Last updated&rdquo; date. Your continued use of the Service after
              any changes constitutes acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-navy">11. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, contact us at{" "}
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
