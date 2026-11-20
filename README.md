# Portfolio de Hugo Vitry

React, TypeScript, Vite et i18next. Deux langues (français et anglais) et deux thèmes. Les routes des projets existants sont conservées.

## Développement

```sh
npm ci
npm run dev
npm run build
npm run typecheck
npm test
npm run format
```

## Modifier le contenu

- `src/data/profile.ts` : coordonnées, photo, liens sociaux et CV.
- `src/data/projects.ts` : catalogue des projets, slugs, années, technologies, compétences, médias et liens. Une adresse absente est `null`.
- `src/data/skills.ts` : compétences et niveaux acquis.
- `src/data/technos.ts` : technologies, logos et catégories.
- `src/i18n/locales/fr.json` et `en.json` : tous les textes, contenus des projets et du parcours, libellés et métadonnées.
- `src/index.css` : directives Tailwind et variables des thèmes sombre et clair (couleurs du site, de la fenêtre de la constellation et des boutons audio).
- `src/styles/global.css` : styles de base et classes partagées (conteneur, boutons, filtres).

Pour ajouter un projet, ajouter une entrée dans `projects.ts`, puis son contenu sous `projects.<slug>` dans **les deux fichiers de traduction**. La route `/projet/<slug>`, la carte, les filtres, les liens depuis les compétences et le projet suivant sont générés automatiquement.

Chaque contenu projet contient `title`, `context`, `description`, `sections` (titre, paragraphes, fonctionnalités) et `evidence` (compétence, justification, apprentissages). Les fichiers présents dans `public` sont référencés par leur chemin depuis la racine, par exemple `/projets/annuaire/annuaire.png`.

## Traductions

i18next et react-i18next gèrent les traductions, les pluriels et les interpolations. Le sélecteur FR/EN est accessible sur toutes les pages. Le choix est mémorisé ; à la première visite, la langue du navigateur détermine FR ou EN. La langue française sert de repli. Les noms propres, technologies et identifiants ne sont pas traduits. Le CV fourni reste en français et son lien l’indique.

Pour une troisième langue : créer un fichier JSON avec la même structure, l’enregistrer dans `src/i18n/index.ts` et ajouter son bouton dans `LanguageSwitcher/LanguageSwitcher.tsx`.

## Structure

Chaque composant a son dossier avec trois fichiers : `Nom.tsx`, `Nom.css` (ses styles, importés par le composant) et `Nom.test.tsx`. Les pages suivent la même règle dans `src/pages`.

Pour créer un composant, utiliser la CLI configurée dans `generate-react-cli.json` :

```bash
npx generate-react-cli component NomDuComposant
```

Les tests de composants utilisent Vitest et Testing Library : `npm test` lance tout, `npm run test:components` les relance à chaque modification.

### Fond animé réutilisable

`src/components/ContourBackground/ContourBackground.tsx` et son fichier CSS forment un composant autonome, sans bibliothèque d'animation. Il dessine des courbes SVG qui ondulent lentement et reprend la couleur du thème.

```tsx
<section style={{ position: 'relative', isolation: 'isolate', overflow: 'hidden' }}>
  <ContourBackground color="#b7a0ee" duration={18} intensity={0.25} />
  {/* Contenu de la section */}
</section>
```

`duration` règle la durée du mouvement en secondes, `intensity` l'opacité entre 0 et 1, et `color` accepte toute couleur CSS. L'animation se met en pause hors écran et respecte la préférence de réduction des animations. Le fond ne capte aucun clic et reste masqué aux lecteurs d'écran. Le fond global est fixé derrière toutes les pages avec la classe `contour-background--app` ; ses réglages se trouvent dans `App.tsx` (intensité actuelle : `0.05`).

`App.tsx` porte la navigation, le thème et les routes. `ProjectPage.tsx` affiche chaque projet à partir du catalogue et de sa traduction. Les composants `Section`, `TagList`, `ProjectCard` et `ContactRow` partagent les éléments récurrents. Les compétences utilisent des panneaux natifs `<details>` accessibles au clavier.

## Vérifications

`npm test` vérifie la cohérence des traductions, des slugs, des compétences, des liens et des médias locaux. `npm run build` vérifie TypeScript et produit `dist/`.

## Hébergement

L’hébergement doit renvoyer `index.html` pour les routes `/projet/*` afin que les liens directs fonctionnent avec BrowserRouter. La configuration actuelle utilise la racine du domaine (`base: '/'`).
