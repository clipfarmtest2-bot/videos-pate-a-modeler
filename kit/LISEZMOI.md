# Vidéos « pâte à modeler » (stop motion simulé, sans voix)

## Installation (une seule fois)
    npm install
    npx playwright install chromium
ffmpeg doit être installé (déjà le cas si Dossiers Noirs tourne sur ce Mac).

## Rendu
    node rendu.mjs videos/tailles-etoiles.json
(depuis le dossier `kit/`)
Résultat dans `out/` : la vidéo 1080×1920, la couverture et le texte de publication.
Aperçu rapide sans rendu : `node rendu.mjs videos/tailles-etoiles.json --apercu 0.5,12,35`

## Nouvelle vidéo = un nouveau fichier dans `videos/`
Copier le fichier d'exemple de la scène voulue et changer la liste `objets` (du plus petit au plus gros),
les `titre` (2 lignes en haut), les `note`, la `fin` et la `publication`. `dt` = secondes après l'objet précédent.

| `scene` | Exemple | Champs propres à chaque objet |
|---|---|---|
| `tailles` | tailles-etoiles.json, espace-2.json | `d` (km) ou `x` (fois `soleil`), `couleur` ou `look` (lune, mars, terre, neptune, jupiter, systeme, trounoir, galaxie, amas, univers), `aff` (texte du chiffre) |
| `barres` + `sens: "h"` | vitesse.json | `val`, `couleur` ; unité commune dans `unite` |
| `barres` + `sens: "v"` | argent.json | `val` (piles de pièces) |
| `ocean` | ocean.json | `prof` (m), `fig` (bateau, plongeur, manchot, meduse, baleine, epave, poisson, bathyscaphe) |
| `probas` | probas.json | `n` (une chance sur n), `env: true` pour « ≈ » |

Les bruitages sont fabriqués automatiquement à partir du minutage.
