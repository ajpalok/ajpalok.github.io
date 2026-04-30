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
    <section ref={containerRef} className="w-full bg-[#050505] text-white py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-gray-500">
              Latest Articles
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter leading-tight">
              Articles &amp; <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-100 to-gray-600 italic">Insights.</span>
            </h2>
          </div>

          {hasMore && (
            <Link href="/articles" className="inline-flex items-center gap-3 group">
              <span className="text-xs font-mono uppercase tracking-widest border-b border-white/20 pb-0.5 group-hover:border-white transition-colors duration-500">
                View All Articles
              </span>
              <div className="w-6 h-px bg-white/20 group-hover:bg-white group-hover:w-12 transition-all duration-500"></div>
            </Link>
          )}
        </div>

        {/* Articles List */}
        <div className="space-y-4 md:space-y-6">
          {displayedArticles.map((article, index) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              ref={(el) => (articlesRef.current[index] = el)}
              className="group flex flex-col sm:flex-row gap-4 p-4 md:p-6 rounded-lg border border-white/5 bg-white/1 hover:bg-white/5 hover:border-white/10 transition-all duration-300"
            >
              {/* Image */}
              {article.frontmatter.image && (
                <div className="w-full sm:w-32 sm:h-32 shrink-0">
                  <img
                    src={article.frontmatter.image}
                    alt={article.frontmatter.title}
                    className="w-full h-24 sm:h-32 object-contain rounded-md grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              )}

              {/* Content */}
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl font-semibold tracking-tight group-hover:text-alabaster_grey-300 transition-colors line-clamp-2">
                    {article.frontmatter.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2 group-hover:text-gray-300 transition-colors">
                    {article.frontmatter.description}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-3 pt-3 sm:pt-0 border-t border-white/5 sm:border-t-0">
                  <span className="text-xs text-gray-500 font-mono">
                    {article.displayDate}
                  </span>
                  <span className="text-xs text-alabaster_grey-300/70 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
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
