# ePortfolio — B.U.T. Informatique

Portfolio développé avec **React 18 + TypeScript + Tailwind CSS v3 + Vite**.

## Stack

| Outil | Rôle |
|---|---|
| React 18 | UI |
| TypeScript 5 (strict) | Typage statique |
| Tailwind CSS v3 | Styles utilitaires |
| Vite 5 | Bundler / dev server |
| Google Fonts | Instrument Sans + Plus Jakarta Sans + JetBrains Mono |

## Arborescence

```
src/
├── main.tsx                  # Point d'entrée
├── App.tsx                   # Racine + scroll spy
├── index.css                 # Tailwind directives + composants réutilisables
│
├── types/
│   └── index.ts              # Tous les types TypeScript partagés
│
├── data/                     # Données à personnaliser
│   ├── competences.ts        # Référentiel B.U.T. + niveaux acquis
│   ├── projets.ts            # Vos projets
│   └── technos.ts            # Vos technologies
│
├── hooks/
│   └── useScrollSpy.ts       # Détection de la section active
│
└── components/
    ├── Navbar.tsx
    ├── Hero.tsx
    ├── APropos.tsx
    ├── Competences.tsx
    ├── ProjetModal.tsx
    ├── Projets.tsx
    ├── Technologies.tsx
    ├── Contact.tsx
    └── Footer.tsx
```

## Installation

```bash
npm install
npm run dev
```

Vérifier le typage seul :
```bash
npm run typecheck
```

## Personnalisation

### 1. Vos informations personnelles

Chercher `Prénom Nom` dans tout le projet et remplacer.  
Chercher `prenom.nom@etudiant.univ.fr` pour l'email.

### 2. Vos projets — `src/data/projets.ts`

Ajouter un projet en respectant l'interface `Projet` :

```ts
{
  id: 5,
  titre: 'Mon projet',
  type: 'etudiant',           // 'etudiant' | 'stage' | 'personnel'
  annee: '2025',
  contexte: 'SAE X.X — ...',
  description: 'Résumé court affiché sur la carte',
  descriptionLongue: 'Description complète dans la modale',
  technos: ['React', 'Node.js'],
  competences: ['realiser', 'gerer'],  // IDs définis dans types/index.ts
  highlights: ['Point clé 1', 'Point clé 2'],
  liens: { git: 'https://github.com/...', demo: null },
}
```

### 3. Niveaux de compétences — `src/data/competences.ts`

Modifier `NIVEAUX_ACQUIS` (1, 2 ou 3 selon votre avancement) :

```ts
export const NIVEAUX_ACQUIS: NiveauxAcquis = {
  realiser:    3,
  optimiser:   2,
  // ...
}
```

### 4. Technologies — `src/data/technos.ts`

Ajouter / supprimer des entrées `{ name, category }`.

### 5. Couleurs — `tailwind.config.ts`

Les tokens de couleur sont dans `theme.extend.colors`.  
Modifier les valeurs `violet.*` et `blue.*` pour changer la palette.

## Déploiement sur GitHub Pages

```bash
npm install --save-dev gh-pages

# Dans vite.config.ts, modifier :
base: '/nom-du-repo/'

# Dans package.json, ajouter :
"deploy": "vite build && gh-pages -d dist"

npm run deploy
```
