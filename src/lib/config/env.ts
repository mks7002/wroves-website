export const env = {
  googleSheetsWebhookUrl: process.env.GOOGLE_SHEETS_WEBHOOK_URL || "",
  resendApiKey: process.env.RESEND_API_KEY || "",
  notificationEmail: process.env.NOTIFICATION_EMAIL || "hello@wroves.com",
  senderEmail: process.env.SENDER_EMAIL || "onboarding@resend.dev",
  isProduction: process.env.NODE_ENV === "production",
};
