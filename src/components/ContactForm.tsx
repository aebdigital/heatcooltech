"use client";

import { useState } from "react";
import { RollingButton } from "./RollingButton";
import Link from "next/link";

type FormState = {
  name: string;
  phone: string;
  email: string;
  message: string;
  consent: boolean;
};

const initialState: FormState = {
  name: "",
  phone: "",
  email: "",
  message: "",
  consent: false,
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("submitting");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const payload = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !payload.ok) {
        throw new Error(payload.message || "Formulár sa nepodarilo odoslať.");
      }

      setStatus("success");
      setFeedback("Ďakujeme, vaša správa bola odoslaná.");
      setForm(initialState);
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "Niečo sa pokazilo. Skúste to prosím znova.");
    }
  }

  return (
    <form className="grid gap-6" onSubmit={handleSubmit} data-reveal>
      <div className="grid gap-5 md:grid-cols-3">
        <input
          className="form-shell h-14 px-4 text-white placeholder:text-white/80"
          name="name"
          placeholder="Vaše Meno"
          value={form.name}
          onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          required
        />
        <input
          className="form-shell h-14 px-4 text-white placeholder:text-white/80"
          name="phone"
          placeholder="Telefón"
          value={form.phone}
          onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
        />
        <input
          className="form-shell h-14 px-4 text-white placeholder:text-white/80"
          name="email"
          type="email"
          placeholder="Váš Email"
          value={form.email}
          onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          required
        />
      </div>

      <textarea
        className="form-shell min-h-36 px-4 py-4 text-white placeholder:text-white/80"
        name="message"
        placeholder="Vaša správa"
        value={form.message}
        onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
        required
      />

      <label className="flex items-start gap-3 text-[15px] leading-7 text-white/95">
        <input
          className="mt-1 h-4 w-4 shrink-0 accent-white"
          type="checkbox"
          checked={form.consent}
          onChange={(event) => setForm((current) => ({ ...current, consent: event.target.checked }))}
          required
        />
        <span>
          Odoslaním formulára Súhlasíte so{" "}
          <Link href="/ochrana-osobnych-udajov/" className="underline decoration-white/50 underline-offset-4 hover:decoration-white">
            spracovaním osobných údajov
          </Link>{" "}
          za účelom spracovania objednávky.
        </span>
      </label>

      <div className="flex flex-col items-start gap-4">
        <RollingButton
          type="submit"
          label={status === "submitting" ? "Odosielam" : "Odoslať"}
          secondaryLabel="Odoslať"
          disabled={status === "submitting"}
          className="min-w-[220px]"
        />
        {feedback ? (
          <p className={`text-[15px] ${status === "success" ? "text-white" : "text-white/85"}`}>{feedback}</p>
        ) : null}
      </div>
    </form>
  );
}
