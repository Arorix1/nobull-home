# Design QA — Sticky Header, Rating Cleanup, and Yearly Home Care Highlight

## Comparison target

- Source visual truth: `/var/folders/c3/lxb1fts13fb2hhps_ft668ym0000gn/T/TemporaryItems/NSIRD_screencaptureui_n6sMI8/Screenshot 2026-08-13 at 10.32.41 PM.png`.
- Desktop implementation: `work/header-polish-desktop-reviews.png`.
- Mobile implementation: `work/header-polish-mobile-reviews.png` and `work/header-polish-mobile-yearly.png`.
- Side-by-side comparison: `work/header-polish-comparison.png`.
- Routes and states: homepage reviews section and services section after scrolling.
- Intended change: keep the full header fixed on desktop and mobile, show the rating once as `5.0 / 5`, remove visible dash separators from copy, and highlight Yearly Home Care in acid yellow.

## Viewport and normalization

- Source pixels: 1974 × 1280, including macOS and Chrome chrome.
- Desktop implementation: 1280 × 720 CSS pixels and screenshot pixels, device scale factor 1.
- Mobile implementation: 393 × 852 CSS pixels and screenshot pixels, device scale factor 1.
- The source and implementation were placed in one side-by-side comparison image with proportional aspect-fit normalization. Browser chrome was excluded from webpage-content judgments.

## Full-view comparison evidence

- The reference shows the reviews section with an empty black strip where the header should remain and a duplicated `5.0` plus `5.0 / 5` rating.
- The implementation keeps the complete branded header visible at the top after scrolling, preserves the original header height and navigation layout, and displays one clear `5.0 / 5` rating.
- Review cards, section typography, off-white background, black card, and acid-green quote accents remain consistent with the established design.

## Focused region comparison evidence

- Desktop header bounds were measured after scrolling: fixed position, top `0`, bottom `97`, display `flex`.
- Mobile header bounds were measured after scrolling: fixed position, top `0`, bottom `82`.
- The Yearly Home Care card was inspected at 393 × 852 and measured with an acid-green background of `rgb(223, 255, 55)`.
- The mobile page reported zero horizontal overflow, and no console errors or warnings were present.

## Required fidelity surfaces

- Fonts and typography: passed. Existing production typefaces, uppercase treatment, tracking, and scale are preserved. The rating was consolidated without introducing a new type style.
- Spacing and layout rhythm: passed. The header keeps its existing desktop and mobile geometry while remaining fixed above content. Review and service layouts retain their established spacing.
- Colors and visual tokens: passed. The Yearly Home Care highlight reuses the site's existing acid-green token; no new palette values were introduced.
- Image and brand fidelity: passed. The crooked acid-green `NB` logo and existing header branding remain unchanged.
- Copy and content: passed. The duplicate rating was removed, the surviving value reads `5.0 / 5`, and visible em-dash/double-dash separators were removed from route copy.
- Interaction: passed. Navigation, quote action, service links, sticky behavior, and the existing mobile service presentation remain functional.
- Accessibility: passed. Existing link and navigation semantics, focus behavior, and interactive targets are preserved; the change is visual and copy-level only.

## Comparison history

### Pass 1

- Source finding [P1]: the fixed header was clipped when its containing hero scrolled out of view, leaving only an empty black band.
- Source finding [P2]: the reviews heading showed a redundant large `5.0` beside `5.0 / 5`.
- Fix: allowed the hero containers to expose their fixed header, consolidated the score into one accessible text value, and retained the existing sticky-header rules for both responsive modes.

### Pass 2

- Evidence: `work/header-polish-comparison.png`, `work/header-polish-mobile-reviews.png`, and `work/header-polish-mobile-yearly.png`.
- Result: full desktop and mobile headers stay visible after scrolling; rating is shown once; Yearly Home Care is clearly highlighted; no visible dash separators, mobile overflow, or console errors remain.

## Findings

- No actionable P0, P1, P2, or P3 findings remain.

## Implementation checklist

- [x] Sticky branded header on desktop and mobile.
- [x] Single clean `5.0 / 5` rating.
- [x] Remove visible dash separators from route copy.
- [x] Acid-yellow Yearly Home Care service highlight.
- [x] Verify desktop and mobile scroll states.
- [x] Verify zero mobile overflow and zero console errors/warnings.
- [x] Compare source and implementation in one visual input.

final result: passed
