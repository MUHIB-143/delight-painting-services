'use client';

import React, { useEffect, useRef, useState } from 'react';
import ScrollAnimator from '../ScrollAnimator';
import styles from './StatsSection.module.css';

const stats = [
  { value: 500, suffix: '+', label: 'Projects Completed', icon: '🏗️', color: '#00A3FF' },
  { value: 10, suffix: '+', label: 'Years Experience', icon: '📅', color: '#00F0FF' },
  { value: 100, suffix: '%', label: 'Customer Satisfaction', icon: '⭐', color: '#FFD700' },
  { value: 25, suffix: '+', label: 'Professional Team', icon: '👷', color: '#4ECDC4' },
  { value: 0, suffix: '', label: 'Fast Project Delivery', icon: '⚡', isText: true, textValue: 'Fast', color: '#FF6B9D' },
];

function AnimatedCounter({ target, suffix, isText, textValue }: { target: number; suffix: string; isText?: boolean; textValue?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !counted.current) {
        counted.current = true;
        if (isText) {
          setCount(-1);
          return;
        }
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.floor(current));
          }
        }, duration / steps);
      }
    }, { threshold: 0.5 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, isText]);

  return (
    <div ref={ref} className={styles.value}>
      {isText ? textValue : count}{suffix}
    </div>
  );
}

export default function StatsSection() {
  return (
    <section id="stats" className="section">
      <div className="section-container">
        <ScrollAnimator animation="fadeUp">
          <div className={styles.header}>
            <h2 className="section-title">Our Impact in Numbers</h2>
            <p className="section-subtitle">
              Proven results that speak to our commitment to excellence.
            </p>
          </div>
        </ScrollAnimator>

        <div className={styles.grid}>
          {stats.map((stat, i) => (
            <ScrollAnimator key={i} animation="scale" delay={i * 0.1}>
              <div className={styles.card} style={{ '--stat-color': stat.color } as React.CSSProperties}>
                <div className={styles.iconWrap}>
                  <span className={styles.icon}>{stat.icon}</span>
                </div>
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  isText={stat.isText}
                  textValue={stat.textValue}
                />
                <div className={styles.label}>{stat.label}</div>
                <div className={styles.bar}>
                  <div className={styles.barFill} />
                </div>
              </div>
            </ScrollAnimator>
          ))}
        </div>
      </div>
    </section>
  );
}
