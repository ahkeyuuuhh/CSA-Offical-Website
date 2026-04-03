'use client';

import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  Image as ImageIcon, 
  LogOut,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Load collapse state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('adminSidebarCollapsed');
    if (savedState !== null) {
      setIsCollapsed(savedState === 'true');
    }
  }, []);

  // Update CSS variable and save to localStorage when collapse state changes
  useEffect(() => {
    const width = isCollapsed ? '80px' : '256px';
    document.documentElement.style.setProperty('--sidebar-width', width);
    localStorage.setItem('adminSidebarCollapsed', String(isCollapsed));
  }, [isCollapsed]);

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
      icon: ImageIcon,
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
      <motion.div 
        className="fixed left-0 top-0 bottom-0 bg-black/60 backdrop-blur-md border-r border-white/10 shadow-2xl z-50 flex flex-col"
        animate={{ width: isCollapsed ? '80px' : '256px' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {/* Toggle Button - Above Logo */}
        <div className="p-4 flex justify-end">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5 text-white" /> : <ChevronLeft className="w-5 h-5 text-white" />}
          </button>
        </div>

        {/* Logo */}
        <div className="px-6 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-white/5 p-1">
              <img 
                src="/light-logo.png" 
                alt="CSA Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="text-white font-bold text-lg whitespace-nowrap">Admin Panel</h2>
                  <p className="text-gray-400 text-xs whitespace-nowrap">CSA Print & Design</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="p-4 flex-1 overflow-y-auto">
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
                whileHover={{ x: isCollapsed ? 0 : 4 }}
                whileTap={{ scale: 0.98 }}
                title={isCollapsed ? item.label : ''}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="font-medium flex-1 whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {item.active && !isCollapsed && <ChevronRight className="w-4 h-4" />}
              </motion.a>
            ))}
          </div>
        </nav>

        {/* Logout Button - At Bottom */}
        <div className="p-4 border-t border-white/10 mt-auto">
          <motion.button
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
            whileHover={{ x: isCollapsed ? 0 : 4 }}
            whileTap={{ scale: 0.98 }}
            title={isCollapsed ? 'Logout' : ''}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="font-medium whitespace-nowrap"
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.div>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
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
      </AnimatePresence>
    </>
  );
}
