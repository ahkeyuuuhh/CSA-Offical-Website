# Google OAuth Setup - Step by Step

## The Issue You're Seeing

The error "This site can't be reached" happens because the OAuth redirect URL isn't properly configured. Here's how to fix it:

## Step-by-Step Setup

### 1. Configure Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your project (or create a new one)
3. Go to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client ID**
5. If prompted, configure the OAuth consent screen:
   - Choose **External** user type
   - Fill in app name: "CSA Print & Design"
   - Add your email as support email
   - Add authorized domain (for testing, you can skip this)
   - Click Save and Continue through the scopes and test users

6. Back in **Create OAuth Client ID**:
   - Application type: **Web application**
   - Name: "CSA Marketing Website"
   
7. **IMPORTANT - Add Authorized Redirect URIs:**
   
   Add BOTH of these URLs:
   ```
   https://[your-project-ref].supabase.co/auth/v1/callback
   http://localhost:3000/auth/callback
   ```
   
   Replace `[your-project-ref]` with your actual Supabase project reference ID
   (You can find this in your Supabase project URL)

8. Click **Create**
9. Copy the **Client ID** and **Client Secret**

### 2. Configure Supabase

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Providers**
3. Find **Google** in the list
4. Toggle it to **Enabled**
5. Paste your **Client ID** from Google
6. Paste your **Client Secret** from Google
7. Click **Save**

### 3. Update Your .env.local File

Make sure your `.env.local` file has the correct Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://[your-project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Get these from: Supabase Dashboard → Settings → API

### 4. Restart Your Dev Server

After updating the `.env.local` file:

1. Stop the current dev server (Ctrl+C)
2. Run `npm run dev` again
3. The server will now load the new environment variables

### 5. Test the Login Flow

1. Go to `http://localhost:3000`
2. Click on **Contact** in the navigation
3. You'll be redirected to `/login`
4. Click **Continue with Google**
5. Sign in with your Google account
6. You should be redirected back to `/contact` with your email auto-filled

## Common Issues and Solutions

### Issue: "This site can't be reached" after clicking Google sign-in

**Solution:** The redirect URI in Google Cloud Console doesn't match. Make sure you added:
```
https://[your-project-ref].supabase.co/auth/v1/callback
```

### Issue: "Error 400: redirect_uri_mismatch"

**Solution:** The redirect URI is wrong. Double-check:
1. Your Supabase project reference ID is correct
2. You added the exact URL to Google Cloud Console
3. There are no extra spaces or characters

### Issue: "Invalid credentials" or "Missing environment variables"

**Solution:** 
1. Check your `.env.local` file exists in the `csa-marketing-website` folder
2. Verify the Supabase URL and key are correct
3. Restart the dev server after making changes

### Issue: Login works but email isn't auto-filled

**Solution:** This is a timing issue. The email should auto-fill after the user object loads. If it doesn't:
1. Check the browser console for errors
2. Make sure you're using a valid Google account
3. Try signing out and signing in again

## Testing Checklist

- [ ] Google OAuth Client ID created
- [ ] Redirect URIs added to Google Cloud Console
- [ ] Google provider enabled in Supabase
- [ ] Client ID and Secret added to Supabase
- [ ] `.env.local` file created with correct values
- [ ] Dev server restarted
- [ ] Can access login page
- [ ] Can click "Continue with Google"
- [ ] Successfully redirected to Google
- [ ] Successfully redirected back to contact page
- [ ] Email is auto-filled in the form
- [ ] Can sign out

## Need Help?

If you're still having issues:
1. Check the browser console for error messages
2. Check the terminal/server logs for errors
3. Verify all URLs match exactly (no typos)
4. Make sure you're using the correct Supabase project
