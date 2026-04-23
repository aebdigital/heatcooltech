exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ ok: false, message: "Method not allowed" }),
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const consent = Boolean(body.consent);

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ ok: false, message: "Vyplňte prosím meno, email a správu." }),
      };
    }

    if (!consent) {
      return {
        statusCode: 400,
        body: JSON.stringify({ ok: false, message: "Pred odoslaním je potrebný súhlas so spracovaním údajov." }),
      };
    }

    if (!process.env.CONTACT_FORM_RECIPIENT || !process.env.SMTP2GO_API_KEY || !process.env.SMTP2GO_SENDER) {
      return {
        statusCode: 500,
        body: JSON.stringify({ ok: false, message: "Chýba konfigurácia kontaktného formulára na serveri." }),
      };
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

    const smtpPayload = await smtpResponse.json();

    if (!smtpResponse.ok || !smtpPayload?.data?.succeeded) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          ok: false,
          message: smtpPayload?.data?.error || "Email sa nepodarilo odoslať.",
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, message: "Správa bola úspešne odoslaná." }),
    };
  } catch {
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, message: "Formulár sa nepodarilo spracovať." }),
    };
  }
};
