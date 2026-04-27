"use client";

import {
  Eye,
  Tag,
  Archive,
  MoreHorizontal,
  Calendar,
  FileSpreadsheet,
} from "lucide-react";
import { Badge } from "./Badge";
import { cn } from "@/lib/utils";

export type RateVersion = {
  id: string;
  filename: string;
  type: string;
  year: number;
  validFrom?: string;
  validTo?: string | null;
  status: "active" | "draft" | "archived";
  isPrimary?: boolean;
};

function formatValidity(v: RateVersion): string {
  if (!v.validFrom && !v.validTo) return "Validité non précisée";
  if (v.validFrom && !v.validTo) return `Depuis le ${v.validFrom}`;
  if (v.validFrom && v.validTo) return `Du ${v.validFrom} au ${v.validTo}`;
  if (!v.validFrom && v.validTo) return `Jusqu'au ${v.validTo}`;
  return "—";
}

export function VersionRow({ version }: { version: RateVersion }) {
  const statusVariant =
    version.status === "active"
      ? "success"
      : version.status === "draft"
        ? "warning"
        : "neutral";
  const statusLabel =
    version.status === "active"
      ? "Actif"
      : version.status === "draft"
        ? "Brouillon"
        : "Archivé";

  return (
    <div
      className={cn(
        "group relative flex items-center gap-4 rounded-xl border bg-white p-4 transition-all hover:shadow-sm",
        version.isPrimary
          ? "border-brand-300 ring-1 ring-brand-100"
          : "border-ink-200"
      )}
    >
      {version.isPrimary && (
        <span
          aria-hidden
          className="absolute -left-px top-4 h-8 w-1 rounded-r-full bg-brand-500"
        />
      )}

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
        <FileSpreadsheet className="h-5 w-5" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="truncate text-sm font-semibold text-ink-900">
            {version.filename}
          </h3>
          {version.isPrimary && (
            <Badge variant="info" size="sm">
              Version active
            </Badge>
          )}
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-500">
          <span className="inline-flex items-center gap-1">
            <Badge variant="accent" size="sm">
              {version.type}
            </Badge>
          </span>
          <span className="inline-flex items-center gap-1">
            <Tag className="h-3 w-3" />
            {version.year}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatValidity(version)}
          </span>
        </div>
      </div>

      <div className="shrink-0">
        <Badge variant={statusVariant} size="md">
          <span
            aria-hidden
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              version.status === "active" && "bg-emerald-500",
              version.status === "draft" && "bg-amber-500",
              version.status === "archived" && "bg-ink-400"
            )}
          />
          {statusLabel}
        </Badge>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          className="inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-sm font-medium text-ink-700 hover:bg-ink-100"
          title="Visualiser"
        >
          <Eye className="h-4 w-4" />
          Voir
        </button>
        {version.status !== "archived" && (
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-ink-500 hover:bg-ink-100 hover:text-ink-900"
            title="Archiver"
          >
            <Archive className="h-4 w-4" />
          </button>
        )}
        <button
          type="button"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-ink-500 hover:bg-ink-100 hover:text-ink-900"
          title="Plus d'actions"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
