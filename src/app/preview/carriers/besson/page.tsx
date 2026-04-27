import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Upload,
  History,
  CalendarRange,
  CheckCircle2,
  Building2,
  FileText,
  Layers,
  Percent,
  Settings2,
} from "lucide-react";
import { Badge } from "@/components/dashboard/Badge";
import { Tabs } from "@/components/dashboard/Tabs";
import { VersionRow, type RateVersion } from "@/components/dashboard/VersionRow";
import { Button } from "@/components/ui/button";

const versions: RateVersion[] = [
  {
    id: "v1",
    filename: "TARIF BESSON 2026 - 26.xlsx",
    type: "MESSAGERIE",
    year: 2026,
    validFrom: "01/01/2026",
    validTo: null,
    status: "active",
    isPrimary: true,
  },
  {
    id: "v2",
    filename: "TARIF BESSON 2026 (2).xlsx",
    type: "MESSAGERIE",
    year: 2026,
    validFrom: "01/01/2026",
    validTo: "31/03/2026",
    status: "active",
  },
];

export default function CarrierDetailPage() {
  return (
    <main className="mx-auto max-w-[1400px] px-6 py-8">
      <div className="mb-6">
        <Link
          href="/preview"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-ink-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux transporteurs
        </Link>
      </div>

      {/* Header carte d'identité */}
      <section className="mb-8 rounded-2xl border border-ink-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-100 to-brand-100 text-brand-700">
              <Building2 className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight text-ink-900">
                  BESSON
                </h1>
                <Badge variant="success" size="md">
                  <CheckCircle2 className="h-3 w-3" />
                  Actif
                </Badge>
              </div>
              <p className="mt-1 text-sm text-ink-500">
                Transporteur · Code interne <span className="font-mono text-ink-700">BESSON</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm">
              <Settings2 className="h-4 w-4" />
              Paramètres
            </Button>
            <Link href="/preview/carriers/besson/import">
              <Button size="sm">
                <Upload className="h-4 w-4" />
                Importer une grille
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats résumées */}
        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-ink-100 pt-5 sm:grid-cols-4">
          <Stat
            icon={<Layers className="h-4 w-4" />}
            label="Version active"
            value="MESSAGERIE"
            highlight
          />
          <Stat
            icon={<History className="h-4 w-4" />}
            label="Grilles tarifaires"
            value="2 versions"
          />
          <Stat
            icon={<CalendarRange className="h-4 w-4" />}
            label="Couverture"
            value="2026 — sans fin"
          />
          <Stat
            icon={<FileText className="h-4 w-4" />}
            label="Documents"
            value="0 fichier"
          />
        </div>

        {/* Scopes - en mode discret */}
        <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-ink-500">Scopes :</span>
          <span className="text-ink-400">aucun pour le moment</span>
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-full border border-dashed border-ink-300 px-2.5 py-1 text-xs font-medium text-ink-600 hover:border-ink-400 hover:bg-ink-50 hover:text-ink-900"
          >
            <Plus className="h-3 w-3" />
            Ajouter un scope
          </button>
        </div>
      </section>

      {/* Tabs */}
      <Tabs
        items={[
          {
            id: "grids",
            label: "Grilles tarifaires",
            count: 2,
            hint: "Versions de tarifs importées depuis Excel",
            content: <GridsTab />,
          },
          {
            id: "rules",
            label: "Suppléments & règles",
            count: 3,
            hint: "Surcharges, frais additionnels et règles de calcul",
            content: <EmptyTab title="Suppléments & règles" />,
          },
          {
            id: "documents",
            label: "Documents",
            hint: "Fichiers contractuels et annexes",
            content: <EmptyTab title="Documents" />,
          },
          {
            id: "margins",
            label: "Marges",
            hint: "Marges commerciales appliquées",
            content: <EmptyTab title="Marges" />,
          },
        ]}
      />
    </main>
  );
}

function Stat({
  icon,
  label,
  value,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-ink-500">
        <span className="text-ink-400">{icon}</span>
        {label}
      </div>
      <div
        className={
          highlight
            ? "mt-1 text-base font-bold text-brand-700"
            : "mt-1 text-base font-semibold text-ink-900"
        }
      >
        {value}
      </div>
    </div>
  );
}

function GridsTab() {
  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-lg border border-ink-200 bg-white p-1">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md bg-ink-100 px-3 py-1.5 text-sm font-medium text-ink-900"
          >
            <History className="h-4 w-4" />
            Versions
            <span className="rounded-full bg-white px-1.5 py-0.5 text-[11px] font-semibold text-ink-700">
              2
            </span>
          </button>
          <Link
            href="/preview/carriers/besson/import"
            className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-ink-600 hover:bg-ink-50"
          >
            <Upload className="h-4 w-4" />
            Import
          </Link>
        </div>

        <p className="text-xs text-ink-500">
          Triés par date d&apos;activation · les versions actives s&apos;appliquent automatiquement
        </p>
      </div>

      <div className="space-y-3">
        {versions.map((v) => (
          <VersionRow key={v.id} version={v} />
        ))}
      </div>
    </div>
  );
}

function EmptyTab({ title }: { title: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-ink-200 bg-white px-6 py-16 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-ink-100 text-ink-500">
        <Percent className="h-5 w-5" />
      </div>
      <h3 className="mt-3 text-sm font-semibold text-ink-900">{title}</h3>
      <p className="mt-1 text-sm text-ink-500">
        Cet onglet est conservé tel quel — refonte non incluse dans ce prototype.
      </p>
    </div>
  );
}
