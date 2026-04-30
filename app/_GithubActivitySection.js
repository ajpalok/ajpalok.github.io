"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function GithubActivitySection({ username }) {
  const user = username || process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'ajpalok';
  const [view, setView] = useState('year');
  const imgRef = useRef(null);
  const wrapperRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [naturalWidth, setNaturalWidth] = useState(0);
  const [monthWidth, setMonthWidth] = useState(0);

  useEffect(() => {
    if (!imgRef.current) return;
    const img = imgRef.current;
    function onLoad() {
      setLoaded(true);
      const w = img.naturalWidth || img.width || img.getBoundingClientRect().width;
      setNaturalWidth(w);
      // approximate last 6 weeks width (contribution grid usually ~53 columns)
      const approxWeeks = 53;
      const visibleWeeks = 6;
      const mw = Math.round((visibleWeeks / approxWeeks) * w);
      setMonthWidth(mw);
      if (wrapperRef.current && view === 'month') {
        wrapperRef.current.style.width = `${Math.min(mw, 600)}px`;
      }
    }

    if (img.complete) onLoad();
    img.addEventListener('load', onLoad);
    return () => img.removeEventListener('load', onLoad);
  }, [view]);

  useEffect(() => {
    if (!wrapperRef.current) return;
    if (view === 'year') {
      wrapperRef.current.style.width = '100%';
      wrapperRef.current.style.maxWidth = '900px';
    } else if (view === 'month' && naturalWidth && monthWidth) {
      wrapperRef.current.style.width = `${Math.min(monthWidth, 600)}px`;
    }
  }, [view, naturalWidth, monthWidth]);

  const imgTransformStyle =
    view === 'month' && naturalWidth && monthWidth
      ? { transform: `translateX(-${Math.max(0, naturalWidth - monthWidth)}px)` }
      : {};

  return (
    <section className="w-full bg-[#050505] text-white py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 gap-6">
          <div className="space-y-2 max-w-2xl">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-gray-500">GitHub Activity</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter leading-tight">
              Monthly Contribution <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-100 to-gray-600 italic">Heatmap</span>
            </h2>
            <p className="text-gray-400 text-sm">Recent contributions from GitHub. Toggle between year and month views.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setView('year')}
              className={`text-xs font-mono uppercase tracking-widest px-3 py-2 rounded ${view === 'year' ? 'bg-white/8' : 'bg-transparent'} border border-white/5`}
            >
              Year
            </button>
            <button
              onClick={() => setView('month')}
              className={`text-xs font-mono uppercase tracking-widest px-3 py-2 rounded ${view === 'month' ? 'bg-white/8' : 'bg-transparent'} border border-white/5`}
            >
              Month
            </button>
            <Link href={`https://github.com/${user}`} className="ml-2 text-xs font-mono uppercase tracking-widest border-b border-white/20 pb-0.5">
              Follow
            </Link>
          </div>
        </div>

        <div ref={wrapperRef} className="overflow-hidden bg-white/[0.02] p-4 rounded-lg border border-white/5">
          <div className="relative" style={{ minHeight: 120 }}>
            {!loaded && (
              <div className="grid grid-cols-24 gap-1 w-full animate-pulse">
                {Array.from({ length: 120 }).map((_, i) => (
                  <div key={i} className="h-3 bg-white/[0.03] rounded-sm" />
                ))}
              </div>
            )}

            <img
              ref={imgRef}
              src={`https://github.com/users/${user}/contributions`}
              alt={`${user} GitHub contributions`}
              className="select-none w-auto h-32 md:h-40 object-contain transition-transform duration-700 ease-in-out"
              style={imgTransformStyle}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
