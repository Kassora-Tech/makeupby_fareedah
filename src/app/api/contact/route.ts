import { NextResponse } from "next/server";

// Placeholder contact handler for the MVP. Swap this out for a real email service
// (Resend, Formspree, SendGrid, etc.) before launch — flagged in the project README too.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  console.log("New contact form submission:", { name, email, message });

  return NextResponse.json({ ok: true });
}
