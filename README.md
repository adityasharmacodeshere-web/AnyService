# AnyService

**Good work. Right around the corner.**

AnyService is an original brand concept for finding dependable local electricians, plumbers, carpenters and appliance-care professionals. This is a lightweight, static website prototype made for an offline presentation: it has no server, tracking, external fonts, image downloads or third-party JavaScript.

## Open it

Open `index.html` in a browser. The site runs directly from its folder; no install or build step is needed. Press **Press to step inside** on the animated opening screen to reveal the home page. `account.html` is the front-end-only profile and sign-in page.

## What's here

- `index.html` — launch screen and responsive brand website.
- `account.html` — sign-in preview and detailed service-profile form.
- `styles.css` — visual system, layout, responsive rules, animations and reduced-motion support.
- `script.js` — launch interaction, cursor tilt, magnetic buttons, scroll progress, service picker, mobile menu, account tabs and demo-only form feedback.
- `assets/anyservice-mark.svg` — custom AnyService symbol and browser icon.
- `SUBMISSION.md` — concise concept, technology and asset credits.
- `ASSETS.md` — asset provenance and offline-use notes.

## How to explain the design

### Identity

Midnight blue gives the service a dependable, practical base. Repair-shop lime and warm coral bring the friendliness and optimism of a nearby person who can help. A rounded system-font wordmark, small mono labels and candid copy make the site feel like an established neighborhood brand without loading external fonts.

### Launch and scroll motion

The welcome screen introduces the custom mark and line before it lifts away. On the main page, section content reveals as it enters view; the thin red progress line follows the document scroll with the browser's CSS scroll timeline and has a small JavaScript fallback. The page also respects `prefers-reduced-motion`.

### Cursor and picker

On a fine pointer, the hero illustration leans slightly toward the cursor and picks up a soft coral light; key buttons move a few pixels toward it. Touchscreens skip those effects. Service cards and visit choices update one shared, keyboard-operable visit summary, which carries a preselected service to the profile form.

### Account prototype

The join tab asks for contact, house or flat number, society, area, city, district, state and PIN code, plus an optional job note. The sign-in tab demonstrates where a phone/email and access code would go. Browser validation works; no server, authentication, OTP delivery, storage or data transmission is implemented. The form makes this clear before a visitor enters details.

## Publish with GitHub Pages

This is a static site, so GitHub Pages can serve it directly from the repository root. In the repository's **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/(root)`, then save. The site's URL will be `https://<account>.github.io/AnyService/`; allow a few minutes for the first deployment. Open both the home page and the service-profile page once it is live.

## Accessibility and performance

Semantic landmarks and headings, visible keyboard focus, labeled fields, status messages, keyboard-operable controls, responsive layouts, a mobile menu and reduced-motion handling are included. No network assets are required at runtime. The page is designed to stay quick on a phone, but run Lighthouse on the target deployment before presenting if you want a measured score.

## License

The original prototype source and custom vector graphics in this repository may be used and adapted under the MIT License. See `LICENSE`.

