'use client';

import React from 'react';
import ScrollAnimator from '../ScrollAnimator';
import styles from './TestimonialsSection.module.css';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Homeowner, Sydney',
    text: 'Excellent craftsmanship! The team transformed our entire home with meticulous attention to detail. Highly recommended.',
    rating: 5,
  },
  {
    name: 'James Robertson',
    role: 'Property Manager',
    text: 'Professional and reliable. They completed our commercial project ahead of schedule with outstanding quality.',
    rating: 5,
  },
  {
    name: 'Emily Thompson',
    role: 'Interior Designer',
    text: 'Amazing transformation! Their colour matching and finishing work is second to none. A true pleasure to collaborate with.',
    rating: 5,
  },
  {
    name: 'David Chen',
    role: 'Business Owner',
    text: 'Quality workmanship at competitive pricing. Their attention to surface preparation makes all the difference.',
    rating: 5,
  },
  {
    name: 'Lisa Anderson',
    role: 'Real Estate Agent',
    text: 'Affordable quality service! Consistently delivers premium results that help our properties stand out.',
    rating: 5,
  },
  {
    name: 'Mark Williams',
    role: 'Architect',
    text: 'Outstanding! Their technical precision and modern finishing techniques exceed industry standards every time.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="section">
      <div className="section-container">
        <ScrollAnimator animation="fadeUp">
          <div className={styles.header}>
            <h2 className="section-title">Premium Testimonials</h2>
            <p className="section-subtitle">
              Hear from our satisfied clients about their experience with Delight Painting Services.
            </p>
          </div>
        </ScrollAnimator>

        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <ScrollAnimator
              key={i}
              animation={i % 2 === 0 ? 'fadeLeft' : 'fadeRight'}
              delay={i * 0.1}
            >
              <div className={styles.cardWrap}>
                <div className={styles.cardTrail} />
                <div className={styles.card}>
                  <div className={styles.quoteIcon}>"</div>
                  <p className={styles.text}>{t.text}</p>
                  <div className={styles.author}>
                    <div className={styles.avatar}>
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className={styles.name}>{t.name}</div>
                      <div className={styles.role}>{t.role}</div>
                    </div>
                  </div>
                  <div className={styles.stars}>
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <span key={j} className={styles.star}>★</span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollAnimator>
          ))}
        </div>
      </div>
    </section>
  );
}
