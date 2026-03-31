'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/supabase/admin';

export function usePageView(pageName: string) {
  useEffect(() => {
    // Track page view
    trackEvent('page_view', { page: pageName });
  }, [pageName]);
}
