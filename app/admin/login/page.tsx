'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { isAdmin } from '@/lib/supabase/admin';
import DarkVeil from '@/components/DarkVeil';
import { Shield, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const { user, loading, signInWithGoogle } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    async function checkAdmin() {
      if (user) {
        setChecking(true);
        const adminStatus = await isAdmin(user.email);
        if (adminStatus) {
          router.push('/admin');
        } else {
          setError('Access denied. This account is not authorized for admin access.');
          setChecking(false);
        }
      }
    }
    
    if (!loading) {
      checkAdmin();
    }
  }, [user, loading, router]);

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      setError('Authentication failed. Please try again.');
    }
  }, [searchParams]);

  const handleAdminSignIn = async () => {
    setError(null);
    await signInWithGoogle(`${window.location.origin}/admin`);
  };

  if (loading || checking) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-950">
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

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Shield className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-3xl font-bold text-white mb-3">Admin Access</h1>
            <p className="text-gray-300 mb-2">
              Restricted area for authorized administrators only
            </p>
            <p className="text-gray-400 text-sm mb-8">
              Only CSA Print & Design admin accounts can access this area
            </p>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg backdrop-blur-sm flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-300 text-sm text-left">{error}</p>
              </motion.div>
            )}

            <motion.button
              onClick={handleAdminSignIn}
              className="w-full px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all flex items-center justify-center gap-3 shadow-lg mb-6"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google (Admin)
            </motion.button>

            <div className="pt-6 border-t border-white/10">
              <p className="text-gray-400 text-sm mb-3">Not an admin?</p>
              <motion.a
                href="/"
                className="text-purple-400 hover:text-purple-300 font-medium text-sm"
                whileHover={{ scale: 1.05 }}
              >
                Go to Main Website →
              </motion.a>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-xs">
              This is a secure area. All access attempts are logged.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
