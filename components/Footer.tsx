'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold bg-gradient-to-r from-[var(--color-cyan)] via-[var(--color-magenta)] to-[var(--color-yellow)] bg-clip-text text-transparent mb-4">
              CSA Print & Design
            </h3>
            <p className="text-gray-400 mb-4">
              Professional printing and design services bringing your creative vision to life.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Products', 'Samples', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-[var(--color-cyan)] transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4 text-[var(--color-cyan)]" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="w-4 h-4 text-[var(--color-cyan)]" />
                <span>info@csaprint.com</span>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin className="w-4 h-4 text-[var(--color-cyan)] mt-1" />
                <span>123 Print Street<br />Design City, DC 12345</span>
              </li>
            </ul>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <p className="text-gray-400">Connect with us on social media</p>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} CSA Print & Design. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
