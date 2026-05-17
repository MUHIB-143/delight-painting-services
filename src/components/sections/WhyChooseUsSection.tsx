'use client';

import React from 'react';
import ScrollAnimator from '../ScrollAnimator';
import styles from './WhyChooseUsSection.module.css';

const features = [
  {
    icon: '🛡️',
    title: 'Licensed & Insured',
    desc: 'Fully licensed and comprehensively insured for your complete peace of mind. All work compliant with Australian standards.',
    size: 'large',
  },
  {
    icon: '🏆',
    title: 'Warranty Included',
    desc: 'Every project backed by our industry-leading warranty. We stand behind the quality of our craftsmanship.',
    size: 'normal',
  },
  {
    icon: '🌿',
    title: 'Eco-Friendly Paints',
    desc: 'We use only low-VOC and environmentally responsible products that are safe for families, pets, and the planet.',
    size: 'normal',
  },
  {
    icon: '⭐',
    title: '10+ Years Experience',
    desc: 'Over a decade of transforming spaces across NSW. Our experienced team delivers exceptional results every time.',
    size: 'normal',
  },
  {
    icon: '🎯',
    title: 'Precision Techniques',
    desc: 'State-of-the-art equipment and modern painting methods ensure clean lines, uniform coverage, and lasting beauty.',
    size: 'normal',
  },
  {
    icon: '💬',
    title: 'Free Consultation',
    desc: 'Complimentary on-site colour consultation and detailed quotes with no hidden fees. Full transparency guaranteed.',
    size: 'large',
  },
];

export default function WhyChooseUsSection() {
  return (
    <section id="why-choose" className="section">
      <div className="section-container">
        <ScrollAnimator animation="fadeUp">
          <div className={styles.header}>
            <h2 className="section-title">Why Choose Us</h2>
            <p className="section-subtitle">
              Trusted by hundreds of homeowners and businesses across New South Wales.
            </p>
          </div>
        </ScrollAnimator>

        <div className={styles.grid}>
          {features.map((feat, i) => (
            <ScrollAnimator
              key={i}
              animation="fadeUp"
              delay={i * 0.1}
            >
              <div className={`${styles.card} ${feat.size === 'large' ? styles.cardLarge : ''}`}>
                <div className={styles.cardGlow} />
                <div className={styles.iconWrap}>
                  <span className={styles.icon}>{feat.icon}</span>
                </div>
                <h3 className={styles.title}>{feat.title}</h3>
                <p className={styles.desc}>{feat.desc}</p>
                <div className={styles.cardBorder} />
              </div>
            </ScrollAnimator>
          ))}
        </div>
      </div>
    </section>
  );
}
