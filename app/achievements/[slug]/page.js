import { getAllAchievements, getAchievementBySlug } from '@/lib/achievements'
import { parseTags } from '@/lib/utils'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export async function generateStaticParams() {
  const all = await getAllAchievements()
  return all.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }) {
  const slug = (await params).slug
  const a = await getAchievementBySlug(slug)
  if (!a) return {}
  return {
    title: a.frontmatter.title,
    description: a.frontmatter.description,
  }
}

export default async function AchievementDetailPage({ params }) {
  const slug = (await params).slug
  const a = await getAchievementBySlug(slug)
  if (!a) notFound()

  const { frontmatter: fm, htmlContent, displayDate } = a
  const tags = parseTags(fm.tags)

  return (
    <main className="bg-paper min-h-screen text-ink">
      <div className="max-w-2xl mx-auto px-6 pt-28 pb-20">
        <Link href="/achievements" className="inline-flex items-center gap-2 text-[12px] text-ink-2 hover:text-accent transition-colors mb-10">
          ← All achievements
        </Link>
        {fm.category && (
          <p className="text-[11px] font-mono uppercase tracking-widest text-accent-2 mb-3">{fm.category}</p>
        )}
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">{fm.title}</h1>
        {fm.issuer && (
          <p className="text-ink-2 mb-2">
            {fm.issuer_url
              ? <a href={fm.issuer_url} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">{fm.issuer} ↗</a>
              : fm.issuer}
          </p>
        )}
        {displayDate && <p className="font-mono text-[11px] text-ink-3 mb-6">{displayDate}</p>}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map(tag => (
              <span key={tag} className="text-[11px] px-2 py-0.5 rounded-full bg-paper-2 border border-line text-ink-2">{tag}</span>
            ))}
          </div>
        )}
        {fm.credential_url && (
          <a href={fm.credential_url} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[12px] px-4 py-2 rounded-full border border-ink/25 text-ink-2 hover:text-accent hover:border-accent/50 transition-all mb-10">
            View Credential ↗
          </a>
        )}
        <div className="max-w-none project-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </main>
  )
}