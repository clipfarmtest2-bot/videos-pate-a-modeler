# Procédure hebdomadaire — « Le Monde en Pâte » (TikTok)

Compte TikTok « Le Monde en Pâte », vidéos de comparaison en stop motion pâte à modeler, **sans voix**, bruitages seulement, **25 à 40 s**, en français.
Publication **du lundi au vendredi à 18 h (Europe/Paris)** via Metricool (marque blogId `8004703`, réseau `tiktok`).
Cette procédure est suivie chaque samedi par une tâche planifiée, sans personne pour valider : chaque étape de contrôle compte.

## 0. Préparer
- Dépôt : `clipfarmtest2-bot/videos-pate-a-modeler` (cloné dans `/home/claude/videos-pate-a-modeler`).
- Lire `calendrier.json` (publications déjà prévues + sujets déjà traités) et `kit/LISEZMOI.md` (format des fichiers vidéo, scènes disponibles).
- Dans le conteneur : `cd kit && npm install --no-audit --no-fund` si `node_modules` manque. Playwright : essayer `require('playwright')` local, sinon `/opt/npm-tools/node_modules/` (déjà géré par `rendu.mjs`). ffmpeg doit être présent.

## 1. Combien de vidéos
- Créneaux visés : lundi → vendredi de la semaine qui suit, 18 h.
- Retirer les créneaux déjà pris (dans `calendrier.json` et dans Metricool via `getScheduledPosts` sur la semaine).
- **Plafond Metricool gratuit : 20 publications par mois civil.** Compter les entrées de `calendrier.json` du mois de chaque créneau ; ne pas dépasser 20 (laisser le créneau vide).
- S'il n'y a aucun créneau à remplir, s'arrêter et le dire dans le résumé.

