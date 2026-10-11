# Vidéo de présentation (page d'accueil)

La section vidéo n'apparaît **que si** le fichier `campus-food.mp4` est présent dans ce dossier : aucun faux lecteur
n'est affiché tant que la vidéo n'existe pas.

| Fichier | Statut | Détails |
|---|---|---|
| `campus-food.mp4` | obligatoire | H.264 + AAC, 15 à 30 s, format 16:9, idéalement < 8 Mo (lecture mobile) |
| `campus-food.webm` | facultatif | version plus légère pour les navigateurs compatibles |
| `poster.jpg` | recommandé | miniature affichée avant la lecture (1280×720) |
| `sous-titres-fr.vtt` | recommandé | sous-titres / messages courts à l'écran (WebVTT, français) |
| `meta.json` | facultatif | `{ "title": "…", "disclosure": "Vidéo animée générée par IA", "durationSeconds": 20 }` |

**Transparence** : si la vidéo est animée ou générée par IA, renseignez `disclosure` (la mention s'affiche sous le
lecteur). Ne présentez pas une vidéo générée comme un tournage réel et n'utilisez pas de personnes identifiables sans
leur autorisation.

Scénario conseillé (simple, rapide, pratique) : des étudiants choisissent un plat sur leur téléphone → commande →
le restaurant reçoit et prépare → le livreur récupère → remise à l'étudiant.

Après avoir déposé les fichiers : `npm run build` (la présence de la vidéo est détectée à la construction), puis
redéployer. Ne renommez pas les fichiers (l'hébergement Linux distingue majuscules et minuscules).
