import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contactSchema";
import { site } from "@/lib/site";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation_failed" }, { status: 400 });
  }

  const data = parsed.data;

  // Honeypot filled: accept silently so the bot learns nothing.
  if (data.website) return NextResponse.json({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY missing — request accepted but not emailed.");
    return NextResponse.json({ ok: true, skipped: true });
  }

  const rows: [string, string][] = [
    ["Nom", data.name],
    ["E-mail", data.email],
    ["Société", data.company],
    ["Fonction", data.role || "—"],
    ["Téléphone", data.phone || "—"],
    ["Demande", data.subject],
    ["Budget transport", data.budget ?? "—"],
    ["Langue", data.locale ?? "fr"],
  ];

  const html = `
    <div style="font-family: system-ui, sans-serif; color: #0f172a; max-width: 560px;">
      <h2 style="margin: 0 0 16px; font-size: 18px;">Nouvelle demande CarrierBridge</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        ${rows.map(([label, value]) => row(label, value)).join("")}
      </table>
      <p style="margin: 20px 0 6px; font-weight: 600; font-size: 14px;">Contexte</p>
      <p style="white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${escapeHtml(data.message)}</p>
    </div>
  `;

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? `CarrierBridge <${site.contactEmail}>`,
      to: process.env.CONTACT_TO_EMAIL ?? site.contactEmail,
      replyTo: data.email,
      subject: `[CarrierBridge] ${data.subject} — ${data.company}`,
      html,
    });
  } catch (error) {
    console.error("[contact] send failed", error);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

function row(label: string, value: string) {
  return `<tr>
    <td style="padding: 6px 12px 6px 0; color: #64748b; vertical-align: top;">${escapeHtml(label)}</td>
    <td style="padding: 6px 0; font-weight: 500;">${escapeHtml(value)}</td>
  </tr>`;
}

/** Field values land in an HTML email, so they are escaped before interpolation. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
