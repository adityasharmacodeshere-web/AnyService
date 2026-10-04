# AnyService

**Good work. Right around the corner.**

AnyService connects households with local electricians, plumbers, carpenters and appliance service providers. The identity pairs a dependable midnight blue with repair-shop lime and warm coral, using neighbourly copy, an animated welcome, original illustrations and a small visit planner.

## Open the site

Open `index.html` in a browser and select **Press to step inside**. The welcome screen leads into the home page. Use **Plan a visit** to fill in a request, then choose **Prepare my email request** to review the details in an email app before sending. The public support address is `AnyService.support@gmail.com`.

The site uses HTML, CSS and vanilla JavaScript. It runs from its folder without a build step or runtime asset downloads.

## Visit online

- Home: <https://adityasharmacodeshere-web.github.io/AnyService/>
- Visit request: <https://adityasharmacodeshere-web.github.io/AnyService/account.html>
- Privacy notice: <https://adityasharmacodeshere-web.github.io/AnyService/privacy.html>

## Project files

- `index.html` — animated opening and responsive home page.
- `account.html` — service request form that prepares an email with the visitor's chosen details.
- `privacy.html` — plain-language notice explaining the request form and email handoff.
- `styles.css` — brand system, layouts, responsive rules, animation and reduced-motion support.
- `script.js` — welcome transition, cursor interaction, scroll effects, service picker and email request builder.
- `assets/anyservice-mark.svg` — original brand mark and favicon.
- `SUBMISSION.md` — brand concept, technology and asset credits.
- `ASSETS.md` — asset provenance and offline-use notes.

## Design notes

Midnight blue gives the service a dependable base. Repair-shop lime and warm coral bring friendliness and optimism. Rounded system typography, compact mono labels and candid copy keep the brand approachable without loading external fonts.

The welcome screen introduces the mark and motto before lifting away. On the home page, content reveals as it enters view and a progress strip follows scrolling. The hero illustration leans toward a fine pointer; key buttons respond to pointer movement. Touchscreens skip cursor effects and the page respects reduced-motion preferences.

Service cards and visit choices update one shared, keyboard-operable summary. Choices carry through to the request form. Browser validation checks the address and requires at least one reply route: mobile or email. The request action opens a pre-addressed email draft so the visitor can review or change it before sending.

## Publish with GitHub Pages

The static files can be served from the repository root. In GitHub, open **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/(root)`, then save. The site URL will be `https://<account>.github.io/AnyService/`.

## Accessibility and performance

The pages use semantic landmarks, labeled form controls, keyboard focus styles, live status text, responsive layouts and reduced-motion handling. No image, font or script is fetched from a third-party asset host at runtime.

## License

The original source and vector graphics may be used and adapted under the MIT License. See `LICENSE`.
