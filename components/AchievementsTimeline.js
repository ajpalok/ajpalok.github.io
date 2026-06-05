"use client";

import { useEffect, useRef } from 'react'
import { parseTags } from '@/lib/utils'

// ── Category config (paper palette) ───────────────────────────────────────────
const CATEGORY_STYLE = {
  Certification: { dot: 'bg-accent', badge: 'bg-accent-tint text-accent-ink border-accent/30', icon: '◈' },
  Academic: { dot: 'bg-ink', badge: 'bg-paper text-ink-2 border-line', icon: '◆' },
  Competition: { dot: 'bg-accent-2', badge: 'bg-paper text-accent-2 border-accent/25', icon: '◉' },
  default: { dot: 'bg-ink-3', badge: 'bg-paper text-ink-2 border-line', icon: '◎' },
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

// ── Single timeline card (desktop, alternating) ───────────────────────────────
function AchievementCard({ achievement, index }) {
  const { frontmatter: fm, displayDate } = achievement
  const tags = parseTags(fm.tags)
  const cat = getCat(fm.category)
  const isEven = index % 2 === 0

  return (
    <div
      className={`achievement-card relative flex gap-0 ${isEven ? 'flex-row' : 'flex-row-reverse'} items-start`}
      data-index={index}
    >
      <div className={`w-[calc(50%-28px)] ${isEven ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
        <div className="group relative rounded-2xl border border-line bg-paper-2 p-5 transition-all duration-300 hover:border-accent/50 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-panel)]">
          <div className={`flex items-center gap-2 mb-3 ${isEven ? 'justify-end' : 'justify-start'}`}>
            {fm.category && (
              <span className={`inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${cat.badge}`}>
                <span className="text-[8px]">{cat.icon}</span>
                {fm.category}
              </span>
            )}
            <DateBadge date={displayDate} />
          </div>

          <h3 className={`text-[15px] font-semibold text-ink leading-snug mb-1 ${isEven ? 'text-right' : 'text-left'}`}>
            {fm.title}
          </h3>

          {fm.issuer && (
            <p className={`text-[12px] text-ink-3 mb-3 ${isEven ? 'text-right' : 'text-left'}`}>
              {fm.issuer_url ? (
                <a href={fm.issuer_url} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                  {fm.issuer}
                </a>
              ) : fm.issuer}
            </p>
          )}

          {fm.description && (
            <p className={`text-[12px] text-ink-2 leading-relaxed mb-3 ${isEven ? 'text-right' : 'text-left'}`}>
              {fm.description}
            </p>
          )}

          {tags.length > 0 && (
            <div className={`flex flex-wrap gap-1.5 ${isEven ? 'justify-end' : 'justify-start'}`}>
              {tags.map(tag => (
                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-paper border border-line text-ink-2">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {fm.credential_url && (
            <div className={`mt-3 flex ${isEven ? 'justify-end' : 'justify-start'}`}>
              <a
                href={fm.credential_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] text-ink-3 hover:text-accent transition-colors group/link"
              >
                <span>View credential</span>
                <span className="translate-x-0 group-hover/link:translate-x-0.5 transition-transform">↗</span>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Spine dot */}
      <div className="relative w-14 flex flex-col items-center flex-shrink-0">
        <div className={`achievement-dot relative z-10 w-3 h-3 rounded-full mt-5 flex-shrink-0 ring-[3px] ring-paper ${cat.dot}`} />
      </div>

      <div className="w-[calc(50%-28px)]" />
    </div>
  )
}

// ── Mobile card ───────────────────────────────────────────────────────────────
function AchievementCardMobile({ achievement, index }) {
  const { frontmatter: fm, displayDate } = achievement
  const tags = parseTags(fm.tags)
  const cat = getCat(fm.category)

  return (
    <div className="achievement-card flex gap-4 items-start" data-index={index}>
      <div className="flex flex-col items-center flex-shrink-0 pt-5">
        <div className={`w-2.5 h-2.5 rounded-full ring-2 ring-paper ${cat.dot} flex-shrink-0`} />
      </div>

      <div className="flex-1 pb-8">
        <div className="rounded-xl border border-line bg-paper-2 p-4">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            {fm.category && (
              <span className={`inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${cat.badge}`}>
                {cat.icon} {fm.category}
              </span>
            )}
            <DateBadge date={displayDate} />
          </div>
          <h3 className="text-[14px] font-semibold text-ink leading-snug mb-1">{fm.title}</h3>
          {fm.issuer && <p className="text-[11px] text-ink-3 mb-2">{fm.issuer}</p>}
          {fm.description && <p className="text-[11px] text-ink-2 leading-relaxed mb-2">{fm.description}</p>}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {tags.map(tag => (
                <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-full bg-paper border border-line text-ink-2">
                  {tag}
                </span>
              ))}
            </div>
          )}
          {fm.credential_url && (
            <a href={fm.credential_url} target="_blank" rel="noopener noreferrer" className="text-[11px] text-ink-3 hover:text-accent transition-colors">
              View credential ↗
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function AchievementsTimeline({ achievements }) {
  const sectionRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current || achievements.length === 0) return

    let ctx = null
    Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger)
      ctx = gsap.context(() => {
        if (lineRef.current) {
          gsap.fromTo(
            lineRef.current,
            { scaleY: 0, transformOrigin: 'top center' },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', end: 'bottom 30%', scrub: 0.8 },
            }
          )
        }

        const cards = sectionRef.current?.querySelectorAll('.achievement-card')
        if (cards) cards.forEach((card, i) => {
          const isEven = i % 2 === 0
          gsap.fromTo(
            card,
            { opacity: 0, x: isEven ? -40 : 40, y: 16 },
            {
              opacity: 1, x: 0, y: 0, duration: 0.7, ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
            }
          )
        })

        const dots = sectionRef.current?.querySelectorAll('.achievement-dot')
        if (dots) dots.forEach((dot) => {
          gsap.fromTo(
            dot,
            { scale: 0, opacity: 0 },
            {
              scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)',
              scrollTrigger: { trigger: dot, start: 'top 90%', toggleActions: 'play none none none' },
            }
          )
        })
      }, sectionRef)
    }).catch(() => {})

    return () => ctx?.revert()
  }, [achievements])

  if (achievements.length === 0) {
    return (
      <main className="py-24 px-6 text-center text-ink-2 bg-paper min-h-screen pt-28">
        No achievements yet.
      </main>
    )
  }

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="w-full bg-paper text-ink pt-28 pb-20 px-6 md:px-12 lg:px-24"
      aria-labelledby="achievements-heading"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-accent-2 mb-4">
          <span className="h-px w-8 bg-accent" />
          Milestones
        </div>
        <h2
          id="achievements-heading"
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-12 leading-[0.95]"
        >
          Achievements &amp; Awards<span className="text-accent">.</span>
        </h2>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-14">
          {Object.entries(CATEGORY_STYLE)
            .filter(([k]) => k !== 'default')
            .map(([cat, s]) => (
              <span key={cat} className="inline-flex items-center gap-2 text-[11px] text-ink-2">
                <span className={`w-2 h-2 rounded-full ${s.dot}`} />
                {cat}
              </span>
            ))}
        </div>

        {/* Desktop timeline */}
        <div className="relative hidden md:block">
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-line" />
          <div
            ref={lineRef}
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-linear-to-b from-accent via-accent/50 to-transparent origin-top"
            style={{ scaleY: 0 }}
          />

          <div className="flex flex-col gap-10">
            {achievements.map((a, i) => (
              <AchievementCard key={a.slug} achievement={a} index={i} />
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <div className="w-px h-8 bg-linear-to-b from-accent/30 to-transparent" />
          </div>
        </div>

        {/* Mobile timeline */}
        <div className="relative md:hidden">
          <div className="absolute left-[9px] top-0 bottom-0 w-px bg-line" />
          <div className="flex flex-col">
            {achievements.map((a, i) => (
              <AchievementCardMobile key={a.slug} achievement={a} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
