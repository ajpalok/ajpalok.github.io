"use client";

import { useEffect, useRef } from 'react'
import { parseTags } from '@/lib/utils'
import Link from 'next/link'

// ── Category config (paper palette) ───────────────────────────────────────────
const CATEGORY_STYLE = {
  Certification: {
    dot: 'bg-accent',
    badge: 'bg-accent-tint text-accent-ink border-accent/30',
    icon: '◈',
  },
  Academic: {
    dot: 'bg-ink',
    badge: 'bg-paper text-ink-2 border-line',
    icon: '◆',
  },
  Competition: {
    dot: 'bg-accent-2',
    badge: 'bg-paper text-accent-2 border-accent/25',
    icon: '◉',
  },
  default: {
    dot: 'bg-ink-3',
    badge: 'bg-paper text-ink-2 border-line',
    icon: '◎',
  },
}

function getCat(cat) {
  return CATEGORY_STYLE[cat ?? ''] ?? CATEGORY_STYLE.default
}

function DateBadge({ date }) {
  if (!date) return null
  return (
    <span className="font-mono text-[10px] tracking-widest text-ink-3 uppercase whitespace-nowrap">
      {date}
    </span>
  )
}

// ── Compact card for home page ──
function AchievementCardCompact({ achievement }) {
  const { frontmatter: fm, displayDate, slug } = achievement
  const tags = parseTags(fm.tags)
  const cat = getCat(fm.category)

  return (
    <div className="achievement-card flex gap-4 items-start group">
      <div className="flex flex-col items-center shrink-0 pt-5">
        <div className={`w-2.5 h-2.5 rounded-full ring-2 ring-paper-2 ${cat.dot} shrink-0`} />
      </div>

      <Link href={`/achievements/${slug}`} className="flex-1">
        <div className="rounded-xl border border-line bg-paper p-4 transition-all duration-300 group-hover:border-accent/50 group-hover:shadow-[4px_4px_0_0_var(--color-panel)]">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            {fm.category && (
              <span className={`inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${cat.badge}`}>
                {cat.icon} {fm.category}
              </span>
            )}
            <DateBadge date={displayDate} />
          </div>
          <h3 className="text-[15px] font-semibold text-ink leading-snug mb-1 group-hover:text-accent-2 transition-colors">{fm.title}</h3>
          {fm.issuer && <p className="text-[11px] text-ink-3 mb-2">{fm.issuer}</p>}
          {fm.description && <p className="text-[11px] text-ink-2 leading-relaxed mb-2">{fm.description}</p>}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {tags.map(tag => (
                <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-full bg-paper-2 border border-line text-ink-2">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="flex items-center gap-2 text-[11px] text-ink-3 group-hover:text-accent-2 transition-colors">
            {fm.credential_url && (
              <a href={fm.credential_url} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" onClick={e => e.stopPropagation()}>
                View credential ↗
              </a>
            )}
            <span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity">View details →</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function AchievementsSectionHome({ achievements }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current || achievements.length === 0) return

    let ctx = null
    Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger)
      ctx = gsap.context(() => {
        const cards = sectionRef.current?.querySelectorAll('.achievement-card')
        if (cards) cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out',
              delay: i * 0.1,
              scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
            }
          )
        })
      }, sectionRef)
    }).catch(() => {})

    return () => ctx?.revert()
  }, [achievements])

  const displayedAchievements = achievements.slice(0, 6)
  const hasMore = achievements.length > 6

  return (
    <section
      ref={sectionRef}
      className="w-full bg-paper text-ink py-20 md:py-28 px-6 md:px-12 lg:px-24"
      aria-labelledby="achievements-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-accent-2 mb-4">
          <span className="h-px w-8 bg-accent" />
          Milestones
        </div>
        <h2
          id="achievements-heading"
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-12 leading-[0.95]"
        >
          Achievements &amp; Awards<span className="text-accent">.</span>
        </h2>

        <div className="relative">
          <div className="absolute left-2.25 top-0 bottom-0 w-px bg-line" />
          <div className="flex flex-col gap-6">
            {displayedAchievements.map((a) => (
              <AchievementCardCompact key={a.slug} achievement={a} />
            ))}
          </div>
        </div>

        {hasMore && (
          <div className="flex justify-center mt-12">
            <Link
              href="/achievements"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-ink/25 hover:border-ink hover:bg-ink/[0.04] text-ink font-medium transition-all duration-300"
            >
              View All Achievements
              <span className="text-accent">→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
