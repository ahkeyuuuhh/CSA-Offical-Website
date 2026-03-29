'use client';

import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionTitle({ title, subtitle, centered = true }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={centered ? 'text-center mb-12' : 'mb-12'}
    >
      <h2 className="text-4xl font-bold text-white mb-4">{title}</h2>
      {subtitle && <p className="text-xl text-gray-400 max-w-2xl mx-auto">{subtitle}</p>}
    </motion.div>
  );
}
