# Campus Food — site web officiel

Site public de Campus Food : page d'accueil et lancement officiel (23 octobre 2026), catalogue de plats, partenaires,
téléchargement de l'application, demandes de partenariat (restaurants, livreurs, institutions) enregistrées dans Supabase.

- **Framework** : Next.js 15.5.27 (App Router), React 19, Tailwind CSS 3.4, TypeScript
- **Hébergement compatible** : **Node.js** (le site contient des routes serveur : `/api/partenaires`, `/api/heure` et un
  rendu régénéré toutes les 30 min). Un hébergement statique seul ne suffit pas.
- **Gestionnaire de paquets** : npm (`package-lock.json` versionné)
- **Node.js** : ≥ 18.18 (recommandé : 20 ou 22 LTS)

## Démarrage local

```bash
npm ci
cp .env.example .env.local   # puis renseigner SUPABASE_URL et SUPABASE_PUBLISHABLE_KEY
npm run dev                  # http://localhost:3000
```

## Commandes

| Action | Commande |
|---|---|
| Installation | `npm ci` |
| Build de production | `npm run build` |
| Démarrage de production | `npm start` (lit la variable `PORT` fournie par l'hébergeur) |
| Contrôle du code | `npm run lint` et `npx tsc --noEmit` |
| Tests (compte à rebours, passerelle « Commander ») | `npm test` (Node ≥ 22.6) |

## Variables d'environnement

Modèle : `.env.example`. Les variables `NEXT_PUBLIC_*` sont **intégrées au build** : les définir avant `npm run build` et
reconstruire après toute modification. Aucune valeur secrète n'est versionnée ; seule la clé **publique** (publishable)
de Supabase est utilisée, jamais la clé `service_role`.

| Variable | Obligatoire | Rôle | Public / secret |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | oui (build) | `https://campusfood.app` : liens canoniques, sitemap, QR code | public |
| `SUPABASE_URL` | oui (exécution) | URL du projet Supabase (catalogue, formulaires) | public |
| `SUPABASE_PUBLISHABLE_KEY` | oui (exécution) | clé publique `sb_publishable_…` (Supabase → Project Settings → API Keys) | publique (jamais `service_role`) |
| `NEXT_PUBLIC_SUPABASE_URL` | non | utilisée par la page `/pay` (valeur par défaut = projet de production) | public |
| `NEXT_PUBLIC_ANDROID_PLAY_URL` | non | adresse officielle de la fiche Google Play (sinon « Bientôt disponible ») | public |
| `NEXT_PUBLIC_IOS_APP_STORE_URL` | non | adresse officielle de la fiche App Store | public |
| `NEXT_PUBLIC_ANDROID_APK_URL` | non | installation directe Android (APK) | public |
| `NEXT_PUBLIC_CONTACT_EMAIL_READY` | non | `true` uniquement quand `contact@campusfood.app` existe | public |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | non | numéro professionnel, chiffres seuls, avec indicatif | public |
| `NEXT_PUBLIC_SOCIAL_FACEBOOK` / `INSTAGRAM` / `TIKTOK` / `X` / `LINKEDIN` / `YOUTUBE` | non | adresses https officielles | public |

## Déploiement sur Hostinger (application web Node.js, depuis GitHub)

1. hPanel → **Sites web → Créer un site web → Application web Node.js → Importer un dépôt Git → GitHub**.
2. Dépôt : **`ibrahimkasende-crypto/campus-food-website`** — branche : **`main`** — dossier racine : la racine du dépôt.
3. Framework : Next.js. Version de Node : 20 ou 22.
4. Commande d'installation : `npm ci` — commande de build : `npm run build` — dossier de sortie : `.next` —
   commande de démarrage : `npm start`.
5. Saisir les variables d'environnement ci-dessus **avant** le premier build.
6. Lancer le déploiement. Les pushes suivants sur `main` redéploient automatiquement.
7. **Domaine** : connecter `campusfood.app` (et `www.campusfood.app`) à l'application ; si le domaine est chez un autre
   fournisseur, remplacer ses serveurs de noms par ceux indiqués par Hostinger (ou créer les enregistrements A/CNAME
   demandés), puis activer le SSL gratuit.

### Vérifications après publication

- `/` : compte à rebours dans l'en-tête, vidéo du hero, section « Les saveurs de chez nous », fondateurs, formulaire
  « Rejoindre Campus Food » ; aucune pastille Next.js.
- `/commander`, `/a-propos`, `/telechargement`, `/faq`, `/contact`, `/confidentialite`, `/conditions`, `/mentions-legales`.
- `/icon.png`, `/apple-icon.png`, `/favicon.ico`, `/manifest.webmanifest`, `/sitemap.xml`, `/robots.txt`.
- Les photos des fondateurs utilisent des chemins **sensibles à la casse** sous Linux : `/Fondateurs/…` (ne pas renommer).
- Formulaire : envoyer une demande de test puis la supprimer côté Supabase.

## Fonctionnement et configuration

- **Compte à rebours** : `src/lib/countdown.ts` (cible 23/10/2026 09:00, disparition 24/10/2026 00:00, fuseau Kinshasa
  UTC+1) ; horloge alignée sur `/api/heure`.
- **Catalogue** : lecture publique de Supabase, avec instantané de secours `src/data/catalogue-snapshot.json`
  (régénérer : `node scripts/refresh-catalogue-snapshot.mjs`). Les photos affichées sont limitées à une liste vérifiée
  (`src/lib/catalog.ts`).
- **Équipe et textes** : `src/lib/team.ts`. **Contacts et réseaux** : variables d'environnement.
- **Demandes de partenariat** : `POST /api/partenaires` → table Supabase `partner_requests` (insertion seule pour le public,
  RLS ; lecture par le personnel autorisé depuis le Desktop Campus Food). Les migrations SQL sont dans le dépôt de la
  plateforme Campus Food, pas dans celui-ci.
- **Passerelle application** : `/commander` (Android → ouverture de l'application `cd.campusfood.app` avec repli ;
  iPhone → App Store si configuré ; ordinateur → QR code).
- **Vidéo du hero** : `public/video/` (crédits dans `public/video/CREDITS.md` ; remplacer les fichiers
  `hero-etudiants-960.mp4`, `hero-etudiants-640.mp4` et `hero-etudiants-poster.jpg` pour changer la vidéo).

## Licence et crédits

Vidéo du hero : Yan Krukau / Pexels (licence Pexels). Les marques et logos des partenaires appartiennent à leurs
propriétaires. Campus Food est le premier produit développé dans l'écosystème de New System Corporation.
