# Design QA — Mobile Homepage Organization and Service Ticker

## Comparison target

- Source visual truth path: `/Users/seanc60__/Downloads/Pressure Washing Lexington KY  No Bull Home Services.png`.
- Implementation screenshot path: `work/mobile-home-implementation-pass2.png`.
- Side-by-side comparison path: `work/mobile-home-qa-comparison-pass2.png`.
- Route: homepage, initial mobile state at the top of the page.
- Intended change: organize the mobile hero while preserving the existing No Bull visual language, and expose every service through a horizontally moving neon banner.

## Viewport and normalization

- Source pixels: 1320 × 2868, including iPhone status and Safari browser chrome.
- Source normalized copy: 393 × 852 pixels at `work/mobile-home-source-normalized.png`.
- Implementation: 393 × 852 CSS pixels and 393 × 852 screenshot pixels.
- Device scale factor: 1 for the implementation capture.
- Density normalization: the source was proportionally downsampled to the implementation viewport. Safari and iPhone chrome were excluded from app-content judgments.

## Full-view comparison evidence

- The side-by-side comparison shows the same black, off-white, gray, and acid-green visual system as the reference.
- The implementation intentionally keeps the previously requested sticky header visible. The headline is reduced enough to avoid the clipping shown in the source while preserving the same aggressive uppercase hierarchy.
- The hero content is now a single compact vertical flow: headline, supporting copy, quote action, secondary link, trust points, service ticker, then proof stats.
- The neon service banner enters within the first phone viewport, and the first proof row is visible immediately below it.

## Focused region comparison evidence

- No additional crop was required because the 393-pixel comparison keeps the headline, CTA, trust row, ticker text, and proof labels legible at their rendered size.
- The ticker was also inspected in the browser over time: its computed transform changed while running, confirming visible horizontal motion rather than a static clipped row.

## Required fidelity surfaces

- Fonts and typography: passed. Existing production typefaces, weights, uppercase treatment, tracking, and optical hierarchy are preserved. Mobile headline sizing and wrapping are intentionally tightened to prevent cropping.
- Spacing and layout rhythm: passed. The mobile hero no longer inherits a desktop-style minimum height. Content uses consistent 20-pixel side gutters, compact vertical spacing, a two-column trust grid, and aligned proof cells. No page-width overflow was detected.
- Colors and visual tokens: passed. Existing ink, paper, gray, acid-green, border, and shadow tokens are reused without introducing a new palette.
- Image quality and asset fidelity: passed. This section contains no raster imagery or custom icon assets. Existing brand marks remain unchanged.
- Copy and content: passed. Core hero copy and calls to action are unchanged. The ticker now includes all eight service categories: pressure washing, house soft wash, roof cleaning, driveway cleaning, gutter cleaning, TV mounting, handyman services, and year-round home care.
- Interaction and motion: passed. The ticker loops continuously, duplicates are hidden from accessibility APIs, reduced-motion users receive a manually scrollable row, and the sticky quote action remains visible.
- Accessibility: passed. The services region has an accessible label, duplicate ticker content is `aria-hidden`, motion respects `prefers-reduced-motion`, and existing navigation and CTA semantics remain intact.

## Comparison history

### Pass 1

- Finding [P2]: the first organized version still kept the proof stats below the initial 393 × 852 viewport.
- Evidence: `work/mobile-home-implementation-pass1.png` and `work/mobile-home-qa-comparison-pass1.png`.
- Fix: reduced mobile hero top and bottom padding, tightened trust-row spacing, and removed the redundant location eyebrow on mobile only.

### Pass 2

- Post-fix evidence: `work/mobile-home-implementation-pass2.png` and `work/mobile-home-qa-comparison-pass2.png`.
- Result: the neon ticker and first proof row now appear in the initial viewport; the headline, supporting copy, CTA, secondary action, and trust points remain readable with no overlap or horizontal page overflow.
- Browser checks: ticker animation running, all eight services present, sticky header fixed at the top, quote CTA available, primary page link functional, and no console errors or warnings.

## Findings

- No actionable P0, P1, or P2 findings remain.
- P3 follow-up: animation speed can be tuned later if real-device feedback suggests a slower or faster pass.

## Implementation checklist

- [x] Compact mobile hero flow.
- [x] Preserve existing desktop layout.
- [x] Include all eight services.
- [x] Add seamless horizontal ticker motion.
- [x] Add reduced-motion/manual-scroll fallback.
- [x] Organize trust and proof content.
- [x] Verify 393 × 852 layout, motion, overflow, sticky header, and console state.

final result: passed
