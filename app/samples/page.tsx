'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import SectionTitle from '@/components/SectionTitle';
import DarkVeil from '@/components/DarkVeil';
import ShapeGrid from '@/components/ShapeGrid';
import { X } from 'lucide-react';

export default function Samples() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const samples = [
    {
      id: 1,
      title: 'Invitation Cards',
      category: 'Print Materials',
      image: '/assets/samples-asset/Invitation-cards-sample.jpg',
    },
    {
      id: 2,
      title: 'Magnetic Bookmarks',
      category: 'Custom Items',
      image: '/assets/samples-asset/magnetic-bookmarks-sample.jpg',
    },
    {
      id: 3,
      title: 'Magnetic Bookmarks Set',
      category: 'Custom Items',
      image: '/assets/samples-asset/magnetic-bookmarks-sample2.jpg',
    },
    {
      id: 4,
      title: 'Photocards',
      category: 'Print Materials',
      image: '/assets/samples-asset/photocards-sample.jpg',
    },
    {
      id: 5,
      title: 'Ref Magnets',
      category: 'Specialty',
      image: '/assets/samples-asset/ref-magnets-sample.jpg',
    },
    {
      id: 6,
      title: 'Ref Magnets Collection',
      category: 'Specialty',
      image: '/assets/samples-asset/ref-magnets-sample2.jpg',
    },
    {
      id: 7,
      title: 'Custom Stickers',
      category: 'Custom Items',
      image: '/assets/samples-asset/stickers-sample2.jpg',
    },
    {
      id: 8,
      title: 'Sticker Designs',
      category: 'Custom Items',
      image: '/assets/samples-asset/stickers-sample3.jpg',
    },
  ];

  return (
    <div className="relative bg-gray-950">
      {/* DarkVeil Background - Purple */}
      <div className="absolute inset-0 z-0">
        <DarkVeil
          hueShift={270}
          noiseIntensity={0.06}
          scanlineIntensity={0}
          speed={0.25}
          scanlineFrequency={0}
          warpAmount={0.08}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <SectionTitle
            title="Our Work"
            subtitle="Browse through our portfolio of successful projects"
          />

          {/* Gallery Grid - Smaller Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {samples.map((sample, index) => (
              <motion.div
                key={sample.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02, y: -4 }}
                onClick={() => setSelectedImage(sample.id)}
                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group bg-black/40 backdrop-blur-md border border-white/10 hover:border-purple-500 transition-all"
              >
                <Image
                  src={sample.image}
                  alt={sample.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                  <div className="text-center">
                    <h3 className="text-sm font-bold text-white mb-1">{sample.title}</h3>
                    <p className="text-xs text-purple-400">{sample.category}</p>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3 px-2 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                  <span className="text-xs text-white font-medium">{sample.category}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          >
            <motion.button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full aspect-square rounded-lg overflow-hidden relative"
            >
              {samples.find((s) => s.id === selectedImage) && (
                <>
                  <Image
                    src={samples.find((s) => s.id === selectedImage)!.image}
                    alt={samples.find((s) => s.id === selectedImage)!.title}
                    fill
                    className="object-contain"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {samples.find((s) => s.id === selectedImage)?.title}
                    </h2>
                    <p className="text-xl text-purple-400">
                      {samples.find((s) => s.id === selectedImage)?.category}
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section with ShapeGrid Background */}
      <div className="relative mt-20">
        {/* ShapeGrid Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <ShapeGrid />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 text-center py-20 px-4"
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            Like What You See?
          </h3>
          <p className="text-xl text-gray-300 mb-8">
            Let's create something amazing together
          </p>
          <motion.a
            href="/contact"
            className="inline-block px-8 py-4 bg-[var(--color-magenta)] text-white rounded-full font-semibold hover:bg-opacity-90 transition-all shadow-lg shadow-pink-500/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Project
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
