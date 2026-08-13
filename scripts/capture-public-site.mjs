import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { routes } from "./routes.mjs";

const origin = "https://nobullhome.com";
const root = process.cwd();
const publicImages = [
  "placeholder-driveway-cleaning.webp",
  "placeholder-house-softwash.webp",
  "placeholder-gutter-cleaning.webp",
];

const runtimeScriptMarkers = [
  "__VINEXT_RSC_PARAMS__",
  "__VINEXT_RSC_NAV__",
  "__VINEXT_RSC_CHUNKS__",
  "__VINEXT_RSC_DONE__",
  "cdn-cgi/challenge-platform",
  "__CF$cv$params",
];

function toOutputFile(route) {
  return route === "/"
    ? path.join(root, "index.html")
    : path.join(root, route.slice(1), "index.html");
}

function makeStatic(html, route) {
  const closingHtml = html.indexOf("</html>");
  let clean = closingHtml === -1 ? html : html.slice(0, closingHtml + 7);

  clean = clean.replace(/<link\b[^>]*rel=["']modulepreload["'][^>]*\/?>/gi, "");
  clean = clean.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, (script) => {
    const isFrameworkRuntime = runtimeScriptMarkers.some((marker) => script.includes(marker));
    const isHydrationEntry = /\bid=["']_R_["']/.test(script);
    return isFrameworkRuntime || isHydrationEntry ? "" : script;
  });

  clean = clean.replace(
    "</body>",
    '<script src="/assets/site.js" defer></script></body>',
  );

  // Correct public-source defects while adapting the captured pages.
  const canonicalUrl = `${origin}${route}`;
  clean = clean.replaceAll('href="/services/roof-soft-washing"', 'href="/services/roof-cleaning"');
  if (/<meta property="og:url" content="[^"]*"\/>/.test(clean)) {
    clean = clean.replace(/<meta property="og:url" content="[^"]*"\/>/, `<meta property="og:url" content="${canonicalUrl}"/>`);
  } else {
    clean = clean.replace("</head>", `<meta property="og:url" content="${canonicalUrl}"/></head>`);
  }
  clean = clean.replace(/<link rel="canonical" href="[^"]*"\/>/, `<link rel="canonical" href="${canonicalUrl}"/>`);

  return `${clean.trim()}\n`;
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: { "user-agent": "NoBullHomeSourceMirror/1.0" },
    redirect: "follow",
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${url}`);
  }
  return response.text();
}

await rm(path.join(root, "about"), { recursive: true, force: true });
await rm(path.join(root, "blog"), { recursive: true, force: true });
await rm(path.join(root, "contact"), { recursive: true, force: true });
await rm(path.join(root, "home-care"), { recursive: true, force: true });
await rm(path.join(root, "pricing"), { recursive: true, force: true });
await rm(path.join(root, "projects"), { recursive: true, force: true });
await rm(path.join(root, "promise"), { recursive: true, force: true });
await rm(path.join(root, "reviews"), { recursive: true, force: true });
await rm(path.join(root, "service-areas"), { recursive: true, force: true });
await rm(path.join(root, "services"), { recursive: true, force: true });

for (const route of routes) {
  const output = toOutputFile(route);
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, makeStatic(await fetchText(`${origin}${route}`), route));
  console.log(`captured ${route}`);
}

await mkdir(path.join(root, "assets"), { recursive: true });
await writeFile(
  path.join(root, "assets", "index-DDtQlzmV.css"),
  await fetchText(`${origin}/assets/index-DDtQlzmV.css`),
);
await writeFile(path.join(root, "robots.txt"), await fetchText(`${origin}/robots.txt`));
await writeFile(path.join(root, "sitemap.xml"), await fetchText(`${origin}/sitemap.xml`));

await mkdir(path.join(root, "images"), { recursive: true });
for (const image of publicImages) {
  const response = await fetch(`${origin}/images/${image}`);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${image}`);
  await writeFile(path.join(root, "images", image), Buffer.from(await response.arrayBuffer()));
}

console.log(`captured ${routes.length} routes, the public stylesheet, and ${publicImages.length} images`);
