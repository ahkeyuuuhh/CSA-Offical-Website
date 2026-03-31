'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import SectionTitle from '@/components/SectionTitle';

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('all');

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
      price: 'From $49',
      image: '/assets/products-asset/business-card.jpg',
      features: ['Multiple finishes', 'Custom designs', 'Fast turnaround'],
    },
    {
      id: 2,
      title: 'Custom Stickers',
      category: 'custom',
      description: 'High-quality custom stickers in any shape',
      price: 'From $29',
      image: '/assets/products-asset/customized-stickers.jpg',
      features: ['Any shape', 'Waterproof', 'Vibrant colors'],
    },
    {
      id: 3,
      title: 'Photocards',
      category: 'print',
      description: 'Professional photocards for any occasion',
      price: 'From $39',
      image: '/assets/products-asset/photocards.jpg',
      features: ['High quality', 'Multiple sizes', 'Quick turnaround'],
    },
    {
      id: 4,
      title: 'Invitation Cards',
      category: 'print',
      description: 'Beautiful invitation cards for events',
      price: 'From $59',
      image: '/assets/products-asset/Invitation-cards.jpg',
      features: ['Custom designs', 'Premium paper', 'Elegant finishes'],
    },
    {
      id: 5,
      title: 'Custom Pins',
      category: 'custom',
      description: 'Unique custom pins and badges',
      price: 'From $79',
      image: '/assets/products-asset/customized-pins.jpg',
      features: ['Metal or enamel', 'Any design', 'Bulk discounts'],
    },
    {
      id: 6,
      title: 'Magnetic Bookmarks',
      category: 'specialty',
      description: 'Practical and stylish magnetic bookmarks',
      price: 'From $19',
      image: '/assets/products-asset/magnetic-bookmarks.jpg',
      features: ['Durable', 'Custom designs', 'Perfect gifts'],
    },
    {
      id: 7,
      title: 'Keychains',
      category: 'custom',
      description: 'Custom keychains in various materials',
      price: 'From $25',
      image: '/assets/products-asset/Keychains.jpg',
      features: ['Acrylic or metal', 'Any design', 'Great for promotions'],
    },
    {
      id: 8,
      title: 'Loyalty Cards',
      category: 'print',
      description: 'Professional loyalty cards for businesses',
      price: 'From $89',
      image: '/assets/products-asset/LOYALTY_CARD_MOCKUP.jpg',
      features: ['Plastic cards', 'Custom branding', 'Bulk pricing'],
    },
    {
      id: 9,
      title: 'Ref Magnets',
      category: 'specialty',
      description: 'Custom refrigerator magnets',
      price: 'From $29',
      image: '/assets/products-asset/Ref-magnets.jpg',
      features: ['Strong magnets', 'Any shape', 'Full color'],
    },
    {
      id: 10,
      title: 'Custom Boxes',
      category: 'custom',
      description: 'Branded packaging boxes',
      price: 'Custom Quote',
      image: '/assets/products-asset/customized-box.png',
      features: ['Any size', 'Custom printing', 'Eco-friendly'],
    },
  ];

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionTitle
          title="Our Products"
          subtitle="Explore our comprehensive range of printing and design services"
        />

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all min-h-[44px] ${
                activeCategory === category.id
                  ? 'bg-[var(--color-magenta)] text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)]'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </div>

        {/* Products Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all group"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.title}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <p className="text-[var(--color-magenta)] font-bold text-xl mb-4">{product.price}</p>
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-gray-600 text-sm">
                      <div className="w-1.5 h-1.5 bg-[var(--color-cyan)] rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.a
                  href="/contact"
                  className="block w-full text-center px-6 py-3 bg-[var(--color-magenta)] text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all min-h-[44px]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Quote
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
