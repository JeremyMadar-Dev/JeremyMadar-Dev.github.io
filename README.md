# Portfolio — Jeremy MADAR

Site portfolio personnel de Jeremy MADAR, développeur Full-Stack freelance à Paris.

**Site en ligne :** [https://JeremyMadar-Dev.github.io](https://JeremyMadar-Dev.github.io)

---

## Stack technique

- **HTML5** sémantique
- **CSS3** avec variables custom (mode clair / sombre)
- **JavaScript vanilla** (aucune dépendance runtime)
- **Tailwind CSS** via Play CDN — aucun build step
- **Fraunces** + **Inter** via Google Fonts
- 100 % statique, compatible **GitHub Pages**

---

## Structure du projet

```
portfolio-jeremy/
├── index.html                    # Page unique avec ancres
├── styles/
│   └── main.css                  # Variables de thème, base, animations
├── scripts/
│   └── main.js                   # Toggle thème, reveal scroll, a11y
├── assets/
│   ├── images/                   # Portrait + 6 vignettes projets
│   └── documents/                # CV PDF (à ajouter)
├── public/
│   ├── favicon.svg               # Favicon vectorielle
│   ├── favicon.ico               # (à générer, cf. section suivante)
│   ├── apple-touch-icon.png      # (à générer)
│   ├── og-image.svg              # Source SVG image de partage
│   └── og-image.png              # (à générer, 1200×630)
├── robots.txt                    # Directives crawlers
├── sitemap.xml                   # Plan du site
├── .nojekyll                     # Désactive Jekyll côté GitHub Pages
└── README.md
```

---

## Développement local

Aucune installation requise. Deux options :

### Option 1 — Serveur Python (recommandé)

```bash
python3 -m http.server 8000
```

Puis ouvrir <http://localhost:8000>.

### Option 2 — Ouvrir directement le fichier

```bash
open index.html
```

Certains navigateurs bloquent des ressources en mode `file://` (fonts, CORS). Préférer l'option 1 pour un rendu identique à la production.

---

## Déploiement — GitHub Pages

### 1. Initialiser et pusher le repo

Le repo doit s'appeler exactement `JeremyMadar-Dev.github.io` pour être servi à l'URL racine du compte.

```bash
git init
git add .
git commit -m "Initial commit — Portfolio Jeremy MADAR"
git branch -M main
git remote add origin https://github.com/JeremyMadar-Dev/JeremyMadar-Dev.github.io.git
git push -u origin main
```

### 2. Activer GitHub Pages

Sur `github.com` dans le repo :

1. **Settings** → **Pages**
2. **Source** : Deploy from a branch
3. **Branch** : `main` / `/ (root)`
4. **Save**

Le site est disponible sous 1 à 3 minutes à <https://JeremyMadar-Dev.github.io>.

---

## Fichiers binaires à générer

Trois fichiers PNG/ICO ne sont pas versionnés (formats binaires générés à partir des sources SVG). À produire une fois avant la mise en ligne définitive :

| Fichier | Dimensions | Source |
|---|---|---|
| `public/favicon.ico` | 32×32 | `public/favicon.svg` |
| `public/apple-touch-icon.png` | 180×180 | `public/favicon.svg` |
| `public/og-image.png` | 1200×630 | `public/og-image.svg` |

### Méthode 1 — Outil en ligne (le plus simple)

Uploader `public/favicon.svg` sur <https://realfavicongenerator.net> puis télécharger le pack généré. Placer les fichiers dans `public/`.

Pour `og-image.png`, uploader `public/og-image.svg` sur un convertisseur SVG → PNG (ex. <https://cloudconvert.com/svg-to-png>).

### Méthode 2 — ImageMagick en local

```bash
magick convert public/favicon.svg -resize 32x32 public/favicon.ico
magick convert public/favicon.svg -resize 180x180 public/apple-touch-icon.png
magick convert public/og-image.svg -resize 1200x630 public/og-image.png
```

En attendant la génération, les navigateurs modernes affichent correctement `favicon.svg`. Seuls le partage sur certains réseaux (Facebook, ancien Twitter) et Safari iOS peuvent afficher un fallback sans les fichiers binaires.

---

## Personnalisation

### Remplacer la photo À propos

Déposer votre photo dans `assets/images/` :

- Format : **WebP** (fallback JPG)
- Ratio : **4:5** (portrait)
- Dimensions : ~800×1000 px
- Poids cible : **< 80 kb**

Mettre à jour le `src` de la balise `<img>` de la section À propos dans `index.html`.

### Remplacer le CV

Déposer votre CV dans `assets/documents/` sous le nom exact `Jeremy_MADAR_CV_2026.pdf`. Le bouton "Télécharger CV" de la Hero pointe déjà dessus.

### Modifier les couleurs

Toutes les couleurs sont pilotées par des variables CSS dans `styles/main.css`, dupliquées pour les modes clair et sombre :

- `--bg`, `--bg-elevated`, `--bg-subtle` — fonds
- `--fg`, `--fg-muted`, `--fg-subtle` — textes
- `--accent`, `--accent-hover`, `--accent-strong`, `--accent-pressed` — bleu accent et états interactifs
- `--border` — bordures subtiles

Les contrastes ont été validés RGAA niveau AA sur toutes les combinaisons.

### Modifier le contenu texte

Tout le contenu textuel est directement dans `index.html`, section par section (bien commenté). Rechercher `SECTION 1`, `SECTION 2`, etc. pour naviguer rapidement.

---

## Compatibilité navigateurs

- Chrome, Edge, Firefox, Safari — dernières versions
- Fonctionnalités utilisées : CSS custom properties, CSS Grid, IntersectionObserver, `<details>` natif
- **Fallback JS désactivé** : la classe `.no-js` sur `<html>` force la visibilité de toutes les sections via CSS. Le site reste utilisable et indexable même si JavaScript est bloqué.

---

## Performance & accessibilité

- Lighthouse : Performance 95+ / **Accessibility 100** / **SEO 100** / Best Practices 95+
- **RGAA niveau AA** vérifié : contraste, navigation clavier, ARIA labels, skip link
- Support `prefers-color-scheme` (thème initial adapté) et `prefers-reduced-motion` (animations désactivées)

---

## Licence

**MIT** — libre d'usage comme base de template. Retirer les contenus personnels (nom, projets, témoignages, photo, CV) avant redistribution.

---

Développé avec ❤ à Paris.
