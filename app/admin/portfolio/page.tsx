'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { isAdmin } from '@/lib/supabase/admin';
import DarkVeil from '@/components/DarkVeil';
import { Image } from 'lucide-react';

export default function ManagePortfolio() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);

  useEffect(() => {
    async function checkAdminStatus() {
      if (!loading && !user) {
        router.push('/admin/login');
        return;
      }

      if (user) {
        const adminStatus = await isAdmin(user.email);
        setIsAdminUser(adminStatus);
        
        if (!adminStatus) {
          router.push('/admin/login?error=unauthorized');
          return;
        }
      }
      
      setCheckingAdmin(false);
    }

    checkAdminStatus();
  }, [user, loading, router]);

  if (loading || checkingAdmin) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAdminUser) {
    return null;
  }

  return (
    <div className="relative bg-gray-950 min-h-screen">
      <div className="absolute inset-0 z-0">
        <DarkVeil hueShift={260} />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold text-white mb-2">Manage Portfolio</h1>
            <p className="text-gray-400">Add, edit, and manage portfolio samples</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-12 text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-purple-500/20 rounded-full flex items-center justify-center">
              <Image className="w-10 h-10 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Coming Soon</h2>
            <p className="text-gray-400 max-w-md mx-auto">
              Portfolio management features will be available here. You'll be able to add, edit, and remove samples from your portfolio gallery.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
