'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import DarkVeil from '@/components/DarkVeil';
import { 
  Mail, 
  Phone, 
  Calendar,
  Filter,
  Search,
  X,
  ChevronLeft
} from 'lucide-react';
import { isAdmin, getContacts, updateContactStatus, type Contact } from '@/lib/supabase/admin';

export default function ContactsManagement() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

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

        // Load contacts
        const contactsData = await getContacts();
        setContacts(contactsData);
        setFilteredContacts(contactsData);
      }
      
      setCheckingAdmin(false);
    }

    checkAdminStatus();
  }, [user, loading, router]);

  useEffect(() => {
    let filtered = contacts;

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(c => c.status === filterStatus);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.message.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredContacts(filtered);
  }, [filterStatus, searchQuery, contacts]);

  const handleStatusChange = async (contactId: string, newStatus: Contact['status']) => {
    try {
      await updateContactStatus(contactId, newStatus);
      setContacts(contacts.map(c => 
        c.id === contactId ? { ...c, status: newStatus } : c
      ));
      if (selectedContact?.id === contactId) {
        setSelectedContact({ ...selectedContact, status: newStatus });
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

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
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <motion.a
                href="/admin"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </motion.a>
              <div>
                <h1 className="text-4xl font-bold text-white">Contacts</h1>
                <p className="text-gray-400">{filteredContacts.length} total contacts</p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-colors"
                />
              </div>

              {/* Status Filter */}
              <div className="flex gap-2">
                {['all', 'new', 'in_progress', 'completed', 'archived'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      filterStatus === status
                        ? 'bg-purple-500 text-white'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    {status === 'all' ? 'All' : status.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contacts List */}
          <div className="grid grid-cols-1 gap-4">
            {filteredContacts.length === 0 ? (
              <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-12 text-center">
                <p className="text-gray-400 text-lg">No contacts found</p>
              </div>
            ) : (
              filteredContacts.map((contact, index) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedContact(contact)}
                  className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-purple-500 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{contact.name}</h3>
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
                      <div className="flex items-center gap-4 text-gray-400 text-sm mb-3">
                        <span className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {contact.email}
                        </span>
                        {contact.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {contact.phone}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(contact.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-300 line-clamp-2">{contact.message}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Contact Detail Modal */}
      <AnimatePresence>
        {selectedContact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedContact(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-black/60 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-3xl font-bold text-white">Contact Details</h2>
                <button
                  onClick={() => setSelectedContact(null)}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-gray-400 text-sm mb-1 block">Name</label>
                  <p className="text-white text-lg font-semibold">{selectedContact.name}</p>
                </div>

                <div>
                  <label className="text-gray-400 text-sm mb-1 block">Email</label>
                  <p className="text-white">{selectedContact.email}</p>
                </div>

                {selectedContact.phone && (
                  <div>
                    <label className="text-gray-400 text-sm mb-1 block">Phone</label>
                    <p className="text-white">{selectedContact.phone}</p>
                  </div>
                )}

                {selectedContact.service && (
                  <div>
                    <label className="text-gray-400 text-sm mb-1 block">Service</label>
                    <p className="text-white">{selectedContact.service}</p>
                  </div>
                )}

                <div>
                  <label className="text-gray-400 text-sm mb-1 block">Message</label>
                  <p className="text-white leading-relaxed">{selectedContact.message}</p>
                </div>

                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Status</label>
                  <div className="flex gap-2">
                    {(['new', 'in_progress', 'completed', 'archived'] as const).map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(selectedContact.id, status)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          selectedContact.status === status
                            ? 'bg-purple-500 text-white'
                            : 'bg-white/10 text-gray-400 hover:bg-white/20'
                        }`}
                      >
                        {status.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-gray-400 text-sm">
                  <p>Submitted: {new Date(selectedContact.created_at).toLocaleString()}</p>
                  <p>Last Updated: {new Date(selectedContact.updated_at).toLocaleString()}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
