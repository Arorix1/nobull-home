# Design QA — No Bull Home Services Public Mirror

## Comparison target

- Source visual truth URL: `https://nobullhome.com`.
- Source screenshot path: local QA artifact `source-captures/` (not committed).
- Implementation URL: `http://127.0.0.1:4173`.
- Implementation screenshot path: local QA artifact `implementation-captures/`
  (not committed).
- Route parity evidence: local QA artifact `implementation-captures/route-parity.json`.
- Side-by-side visual evidence: local QA artifact `comparisons/`.
- State: public, signed-out desktop and mobile pages; homepage FAQ initial and second-item-open states; contact form loaded in its public iframe.

## Viewports and normalization

- Mobile homepage source and implementation: 390 × 844 CSS pixels, 390 × 844
  screenshot pixels, device pixel ratio 1. Source and implementation used the same
  in-app browser tab sequentially, with identical crop and scroll position.
- Desktop homepage source and implementation: 1440 × 900 CSS pixels, 1440 × 900
  screenshot pixels, device pixel ratio 1, identical crop and state.
- Focused projects and contact comparisons: 1280 × 720 CSS pixels, 1280 × 720
  screenshot pixels, device pixel ratio 1, identical crop and state.
- No density rescaling or device-frame normalization was required.

## Full-view comparison evidence

- All 22 public sitemap routes were scrolled in 700-pixel steps on the live site.
  The mobile pass captured 153 viewport screenshots at 390 × 844.
- A subsequent same-tab live/local route pass compared title, description,
  canonical URL, H1 text, page height, link count, and image source list at 1280 ×
  720. All 22 route records were exactly equal.
- Full-page desktop captures for the homepage (1440 × 8437), pressure-washing page
  (1440 × 4772), and a blog article (1440 × 3533) were pixel-identical.
- Projects and contact were additionally normalized and compared above the fold at
  1280 × 720 because their project images and external iframe make long-page browser
  capture timing variable. Projects were pixel-identical. Contact's mean channel
  delta was 0.000040 with a maximum two-level channel difference, which is visually
  indistinguishable.

## Focused region comparison evidence

- Homepage mobile hero: live and local side-by-side in
  `comparisons/compare-home-mobile.png`. Composition, typography, wrapping,
  controls, spacing, and colors align. The mean channel delta of 2.524 is confined
  to the CSS-generated fractal grain texture.
- Homepage desktop hero: live and local side-by-side in
  `comparisons/compare-home-desktop.png`. Navigation, hero grid, bull card,
  service ribbon, type hierarchy, and spacing align. The mean channel delta of
  3.619 is likewise generated grain variation.
- Projects top: `comparisons/compare-projects-desktop-top.png`, exact pixels.
- Contact top: `comparisons/compare-contact-desktop-top.png`, visually exact.

## Required fidelity surfaces

- Fonts and typography: passed. The exact public stylesheet is reused, including
  the production font stacks, weights, sizes, line heights, tracking, hierarchy,
  wrapping, and fallback behavior. No unavailable font substitution was needed.
- Spacing and layout rhythm: passed. Same-view route heights, hero and nav boxes,
  grids, gaps, margins, padding, borders, radii, and section order match at desktop
  and mobile sizes. No clipping or persistent-control overflow was observed.
- Colors and visual tokens: passed. The exact public CSS preserves the black,
  off-white, acid green, gray, border, opacity, shadow, and generated grain values.
- Image quality and asset fidelity: passed. The three exact 1536 × 1024 public WebP
  project assets are local files with their original bytes and crops. No image,
  logo, icon, illustration, or decorative asset was replaced with a generated or
  approximate substitute.
- Copy and content: passed. All public page copy, navigation, pricing, testimonials,
  service areas, article content, metadata, and JSON-LD were retained from the live
  responses.
- Icons and decorative marks: passed. The source site implements its brand marks and
  decoration in its public HTML/CSS; that same public markup and stylesheet are
  preserved rather than redrawn.
- States and interactions: passed. Homepage FAQ item two opens, item one closes,
  `aria-expanded` updates, and plus/minus markers update. Navigation reaches the
  correct local routes. The Arorix OS quote iframe loads its public form fields.
- Accessibility: passed for source parity. Semantic headings, links, buttons,
  accessible navigation naming, iframe title, image alt text, and FAQ expansion
  state are preserved. This report does not claim that pre-existing live-site
  accessibility choices exceed parity.

## Findings

No actionable P0, P1, or P2 visual or interaction mismatches remain.

- Corrected source issue: the recovered homepage footer originally linked to
  `/services/roof-soft-washing`, which returned 404. It now links to the working
  `/services/roof-cleaning` route and is covered by strict internal-link validation.
- Accepted external dependency: the contact form is served by
  `https://os.arorix.com/f/arorixhomesolutions`. Its public iframe and visible
  behavior are preserved, but its private submission backend is outside this repo.
- Accepted rendering variance: CSS fractal-noise backgrounds vary slightly between
  sequential screenshots while geometry, copy, type, and palette remain aligned.

## Comparison history

1. Baseline audit found a P1 scope gap: the repository contained only a simplified
   homepage, a handwritten stylesheet, and a one-URL sitemap. Fix: captured all 22
   sitemap routes, public metadata, structured data, navigation, and content.
2. Asset audit found a P1 omission: three lazy-loaded project WebP files were not in
   the initial homepage inventory. Fix: bundled the exact public files and added
   static-asset validation. Post-fix projects comparisons use the same image sources.
3. Runtime audit found a P1 portability issue: production Vinext/RSC hydration and
   Cloudflare scripts depended on inaccessible deployment runtime behavior. Fix:
   retained the server-rendered HTML/CSS, removed deployment-only scripts, and added
   a local FAQ controller. Post-fix FAQ, navigation, and console checks passed.
4. Contact audit found a P1 completeness issue: the quote experience is an external
   iframe rather than page-level form fields. Fix: preserved the exact public iframe
   URL and verified the visible form. The private backend remains documented.
5. Final normalized pass: 22/22 route records matched, focused projects/contact
   screenshots matched, responsive homepage comparisons matched, primary
   interactions passed, and the browser console reported no warnings or errors.

## Implementation checklist

- [x] All public routes and SEO metadata present.
- [x] Production styling and public image assets local.
- [x] Desktop and 390-pixel mobile layouts verified.
- [x] FAQ, navigation, telephone/email links, and quote iframe verified.
- [x] `npm test` route, asset, and internal-link validation passed.
- [x] No actionable P0/P1/P2 findings remain.

## Follow-up polish

Replace the three publicly served placeholder project images and their placeholder
labels when the owner supplies real No Bull project photos.

final result: passed
