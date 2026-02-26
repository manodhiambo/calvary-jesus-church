import { NextApiRequest, NextApiResponse } from 'next';

const SITE_URL = 'https://cjc.org';

const staticPages = [
  { url: '/', changefreq: 'daily', priority: '1.0' },
  { url: '/about', changefreq: 'monthly', priority: '0.8' },
  { url: '/services', changefreq: 'weekly', priority: '0.9' },
  { url: '/ministries', changefreq: 'monthly', priority: '0.7' },
  { url: '/events', changefreq: 'daily', priority: '0.9' },
  { url: '/events/upcoming', changefreq: 'daily', priority: '0.8' },
  { url: '/events/calendar', changefreq: 'daily', priority: '0.7' },
  { url: '/resources', changefreq: 'weekly', priority: '0.8' },
  { url: '/resources/sermons', changefreq: 'weekly', priority: '0.8' },
  { url: '/resources/bible-study', changefreq: 'weekly', priority: '0.7' },
  { url: '/resources/prayer', changefreq: 'monthly', priority: '0.6' },
  { url: '/contact', changefreq: 'monthly', priority: '0.7' },
  { url: '/give', changefreq: 'monthly', priority: '0.6' },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  const now = new Date().toISOString().split('T')[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(page => `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400');
  res.send(xml);
}
