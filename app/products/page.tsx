'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import SectionTitle from '@/components/SectionTitle';
import DarkVeil from '@/components/DarkVeil';
import { X } from 'lucide-react';
import { usePageView } from '@/hooks/usePageView';

export default function Products() {
  usePageView('products');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'print', label: 'Print Materials' },
    { id: 'custom', label: 'Custom Items' },
    { id: 'specialty', label: 'Specialty' },
  ];

  const products = [
    {
      id: 1,
      title: 'Business Cards',
      category: 'print',
      description: 'Premium business cards with various finishes',
      price: 'From ₱40.00',
      image: '/assets/products-asset/business-card.jpg',
      features: ['Multiple finishes', 'Custom designs', 'Fast turnaround'],
    },
    {
      id: 2,
      title: 'Custom Stickers',
      category: 'custom',
      description: 'High-quality custom stickers in any shape',
      price: 'From ₱40.00',
      image: '/assets/products-asset/customized-stickers.jpg',
      features: ['Any shape', 'Waterproof', 'Vibrant colors'],
    },
    {
      id: 3,
      title: 'Photocards',
      category: 'print',
      description: 'Professional photocards for any occasion',
      price: 'From ₱40.00',
      image: '/assets/products-asset/photocards.jpg',
      features: ['High quality', 'Multiple sizes', 'Quick turnaround'],
    },
    {
      id: 4,
      title: 'Invitation Cards',
      category: 'print',
      description: 'Beautiful invitation cards for events',
      price: 'From ₱40.00',
      image: '/assets/products-asset/Invitation-cards.jpg',
      features: ['Custom designs', 'Premium paper', 'Elegant finishes'],
    },
    {
      id: 5,
      title: 'Custom Pins',
      category: 'custom',
      description: 'Unique custom pins and badges',
      price: 'From ₱40.00',
      image: '/assets/products-asset/customized-pins.jpg',
      features: ['Metal or enamel', 'Any design', 'Bulk discounts'],
    },
    {
      id: 6,
      title: 'Magnetic Bookmarks',
      category: 'specialty',
      description: 'Practical and stylish magnetic bookmarks',
      price: 'From ₱40.00',
      image: '/assets/products-asset/magnetic-bookmarks.jpg',
      features: ['Durable', 'Custom designs', 'Perfect gifts'],
    },
    {
      id: 7,
      title: 'Keychains',
      category: 'custom',
      description: 'Custom keychains in various materials',
      price: 'From ₱40.00',
      image: '/assets/products-asset/Keychains.jpg',
      features: ['Acrylic or metal', 'Any design', 'Great for promotions'],
    },
    {
      id: 8,
      title: 'Loyalty Cards',
      category: 'print',
      description: 'Professional loyalty cards for businesses',
      price: 'From ₱40.00',
      image: '/assets/products-asset/LOYALTY_CARD_MOCKUP.jpg',
      features: ['Plastic cards', 'Custom branding', 'Bulk pricing'],
    },
    {
      id: 9,
      title: 'Ref Magnets',
      category: 'specialty',
      description: 'Custom refrigerator magnets',
      price: 'From ₱40.00',
      image: '/assets/products-asset/Ref-magnets.jpg',
      features: ['Strong magnets', 'Any shape', 'Full color'],
    },
    {
      id: 10,
      title: 'Custom Boxes',
      category: 'custom',
      description: 'Branded packaging boxes',
      price: 'From ₱40.00',
      image: '/assets/products-asset/customized-box.png',
      features: ['Any size', 'Custom printing', 'Eco-friendly'],
    },
  ];

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="relative bg-gray-950">
      {/* DarkVeil Background */}
      <div className="absolute inset-0 z-0">
        <DarkVeil
          hueShift={280}
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
            title="Our Products"
            subtitle="Explore our comprehensive range of printing and design services"
          />

          {/* Pill-shaped Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`relative px-6 py-2.5 rounded-full font-semibold transition-all text-sm overflow-hidden ${
                  activeCategory === category.id
                    ? 'bg-[var(--color-magenta)] text-white shadow-lg shadow-pink-500/30'
                    : 'bg-white/10 text-white border border-white/20 backdrop-blur-sm'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeCategory !== category.id && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{category.label}</span>
                <motion.div
                  className="absolute inset-0 border-2 border-[var(--color-magenta)] rounded-full opacity-0"
                  whileHover={{ opacity: activeCategory === category.id ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>
            ))}
          </div>

          {/* Products Grid - Smaller Cards */}
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => setSelectedProduct(product)}
                className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-[var(--color-magenta)] transition-all group cursor-pointer"
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-white mb-1 line-clamp-1">{product.title}</h3>
                  <p className="text-[var(--color-magenta)] font-bold text-xs">{product.price}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid md:grid-cols-2 gap-6 p-6">
                {/* Image */}
                <div className="relative aspect-square rounded-2xl overflow-hidden">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col justify-center">
                  <h2 className="text-3xl font-bold text-white mb-4">{selectedProduct.title}</h2>
                  <p className="text-gray-200 mb-6 leading-relaxed">{selectedProduct.description}</p>
                  <p className="text-[var(--color-magenta)] font-bold text-2xl mb-8">{selectedProduct.price}</p>

                  <motion.a
                    href="/contact"
                    className="block w-full text-center px-8 py-4 bg-[var(--color-magenta)] text-white rounded-full font-semibold hover:bg-opacity-90 transition-all shadow-lg shadow-pink-500/30"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Inquire Now
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
