'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ScrollAnimator from '../ScrollAnimator';
import styles from './GallerySection.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import images
import img1 from '@/assets/gallery_img1.jpg';
import img2 from '@/assets/gallery_img2.jpg';
import img3 from '@/assets/gallery_img3.jpg';
import img4 from '@/assets/gallery_img4.jpg';
import img5 from '@/assets/image2.jpg';
import img6 from '@/assets/image3.jpg';

const projects = [
  { title: 'Modern Living Room', category: 'Interior', color: '#FF6B9D', image: img1 },
  { title: 'Luxury Villa Exterior', category: 'Exterior', color: '#4ECDC4', image: img2 },
  { title: 'Corporate Office', category: 'Commercial', color: '#45B7D1', image: img3 },
  { title: 'Heritage Restoration', category: 'Specialty', color: '#F7DC6F', image: img4 },
  { title: 'Contemporary Kitchen', category: 'Interior', color: '#E74C3C', image: img5 },
  { title: 'Beachside Apartment', category: 'Residential', color: '#9B59B6', image: img6 },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const matchMedia = gsap.matchMedia();

    matchMedia.add("(min-width: 768px)", () => {
      const carousel = carouselRef.current;
      if (!carousel) return;

      const cards = gsap.utils.toArray('.gallery-card');

      // Setup horizontal scroll
      const paddingRight = window.innerWidth < 768 ? window.innerWidth * 0.2 : window.innerWidth * 0.5;
      const totalScroll = carousel.scrollWidth - window.innerWidth + paddingRight;

      const tween = gsap.to(carousel, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1, // Momentum smoothness
          end: () => "+=" + totalScroll,
        }
      });

      // Removed the custom fromTo 3D 'coming from' animations upon user request
      // Now the gallery seamlessly scrolls horizontally without complex visual distortions or card-level load delays.
      
      return () => {
        tween.kill();
      };
    });

    return () => matchMedia.revert();
  }, []);

  return (
    <section id="gallery" className="section" ref={sectionRef} style={{ overflow: 'hidden' }}>
      <div className="section-container" style={{ paddingBottom: '40px' }}>
        <ScrollAnimator animation="fadeUp">
          <div className={styles.header}>
            <h2 className="section-title">Cinematic Project Gallery</h2>
            <p className="section-subtitle">
              A showcase of our finest transformations across residential and commercial spaces.
            </p>
          </div>
        </ScrollAnimator>
      </div>

      <div className={styles.carouselWrap}>
        <div ref={carouselRef} className={styles.carousel}>
        {projects.map((project, i) => (
          <div
            key={i}
            className={`gallery-card ${styles.card} ${i === active ? styles.cardActive : ''}`}
            onClick={() => setActive(i)}
            style={{ '--project-color': project.color } as React.CSSProperties}
          >
            <div className={styles.cardImage}>
              <Image 
                src={project.image} 
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'cover', zIndex: 0 }}
                placeholder="blur"
              />
              <div className={styles.cardGradient} style={{
                background: `linear-gradient(to top, rgba(30, 41, 59, 1), rgba(30, 41, 59, 0.4) 50%, rgba(30, 41, 59, 0.05))`,
                position: 'absolute',
                inset: 0,
                zIndex: 1
              }} />
              <div className={styles.cardIcon} style={{ zIndex: 2 }}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="4" y="8" width="40" height="32" rx="4" stroke={project.color} strokeWidth="2" fill={`${project.color}11`} />
                  <path d="M4 32L16 22L24 28L36 16L44 24" stroke={project.color} strokeWidth="2" fill="none" />
                  <circle cx="14" cy="18" r="3" fill={project.color} opacity="0.5" />
                </svg>
              </div>
            </div>
            
            {/* Absolute Text Overlay */}
            <div className={styles.cardInfo}>
              <span className={styles.cardCategory}>{project.category}</span>
              <h3 className={styles.cardTitle}>{project.title}</h3>
            </div>
            
            <div className={styles.cardOverlay} />
          </div>
        ))}
        </div>
      </div>

      <div className={styles.nav} style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
        {projects.map((_, i) => (
          <button
            key={i}
            className={`${styles.navDot} ${i === active ? styles.navDotActive : ''}`}
            onClick={() => setActive(i)}
            aria-label={`View project ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
