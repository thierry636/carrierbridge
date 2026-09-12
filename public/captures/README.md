# Captures d’écran — remplacement facultatif

Le site n’attend **aucune capture pour fonctionner**. Chaque emplacement affiche
un visuel dessiné en HTML/CSS : lisible à la taille où il s’affiche, sans image à
charger, traduit, et qui ne vieillit pas quand l’interface du produit change.

Ce dossier existe pour le jour où vous voudrez remplacer un de ces visuels par
une vraie capture. Déposez le fichier avec **exactement** le nom attendu et il
prend la place du visuel. Retirez-le, le visuel revient.

| Fichier | Emplacement | Visuel actuel | Taille | Ratio |
|---|---|---|---|---|
| `hero.webp` | Héros | Classement d’une expédition | 1280 × 800 | 16/10 |
| `grille-avant.webp` | Import, « avant » | Deux grilles incompatibles | 1280 × 720 | 16/9 |
| `grille-apres.webp` | Import, « après » | Base commune, mieux-disant surligné | 1280 × 720 | 16/9 |
| `meilleur-prix.webp` | Calculatrice | Décomposition base + surtaxes | 1200 × 900 | 4/3 |
| `ecart-gazole.webp` | Indexation gazole | Écart chiffré en points et en euros | 1200 × 900 | 4/3 |
| `demo-poster.webp` | Vignette vidéo | — (voir plus bas) | 1280 × 720 | 16/9 |

## Avant de remplacer un visuel

Posez-vous la question : **la capture sera-t-elle plus lisible que le visuel ?**
Un écran de 1280 px réduit dans une demi-colonne montre qu’il y a un tableau,
rarement ce qu’il dit. Les visuels sont dessinés à la taille réelle d’affichage,
c’est leur seul avantage — mais il est décisif.

Une capture vaut le coup quand elle montre quelque chose que le visuel ne peut
pas rendre : une vraie densité d’écran, un enchaînement d’interface, une preuve
que le produit existe.

## Si vous remplacez quand même

1. Capturez sur un navigateur en 1440 px de large, sans barre d’onglets ni
   élément personnel visible.
2. Recadrez au ratio indiqué, redimensionnez à la taille exacte.
3. Exportez en WebP, qualité 80 à 85, moins de 200 Ko.
4. Déposez le fichier ici, puis `npm run build`.
5. Relancez Lighthouse : le héros porte l’attribut `priority`, mais une image
   lourde y dégradera le LCP.

**Deux règles absolues :** aucune donnée réelle de client (transporteur
identifiable, prix négocié authentique, raison sociale d’un chargeur), et aucun
visage.

Les textes alternatifs sont déjà écrits et traduits, dans `messages/fr/common.json`
et `messages/en/common.json`, sous la clé `screenshots`. Si une capture s’écarte
de ce que décrit son texte alternatif, corrigez le texte.

## Vidéo de démonstration

Renseignez `NEXT_PUBLIC_DEMO_VIDEO_URL` avec l’adresse YouTube, Vimeo ou Loom.
Rien n’est chargé depuis cet hébergeur tant que le visiteur n’a pas cliqué sur
lecture. Tant que la variable est vide, le bloc final affiche « Dix minutes,
trois gestes » à la place du lecteur.
