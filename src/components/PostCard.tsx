import Link from 'next/link';
import { PostMetadata } from '@/lib/posts';

interface PostCardProps {
  post: PostMetadata & { slug?: string };
}

export function PostCard({ post }: PostCardProps) {
  const slug = post.slug || '';
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article
      data-testid={`post-card-${slug}`}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        {post.title}
      </h2>
      <div className="flex flex-col gap-2 text-gray-600 dark:text-gray-400 mb-4">
        <p>By {post.author} · {formattedDate}</p>
        <div className="flex gap-2 flex-wrap">
          {post.tags.map(tag => (
            <span key={tag} className="text-sm bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        {post.excerpt}
      </p>
      <Link
        href={`/blog/${slug}`}
        data-testid={`read-more-${slug}`}
        className="inline-block text-blue-600 dark:text-blue-400 hover:underline font-semibold"
      >
        Read More →
      </Link>
    </article>
  );
}
