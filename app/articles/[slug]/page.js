import Link from 'next/link';
import { getAllArticles, getArticleBySlug, getArticleSlugs } from '@/lib/articles';
import { parseTags } from '@/lib/utils';

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const slug = (await params).slug;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'The article you are looking for does not exist.',
    };
  }

  return {
    title: `${article.frontmatter.title} | Abrar Jahin`,
    description: article.frontmatter.description || `Read: ${article.frontmatter.title}`,
    image: article.frontmatter.image,
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

  const tags = parseTags(article.frontmatter.tags);

  return (
    <main className="w-full bg-paper text-ink min-h-screen">
      <article className="pt-28 pb-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
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
            </div>
          </div>

          {/* Featured Image */}
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

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-line">
            <Link href="/articles" className="inline-flex items-center gap-2 text-ink-2 hover:text-accent transition-colors">
              <span className="text-sm font-mono uppercase tracking-wider">← Back to Articles</span>
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
