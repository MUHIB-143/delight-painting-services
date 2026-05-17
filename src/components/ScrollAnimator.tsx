'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ScrollAnimatorProps {
  children: React.ReactNode;
  animation?: 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale' | 'fade';
  delay?: number;
  duration?: number;
  threshold?: number; // 0 to 1, how much of element needs to be in view
  className?: string;
  style?: React.CSSProperties;
}

export default function ScrollAnimator({
  children,
  animation = 'fadeUp',
  delay = 0,
  duration = 0.8,
  threshold = 0.15,
  className = '',
  style = {},
}: ScrollAnimatorProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);

    let fromVars: gsap.TweenVars = { opacity: 0 };
    if (animation === 'fadeUp') { fromVars.y = 60; }
    else if (animation === 'fadeLeft') { fromVars.x = -60; }
    else if (animation === 'fadeRight') { fromVars.x = 60; }
    else if (animation === 'scale') { fromVars.scale = 0.85; }

    const st = gsap.fromTo(
      el,
      fromVars,
      {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: `top ${100 - threshold * 100}%`,
          // Replay animation if it leaves the viewport
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      st.kill();
      ScrollTrigger.getById(el.id)?.kill();
    };
  }, [animation, delay, duration, threshold]);

  return (
    <div ref={ref} className={className} style={{ ...style, opacity: 0 }}>
      {children}
    </div>
  );
}
