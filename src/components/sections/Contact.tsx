"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations, useLocale } from "next-intl";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Mail, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  contactSchema,
  sectorValues,
  type ContactInput,
} from "@/lib/contactSchema";

type Status = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const t = useTranslations("contact");
  const tErr = useTranslations("contact.errors");
  const tSector = useTranslations("contact.form.sectorOptions");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { locale: locale as "fr" | "en" },
  });

  const onSubmit = async (data: ContactInput) => {
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset({ locale: locale as "fr" | "en" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div
        aria-hidden
        className="absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-brand-100/40 blur-3xl"
      />
      <Container className="relative">
        <div className="grid items-start gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Left column */}
          <div className="lg:col-span-2">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
              {t("eyebrow")}
            </p>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl lg:text-[40px] lg:leading-[1.1]">
              {t("title")}
            </h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-600">
              {t("subtitle")}
            </p>

            <a
              href="mailto:hello@carrierbridge.com"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              <Mail className="h-4 w-4" />
              hello@carrierbridge.com
            </a>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="rounded-2xl border border-ink-200 bg-white p-6 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.18)] sm:p-8"
            >
              {/* Honeypot */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                {...register("website")}
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
                aria-hidden="true"
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label={t("form.name")}
                  error={errors.name && tErr(errors.name.message as string)}
                >
                  <input
                    type="text"
                    placeholder={t("form.namePlaceholder")}
                    autoComplete="name"
                    {...register("name")}
                    className={inputCls(!!errors.name)}
                  />
                </Field>

                <Field
                  label={t("form.email")}
                  error={errors.email && tErr(errors.email.message as string)}
                >
                  <input
                    type="email"
                    placeholder={t("form.emailPlaceholder")}
                    autoComplete="email"
                    {...register("email")}
                    className={inputCls(!!errors.email)}
                  />
                </Field>

                <Field
                  label={t("form.company")}
                  error={errors.company && tErr(errors.company.message as string)}
                >
                  <input
                    type="text"
                    placeholder={t("form.companyPlaceholder")}
                    autoComplete="organization"
                    {...register("company")}
                    className={inputCls(!!errors.company)}
                  />
                </Field>

                <Field label={t("form.role")}>
                  <input
                    type="text"
                    placeholder={t("form.rolePlaceholder")}
                    autoComplete="organization-title"
                    {...register("role")}
                    className={inputCls(false)}
                  />
                </Field>
              </div>

              <div className="mt-5">
                <Field label={t("form.sector")}>
                  <select
                    {...register("sector")}
                    className={cn(inputCls(false), "appearance-none pr-10")}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      {t("form.sectorPlaceholder")}
                    </option>
                    {sectorValues.map((s) => (
                      <option key={s} value={s}>
                        {tSector(s)}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="mt-5">
                <Field
                  label={t("form.message")}
                  error={errors.message && tErr(errors.message.message as string)}
                >
                  <textarea
                    rows={5}
                    placeholder={t("form.messagePlaceholder")}
                    {...register("message")}
                    className={cn(inputCls(!!errors.message), "min-h-[120px] py-3 leading-relaxed")}
                  />
                </Field>
              </div>

              <div className="mt-6 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-ink-500 sm:max-w-xs">
                  {t("form.consent")}
                </p>
                <Button
                  type="submit"
                  size="lg"
                  disabled={status === "submitting"}
                  className="sm:w-auto"
                >
                  {status === "submitting"
                    ? t("form.submitting")
                    : t("form.submit")}
                  {status !== "submitting" && (
                    <ArrowRight className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {status === "success" && (
                <div className="mt-5 flex items-start gap-2.5 rounded-lg border border-emerald-200 bg-emerald-50 p-3.5 text-sm text-emerald-800">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{t("form.success")}</span>
                </div>
              )}
              {status === "error" && (
                <div className="mt-5 flex items-start gap-2.5 rounded-lg border border-rose-200 bg-rose-50 p-3.5 text-sm text-rose-800">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{t("form.error")}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink-800">
        {label}
      </span>
      {children}
      {error && <p className="mt-1.5 text-xs text-rose-600">{error}</p>}
    </label>
  );
}

function inputCls(hasError: boolean) {
  return cn(
    "block w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-ink-900 shadow-sm transition-colors placeholder:text-ink-400",
    "focus:outline-none focus:ring-2",
    hasError
      ? "border-rose-300 focus:border-rose-400 focus:ring-rose-200"
      : "border-ink-200 focus:border-brand-400 focus:ring-brand-100"
  );
}
