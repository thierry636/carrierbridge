"use client";

import { useState } from "react";
import { ChevronDown, AlertTriangle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Select, FieldLabel, Input } from "./Field";

type SuggestionMeta = {
  source: "ai" | "default" | "user";
  affectedRows?: number;
};

const fields: {
  id: string;
  label: string;
  hint?: string;
  type: "select" | "input";
  options?: string[];
  defaultValue: string;
  meta: SuggestionMeta;
  warning?: string;
}[] = [
  {
    id: "originCountry",
    label: "Pays origine ISO3",
    type: "input",
    defaultValue: "FRA",
    meta: { source: "ai" },
  },
  {
    id: "originZoneType",
    label: "Type zone origine",
    type: "select",
    options: ["Auto (pas de valeur par défaut)", "Code postal", "Département", "Région"],
    defaultValue: "Auto (pas de valeur par défaut)",
    meta: { source: "default" },
  },
  {
    id: "originZone",
    label: "Zone origine par défaut",
    hint: "Zone attribuée si pas de colonne origine",
    type: "input",
    defaultValue: "",
    meta: { source: "ai", affectedRows: 247 },
    warning: "247 lignes hériteront de cette valeur",
  },
  {
    id: "destCountry",
    label: "Pays destination ISO3",
    type: "input",
    defaultValue: "FRA",
    meta: { source: "ai" },
  },
  {
    id: "destZoneType",
    label: "Type zone destination",
    type: "select",
    options: ["Auto (pas de valeur par défaut)", "Code postal", "Département", "Région"],
    defaultValue: "Auto (pas de valeur par défaut)",
    meta: { source: "default" },
  },
  {
    id: "destZone",
    label: "Zone destination par défaut",
    hint: "Zone attribuée si pas de colonne destination",
    type: "input",
    defaultValue: "",
    meta: { source: "default" },
  },
  {
    id: "scope",
    label: "Scope",
    type: "select",
    options: ["Non précisé", "National", "International", "Régional"],
    defaultValue: "Non précisé",
    meta: { source: "default" },
  },
  {
    id: "unit",
    label: "Unité par défaut",
    type: "select",
    options: ["Auto-détection", "kg", "m³", "Palette", "Colis"],
    defaultValue: "Auto-détection",
    meta: { source: "ai" },
  },
];

function SourceBadge({ meta }: { meta: SuggestionMeta }) {
  if (meta.source === "ai") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-cyan-50 px-2 py-0.5 text-[11px] font-medium text-cyan-700 ring-1 ring-inset ring-cyan-200">
        <Sparkles className="h-2.5 w-2.5" />
        Suggéré par l&apos;IA
      </span>
    );
  }
  return null;
}

export function AdvancedDefaults() {
  const [open, setOpen] = useState(false);
  const aiSuggestionsCount = fields.filter((f) => f.meta.source === "ai").length;

  return (
    <div className="overflow-hidden rounded-xl border border-ink-200 bg-white">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-ink-50/60"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-100 text-ink-600">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-ink-900">
              Paramètres par défaut
              <span className="ml-2 font-normal text-ink-500">(optionnel)</span>
            </p>
            <p className="mt-0.5 text-xs text-ink-500">
              {aiSuggestionsCount} valeurs déjà pré-remplies par l&apos;IA · cliquez pour vérifier ou ajuster
            </p>
          </div>
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-ink-400 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="border-t border-ink-100 px-5 py-5">
          <div className="grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-3">
            {fields.map((f) => (
              <FieldLabel
                key={f.id}
                label={f.label}
                hint={f.hint}
                htmlFor={f.id}
                suggestion={<SourceBadge meta={f.meta} />}
              >
                {f.type === "select" ? (
                  <Select id={f.id} defaultValue={f.defaultValue}>
                    {(f.options ?? []).map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </Select>
                ) : (
                  <Input id={f.id} defaultValue={f.defaultValue} placeholder="ex: 75, IDF" />
                )}
                {f.warning && (
                  <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-amber-700">
                    <AlertTriangle className="h-3 w-3" />
                    {f.warning}
                  </p>
                )}
              </FieldLabel>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
