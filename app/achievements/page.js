import Script from 'next/script'
import { getAllAchievements } from '@/lib/achievements'
import { Metadata } from 'next'
import AchievementsTimeline from '@/components/AchievementsTimeline'
import { getAchievementSchema, getBreadcrumbSchema } from '@/lib/jsonld-schemas'
import { buildUrl } from '@/lib/config'

export const metadata = {
  title: 'Achievements',
  description: 'Awards, certifications, and milestones.',
}

export default async function AchievementsPage() {
  const achievements = await getAllAchievements()

  const breadcrumbs = getBreadcrumbSchema([
    { name: 'Home', url: buildUrl() },
    { name: 'Achievements', url: buildUrl('/achievements') },
  ])

  const achievementSchemas = achievements.map((ach) =>
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
  )

  const schemas = [breadcrumbs, ...achievementSchemas]

  return (
    <>
      {schemas.map((schema, idx) => (
        <Script
          key={`achievements-jsonld-${idx}`}
          id={`achievements-jsonld-${idx}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
          strategy="afterInteractive"
        />
      ))}
      <AchievementsTimeline achievements={achievements} />
    </>
  )
}