'use client';

import React from 'react';
import ScrollAnimator from '../ScrollAnimator';
import styles from './BrandsSection.module.css';

const brands = [
  { name: 'DULUX', font: 'Arial Black, sans-serif' },
  { name: 'TAUBMANS', font: 'Trebuchet MS, sans-serif' },
  { name: 'wattyl', font: 'Verdana, sans-serif' },
  { name: 'HAYMES', font: 'Georgia, serif' },
  { name: 'BRITISH PAINTS', font: 'Impact, sans-serif' },
  { name: 'SOLVER', font: 'Courier New, monospace' },
];

export default function BrandsSection() {
  return (
    <section id="brands" className="section" style={{ padding: '60px 0' }}>
      <div className="section-container">
        <ScrollAnimator animation="fadeUp">
          <div className={styles.header}>
            <h2 className="section-title" style={{ fontSize: '28px', marginBottom: '8px' }}>Brands We Trust</h2>
          </div>
        </ScrollAnimator>

        <div className={styles.logoFlex}>
          {brands.map((brand, i) => (
            <ScrollAnimator key={i} animation="fadeUp" delay={i * 0.1}>
              <div 
                className={styles.logoItem}
                style={{ fontFamily: brand.font }}
              >
                {brand.name}
              </div>
            </ScrollAnimator>
          ))}
        </div>
      </div>
    </section>
  );
}
