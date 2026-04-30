"use client";

import { useEffect, useRef } from 'react'
import { parseTags } from '@/lib/utils'
import Link from 'next/link'

// ── Category config ───────────────────────────────────────────────────────────
const CATEGORY_STYLE = {
  Certification: {
    dot: 'bg-alabaster_grey-400',
    badge: 'bg-alabaster_grey-400/10 text-alabaster_grey-300 border-alabaster_grey-400/20',
    icon: '◈',
  },
  Academic: {
    dot: 'bg-bright_snow-400',
    badge: 'bg-bright_snow-400/10 text-bright_snow-300 border-bright_snow-400/20',
    icon: '◆',
  },
  Competition: {
    dot: 'bg-platinum-400',
    badge: 'bg-platinum-400/10 text-platinum-300 border-platinum-400/20',
    icon: '◉',
  },
  default: {
    dot: 'bg-[#8496a8]',
    badge: 'bg-white/5 text-[#bfc8d1] border-white/10',
    icon: '◎',
  },
}

function getCat(cat) {
  return CATEGORY_STYLE[cat ?? ''] ?? CATEGORY_STYLE.default
}

// ── Date badge ──────────────────────────────────────────────────────────────────────
function DateBadge({ date }) {
  if (!date) return null
  return (
    <span className="font-mono text-[10px] tracking-widest text-[#8496a8] uppercase whitespace-nowrap">
      {date}
    </span>
  )
}

// ── Compact card for home page (single column mobile-like layout) ──
function AchievementCardCompact({ achievement }) {
  const { frontmatter: fm, displayDate, slug } = achievement
  const tags = parseTags(fm.tags)
  const cat = getCat(fm.category)

  return (
    <div className="achievement-card flex gap-4 items-start group">
      {/* Dot */}
      <div className="flex flex-col items-center shrink-0 pt-5">
        <div className={`w-2.5 h-2.5 rounded-full ring-2 ring-[#0e1011] ${cat.dot} shrink-0`} />
      </div>

      {/* Card */}
      <Link href={`/achievements/${slug}`} className="flex-1">
        <div className="rounded-xl border border-white/6 bg-[#0e1011]/80 p-4 transition-all duration-300 group-hover:border-white/12 group-hover:bg-[#0e1011] group-hover:shadow-lg">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            {fm.category && (
              <span className={`inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${cat.badge}`}>
                {cat.icon} {fm.category}
              </span>
            )}
            <DateBadge date={displayDate} />
          </div>
          <h3 className="text-[14px] font-semibold text-white leading-snug mb-1 group-hover:text-alabaster_grey-300 transition-colors">{fm.title}</h3>
          {fm.issuer && <p className="text-[11px] text-[#8496a8] mb-2">{fm.issuer}</p>}
          {fm.description && <p className="text-[11px] text-[#536475] leading-relaxed mb-2">{fm.description}</p>}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {tags.map(tag => (
                <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/4 border border-white/6 text-[#536475]">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="flex items-center gap-2 text-[11px] text-[#8496a8] group-hover:text-white transition-colors">
            {fm.credential_url && (
              <a href={fm.credential_url} target="_blank" rel="noopener noreferrer" className="hover:text-alabaster_grey-300 transition-colors" onClick={e => e.stopPropagation()}>
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

    // Dynamically import GSAP
    Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger)
      ctx = gsap.context(() => {
        // ── Cards stagger in ──
        const cards = sectionRef.current?.querySelectorAll('.achievement-card')
        if (cards) cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 20,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out',
              delay: i * 0.1,
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          )
        })
      }, sectionRef)
    }).catch(() => {
      // GSAP not available
    })

    return () => ctx?.revert()
  }, [achievements])

  const displayedAchievements = achievements.slice(0, 6)
  const hasMore = achievements.length > 6

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#050505] text-white py-16 px-6 md:px-12 lg:px-24"
      aria-labelledby="achievements-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Heading ── */}
        <h2
          id="achievements-heading"
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-12 flex items-center gap-4"
        >
          Achievements
          <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-100 to-gray-600 italic">
            &amp; Awards.
          </span>
        </h2>

        {/* ── Timeline ── */}
        <div className="relative">
          {/* Spine */}
          <div className="absolute left-2.25 top-0 bottom-0 w-px bg-white/6" />

          <div className="flex flex-col gap-6">
            {displayedAchievements.map((a) => (
              <AchievementCardCompact key={a.slug} achievement={a} />
            ))}
          </div>
        </div>

        {/* ── Show More Button ── */}
        {hasMore && (
          <div className="flex justify-center mt-12">
            <Link
              href="/achievements"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/12 bg-white/2 hover:bg-white/5 text-white font-medium transition-all duration-300 hover:border-white/2"
            >
              View All Achievements
              <span className="text-sm">→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
