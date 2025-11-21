export const prerender = true;

const routes = [
  '/',
  '/about',
  '/works',
  '/contact',
  '/fa/',
  '/fa/about',
  '/fa/works',
  '/fa/contact',
];

export function GET() {
  const updated = new Date().toISOString();
  const urlset = routes
    .map((p) => `  <url>\n    <loc>https://hawshemi.com${p}</loc>\n    <lastmod>${updated}</lastmod>\n  </url>`)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlset}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}


