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
  Search,
  X,
  Send,
  Trash2,
  Check
} from 'lucide-react';
import { 
  isAdmin, 
  getContacts, 
  markContactAsRead,
  deleteContact,
  replyToContact,
  type Contact 
} from '@/lib/supabase/admin';

export default function ContactsManagement() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [filterTab, setFilterTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [isSendingReply, setIsSendingReply] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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

        await loadContacts();
      }
      
      setCheckingAdmin(false);
    }

    checkAdminStatus();
  }, [user, loading, router]);

  const loadContacts = async () => {
    const contactsData = await getContacts();
    setContacts(contactsData);
    setFilteredContacts(contactsData);
  };

  useEffect(() => {
    let filtered = contacts;

    // Filter by tab
    if (filterTab !== 'all') {
      filtered = filtered.filter(c => c.status === filterTab);
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
  }, [filterTab, searchQuery, contacts]);

  const handleContactClick = async (contact: Contact) => {
    setSelectedContact(contact);
    
    // Mark as read if unread
    if (contact.status === 'unread') {
      try {
        await markContactAsRead(contact.id);
        setContacts(contacts.map(c => 
          c.id === contact.id ? { ...c, status: 'read' } : c
        ));
        setSelectedContact({ ...contact, status: 'read' });
      } catch (error) {
        console.error('Error marking as read:', error);
      }
    }
  };

  const handleSendReply = async () => {
    if (!selectedContact || !replyMessage.trim()) return;

    setIsSendingReply(true);
    try {
      await replyToContact(selectedContact.id, replyMessage, selectedContact.email);
      
      // Update local state
      const updatedContact = { 
        ...selectedContact, 
        status: 'replied' as const,
        admin_reply: replyMessage,
        replied_at: new Date().toISOString()
      };
      
      setContacts(contacts.map(c => 
        c.id === selectedContact.id ? updatedContact : c
      ));
      setSelectedContact(updatedContact);
      setReplyMessage('');
      
      alert('Reply sent successfully!');
    } catch (error) {
      console.error('Error sending reply:', error);
      alert('Failed to send reply');
    } finally {
      setIsSendingReply(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedContact) return;

    try {
      await deleteContact(selectedContact.id);
      setContacts(contacts.filter(c => c.id !== selectedContact.id));
      setSelectedContact(null);
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Failed to delete contact');
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

  const tabs = [
    { id: 'all', label: 'All', count: contacts.length },
    { id: 'unread', label: 'Unread', count: contacts.filter(c => c.status === 'unread').length },
    { id: 'read', label: 'Read', count: contacts.filter(c => c.status === 'read').length },
    { id: 'replied', label: 'Replied', count: contacts.filter(c => c.status === 'replied').length },
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

      <div className="relative z-10 pt-8 pb-12">
        <div className="max-w-6xl mx-auto px-6 py-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-1">Contacts</h1>
            <p className="text-gray-400 text-sm">{filteredContacts.length} contacts</p>
          </div>

          {/* Search Bar - Centered and Smaller */}
          <div className="flex justify-center mb-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg text-white text-sm placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Tabs - Centered and Smaller */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex gap-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterTab(tab.id)}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                    filterTab === tab.id
                      ? 'bg-purple-500 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                  <span className="ml-1.5 text-xs opacity-75">({tab.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Contacts List - Compact */}
          <div className="space-y-2">
            {filteredContacts.length === 0 ? (
              <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-8 text-center">
                <p className="text-gray-400">No contacts found</p>
              </div>
            ) : (
              filteredContacts.map((contact) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => handleContactClick(contact)}
                  className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-4 hover:border-purple-500 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-semibold text-sm">{contact.name}</h3>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${
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
                      <div className="flex items-center gap-3 text-gray-400 text-xs mb-2">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {contact.email}
                        </span>
                        {contact.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {contact.phone}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(contact.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm line-clamp-1">{contact.message}</p>
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
              className="bg-black/60 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Contact Details</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="w-9 h-9 bg-red-500/20 hover:bg-red-500/30 rounded-lg flex items-center justify-center transition-all"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                  <button
                    onClick={() => setSelectedContact(null)}
                    className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-gray-400 text-xs mb-1 block">Name</label>
                  <p className="text-white font-semibold">{selectedContact.name}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">Email</label>
                    <p className="text-white text-sm">{selectedContact.email}</p>
                  </div>
                  {selectedContact.phone && (
                    <div>
                      <label className="text-gray-400 text-xs mb-1 block">Phone</label>
                      <p className="text-white text-sm">{selectedContact.phone}</p>
                    </div>
                  )}
                </div>

                {selectedContact.service && (
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">Service</label>
                    <p className="text-white text-sm">{selectedContact.service}</p>
                  </div>
                )}

                <div>
                  <label className="text-gray-400 text-xs mb-1 block">Message</label>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-white text-sm leading-relaxed">{selectedContact.message}</p>
                  </div>
                </div>

                {selectedContact.admin_reply && (
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">Your Reply</label>
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                      <p className="text-green-100 text-sm leading-relaxed">{selectedContact.admin_reply}</p>
                      <p className="text-green-300 text-xs mt-2">
                        Sent {new Date(selectedContact.replied_at!).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}

                <div className="text-gray-400 text-xs pt-2 border-t border-white/10">
                  <p>Submitted: {new Date(selectedContact.created_at).toLocaleString()}</p>
                  <p>Status: <span className="text-white capitalize">{selectedContact.status}</span></p>
                </div>
              </div>

              {/* Reply Section */}
              {selectedContact.status !== 'replied' && (
                <div className="border-t border-white/10 pt-6">
                  <label className="text-white font-semibold mb-3 block">Send Reply</label>
                  <textarea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Type your reply here..."
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-colors resize-none mb-3"
                  />
                  <motion.button
                    onClick={handleSendReply}
                    disabled={isSendingReply || !replyMessage.trim()}
                    className="w-full px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    whileHover={{ scale: isSendingReply ? 1 : 1.02 }}
                    whileTap={{ scale: isSendingReply ? 1 : 0.98 }}
                  >
                    {isSendingReply ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Reply to {selectedContact.email}
                      </>
                    )}
                  </motion.button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowDeleteConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-black/60 backdrop-blur-md border border-red-500/30 rounded-2xl p-6 max-w-md w-full"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
                  <Trash2 className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Delete Contact?</h3>
                <p className="text-gray-300 mb-6">
                  This action cannot be undone. The contact will be permanently deleted.
                </p>
                <div className="flex gap-3">
                  <motion.button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    onClick={handleDelete}
                    className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Delete
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
