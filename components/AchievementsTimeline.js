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

// ── Single timeline card ──────────────────────────────────────────────────────
function AchievementCard({ achievement, index }) {
  const { frontmatter: fm, displayDate, slug } = achievement
  const tags = parseTags(fm.tags)
  const cat = getCat(fm.category)
  const isEven = index % 2 === 0

  return (
    <div
      className={`achievement-card relative flex gap-0 ${isEven ? 'flex-row' : 'flex-row-reverse'} items-start`}
      data-index={index}
    >
      {/* ── Content panel ── */}
      <div className={`w-[calc(50%-28px)] ${isEven ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
        <div
          className={`
            group relative rounded-2xl border border-white/6
            bg-[#0e1011]/80 backdrop-blur-sm
            p-5 transition-all duration-300
            hover:border-white/12 hover:bg-[#141719]/90
            hover:-translate-y-0.5 hover:shadow-[0_8px_40px_-8px_rgba(0,0,0,0.6)]
          `}
        >
          {/* Subtle glow on hover matching Skills dark bg */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-br from-white/2 to-transparent pointer-events-none" />

          {/* Category + date row */}
          <div className={`flex items-center gap-2 mb-3 ${isEven ? 'justify-end' : 'justify-start'}`}>
            {fm.category && (
              <span className={`inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${cat.badge}`}>
                <span className="text-[8px]">{cat.icon}</span>
                {fm.category}
              </span>
            )}
            <DateBadge date={displayDate} />
          </div>

          {/* Title */}
          <h3 className={`text-[15px] font-semibold text-white leading-snug mb-1 ${isEven ? 'text-right' : 'text-left'}`}>
            {fm.title}
          </h3>

          {/* Issuer */}
          {fm.issuer && (
            <p className={`text-[12px] text-[#8496a8] mb-3 ${isEven ? 'text-right' : 'text-left'}`}>
              {fm.issuer_url ? (
                <a href={fm.issuer_url} target="_blank" rel="noopener noreferrer" className="hover:text-[#bfc8d1] transition-colors">
                  {fm.issuer}
                </a>
              ) : fm.issuer}
            </p>
          )}

          {/* Description */}
          {fm.description && (
            <p className={`text-[12px] text-[#536475] leading-relaxed mb-3 ${isEven ? 'text-right' : 'text-left'}`}>
              {fm.description}
            </p>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div className={`flex flex-wrap gap-1.5 ${isEven ? 'justify-end' : 'justify-start'}`}>
              {tags.map(tag => (
                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-[#536475]">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Credential link */}
          {fm.credential_url && (
            <div className={`mt-3 flex ${isEven ? 'justify-end' : 'justify-start'}`}>
              <a
                href={fm.credential_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] text-[#8496a8] hover:text-white transition-colors group/link"
              >
                <span>View credential</span>
                <span className="translate-x-0 group-hover/link:translate-x-0.5 transition-transform">↗</span>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* ── Spine dot ── */}
      <div className="relative w-14 flex flex-col items-center flex-shrink-0">
        {/* Dot */}
        <div className={`
          achievement-dot relative z-10 w-3 h-3 rounded-full mt-5 flex-shrink-0
          ring-[3px] ring-[#0e1011] ${cat.dot}
          shadow-[0_0_12px_2px_rgba(132,150,168,0.25)]
        `} />
      </div>

      {/* ── Spacer (other side) ── */}
      <div className="w-[calc(50%-28px)]" />
    </div>
  )
}

// ── Mobile card (single column) ───────────────────────────────────────────────
function AchievementCardMobile({ achievement, index }) {
  const { frontmatter: fm, displayDate } = achievement
  const tags = parseTags(fm.tags)
  const cat = getCat(fm.category)

  return (
    <div className="achievement-card flex gap-4 items-start" data-index={index}>
      {/* Dot + line */}
      <div className="flex flex-col items-center flex-shrink-0 pt-5">
        <div className={`w-2.5 h-2.5 rounded-full ring-2 ring-[#0e1011] ${cat.dot} flex-shrink-0`} />
      </div>

      {/* Card */}
      <div className="flex-1 pb-8">
        <div className="rounded-xl border border-white/[0.06] bg-[#0e1011]/80 p-4">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            {fm.category && (
              <span className={`inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${cat.badge}`}>
                {cat.icon} {fm.category}
              </span>
            )}
            <DateBadge date={displayDate} />
          </div>
          <h3 className="text-[14px] font-semibold text-white leading-snug mb-1">{fm.title}</h3>
          {fm.issuer && <p className="text-[11px] text-[#8496a8] mb-2">{fm.issuer}</p>}
          {fm.description && <p className="text-[11px] text-[#536475] leading-relaxed mb-2">{fm.description}</p>}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {tags.map(tag => (
                <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-[#536475]">
                  {tag}
                </span>
              ))}
            </div>
          )}
          {fm.credential_url && (
            <a href={fm.credential_url} target="_blank" rel="noopener noreferrer" className="text-[11px] text-[#8496a8] hover:text-white transition-colors">
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

    // Dynamically import GSAP + ScrollTrigger (client-only, not in SSG bundle)
    Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger)
      ctx = gsap.context(() => {
        // ── Animated spine line grows as you scroll ──
        if (lineRef.current) {
          gsap.fromTo(
            lineRef.current,
            { scaleY: 0, transformOrigin: 'top center' },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 70%',
                end: 'bottom 30%',
                scrub: 0.8,
              },
            }
          )
        }

        // ── Cards stagger in from alternating sides ──
        const cards = sectionRef.current?.querySelectorAll('.achievement-card')
        if (cards) cards.forEach((card, i) => {
          const isEven = i % 2 === 0
          // Desktop: slide in from left/right. The mobile selector picks them up too but override is fine.
          gsap.fromTo(
            card,
            {
              opacity: 0,
              x: isEven ? -40 : 40,
              y: 16,
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none none',
              },
            }
          )
        })

        // ── Dots pulse in ──
        const dots = sectionRef.current?.querySelectorAll('.achievement-dot')
        if (dots)
        dots.forEach((dot) => {
          gsap.fromTo(
            dot,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              ease: 'back.out(2)',
              scrollTrigger: {
                trigger: dot,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
            }
          )
        })
      }, sectionRef)
    }).catch(() => {
      // GSAP not available — just show items without animation (SSG safe)
    })

    return () => ctx?.revert()
  }, [achievements])

  if (achievements.length === 0) {
    return (
      <main className="py-24 px-6 text-center text-[#536475]">
        No achievements yet.
      </main>
    )
  }

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="w-full bg-[#050505] text-white py-16 px-6 md:px-12 lg:px-24"
      aria-labelledby="achievements-heading"
    >
      <div className="max-w-5xl mx-auto">

        {/* ── Heading ── */}
        <h2
          id="achievements-heading"
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-16 flex items-center gap-4"
        >
          Achievements
          <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-100 to-gray-600 italic">
            &amp; Awards.
          </span>
        </h2>

        {/* ── Legend ── */}
        <div className="flex flex-wrap gap-4 mb-14">
          {Object.entries(CATEGORY_STYLE)
            .filter(([k]) => k !== 'default')
            .map(([cat, s]) => (
              <span key={cat} className="inline-flex items-center gap-2 text-[11px] text-[#536475]">
                <span className={`w-2 h-2 rounded-full ${s.dot}`} />
                {cat}
              </span>
            ))}
        </div>

        {/* ── Desktop timeline (hidden on mobile) ── */}
        <div className="relative hidden md:block">
          {/* Spine */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-white/[0.06]" />
          {/* Animated fill line */}
          <div
            ref={lineRef}
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-linear-to-b from-[#8496a8]/60 via-[#536475]/40 to-transparent origin-top"
            style={{ scaleY: 0 }}
          />

          {/* Cards */}
          <div className="flex flex-col gap-10">
            {achievements.map((a, i) => (
              <AchievementCard key={a.slug} achievement={a} index={i} />
            ))}
          </div>

          {/* End cap */}
          <div className="flex justify-center mt-8">
            <div className="w-px h-8 bg-linear-to-b from-[#536475]/30 to-transparent" />
          </div>
        </div>

        {/* ── Mobile timeline ── */}
        <div className="relative md:hidden">
          {/* Spine */}
          <div className="absolute left-[9px] top-0 bottom-0 w-px bg-white/[0.06]" />

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
