"use client";

import { Sparkles, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type AssistantMessage =
  | { kind: "ai"; content: ReactNode; finding?: "info" | "warning" }
  | { kind: "user"; content: ReactNode }
  | { kind: "actions"; actions: { label: string; onClick?: () => void; variant?: "primary" | "ghost" }[] };

export function ChatAssistant({
  messages,
  className,
  inputDisabled = true,
}: {
  messages: AssistantMessage[];
  className?: string;
  inputDisabled?: boolean;
}) {
  return (
    <aside
      className={cn(
        "flex h-full flex-col rounded-2xl border border-ink-200 bg-gradient-to-b from-white to-brand-50/30 shadow-sm",
        className
      )}
    >
      <header className="flex items-center gap-2 border-b border-ink-100 px-5 py-3.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-brand-600 text-white shadow-sm">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-semibold text-ink-900">Assistant import</p>
          <p className="text-xs text-ink-500">Détection automatique en cours</p>
        </div>
      </header>

      <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
        {messages.map((m, i) => {
          if (m.kind === "actions") {
            return (
              <div key={i} className="flex flex-wrap gap-2 pl-10">
                {m.actions.map((a, j) => (
                  <button
                    key={j}
                    type="button"
                    onClick={a.onClick}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                      a.variant === "primary"
                        ? "bg-brand-600 text-white hover:bg-brand-700"
                        : "bg-white text-ink-700 ring-1 ring-inset ring-ink-200 hover:bg-ink-50"
                    )}
                  >
                    {a.label}
                    {a.variant === "primary" && (
                      <ChevronRight className="h-3.5 w-3.5" />
                    )}
                  </button>
                ))}
              </div>
            );
          }
          if (m.kind === "user") {
            return (
              <div key={i} className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-brand-600 px-3.5 py-2 text-sm text-white">
                  {m.content}
                </div>
              </div>
            );
          }
          return (
            <div key={i} className="flex items-start gap-2.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-brand-600 text-white">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl rounded-tl-sm px-3.5 py-2 text-sm",
                  m.finding === "warning"
                    ? "bg-amber-50 text-amber-900 ring-1 ring-inset ring-amber-200"
                    : "bg-white text-ink-800 ring-1 ring-inset ring-ink-200"
                )}
              >
                {m.content}
              </div>
            </div>
          );
        })}
      </div>

      <footer className="border-t border-ink-100 p-3">
        <div className="flex items-center gap-2 rounded-xl bg-white px-3.5 py-2.5 ring-1 ring-inset ring-ink-200">
          <input
            type="text"
            disabled={inputDisabled}
            placeholder={
              inputDisabled
                ? "Posez une question à l'assistant…"
                : "Tapez votre message…"
            }
            className="flex-1 bg-transparent text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none"
          />
          <button
            type="button"
            disabled={inputDisabled}
            className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-brand-600 text-white opacity-60 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-2 text-center text-[11px] text-ink-400">
          L&apos;assistant pose les questions au fur et à mesure
        </p>
      </footer>
    </aside>
  );
}
