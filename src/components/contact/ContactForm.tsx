"use client";

import { useId, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { budgetValues, contactSchema, subjectValues } from "@/lib/contactSchema";
import { track } from "@/lib/analytics";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type FieldName = "name" | "email" | "company" | "subject" | "message" | "consent";
type Errors = Partial<Record<FieldName | "generic", string>>;

export function ContactForm() {
  const t = useTranslations("contact.form");
  const locale = useLocale();
  const formId = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      company: String(form.get("company") ?? ""),
      role: String(form.get("role") ?? ""),
      phone: String(form.get("phone") ?? ""),
      subject: String(form.get("subject") ?? ""),
      budget: String(form.get("budget") ?? "") || undefined,
      message: String(form.get("message") ?? ""),
      consent: form.get("consent") === "on",
      website: String(form.get("website") ?? ""),
      locale,
    };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const found: Errors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as FieldName;
        found[field] ??= t(`errors.${issue.message}`);
      }
      setErrors(found);
      return;
    }

    setErrors({});
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!response.ok) throw new Error(String(response.status));
      track("contact_request", { subject: parsed.data.subject });
      setStatus("sent");
    } catch {
      setStatus("idle");
      setErrors({ generic: t("errors.generic") });
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-brand-200 bg-brand-50 p-6">
        <CheckCircle2 className="h-6 w-6 text-brand-600" aria-hidden />
        <h2 className="mt-3 text-lg font-semibold text-ink-900">{t("success.title")}</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-700">{t("success.text")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-xl border border-ink-200 bg-white p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={`${formId}-name`} name="name" label={t("name.label")} error={errors.name} required />
        <Field
          id={`${formId}-email`}
          name="email"
          type="email"
          label={t("email.label")}
          error={errors.email}
          required
        />
        <Field
          id={`${formId}-company`}
          name="company"
          label={t("company.label")}
          error={errors.company}
          required
        />
        <Field
          id={`${formId}-role`}
          name="role"
          label={`${t("role.label")} (${t("role.optional")})`}
        />

        <Select
          id={`${formId}-subject`}
          name="subject"
          label={t("subject.label")}
          error={errors.subject}
          required
          options={subjectValues.map((value) => ({
            value,
            label: t(`subject.options.${value}`),
          }))}
        />
        <Select
          id={`${formId}-budget`}
          name="budget"
          label={`${t("budget.label")} (${t("budget.optional")})`}
          options={budgetValues.map((value) => ({
            value,
            label: t(`budget.options.${value}`),
          }))}
          allowEmpty
        />

        <Field
          id={`${formId}-phone`}
          name="phone"
          type="tel"
          label={`${t("phone.label")} (${t("phone.optional")})`}
          className="sm:col-span-2"
        />

        <div className="sm:col-span-2">
          <label htmlFor={`${formId}-message`} className="block text-sm font-medium text-ink-900">
            {t("message.label")}
          </label>
          <textarea
            id={`${formId}-message`}
            name="message"
            rows={5}
            required
            placeholder={t("message.placeholder")}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? `${formId}-message-error` : undefined}
            className={cn(
              "mt-1.5 w-full rounded-lg border bg-white px-3 py-2 text-sm text-ink-900 shadow-sm",
              "focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600",
              errors.message ? "border-red-500" : "border-ink-300"
            )}
          />
          {errors.message && (
            <p id={`${formId}-message-error`} className="mt-1.5 text-xs text-red-600">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      {/* Honeypot — hidden from people and from assistive technology alike. */}
      <div aria-hidden className="absolute left-[-9999px]">
        <label htmlFor={`${formId}-website`}>Website</label>
        <input id={`${formId}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6 flex items-start gap-3">
        <input
          id={`${formId}-consent`}
          name="consent"
          type="checkbox"
          aria-invalid={errors.consent ? true : undefined}
          className="mt-1 h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-brand-600"
        />
        <label htmlFor={`${formId}-consent`} className="text-sm leading-relaxed text-ink-600">
          {t("consent")}
        </label>
      </div>
      {errors.consent && <p className="mt-1.5 text-xs text-red-600">{errors.consent}</p>}

      {errors.generic && (
        <p role="alert" className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {errors.generic}{" "}
          <a href={`mailto:${site.contactEmail}`} className="font-medium underline">
            {site.contactEmail}
          </a>
        </p>
      )}

      <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto" disabled={status === "sending"}>
        {status === "sending" ? t("sending") : t("submit")}
      </Button>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  error,
  required,
  className,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  error?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-ink-900">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "mt-1.5 w-full rounded-lg border bg-white px-3 py-2 text-sm text-ink-900 shadow-sm",
          "focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600",
          error ? "border-red-500" : "border-ink-300"
        )}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function Select({
  id,
  name,
  label,
  options,
  error,
  required,
  allowEmpty,
}: {
  id: string;
  name: string;
  label: string;
  options: { value: string; label: string }[];
  error?: string;
  required?: boolean;
  allowEmpty?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink-900">
        {label}
      </label>
      <select
        id={id}
        name={name}
        required={required}
        defaultValue=""
        aria-invalid={error ? true : undefined}
        className={cn(
          "mt-1.5 w-full rounded-lg border bg-white px-3 py-2 text-sm text-ink-900 shadow-sm",
          "focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600",
          error ? "border-red-500" : "border-ink-300"
        )}
      >
        <option value="" disabled={!allowEmpty}>
          —
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}
