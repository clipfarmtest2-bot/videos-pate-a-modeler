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
| `zoom` | infiniment-petit.json | du plus gros au plus petit : `d`, `fig` (dessin dans `scenes2.js`), `ancre` (où se trouve l'objet suivant), `aff` |
| `frise` | duree-de-vie.json | `ans`, `fig` (animal), `repere` (dessin historique), `an` (texte de l'année), `legende` |

Les bruitages sont fabriqués automatiquement à partir du minutage.

## Rythme et boucle
- `dt` est en secondes avant accélération : le moteur accélère tout de 12 % (`"vitesse": 1.12` par défaut, modifiable dans le fichier de la vidéo).
- La dernière seconde ramène à la première image (boucle). `"boucle": false` pour la désactiver.
- Extrait : `node rendu.mjs videos/x.json --debut 10 --fin 20 --sortie essai`.

Les scènes à objets dessinés (`zoom`, `frise`) et leurs figurines sont dans `scenes2.js`. Chaque nouvelle vidéo doit avoir sa propre mécanique : ajouter une scène dans ce fichier.
