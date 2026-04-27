import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type Step = {
  id: string;
  label: string;
  hint?: string;
};

export function Stepper({
  steps,
  currentIndex,
}: {
  steps: Step[];
  currentIndex: number;
}) {
  return (
    <ol className="flex w-full items-start gap-2">
      {steps.map((step, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;
        return (
          <li key={step.id} className="flex flex-1 items-start gap-3">
            <div className="flex flex-1 flex-col">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                    done && "bg-emerald-500 text-white",
                    active && "bg-brand-600 text-white ring-4 ring-brand-100",
                    !done && !active && "bg-ink-100 text-ink-500"
                  )}
                >
                  {done ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
                </span>
                {i < steps.length - 1 && (
                  <span
                    className={cn(
                      "h-0.5 flex-1 rounded-full transition-colors",
                      done ? "bg-emerald-500" : "bg-ink-200"
                    )}
                  />
                )}
              </div>
              <div className="mt-2 pr-2">
                <p
                  className={cn(
                    "text-sm font-medium",
                    active ? "text-ink-900" : done ? "text-ink-700" : "text-ink-500"
                  )}
                >
                  {step.label}
                </p>
                {step.hint && (
                  <p className="mt-0.5 text-xs text-ink-500 leading-snug">
                    {step.hint}
                  </p>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
