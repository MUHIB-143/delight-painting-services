'use client';

import React from 'react';
import ScrollAnimator from '../ScrollAnimator';
import styles from './ProcessSection.module.css';

const steps = [
  {
    number: '01',
    title: 'Consultation',
    desc: 'Free on-site assessment and detailed project scoping with our expert team.',
    icon: '📋',
  },
  {
    number: '02',
    title: 'Colour Selection',
    desc: 'Professional colour matching with physical swatches and digital previews.',
    icon: '🎨',
  },
  {
    number: '03',
    title: 'Surface Preparation',
    desc: 'Thorough cleaning, sanding, priming, and masking for perfect adhesion.',
    icon: '🔧',
  },
  {
    number: '04',
    title: 'Final Finishing',
    desc: 'Premium application with quality inspection and touch-up before handover.',
    icon: '✨',
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="section">
      <div className="section-container">
        <ScrollAnimator animation="fadeUp">
          <div className={styles.header}>
            <h2 className="section-title">Our Process</h2>
            <p className="section-subtitle">
              A proven four-step workflow ensuring impeccable results on every project.
            </p>
          </div>
        </ScrollAnimator>

        <div className={styles.timeline}>
          <div className={styles.line}>
            <div className={styles.lineGlow} />
          </div>

          {steps.map((step, i) => (
            <ScrollAnimator key={i} animation="fadeUp" delay={i * 0.15}>
              <div className={styles.step}>
                <div className={styles.node}>
                  <div className={styles.nodeDot} />
                </div>
                <div className={styles.card}>
                  <span className={styles.number}>{step.number}</span>
                  <span className={styles.icon}>{step.icon}</span>
                  <h3 className={styles.title}>{step.title}</h3>
                  <p className={styles.desc}>{step.desc}</p>
                </div>
              </div>
            </ScrollAnimator>
          ))}
        </div>
      </div>
    </section>
  );
}
