'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ARTICLES_PER_PAGE = 12;

export default function ArticlesPageClient({ articles }) {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const articlesRef = useRef([]);

  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const paginatedArticles = articles.slice(startIndex, endIndex);

  useEffect(() => {
    gsap.set(articlesRef.current, { opacity: 0, y: 20 });

    const ctx = gsap.context(() => {
      gsap.to(articlesRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [currentPage]);

  return (
    <main className="w-full bg-paper text-ink min-h-screen pt-28 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <Link href="/" className="inline-flex items-center gap-2 text-ink-2 hover:text-accent transition-colors mb-8">
            <span>←</span>
            <span className="text-sm font-mono uppercase tracking-wider">Back to Home</span>
          </Link>

          <div className="space-y-4">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-accent-2">
              <span className="h-px w-8 bg-accent" />
              All Articles
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[0.95]">
              Articles &amp; Insights<span className="text-accent">.</span>
            </h1>
            <p className="text-ink-2 max-w-2xl mt-6">
              Browse through {articles.length} articles on development, design, and technology insights.
            </p>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
          {paginatedArticles.map((article, index) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              ref={(el) => (articlesRef.current[index] = el)}
              className="group flex flex-col h-full overflow-hidden rounded-lg border border-line bg-paper-2 hover:border-accent/50 hover:shadow-[5px_5px_0_0_var(--color-panel)] transition-all duration-300"
            >
              {/* Image */}
              {article.frontmatter.image && (
                <div className="w-full h-48 overflow-hidden bg-panel border-b border-line">
                  <img
                    src={article.frontmatter.image}
                    alt={article.frontmatter.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              {/* Content */}
              <div className="flex-1 flex flex-col p-6">
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-semibold tracking-tight text-ink group-hover:text-accent-2 transition-colors mb-2 line-clamp-3">
                    {article.frontmatter.title}
                  </h3>
                  <p className="text-ink-2 text-sm line-clamp-3 transition-colors">
                    {article.frontmatter.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-line">
                  <span className="text-xs text-ink-3 font-mono">{article.displayDate}</span>
                  <span className="text-xs text-accent-2 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                    Read →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3">
            {currentPage > 1 && (
              <Link
                href={`/articles?page=${currentPage - 1}`}
                className="px-4 py-2 rounded border border-line hover:border-accent/60 transition-colors text-sm font-mono text-ink-2"
              >
                ← Previous
              </Link>
            )}

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Link
                  key={page}
                  href={`/articles?page=${page}`}
                  className={`w-10 h-10 flex items-center justify-center rounded text-sm font-mono transition-colors ${
                    page === currentPage
                      ? 'bg-ink text-paper border border-ink'
                      : 'border border-line text-ink-2 hover:border-accent/60'
                  }`}
                >
                  {page}
                </Link>
              ))}
            </div>

            {currentPage < totalPages && (
              <Link
                href={`/articles?page=${currentPage + 1}`}
                className="px-4 py-2 rounded border border-line hover:border-accent/60 transition-colors text-sm font-mono text-ink-2"
              >
                Next →
              </Link>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
