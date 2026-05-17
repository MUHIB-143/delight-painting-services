'use client';

import React, { useState } from 'react';
import ScrollAnimator from '../ScrollAnimator';
import styles from './ContactSection.module.css';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! We will contact you shortly.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="section">
      <div className="section-container">
        <ScrollAnimator animation="fadeUp">
          <div className={styles.header}>
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle">
              Ready to transform your space? Reach out for a free consultation and quote.
            </p>
          </div>
        </ScrollAnimator>

        <div className={styles.grid}>
          <ScrollAnimator animation="fadeLeft" delay={0.2}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.inputGroup}>
                <textarea
                  name="message"
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  className={styles.textarea}
                  rows={5}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Send Message
              </button>
            </form>
          </ScrollAnimator>

          <ScrollAnimator animation="fadeRight" delay={0.4}>
            <div className={styles.info}>
              {/* Australia Map SVG (simplified NSW highlight) */}
              <div className={styles.mapWrap}>
                <svg className={styles.map} viewBox="0 0 300 280" fill="none">
                  {/* Australia outline simplified */}
                  <path
                    d="M60 120 Q50 100 70 80 Q90 60 120 55 Q140 50 160 55 Q180 48 200 52 Q220 50 240 60 Q260 65 270 80 Q275 95 265 110 Q270 130 260 150 Q250 170 240 180 Q235 200 220 210 Q200 220 180 225 Q160 230 140 225 Q120 230 100 220 Q80 210 70 190 Q60 170 55 150 Q50 140 60 120Z"
                    fill="rgba(0, 163, 255, 0.05)"
                    stroke="rgba(0, 163, 255, 0.2)"
                    strokeWidth="1"
                  />
                  {/* NSW region highlight */}
                  <path
                    d="M200 100 Q220 95 235 110 Q240 125 235 140 Q225 155 210 160 Q195 155 185 145 Q180 130 185 115 Q190 105 200 100Z"
                    fill="rgba(0, 163, 255, 0.15)"
                    stroke="var(--accent-blue)"
                    strokeWidth="1.5"
                  />
                  {/* NSW label */}
                  <text x="205" y="132" fill="var(--accent-blue)" fontSize="10" fontWeight="600" textAnchor="middle">NSW</text>
                  {/* Glow dot */}
                  <circle cx="215" cy="125" r="4" fill="var(--accent-blue)" opacity="0.8">
                    <animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
                  </circle>
                </svg>
              </div>

              <div className={styles.contactCards}>
                <div className={styles.contactCard}>
                  <span className={styles.contactIcon}>📍</span>
                  <div>
                    <div className={styles.contactLabel}>Location</div>
                    <div className={styles.contactValue}>Sydney, NSW, Australia</div>
                  </div>
                </div>
                <div className={styles.contactCard}>
                  <span className={styles.contactIcon}>📞</span>
                  <div>
                    <div className={styles.contactLabel}>Phone</div>
                    <div className={styles.contactValue}>+61 4XX XXX XXX</div>
                  </div>
                </div>
                <div className={styles.contactCard}>
                  <span className={styles.contactIcon}>✉️</span>
                  <div>
                    <div className={styles.contactLabel}>Email</div>
                    <div className={styles.contactValue}>info@delightpainting.com.au</div>
                  </div>
                </div>
              </div>

              <div className={styles.social}>
                {['Facebook', 'Instagram', 'LinkedIn'].map((s) => (
                  <a key={s} href="#" className={styles.socialLink} title={s}>
                    {s.charAt(0)}
                  </a>
                ))}
              </div>
            </div>
          </ScrollAnimator>
        </div>
      </div>
    </section>
  );
}
