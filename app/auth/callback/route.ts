import { createClient } from '@/lib/supabase/client';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const error = requestUrl.searchParams.get('error');
  const error_description = requestUrl.searchParams.get('error_description');

  // Handle errors from OAuth provider
  if (error) {
    console.error('OAuth error:', error, error_description);
    return NextResponse.redirect(new URL('/login?error=auth_failed', requestUrl.origin));
  }

  if (code) {
    try {
      const supabase = createClient();
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      
      if (exchangeError) {
        console.error('Session exchange error:', exchangeError);
        return NextResponse.redirect(new URL('/login?error=session_failed', requestUrl.origin));
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      return NextResponse.redirect(new URL('/login?error=unexpected', requestUrl.origin));
    }
  }

  // Redirect to contact page after successful login
  return NextResponse.redirect(new URL('/contact', requestUrl.origin));
}
