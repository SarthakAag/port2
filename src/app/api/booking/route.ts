import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, project, date, time } = await req.json();

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",       // free tier sender — change after verifying your domain
      to: "sarthakag2004@gmail.com",
      subject: `Meeting Request — ${name} — ${date} at ${time}`,
      html: `
        <h2>New Meeting Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <h3>Project Details</h3>
        <p>${project || "To be discussed."}</p>
      `,
      replyTo: email,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}