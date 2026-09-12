# Captures d’écran du produit

Déposez les fichiers ici, avec **exactement** ces noms. Aucune modification de
code n’est nécessaire : tant qu’un fichier est absent, un bloc pointillé
s’affiche à sa place en indiquant le nom attendu. Dès qu’il est présent, la
capture apparaît.

| Fichier | Où il apparaît | Taille à exporter | Ratio |
|---|---|---|---|
| `hero.webp` | Héros de la page d’accueil | 1280 × 800 | 16/10 |
| `grille-avant.webp` | Bloc import, visuel « avant » | 1280 × 720 | 16/9 |
| `grille-apres.webp` | Bloc import, visuel « après » | 1280 × 720 | 16/9 |
| `meilleur-prix.webp` | Bloc calculatrice meilleur prix | 1200 × 900 | 4/3 |
| `ecart-gazole.webp` | Bloc contrôle de l’indexation gazole | 1200 × 900 | 4/3 |
| `demo-poster.webp` | Vignette de la vidéo de démonstration | 1280 × 720 | 16/9 |

## Comment produire les fichiers

1. Capturez l’écran du produit, de préférence sur un navigateur en 1440 px de
   large, sans barre d’onglets ni élément personnel visible.
2. Recadrez au ratio indiqué, puis redimensionnez à la taille exacte.
3. Exportez en WebP, qualité 80 à 85. Visez moins de 200 Ko par fichier.
4. Déposez le fichier ici et reconstruisez (`npm run build`).

## Deux règles

- **Aucune donnée réelle de client** : ni nom de transporteur identifiable, ni
  prix négocié authentique, ni raison sociale d’un chargeur. Utilisez un jeu de
  démonstration.
- **Aucun visage, aucune personne physique.** C’est une contrainte du site.

## Textes alternatifs

Ils sont déjà rédigés et traduits, dans `messages/fr/common.json` et
`messages/en/common.json`, sous la clé `screenshots`. Si le contenu d’une
capture s’écarte de ce que décrit son texte alternatif, corrigez le texte —
pas l’inverse.

## Vidéo de démonstration

La vidéo n’est pas hébergée ici : trois minutes de MP4 sur le serveur applicatif
coûtent cher et ralentissent la page. Renseignez `NEXT_PUBLIC_DEMO_VIDEO_URL`
avec l’adresse YouTube, Vimeo ou Loom de la vidéo. Rien n’est chargé depuis cet
hébergeur tant que le visiteur n’a pas cliqué sur lecture, et `demo-poster.webp`
sert de vignette.
