'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import SectionTitle from '@/components/SectionTitle';
import DarkVeil from '@/components/DarkVeil';
import { Mail, Phone, Clock, Send, LogOut } from 'lucide-react';
import { usePageView } from '@/hooks/usePageView';

export default function Contact() {
  usePageView('contact');
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Auto-fill email and name when user is loaded
  useEffect(() => {
    if (user) {
      setFormData(prev => ({ 
        ...prev, 
        email: user.email || '',
        name: user.user_metadata?.full_name || ''
      }));
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      const { submitContact } = await import('@/lib/supabase/admin');
      
      console.log('Submitting contact form...');
      
      const result = await submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
      });
      
      console.log('Contact submitted successfully:', result);
      
      setSubmitStatus('success');
      setShowSuccessModal(true);
      setFormData({ 
        name: user?.user_metadata?.full_name || '', 
        email: user?.email || '', 
        phone: '', 
        service: '', 
        message: '' 
      });
      
      setTimeout(() => {
        setSubmitStatus('idle');
        setShowSuccessModal(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting contact:', error);
      const errorMsg = error instanceof Error ? error.message : 'Unknown error occurred';
      setErrorMessage(errorMsg);
      setSubmitStatus('error');
      setTimeout(() => {
        setSubmitStatus('idle');
        setErrorMessage('');
      }, 8000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignOut = async () => {
    await signOut();
    setShowSignOutModal(false);
    router.push('/');
  };

  const contactInfo = [
    {
      Icon: Phone,
      title: 'Phone',
      details: '0908 772 4771',
      link: 'tel:+639087724771',
    },
    {
      Icon: Mail,
      title: 'Email',
      details: 'csaprintanddesign@gmail.com',
      link: 'mailto:csaprintanddesign@gmail.com',
    },
    {
      Icon: () => (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      title: 'Facebook',
      details: 'CSA Print & Design',
      link: 'https://www.facebook.com/profile.php?id=61577035086365',
    },
    {
      Icon: Clock,
      title: 'Hours',
      details: 'Monday - Sunday: 10:00am-8:00pm',
      link: '#',
    },
    {
      Icon: () => (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      ),
      title: 'Location',
      details: 'Olongapo City, Zambales, Philippines',
      link: '#',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="relative bg-gray-950">
      {/* DarkVeil Background */}
      <div className="absolute inset-0 z-0">
        <DarkVeil
          hueShift={290}
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
          <SectionTitle
            title="Get In Touch"
            subtitle="Let's discuss your next project"
          />

          {/* User Info and Sign Out */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-center justify-between bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4"
          >
            <div className="flex items-center gap-3">
              {user.user_metadata?.avatar_url && (
                <img
                  src={user.user_metadata.avatar_url}
                  alt={user.user_metadata?.full_name || 'User'}
                  className="w-10 h-10 rounded-full"
                />
              )}
              <div>
                <p className="text-white font-semibold">
                  {user.user_metadata?.full_name || 'User'}
                </p>
                <p className="text-gray-400 text-sm">{user.email}</p>
              </div>
            </div>
            <motion.button
              onClick={() => setShowSignOutModal(true)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-all flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </motion.button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Send Us a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white font-medium mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 transition-colors opacity-70 cursor-not-allowed"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 transition-colors opacity-70 cursor-not-allowed"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-white font-medium mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-colors"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-white font-medium mb-2">
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-colors"
                  >
                    <option value="" className="bg-gray-900">Select a service</option>
                    <option value="business-cards" className="bg-gray-900">Business Cards</option>
                    <option value="stickers" className="bg-gray-900">Custom Stickers</option>
                    <option value="photocards" className="bg-gray-900">Photocards</option>
                    <option value="invitations" className="bg-gray-900">Invitation Cards</option>
                    <option value="pins" className="bg-gray-900">Custom Pins</option>
                    <option value="other" className="bg-gray-900">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-white font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-[var(--color-magenta)] text-white rounded-full font-semibold hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-pink-500/30"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={info.title}
                      href={info.link}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4 p-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl hover:border-purple-500 transition-all group"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <info.Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">{info.title}</h4>
                        <p className="text-gray-300">{info.details}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowSuccessModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-black/60 backdrop-blur-md border border-green-500/30 rounded-2xl p-8 max-w-md w-full"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Send className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Message Sent!</h3>
                <p className="text-gray-300 mb-6">
                  Thank you for reaching out! We've received your message and will get back to you soon.
                </p>
                <motion.button
                  onClick={() => setShowSuccessModal(false)}
                  className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Got it!
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Modal */}
      <AnimatePresence>
        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSubmitStatus('idle')}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-black/60 backdrop-blur-md border border-red-500/30 rounded-2xl p-8 max-w-md w-full"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
                  <X className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Submission Failed</h3>
                <p className="text-gray-300 mb-2">
                  We couldn't send your message. Please try again.
                </p>
                {errorMessage && (
                  <p className="text-red-300 text-sm mb-6 bg-red-500/10 p-3 rounded-lg">
                    {errorMessage}
                  </p>
                )}
                <motion.button
                  onClick={() => setSubmitStatus('idle')}
                  className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full font-semibold transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Try Again
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sign Out Confirmation Modal */}
      <AnimatePresence>
        {showSignOutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowSignOutModal(false)}
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
                <h3 className="text-2xl font-bold text-white mb-3">Sign Out?</h3>
                <p className="text-gray-300 mb-8">
                  Are you sure you want to sign out? You'll need to sign in again to send messages.
                </p>
                <div className="flex gap-3">
                  <motion.button
                    onClick={() => setShowSignOutModal(false)}
                    className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    onClick={handleSignOut}
                    className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full font-semibold transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Sign Out
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
