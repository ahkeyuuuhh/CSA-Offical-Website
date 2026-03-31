'use client';

import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  Image, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      href: '/admin',
      active: pathname === '/admin',
    },
    {
      icon: Users,
      label: 'Manage Contacts',
      href: '/admin/contacts',
      active: pathname === '/admin/contacts',
    },
    {
      icon: Package,
      label: 'Manage Products',
      href: '/admin/products',
      active: pathname === '/admin/products',
    },
    {
      icon: Image,
      label: 'Manage Portfolio',
      href: '/admin/portfolio',
      active: pathname === '/admin/portfolio',
    },
  ];

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <>
      <div className="fixed left-0 top-0 h-screen w-64 bg-black/60 backdrop-blur-md border-r border-white/10 z-50">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">CSA</span>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">Admin Panel</h2>
              <p className="text-gray-400 text-xs">CSA Print & Design</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="p-4 flex-1">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${
                  item.active
                    ? 'bg-purple-500 text-white'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium flex-1">{item.label}</span>
                {item.active && <ChevronRight className="w-4 h-4" />}
              </motion.a>
            ))}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-white/10">
          <motion.button
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </motion.button>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setShowLogoutModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-black/60 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-md w-full"
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
                <LogOut className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Logout?</h3>
              <p className="text-gray-300 mb-8">
                Are you sure you want to logout from the admin panel?
              </p>
              <div className="flex gap-3">
                <motion.button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handleLogout}
                  className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full font-semibold transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Logout
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
