# CarrierBridge — site vitrine

Site officiel de **CarrierBridge**, le logiciel de gestion des tarifs transport
destiné aux chargeurs.

> Phrase de définition canonique, à reprendre à l’identique sur le site, LinkedIn
> et les annuaires logiciels :
>
> CarrierBridge est un logiciel français de gestion des tarifs transport pour les
> chargeurs : import et normalisation des grilles transporteurs, désignation du
> meilleur prix par expédition, et contrôle de l’indexation gazole et des surtaxes.

Le site s’adresse **exclusivement aux chargeurs**, jamais aux transporteurs, et ne
fait apparaître aucune personne physique.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript strict · Tailwind CSS v4
(tokens `@theme`) · next-intl (FR par défaut, EN sous `/en`) · Zod · Resend.

## Démarrage

```bash
npm install
cp .env.example .env.local   # puis renseigner les variables
npm run dev                  # http://localhost:3000
```

| Variable | Rôle |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL canonique. Alimente canonical, hreflang, sitemap et robots. |
| `NEXT_PUBLIC_APP_URL` | Destination des CTA d’inscription (`app.carrier-bridge.com`). |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Domaine Plausible. Vide = aucun analytics chargé. |
| `RESEND_API_KEY` | Envoi du formulaire de contact. Absente, la route accepte et journalise. |
| `CONTACT_FROM_EMAIL` / `CONTACT_TO_EMAIL` | Expéditeur et destinataire des demandes. |

```bash
npm run typecheck   # tsc --noEmit
npm run lint
npm run build && npm run start
```

### Contrôle Lighthouse

Lighthouse n’est pas une dépendance du projet ; on l’exécute à la demande sur un
build de production. Chromium est déjà présent dans l’environnement de CI.

```bash
npm run build && npm run start &
npx lighthouse http://localhost:3000/ \
  --chrome-flags="--headless=new --no-sandbox" \
  --only-categories=performance,accessibility,best-practices,seo --view
```

Dernier relevé (`/`, `/tarifs`, `/outils/indexation-gazole`, `/en`, `/contact`) :
performance 97-98, accessibilité 100, bonnes pratiques 100, SEO 100.

L’audit `canonical` échoue si l’on teste en local sans avoir construit avec
`NEXT_PUBLIC_SITE_URL` pointant sur l’origine testée : la balise est figée au
build. Ce n’est pas un défaut du site.

## Organisation

```
src/app/[locale]/        une page par route (slugs traduits via next-intl)
src/components/
  layout/   Header · Footer · CookieBanner · Analytics · Logo · LanguageSwitcher
  sections/ les 13 blocs de la home, dans l’ordre imposé
  pricing/  PricingPlans (paliers, matrice, connecteurs) · RoiEstimates · TenderPricing
  tools/    FuelIndexCalculator
  legal/    LegalPage · CookiePreferences
  i18n/     ClientMessages — n’envoie au client que les namespaces utiles
src/lib/
  site.ts       domaine, e-mail de contact, URL de l’app — source unique
  pricing.ts    paliers, prix et matrice de fonctionnalités — source unique
  fuel.ts       calcul d’indexation gazole, pur et testable
  seo.ts        canonical, hreflang, JSON-LD SoftwareApplication et FAQPage
  analytics.ts  événements Plausible et gestion du consentement
messages/{fr,en}/  copie découpée par domaine, parité de clés vérifiable
```

### Deux règles à ne pas contourner

1. **Les prix ne se saisissent qu’une fois**, dans `src/lib/pricing.ts`. La home,
   la page tarifs et les `offers` schema.org en dérivent.
2. **Le domaine ne se réécrit qu’une fois**, dans `src/lib/site.ts`. Le site est
   canonique sur `carrier-bridge.com` ; `carrierbridge.com` et les variantes `www`
   partent en 301 (voir `next.config.ts`).

## Routes

| FR | EN |
|---|---|
| `/` | `/en` |
| `/tarifs` | `/en/pricing` |
| `/outils/indexation-gazole` | `/en/tools/fuel-index` |
| `/blog` | `/en/blog` |
| `/contact` | `/en/contact` |
| `/mentions-legales` | `/en/legal-notice` |
| `/cgu` | `/en/terms` |
| `/confidentialite` | `/en/privacy` |
| `/cookies` | `/en/cookies` |

## Mesure

Plausible n’est injecté qu’après consentement explicite, bien qu’il soit sans
cookie. Événements suivis : `signup_click`, `grid_import`,
`fuel_calculator_used`, `pricing_tier_click`, `contact_request`.

À brancher manuellement après mise en ligne : Google Search Console et Bing
Webmaster Tools (vérification par enregistrement DNS, pour éviter d’ajouter une
balise de vérification au code).

## Ce qui reste à fournir

Rien de tout cela n’a été inventé — les emplacements sont visibles sur le site.

- **Mentions légales** — les marqueurs `[[RAISON_SOCIALE]]`, `[[SIREN]]`,
  `[[HEBERGEUR_NOM]]`, `[[DIRECTEUR_PUBLICATION]]` … dans `messages/{fr,en}/legal.json`.
  Faire relire les CGU et la politique de confidentialité par un juriste.
- **Captures d’écran du produit** en WebP, avec `alt` rédigés, à la place des
  blocs `ScreenshotPlaceholder`.
- **Vidéo de démonstration** (3 min), ciblée par le CTA secondaire du héros.
- **Chiffre de résultat client** vérifiable.
- **Source des indices gazole** et ses conditions de réutilisation commerciale
  (`tools.fuel.source.placeholder`).
