'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import SectionTitle from '@/components/SectionTitle';
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
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionTitle
          title="Our Work"
          subtitle="Browse through our portfolio of successful projects"
        />

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {samples.map((sample, index) => (
            <motion.div
              key={sample.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedImage(sample.id)}
              className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-all"
            >
              <Image
                src={sample.image}
                alt={sample.title}
                fill
                className="object-cover"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2">{sample.title}</h3>
                  <p className="text-[var(--color-cyan)]">{sample.category}</p>
                </div>
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full">
                <span className="text-sm text-gray-900 font-medium">{sample.category}</span>
              </div>
            </motion.div>
          ))}
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
                      <p className="text-xl text-[var(--color-cyan)]">
                        {samples.find((s) => s.id === selectedImage)?.category}
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Like What You See?
          </h3>
          <p className="text-xl text-gray-600 mb-8">
            Let's create something amazing together
          </p>
          <motion.a
            href="/contact"
            className="inline-block px-8 py-4 bg-[var(--color-magenta)] text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all min-h-[44px]"
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
