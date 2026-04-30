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

export default async function Home() {
  const achievements = await getAllAchievements();
  const articles = await getAllArticles();

  return (
    <>
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
