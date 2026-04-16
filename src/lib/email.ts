import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

interface SendReportEmailParams {
  to: string;
  recipientName: string | null;
  agentName: string;
  businessName: string;
  brandColor: string;
  reportTitle: string;
  reportSummary: string;
  reportInsights: string;
  zipCode: string;
  pdfUrl?: string;
  userId?: string;
  reportId?: string;
}

export async function sendReportEmail(params: SendReportEmailParams) {
  const {
    to,
    recipientName,
    agentName,
    businessName,
    brandColor,
    reportTitle,
    reportSummary,
    reportInsights,
    zipCode,
    pdfUrl,
    userId,
    reportId,
  } = params;

  const greeting = recipientName ? `Hi ${recipientName}` : "Hi there";

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:0; background:#f4f4f5; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; margin:0 auto; background:#ffffff;">
    <!-- Header -->
    <tr>
      <td style="background:${brandColor}; padding:32px 24px; text-align:center;">
        <h1 style="color:#ffffff; margin:0; font-size:20px; font-weight:600;">${businessName}</h1>
        <p style="color:rgba(255,255,255,0.85); margin:8px 0 0; font-size:13px;">Weekly Market Report</p>
      </td>
    </tr>
    <!-- Body -->
    <tr>
      <td style="padding:32px 24px;">
        <p style="color:#374151; font-size:15px; line-height:1.6; margin:0 0 16px;">
          ${greeting},
        </p>
        <h2 style="color:#111827; font-size:22px; font-weight:700; margin:0 0 12px; line-height:1.3;">
          ${reportTitle}
        </h2>
        <p style="color:#6b7280; font-size:15px; line-height:1.6; margin:0 0 24px; padding:16px; background:#f9fafb; border-radius:8px; border-left:4px solid ${brandColor};">
          ${reportSummary}
        </p>
        <div style="color:#374151; font-size:15px; line-height:1.7;">
          ${reportInsights.replace(/\n/g, "<br>")}
        </div>
        ${
          pdfUrl
            ? `<p style="margin:24px 0 0; text-align:center;">
            <a href="${pdfUrl}" style="display:inline-block; background:${brandColor}; color:#fff; padding:12px 24px; border-radius:6px; text-decoration:none; font-weight:600; font-size:14px;">
              Download Full Report (PDF)
            </a>
          </p>`
            : ""
        }
      </td>
    </tr>
    <!-- Disclaimer -->
    <tr>
      <td style="padding:16px 24px 0; background:#f9fafb; border-top:1px solid #e5e7eb;">
        <p style="color:#b0b0b0; font-size:10px; line-height:1.5; margin:0;">
          This report was generated using AI and third-party data sources. It is not a real estate appraisal, CMA, or professional valuation. Data is deemed reliable but not guaranteed. Verify all information independently.
        </p>
      </td>
    </tr>
    <!-- Footer -->
    <tr>
      <td style="padding:12px 24px 24px; background:#f9fafb; text-align:center;">
        <p style="color:#9ca3af; font-size:12px; margin:0;">
          Sent by ${agentName} at ${businessName} | Market data for ${zipCode}
        </p>
        <p style="color:#9ca3af; font-size:11px; margin:8px 0 0;">
          Powered by MarketPulse &bull; <a href="${process.env.NEXT_PUBLIC_APP_URL}/legal/terms" style="color:#9ca3af;">Terms</a> &bull; <a href="${process.env.NEXT_PUBLIC_APP_URL}/legal/privacy" style="color:#9ca3af;">Privacy</a>
        </p>
        <p style="color:#b0b0b0; font-size:10px; margin:8px 0 0;">
          To unsubscribe, reply to this email with &quot;UNSUBSCRIBE&quot;
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const tags = [
    ...(userId ? [{ name: "user_id", value: userId }] : []),
    ...(reportId ? [{ name: "report_id", value: reportId }] : []),
    ...(recipientName ? [{ name: "recipient_name", value: recipientName }] : []),
  ];

  return getResend().emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "reports@marketpulse.ai",
    to,
    subject: `${reportTitle} | ${businessName}`,
    html,
    tags,
  });
}
