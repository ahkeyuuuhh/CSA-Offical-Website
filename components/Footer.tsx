'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="flex items-center mb-4">
              <Image
                src="/light-logo.png"
                alt="CSA Print & Design"
                width={56}
                height={56}
                className="object-contain"
              />
            </div>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Professional printing and design services bringing your creative vision to life.
              Quality, creativity, and excellence in every project.
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
            <ul className="space-y-3">
              {['Home', 'Products', 'Portfolio', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    href={item === 'Home' ? '/' : item === 'Portfolio' ? '/samples' : `/${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-[var(--color-magenta)] transition-colors"
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
              <li className="flex items-center gap-3 text-gray-400">
                <div className="w-8 h-8 bg-[var(--color-magenta)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-[var(--color-magenta)]" />
                </div>
                <span>0908 772 4771</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <div className="w-8 h-8 bg-[var(--color-magenta)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-[var(--color-magenta)]" />
                </div>
                <span>csaprintanddesign@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <div className="w-8 h-8 bg-[var(--color-magenta)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-[var(--color-magenta)]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <a 
                  href="https://www.facebook.com/profile.php?id=61577035086365" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-magenta)] transition-colors"
                >
                  CSA Print & Design
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <div className="w-8 h-8 bg-[var(--color-magenta)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-[var(--color-magenta)]" />
                </div>
                <span>Mon-Sun: 10:00am-8:00pm</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <div className="w-8 h-8 bg-[var(--color-magenta)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-[var(--color-magenta)]" />
                </div>
                <span>Olongapo City, Zambales<br />Philippines</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {currentYear} CSA Print & Design. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
