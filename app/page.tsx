'use client';

import Hero from '@/components/Hero';
import SectionTitle from '@/components/SectionTitle';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { FileText, Image, Package, Palette, Printer, Sparkles } from 'lucide-react';

export default function Home() {
  const products = [
    {
      title: 'Business Cards',
      description: 'Professional business cards that make a lasting impression.',
      Icon: FileText,
    },
    {
      title: 'Brochures',
      description: 'Eye-catching brochures to showcase your business.',
      Icon: Package,
    },
    {
      title: 'Banners',
      description: 'Large format printing for events and promotions.',
      Icon: Image,
    },
    {
      title: 'Custom Design',
      description: 'Tailored design solutions for your unique needs.',
      Icon: Palette,
    },
    {
      title: 'Flyers & Posters',
      description: 'High-quality prints to spread your message.',
      Icon: Printer,
    },
    {
      title: 'Specialty Items',
      description: 'Unique printing solutions for special projects.',
      Icon: Sparkles,
    },
  ];

  const clients = [
    'Tech Startup Inc.',
    'Local Restaurant',
    'Real Estate Agency',
    'Fitness Center',
    'Law Firm',
    'Medical Practice',
  ];

  return (
    <div className="min-h-screen">
      <Hero />

      {/* Products Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Our Services"
            subtitle="Professional printing and design solutions for all your needs"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <ProductCard key={product.title} {...product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Why Choose CSA?"
            subtitle="Quality, speed, and creativity in every project"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Fast Turnaround',
                description: 'Quick delivery without compromising quality',
                color: 'cyan',
              },
              {
                title: 'Expert Design',
                description: 'Professional designers ready to bring your vision to life',
                color: 'magenta',
              },
              {
                title: 'Quality Guarantee',
                description: '100% satisfaction guaranteed on every project',
                color: 'yellow',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-${feature.color})] bg-opacity-20 flex items-center justify-center`}
                >
                  <div className={`w-8 h-8 rounded-full bg-[var(--color-${feature.color})]`} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Trusted By" subtitle="Businesses of all sizes trust us" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {clients.map((client, index) => (
              <motion.div
                key={client}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-center p-4 bg-gray-900 rounded-lg border border-gray-800 hover:border-[var(--color-cyan)] transition-colors"
              >
                <span className="text-gray-400 text-sm text-center">{client}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[var(--color-cyan)] via-[var(--color-magenta)] to-[var(--color-yellow)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Let's bring your creative vision to life together
            </p>
            <motion.a
              href="/contact"
              className="inline-block px-8 py-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition-all min-h-[44px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Today
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
