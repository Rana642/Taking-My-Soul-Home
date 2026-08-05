import type { Metadata } from 'next';
import { BlogPage } from '@/src/components/pages/BlogPage';
import { pageMetadata } from '@/src/lib/site';
import { getAllPosts } from '@/src/lib/wp';

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: 'Blog',
  description:
    'Articles on Quranic reflections, the lives of the Prophets, daily wazaif, and spiritual growth to revive the heart.',
  path: '/blog',
});

export default async function Page() {
  const posts = await getAllPosts();
  return <BlogPage posts={posts} />;
}
