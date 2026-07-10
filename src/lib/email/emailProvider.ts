import { ClientInquiry } from "@/types/inquiry";
import { env } from "../config/env";

export async function sendInquiryEmailNotification(inquiry: ClientInquiry): Promise<boolean> {
  const apiKey = env.resendApiKey;
  const toEmail = env.notificationEmail;
  const fromEmail = env.senderEmail;

  if (!apiKey) {
    console.log("[Email Provider - Mock] Resend API key not configured. Logging notification draft: ");
    console.log(`
      To: ${toEmail}
      From: ${fromEmail}
      Subject: New Project Inquiry from ${inquiry.name} (${inquiry.company || "No Company"})
      ---
      Name: ${inquiry.name}
      Email: ${inquiry.email}
      Phone: ${inquiry.phone || "N/A"}
      Company: ${inquiry.company || "N/A"}
      Website/Link: ${inquiry.website || "N/A"}
      Project Type: ${inquiry.projectType}
      Budget: ${inquiry.budget}
      Timeline: ${inquiry.timeline || "N/A"}
      
      Details:
      ${inquiry.details}
      
      Source Page: ${inquiry.source || "Direct"}
    `);
    return true;
  }

  try {
    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e4e4e7; border-radius: 8px;">
        <h2 style="color: #b84444; border-bottom: 2px solid #b84444; padding-bottom: 10px; margin-top: 0;">New Project Inquiry - Wroves</h2>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 35%;">Client Name:</td>
            <td style="padding: 8px 0;">${inquiry.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${inquiry.email}">${inquiry.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">WhatsApp / Phone:</td>
            <td style="padding: 8px 0;">${inquiry.phone || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Company / Brand:</td>
            <td style="padding: 8px 0;">${inquiry.company || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Website / Link:</td>
            <td style="padding: 8px 0;">${inquiry.website ? `<a href="${inquiry.website}" target="_blank">${inquiry.website}</a>` : "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Project Type:</td>
            <td style="padding: 8px 0;"><span style="background: #fee2e2; color: #b91c1c; padding: 3px 8px; border-radius: 4px; font-size: 0.9em; font-weight: bold;">${inquiry.projectType}</span></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Budget:</td>
            <td style="padding: 8px 0; font-weight: bold; color: #15803d;">${inquiry.budget}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Preferred Timeline:</td>
            <td style="padding: 8px 0;">${inquiry.timeline || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Source:</td>
            <td style="padding: 8px 0; font-style: italic;">${inquiry.source || "Direct"}</td>
          </tr>
        </table>
        
        <div style="margin-top: 25px; padding: 15px; background: #f4f4f5; border-radius: 6px; border-left: 4px solid #71717a;">
          <h3 style="margin-top: 0; margin-bottom: 8px; font-size: 1.1em; color: #18181b;">Project Details & Requirements</h3>
          <p style="margin: 0; white-space: pre-wrap; line-height: 1.5; color: #27272a;">${inquiry.details}</p>
        </div>
        
        <p style="font-size: 0.85em; color: #71717a; margin-top: 30px; text-align: center; border-top: 1px solid #e4e4e7; padding-top: 15px;">
          This inquiry was submitted from the Wroves website lead-generation system.
        </p>
      </div>
    `;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: `Wroves Lead Ingestion <${fromEmail}>`,
        to: [toEmail],
        subject: `[Wroves Inquiry] ${inquiry.projectType} - ${inquiry.name}`,
        html: htmlContent,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("[Email Provider - Error] Resend API responded with error:", errorData);
      return false;
    }

    return true;
  } catch (error) {
    console.error("[Email Provider - Error] Failed to send email via Resend:", error);
    return false;
  }
}
