import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | MarketPulse",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: April 15, 2026</p>

        <div className="prose prose-sm max-w-none text-foreground/85 space-y-6">
          <section>
            <h2 className="text-lg font-semibold mt-8 mb-3">1. Introduction</h2>
            <p>
              MarketPulse (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
              respects your privacy. This Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you use our Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mt-8 mb-3">2. Information We Collect</h2>
            <h3 className="font-medium mt-4 mb-2">Information you provide:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Account information: name, email address, business name, brand color preference</li>
              <li>Recipient lists: names and email addresses of your clients (stored for report delivery)</li>
              <li>ZIP codes you configure for market tracking</li>
              <li>Payment information: processed by Stripe &mdash; we do not store credit card numbers</li>
            </ul>

            <h3 className="font-medium mt-4 mb-2">Information collected automatically:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>IP address and approximate geolocation</li>
              <li>Browser type, operating system, and device information</li>
              <li>Usage data: pages visited, features used, report generation activity</li>
              <li>Cookies and similar tracking technologies (see our <Link href="/legal/cookies" className="text-primary underline">Cookie Policy</Link>)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mt-8 mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide, maintain, and improve the Service</li>
              <li>Generate and deliver AI-powered market reports</li>
              <li>Process payments and manage subscriptions via Stripe</li>
              <li>Send transactional emails (reports, receipts, account notifications) via Resend</li>
              <li>Generate AI content using Anthropic Claude (market data and preferences are sent to the AI model)</li>
              <li>Respond to support requests</li>
              <li>Analyze usage patterns to improve features (aggregated and anonymized)</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mt-8 mb-3">4. Third-Party Services</h2>
            <p>We share data with the following service providers, each under their own privacy policies:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Supabase</strong> &mdash; Authentication and database hosting</li>
              <li><strong>Stripe</strong> &mdash; Payment processing (PCI-DSS compliant)</li>
              <li><strong>Anthropic (Claude)</strong> &mdash; AI report generation (market data sent for processing)</li>
              <li><strong>Resend</strong> &mdash; Email delivery</li>
              <li><strong>Redfin / RentCast</strong> &mdash; Market data sources</li>
              <li><strong>Vercel</strong> &mdash; Application hosting</li>
            </ul>
            <p className="mt-2">
              We do not sell your personal information to third parties. We do not share your data for
              advertising purposes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mt-8 mb-3">5. Data Retention</h2>
            <p>
              We retain your account data for as long as your account is active. Generated reports are
              retained indefinitely unless you request deletion. Upon account deletion, personal data
              is removed within 30 days, except where retention is required by law (e.g., payment
              records for tax compliance, retained for 7 years).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mt-8 mb-3">6. Your Rights</h2>
            <p>
              Depending on your jurisdiction, you may have the following rights regarding your
              personal information:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Right to Access</strong> &mdash; Request a copy of the personal data we hold about you</li>
              <li><strong>Right to Correction</strong> &mdash; Request correction of inaccurate data</li>
              <li><strong>Right to Deletion</strong> &mdash; Request deletion of your personal data</li>
              <li><strong>Right to Portability</strong> &mdash; Request your data in a machine-readable format</li>
              <li><strong>Right to Opt-Out</strong> &mdash; Opt out of data sale or sharing (note: we do not sell data)</li>
              <li><strong>Right to Non-Discrimination</strong> &mdash; We will not penalize you for exercising your rights</li>
            </ul>
            <p className="mt-2">
              To exercise any of these rights, email us at{" "}
              <a href="mailto:privacy@marketpulse.ai" className="text-primary underline">
                privacy@marketpulse.ai
              </a>
              . We will respond within 45 days as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mt-8 mb-3">7. California Privacy Rights (CCPA/CPRA)</h2>
            <p>
              If you are a California resident, you have additional rights under the California
              Consumer Privacy Act (CCPA) and its amendments (CPRA):
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Right to know what personal information is collected, used, and shared</li>
              <li>Right to delete personal information</li>
              <li>Right to opt-out of the sale or sharing of personal information</li>
              <li>Right to correct inaccurate personal information</li>
              <li>Right to limit use of sensitive personal information</li>
            </ul>
            <p className="mt-2">
              We do not sell or share your personal information as defined by the CCPA. We do not
              process sensitive personal information beyond what is necessary for the Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mt-8 mb-3">8. Data Security</h2>
            <p>
              We implement industry-standard security measures including encryption in transit
              (TLS/SSL), encrypted database storage, secure authentication via Supabase, and
              PCI-DSS-compliant payment processing via Stripe. However, no method of transmission
              over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mt-8 mb-3">9. Children&apos;s Privacy</h2>
            <p>
              The Service is not intended for individuals under 18 years of age. We do not knowingly
              collect personal information from children. If we learn we have collected data from a
              child, we will delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mt-8 mb-3">10. International Users</h2>
            <p>
              The Service is hosted in the United States. If you access the Service from outside the
              U.S., your information may be transferred to and processed in the United States. By
              using the Service, you consent to this transfer.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mt-8 mb-3">11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Material changes will be
              communicated via email or in-app notification. The &quot;Last updated&quot; date at the
              top indicates the most recent revision.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mt-8 mb-3">12. Contact Us</h2>
            <p>
              For privacy-related questions or data requests:
            </p>
            <p className="mt-2">
              Email:{" "}
              <a href="mailto:privacy@marketpulse.ai" className="text-primary underline">
                privacy@marketpulse.ai
              </a>
            </p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t text-sm text-muted-foreground flex gap-4">
          <Link href="/legal/terms" className="hover:text-foreground">Terms of Service</Link>
          <Link href="/legal/cookies" className="hover:text-foreground">Cookie Policy</Link>
          <Link href="/" className="hover:text-foreground">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
