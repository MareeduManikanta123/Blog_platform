import { Post } from '@/lib/posts';
import { PostCard } from './PostCard';

interface PostListProps {
  posts: Post[];
}

export function PostList({ posts }: PostListProps) {
  return (
    <div data-testid="post-list" className="grid gap-6">
      {posts.map(post => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
