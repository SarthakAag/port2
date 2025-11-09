import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "../../../lib/utils/rateLimiter";

/**
 * Interface for request body
 */
interface ChatRequestBody {
  message: string;
  conversationHistory?: Array<{
    role: "user" | "assistant";
    content: string;
  }>;
}

/**
 * Your Personal Info (EDIT THIS)
 */
const personalInfo = {
  name: "Sarthak Agarwal",
  title: "Full Stack Developer, Data Analyst",
  email: "sarthakagar2012@gmail.com",
  phone: "+91 8299426750",
  location: "Chennai, Tamil Nadu",
    about:
    "I'm a passionate Full-Stack Developer and Data Analyst with a strong focus on building scalable, data-driven web applications. I specialize in modern frameworks like Next.js, React, and TypeScript, and I also have hands-on experience in analyzing datasets, creating dashboards, and deriving actionable business insights using tools like Python (Pandas, NumPy), SQL, and Power BI. I enjoy combining clean, efficient code with analytical problem-solving to deliver meaningful user experiences and data-backed solutions.",
  skills: [
    "Next.js",
    "React.js",
    "TypeScript",
    "Node.js",
    "TailwindCSS",
    "MongoDB",
    "Python",
    "Pandas",
    "NumPy",
    "SQL",
    "Power BI",
    "Data Visualization",
  ],
  github: "https://github.com/SarthakAag",
  linkedin: "https://www.linkedin.com/in/sarthak-agarwal-0b1143281/",
  portfolio: "https://port2-lovat.vercel.app/",
};

/**
 * Basic Info Handler
 */
function getBasicInfoResponse(message: string): string | null {
  const text = message.toLowerCase();

  if (text.includes("name")) return `My name is ${personalInfo.name}.`;
  if (text.includes("email")) return `You can reach me at ${personalInfo.email}.`;
  if (text.includes("phone") || text.includes("mobile"))
    return `My phone number is ${personalInfo.phone}.`;
  if (text.includes("address") || text.includes("location"))
    return `I'm currently based in ${personalInfo.location}.`;
  if (text.includes("skills"))
    return `Here are my key skills: ${personalInfo.skills.join(", ")}.`;
  if (text.includes("about") || text.includes("yourself"))
    return personalInfo.about;
  if (text.includes("linkedin"))
    return `Here's my LinkedIn profile: ${personalInfo.linkedin}`;
  if (text.includes("github"))
    return `You can check my GitHub at ${personalInfo.github}`;
  if (text.includes("portfolio") || text.includes("website"))
    return `Visit my portfolio at ${personalInfo.portfolio}`;
  if (text.includes("role") || text.includes("what do you do"))
    return `I'm a ${personalInfo.title}.`;

  return null; // let Gemini handle it otherwise
}

/**
 * Sanitize user input
 */
function sanitizeInput(text: string): string {
  return text
    .trim()
    .slice(0, 1000)
    .replace(/<script[^>]*>.*?<\/script>/gi, "")
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "");
}

/**
 * Format conversation for Gemini API
 */
function formatHistory(
  history: Array<{ role: "user" | "assistant"; content: string }>,
  currentMessage: string
) {
  const contents = history.map((msg) => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: msg.content }],
  }));

  contents.push({
    role: "user",
    parts: [{ text: currentMessage }],
  });

  return contents;
}

/**
 * POST /api/chat
 */
export async function POST(req: NextRequest) {
  try {
    console.log("🔹 Incoming POST /api/chat");

    const body: ChatRequestBody = await req.json();
    const { message, conversationHistory = [] } = body;

    // Validate message
    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Invalid message. Must be non-empty." },
        { status: 400 }
      );
    }

    console.log("📩 Received message:", message);

    // 1️⃣ Check for basic info requests first
    const basicResponse = getBasicInfoResponse(message);
    if (basicResponse) {
      return NextResponse.json(
        {
          response: basicResponse,
          type: "basic-info",
          timestamp: new Date().toISOString(),
        },
        { status: 200 }
      );
    }

    // 2️⃣ Continue with Gemini if not a basic question
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("❌ Missing GEMINI_API_KEY");
      return NextResponse.json(
        { error: "Server misconfigured: GEMINI_API_KEY not set." },
        { status: 500 }
      );
    }

    // Rate limiting
    const identifier =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "anonymous";

    let rateLimitResult;
    try {
      rateLimitResult = checkRateLimit(identifier);
    } catch (err) {
      console.error("⚠️ Rate limiter error, bypassing:", err);
      rateLimitResult = {
        success: true,
        remaining: 10,
        resetTime: Date.now() + 60000,
      };
    }

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: "Too many requests. Please try again later.",
          retryAfter: Math.ceil(
            (rateLimitResult.resetTime - Date.now()) / 1000
          ),
        },
        { status: 429 }
      );
    }

    // Sanitize input
    const sanitizedMessage = sanitizeInput(message);
    if (!sanitizedMessage) {
      return NextResponse.json(
        { error: "Message cannot be empty after sanitization." },
        { status: 400 }
      );
    }

    const limitedHistory = conversationHistory.slice(-10);
    const contents = formatHistory(limitedHistory, sanitizedMessage);

    console.log("🤖 Forwarding to Gemini API...");

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("❌ Gemini API error:", response.status, errorData);
      return NextResponse.json(
        { error: `Gemini API error: ${response.status}`, details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    let aiResponse =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn’t generate a response.";

    return NextResponse.json(
      {
        response: aiResponse,
        type: "ai-generated",
        timestamp: new Date().toISOString(),
      },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
        },
      }
    );
  } catch (error) {
    console.error("❌ Chat API error:", error);
    return NextResponse.json(
      {
        error: "Unexpected error occurred.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/chat
 */
export async function GET() {
  const apiKeyConfigured = !!process.env.GEMINI_API_KEY;

  return NextResponse.json(
    {
      status: "online",
      version: "2.1.0",
      message: "Portfolio Chat API with basic info handler is running",
      configured: apiKeyConfigured,
    },
    { status: 200 }
  );
}

/**
 * OPTIONS /api/chat - CORS
 */
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
}
