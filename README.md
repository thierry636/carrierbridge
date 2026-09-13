# CarrierBridge — site vitrine

Site officiel de **CarrierBridge**, le logiciel de gestion des tarifs transport
destiné aux chargeurs.

> Phrase de définition canonique, à reprendre à l’identique sur le site, LinkedIn
> et les annuaires logiciels :
>
> CarrierBridge est un logiciel français de gestion des tarifs transport pour les
> chargeurs : il intègre les grilles Excel de chaque transporteur dans leur logique
> propre, désigne le meilleur prix pour chaque expédition et contrôle l’indexation
> gazole et les surtaxes.

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

### Contrôle du responsive

```bash
npm run build && npm run start &
npm run check:responsive
```

Vérifie sur huit pages, en 390 / 820 / 1440 px, qu’aucune ne défile
horizontalement et qu’aucun élément ne dépasse. Le test réel est de tenter le
défilement et de lire `scrollX` : `scrollWidth` compte le contenu des conteneurs
à défilement interne, donc un tableau dans son propre `overflow-x` y apparaît à
tort comme un débordement.

### Contrôle Lighthouse

Lighthouse n’est pas une dépendance du projet ; on l’exécute à la demande sur un
build de production. Chromium est déjà présent dans l’environnement de CI.

```bash
npm run build && npm run start &
npx lighthouse http://localhost:3000/ \
  --chrome-flags="--headless=new --no-sandbox" \
  --only-categories=performance,accessibility,best-practices,seo --view
```

Dernier relevé (`/`, `/tarifs`, `/outils/indexation-energie`, `/en`, `/contact`) :
performance 97-99, accessibilité 100, bonnes pratiques 100, SEO 100.

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
  visuals/  les six visuels dessinés des blocs produit
  i18n/     ClientMessages — n’envoie au client que les namespaces utiles
src/lib/
  site.ts       domaine, e-mail de contact, URL de l’app — source unique
  media.ts      emplacements de captures facultatives et URL de la vidéo
  pricing.ts    paliers, prix et matrice de fonctionnalités — source unique
  fuel.ts       calcul d’indexation gazole, pur et testable
  seo.ts        canonical, hreflang, JSON-LD SoftwareApplication et FAQPage
  analytics.ts  événements Plausible et gestion du consentement
messages/{fr,en}/  copie découpée par domaine, parité de clés vérifiable
```

### Quatre règles à ne pas contourner

1. **Les prix ne se saisissent qu’une fois**, dans `src/lib/pricing.ts`. La home,
   la page tarifs et les `offers` schema.org en dérivent.
2. **Le domaine ne se réécrit qu’une fois**, dans `src/lib/site.ts`. Le site est
   canonique sur `carrier-bridge.com`. La redirection de `carrierbridge.com`
   écrite dans `next.config.ts` **ne s’applique que si ce domaine est rattaché au
   projet Netlify**. Il pointe aujourd’hui ailleurs, donc la règle est inerte.

### Déploiement

Le site est déployé sur **Netlify** depuis `main` (projet `carrierbridge`,
domaine `carrier-bridge.com`). Netlify applique les `redirects` et `headers`
de `next.config.ts` — vérifié en production sur les en-têtes de sécurité.
`www.carrier-bridge.com` est redirigé nativement par Netlify.
3. **Le vocabulaire du site dit « énergie », pas « gazole ».** Le gazole reste
   nommé là où il désigne une énergie précise : l’option du calculateur, les
   indices du CNR, le libellé qu’un transporteur a tapé dans son propre fichier.
   Partout ailleurs — titres, navigation, URL — c’est « indexation énergie ».
4. **Le produit intègre du Excel, et rien d’autre à ce jour.** Ne réintroduisez pas
   « PDF », « scan » ou « e-mail » dans la copie des formats acceptés tant que ce
   n’est pas vrai. Et il n’aligne pas les grilles sur une base commune : chacune
   est conservée dans sa structure d’origine, la conversion se fait à la cotation.
   Toute formulation en « normalisation » ou « base commune » est à proscrire.

## Routes

| FR | EN |
|---|---|
| `/` | `/en` |
| `/tarifs` | `/en/pricing` |
| `/outils/indexation-energie` | `/en/tools/energy-index` |
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
- **Vidéo de démonstration** (3 min) — renseigner `NEXT_PUBLIC_DEMO_VIDEO_URL`.
  Elle ne se charge qu’au clic du visiteur, donc aucun appel à l’hébergeur vidéo
  avant action explicite.

Les captures d’écran ne sont **pas** attendues : chaque emplacement affiche un
visuel dessiné en HTML/CSS, lisible à sa taille d’affichage et sans jeu de
données de démonstration à fabriquer. Une capture déposée dans `public/captures/`
prend la place du visuel correspondant — voir `public/captures/README.md`.
- **Chiffre de résultat client** vérifiable.

