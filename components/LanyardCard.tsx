'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useMemo } from 'react';

interface LanyardCardProps {
  image: string;
  name: string;
  role: string;
  email: string;
  delay?: number;
}

export default function LanyardCard({ image, name, role, email, delay = 0 }: LanyardCardProps) {
  // Generate barcode heights once on mount to avoid hydration issues
  const barcodeHeights = useMemo(() => 
    Array.from({ length: 20 }, () => Math.random() * 60 + 40),
    []
  );
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, type: 'spring', stiffness: 100 }}
      className="flex flex-col items-center"
    >
      {/* Lanyard String */}
      <motion.div
        className="w-1 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full shadow-sm"
        style={{ height: '80px' }}
        animate={{
          scaleY: [1, 1.02, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Card Holder */}
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05, rotateZ: 2 }}
        animate={{
          rotateZ: [-1, 1, -1],
          y: [0, 5, 0],
        }}
        transition={{
          rotateZ: {
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          },
          y: {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
      >
        {/* Lanyard Clip */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-6 bg-gradient-to-b from-gray-400 to-gray-500 rounded-t-lg shadow-md z-10">
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-4 h-2 bg-gray-600 rounded-sm" />
        </div>

        {/* ID Card */}
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-gray-100 w-64">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-[var(--color-magenta)] to-[var(--color-cyan)] h-16 flex items-center justify-center">
            <h4 className="text-white font-bold text-lg tracking-wider">TEAM MEMBER</h4>
          </div>

          {/* Photo */}
          <div className="p-6 pb-4">
            <div className="relative w-40 h-40 mx-auto rounded-2xl overflow-hidden shadow-lg border-4 border-gray-200">
              <Image src={image} alt={name} fill className="object-cover" />
            </div>
          </div>

          {/* Info */}
          <div className="px-6 pb-6 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
            <p className="text-[var(--color-magenta)] font-semibold text-sm uppercase tracking-wide">
              {role}
            </p>
          </div>

          {/* Barcode */}
          <div className="px-6 pb-4">
            <div className="flex gap-[2px] h-12 items-end justify-center">
              {barcodeHeights.map((height, i) => (
                <div
                  key={i}
                  className="bg-gray-800 rounded-t-sm"
                  style={{
                    width: '4px',
                    height: `${height}%`,
                  }}
                />
              ))}
            </div>
            <p className="text-center text-xs text-gray-500 mt-2 break-all px-2">
              {email}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
