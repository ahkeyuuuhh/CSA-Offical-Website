'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '@/components/SectionTitle';
import Footer from '@/components/Footer';
import { X } from 'lucide-react';

export default function Samples() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const samples = [
    {
      id: 1,
      title: 'Business Card Design',
      category: 'Business Cards',
      color: 'from-blue-500 to-purple-500',
    },
    {
      id: 2,
      title: 'Restaurant Menu',
      category: 'Brochures',
      color: 'from-red-500 to-orange-500',
    },
    {
      id: 3,
      title: 'Event Banner',
      category: 'Banners',
      color: 'from-green-500 to-teal-500',
    },
    {
      id: 4,
      title: 'Product Flyer',
      category: 'Flyers',
      color: 'from-yellow-500 to-red-500',
    },
    {
      id: 5,
      title: 'Corporate Brochure',
      category: 'Brochures',
      color: 'from-indigo-500 to-blue-500',
    },
    {
      id: 6,
      title: 'Promotional Poster',
      category: 'Posters',
      color: 'from-pink-500 to-purple-500',
    },
    {
      id: 7,
      title: 'Brand Identity',
      category: 'Design',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      id: 8,
      title: 'Custom Packaging',
      category: 'Packaging',
      color: 'from-orange-500 to-red-500',
    },
    {
      id: 9,
      title: 'T-Shirt Design',
      category: 'Apparel',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <div className="min-h-screen bg-black pt-24">
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
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedImage(sample.id)}
              className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
            >
              {/* Placeholder gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${sample.color}`} />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-center p-4">
                  <h3 className="text-xl font-bold text-white mb-2">{sample.title}</h3>
                  <p className="text-[var(--color-cyan)]">{sample.category}</p>
                </div>
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-sm rounded-full">
                <span className="text-sm text-white">{sample.category}</span>
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
                className="max-w-4xl w-full aspect-square rounded-lg overflow-hidden"
              >
                {samples.find((s) => s.id === selectedImage) && (
                  <div
                    className={`w-full h-full bg-gradient-to-br ${
                      samples.find((s) => s.id === selectedImage)?.color
                    } flex items-center justify-center`}
                  >
                    <div className="text-center p-8">
                      <h2 className="text-4xl font-bold text-white mb-4">
                        {samples.find((s) => s.id === selectedImage)?.title}
                      </h2>
                      <p className="text-2xl text-white/80">
                        {samples.find((s) => s.id === selectedImage)?.category}
                      </p>
                    </div>
                  </div>
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
          <h3 className="text-3xl font-bold text-white mb-4">
            Like What You See?
          </h3>
          <p className="text-xl text-gray-400 mb-8">
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
      <Footer />
    </div>
  );
}
