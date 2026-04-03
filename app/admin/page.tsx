'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import DarkVeil from '@/components/DarkVeil';
import { 
  Mail, 
  TrendingUp, 
  Users
} from 'lucide-react';
import { 
  isAdmin, 
  getDashboardStats, 
  getContacts,
  getContactsChartData,
  getContactsTodayChartData,
  getWebsiteVisitsChartData,
  type Contact 
} from '@/lib/supabase/admin';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const [stats, setStats] = useState({
    totalContacts: 0,
    contactsToday: 0,
    websiteVisits: 0,
  });
  const [recentContacts, setRecentContacts] = useState<Contact[]>([]);
  const [contactsChartData, setContactsChartData] = useState<any[]>([]);
  const [contactsTodayChartData, setContactsTodayChartData] = useState<any[]>([]);
  const [visitsChartData, setVisitsChartData] = useState<any[]>([]);

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

        // Load dashboard data
        const dashboardStats = await getDashboardStats();
        setStats(dashboardStats);

        const contacts = await getContacts();
        setRecentContacts(contacts.slice(0, 5));

        // Load chart data
        const contactsData = await getContactsChartData();
        setContactsChartData(contactsData);

        const contactsTodayData = await getContactsTodayChartData();
        setContactsTodayChartData(contactsTodayData);

        const visitsData = await getWebsiteVisitsChartData();
        setVisitsChartData(visitsData);
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
      title: 'Contacts Today',
      value: stats.contactsToday,
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/20',
    },
    {
      title: 'Website Visits',
      value: stats.websiteVisits,
      icon: Users,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/20',
    },
  ];

  return (
    <div className="relative bg-gray-950 min-h-screen overflow-hidden">
      {/* DarkVeil Background */}
      <div className="fixed inset-0 z-0">
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

      <div className="relative z-10 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-white mb-1">Admin Dashboard</h1>
            <p className="text-gray-400 text-sm">Welcome back, CSA</p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {statCards.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4 hover:border-purple-500/50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-gray-400 text-xs mb-1">{stat.title}</h3>
                    <p className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.value}
                    </p>
                  </div>
                  <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Charts and Recent Contacts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Row 1 Left: Contacts Today Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-5"
            >
              <h2 className="text-lg font-bold text-white mb-4">Contacts Today</h2>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={contactsTodayChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis 
                    dataKey="hour" 
                    stroke="#9ca3af" 
                    fontSize={12}
                    tick={{ fill: '#9ca3af' }}
                  />
                  <YAxis 
                    stroke="#9ca3af" 
                    fontSize={12}
                    tick={{ fill: '#9ca3af' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Bar 
                    dataKey="contacts" 
                    fill="#10b981" 
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Row 1 Right: Recent Contacts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-5"
            >
              <h2 className="text-lg font-bold text-white mb-4">Recent Contacts</h2>
              <div className="space-y-2 max-h-[200px] overflow-y-auto">
                {recentContacts.length === 0 ? (
                  <p className="text-gray-400 text-center py-6 text-sm">No contacts yet</p>
                ) : (
                  recentContacts.map((contact) => (
                    <div
                      key={contact.id}
                      onClick={() => router.push('/admin/contacts')}
                      className="bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-white font-semibold text-sm truncate">{contact.name}</h3>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${
                                contact.status === 'unread'
                                  ? 'bg-blue-500/20 text-blue-300'
                                  : contact.status === 'read'
                                  ? 'bg-yellow-500/20 text-yellow-300'
                                  : contact.status === 'replied'
                                  ? 'bg-green-500/20 text-green-300'
                                  : 'bg-gray-500/20 text-gray-300'
                              }`}
                            >
                              {contact.status}
                            </span>
                          </div>
                          <p className="text-gray-400 text-xs truncate">{contact.email}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {recentContacts.length > 0 && (
                <motion.a
                  href="/admin/contacts"
                  className="block text-center mt-4 text-purple-400 hover:text-purple-300 font-medium text-sm"
                  whileHover={{ scale: 1.02 }}
                >
                  View All Contacts →
                </motion.a>
              )}
            </motion.div>

            {/* Row 2 Left: Total Contacts Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-5"
            >
              <h2 className="text-lg font-bold text-white mb-4">Total Contacts (Last 7 Days)</h2>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={contactsChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#9ca3af" 
                    fontSize={12}
                    tick={{ fill: '#9ca3af' }}
                  />
                  <YAxis 
                    stroke="#9ca3af" 
                    fontSize={12}
                    tick={{ fill: '#9ca3af' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="contacts" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Row 2 Right: Website Visits Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-5"
            >
              <h2 className="text-lg font-bold text-white mb-4">Website Visits (Last 7 Days)</h2>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={visitsChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#9ca3af" 
                    fontSize={12}
                    tick={{ fill: '#9ca3af' }}
                  />
                  <YAxis 
                    stroke="#9ca3af" 
                    fontSize={12}
                    tick={{ fill: '#9ca3af' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="visits" 
                    stroke="#a855f7" 
                    strokeWidth={2}
                    dot={{ fill: '#a855f7', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
