'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import DarkVeil from '@/components/DarkVeil';
import { 
  Mail, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  Clock, 
  Archive,
  AlertCircle,
  BarChart3
} from 'lucide-react';
import { isAdmin, getDashboardStats, getContacts, type Contact } from '@/lib/supabase/admin';

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const [stats, setStats] = useState({
    totalContacts: 0,
    newContacts: 0,
    statusCounts: { new: 0, in_progress: 0, completed: 0, archived: 0 },
  });
  const [recentContacts, setRecentContacts] = useState<Contact[]>([]);

  useEffect(() => {
    async function checkAdminStatus() {
      if (!loading && !user) {
        router.push('/login');
        return;
      }

      if (user) {
        const adminStatus = await isAdmin(user.id);
        setIsAdminUser(adminStatus);
        
        if (!adminStatus) {
          router.push('/');
          return;
        }

        // Load dashboard data
        const dashboardStats = await getDashboardStats();
        setStats(dashboardStats);

        const contacts = await getContacts();
        setRecentContacts(contacts.slice(0, 5));
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

  const statCards = [
    {
      title: 'Total Contacts',
      value: stats.totalContacts,
      icon: Mail,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/20',
    },
    {
      title: 'New This Week',
      value: stats.newContacts,
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/20',
    },
    {
      title: 'In Progress',
      value: stats.statusCounts.in_progress,
      icon: Clock,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-500/20',
    },
    {
      title: 'Completed',
      value: stats.statusCounts.completed,
      icon: CheckCircle,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/20',
    },
  ];

  return (
    <div className="relative bg-gray-950 min-h-screen">
      {/* DarkVeil Background */}
      <div className="absolute inset-0 z-0">
        <DarkVeil
          hueShift={260}
          noiseIntensity={0.06}
          scanlineIntensity={0}
          speed={0.25}
          scanlineFrequency={0}
          warpAmount={0.08}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Welcome back, {user?.user_metadata?.full_name || user?.email}</p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {statCards.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-gray-400 text-sm mb-1">{stat.title}</h3>
                <p className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12"
          >
            <motion.a
              href="/admin/contacts"
              className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-purple-500 transition-all group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Manage Contacts</h3>
                  <p className="text-gray-400">View and manage all contact submissions</p>
                </div>
              </div>
            </motion.a>

            <motion.a
              href="/admin/analytics"
              className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-purple-500 transition-all group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Analytics</h3>
                  <p className="text-gray-400">View detailed analytics and insights</p>
                </div>
              </div>
            </motion.a>
          </motion.div>

          {/* Recent Contacts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Recent Contacts</h2>
            <div className="space-y-4">
              {recentContacts.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No contacts yet</p>
              ) : (
                recentContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold mb-1">{contact.name}</h3>
                        <p className="text-gray-400 text-sm mb-2">{contact.email}</p>
                        <p className="text-gray-300 text-sm line-clamp-2">{contact.message}</p>
                      </div>
                      <div className="ml-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            contact.status === 'new'
                              ? 'bg-blue-500/20 text-blue-300'
                              : contact.status === 'in_progress'
                              ? 'bg-yellow-500/20 text-yellow-300'
                              : contact.status === 'completed'
                              ? 'bg-green-500/20 text-green-300'
                              : 'bg-gray-500/20 text-gray-300'
                          }`}
                        >
                          {contact.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {recentContacts.length > 0 && (
              <motion.a
                href="/admin/contacts"
                className="block text-center mt-6 text-purple-400 hover:text-purple-300 font-medium"
                whileHover={{ scale: 1.05 }}
              >
                View All Contacts →
              </motion.a>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
