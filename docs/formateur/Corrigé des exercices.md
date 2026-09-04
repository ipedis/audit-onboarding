# Corrigé des exercices — Site City Stars BC

Document interne formateur. Les corrections décrites ci-dessous ne doivent pas être appliquées globalement au site d’exercice : les défauts observés constituent les scénarios pédagogiques.

## Thématique 1 — Images

### Cas 1 — Logo fonctionnel

Dans `src/layouts/partials/header.html`, le logo est l’unique contenu du lien d’accueil et possède `alt=""`. L’image fonctionnelle n’a donc aucun nom accessible : le critère 1.1 est non conforme. La correction serait une alternative exprimant la destination, par exemple « City Stars BC — Accueil ».

### Cas 2 — Infographie complexe

Dans `index.html`, l’alternative « Stats Kelly Rowan » identifie le sujet sans restituer les données de l’infographie. Les critères 1.3 et 1.6 sont non conformes. Il faudrait une alternative courte pertinente et une description détaillée adjacente ou reliée.

## Thématique 2 — Cadres

Les deux cadres de `index.html` illustrent les deux contrôles distincts : le premier n’a pas de `title` (2.1 non conforme) ; le second a un titre générique de lecteur, sans sujet (2.2 non conforme). Chaque titre devrait identifier la vidéo correspondante.

## Thématique 3 — Couleurs

Le texte secondaire translucide sur fond bleu de `index.html` doit être mesuré comme texte : il relève de 3.2, pas de 3.3. Les composants et éléments graphiques nécessaires à la compréhension relèvent de 3.3. Dans `blog-post.html`, la distinction des liens au milieu des paragraphes relève de 10.6 : elle ne peut reposer sur la seule couleur que sous les conditions de contraste et d’indication au survol/focus prévues par ce critère.

## Thématique 4 — Multimédia

`assets/media.mp4` dure 16,16 secondes, contient une piste vidéo H.264 et aucune piste audio. L’absence de sous-titres n’est donc pas l’anomalie attendue. La vidéo porteuse d’information ne dispose ni d’une transcription descriptive ni d’une audiodescription équivalente (4.1/4.2), et l’élément de `index.html` ne propose aucune commande de lecture, pause ou arrêt (4.11). La correction combinerait une alternative équivalente avec des commandes accessibles.

## Thématique 5 — Tableaux

Dans le premier tableau de `statistiques.html`, la ligne d’en-tête utilise des cellules `td` : 5.6 est non conforme. Dans le tableau « Prochains matchs », les cellules d’en-tête existent mais n’ont ni `scope`, ni relation `id`/`headers`, ni rôle équivalent : 5.7 est non conforme. Les critères 5.1 et 5.2 ne doivent être appliqués qu’à un tableau réellement complexe ; les tableaux simples de la page n’exigent pas de résumé.

## Thématique 6 — Liens

Les liens-icônes des réseaux sociaux de `blog-home.html` n’ont pas d’intitulé accessible : 6.2 est non conforme. Plusieurs liens génériques ou symboliques de `index.html` doivent être évalués avec leur contexte ; lorsque ce contexte ne suffit pas à expliciter la destination, 6.1 est non conforme. La correction consiste à fournir un intitulé accessible présent et explicite, pas nécessairement du texte visible supplémentaire.

## Thématique 7 — Scripts

Les 19 exercices de `components.html` couvrent successivement la nature des commandes, l’accordéon, la navigation, le menu volant avec popover, les onglets, les deux listes déroulantes, le menu burger, le fil d’Ariane, les radios, les cases à cocher, la modale, les bascules simple et groupée, l’infobulle, la barre de menus, la pagination, les messages de statut et les changements de contexte. Les défauts portent selon le cas sur le rôle, le nom, l’état, les relations ou l’usage clavier (7.1 et 7.3). Les messages non annoncés, cachés, trop verbeux ou non pertinents illustrent 7.5. Les recherches, filtres et suggestions qui modifient le contexte sans demande explicite illustrent 7.4. Une correction doit suivre le motif d’interaction complet du composant, y compris la mise à jour dynamique des états.

## Thématique 8 — Éléments obligatoires

`about.html` n’a pas de doctype (8.1). `index.html` n’a pas de langue par défaut (8.3) et son titre « New page » n’est pas pertinent (8.6). `pricing.html` déclare `lang="de"` pour un contenu français (8.4). `contact.html` contient un `title` vide (8.5). `index.fr.html` contient des usages de balises à finalité de présentation (8.9). Les doublons d’identifiants et erreurs de syntaxe ne rendent 8.2 non conforme que s’ils provoquent effectivement une rupture d’accessibilité.

