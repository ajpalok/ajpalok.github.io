'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import AbrarLineArt from '@/components/AbrarLineArt';

// Fallback duration (ms) used when no SVG paths are found.
// onComplete will always fire — the loader will never get stuck.
const FALLBACK_DURATION_MS = 2000;

export default function Loader({ onComplete } = {}) {
  const containerRef = useRef(null);

  // Stabilise the onComplete reference so it never causes the effect to
  // re-run when the parent re-renders with a new inline arrow function.
  const onCompleteRef = useRef(onComplete);
  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

  const fireComplete = useCallback(() => {
    try { onCompleteRef.current?.(); } catch (_) {}
  }, []); // stable — never changes

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ── Scope the query to THIS component's DOM node ──────────────────────
    // Avoids matching .line elements from other parts of the page.
    const paths = Array.from(container.querySelectorAll('.line'));

    let timeoutId = null;
    let tl = null;

    if (!paths.length) {
      // No SVG paths found (e.g. SSR/hydration timing edge case).
      // Always fire onComplete so the loader is never permanently stuck.
      timeoutId = setTimeout(fireComplete, FALLBACK_DURATION_MS);
      return () => clearTimeout(timeoutId);
    }

    // Prepare stroke-dash for draw animation
    paths.forEach((path) => {
      const len = path.getTotalLength();
      path.style.strokeDasharray = String(len);
      path.style.strokeDashoffset = String(len);
      path.style.visibility = 'visible';
    });

    tl = gsap.timeline({
      repeat: -1,
      defaults: { duration: 2, ease: 'power1.inOut' },
    });

    tl.to(paths, {
      strokeDashoffset: 0,
      stagger: 0.1,
    }).to(paths, {
      strokeDashoffset: (i, target) => -target.getTotalLength(),
      stagger: 0.1,
    });

    // Fire onComplete after the first full cycle.
    // Use the actual timeline duration; always has a floor so it never hangs.
    const firstCycleMs = Math.max(tl.duration() * 1000, FALLBACK_DURATION_MS);
    timeoutId = setTimeout(fireComplete, firstCycleMs + 50);

    return () => {
      tl?.kill();
      clearTimeout(timeoutId);
      // Reset stroke styles so re-mounting starts cleanly
      paths.forEach((p) => {
        p.style.strokeDasharray = '';
        p.style.strokeDashoffset = '';
        p.style.visibility = '';
      });
    };
  // fireComplete is stable (useCallback with []); this effect runs exactly once on mount.
  }, [fireComplete]);

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center w-[50vw] max-w-300"
    >
      <AbrarLineArt width="50%" height="50%" />
    </div>
  );
}