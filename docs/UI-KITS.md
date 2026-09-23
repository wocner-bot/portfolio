# Independent portfolio designs

Original remains at `/` and `/work/<slug>/`. Its body markup and `style.css`,
`devices.css`, and `case.css` are unchanged from b7529c1. Only shared design-picker
assets are updated. No kit stylesheet is loaded by Original.

Four generated, independently addressable sites share the original content:

| Route | Actual CSS package | Design language | Components |
| --- | --- | --- | --- |
| `/design/studio/` | Bootstrap 5.3.8 | Inter, product studio, soft white cards | card, card-body, btn, badge, nav-pills |
| `/design/editorial/` | Bulma 1.0.4 | Newsreader, paper, editorial rules | card, card-content, button, tag, box, tabs |
| `/design/gallery/` | UIkit 3.25.25 | Manrope, dark gallery, thin type | uk-card, uk-card-body, uk-button, uk-label, uk-subnav |
| `/design/bold/` | Semantic UI 2.5.0 | Space Grotesk, heavy borders, offset shadows | ui card, content, button, label, segment, menu |

Each site has its homepage and all seven cases. The generator adds the kit's
component markup and loads only that kit, followed by a portfolio adapter. The
adapters preserve content order, original interface imagery and one-column case
narratives while applying different typography, spacing, surfaces and components.
The generated pages are committed; Render still serves `dist` as a static site.

## Rebuild after changes

```sh
npm ci --ignore-scripts
python3 build-cases.py
npm run build:designs
npm run check:designs
```

Edit the original content in `dist/index.html`, `build-cases.py` and `templates/`.
Do not hand-edit the generated `dist/design/` pages. Edit the four adapters in
`dist/designs/` and the generation mapping in `tools/build-designs.mjs`.

The check compares all variant text, image references, and internal links against
the source pages. It also protects Original against the pre-redesign baseline.
If an intentional future user change modifies Original, update that baseline in
`tools/check-designs.mjs` after reviewing the change.

## Isolation and navigation

The design selector now navigates to real URLs. It preserves the current case,
query string and section anchor. Every internal page link stays within its design.
Browser back/forward, reload and sharing preserve the selected design via URL.
Old localStorage color preferences are ignored, so Original always remains
accessible directly. Alternate pages declare the corresponding Original page as
canonical to avoid duplicate search listings.

Kit CSS and font files are vendored locally and pinned by package-lock.json.
No runtime CDN dependency. Kit scripts are unnecessary: the used components are
CSS-only, and the selector uses native links and a small accessible disclosure.
Framework font imports are removed in favor of the local fonts. Font and framework
licenses are included alongside the assets.

Official references:
- https://getbootstrap.com/docs/5.3/getting-started/introduction/
- https://bulma.io/documentation/
- https://getuikit.com/docs/introduction
- https://semantic-ui.com/introduction/getting-started.html
