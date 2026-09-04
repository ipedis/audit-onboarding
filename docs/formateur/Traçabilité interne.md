# Traçabilité interne du réalignement

| Point contrôlé | Source de vérité | Résultat | Décision |
| --- | --- | --- | --- |
| Inventaire des pages | `vite.config.js` et `src/` | 17 pages HTML | Confirmé |
| Layout et fragments partagés | `src/layouts/` | Assemblage Vite sans requête runtime | Confirmé |
| Architecture SCSS | `src/scss/global.scss` et `src/scss/pages/` | 17 feuilles de page et cascade globale puis locale | Confirmé |
| Fiches participants | `docs/` | 13 fiches numérotées | Corrigé |
| Références de pages | Inventaire Vite | Noms locaux sans anciennes URL | Corrigé |
| Références RGAA | Référentiel 4.1.2 officiel | Rattachements 1, 3, 4, 5, 6, 10, 12 et 13 réalignés | Corrigé |
| Thématique 4 | `assets/media.mp4` et `ffprobe` | Vidéo seule, 16,16 s, aucune piste audio | Confirmé et documenté |
| Thématique 7 | Sections de `components.html` | 19 tests documentés, dont le test 11 | Corrigé |
| Thématique 10 | Fiche participant | Étapes 3 et 12 présentes | Corrigé |
| Corrigé formateur | Pages et comportements réels | 13 thématiques couvertes | Corrigé |
| Matrice formateur | Pages et critères réels | Balises affichées comme code, statuts explicites | Corrigé |
| Autoplay Chrome | Élément vidéo de `index.html` | Attribut `muted` ajouté ; absence de commandes conservée | Fixture corrigée, anomalie conservée |
| Lien Blog partagé | Inventaire Vite | Destination `blog-home.html` | Fixture corrigée |
| Poids PDF affiché | Taille réelle 240 114 octets | Libellé 235 Ko | Fixture corrigée |
| PDF liste d’outils | `pdfinfo`, rendu des 3 pages et extraction | 3 pages, balisé, 13 entrées Chrome, 7 Firefox et coordonnées | Confirmé, fichier conservé |
| PDF restitution | `pdfinfo` | Présent, 40 pages, balisé, 2 173 533 octets | Confirmé, fichier conservé |
| Anomalies pédagogiques | HTML, CSS et JavaScript sous `src/` | Scénarios annoncés encore présents | Volontairement conservé |
| Garde-fou documentaire | `scripts/check-static.mjs` | Fiches, thèmes et références HTML contrôlés | Ajouté |
| DOCX historique | État Git fourni | Suppression existante | Non restauré, non modifié |

## Règle de maintenance

Toute évolution d’une fixture doit mettre à jour la fiche participant concernée, le corrigé formateur et cette matrice. Une anomalie pédagogique n’est corrigée dans le site que si l’évolution de l’exercice est explicitement demandée.
