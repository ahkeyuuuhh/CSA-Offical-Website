'use client';

import Hero from '@/components/Hero';
import SectionTitle from '@/components/SectionTitle';
import CircularGallery from '@/components/CircularGallery';
import Masonry from '@/components/Masonry';
import Aurora from '@/components/Aurora';
import SpotlightCard from '@/components/SpotlightCard';
import ShapeGrid from '@/components/ShapeGrid';
import DarkVeil from '@/components/DarkVeil';
import FadeIn from '@/components/animations/FadeIn';
import SlideIn from '@/components/animations/SlideIn';
import { motion } from 'framer-motion';
import { Check, Zap, Award } from 'lucide-react';

export default function Home() {
  const masonryItems = [
    {
      id: '1',
      img: '/assets/products-asset/business-card.jpg',
      url: '/products',
      height: 400
    },
    {
      id: '2',
      img: '/assets/products-asset/customized-stickers.jpg',
      url: '/products',
      height: 350
    },
    {
      id: '3',
      img: '/assets/products-asset/photocards.jpg',
      url: '/products',
      height: 500
    },
    {
      id: '4',
      img: '/assets/products-asset/Invitation-cards.jpg',
      url: '/products',
      height: 450
    },
    {
      id: '5',
      img: '/assets/products-asset/customized-pins.jpg',
      url: '/products',
      height: 380
    },
    {
      id: '6',
      img: '/assets/products-asset/magnetic-bookmarks.jpg',
      url: '/products',
      height: 420
    },
    {
      id: '7',
      img: '/assets/products-asset/Keychains.jpg',
      url: '/products',
      height: 400
    },
    {
      id: '8',
      img: '/assets/products-asset/Ref-magnets.jpg',
      url: '/products',
      height: 360
    },
    {
      id: '9',
      img: '/assets/products-asset/customized-box.png',
      url: '/products',
      height: 440
    },
    {
      id: '10',
      img: '/assets/products-asset/customized-loot-chip-bags.jpg',
      url: '/products',
      height: 390
    },
    {
      id: '11',
      img: '/assets/products-asset/customized-sintr-boards.jpg',
      url: '/products',
      height: 410
    },
    {
      id: '12',
      img: '/assets/products-asset/cute-couple-pins.jpg',
      url: '/products',
      height: 370
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      <Hero />

      {/* Featured Products Section */}
      <section className="relative py-24 bg-gray-950 overflow-hidden">
        {/* ShapeGrid Background */}
        <div className="absolute inset-0">
          <ShapeGrid
            speed={0.5}
            squareSize={40}
            direction="diagonal"
            borderColor="#271E37"
            hoverFillColor="#222222"
            shape="square"
            hoverTrailAmount={0}
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionTitle
              title="Featured Products"
              subtitle="Explore our most popular printing and design solutions"
            />
          </FadeIn>
          <FadeIn delay={0.2}>
            <div style={{ height: '600px', position: 'relative' }}>
              <CircularGallery
                bend={3}
                textColor="#ffffff"
                borderRadius={0.05}
                scrollSpeed={2}
                scrollEase={0.05}
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div className="text-center mt-16">
              <motion.a
                href="/products"
                className="group relative inline-block px-8 py-4 bg-gray-900 text-white rounded-full font-semibold overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10">View All Products</span>
              </motion.a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* About Overview Section */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        {/* Aurora Background */}
        <div className="absolute inset-0 opacity-20">
          <Aurora
            colorStops={["#ff66f2", "#B19EEF", "#5227FF"]}
            blend={0.5}
            amplitude={1.0}
            speed={1}
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SlideIn direction="left">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                About CSA Print & Design
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                With over a decade of experience in the printing and design industry, CSA Print & Design has become a trusted partner for businesses and individuals seeking exceptional quality and creative solutions.
              </p>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Our commitment to excellence, attention to detail, and passion for bringing ideas to life sets us apart. From small personal projects to large corporate campaigns, we deliver results that exceed expectations.
              </p>
              <motion.a
                href="/about"
                className="group relative inline-block px-8 py-4 bg-[var(--color-magenta)] text-white rounded-full font-semibold overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10">Learn More About Us</span>
              </motion.a>
            </SlideIn>
            <SlideIn direction="right">
              <Masonry
                items={masonryItems}
                ease="power3.out"
                duration={0.6}
                stagger={0.05}
                animateFrom="bottom"
                scaleOnHover
                hoverScale={0.95}
                blurToFocus
                colorShiftOnHover={false}
              />
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section with SpotlightCard */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Why Choose CSA?
              </h2>
              <p className="text-xl text-gray-400">
                Quality, speed, and creativity in every project
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn delay={0.1}>
              <SpotlightCard
                className="h-full"
                spotlightColor="rgba(0, 229, 255, 0.2)"
              >
                <div className="flex flex-col h-full">
                  <div className="w-14 h-14 bg-cyan-500/20 rounded-2xl flex items-center justify-center mb-6">
                    <Zap className="w-7 h-7 text-cyan-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Fast Turnaround</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Quick delivery without compromising on quality. We understand your deadlines matter and work efficiently to meet them.
                  </p>
                </div>
              </SpotlightCard>
            </FadeIn>

            <FadeIn delay={0.2}>
              <SpotlightCard
                className="h-full"
                spotlightColor="rgba(233, 30, 99, 0.2)"
              >
                <div className="flex flex-col h-full">
                  <div className="w-14 h-14 bg-pink-500/20 rounded-2xl flex items-center justify-center mb-6">
                    <Award className="w-7 h-7 text-pink-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Premium Quality</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Top-tier materials and printing technology ensure exceptional results every time. Your satisfaction is our guarantee.
                  </p>
                </div>
              </SpotlightCard>
            </FadeIn>

            <FadeIn delay={0.3}>
              <SpotlightCard
                className="h-full"
                spotlightColor="rgba(82, 39, 255, 0.2)"
              >
                <div className="flex flex-col h-full">
                  <div className="w-14 h-14 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6">
                    <Check className="w-7 h-7 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Satisfaction Guaranteed</h3>
                  <p className="text-gray-400 leading-relaxed">
                    100% satisfaction guarantee on every project. Your success is our priority, and we stand behind our work.
                  </p>
                </div>
              </SpotlightCard>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden bg-gray-950">
        {/* DarkVeil Background */}
        <div className="absolute inset-0">
          <DarkVeil
            hueShift={320}
            noiseIntensity={0.08}
            scanlineIntensity={0}
            speed={0.4}
            scanlineFrequency={0}
            warpAmount={0.15}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Let's bring your creative vision to life together. Get in touch today for a free consultation.
            </p>
            <motion.a
              href="/contact"
              className="group relative inline-block px-10 py-5 bg-white text-gray-900 rounded-full font-semibold shadow-xl overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10">Get Started Today</span>
            </motion.a>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
