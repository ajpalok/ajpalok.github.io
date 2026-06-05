'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ArticlesSection({ articles }) {
  const containerRef = useRef(null);
  const articlesRef = useRef([]);

  const displayedArticles = articles.slice(0, 10);
  const hasMore = articles.length > 10;

  useEffect(() => {
    if (!containerRef.current || displayedArticles.length === 0) return;

    // Reset animations
    gsap.set(articlesRef.current, { opacity: 0, y: 20 });

    const ctx = gsap.context(() => {
      gsap.to(articlesRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [displayedArticles]);

  return (
    <section ref={containerRef} className="w-full bg-paper-2 text-ink py-20 md:py-28 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-12 md:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-accent-2 mb-4">
              <span className="h-px w-8 bg-accent" />
              Writing
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[0.95]">
              Articles &amp; Insights<span className="text-accent">.</span>
            </h2>
          </div>

          {hasMore && (
            <Link href="/articles" className="inline-flex items-center gap-3 group w-fit">
              <span className="text-xs font-mono uppercase tracking-widest text-ink-2 border-b-2 border-accent/40 pb-0.5 group-hover:border-accent transition-colors duration-300">
                View All Articles
              </span>
              <span className="text-accent transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          )}
        </div>

        {/* Articles List */}
        <div className="space-y-4 md:space-y-5">
          {displayedArticles.map((article, index) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              ref={(el) => (articlesRef.current[index] = el)}
              className="group flex flex-col sm:flex-row gap-4 p-4 md:p-6 rounded-lg border border-line bg-paper hover:border-accent/50 hover:shadow-[5px_5px_0_0_var(--color-panel)] transition-all duration-300"
            >
              {/* Image */}
              {article.frontmatter.image && (
                <div className="w-full sm:w-32 sm:h-32 shrink-0">
                  <img
                    src={article.frontmatter.image}
                    alt={article.frontmatter.title}
                    className="w-full h-24 sm:h-32 object-contain rounded-md border border-line"
                  />
                </div>
              )}

              {/* Content */}
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl font-semibold tracking-tight text-ink group-hover:text-accent-2 transition-colors line-clamp-2">
                    {article.frontmatter.title}
                  </h3>
                  <p className="text-ink-2 text-sm line-clamp-2 transition-colors">
                    {article.frontmatter.description}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-3 pt-3 sm:pt-0 border-t border-line sm:border-t-0">
                  <span className="text-xs text-ink-3 font-mono">
                    {article.displayDate}
                  </span>
                  <span className="text-xs text-accent-2 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                    Read more →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
