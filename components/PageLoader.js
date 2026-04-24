'use client'

import Loader from '@/components/Loader';
import { useEffect, useState } from 'react';

export default function PageLoader({ children }) {
  const [loaded, setLoaded] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    const onLoad = () => setLoaded(true);
    if (document.readyState === 'complete') {
      setLoaded(true);
    } else {
      window.addEventListener('load', onLoad);
      return () => window.removeEventListener('load', onLoad);
    }
  }, []);

  // Fallbacks to avoid the loader being stuck indefinitely
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 10000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setAnimationDone(true), 8000);
    return () => clearTimeout(t);
  }, []);

  const shouldShow = !(loaded && animationDone);

  if (shouldShow) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex items-center justify-center w-full">
        <Loader onComplete={() => setAnimationDone(true)} />
      </div>
    );
  }

  return children;
}