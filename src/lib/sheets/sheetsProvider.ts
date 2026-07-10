import { ClientInquiry } from "@/types/inquiry";
import { env } from "../config/env";

export async function saveInquiryToGoogleSheets(inquiry: ClientInquiry): Promise<boolean> {
  const webhookUrl = env.googleSheetsWebhookUrl;

  if (!webhookUrl) {
    console.log("[Sheets Provider - Mock] Google Sheets Webhook URL not configured. Data parsed: ", inquiry);
    return true; // Return true as a fallback for development/scaffolding
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...inquiry,
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      console.error("[Sheets Provider - Error] Webhook responded with status: ", response.status);
      return false;
    }

    return true;
  } catch (error) {
    console.error("[Sheets Provider - Error] Failed to submit to Google Sheets webhook:", error);
    return false;
  }
}
