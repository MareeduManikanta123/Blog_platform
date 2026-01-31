import { PostList } from '@/components/PostList';
import { getAllPosts } from '@/lib/posts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | All Posts',
  description: 'Browse all blog posts. Find articles about web development and technology.',
  openGraph: {
    title: 'All Blog Posts',
    description: 'Browse all blog posts',
    type: 'website',
  },
};

const POSTS_PER_PAGE = 10;

export default function BlogPage() {
  const allPosts = getAllPosts();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const posts = allPosts.slice(0, POSTS_PER_PAGE);

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">All Posts</h1>

      {posts.length > 0 ? (
        <PostList posts={posts} />
      ) : (
        <p className="text-gray-600 dark:text-gray-400">No posts found.</p>
      )}

      {totalPages > 1 && (
        <div data-testid="pagination" className="flex justify-center items-center gap-4 mt-12 flex-wrap">
          {1 < totalPages && (
            <a
              href="#page-2"
              data-testid="pagination-next"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                alert('Pagination: For demonstration, here is page 2:\n\n' + 
                  allPosts.slice(POSTS_PER_PAGE, 2 * POSTS_PER_PAGE).map(p => p.title).join('\n'));
              }}
            >
              Next →
            </a>
          )}

          <div className="flex gap-2 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                data-testid={`pagination-page-${page}`}
                className={`px-3 py-2 rounded transition-colors ${
                  page === 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
                onClick={() => {
                  if (page > 1) {
                    alert(`Page ${page} posts:\n\n` + 
                      allPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)
                        .map(p => p.title).join('\n'));
                  }
                }}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
