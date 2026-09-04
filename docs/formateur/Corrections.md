# Corrections — matrice interne formateur

Cette matrice résume l’état réel des fixtures. Le détail et les propositions de correction figurent dans `Corrigé des exercices.md`. « Non conforme » décrit ici un scénario pédagogique volontaire, pas une demande de correction du site.

| Thème | Exercice | Page | Critère | Constat réel | Statut | Détail |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Logo fonctionnel | `src/layouts/partials/header.html` | 1.1 | Le lien-image n’a pas d’alternative | Non conforme | Thème 1, cas 1 |
| 1 | Infographie | `index.html` | 1.3 et 1.6 | Alternative trop générale et absence de description détaillée | Non conforme | Thème 1, cas 2 |
| 2 | Premier cadre | `index.html` | 2.1 | Absence de titre de cadre | Non conforme | Thème 2 |
| 2 | Second cadre | `index.html` | 2.2 | Titre générique ne décrivant pas le contenu | Non conforme | Thème 2 |
| 3 | Texte secondaire | `index.html` | 3.2 | Contraste texte/arrière-plan insuffisant | Non conforme | Thème 3 |
| 3 | Liens dans le texte | `blog-post.html` | 10.6 | Distinction reposant sur la couleur sans garanties suffisantes | Non conforme | Thèmes 3 et 10 |
| 4 | Vidéo seule | `index.html` | 4.1 et 4.2 | Aucune transcription ou audiodescription équivalente | Non conforme | Thème 4 |
| 4 | Commandes vidéo | `index.html` | 4.11 | Lecture automatique sans commandes utilisateur | Non conforme | Thème 4 |
| 5 | Performances joueurs | `statistiques.html` | 5.6 | Cellules d’en-tête codées avec `td` | Non conforme | Thème 5 |
| 5 | Prochains matchs | `statistiques.html` | 5.7 | En-têtes sans technique d’association | Non conforme | Thème 5 |
| 6 | Liens-icônes sociaux | `blog-home.html` | 6.2 | Liens sans intitulé accessible | Non conforme | Thème 6 |
| 6 | Liens ambigus | `index.html` | 6.1 | Plusieurs intitulés ne sont pas explicites hors contexte | Non conforme | Thème 6 |
| 7 | 19 composants | `components.html` | 7.1 et 7.3 | Rôles, états ou commandes clavier incomplets selon les composants | Non conforme | Thème 7 |
| 7 | Messages de statut | `components.html` | 7.5 | Plusieurs messages ne sont pas annoncés de façon pertinente | Non conforme | Thème 7, test 18 |
| 7 | Changement de contexte | `components.html` | 7.4 | Des actions déclenchent un changement non maîtrisé | Non conforme | Thème 7, test 19 |
| 8 | Type de document | `about.html` | 8.1 | Déclaration de type absente | Non conforme | Thème 8 |
| 8 | Langue par défaut | `index.html` | 8.3 | Attribut de langue absent | Non conforme | Thème 8 |
| 8 | Code de langue | `pricing.html` | 8.4 | Code allemand pour un contenu français | Non conforme | Thème 8 |
| 8 | Titre de page | `contact.html` | 8.5 | Élément `title` vide | Non conforme | Thème 8 |
| 8 | Titre pertinent | `index.html` | 8.6 | Titre générique | Non conforme | Thème 8 |
| 8 | Présentation | `index.fr.html` | 8.9 | Balises de présentation dans le contenu | Non conforme | Thème 8 |
| 9 | Titres | `about.html` et `blog-home.html` | 9.1 | Hiérarchie, titre vide ou intitulé décoratif | Non conforme | Thème 9 |
| 9 | Structure | `portfolio-overview.html` | 9.2 | Grandes zones sans structure sémantique adaptée | Non conforme | Thème 9 |
| 9 | Listes | `blog-post.html` | 9.3 | Listes simulées par des paragraphes | Non conforme | Thème 9 |
| 9 | Citations | `about.html` et `blog-post.html` | 9.4 | Citations simulées visuellement | Non conforme | Thème 9 |
| 10 | Présentation HTML | `pricing.html` et `contact.html` | 10.1 | Attributs ou élément de présentation | Non conforme | Thème 10 |
| 10 | Ordre sans CSS | `about.html` | 10.3 | Progression visuelle différente de l’ordre source | Non conforme | Thème 10 |
| 10 | Contenu masqué | `index.html` et `faq.html` | 10.8 | Contenu visible marqué `aria-hidden` | Non conforme | Thème 10 |
| 10 | Reflow | `index.html` | 10.11 | Largeur minimale causant un défilement à 320 px | Non conforme | Thème 10 |
| 10 | Espacement | `index.html` | 10.12 | Hauteur fixe et masquage pouvant tronquer le texte | Non conforme | Thème 10 |
| 10 | Contenu au survol | `blog-home.html` | 10.13 et 10.14 | Infobulle non persistante et non disponible au focus | Non conforme | Thème 10 |
| 11 | Étiquettes | `contact.html` | 11.1 et 11.2 | Champs sans étiquette associée ou intitulé peu pertinent | Non conforme | Thème 11 |
| 11 | Groupes | `inscription.html` | 11.5 et 11.6 | Groupe non structuré et légende vide | Non conforme | Thème 11 |
| 11 | Bouton | `contact.html` | 11.9 | Intitulé `>>` non pertinent | Non conforme | Thème 11 |
| 11 | Erreurs | `contact.html` | 11.10 | Erreurs visuelles non reliées ni annoncées | Non conforme | Thème 11 |
| 11 | Autocomplétion | `contact.html` | 11.13 | Valeurs incompatibles avec les données demandées | Non conforme | Thème 11 |
| 12 | Plan du site | `statistiques.html` et `sitemap.html` | 12.3 et 12.4 | Accès absent sur une page et contenu du plan incomplet | Non conforme | Thème 12 |
| 12 | Menu répété | `faq.html` | 12.2 | Navigation principale à un emplacement différent | Non conforme | Thème 12 |
| 12 | Évitement | `src/layouts/partials/header.html` | 12.7 | Lien d’évitement retiré de l’affichage et de l’accessibilité | Non conforme | Thème 12 |
| 12 | Tabulation | `about.html` et `blog-home.html` | 12.8 | Ordre positif et gestion de modale incohérents | Non conforme | Thème 12 |
| 12 | Piège clavier | `inscription.html` | 12.9 | Le sélecteur intercepte les touches de sortie | Non conforme | Thème 12 |
| 12 | Survol | `statistiques.html` | 12.11 | Fiches joueurs inaccessibles au clavier | Non conforme | Thème 12 |
| 13 | Limite de temps | `limite-temps.html` | 13.1 | Délai de 120 secondes non contrôlable | Non conforme | Thème 13 |
| 13 | Rafraîchissement | `refresh-auto.html` | 13.1 | Rafraîchissement de 30 secondes non contrôlable | Non conforme | Thème 13 |
| 13 | Nouvelle fenêtre automatique | Ensemble | 13.2 | Aucun scénario automatique identifié | Non applicable | Thème 13 |
| 13 | Liste d’outils PDF/HTML | `index.html` et `outils-accessibles.html` | 13.3 | Alternative HTML présente et contenu équivalent | Conforme | Thème 13 |
| 13 | Mouvement automatique | `index.html` | 13.8 et 4.11 | Vidéo automatique sans arrêt | Non conforme | Thème 13 |
| 13 | Galerie tactile | `components.html` | 13.10 | Balayage sans alternative simple | Non conforme | Thème 13 |
| 13 | Action au pointage | `components.html` | 13.11 | Un exemple agit dès l’appui | Non conforme | Thème 13 |
