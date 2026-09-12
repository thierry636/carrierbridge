import { useTranslations } from "next-intl";
import { VisualFrame } from "./frame";

export function QuickStart() {
  const t = useTranslations("home.visuals.quickStart");
  const steps = t.raw("steps") as { title: string; text: string }[];

  return (
    <VisualFrame title={t("title")}>
      <ol className="space-y-4">
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-3.5">
            <span
              aria-hidden
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-semibold text-white"
            >
              {index + 1}
            </span>
            <div>
              <p className="text-sm font-semibold text-ink-900">{step.title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-ink-600">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </VisualFrame>
  );
}
