const fs = require('fs');
const path = require('path');

const DOMAIN = process.env.BASE_URL || 'http://localhost:3000';

function getAllPosts() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs.readdirSync(postsDirectory)
    .filter(file => file.endsWith('.mdx'))
    .map(file => {
      const slug = file.replace(/\.mdx$/, '');
      const filePath = path.join(postsDirectory, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      
      const dateMatch = fileContents.match(/date:\s*['"](.+?)['"]/);
      const date = dateMatch ? dateMatch[1] : new Date().toISOString();
      
      return { slug, date };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

function generateSitemap() {
  const posts = getAllPosts();
  
  const urls = [
    {
      loc: DOMAIN,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: '1.0',
    },
    {
      loc: `${DOMAIN}/blog`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'daily',
      priority: '0.9',
    },
    ...posts.map(post => ({
      loc: `${DOMAIN}/blog/${post.slug}`,
      lastmod: post.date.split('T')[0],
      changefreq: 'monthly',
      priority: '0.8',
    })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log('✓ Sitemap generated: public/sitemap.xml');
}

generateSitemap();
