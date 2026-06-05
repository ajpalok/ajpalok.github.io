'use client'

import Loader from '@/components/Loader';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * The intro animation is meant to play once per visit, not on every page
 * change. Because the site is a static export, each route is a separate HTML
 * document and navigations are full loads, so we persist a flag in
 * sessionStorage. A pre-paint script in <head> (see layout.js) hides the
 * overlay via CSS the instant the flag exists, so repeat loads show no flash.
 */
export default function PageLoader({ children }) {
  // 'pending' (SSR / first paint) -> 'play' -> 'leaving' -> 'done'
  const [phase, setPhase] = useState('pending');
  const safety = useRef(null);

  useEffect(() => {
    let played = false;
    try { played = sessionStorage.getItem('introPlayed') === '1'; } catch {}
    if (played) {
      setPhase('done');
      return;
    }
    setPhase('play');
    // Never let the intro trap the page, even if onComplete is missed.
    safety.current = setTimeout(() => finish(), 9000);
    return () => clearTimeout(safety.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const finish = useCallback(() => {
    clearTimeout(safety.current);
    try { sessionStorage.setItem('introPlayed', '1'); } catch {}
    try { document.documentElement.classList.add('intro-played'); } catch {}
    setPhase((p) => (p === 'done' ? p : 'leaving'));
    setTimeout(() => setPhase('done'), 600);
  }, []);

  return (
    <>
      {children}
      {phase !== 'done' && (
        <div id="page-loader-overlay" className={phase === 'leaving' ? 'is-leaving' : ''}>
          <Loader onComplete={finish} />
        </div>
      )}
    </>
  );
}
