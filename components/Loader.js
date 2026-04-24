'use client';

import { useEffect } from 'react';
import { animate, svg, stagger } from 'animejs';
import AbrarLineArt from '@/components/AbrarLineArt';

export default function Loader({ onComplete } = {}) {
  useEffect(() => {
    const drawable = svg.createDrawable('.line');
    const animation = animate(drawable, {
      draw: ['0 0', '0 1', '1 1'],
      easing: 'inOutQuad',
      duration: 2000,
      delay: stagger(100),
      loop: true,
    });

    if (animation && animation.finished && typeof onComplete === 'function') {
      animation.finished.then(() => onComplete()).catch(() => {});
    }

    return () => {
      try {
        animation.cancel && animation.cancel();
      } catch (e) {}
    };
  }, [onComplete]);

  return (
    <div className="flex space-x-2 items-center justify-center w-[50vw] max-w-300">
      <AbrarLineArt width="50%" height="50%" />
    </div>
  );
}
