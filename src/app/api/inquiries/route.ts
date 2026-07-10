import { NextRequest, NextResponse } from "next/server";
import { inquirySchema } from "@/lib/validation/inquiry";
import { submitClientInquiry } from "@/lib/services/inquiryService";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate request body with Zod
    const validationResult = inquirySchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          errors: validationResult.error.issues.map(err => ({
            field: err.path.join("."),
            message: err.message
          })) 
        },
        { status: 400 }
      );
    }
    
    const validatedData = validationResult.data;
    
    // Anti-spam 1: Honeypot field must be empty
    if (validatedData.honeypot && validatedData.honeypot.trim() !== "") {
      console.warn("[Anti-Spam] Honeypot field triggered. Silently ignoring submission.");
      // Return 200 OK so the bot thinks it succeeded, but we don't save or alert
      return NextResponse.json({ success: true, message: "Inquiry received (honeypot)." });
    }
    
    // Anti-spam 2: Submission speed check
    if (validatedData.formTimestamp) {
      const formLoadTime = parseInt(validatedData.formTimestamp, 10);
      const now = Date.now();
      const submissionDurationMs = now - formLoadTime;
      
      // If submitted in less than 2 seconds, it is highly likely a script/bot
      if (submissionDurationMs < 2000) {
        console.warn(`[Anti-Spam] Fast submission detected (${submissionDurationMs}ms). Silently ignoring.`);
        return NextResponse.json({ success: true, message: "Inquiry received (speed)." });
      }
    }
    
    // Extract actual client details to send to ingestion pipeline
    const { honeypot, formTimestamp, ...clientData } = validatedData;
    
    // Submit lead to Google Sheets & Send email notifications
    const result = await submitClientInquiry(clientData);
    
    return NextResponse.json({
      success: result.success,
      sheetsSaved: result.sheetsSaved,
      emailSent: result.emailSent,
      errors: result.errors.length > 0 ? result.errors : undefined
    });
    
  } catch (error: any) {
    console.error("[API - Error] Inquiries POST handler failed:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred processing your request." },
      { status: 500 }
    );
  }
}
