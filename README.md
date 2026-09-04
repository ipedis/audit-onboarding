# Audit Onboarding

Support interne d’onboarding à l’audit d’accessibilité numérique, construit autour de **City Stars**, un club de basket fictif. Le dépôt permet de parcourir et d’analyser des situations proches de celles rencontrées pendant un audit RGAA.

## Public et usage

Ce support s’adresse aux personnes qui découvrent ou consolident la pratique de l’audit. Il est destiné à être utilisé dans le cadre des exercices et des consignes transmis par l’équipe, et non comme modèle de site prêt pour la production. Les anomalies présentes font partie du parcours pédagogique.

Les documents sont séparés selon leur public :

- `docs/exercices/` contient les 13 fiches neutres à remettre aux participants;
- `docs/formateur/` contient le corrigé détaillé, la matrice de constats et la traçabilité interne. Ces documents ne doivent pas être distribués avec les exercices.

Le site exécuté depuis les sources Vite constitue la vérité de fonctionnement. Le corrigé Markdown sous `docs/formateur/` est la source maintenue pour l’intention pédagogique; l’ancien DOCX n’est plus utilisé.

## Prérequis

- Node.js 24 LTS;
- npm 11 ou version compatible avec Node.js 24.

La version Node attendue est aussi indiquée dans `.nvmrc`.

## Installation et commandes

Installer les versions verrouillées dans `package-lock.json` :

```sh
npm ci
```

Les commandes publiques sont :

```sh
npm run dev
npm run build
npm run preview
npm run lint
npm run format
npm run format:check
npm run check
```

- `npm run dev` lance Vite avec rechargement à chaud;
- `npm run build` recrée `dist/` et contrôle son contenu;
- `npm run preview` sert le build de production;
- `npm run lint` contrôle le JavaScript, le SCSS et les garde-fous pédagogiques;
- `npm run format` applique Prettier aux sources techniques et à la documentation Markdown;
- `npm run format:check` vérifie le formatage sans modifier les fichiers;
- `npm run check` enchaîne formatage, lint et build pour un contrôle local complet.

## Structure du dépôt

```text
.
├── src/
│   ├── *.html              17 pages Vite multipage
│   ├── js/                 Entrée commune, Bootstrap et état de navigation
│   ├── layouts/            Layout HTML et fragments assemblés par Vite
│   ├── scss/
│   │   ├── global.scss     Dépendances et styles réellement partagés
│   │   └── pages/          Une feuille SCSS par page Vite
│   └── public/
│       └── assets/         Images, vidéo et deux PDF copiés tels quels
├── docs/
│   ├── exercices/          Fiches participants 01 à 13
│   └── formateur/          Corrigé, matrice et traçabilité internes
├── scripts/                Inventaire et garde-fous statiques
├── dist/                   Build reproductible, non versionné
└── vite.config.js
```

`vite.config.js` découvre automatiquement les pages HTML directement placées dans `src/`. Chaque page déclare son titre, sa langue, son doctype, ses classes de structure, ses fragments et ses scripts dans un unique élément `city-stars-page`. Le plugin local `scripts/city-stars-layout.mjs` assemble ce contrat avec `src/layouts/page.html` avant que Vite ne traite la page.

Le layout injecte `src/scss/global.scss`, puis `src/scss/pages/<page>.scss` afin de garantir l’ordre de cascade. Bootstrap, Bootstrap Icons et leurs fontes sont empaquetés depuis npm par la feuille globale ; `src/js/main.js` charge le JavaScript Bootstrap, les scripts communs et l’état actif de navigation. Chaque feuille sépare explicitement les styles techniques des fixtures pédagogiques qui ne doivent pas être corrigées sans cadrage.

Les fragments `src/layouts/partials/header.html` et `footer.html` sont assemblés au build et en développement : aucune requête vers `partials/` n’est effectuée dans le navigateur et ces sources ne sont pas publiées séparément dans `dist/`. Les différences intentionnelles entre certaines pages font partie du parcours et ne doivent pas être normalisées sans cadrage pédagogique.

## Documentation pédagogique

Chaque fiche de `docs/exercices/` décrit un protocole, les preuves attendues et la règle de décision sans révéler le défaut à trouver. Les documents de `docs/formateur/` servent à préparer et corriger les séances :

- `Corrigé des exercices.md` explique les constats et corrections attendues pour les 13 thématiques;
- `Corrections.md` fournit une matrice page, critère, constat et statut;
- `Traçabilité interne.md` consigne les vérifications, ajustements de fixtures et anomalies volontairement conservées.

Toute évolution d’un scénario doit maintenir ensemble la page concernée, sa fiche participant, le corrigé et la traçabilité.

## Validation locale

Avant de terminer une intervention :

```sh
npm ci
npm run check
```

Servir ensuite successivement les sources et le build :

```sh
npm run dev
npm run preview
```

Contrôler les pages concernées dans un navigateur, la console, l’en-tête et le pied assemblés, les médias, les icônes, la navigation clavier et les scénarios pédagogiques concernés.

Les contrôles statiques vérifient notamment :

- la correspondance exacte entre les 17 pages et les 17 feuilles SCSS;
- le contrat des pages, le layout, les deux fragments source et leur injection dans `dist/`;
- l’absence de commentaire HTML, de style statique dans les templates et de dépendance technique distante;
- la présence des 13 fiches et des trois documents formateur;
- les 13 thématiques du corrigé et la validité des noms de pages cités dans `docs/`.

## Déploiement

Aucun déploiement automatisé n’est configuré pour le moment. Le contenu de `dist/` est autonome et peut être servi par un serveur web statique; la cible d’hébergement et son intégration seront définies séparément.

## Licence

Ce dépôt est distribué sous licence MIT. Consulter `LICENSE` pour le texte complet.
