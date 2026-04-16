# Carrier Bridge — Site marketing

Site web officiel de **Carrier Bridge**, la plateforme SaaS d'agent IA de sourcing transport routier en Europe.

> Conçu pour les directions Achats Transport et Supply Chain. **Le site ne s'adresse pas aux transporteurs.**

## ⚙️ Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (design tokens via `@theme` dans `globals.css`)
- **next-intl** pour l'internationalisation FR / EN
- **React Hook Form** + **Zod** pour les formulaires
- **Resend** pour l'envoi des emails de contact
- **Lucide React** pour les icônes
- **Framer Motion** disponible pour les animations à venir

## 🚀 Démarrage

### 1. Installation

```bash
npm install
```

### 2. Variables d'environnement

Copiez `.env.example` vers `.env.local` puis renseignez :

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | Clé API Resend (https://resend.com). Si absente, le formulaire renvoie OK sans envoyer d'email (utile en dev). |
| `CONTACT_FROM_EMAIL` | Adresse expéditeur, ex. `Carrier Bridge <hello@carrierbridge.com>`. Doit appartenir à un domaine validé sur Resend. |
| `CONTACT_TO_EMAIL` | Boîte qui reçoit les demandes de contact. |
| `NEXT_PUBLIC_SITE_URL` | URL canonique pour les métadonnées SEO et le sitemap. |

### 3. Développement

```bash
npm run dev
```

Le site est servi sur http://localhost:3000.
- `/` → version française (locale par défaut)
- `/en` → version anglaise

### 4. Build production

```bash
npm run build
npm run start
```

### 5. Vérifications

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # eslint
```

## 🌍 Internationalisation

- Locales : `fr` (par défaut, sans préfixe d'URL) et `en` (`/en`).
- Routing géré par **next-intl** (`src/i18n/routing.ts`) + middleware (`src/middleware.ts`).
- Tous les textes sont dans `messages/fr.json` et `messages/en.json`.
- Pour ajouter une langue : ajouter le code dans `routing.locales` et créer le fichier `messages/<lang>.json` correspondant.

## 📂 Structure du projet

```
carrierbridge/
├── messages/
│   ├── fr.json                  # Contenu français
│   └── en.json                  # Contenu anglais
├── public/
│   ├── logo.svg
│   └── favicon.svg
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout (pass-through)
│   │   ├── globals.css          # Tailwind v4 + design tokens
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   ├── not-found.tsx
│   │   ├── api/
│   │   │   └── contact/route.ts # Envoi email via Resend
│   │   └── [locale]/
│   │       ├── layout.tsx       # html/body + i18n provider + JSON-LD
│   │       ├── page.tsx         # Landing page
│   │       └── not-found.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Logo.tsx
│   │   │   └── LanguageSwitcher.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── TrustBar.tsx
│   │   │   ├── Problem.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── AIAgent.tsx
│   │   │   ├── UseCases.tsx
│   │   │   ├── FAQ.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── SectionHeader.tsx
│   │   └── ui/
│   │       ├── button.tsx
│   │       └── container.tsx
│   ├── i18n/
│   │   ├── routing.ts
│   │   └── request.ts
│   ├── lib/
│   │   ├── utils.ts             # cn() helper
│   │   └── contactSchema.ts     # Zod schema partagé client / serveur
│   └── middleware.ts            # next-intl middleware
├── next.config.ts
├── tailwind.config (v4 = pas de fichier, tokens dans globals.css)
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

## ✏️ Édition du contenu

Tout le contenu textuel vit dans **`messages/fr.json`** et **`messages/en.json`**. Pas besoin de toucher au code pour modifier :

- Titres et sous-titres de chaque section
- Liste des fonctionnalités, cas d'usage, FAQ
- Wording du formulaire et des messages de succès / erreur
- Badge hero, CTA, bullets de l'agent IA, etc.

Les éléments visuels (logos clients, témoignages chiffrés) sont volontairement **absents** pour éviter d'inventer des données. Ils sont à ajouter ultérieurement comme composants dédiés.

## 🎨 Design system

Tout est dans **`src/app/globals.css`** sous `@theme` :

- `--color-brand-*` : bleu primaire (CTA, liens, accents)
- `--color-accent-*` : cyan / turquoise (gradients, highlights)
- `--color-ink-*` : anthracite (textes, fonds)

Les tokens sont consommables directement comme classes Tailwind (`bg-brand-600`, `text-ink-900`, etc.).

## 🔐 Formulaire de contact

- Validation côté client **et** serveur via le même schéma Zod (`src/lib/contactSchema.ts`).
- Honeypot anti-spam : champ `website` masqué.
- L'API route `POST /api/contact` envoie un email HTML + texte via Resend, avec `replyTo` sur l'email du prospect.
- En l'absence de `RESEND_API_KEY`, l'API répond `{ ok: true, skipped: true }` et logge le payload — pratique en dev local.

## 🚢 Déploiement

Recommandé : **Vercel** (zéro config).

1. Push sur la branche → import dans Vercel
2. Renseigner les variables d'environnement (cf. ci-dessus)
3. Déployer

Pour Resend, valider votre domaine d'envoi (`carrierbridge.com`) avant la mise en production.

## 📜 Licence

Propriétaire — Carrier Bridge.
