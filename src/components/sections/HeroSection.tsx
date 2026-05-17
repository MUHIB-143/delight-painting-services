'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import ScrollAnimator from '../ScrollAnimator';
import styles from './HeroSection.module.css';

const HeroRoller = dynamic(() => import('@/components/3d/HeroRoller'), {
  ssr: false,
  loading: () => <div style={{ height: '400px' }} />
});

const badges = [
  { icon: '✓', label: '10+ Years', sub: 'Experience' },
  { icon: '🛡️', label: 'Licensed &', sub: 'Insured' },
  { icon: '🌿', label: 'Eco-Friendly', sub: 'Paints' },
  { icon: '⭐', label: 'Satisfaction', sub: 'Guarantee' },
  { icon: '👷', label: 'Professional', sub: 'Team' },
  { icon: '💰', label: 'Affordable', sub: 'Pricing' },
];

export default function HeroSection() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.overlay} />
      
      {/* Massive 3D Paint Roller Background Element */}
      <div className={styles.rollerWrapper}>
        <ScrollAnimator animation="fadeUp" delay={0.4} style={{ width: '100%', height: '100%' }}>
          <HeroRoller />
        </ScrollAnimator>
      </div>

      <div className={styles.container} style={{ position: 'relative', zIndex: 2 }}>
        <div className={styles.left}>
          <ScrollAnimator animation="fadeLeft" delay={0.2}>
            <div className={styles.tagline}>
              <span className={styles.taglineDot} />
              Premium Painting Experts
            </div>
          </ScrollAnimator>

          <ScrollAnimator animation="fadeLeft" delay={0.4}>
            <h1 className={styles.title}>
              Transforming Spaces<br />
              <span className={styles.highlight}>With Premium</span><br />
              Painting
            </h1>
          </ScrollAnimator>

          <ScrollAnimator animation="fadeLeft" delay={0.6}>
            <p className={styles.subtitle}>
              Professional Residential &amp; Commercial Painters<br />
              <span className={styles.features}>
                Luxury Finishing • Modern Techniques • Trusted Experts
              </span>
            </p>
          </ScrollAnimator>

          <ScrollAnimator animation="fadeUp" delay={0.8}>
            <div className={styles.ctas}>
              <a href="#contact" className="btn btn-primary">Get Free Quote</a>
              <a href="#services" className="btn btn-outline">Our Services</a>
            </div>
          </ScrollAnimator>

        </div>

        <div className={styles.right}>
          {badges.map((badge, i) => (
            <ScrollAnimator key={i} animation="fadeRight" delay={0.3 + i * 0.1}>
              <div className={`${styles.badge} glass-glow`}>
                <span className={styles.badgeIcon}>{badge.icon}</span>
                <div>
                  <div className={styles.badgeLabel}>{badge.label}</div>
                  <div className={styles.badgeSub}>{badge.sub}</div>
                </div>
              </div>
            </ScrollAnimator>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollMouse}>
          <div className={styles.scrollWheel} />
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
