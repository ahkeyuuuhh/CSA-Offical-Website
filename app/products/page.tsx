'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/SectionTitle';
import Footer from '@/components/Footer';
import { FileText, Image, Package, Palette, Printer, Sparkles, BookOpen, CreditCard, Shirt } from 'lucide-react';

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'print', label: 'Print Materials' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'specialty', label: 'Specialty' },
  ];

  const products = [
    {
      id: 1,
      title: 'Business Cards',
      category: 'print',
      description: 'Premium business cards with various finishes',
      price: 'From $49',
      Icon: CreditCard,
      features: ['Multiple finishes', 'Custom designs', 'Fast turnaround'],
    },
    {
      id: 2,
      title: 'Brochures',
      category: 'marketing',
      description: 'Professional brochures in various sizes',
      price: 'From $99',
      Icon: BookOpen,
      features: ['Tri-fold & bi-fold', 'Glossy or matte', 'Full color'],
    },
    {
      id: 3,
      title: 'Banners',
      category: 'marketing',
      description: 'Large format banners for events',
      price: 'From $149',
      Icon: Image,
      features: ['Weather resistant', 'Custom sizes', 'Indoor/outdoor'],
    },
    {
      id: 4,
      title: 'Flyers',
      category: 'marketing',
      description: 'Eye-catching flyers for promotions',
      price: 'From $39',
      Icon: FileText,
      features: ['Various sizes', 'Bulk discounts', 'Quick delivery'],
    },
    {
      id: 5,
      title: 'Posters',
      category: 'print',
      description: 'High-quality posters for any occasion',
      price: 'From $29',
      Icon: Image,
      features: ['Multiple sizes', 'Premium paper', 'Vibrant colors'],
    },
    {
      id: 6,
      title: 'Custom Packaging',
      category: 'specialty',
      description: 'Branded packaging solutions',
      price: 'Custom Quote',
      Icon: Package,
      features: ['Custom shapes', 'Brand colors', 'Eco-friendly options'],
    },
    {
      id: 7,
      title: 'Apparel Printing',
      category: 'specialty',
      description: 'Custom t-shirts and apparel',
      price: 'From $15/item',
      Icon: Shirt,
      features: ['Screen printing', 'Embroidery', 'Bulk orders'],
    },
    {
      id: 8,
      title: 'Design Services',
      category: 'specialty',
      description: 'Professional graphic design',
      price: 'From $199',
      Icon: Palette,
      features: ['Logo design', 'Brand identity', 'Print-ready files'],
    },
    {
      id: 9,
      title: 'Stationery',
      category: 'print',
      description: 'Letterheads, envelopes, and more',
      price: 'From $79',
      Icon: Printer,
      features: ['Matching sets', 'Premium paper', 'Professional look'],
    },
  ];

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-black pt-24">
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
                  ? 'bg-[var(--color-magenta)] text-white'
                  : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-[var(--color-cyan)] transition-all group"
            >
              <div className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-cyan)] to-[var(--color-magenta)] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <product.Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">{product.title}</h3>
                <p className="text-gray-400 mb-4">{product.description}</p>
                <p className="text-[var(--color-cyan)] font-bold text-xl mb-4">{product.price}</p>
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-gray-400">
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
      <Footer />
    </div>
  );
}
