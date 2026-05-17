'use client';

import React from 'react';
import Image from 'next/image';
import logoImg from '@/assets/main.png';
import styles from './Footer.module.css';

const footerLinks = {
  Services: ['Residential Painting', 'Commercial Painting', 'Interior Painting', 'Exterior Painting', 'Spray Painting'],
  Company: ['About Us', 'Our Team', 'Careers', 'Blog', 'Press'],
  Support: ['Contact Us', 'FAQ', 'Terms of Service', 'Privacy Policy', 'Warranty'],
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <Image src={logoImg} alt="Delight Painting Services" width={160} height={48} style={{ objectFit: 'contain' }} />
            </div>
            <p className={styles.tagline}>
              Transforming spaces with premium painting services across NSW, Australia.
            </p>
            <div className={styles.social}>
              {['F', 'I', 'L', 'T'].map((letter, i) => (
                <a key={i} href="#" className={styles.socialLink}>
                  {letter}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className={styles.column}>
              <h4 className={styles.columnTitle}>{title}</h4>
              <ul className={styles.columnList}>
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className={styles.columnLink}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © 2024 Delight Painting Services. All rights reserved.
          </p>
          <p className={styles.credit}>
            Crafted with precision & passion
          </p>
        </div>
      </div>
    </footer>
  );
}
