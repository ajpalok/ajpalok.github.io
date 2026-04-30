import ArticlesPageClient from './ArticlesPageClient';
import { getAllArticles } from '@/lib/articles';

export const metadata = {
  title: 'All Articles | Abrar Jahin',
  description: 'Browse all my articles and insights on web development, design, and technology.',
};

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return <ArticlesPageClient articles={articles} />;
}
