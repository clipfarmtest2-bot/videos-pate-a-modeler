# Procédure hebdomadaire — « Le Monde en Pâte » (TikTok)

Compte TikTok « Le Monde en Pâte », vidéos de comparaison en stop motion pâte à modeler, **sans voix**, bruitages seulement, **18 à 30 s**, en français.
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
- Un sujet par créneau, **jamais un sujet déjà présent dans `sujets_traites`**, et pas deux sujets proches dans la même semaine.
- Varier les scènes dans la semaine (pas deux fois la même scène à la suite).
- Uniquement les scènes et apparences existantes du kit (voir `kit/LISEZMOI.md`). Ne pas créer de nouvelle scène sans humain.
- Idées compatibles (non exhaustif) :
  - `tailles` (boules de couleur) : animaux du plus petit au plus grand, lunes du système solaire, volcans, astéroïdes, cratères.
  - `barres` horizontal : vitesses des animaux, durées de vie des animaux, temps de chargement historiques, longueur des fleuves, distances (Paris → Lune → Mars…), poids.
  - `barres` vertical (piles de pièces, uniquement pour de l'argent) : salaires des métiers, prix des transferts de foot, coût de monuments, budget de films, fortune des pays.
  - `ocean` (figurines fixes : bateau, plongeur, manchot, meduse, baleine, epave, poisson, bathyscaphe) : variantes de profondeur uniquement (animaux plongeurs, épaves célèbres…).
  - `probas` : chances de jumeaux, d'un trou en un au golf, d'une main au poker, d'un anniversaire commun, de trouver une perle dans une huître…
- Compte encore petit : éviter violence, accidents, maladies, drogues, armes ; pas de personnes privées ; personnalités publiques seulement pour des chiffres publics (ex. fortunes Forbes).

## 3. Vérifier les chiffres
- Chaque chiffre affiché doit venir d'une recherche web faite pendant la session (sources fiables : organismes officiels, encyclopédies, Forbes, NASA, NOAA…). Chiffres actuels (prix, salaires, fortunes, records) : toujours la valeur la plus récente.
- Valeur incertaine ou contestée → « ≈ » à l'écran et « estimation » dans la description. Si un chiffre ne peut pas être sourcé, changer d'objet ou de sujet.
- Pas de mots violents à l'écran ni dans les descriptions.

## 4. Écrire les fichiers vidéo
- Un fichier `kit/videos/<id>.json` par vidéo, sur le modèle des exemples (même scène). `id` court, sans accent.
- 7 à 13 objets, du plus petit au plus grand. **Rythme rapide** (le moteur accélère déjà tout de 1,2× : `dt` est en secondes « logiques ») :
  - premier `dt` court (1,4 à 1,7) pour qu'un deuxième objet arrive dans la première seconde et demie ;
  - `tailles` : `dt` 1,4 à 1,8, jusqu'à 2,4-2,8 pour les deux derniers et pour un objet avec `note` (2,2 à 2,6) ;
  - `barres` : `dt` 2,1 à 2,8 ; `ocean` et `probas` : `dt` 1,9 à 2,8 ;
  - `fin` : 3,0 pour un écran avec `point`, 2,4 à 3,2 pour le dernier ; `queue` 1,4.
- Premier titre = accroche **concrète** visible dès la première image (un chiffre, une promesse ou une question qui pique : « TU CROIS QUE LE / SOLEIL EST GROS ? », « LE DERNIER DÉPASSE / 1 MILLIARD DE KM/H »), 2 lignes de longueur proche, 18 caractères max chacune, en MAJUSCULES. Puis 2 ou 3 `titre` de relance.
- `fin` : un écran de chute ou une question, puis « ABONNE-TOI / POUR LA SUITE ».
- `publication` : `titre` (accroche, ≤ 60 caractères), `description` (contexte + précision sur les sources/estimations + question pour les commentaires, sur une seule ligne), `hashtags` (5 ou 6 dont #comparaison #lesaviezvous #satisfaisant #stopmotion).

## 5. Contrôler avant rendu
- `node rendu.mjs videos/<id>.json --apercu t1,t2,…` (6 à 8 instants : début, chaque titre, fin), puis assembler une planche et **la regarder** (outil Read sur l'image).
- Regarder aussi les instants 0 / 0,1 / 0,5 / 1,5 s : il doit déjà se passer quelque chose à la première image.
- Vérifier : texte lisible et non coupé, rien de caché, objets visibles (ni minuscules ni hors cadre), pas d'écran vide, chiffres corrects.
- Corriger le JSON (durées, textes plus courts, objets) et recommencer jusqu'à ce que ce soit propre.

## 6. Rendre
- `node rendu.mjs videos/<id>.json` → `kit/out/<id>.mp4` (environ 5 min par vidéo ; image 15 i/s, encodage unique en haute qualité, ne jamais réencoder le fichier ensuite). Lancer chaque rendu en arrière-plan et attendre sa fin (une commande au premier plan est limitée à 10 min).
- Contrôle final : durée 18 à 30 s (`ffprobe`), débit vidéo d'au moins 6 Mbit/s, niveau sonore autour de −14 LUFS, planche de 10 images tirées de la vidéo finie et regardée.

## 7. Publier
- Copier `kit/out/<id>.mp4` dans `videos/` et `kit/out/<id>-couverture.jpg` dans `couvertures/`, commit + push (une vidéo par push). Lien public : `https://raw.githubusercontent.com/clipfarmtest2-bot/videos-pate-a-modeler/main/videos/<id>.mp4` (vérifier HTTP 200 avec `curl -sI`).
- Metricool `createScheduledPost` : `blogId` 8004703, date `YYYY-MM-DDT18:00:00+01:00` (ou +02:00 en heure d'été), `info` :
  `{"autoPublish": true, "descendants": [], "draft": false, "firstCommentText": "", "hasNotReadNotes": false, "media": ["<lien public>"], "mediaAltText": [], "providers": [{"network": "tiktok"}], "publicationDate": {"dateTime": "YYYY-MM-DDT18:00:00", "timezone": "Europe/Paris"}, "shortener": false, "smartLinkData": {"ids": []}, "text": "<titre> 👀 <description> <hashtags>", "tiktokData": {"title": "<titre>", "disableComment": false, "disableDuet": false, "disableStitch": false, "privacyOption": "PUBLIC_TO_EVERYONE", "commercialContentThirdParty": false, "commercialContentOwnBrand": false, "autoAddMusic": false, "isAigc": false}}`
  (`tiktokData.title` est obligatoire ; pas de saut de ligne dans le texte.)
- Ajouter chaque publication à `calendrier.json` (`publications` + le sujet dans `sujets_traites`), commit + push du kit (`kit/videos/*.json`) et du calendrier.
- Si une vidéo échoue (rendu, contrôle, Metricool) : ne pas la publier, laisser le créneau vide et le signaler.

## 8. Résumé
Terminer par un court message à l'utilisateur : vidéos programmées (jour, titre, lien Metricool `plannerUrl`), créneaux laissés vides et pourquoi, chiffres incertains éventuels. Rappeler qu'il peut supprimer une publication dans Metricool avant 18 h le jour J.
