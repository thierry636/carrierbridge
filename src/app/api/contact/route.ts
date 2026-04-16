import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contactSchema";

export const runtime = "nodejs";

const sectorLabels: Record<string, string> = {
  chemistry: "Chimie / matières dangereuses",
  food: "Agroalimentaire / température dirigée",
  construction: "BTP / vrac",
  distribution: "Distribution / e-commerce",
  industry: "Industrie",
  other: "Autre",
};

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation_failed", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // Honeypot — if filled, silently accept
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL ?? "Carrier Bridge <onboarding@resend.dev>";
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "hello@carrierbridge.com";

  if (!apiKey) {
    console.warn(
      "[contact] RESEND_API_KEY missing — skipping email send. Payload:",
      data
    );
    return NextResponse.json({ ok: true, skipped: true });
  }

  const resend = new Resend(apiKey);

  const subject = `[Carrier Bridge] Nouvelle demande de démo — ${data.company}`;

  const html = `
    <div style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; color: #0f172a; max-width: 560px;">
      <h2 style="margin: 0 0 16px; font-size: 18px;">Nouvelle demande Carrier Bridge</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        ${row("Nom", data.name)}
        ${row("Email", data.email)}
        ${row("Entreprise", data.company)}
        ${row("Fonction", data.role || "—")}
        ${row("Secteur", data.sector ? sectorLabels[data.sector] ?? data.sector : "—")}
        ${row("Langue", data.locale === "en" ? "EN" : "FR")}
      </table>
      <h3 style="margin: 24px 0 8px; font-size: 14px;">Message</h3>
      <div style="white-space: pre-wrap; padding: 12px 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 14px; line-height: 1.6;">
        ${escapeHtml(data.message)}
      </div>
    </div>
  `;

  const text = [
    "Nouvelle demande Carrier Bridge",
    `Nom: ${data.name}`,
    `Email: ${data.email}`,
    `Entreprise: ${data.company}`,
    `Fonction: ${data.role || "—"}`,
    `Secteur: ${data.sector ? sectorLabels[data.sector] ?? data.sector : "—"}`,
    `Langue: ${data.locale === "en" ? "EN" : "FR"}`,
    "",
    "Message:",
    data.message,
  ].join("\n");

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: data.email,
      subject,
      html,
      text,
    });
    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json({ error: "send_failed" }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json({ error: "send_failed" }, { status: 500 });
  }
}

function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding: 6px 12px 6px 0; color: #64748b; vertical-align: top; width: 110px;">${escapeHtml(label)}</td>
      <td style="padding: 6px 0; color: #0f172a;">${escapeHtml(value)}</td>
    </tr>
  `;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
