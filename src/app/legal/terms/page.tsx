import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | MarketPulse",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: April 15, 2026</p>

        <div className="prose prose-sm max-w-none text-foreground/85 space-y-6">
          <section>
            <h2 className="text-lg font-semibold mt-8 mb-3">1. Agreement to Terms</h2>
            <p>
              By accessing or using MarketPulse (&quot;Service&quot;), operated by MarketPulse
              (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), you agree to
              be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree, do not use
              the Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mt-8 mb-3">2. Description of Service</h2>
            <p>
              MarketPulse is a software-as-a-service platform that generates AI-powered real estate
              market reports using artificial intelligence (Anthropic Claude) and third-party market
              data sources. The Service is designed for licensed real estate professionals.
            </p>
            <p className="mt-2">
              <strong>MarketPulse is a technology provider.</strong> We are not a licensed real estate
              brokerage, appraisal firm, or financial advisor. Use of the Service does not create a
              fiduciary, agent-client, or advisor-client relationship.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mt-8 mb-3">3. Account Registration</h2>
            <p>
              You must provide accurate, current, and complete information when creating an account.
              You are responsible for safeguarding your password and for all activity under your
              account. You must notify us immediately of any unauthorized access.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mt-8 mb-3">4. Subscription and Payment</h2>
            <p>
              The Service is offered on a monthly subscription basis at the price displayed at
              checkout (currently $49/month). All payments are processed securely through Stripe.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Subscriptions auto-renew monthly unless canceled before the next billing date.</li>
              <li>A 14-day free trial may be offered to new subscribers at our discretion.</li>
              <li>We reserve the right to change pricing with 30 days&apos; notice.</li>
              <li>All fees are non-refundable except as described in our Refund Policy (Section 5).</li>
              <li>Failed payments may result in service suspension after a 7-day grace period.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mt-8 mb-3">5. Cancellation and Refund Policy</h2>
            <p>
              You may cancel your subscription at any time through the Settings page or Stripe billing
              portal. Upon cancellation:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>You retain access until the end of your current billing period.</li>
              <li>No partial or prorated refunds are issued for unused time.</li>
              <li>
                Refund requests for billing errors or technical issues must be submitted within 14
                days of the charge to support@marketpulse.ai.
              </li>
              <li>Approved refunds are processed within 5&ndash;10 business days via the original payment method.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mt-8 mb-3">6. AI-Generated Content Disclaimer</h2>
            <p>
              Market reports, summaries, social media posts, and market comparisons generated through
              the Service are produced by artificial intelligence (Anthropic Claude). By using the
              Service, you acknowledge and agree that:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>AI-generated content may contain errors, inaccuracies, or outdated information.</li>
              <li>
                Reports are <strong>not</strong> real estate appraisals, broker price opinions, or
                comparative market analyses (CMAs) and should not be treated as such.
              </li>
              <li>
                AI-generated valuations and market assessments are estimates, not USPAP-compliant
                appraisals.
              </li>
              <li>
                You are solely responsible for reviewing, verifying, and editing all AI-generated
                content before sharing with clients or the public.
              </li>
              <li>
                We do not guarantee the accuracy, completeness, or timeliness of any AI-generated
                content.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mt-8 mb-3">7. Market Data Disclaimer</h2>
            <p>
              Market data displayed in reports is sourced from third-party providers including Redfin
              and RentCast. This data is deemed reliable but is <strong>not guaranteed</strong> to be
              accurate or complete. Data may be delayed, incomplete, or subject to revision. We are
              not responsible for errors in third-party data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mt-8 mb-3">8. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Use the Service for any purpose that violates applicable law or regulation.</li>
              <li>
                Use reports or data in violation of the Fair Housing Act, including for discriminatory
                housing practices, steering, or redlining.
              </li>
              <li>Scrape, resell, or redistribute raw market data obtained through the Service.</li>
              <li>Share account credentials or use automated tools to access the Service.</li>
              <li>Misrepresent AI-generated content as human-authored professional analysis where disclosure is required by law.</li>
              <li>Interfere with or disrupt the Service or its infrastructure.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mt-8 mb-3">9. Intellectual Property</h2>
            <p>
              The Service, including its design, code, and branding, is owned by MarketPulse. Reports
              generated for your account are licensed to you for your business use. You retain
              ownership of your business information and client data. We retain a limited license to
              use anonymized, aggregated data for service improvement.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mt-8 mb-3">10. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, MARKETPULSE AND ITS OFFICERS, EMPLOYEES, AND
              AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
              PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR BUSINESS OPPORTUNITIES, ARISING
              FROM YOUR USE OF THE SERVICE.
            </p>
            <p className="mt-2">
              OUR TOTAL LIABILITY FOR ANY CLAIM ARISING FROM THESE TERMS OR THE SERVICE SHALL NOT
              EXCEED THE AMOUNT YOU PAID US IN THE 12 MONTHS PRECEDING THE CLAIM.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mt-8 mb-3">11. Disclaimer of Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT
              WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT
              WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mt-8 mb-3">12. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless MarketPulse from any claims, damages, or
              expenses arising from (a) your use of the Service, (b) your violation of these Terms,
              (c) your distribution of AI-generated content to third parties, or (d) your violation
              of any applicable law, including the Fair Housing Act.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mt-8 mb-3">13. Dispute Resolution</h2>
            <p>
              Any dispute arising from these Terms shall be resolved through binding arbitration in
              accordance with the American Arbitration Association rules. The arbitration may be
              conducted remotely or in a mutually agreed-upon location within the United States. You
              agree to waive any right to a jury trial or participation in a class action lawsuit.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mt-8 mb-3">14. Governing Law</h2>
            <p>
              These Terms are governed by the federal laws of the United States of America and, where
              applicable, the laws of the state in which the user resides, without regard to conflict
              of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mt-8 mb-3">15. Changes to Terms</h2>
            <p>
              We may update these Terms at any time. Material changes will be communicated via email
              or in-app notification at least 30 days before taking effect. Continued use after
              changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mt-8 mb-3">16. Contact</h2>
            <p>
              Questions about these Terms? Contact us at{" "}
              <a href="mailto:support@marketpulse.ai" className="text-primary underline">
                support@marketpulse.ai
              </a>
            </p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t text-sm text-muted-foreground flex gap-4">
          <Link href="/legal/privacy" className="hover:text-foreground">Privacy Policy</Link>
          <Link href="/legal/cookies" className="hover:text-foreground">Cookie Policy</Link>
          <Link href="/" className="hover:text-foreground">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
