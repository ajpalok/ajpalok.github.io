import Script from 'next/script';
import AchievementsSection from './_AchievementsSection';
import ArticlesSection from './_ArticlesSection';
import HeroSection from './_HeroSection';
import MarqueeOfSkills from './_MarqueeOfSkills';
import ProjectsSection from './_ProjectsSection';
import Skills from './_Skills';
import GithubContributionGraph from './_GithubContributionGraph';
import ContactSection from './_ContactSection';
import { getAllAchievements } from '@/lib/achievements';
import { getAllArticles } from '@/lib/articles';
import { getAllProjects } from '@/lib/projects';
import { getProjectSchema, getArticleSchema, getAchievementSchema, getBreadcrumbSchema } from '@/lib/jsonld-schemas';
import { buildUrl } from '@/lib/config';

export default async function Home() {
  const achievements = await getAllAchievements();
  const articles = await getAllArticles();
  const projects = getAllProjects();

  // Build schemas for featured items
  const breadcrumbs = getBreadcrumbSchema([
    { name: 'Home', url: buildUrl() },
  ]);

  const projectSchemas = projects.slice(0, 6).map((p) =>
    getProjectSchema({
      slug: p.slug,
      name: p.name,
      description: p.description,
      image: p.image,
      tags: p.tags,
      featured: p.featured,
    })
  );

  const articleSchemas = articles.slice(0, 3).map((a) =>
    getArticleSchema({
      slug: a.slug,
      title: a.frontmatter.title,
      description: a.frontmatter.description,
      date: a.frontmatter.date,
      image: a.frontmatter.image,
    })
  );

  const achievementSchemas = achievements.slice(0, 3).map((ach) =>
    getAchievementSchema({
      slug: ach.slug,
      title: ach.frontmatter.title,
      issuer: ach.frontmatter.issuer,
      issuer_url: ach.frontmatter.issuer_url,
      date_start: ach.frontmatter.date_start,
      date_end: ach.frontmatter.date_end,
      category: ach.frontmatter.category,
      credential_url: ach.frontmatter.credential_url,
      image: ach.frontmatter.image,
    })
  );

  const schemas = [breadcrumbs, ...projectSchemas, ...articleSchemas, ...achievementSchemas];

  return (
    <>
      {schemas.map((schema, idx) => (
        <Script
          key={`home-jsonld-${idx}`}
          id={`home-jsonld-${idx}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
          strategy="afterInteractive"
        />
      ))}
      <HeroSection />
      <MarqueeOfSkills />
      <ProjectsSection />
      <Skills />
      <AchievementsSection achievements={achievements} />
      <ArticlesSection articles={articles} />
      <GithubContributionGraph />
      <ContactSection />
    </>
  );
}
