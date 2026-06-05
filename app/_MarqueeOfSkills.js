'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(Observer);

export default function MarqueeOfSkills() {
  const containerRef = useRef(null);
  const tlRef = useRef(null);

  const skills = [
    'System Design',
    'Scalable Systems',
    'Ruby on Rails',
    'Laravel',
    'Next.js',
    'Jekyll',
    'Tailwind CSS',
    'PostgreSQL',
    'MySQL',
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {

      const items = gsap.utils.toArray('.marquee-item');

      // ---- horizontalLoop function (REQUIRED) ----
      function horizontalLoop(items, config) {
        items = gsap.utils.toArray(items);
        config = config || {};
        let tl = gsap.timeline({
            repeat: config.repeat,
            paused: config.paused,
            defaults: { ease: "none" },
            onReverseComplete: () =>
              tl.totalTime(tl.rawTime() + tl.duration() * 100),
          }),
          length = items.length,
          startX = items[0].offsetLeft,
          times = [],
          widths = [],
          xPercents = [],
          curIndex = 0,
          pixelsPerSecond = (config.speed || 1) * 100,
          totalWidth;

        gsap.set(items, {
          xPercent: (i, el) => {
            let w = (widths[i] = parseFloat(
              gsap.getProperty(el, "width", "px")
            ));
            xPercents[i] =
              (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
              gsap.getProperty(el, "xPercent");
            return xPercents[i];
          },
        });

        gsap.set(items, { x: 0 });

        totalWidth =
          items[length - 1].offsetLeft +
          (xPercents[length - 1] / 100) * widths[length - 1] -
          startX +
          items[length - 1].offsetWidth +
          (parseFloat(config.paddingRight) || 0);

        for (let i = 0; i < length; i++) {
          let item = items[i];
          let curX = (xPercents[i] / 100) * widths[i];
          let distanceToStart = item.offsetLeft + curX - startX;
          let distanceToLoop =
            distanceToStart + widths[i];

          tl.to(
            item,
            {
              xPercent:
                ((curX - distanceToLoop) / widths[i]) * 100,
              duration: distanceToLoop / pixelsPerSecond,
            },
            0
          )
            .fromTo(
              item,
              {
                xPercent:
                  ((curX - distanceToLoop + totalWidth) /
                    widths[i]) *
                  100,
              },
              {
                xPercent: xPercents[i],
                duration:
                  (curX - distanceToLoop + totalWidth - curX) /
                  pixelsPerSecond,
                immediateRender: false,
              },
              distanceToLoop / pixelsPerSecond
            )
            .add("label" + i, distanceToStart / pixelsPerSecond);

          times[i] = distanceToStart / pixelsPerSecond;
        }

        tl.progress(1, true).progress(0, true);
        return tl;
      }

      // ---- create loop ----
      const tl = horizontalLoop(items, {
        repeat: -1,
        paddingRight: 60,
        speed: 1,
      });

      tlRef.current = tl;

      // scroll interaction
      Observer.create({
        target: window,
        type: 'wheel,touch',
        onChangeY(self) {
          let factor = self.deltaY < 0 ? -2 : 2;

          gsap.timeline({ defaults: { ease: 'none' } })
            .to(tl, {
              timeScale: factor * 2,
              duration: 0.2,
              overwrite: true,
            })
            .to(tl, {
              timeScale: factor / 2,
              duration: 1,
            }, '+=0.3');
        },
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // pause on hover
  const handleEnter = () => tlRef.current?.pause();
  const handleLeave = () => tlRef.current?.resume();

  // drag direction
  const handleMouseDown = (e) => {
    let startX = e.clientX;

    const move = (ev) => {
      let diff = ev.clientX - startX;
      if (tlRef.current) {
        tlRef.current.timeScale(diff > 0 ? -1 : 1);
      }
    };

    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  return (
    <section
      ref={containerRef}
      className="w-full bg-ink text-paper overflow-hidden py-5 border-y-2 border-accent"
    >
      <div
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onMouseDown={handleMouseDown}
        className="flex whitespace-nowrap cursor-grab active:cursor-grabbing select-none"
      >
        {skills.concat(skills).map((skill, i) => (
          <h4
            key={i}
            className="marquee-item text-paper/85 text-lg md:text-2xl font-bold tracking-tight mx-2"
          >
            {skill} <span className="mx-3 text-accent">◆</span>
          </h4>
        ))}
      </div>
    </section>
  );
}