## Thématique 9 — Structuration de l’information

`about.html` présente un saut de niveau et un titre vide ; `blog-home.html` contient un titre décoratif : 9.1 est non conforme. `portfolio-overview.html` simule ses grandes structures avec des `div` : 9.2 est non conforme. `blog-post.html` simule des listes avec des paragraphes préfixés : 9.3 est non conforme. Les citations de `about.html` et `blog-post.html` sont seulement stylées : 9.4 est non conforme. Les corrections utilisent des titres pertinents, des éléments structurants, `ul`/`ol` avec `li`, et `blockquote` ou `q` selon le cas.

## Thématique 10 — Présentation de l’information

`pricing.html` utilise des attributs de présentation sur le tableau et `contact.html` un élément de centrage : 10.1 est non conforme. Les étapes de `about.html` ne conservent pas un ordre compréhensible sans styles (10.3). Le badge de `pricing.html` doit rester lisible à 200 % (10.4) et le texte du héros doit conserver un fond contrôlé (10.5). Les liens de `blog-post.html` illustrent 10.6. La feuille de style supprime l’indicateur de focus de plusieurs commandes (10.7). Des contenus visibles de `index.html` et du panneau ouvert de `faq.html` sont masqués avec `aria-hidden` (10.8). Une référence à la « colonne verte » dépend d’un indice visuel (10.9/10.10). La bande d’annonce de `index.html` force une largeur minimale à 320 px (10.11), tandis que les blocs statistiques à hauteur fixe peuvent tronquer le texte après modification des espacements (10.12). Les infobulles sociales de `blog-home.html` ne sont ni persistantes ni accessibles au focus (10.13/10.14).

## Thématique 11 — Formulaires

Dans `contact.html`, « Ville » et « Sujet » n’ont pas d’étiquette programmatiquement associée (11.1), le bouton `>>` n’a pas d’intitulé pertinent (11.9), et les messages d’erreur ne sont ni reliés aux champs ni annoncés (11.10). Les valeurs `autocomplete="username"` pour l’e-mail et `autocomplete="postal-code"` pour le téléphone ne correspondent pas aux données demandées (11.13). Dans `inscription.html`, les radios du niveau ne sont pas regroupés (11.5) et le groupe « Disponibilités » a une `legend` vide (11.6). Les corrections associent chaque `label`, structurent les groupes avec `fieldset`/`legend`, nomment clairement le bouton, relient et annoncent les erreurs, et utilisent les jetons d’autocomplétion attendus.

## Thématique 12 — Navigation

Le pied de `statistiques.html` ne fournit pas l’accès au plan disponible ailleurs et `sitemap.html` omet l’article du blog : 12.3 et 12.4 sont non conformes. Le menu de `faq.html` est placé après le contenu contrairement aux autres pages (12.2). Le lien d’évitement partagé est en `display:none`, donc inutilisable (12.7). Les `tabindex` positifs de `about.html` et la modale de `blog-home.html` perturbent l’ordre du focus (12.8). Le widget de date de `inscription.html` intercepte les touches de sortie et crée un piège clavier (12.9). Les fiches joueurs de `statistiques.html`, affichées au seul survol et retirées de la tabulation, ne sont pas atteignables au clavier (12.11).

## Thématique 13 — Consultation

Le quiz de `limite-temps.html` expire après 120 secondes sans désactivation, ajustement ou prolongation : 13.1 est non conforme. Le rafraîchissement de `refresh-auto.html` après 30 secondes constitue lui aussi une limite de temps et relève de 13.1 ; 13.2 est réservé à l’ouverture automatique d’une nouvelle fenêtre, scénario absent ici. Le PDF de restitution et le PDF de liste d’outils sont présents. Pour ce dernier, l’alternative `outils-accessibles.html` reprend les 13 entrées Chrome, les 7 entrées Firefox et les coordonnées : le mécanisme satisfait le principe d’alternative de 13.3. La vidéo automatique sans arrêt illustre 13.8 conjointement à 4.11. La galerie de `components.html` demande un balayage sans alternative simple (13.10). L’exemple déclenché à `mousedown` agit avant le relâchement et ne permet pas l’annulation attendue (13.11).

## Référence

[RGAA 4.1.2 — critères et tests](https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/)
