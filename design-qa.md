# Design QA — Full-Card Links, Rating Format, and FAQ Accent

## Comparison target

- Source visual truth: `/var/folders/c3/lxb1fts13fb2hhps_ft668ym0000gn/T/TemporaryItems/NSIRD_screencaptureui_clyyzA/Screenshot 2026-08-13 at 10.59.24 PM.png` and `/var/folders/c3/lxb1fts13fb2hhps_ft668ym0000gn/T/TemporaryItems/NSIRD_screencaptureui_uKe5A3/Screenshot 2026-08-13 at 10.59.36 PM.png`.
- Desktop implementation: `work/card-rating-desktop.png` and `work/faq-accent-desktop.png`.
- Mobile implementation: `work/card-rating-mobile.png`.
- Combined comparison: `work/card-rating-faq-comparison.png`.
- State: homepage reviews, FAQ, and service-card hover/click states.

## Viewport and normalization

- Source screenshots: 1974 × 1280 pixels, including Safari and macOS chrome.
- Desktop implementation: 1440 × 900 CSS pixels and screenshot pixels, device scale factor 1.
- Mobile implementation: 393 × 852 CSS pixels and screenshot pixels, device scale factor 1.
- The desktop source and implementation pairs were proportionally aspect-fit into one 1800 × 1200 comparison input. Browser chrome was excluded from webpage-content judgments.

## Full-view comparison evidence

- The review section retains the existing branded composition while replacing the mixed `5.0 / 5` expression with a single, compact `5 / 5` block.
- The rating label now sits below the number in a neutral dark gray instead of competing on the same line in brown.
- The FAQ keeps its established two-column structure while replacing the muddy olive text and symbols with black type, acid-green underline, and acid-green control blocks.

## Focused region comparison evidence

- The first service card was hovered at its center, away from the bottom link. Its full hover transform and acid-green shadow activated.
- Clicking the center of that card navigated to `/services/pressure-washing`, proving the full surface is interactive.
- The link remains the semantic focus target; the card receives a visible focus outline through `:focus-within`.
- At 393 × 852, the review section has zero horizontal overflow and the sticky header does not cover the section after anchor scrolling.

## Required fidelity surfaces

- Fonts and typography: passed. Existing production font families, uppercase hierarchy, weights, and tracking remain unchanged. The rating is now optically simpler and less crowded.
- Spacing and layout rhythm: passed. Rating number and trust label use an 8-pixel vertical gap. Existing card, review, and FAQ spacing is preserved.
- Colors and visual tokens: passed. Brown and olive accents in the named regions were replaced with the existing `--ink` and `--acid` brand tokens.
- Image quality and asset fidelity: passed. No image assets were added, removed, or replaced in this change.
- Copy and content: passed. Ratings now use `5 / 5` consistently on the homepage and reviews page.
- Interaction and accessibility: passed. Every homepage service card is clickable across its full area while retaining its real anchor, destination, keyboard focus, and visible focus state.
- Responsiveness: passed. Desktop and 393 × 852 mobile layouts were checked; mobile reports zero page-width overflow.

## Comparison history

### Pass 1

- Finding [P2]: the mobile review anchor could place the rating beneath the sticky header.
- Fix: added responsive `scroll-margin-top` values for anchored sections.

### Pass 2

- Evidence: `work/card-rating-mobile.png`.
- Result: the review label, heading, complete `5 / 5` rating, and trust label all begin below the sticky header with no overlap.

## Findings

- No actionable P0, P1, P2, or P3 findings remain.

## Primary interactions tested

- Full service-card hover state.
- Full service-card center click and destination navigation.
- Sticky header at scrolled desktop and mobile states.
- Reviews and FAQ anchor positioning.
- FAQ open/closed control styling.
- Console errors and warnings: none.

## Implementation checklist

- [x] Full-card service links.
- [x] `5 / 5` rating format everywhere visible.
- [x] Clean stacked rating layout.
- [x] Replace muddy olive/brown accents with No Bull brand tokens.
- [x] Preserve keyboard focus and link semantics.
- [x] Verify desktop and mobile rendering.
- [x] Compare source and implementation in one visual input.

final result: passed
