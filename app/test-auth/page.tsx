'use client';

import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import DarkVeil from '@/components/DarkVeil';

export default function TestAuth() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-950">
      <div className="absolute inset-0 z-0">
        <DarkVeil hueShift={280} />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8"
          >
            <h1 className="text-3xl font-bold text-white mb-6">Auth Test Page</h1>
            
            {user ? (
              <div className="space-y-4">
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                  <p className="text-green-300 font-semibold mb-2">✅ Authenticated!</p>
                </div>
                
                <div className="space-y-2 text-white">
                  <p><strong>User ID:</strong> {user.id}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Name:</strong> {user.user_metadata?.full_name || 'N/A'}</p>
                  <p><strong>Avatar:</strong> {user.user_metadata?.avatar_url ? '✅' : '❌'}</p>
                </div>

                <div className="mt-6 p-4 bg-white/5 rounded-lg">
                  <p className="text-gray-400 text-sm mb-2">Full User Object:</p>
                  <pre className="text-xs text-gray-300 overflow-auto">
                    {JSON.stringify(user, null, 2)}
                  </pre>
                </div>

                <div className="mt-6 space-y-2">
                  <a
                    href="/contact"
                    className="block text-center px-6 py-3 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-all"
                  >
                    Go to Contact Page
                  </a>
                  <a
                    href="/admin"
                    className="block text-center px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all"
                  >
                    Try Admin Page
                  </a>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
                  <p className="text-red-300 font-semibold">❌ Not Authenticated</p>
                </div>
                <a
                  href="/login"
                  className="block text-center px-6 py-3 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-all"
                >
                  Go to Login
                </a>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
