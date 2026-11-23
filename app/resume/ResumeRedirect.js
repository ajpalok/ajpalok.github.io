'use client';

import { useEffect, useState } from 'react';

const RESUME_URL =
  'https://docs.google.com/document/d/1__6xncJIf7r54OtQyr2iMIp_feQ2gEZyfQzXjXKNCMY/edit?usp=portfolio';

export default function ResumeRedirect() {
  const [seconds, setSeconds] = useState(3);

  useEffect(() => {
    const tick = setInterval(() => setSeconds((s) => Math.max(s - 1, 0)), 1000);
    const redirect = setTimeout(() => {
      window.location.assign(RESUME_URL);
    }, 3000);
    return () => {
      clearInterval(tick);
      clearTimeout(redirect);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-6">
      <span
        role="status"
        aria-live="polite"
        className="font-mono text-6xl font-extrabold tracking-tight text-accent"
      >
        {seconds}
      </span>
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-2">
        Redirecting now
      </p>
    </div>
  );
}
