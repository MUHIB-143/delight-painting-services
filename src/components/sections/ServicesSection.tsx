'use client';

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ScrollAnimator from '../ScrollAnimator';
import styles from './ServicesSection.module.css';

// Using local assets
import homeImg from '@/assets/home_img.jpg';
import s1 from '@/assets/service_img1.jpg';
import s2 from '@/assets/service_img2.jpg';
import s3 from '@/assets/service_img3.jpg';
import s4 from '@/assets/service_img4.jpg';
import gallery2 from '@/assets/gallery_img2.jpg';

interface Service {
  id: string;
  title: string;
  desc: string;
  details: string;
  icon: string;
  image: any;
}

const servicesContent: Service[] = [
  {
    id: '01',
    title: 'Residential Painting',
    desc: 'One of the most effective ways to personalize your living space is with color. Bright, muted, cheerful, elegant.',
    details: 'When it comes to high-quality residential painting, Delight Painting Services is the company ready to meet your diverse needs. If you have opted for our residential painting service, our licensed painters will prepare the walls by cleaning them and repairing the cracks before carrying out the sanding and application of the primer. Finally, after the completion of the job, they will remove all the debris to make the area neat and clean.',
    icon: '🏠',
    image: homeImg,
  },
  {
    id: '02',
    title: 'Commercial Painting',
    desc: 'Delight Painting offer you a variety of services for commercial customers! Check below for commercial services.',
    details: 'When it comes to commercial painting, our local professional painters in Strathfield and Stanmore will work at your convenient time to minimise the downtime in your office. Additionally, they will use specific painting tools optimised for painting commercial buildings to achieve the best results and to complete the job on time.',
    icon: '🏢',
    image: s1,
  },
  {
    id: '03',
    title: 'Interior House Painting',
    desc: 'On Interior walls Sanding is done to remove existing coat of paint and to ensure surface is dry from dust and dirt.',
    details: 'Our best local interior painters will diagnose and repair the cracks on your walls and remove the mould and mildew using the steel wire brush. We prepare your building intricately before starting the painting job. We use state of the art painting tools and eco-friendly paints to guarantee 100% satisfaction!',
    icon: '🎨',
    image: s2,
  },
  {
    id: '04',
    title: 'Exterior House Painting',
    desc: 'Do you want your home to get a fresh coat of paint that will add a new lease of life and beauty to it?',
    details: 'Our exterior painters employ rigorous preparations, meticulously stripping back existing paint layers through pressure-cleaning and expert sanding techniques. We use the highest quality weather-resistant materials designed to withstand the harsh Australian climate and radically restore the curb appeal of your property.',
    icon: '🏗️',
    image: s3,
  },
  {
    id: '05',
    title: 'Roof Painting & Cleaning',
    desc: 'There is multiple color choices available and it can be applied to nearly all style of roofs.',
    details: 'At Delight Painting Services we offer cleaning and painting of roofs where our professionals will remove the accumulated dust and debris on your roof, and apply the best quality weather-resistant paint that will last for years. We ensure total restoration to protect the integrity of your properties crown.',
    icon: '🏚️',
    image: s4,
  },
  {
    id: '06',
    title: 'Water Pressure Cleaning',
    desc: 'There’s no quicker, more convenient way to wash and prime medium-size parts and projects.',
    details: 'A critical stage of any thorough renovation. Our team will pressure-clean the surfaces to remove severe dirt, dust, and stubborn moss before moving on to the painting. We can also pressure clean pathways, driveways, and distinct facades offering them a restored, unblemished glow.',
    icon: '💧',
    image: gallery2,
  }
];

export default function ServicesSection() {
  const [activeModal, setActiveModal] = useState<Service | null>(null);

  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [activeModal]);

  return (
    <section id="services" className="section" style={{ zIndex: activeModal ? 9999 : 1 }}>
      <div className="section-container">
        <ScrollAnimator animation="fadeUp">
          <div className={styles.header}>
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">
              Comprehensive painting solutions tailored to transform every space with precision and artistry.
            </p>
          </div>
        </ScrollAnimator>

        <div className={styles.grid}>
          {servicesContent.map((service, i) => (
            <ScrollAnimator key={i} animation="fadeUp" delay={i * 0.1}>
              <div 
                className={styles.card}
                onClick={() => setActiveModal(service)}
              >
                <Image 
                  src={service.image} 
                  alt={service.title}
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  style={{ objectFit: 'cover' }} 
                  placeholder="blur"
                />
                <div className={styles.cardOverlay} />
                <div className={styles.cardGlow} />
                <div className={styles.cardContent}>
                  <div className={styles.cardNumber}>{service.id}</div>
                  <div className={styles.cardIcon}>{service.icon}</div>
                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  <p className={styles.cardDesc}>{service.desc}</p>
                  <div className={styles.cardFooter}>
                    <span className={styles.learnMore}>Learn More →</span>
                  </div>
                </div>
                <div className={styles.cardSheen} />
              </div>
            </ScrollAnimator>
          ))}
        </div>

        {/* DETAILS POPUP MODAL */}
        {activeModal && (
          <div 
             className={styles.modalOverlay} 
             onClick={() => setActiveModal(null)}
             data-lenis-prevent="true"
          >
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <button className={styles.closeBtn} onClick={() => setActiveModal(null)}>&times;</button>
              
              <div className={styles.modalImageWrapper}>
                <Image 
                  src={activeModal.image} 
                  alt={activeModal.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  placeholder="blur"
                />
                <div className={styles.modalImageOverlay} />
              </div>
              
              <div className={styles.modalTextWrapper}>
                <div className={styles.modalIcon}>{activeModal.icon}</div>
                <h3 className={styles.modalTitle}>{activeModal.title}</h3>
                <p className={styles.modalBody}>{activeModal.details}</p>
              </div>
            </div>
          </div>
        )}

        <div className={styles.pagination}>
          <span className={styles.dot} />
          <span className={`${styles.dot} ${styles.dotActive}`} />
          <span className={styles.dot} />
        </div>
      </div>
    </section>
  );
}
