import Link from 'next/link';

export function Navigation() {
  return (
    <nav data-testid="navigation" className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link href="/" data-testid="nav-logo" className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
            Blog
          </Link>
          <div className="hidden md:flex gap-6">
            <Link href="/" data-testid="nav-home" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/blog" data-testid="nav-blog" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              All Posts
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
