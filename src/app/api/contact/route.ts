import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { checkRateLimit } from "@/lib/utils/rateLimiter";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/** ✅ Validate email format */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/** ✅ Sanitize inputs to avoid injection */
function sanitizeInput(text: string): string {
  return text
    .trim()
    .slice(0, 5000)
    .replace(/<script[^>]*>.*?<\/script>/gi, "")
    .replace(/[<>]/g, "");
}

/** ✅ Create Gmail SMTP transporter */
function createTransporter() {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    throw new Error("Missing Gmail credentials in environment variables.");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}

/** ✅ POST /api/contact — Handle contact form submission */
export async function POST(req: NextRequest) {
  try {
    console.log("📩 Received contact form submission");

    const body: ContactFormData = await req.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 400 }
      );
    }

    // Rate Limiting
    const identifier =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      email;

    let rateLimitResult;
    try {
      rateLimitResult = checkRateLimit(identifier);
    } catch (err) {
      console.error("Rate limiter error:", err);
      rateLimitResult = {
        success: true,
        remaining: 10,
        resetTime: Date.now() + 60_000,
      };
    }

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Sanitize
    const sanitized = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      subject: sanitizeInput(subject),
      message: sanitizeInput(message),
    };

    // Create transporter
    const transporter = createTransporter();

    // Email content
    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: sanitized.email,
      subject: `Portfolio Contact: ${sanitized.subject}`,
      html: `
        <html>
          <body style="font-family:Arial, sans-serif; line-height:1.6;">
            <h2>🚀 New Contact Message</h2>
            <p><strong>Name:</strong> ${sanitized.name}</p>
            <p><strong>Email:</strong> ${sanitized.email}</p>
            <p><strong>Subject:</strong> ${sanitized.subject}</p>
            <hr/>
            <p style="white-space:pre-wrap;">${sanitized.message}</p>
            <hr/>
            <p>💡 Reply directly to this email to respond to ${sanitized.name}.</p>
          </body>
        </html>
      `,
      text: `
New Contact Form Submission

From: ${sanitized.name}
Email: ${sanitized.email}
Subject: ${sanitized.subject}

Message:
${sanitized.message}

---
Reply to this email to respond to ${sanitized.name}
      `.trim(),
    };

    // Send the email
    console.log("📤 Sending email...");
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId);

    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Error sending contact email:", error);

    let errorMsg = "Failed to send message. Please try again later.";

    if (error.message?.includes("Invalid login")) {
      errorMsg =
        "Email service authentication failed. Please contact the site owner.";
    } else if (error.message?.includes("ECONNREFUSED")) {
      errorMsg =
        "Unable to connect to email service. Please try again later.";
    }

    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

/** ✅ GET /api/contact — Health Check */
export async function GET() {
  const configured =
    !!process.env.GMAIL_USER && !!process.env.GMAIL_APP_PASSWORD;

  return NextResponse.json(
    {
      status: "online",
      message: "Contact API is running",
      configured,
      service: "Gmail SMTP",
    },
    { status: 200 }
  );
}
