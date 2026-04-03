'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import DarkVeil from '@/components/DarkVeil';
import Loader from '@/components/Loader';
import { 
  Plus,
  Edit,
  Trash2,
  X,
  Check,
  Image as ImageIcon
} from 'lucide-react';
import { 
  isAdmin, 
  getPortfolio,
  createPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
  type Portfolio 
} from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/client';

export default function PortfolioManagement() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [loadingPortfolio, setLoadingPortfolio] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Portfolio | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>('');

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    image_url: '',
    description: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');

  const portfolioCategories = [
    'Print Materials',
    'Custom Items',
    'Specialty'
  ];

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

        await loadPortfolio();
      }
      
      setCheckingAdmin(false);
    }

    checkAdminStatus();

    // Set up real-time subscription for portfolio
    const supabase = createClient();
    const channel = supabase
      .channel('portfolio-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'portfolio'
        },
        async (payload) => {
          console.log('Portfolio change detected:', payload);
          
          if (payload.eventType === 'INSERT') {
            // Add new portfolio item
            setPortfolio(prev => [payload.new as Portfolio, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            // Update existing portfolio item
            setPortfolio(prev => 
              prev.map(p => p.id === payload.new.id ? payload.new as Portfolio : p)
            );
          } else if (payload.eventType === 'DELETE') {
            // Remove deleted portfolio item
            setPortfolio(prev => prev.filter(p => p.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, loading, router]);

  const loadPortfolio = async () => {
    try {
      setLoadingPortfolio(true);
      const portfolioData = await getPortfolio();
      setPortfolio(portfolioData);
    } catch (error) {
      console.error('Error loading portfolio:', error);
    } finally {
      setLoadingPortfolio(false);
    }
  };

  const handleAddItem = () => {
    setFormData({
      title: '',
      category: '',
      image_url: '',
      description: '',
    });
    setSelectedFile(null);
    setImagePreviewUrl('');
    setShowAddModal(true);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreviewUrl(base64String);
        // Store the base64 string directly in the database
        setFormData({ 
          ...formData, 
          image_url: base64String
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditItem = (item: Portfolio) => {
    setSelectedItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      image_url: item.image_url,
      description: item.description || '',
    });
    setSelectedFile(null);
    setImagePreviewUrl(item.image_url);
    setShowEditModal(true);
  };

  const handleDeleteItem = (item: Portfolio) => {
    setSelectedItem(item);
    setShowDeleteConfirm(true);
  };

  const handleSubmitAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      await createPortfolioItem({
        title: formData.title,
        category: formData.category,
        image_url: formData.image_url,
        description: formData.description,
      });

      await loadPortfolio();
      setShowAddModal(false);
      setSuccessMessage('Portfolio item added successfully!');
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error adding portfolio item:', error);
      setSuccessMessage('Failed to add portfolio item. Please try again.');
      setShowSuccessModal(true);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmitEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedItem) return;

    setIsSaving(true);

    try {
      await updatePortfolioItem(selectedItem.id, {
        title: formData.title,
        category: formData.category,
        image_url: formData.image_url,
        description: formData.description,
      });

      await loadPortfolio();
      setShowEditModal(false);
      setSelectedItem(null);
      setSuccessMessage('Portfolio item updated successfully!');
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error updating portfolio item:', error);
      setSuccessMessage('Failed to update portfolio item. Please try again.');
      setShowSuccessModal(true);
    } finally {
      setIsSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!selectedItem) return;

    try {
      await deletePortfolioItem(selectedItem.id);
      await loadPortfolio();
      setShowDeleteConfirm(false);
      setSelectedItem(null);
      setSuccessMessage('Portfolio item deleted successfully!');
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error deleting portfolio item:', error);
      setSuccessMessage('Failed to delete portfolio item. Please try again.');
      setShowSuccessModal(true);
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
    <div className="relative min-h-screen overflow-hidden">
      {/* DarkVeil Background */}
      <div className="fixed inset-0 z-0">
        <DarkVeil
          hueShift={270}
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
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Manage Portfolio</h1>
              <p className="text-gray-400 text-sm">{portfolio.length} portfolio items</p>
            </div>
            
            {/* Add Portfolio Item Button */}
            <motion.button
              onClick={handleAddItem}
              className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-all flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-5 h-5" />
              Add Portfolio Item
            </motion.button>
          </div>

          {/* Portfolio Table */}
          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
            {loadingPortfolio ? (
              <Loader />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Image
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {portfolio.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                          No portfolio items yet. Click "Add Portfolio Item" to create one.
                        </td>
                      </tr>
                    ) : (
                      portfolio.map((item) => (
                      <tr key={item.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <div 
                            className="w-16 h-16 bg-white/10 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer hover:ring-2 hover:ring-purple-500 transition-all"
                            onClick={() => {
                              setPreviewImage(item.image_url);
                              setShowImagePreview(true);
                            }}
                          >
                            {item.image_url ? (
                              <img 
                                src={item.image_url} 
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <ImageIcon className="w-6 h-6 text-gray-500" />
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-white font-medium">{item.title}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-gray-300 text-sm line-clamp-2 max-w-md">
                            {item.description || '-'}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <motion.button
                              onClick={() => handleEditItem(item)}
                              className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              onClick={() => handleDeleteItem(item)}
                              className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </td>
                      </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Portfolio Item Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-black/60 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Add Portfolio Item</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <form onSubmit={handleSubmitAdd} className="space-y-4">
                <div>
                  <label className="text-white font-medium mb-2 block">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-colors"
                    placeholder="e.g., Custom Stickers"
                  />
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-colors"
                    style={{ colorScheme: 'dark' }}
                  >
                    <option value="" style={{ backgroundColor: '#1a1a1a', color: '#9ca3af' }}>Select Category</option>
                    {portfolioCategories.map(cat => (
                      <option key={cat} value={cat} style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-colors resize-none"
                    placeholder="Describe the portfolio item..."
                  />
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Portfolio Image *</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-500 file:text-white hover:file:bg-purple-600 transition-colors"
                  />
                  {imagePreviewUrl && (
                    <div className="mt-3">
                      <img src={imagePreviewUrl} alt="Preview" className="w-32 h-32 object-cover rounded-lg border border-white/10" />
                    </div>
                  )}
                  <p className="text-gray-400 text-xs mt-1">
                    Select an image file. The image will be stored directly in the database.
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <motion.button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isSaving ? 1 : 1.02 }}
                    whileTap={{ scale: isSaving ? 1 : 0.98 }}
                  >
                    {isSaving ? 'Adding...' : 'Add Item'}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Portfolio Item Modal */}
      <AnimatePresence>
        {showEditModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowEditModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-black/60 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Edit Portfolio Item</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <form onSubmit={handleSubmitEdit} className="space-y-4">
                <div>
                  <label className="text-white font-medium mb-2 block">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-colors"
                    style={{ colorScheme: 'dark' }}
                  >
                    <option value="" style={{ backgroundColor: '#1a1a1a', color: '#9ca3af' }}>Select Category</option>
                    {portfolioCategories.map(cat => (
                      <option key={cat} value={cat} style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Portfolio Image *</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-500 file:text-white hover:file:bg-purple-600 transition-colors"
                  />
                  {imagePreviewUrl && (
                    <div className="mt-3">
                      <img src={imagePreviewUrl} alt="Preview" className="w-32 h-32 object-cover rounded-lg border border-white/10" />
                    </div>
                  )}
                  <p className="text-gray-400 text-xs mt-1">
                    {formData.image_url ? 'Current image set. Select new file to change.' : 'No image set. Select a file.'}
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <motion.button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isSaving ? 1 : 1.02 }}
                    whileTap={{ scale: isSaving ? 1 : 0.98 }}
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && selectedItem && (
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
                <h3 className="text-2xl font-bold text-white mb-3">Delete Portfolio Item?</h3>
                <p className="text-gray-300 mb-2">
                  Are you sure you want to delete "{selectedItem.title}"?
                </p>
                <p className="text-gray-400 text-sm mb-6">
                  This action cannot be undone.
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
                    onClick={confirmDelete}
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

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
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
                  <Check className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Success!</h3>
                <p className="text-gray-300 mb-6">{successMessage}</p>
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

      {/* Image Preview Modal */}
      <AnimatePresence>
        {showImagePreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-8 bg-black/95 backdrop-blur-sm"
            onClick={() => setShowImagePreview(false)}
          >
            <motion.button
              onClick={() => setShowImagePreview(false)}
              className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full h-full flex items-center justify-center"
            >
              <img
                src={previewImage}
                alt="Preview"
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
