import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy | MarketPulse",
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Cookie Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: April 15, 2026</p>

        <div className="prose prose-sm max-w-none text-foreground/85 space-y-6">
          <section>
            <h2 className="text-lg font-semibold mt-8 mb-3">1. What Are Cookies</h2>
            <p>
              Cookies are small text files stored on your device when you visit a website. They help
              the site remember your preferences and improve your experience.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mt-8 mb-3">2. Cookies We Use</h2>

            <h3 className="font-medium mt-4 mb-2">Essential Cookies (Required)</h3>
            <p>These cookies are necessary for the Service to function and cannot be disabled.</p>
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-sm border">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left p-2 border-b">Cookie</th>
                    <th className="text-left p-2 border-b">Provider</th>
                    <th className="text-left p-2 border-b">Purpose</th>
                    <th className="text-left p-2 border-b">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border-b font-mono text-xs">sb-*-auth-token</td>
                    <td className="p-2 border-b">Supabase</td>
                    <td className="p-2 border-b">Authentication session</td>
                    <td className="p-2 border-b">1 year</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-b font-mono text-xs">__stripe_mid</td>
                    <td className="p-2 border-b">Stripe</td>
                    <td className="p-2 border-b">Fraud prevention</td>
                    <td className="p-2 border-b">1 year</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-b font-mono text-xs">__stripe_sid</td>
                    <td className="p-2 border-b">Stripe</td>
                    <td className="p-2 border-b">Checkout session</td>
                    <td className="p-2 border-b">30 minutes</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-medium mt-6 mb-2">Functional Cookies (Optional)</h3>
            <p>
              We do not currently use analytics, advertising, or third-party tracking cookies. If we
              add analytics in the future, we will update this policy and request your consent.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mt-8 mb-3">3. Managing Cookies</h2>
            <p>
              You can control cookies through your browser settings. Most browsers allow you to:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>View what cookies are stored</li>
              <li>Delete individual or all cookies</li>
              <li>Block third-party cookies</li>
              <li>Block cookies from specific sites</li>
              <li>Block all cookies</li>
            </ul>
            <p className="mt-2">
              Note: Disabling essential cookies will prevent you from logging in and using the
              Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mt-8 mb-3">4. Changes to This Policy</h2>
            <p>
              We will update this Cookie Policy when we add or change cookies. Check the &quot;Last
              updated&quot; date for the latest version.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mt-8 mb-3">5. Contact</h2>
            <p>
              Questions about our cookie practices? Email{" "}
              <a href="mailto:privacy@marketpulse.ai" className="text-primary underline">
                privacy@marketpulse.ai
              </a>
            </p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t text-sm text-muted-foreground flex gap-4">
          <Link href="/legal/terms" className="hover:text-foreground">Terms of Service</Link>
          <Link href="/legal/privacy" className="hover:text-foreground">Privacy Policy</Link>
          <Link href="/" className="hover:text-foreground">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
