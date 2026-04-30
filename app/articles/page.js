import Script from 'next/script';
import ArticlesPageClient from './ArticlesPageClient';
import { getAllArticles } from '@/lib/articles';
import { getArticleSchema, getBreadcrumbSchema } from '@/lib/jsonld-schemas';
import { buildUrl } from '@/lib/config';

export const metadata = {
  title: 'All Articles | Abrar Jahin',
  description: 'Browse all my articles and insights on web development, design, and technology.',
};

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  const breadcrumbs = getBreadcrumbSchema([
    { name: 'Home', url: buildUrl() },
    { name: 'Articles', url: buildUrl('/articles') },
  ]);

  const articleSchemas = articles.map((a) =>
    getArticleSchema({
      slug: a.slug,
      title: a.frontmatter.title,
      description: a.frontmatter.description,
      date: a.frontmatter.date,
      image: a.frontmatter.image,
    })
  );

  const schemas = [breadcrumbs, ...articleSchemas];

  return (
    <>
      {schemas.map((schema, idx) => (
        <Script
          key={`articles-jsonld-${idx}`}
          id={`articles-jsonld-${idx}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
          strategy="afterInteractive"
        />
      ))}
      <ArticlesPageClient articles={articles} />
    </>
  );
}
