# Consignes de contribution

## Portée

Ces consignes s’appliquent à l’ensemble du dépôt. Le projet est un site multipage d’exercices d’accessibilité fondé sur le scénario fictif City Stars. Les sources sont transformées par Vite et le site de production est généré dans `dist/`.

## Intégrité pédagogique

- Préserver les anomalies et les scénarios pédagogiques, sauf demande explicite portant sur leur évolution.
- Avant toute modification fonctionnelle ou d’accessibilité, consulter `docs/formateur/Corrigé des exercices.md` afin d’identifier l’intention de l’exercice concerné. Le DOCX historique supprimé ne doit pas être restauré.
- Ne pas transformer une correction locale en mise en conformité globale du site tant qu’une refonte n’a pas été explicitement cadrée.
- Préserver le contenu, les données fictives et la progression des exercices.
- Ne révéler ni les anomalies attendues ni leurs solutions dans la documentation destinée aux participants.
- Maintenir la séparation entre `docs/exercices/`, destiné aux participants, et `docs/formateur/`, strictement interne.
- Lorsqu’un scénario évolue, synchroniser la fiche concernée, le corrigé, `docs/formateur/Corrections.md` et `docs/formateur/Traçabilité interne.md`.

## Architecture et dépendances

- Ne pas ajouter de commentaire HTML (`<!-- ... -->`) dans les pages ou dans `src/layouts/partials/`.
- Utiliser Node.js 24 LTS et npm. Versionner `package.json` et `package-lock.json`, mais jamais `node_modules/` ni `dist/`.
- Conserver les 17 pages dans `src/`, les scripts dans `src/js/`, le SCSS dans `src/scss/`, et les fichiers copiés tels quels dans `src/public/`.
- Vite découvre automatiquement les pages HTML directement placées dans `src/`. Toute évolution de cet inventaire doit être explicitement cadrée et répercutée dans `scripts/check-static.mjs` et la documentation.
- Importer les dépendances JavaScript depuis `src/js/main.js` et les dépendances de styles depuis `src/scss/global.scss`. Ne pas ajouter de CDN pour les scripts, feuilles de style, fontes ou icônes.
- Ne pas introduire de nouvelle dépendance si le besoin peut être couvert par les dépendances et fichiers existants.
- Pour un changement de style partagé, modifier `src/scss/global.scss` ; pour un style propre à une page, modifier sa feuille homonyme sous `src/scss/pages/`. Conserver dans chaque feuille la séparation entre styles techniques et fixtures pédagogiques. Le CSS livré est généré par Vite et ne doit pas être versionné séparément.
- Conserver le contrat `city-stars-page` des 17 pages et assembler le HTML commun avec `src/layouts/page.html` et `src/layouts/partials/`. Les fragments sont des sources de build et ne doivent pas être chargés par une requête côté navigateur ni publiés séparément dans `dist/`.
- Ne pas remplacer ni republier hors du dépôt les PDF de `src/public/assets/` sans autorisation explicite. Ces documents sont des fixtures approuvées du parcours.

## Documentation

- Conserver exactement 13 fiches numérotées dans `docs/exercices/`, une par thématique RGAA.
- Rédiger les fiches participants comme des protocoles neutres : pages Vite réelles, méthode, preuves attendues et règle de conformité, sans constat ni solution.
- Réserver les constats, statuts et corrections à `docs/formateur/`.
- Utiliser uniquement les noms de pages réellement inventoriés par Vite ; ne pas réintroduire d’anciennes URL GitHub Pages ou de variantes de noms avec espaces.
- Fonder les rattachements de critères sur le référentiel RGAA officiel et vérifier le comportement réel dans le navigateur avant de modifier la documentation.
- Ne pas modifier les PDF pour aligner la documentation : vérifier leurs métadonnées, leur rendu et leur contenu, puis documenter le constat.

## Périmètre des interventions

- Limiter chaque intervention aux fichiers et comportements demandés.
- Examiner l’état du dépôt avant de modifier un fichier et préserver les changements concurrents.
- Ne pas inclure dans une intervention un nettoyage, une réécriture ou une mise à niveau sans rapport avec la demande.
- Ne pas anticiper une future stack technique ou une migration non cadrée.

## Validation

Installer et contrôler le projet depuis sa racine :

```sh
npm ci
npm run check
```

Servir les sources avec `npm run dev`, puis la production avec `npm run preview`. Pour chaque changement, contrôler au minimum :

- les pages touchées dans un navigateur ;
- l’absence d’erreur inattendue dans la console ;
- l’injection de l’en-tête et du pied de page sur les pages qui les utilisent, sans requête runtime vers `partials/` ;
- les assets, les icônes et les fontes locales ;
- la navigation et les interactions au clavier ;
- les scénarios pédagogiques directement concernés.

Le script `npm run lint` vérifie notamment l’absence de commentaire HTML, de style statique dans les templates, de ressource technique distante et de référence locale manquante, ainsi que le contrat de layout, les 17 feuilles SCSS, la structure documentaire (`docs/exercices/` et `docs/formateur/`) et les noms de pages cités. `npm run build` confirme aussi que les 17 pages contiennent les styles et fragments attendus dans `dist/`, sans publier les fragments séparément ni laisser de référence à jsDelivr ou à `node_modules`.

Avant de terminer, inspecter le diff et confirmer qu’il reste limité au périmètre demandé. Ne pas intégrer les fichiers d’IDE, les documents de travail ou les suppressions concurrentes sans rapport avec l’intervention.
