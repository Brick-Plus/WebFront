# Structure et conventions du dossier d'icônes

## Conventions

- Nommage des fichiers : kebab-case (minuscules, mots séparés par `-`).
- Les dossiers sont thématiques pour faciliter la découverte et la réutilisation.

## Structure
- `actions/` — icônes d'actions (send, download, plus, etc.)
- `navigation/` — flèches, chevrons, menu, back, search
- `user/` — icônes liées à l'utilisateur (profile, logout)
- `commerce/` — shopping-bag, shopping-cart, package, add-to-cart
- `communication/` — icônes de messagerie (message-*, email, send)
- `media/` — camera, eye
- `status/` — étoiles, favoris, indicateurs d'état
- `misc/` — autres icônes spécifiques au projet (van, settings, etc.)
- Les favicons restent à la racine `public/icons` (icon-32x32.png, ...)

## Utilisation
- Préférez utiliser `public/icons/manifest.json` pour résoudre un nom logique vers un chemin de fichier.
- Lorsqu'une icône est renommée ou ajoutée, mettez à jour `manifest.json` en conséquence.

## Optimisation
- Optimisez les SVG avec SVGO avant la mise en production pour réduire la taille des fichiers.
