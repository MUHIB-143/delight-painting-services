'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection';
import GallerySection from '@/components/sections/GallerySection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import BrandsSection from '@/components/sections/BrandsSection';
import ProcessSection from '@/components/sections/ProcessSection';
import StatsSection from '@/components/sections/StatsSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';

// Dynamic import for 3D scene (no SSR - WebGL requires browser)
const Scene3D = dynamic(() => import('@/components/3d/Scene3D'), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  return (
    <>
      {/* Fixed 3D WebGL Background */}
      <Scene3D />

      {/* HTML UI Layer */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <HeroSection />
        <ServicesSection />
        <WhyChooseUsSection />
        <GallerySection />
        <TestimonialsSection />
        <ProcessSection />
        <StatsSection />
        <BrandsSection />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
}
