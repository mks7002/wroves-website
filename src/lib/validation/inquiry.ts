import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(100),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  company: z.string().optional(),
  website: z.string().optional(),
  projectType: z.string().min(1, { message: "Please select a project category." }),
  budget: z.string().min(1, { message: "Please select a budget range." }),
  timeline: z.string().optional(),
  details: z.string().min(10, { message: "Please describe your project in at least 10 characters." }),
  source: z.string().optional(),
  
  // Anti-spam measures
  honeypot: z.string().optional(), // Must be empty
  formTimestamp: z.string().optional(), // Used to verify submission speed
});

export type InquiryInput = z.infer<typeof inquirySchema>;
