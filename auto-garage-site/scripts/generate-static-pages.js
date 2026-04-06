/**
 * Post-build script: generates per-route HTML files with correct meta tags,
 * canonical URLs, and structured data so Google indexes each page properly.
 *
 * GitHub Pages serves these as real 200 responses (e.g. /parts/index.html),
 * avoiding the 404→redirect hack that blocks crawlers.
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, "../dist");

const template = readFileSync(resolve(distDir, "index.html"), "utf-8");

const pages = [
  {
    path: "parts",
    title: "Parts for Sale – EPO Commercials",
    description:
      "Browse heavy vehicle parts for sale at EPO Commercials. Bus, truck and HGV parts available. Contact us for availability and pricing.",
    canonical: "https://www.epocommercials.ie/parts",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Heavy Vehicle Parts for Sale",
      description:
        "Browse bus, truck and HGV parts available at EPO Commercials.",
      url: "https://www.epocommercials.ie/parts",
      isPartOf: {
        "@type": "WebSite",
        name: "EPO Commercials",
        url: "https://www.epocommercials.ie",
      },
    },
  },
  {
    path: "contact",
    title: "Contact Us – EPO Commercials",
    description:
      "Get in touch with EPO Commercials. 24/7 breakdown assistance, bus and truck repair enquiries. Located at Oldmill Industrial Estate, Co. Kildare.",
    canonical: "https://www.epocommercials.ie/contact",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact EPO Commercials",
      description:
        "Get in touch with EPO Commercials for bus, truck and heavy vehicle repair enquiries.",
      url: "https://www.epocommercials.ie/contact",
      mainEntity: {
        "@type": "AutoRepair",
        name: "EPO Commercials",
        telephone: "+353877210448",
        email: "info@epocommercials.ie",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Oldmill Industrial Estate",
          addressLocality: "Kill",
          addressRegion: "Co. Kildare",
          addressCountry: "IE",
        },
      },
    },
  },
  {
    path: "privacy",
    title: "Privacy Policy – EPO Commercials",
    description:
      "Privacy policy for EPO Commercials. How we collect, use and protect your personal data under GDPR.",
    canonical: "https://www.epocommercials.ie/privacy",
    structuredData: null,
  },
];

// BreadcrumbList for all sub-pages
function breadcrumb(page) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.epocommercials.ie",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: page.title.split(" – ")[0],
        item: page.canonical,
      },
    ],
  };
}

function replaceMeta(html, page) {
  // Title
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${page.title}</title>`
  );

  // Meta description
  html = html.replace(
    /(<meta name="description" content=")[^"]*(")/,
    `$1${page.description}$2`
  );

  // Canonical
  html = html.replace(
    /(<link rel="canonical" href=")[^"]*(")/,
    `$1${page.canonical}$2`
  );

  // OG tags
  html = html.replace(
    /(<meta property="og:title" content=")[^"]*(")/,
    `$1${page.title}$2`
  );
  html = html.replace(
    /(<meta property="og:description" content=")[^"]*(")/,
    `$1${page.description}$2`
  );
  html = html.replace(
    /(<meta property="og:url" content=")[^"]*(")/,
    `$1${page.canonical}$2`
  );

  // Twitter tags
  html = html.replace(
    /(<meta name="twitter:title" content=")[^"]*(")/,
    `$1${page.title}$2`
  );
  html = html.replace(
    /(<meta name="twitter:description" content=")[^"]*(")/,
    `$1${page.description}$2`
  );

  // Replace the existing structured data with page-specific data
  const schemas = [breadcrumb(page)];
  if (page.structuredData) schemas.push(page.structuredData);

  const newScripts = schemas
    .map(
      (s) =>
        `<script type="application/ld+json">\n    ${JSON.stringify(s, null, 2).replace(/\n/g, "\n    ")}\n    </script>`
    )
    .join("\n    ");

  html = html.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    newScripts
  );

  return html;
}

for (const page of pages) {
  const dir = resolve(distDir, page.path);
  mkdirSync(dir, { recursive: true });
  const html = replaceMeta(template, page);
  writeFileSync(resolve(dir, "index.html"), html);
  console.log(`  ✓ ${page.path}/index.html`);
}

// Update sitemap lastmod to today
const today = new Date().toISOString().slice(0, 10);
const sitemapPath = resolve(distDir, "sitemap.xml");
let sitemap = readFileSync(sitemapPath, "utf-8");
sitemap = sitemap.replace(/<lastmod>[^<]*<\/lastmod>/g, `<lastmod>${today}</lastmod>`);
writeFileSync(sitemapPath, sitemap);
console.log(`  ✓ sitemap.xml (lastmod → ${today})`);

console.log("Done: static pages generated.");
