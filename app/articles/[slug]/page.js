import Link from 'next/link';
import { getArticleBySlug, getArticleSlugs } from '@/lib/articles';
import { SITE_CONFIG, buildUrl, getAbsoluteImageUrl } from '@/lib/config';
import { parseTags } from '@/lib/utils';
import ShareButtons from '@/components/ShareButtons';

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const slug = (await params).slug;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found | Abrar Jahin',
      description: 'The article you are looking for does not exist.',
    };
  }

  const pageUrl  = buildUrl(`/articles/${slug}/`);
  const imageUrl = getAbsoluteImageUrl(
    article.frontmatter.image || SITE_CONFIG.images.ogImage
  );
  const title    = `${article.frontmatter.title} | Abrar Jahin`;
  const desc     = article.frontmatter.description || article.frontmatter.title;

  return {
    title,
    description: desc,
    alternates: { canonical: pageUrl },
    openGraph: {
      title,
      description: desc,
      url: pageUrl,
      type: 'article',
      siteName: SITE_CONFIG.siteName,
      publishedTime: article.frontmatter.date,
      authors: [article.frontmatter.author || SITE_CONFIG.author.name],
      images: [
        {
          url: imageUrl,
          alt: article.frontmatter.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
      images: [imageUrl],
      creator: '@ajpalok',
    },
  };
}

export default async function ArticleDetailPage({ params }) {
  const slug = (await params).slug;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return (
      <main className="w-full bg-paper text-ink min-h-screen pt-28 pb-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto">
          <Link href="/articles" className="inline-flex items-center gap-2 text-ink-2 hover:text-accent transition-colors mb-8">
            <span>←</span>
            <span className="text-sm font-mono uppercase tracking-wider">Back to Articles</span>
          </Link>
          <h1 className="text-4xl font-extrabold tracking-tight">Article not found</h1>
        </div>
      </main>
    );
  }

  const tags    = parseTags(article.frontmatter.tags);
  const pageUrl = buildUrl(`/articles/${slug}/`);

  return (
    <main className="w-full bg-paper text-ink min-h-screen">
      <article className="pt-28 pb-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto">

          {/* Back link */}
          <Link href="/articles" className="inline-flex items-center gap-2 text-ink-2 hover:text-accent transition-colors mb-12">
            <span>←</span>
            <span className="text-sm font-mono uppercase tracking-wider">All Articles</span>
          </Link>

          {/* Header */}
          <div className="mb-8 space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.02]">
              {article.frontmatter.title}
            </h1>

            {article.frontmatter.description && (
              <p className="text-lg text-ink-2">{article.frontmatter.description}</p>
            )}

            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-line">
              <span className="text-sm text-ink-3 font-mono">{article.displayDate}</span>
              {article.frontmatter.author && (
                <span className="text-sm text-ink-3 font-mono">By {article.frontmatter.author}</span>
              )}
              {/* Share inline in header so readers can share before reading */}
              <div className="ml-auto">
                <ShareButtons
                  url={pageUrl}
                  title={article.frontmatter.title}
                  description={article.frontmatter.description || ''}
                />
              </div>
            </div>
          </div>

          {/* Featured image */}
          {article.frontmatter.image && (
            <div className="w-full mb-12 rounded-lg overflow-hidden bg-panel border border-line">
              <img
                src={article.frontmatter.image}
                alt={article.frontmatter.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-12 pb-8 border-b border-line">
              {tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-accent-tint border border-accent/30 text-accent-ink text-xs font-mono rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="max-w-none mb-12">
            <div
              className="article-content space-y-6 text-ink-2 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.htmlContent }}
            />
          </div>

          {/* Footer: share again + back link */}
          <div className="mt-16 pt-8 border-t border-line space-y-8">
            <ShareButtons
              url={pageUrl}
              title={article.frontmatter.title}
              description={article.frontmatter.description || ''}
            />
            <Link href="/articles" className="inline-flex items-center gap-2 text-ink-2 hover:text-accent transition-colors">
              <span className="text-sm font-mono uppercase tracking-wider">← Back to Articles</span>
            </Link>
          </div>

        </div>
      </article>
    </main>
  );
}
