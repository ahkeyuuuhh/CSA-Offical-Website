'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import BlurText from './animations/BlurText';
import DarkVeil from './DarkVeil';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* DarkVeil Background */}
      <div className="absolute inset-0">
        <DarkVeil
          hueShift={300}
          noiseIntensity={0.05}
          scanlineIntensity={0}
          speed={0.3}
          scanlineFrequency={0}
          warpAmount={0.1}
        />
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Accent shapes */}
      <motion.div
        className="absolute top-20 right-10 w-72 h-72 bg-[var(--color-cyan)]/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-96 h-96 bg-[var(--color-magenta)]/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full shadow-sm border border-white/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-[var(--color-magenta)]" />
            <span className="text-sm font-medium text-white">
              Professional Printing & Design Services
            </span>
          </motion.div>

          {/* Main heading with BlurText */}
          <BlurText
            text="Bring Your Vision To Life"
            delay={0.3}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="text-xl sm:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Quality printing and creative design solutions for businesses of all sizes.
            From concept to completion, we deliver excellence.
          </motion.p>

          {/* CTA Buttons with React Bits style animations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="/products"
              className="group relative w-full sm:w-auto px-8 py-4 bg-[var(--color-magenta)] text-white rounded-full font-semibold flex items-center justify-center gap-2 shadow-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10">Explore Our Work</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>

            <motion.a
              href="/contact"
              className="group relative w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-semibold border-2 border-white/30 overflow-hidden"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10">Get in Touch</span>
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 bg-white/70 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
