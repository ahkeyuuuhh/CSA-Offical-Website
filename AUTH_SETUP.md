# Authentication Setup Guide

## What's Been Implemented

✅ Google OAuth authentication with Supabase
✅ Login page with Google sign-in button
✅ Protected contact page (requires authentication)
✅ Auto-filled email from authenticated user
✅ User profile display with sign-out button
✅ Auth context provider for global state management
✅ Middleware for session management

## Setup Instructions

### 1. Create `.env.local` file

In the root of `csa-marketing-website`, create a `.env.local` file with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 2. Get Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **API**
3. Copy the **Project URL** and **anon public** key
4. Paste them into your `.env.local` file

### 3. Configure Google OAuth in Supabase

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Find **Google** and enable it
3. You'll need Google OAuth credentials from Google Cloud Console

### 4. Set up Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Enable **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure OAuth consent screen if prompted
6. For **Authorized redirect URIs**, add:
   ```
   https://[your-project-ref].supabase.co/auth/v1/callback
   ```
   (Replace `[your-project-ref]` with your actual Supabase project reference)
7. Copy the **Client ID** and **Client Secret**
8. Paste them into Supabase Google provider settings

### 5. Test the Authentication

1. Start your development server: `npm run dev`
2. Navigate to `/contact` - you should be redirected to `/login`
3. Click "Continue with Google"
4. Sign in with your Google account
5. You'll be redirected back to `/contact` with your email auto-filled

## How It Works

### Authentication Flow

1. **User visits `/contact`** → Redirected to `/login` if not authenticated
2. **User clicks "Continue with Google"** → Redirected to Google OAuth
3. **User authorizes** → Redirected to `/auth/callback`
4. **Callback exchanges code for session** → Redirected to `/contact`
5. **Email is auto-filled** from the authenticated user's Google account

### Files Created

- `lib/supabase/client.ts` - Browser Supabase client
- `lib/supabase/server.ts` - Server Supabase client
- `contexts/AuthContext.tsx` - Auth state management
- `app/login/page.tsx` - Login page with Google button
- `app/auth/callback/route.ts` - OAuth callback handler
- `middleware.ts` - Session management middleware
- `app/contact/page.tsx` - Updated with auth protection

### Key Features

- ✅ Email field is auto-filled and disabled (from Google account)
- ✅ User profile shows name, email, and avatar
- ✅ Sign out button in contact page
- ✅ Protected route - can't access contact without login
- ✅ Seamless redirect flow

## Troubleshooting

### "Invalid redirect URI" error
- Make sure the redirect URI in Google Cloud Console matches your Supabase project URL exactly
- Format: `https://[project-ref].supabase.co/auth/v1/callback`

### Environment variables not loading
- Restart your development server after creating `.env.local`
- Make sure the file is in the root of `csa-marketing-website` folder

### Authentication not persisting
- Check browser console for errors
- Verify Supabase credentials are correct
- Clear browser cookies and try again

## Next Steps (Optional Enhancements)

- Add email/password authentication
- Add user profile page
- Store form submissions in Supabase database
- Add email notifications when forms are submitted
- Add admin dashboard to view submissions
