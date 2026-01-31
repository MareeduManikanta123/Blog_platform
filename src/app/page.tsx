import { getAllPosts } from '@/lib/posts';
import { PostList } from '@/components/PostList';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home | My Blog',
  description: 'Welcome to my blog. Read my latest posts about web development and technology.',
  openGraph: {
    title: 'Home',
    description: 'Welcome to my blog',
    type: 'website',
  },
};

export default function Home() {
  const allPosts = getAllPosts();
  const recentPosts = allPosts.slice(0, 5);

  return (
    <div>
      <section className="mb-12">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to My Blog
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Exploring web development, Next.js, and modern technologies.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Recent Posts
        </h2>
        {recentPosts.length > 0 ? (
          <PostList posts={recentPosts} />
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No posts yet. Check back soon!</p>
        )}
        {recentPosts.length > 0 && (
          <div className="mt-8 text-center">
            <a
              href="/blog"
              className="inline-block text-blue-600 dark:text-blue-400 hover:underline font-semibold text-lg"
            >
              View All Posts →
            </a>
          </div>
        )}
      </section>
    </div>
  );
}
