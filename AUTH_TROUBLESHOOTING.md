# Authentication Troubleshooting Guide

## Current Issue: "session_failed" Error

This error occurs when the OAuth callback can't exchange the authorization code for a session.

## Step-by-Step Fix

### 1. Verify Google OAuth Configuration

Go to [Google Cloud Console](https://console.cloud.google.com):

1. Select your project
2. Go to **APIs & Services** → **Credentials**
3. Click on your OAuth 2.0 Client ID
4. Under **Authorized redirect URIs**, make sure you have BOTH:
   ```
   https://tgrzihvydxzakhwgfhut.supabase.co/auth/v1/callback
   http://localhost:3000/auth/callback
   http://localhost:3001/auth/callback
   ```
5. Click **Save**

### 2. Verify Supabase Configuration

Go to [Supabase Dashboard](https://supabase.com/dashboard):

1. Select your project: `tgrzihvydxzakhwgfhut`
2. Go to **Authentication** → **Providers** → **Google**
3. Make sure it's **Enabled**
4. Verify your Client ID and Client Secret are correct
5. Click **Save**

### 3. Test Authentication Flow

1. **Clear browser data:**
   - Press F12 to open DevTools
   - Go to Application tab
   - Clear all cookies and local storage
   - Close DevTools

2. **Test the auth flow:**
   - Go to `http://localhost:3001/test-auth`
   - This page shows your auth status
   - If not logged in, click "Go to Login"
   - Sign in with Google
   - You should be redirected back and see your user info

3. **Check for errors:**
   - Open browser console (F12)
   - Look for any red error messages
   - Note the exact error text

### 4. Common Issues and Solutions

#### Issue: "redirect_uri_mismatch"
**Solution:** The redirect URI in Google Console doesn't match Supabase.
- Make sure you added: `https://tgrzihvydxzakhwgfhut.supabase.co/auth/v1/callback`
- No extra spaces or characters
- Must be HTTPS for Supabase URL

#### Issue: "session_failed" 
**Solution:** OAuth code exchange failed.
- Check that Google Client ID and Secret are correct in Supabase
- Make sure the Google OAuth consent screen is configured
- Try signing in with a different Google account

#### Issue: Stuck on login page
**Solution:** Callback not working.
- Check browser console for errors
- Verify the callback route exists: `/auth/callback`
- Make sure Supabase credentials are in `.env.local`

#### Issue: "Access denied" or redirected from /admin
**Solution:** Not using admin email.
- Admin email must be: `csaprintanddesign@gmail.com`
- Sign out and sign in with the correct account
- Check `/test-auth` to see which email you're using

### 5. Debug Steps

1. **Check environment variables:**
   ```
   File: .env.local
   NEXT_PUBLIC_SUPABASE_URL=https://tgrzihvydxzakhwgfhut.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
   ```

2. **Restart dev server:**
   - Stop the server (Ctrl+C)
   - Run `npm run dev`
   - Wait for "Ready" message

3. **Test pages in order:**
   - `/test-auth` - Check auth status
   - `/login` - Try signing in
   - `/contact` - Should work after login
   - `/admin` - Only works with admin email

### 6. Quick Test Checklist

- [ ] Google OAuth Client ID created
- [ ] Redirect URIs added to Google Console
- [ ] Google provider enabled in Supabase
- [ ] Client ID and Secret added to Supabase
- [ ] `.env.local` file has correct values
- [ ] Dev server restarted
- [ ] Browser cache cleared
- [ ] Can access `/test-auth` page
- [ ] Can click "Continue with Google"
- [ ] Successfully redirected to Google
- [ ] Successfully redirected back to site
- [ ] User info shows on `/test-auth`

### 7. Still Not Working?

If you've tried everything above:

1. **Check Supabase logs:**
   - Go to Supabase Dashboard
   - Click on **Logs** in the sidebar
   - Look for authentication errors

2. **Check browser console:**
   - Press F12
   - Go to Console tab
   - Look for red error messages
   - Copy the exact error text

3. **Try a different browser:**
   - Sometimes browser extensions block OAuth
   - Try in Incognito/Private mode

4. **Verify the OAuth flow manually:**
   - Go to `/login`
   - Click "Continue with Google"
   - Note the URL you're redirected to
   - Check if it includes `code=` parameter
   - Check if you're redirected back to your site

## Expected Flow

1. User clicks "Continue with Google" on `/login`
2. Redirected to Google sign-in
3. User signs in with Google account
4. Google redirects to: `https://tgrzihvydxzakhwgfhut.supabase.co/auth/v1/callback?code=...`
5. Supabase exchanges code for session
6. Supabase redirects to: `http://localhost:3001/auth/callback?code=...`
7. App exchanges code for session
8. User redirected to `/contact`

If any step fails, you'll see an error message.
