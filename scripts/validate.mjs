import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { routes } from "./routes.mjs";

const root = process.cwd();
const failures = [];

function outputFile(route) {
  return route === "/"
    ? path.join(root, "index.html")
    : path.join(root, route.slice(1), "index.html");
}

for (const route of routes) {
  const file = outputFile(route);
  let html;
  try {
    html = await readFile(file, "utf8");
  } catch {
    failures.push(`${route}: missing ${path.relative(root, file)}`);
    continue;
  }

  for (const required of ["<title>", 'name="description"', "<h1", "/assets/index-DDtQlzmV.css", "/assets/sticky-header.css", '<link rel="icon" type="image/svg+xml" href="/favicon.svg"/>']) {
    if (!html.includes(required)) failures.push(`${route}: missing ${required}`);
  }
  if (html.includes("__VINEXT_RSC_")) failures.push(`${route}: still includes deployment-only RSC state`);
  if (html.includes("arorixhomes@gmail.com")) failures.push(`${route}: still includes the old contact email`);
  if (!html.includes("nobullky@gmail.com")) failures.push(`${route}: missing the current contact email`);
  const visibleText = html
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ");
  if (/—|--/.test(visibleText)) failures.push(`${route}: visible copy still includes dash-style punctuation`);
  if (route === "/") {
    for (const required of ["/assets/mobile-home.css", "service-track", "Driveway cleaning", "TV mounting", "Handyman services", "Year-round home care", 'class="service yearlyService"', '<div class="score"><b>5 / 5</b><span>TRUSTED ACROSS CENTRAL KENTUCKY</span></div>']) {
      if (!html.includes(required)) failures.push(`/: missing mobile home requirement ${required}`);
    }
    if (html.includes('<div class="score"><b>5.0</b><span>5.0 / 5') || html.includes("5.0 / 5")) {
      failures.push("/: duplicate customer rating remains");
    }
  }
  if (route === "/contact" && !html.includes('src="https://os.arorix.com/f/arorixhomesolutions"')) {
    failures.push("/contact: missing the live Arorix OS quote form iframe");
  }
  const expectedUrl = `https://nobullhome.com${route}`;
  if (!html.includes(`<link rel="canonical" href="${expectedUrl}"/>`)) {
    failures.push(`${route}: incorrect canonical URL`);
  }
  if (!html.includes(`<meta property="og:url" content="${expectedUrl}"/>`)) {
    failures.push(`${route}: incorrect Open Graph URL`);
  }

  for (const match of html.matchAll(/(?:href|src)="([^"#][^"]*)"/g)) {
    const href = match[1];
    if (/^(https?:|mailto:|tel:)/.test(href)) continue;
    const targetPath = href.split(/[?#]/)[0];
    if (!targetPath) continue;
    const target = targetPath.startsWith("/") ? targetPath : path.join(route, targetPath);
    try {
      const file = path.extname(target)
        ? path.join(root, target.replace(/^\/+/, ""))
        : outputFile(target);
      await access(file);
    } catch {
      failures.push(`${route}: unresolved internal link ${href}`);
    }
  }
}

const stickyHeaderCss = await readFile(path.join(root, "assets/sticky-header.css"), "utf8");
if (!stickyHeaderCss.includes("position: fixed")) failures.push("sticky header is not fixed to the viewport");
if (!stickyHeaderCss.includes("overflow: visible")) failures.push("sticky header can still be clipped by page heroes");

for (const requiredFile of [
  "assets/index-DDtQlzmV.css",
  "assets/mobile-home.css",
  "assets/sticky-header.css",
  "assets/site.js",
  "favicon.svg",
  "images/placeholder-driveway-cleaning.webp",
  "images/placeholder-house-softwash.webp",
  "images/placeholder-gutter-cleaning.webp",
  "robots.txt",
  "sitemap.xml",
]) {
  try {
    await access(path.join(root, requiredFile));
  } catch {
    failures.push(`missing ${requiredFile}`);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Validated ${routes.length} routes, metadata, assets, and internal links.`);
