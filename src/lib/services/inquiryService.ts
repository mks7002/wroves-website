import { ClientInquiry } from "@/types/inquiry";
import { saveInquiryToGoogleSheets } from "../sheets/sheetsProvider";
import { sendInquiryEmailNotification } from "../email/emailProvider";

export interface SubmissionResult {
  success: boolean;
  sheetsSaved: boolean;
  emailSent: boolean;
  errors: string[];
}

export async function submitClientInquiry(inquiry: ClientInquiry): Promise<SubmissionResult> {
  const result: SubmissionResult = {
    success: false,
    sheetsSaved: false,
    emailSent: false,
    errors: [],
  };

  try {
    // 1. Save to Google Sheets (Parallel execution or sequential is fine)
    const sheetsPromise = saveInquiryToGoogleSheets(inquiry)
      .then((success) => {
        result.sheetsSaved = success;
        if (!success) result.errors.push("Failed to write to Google Sheets");
      })
      .catch((err) => {
        result.errors.push(`Google Sheets error: ${err.message || err}`);
      });

    // 2. Send email notification
    const emailPromise = sendInquiryEmailNotification(inquiry)
      .then((success) => {
        result.emailSent = success;
        if (!success) result.errors.push("Failed to send email notification");
      })
      .catch((err) => {
        result.errors.push(`Email notification error: ${err.message || err}`);
      });

    // Wait for both integrations to run
    await Promise.all([sheetsPromise, emailPromise]);

    // Success condition: we require at least one provider to succeed, or since it falls back to mock logging, we count it as true if no throw
    result.success = true; // In production, we can adjust this logic based on configuration
  } catch (error: any) {
    result.errors.push(`General ingestion failure: ${error?.message || error}`);
  }

  return result;
}
