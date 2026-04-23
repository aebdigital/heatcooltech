import { NextResponse } from "next/server";
import { site } from "@/src/data/site";

type ContactPayload = {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  consent?: boolean;
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const name = clean(body.name);
    const phone = clean(body.phone);
    const email = clean(body.email);
    const message = clean(body.message);
    const consent = Boolean(body.consent);

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, message: "Vyplňte prosím meno, email a správu." }, { status: 400 });
    }

    if (!consent) {
      return NextResponse.json({ ok: false, message: "Pred odoslaním je potrebný súhlas so spracovaním údajov." }, { status: 400 });
    }

    if (!process.env.CONTACT_FORM_RECIPIENT || !process.env.SMTP2GO_API_KEY || !process.env.SMTP2GO_SENDER) {
      return NextResponse.json(
        { ok: false, message: "Chýba konfigurácia kontaktného formulára na serveri." },
        { status: 500 },
      );
    }

    const textBody = [
      "Nová správa z webu Heatcooltech",
      "",
      `Meno: ${name}`,
      `Telefón: ${phone || "-"}`,
      `Email: ${email}`,
      "",
      "Správa:",
      message,
    ].join("\n");

    const htmlBody = `
      <h2>Nová správa z webu Heatcooltech</h2>
      <p><strong>Meno:</strong> ${name}</p>
      <p><strong>Telefón:</strong> ${phone || "-"}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Správa:</strong></p>
      <p>${message.replace(/\n/g, "<br />")}</p>
    `;

    const smtpResponse = await fetch("https://api.smtp2go.com/v3/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Smtp2go-Api-Key": process.env.SMTP2GO_API_KEY,
      },
      body: JSON.stringify({
        api_key: process.env.SMTP2GO_API_KEY,
        sender: process.env.SMTP2GO_SENDER,
        to: [process.env.CONTACT_FORM_RECIPIENT],
        subject: `Heatcooltech objednávka od ${name}`,
        text_body: textBody,
        html_body: htmlBody,
        reply_to: email,
      }),
    });

    const smtpPayload = (await smtpResponse.json()) as {
      data?: {
        succeeded?: number;
        error?: string;
      };
    };

    if (!smtpResponse.ok || !smtpPayload?.data?.succeeded) {
      return NextResponse.json(
        {
          ok: false,
          message: smtpPayload?.data?.error || "Email sa nepodarilo odoslať.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true, message: `Správa bola úspešne odoslaná na ${site.email}.` });
  } catch {
    return NextResponse.json({ ok: false, message: "Formulár sa nepodarilo spracovať." }, { status: 500 });
  }
}
