import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogPostDetailView } from '@/src/components/BlogPostDetailView';
import { JsonLd } from '@/src/lib/JsonLd';
import { blogPostingSchema, breadcrumbSchema } from '@/src/lib/schema';
import { pageMetadata } from '@/src/lib/site';
import { getAllPosts, getPostBySlug } from '@/src/lib/wp';

export const revalidate = 300;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.featuredImage,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([getPostBySlug(slug), getAllPosts()]);
  if (!post) notFound();

  const related = allPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          blogPostingSchema(post),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <BlogPostDetailView post={post} related={related} />
    </>
  );
}
