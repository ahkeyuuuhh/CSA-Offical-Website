'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ProductCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  index: number;
}

export default function ProductCard({ title, description, Icon, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-[var(--color-cyan)] transition-all group"
    >
      <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-cyan)] to-[var(--color-magenta)] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}
