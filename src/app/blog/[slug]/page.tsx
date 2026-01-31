import { getPostSlugs, getPostBySlug, getAllPosts } from '@/lib/posts';
import { renderMarkdown } from '@/lib/markdown';
import type { Metadata } from 'next';
import Link from 'next/link';

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map(slug => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  return {
    title: `${post.title} | My Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);
  const htmlContent = await renderMarkdown(post.content);
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex(p => p.slug === params.slug);
  const previousPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return (
    <article data-testid="blog-post" className="max-w-3xl mx-auto">
      <header className="mb-8">
        <h1 data-testid="post-title" className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {post.title}
        </h1>
        <div className="flex flex-col gap-3 text-gray-600 dark:text-gray-400 mb-6">
          <p>
            By <span className="font-semibold">{post.author}</span> · {formattedDate}
          </p>
          <div className="flex gap-2 flex-wrap">
            {post.tags.map(tag => (
              <span key={tag} className="text-sm bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div
        data-testid="post-content"
        className="prose prose-invert max-w-none mb-12 text-gray-900 dark:text-white"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      <nav className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-8">
        <div className="grid grid-cols-2 gap-6">
          {previousPost && (
            <Link
              href={`/blog/${previousPost.slug}`}
              className="text-left p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">← Previous Post</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {previousPost.title}
              </p>
            </Link>
          )}
          {nextPost && (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="text-right p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Next Post →</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {nextPost.title}
              </p>
            </Link>
          )}
        </div>
      </nav>

      <div className="mt-12 text-center">
        <Link
          href="/blog"
          className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
        >
          ← Back to All Posts
        </Link>
      </div>
    </article>
  );
}
