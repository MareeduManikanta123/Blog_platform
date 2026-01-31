import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface PostMetadata {
  title: string;
  date: string;
  author: string;
  tags: string[];
  excerpt: string;
  slug?: string;
}

export interface Post extends PostMetadata {
  content: string;
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs.readdirSync(postsDirectory)
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace(/\.mdx$/, ''));
}

export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    ...(data as PostMetadata),
    content,
    slug: realSlug,
  };
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map(slug => getPostBySlug(slug))
    .sort((post1, post2) => new Date(post2.date).getTime() - new Date(post1.date).getTime());
  return posts;
}

export function getPostsByPage(pageNumber: number, postsPerPage: number = 10): Post[] {
  const allPosts = getAllPosts();
  const startIndex = (pageNumber - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  return allPosts.slice(startIndex, endIndex);
}

export function getTotalPages(postsPerPage: number = 10): number {
  const allPosts = getAllPosts();
  return Math.ceil(allPosts.length / postsPerPage);
}
