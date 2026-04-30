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
    <main className="w-full bg-[#050505] text-white min-h-screen py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8">
            <span>←</span>
            <span className="text-sm font-mono uppercase tracking-wider">Back to Home</span>
          </Link>

          <div className="space-y-4">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-gray-500">
              All Articles
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter">
              Articles &amp; <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-100 to-gray-600 italic">Insights</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mt-6">
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
              className="group flex flex-col h-full overflow-hidden rounded-lg border border-white/5 bg-white/[0.01] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300"
            >
              {/* Image */}
              {article.frontmatter.image && (
                <div className="w-full h-48 overflow-hidden bg-[#111]">
                  <img
                    src={article.frontmatter.image}
                    alt={article.frontmatter.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                </div>
              )}

              {/* Content */}
              <div className="flex-1 flex flex-col p-6">
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-semibold tracking-tight group-hover:text-alabaster_grey-300 transition-colors mb-2 line-clamp-3">
                    {article.frontmatter.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-3 group-hover:text-gray-300 transition-colors">
                    {article.frontmatter.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                  <span className="text-xs text-gray-500 font-mono">{article.displayDate}</span>
                  <span className="text-xs text-alabaster_grey-300/70 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
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
                className="px-4 py-2 rounded border border-white/10 hover:bg-white/5 transition-colors text-sm font-mono"
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
                      ? 'bg-alabaster_grey-500/20 border border-alabaster_grey-500/50 text-alabaster_grey-300'
                      : 'border border-white/10 hover:bg-white/5'
                  }`}
                >
                  {page}
                </Link>
              ))}
            </div>

            {currentPage < totalPages && (
              <Link
                href={`/articles?page=${currentPage + 1}`}
                className="px-4 py-2 rounded border border-white/10 hover:bg-white/5 transition-colors text-sm font-mono"
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
