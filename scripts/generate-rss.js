const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const RSS = require('rss');

const DOMAIN = process.env.BASE_URL || 'http://localhost:3000';
const SITE_TITLE = 'My Blog';
const SITE_DESCRIPTION = 'A high-performance, SEO-optimized blog platform built with Next.js and MDX';

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
      const { data, content } = matter(fileContents);
      
      return {
        slug,
        title: data.title,
        description: data.excerpt,
        content,
        author: data.author,
        date: new Date(data.date),
        tags: data.tags,
      };
    })
    .sort((a, b) => b.date - a.date);
}

function generateRSS() {
  const posts = getAllPosts();

  const feed = new RSS({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    feed_url: `${DOMAIN}/rss.xml`,
    site_url: DOMAIN,
    language: 'en',
    pubDate: posts.length > 0 ? posts[0].date : new Date(),
  });

  posts.forEach(post => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `${DOMAIN}/blog/${post.slug}`,
      author: post.author,
      date: post.date,
      categories: post.tags,
    });
  });

  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'rss.xml'), feed.xml({ indent: true }));
  console.log('✓ RSS feed generated: public/rss.xml');
}

generateRSS();
