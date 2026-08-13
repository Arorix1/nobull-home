# Public Website Recovery Notes

## Recovery scope

The live public site and the previous GitHub reconstruction were compared on
August 13, 2026. The old repository had one simplified page, one handwritten
stylesheet, and a single-URL sitemap. The recovered mirror now includes all 22
URLs in the live sitemap:

- Homepage, services index, pricing, home care, projects, reviews, service areas,
  about, promise, contact, and blog index.
- Pressure washing, house washing, roof cleaning, driveway cleaning, gutter
  cleaning, TV mounting, and handyman service pages.
- Four public exterior-cleaning and home-care guides.

The copy, titles, descriptions, canonical tags, keywords, Open Graph and Twitter
metadata, JSON-LD structured data, navigation, telephone and email links, service
pricing, reviews, responsive CSS, public project images, robots file, and sitemap
were recovered from the public responses.

## Static adaptation

The production host used a Vinext/React Server Components deployment runtime and
Cloudflare-injected browser code. Those deployment-specific scripts were removed
because they are not necessary for the server-rendered visual experience and
would make a static copy request private runtime endpoints that are not part of
the public source. A small local script preserves the homepage FAQ accordion.

## Publicly observable gaps and limitations

- The contact page embeds `https://os.arorix.com/f/arorixhomesolutions`. The public
  form displays required first name, last name, and primary email fields; optional
  street address and primary phone fields; a multi-service selector; a honeypot
  website field; security verification; and a submit button. The exact iframe is
  preserved, but its private storage, notification, CRM, anti-spam, and submission
  logic live in Arorix OS and were not copied or invented.
- The recovered homepage footer originally linked to `/services/roof-soft-washing`,
  which returned a public 404. The source-of-truth copy corrects that link to the
  working `/services/roof-cleaning` route, and the validator rejects unresolved
  internal links.
- The live build gave every route the homepage canonical and Open Graph URL. The
  source-of-truth copy assigns each page its own URL so search engines can index the
  service, article, and information pages independently.
- The original component source, build configuration, hosting account settings,
  private server logic, environment variables, secrets, analytics credentials,
  and deployment history cannot be reconstructed from public responses and are
  intentionally absent.
- The three public project images have "placeholder" filenames on the live host.
  The exact publicly served WebP files are included; their provenance beyond the
  public site cannot be inferred.

## Refreshing from the owned live site

Run `npm run capture` only when intentionally updating the repository to the current
public site. It rewrites every mirrored HTML page, the production stylesheet, the
three public images, `robots.txt`, and `sitemap.xml`, then strips deployment-only
runtime code. Run `npm test` afterward and visually compare desktop and mobile
screens before publishing.
