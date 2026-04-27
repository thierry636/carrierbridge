"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type TabItem = {
  id: string;
  label: string;
  count?: number;
  hint?: string;
  content: ReactNode;
};

export function Tabs({
  items,
  defaultId,
}: {
  items: TabItem[];
  defaultId?: string;
}) {
  const [active, setActive] = useState(defaultId ?? items[0]?.id);
  const current = items.find((i) => i.id === active) ?? items[0];

  return (
    <div>
      <div className="border-b border-ink-200">
        <nav className="-mb-px flex gap-1" role="tablist">
          {items.map((item) => {
            const isActive = item.id === active;
            return (
              <button
                key={item.id}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => setActive(item.id)}
                title={item.hint}
                className={cn(
                  "group relative inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors",
                  isActive
                    ? "border-brand-600 text-brand-700"
                    : "border-transparent text-ink-600 hover:border-ink-300 hover:text-ink-900"
                )}
              >
                {item.label}
                {typeof item.count === "number" && (
                  <span
                    className={cn(
                      "inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1.5 text-[11px] font-semibold",
                      isActive
                        ? "bg-brand-100 text-brand-700"
                        : "bg-ink-100 text-ink-600 group-hover:bg-ink-200"
                    )}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
      <div className="pt-6">{current?.content}</div>
    </div>
  );
}