## 2. Choisir les sujets
- Prendre d'abord les sujets de `idees_en_reserve` dans `calendrier.json` (idées validées par l'utilisateur, à retirer de la liste une fois faites), puis en inventer dans le même esprit : questions absurdes « combien de… pour… ? », comparaisons, « et si… ».
- Un sujet par créneau, **jamais un sujet déjà présent dans `sujets_traites`**, et pas deux sujets proches dans la même semaine.
- **Règle de l'utilisateur : chaque vidéo innove visuellement.** Jamais les mêmes plans ni la même mécanique que les vidéos précédentes, et des **objets dessinés** (figurines SVG reconnaissables), pas de simples boules de couleur.
  - Pour chaque vidéo, créer une **nouvelle scène** dans `kit/scenes2.js` (voir « Créer une scène » plus bas) : une mécanique qui raconte le sujet. Exemples déjà faits : `zoom` (une loupe repère un objet plus petit, on plonge dedans), `frise` (on remonte le temps d'arrêt en arrêt, animal + repère historique).
  - Pistes de mécaniques pas encore utilisées : empilement d'objets jusqu'à une hauteur, balance qui penche, récipient qui se remplit, tapis roulant, escalier que l'on monte, carte qui se déplie, horloge ou roue qui tourne, tamis qui trie, fusée qui traverse des couches, coupe d'un objet en tranches.
  - `calendrier.json` → `scenes_utilisees` liste les mécaniques déjà publiées, dans l'ordre : ne pas reprendre une des 10 dernières. Y ajouter la nouvelle.
  - Si, après trois séries de corrections, la nouvelle scène n'est toujours pas propre : laisser le créneau vide et le dire dans le résumé (ne pas publier une scène bancale, ne pas retomber sur une ancienne mécanique).
- Compte encore petit : éviter violence, accidents, maladies, drogues, armes ; pas de personnes privées ; personnalités publiques seulement pour des chiffres publics (ex. fortunes Forbes).

## 3. Vérifier les chiffres
- Chaque chiffre affiché doit venir d'une recherche web faite pendant la session (sources fiables : organismes officiels, encyclopédies, Forbes, NASA, NOAA…). Chiffres actuels (prix, salaires, fortunes, records) : toujours la valeur la plus récente.
- Valeur incertaine ou contestée → « ≈ » à l'écran et « estimation » dans la description. Si un chiffre ne peut pas être sourcé, changer d'objet ou de sujet.
- Pas de mots violents à l'écran ni dans les descriptions.

## 3 bis. Créer une scène (`kit/scenes2.js`)
- Une scène = `SCENES.<nom> = { init(), build(L), draw(t, bi, ev) }` ; lire `zoom` et `frise` comme modèles, et `moteur.html` pour les variables communes (`O`, `N`, `T`, `D`, `SONS`, `evObj`, `RB`/`RE` pour la boucle, `E`, `fit`, `jit`, `eio`, `llog`, `mix`).
- `init` : appeler `evObj(i, instant, compteur)` pour chaque objet (nom + chiffre du bas, titres) et pousser les bruitages dans `SONS` (plop, whoosh, zip, compteur, note, pip, pieces, bulles), calés sur les mouvements.
- `draw` : tout doit dépendre de `t` seulement (pas d'état caché). Quand `RB` est vrai, `RE` va de 0 à 1 et doit ramener la scène **exactement** à l'état de `t = 0` (boucle parfaite). À `t = 0`, l'objet principal est déjà à l'écran et bouge (rebond).
- Dessins : SVG simples, gros et lisibles en une seconde, dans un élément de classe `clay` (texture pâte à modeler) ; aucun élément de plus de 6 000 px de côté ; pas de logo, de marque ni de personnage connu ; pas de visage réaliste.
- Zones réservées : titres en haut (y 185 à 400), nom et chiffre en bas (y 1225 à 1450). Ne rien d'important au-dessus de y 150 ni en dessous de y 1500 (interface TikTok).
- Contrôle renforcé pour une scène nouvelle : au moins 20 instants regardés (chaque objet au repos, deux transitions image par image, les 4 dernières images puis l'image 0).

## 4. Écrire les fichiers vidéo
- Un fichier `kit/videos/<id>.json` par vidéo, sur le modèle des exemples (même scène). `id` court, sans accent.
- 7 à 13 objets, du plus petit au plus grand. **Rythme « départ rapide puis posé »** (validé par l'utilisateur ; le moteur accélère tout de 12 %, `dt` est en secondes avant accélération) :
  - les **3 premiers `dt` sont courts** (1,4 à 2,1 ; jusqu'à 2,6 si l'objet a une `note`) : la moitié des spectateurs part avant 3 s, il faut que trois objets soient passés à ce moment-là ;
  - ensuite : `tailles` 2,4 à 2,8 (3,4 à 4,3 pour un objet avec `note` et pour les deux derniers) ; `barres` 3,2 à 4,3 ; `ocean` et `probas` 2,9 à 4,3 ;
  - scène nouvelle : 3 premiers `dt` de 1,4 à 2,0, puis 2,6 à 3,3 (le temps de la transition + une seconde et demie de lecture), 3,8 pour le dernier ;
  - prendre `infiniment-petit.json` et `duree-de-vie.json` comme modèles de minutage.
- Premier titre = accroche **concrète** visible dès la première image (un chiffre, une promesse ou une question qui pique : « TU CROIS QUE LE / SOLEIL EST GROS ? », « LE DERNIER DÉPASSE / 1 MILLIARD DE KM/H »), 2 lignes de longueur proche, 18 caractères max chacune, en MAJUSCULES. Le premier objet doit avoir un `titre`. Puis 2 ou 3 `titre` de relance.
- `fin` : **un seul écran** de chute (question ou rappel du premier objet, `dt` 4,0 à 4,6), `queue` 2,2 à 3,0. **Pas d'écran « Abonne-toi »** : la vidéo se termine par une boucle automatique (la dernière seconde ramène à la première image), un écran de fin la casserait.
- `publication` : `titre` (accroche, ≤ 60 caractères), `description` (contexte + précision sur les sources/estimations + question pour les commentaires, sur une seule ligne), `hashtags` (5 ou 6 dont #comparaison #lesaviezvous #satisfaisant #stopmotion).

## 5. Contrôler avant rendu
- `node rendu.mjs videos/<id>.json --apercu t1,t2,…` (6 à 8 instants : début, chaque titre, fin), puis assembler une planche et **la regarder** (outil Read sur l'image).
- Regarder aussi les instants 0 / 0,1 / 0,5 / 1,5 s : il doit déjà se passer quelque chose à la première image.
- Regarder la boucle : les instants durée−0,6 / durée−0,25 / durée−0,07 puis 0 doivent s'enchaîner (même titre, même décor, premier objet seul à l'écran).
- Vérifier : texte lisible et non coupé, rien de caché, objets visibles (ni minuscules ni hors cadre), pas d'écran vide, chiffres corrects.
- Corriger le JSON (durées, textes plus courts, objets) et recommencer jusqu'à ce que ce soit propre.

## 6. Rendre
- `node rendu.mjs videos/<id>.json` → `kit/out/<id>.mp4` (2 à 6 min par vidéo ; image 15 i/s, encodage unique en haute qualité, ne jamais réencoder le fichier ensuite). Lancer chaque rendu en arrière-plan et attendre sa fin (une commande au premier plan est limitée à 10 min).
- Contrôle final : durée 25 à 40 s (`ffprobe`), débit vidéo d'au moins 5 Mbit/s, niveau sonore autour de −14 LUFS, planche de 10 images tirées de la vidéo finie et regardée.

## 7. Publier
- Copier `kit/out/<id>.mp4` dans `videos/` et `kit/out/<id>-couverture.jpg` dans `couvertures/`, commit + push (une vidéo par push). Lien public : `https://raw.githubusercontent.com/clipfarmtest2-bot/videos-pate-a-modeler/main/videos/<id>.mp4` (vérifier HTTP 200 avec `curl -sI`).
- Metricool `createScheduledPost` : `blogId` 8004703, date `YYYY-MM-DDT18:00:00+01:00` (ou +02:00 en heure d'été), `info` :
  `{"autoPublish": true, "descendants": [], "draft": false, "firstCommentText": "", "hasNotReadNotes": false, "media": ["<lien public>"], "mediaAltText": [], "providers": [{"network": "tiktok"}], "publicationDate": {"dateTime": "YYYY-MM-DDT18:00:00", "timezone": "Europe/Paris"}, "shortener": false, "smartLinkData": {"ids": []}, "text": "<titre> 👀 <description> <hashtags>", "tiktokData": {"title": "<titre>", "disableComment": false, "disableDuet": false, "disableStitch": false, "privacyOption": "PUBLIC_TO_EVERYONE", "commercialContentThirdParty": false, "commercialContentOwnBrand": false, "autoAddMusic": false, "isAigc": false}}`
  (`tiktokData.title` est obligatoire ; pas de saut de ligne dans le texte.)
- Ajouter chaque publication à `calendrier.json` (`publications` + le sujet dans `sujets_traites`), commit + push du kit (`kit/videos/*.json`) et du calendrier.
- Si une vidéo échoue (rendu, contrôle, Metricool) : ne pas la publier, laisser le créneau vide et le signaler.

## 8. Résumé
Terminer par un court message à l'utilisateur : vidéos programmées (jour, titre, lien Metricool `plannerUrl`), créneaux laissés vides et pourquoi, chiffres incertains éventuels. Rappeler qu'il peut supprimer une publication dans Metricool avant 18 h le jour J.
