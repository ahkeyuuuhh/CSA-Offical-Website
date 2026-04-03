# CSA Marketing Website - Deployment Guide

## Pre-Deployment Checklist

### 1. Prepare for Vercel Deployment

1. Make sure all changes are committed to your Git repository
2. Push your code to GitHub/GitLab/Bitbucket
3. Go to [Vercel](https://vercel.com) and sign in
4. Click "Add New Project"
5. Import your repository
6. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: `csa-marketing-website`
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

### 2. Environment Variables in Vercel

Add these environment variables in Vercel project settings:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

**Where to find these:**
- Go to your Supabase project dashboard
- Navigate to Settings > API
- Copy the Project URL and anon/public key

### 3. Deploy

Click "Deploy" and wait for the build to complete.

---

## Post-Deployment Configuration

Once deployed, Vercel will give you a URL like: `https://your-project-name.vercel.app`

You'll need to add this URL (and any custom domains) to the following services:

---

## 🔹 SUPABASE CONFIGURATION

### Location: Supabase Dashboard > Authentication > URL Configuration

Add these URLs:

#### Site URL
```
https://your-project-name.vercel.app
```

#### Redirect URLs (Add all of these)
```
https://your-project-name.vercel.app/auth/callback
https://your-project-name.vercel.app/admin
https://your-project-name.vercel.app/admin/products
https://your-project-name.vercel.app/admin/portfolio
https://your-project-name.vercel.app/admin/contacts
```

**If you have a custom domain (e.g., csaprint.com), also add:**
```
https://csaprint.com
https://csaprint.com/auth/callback
https://csaprint.com/admin
https://csaprint.com/admin/products
https://csaprint.com/admin/portfolio
https://csaprint.com/admin/contacts
```

### Additional Supabase Settings

1. **Email Templates** (if using email auth)
   - Go to Authentication > Email Templates
   - Update the redirect URLs in email templates to use your production domain

2. **CORS Settings** (usually automatic, but verify)
   - Go to Settings > API
   - Ensure your domain is allowed

---

## 🔹 GOOGLE CLOUD CONSOLE CONFIGURATION

### Location: Google Cloud Console > APIs & Services > Credentials

1. Find your OAuth 2.0 Client ID (the one you created for Supabase)
2. Click Edit
3. Add to **Authorized JavaScript origins:**

```
https://your-project-name.vercel.app
https://your-supabase-project-ref.supabase.co
```

**If you have a custom domain:**
```
https://csaprint.com
```

4. Add to **Authorized redirect URIs:**

```
https://your-supabase-project-ref.supabase.co/auth/v1/callback
```

**Note:** The Supabase callback URL should already be there from initial setup. Just add your Vercel domain to JavaScript origins.

---

## 🔹 CUSTOM DOMAIN SETUP (Optional)

### In Vercel:
1. Go to Project Settings > Domains
2. Add your custom domain (e.g., csaprint.com)
3. Follow Vercel's instructions to update your DNS records

### After adding custom domain:
- Update all the URLs above to use your custom domain instead of vercel.app
- Add both www and non-www versions if needed

---

## 🔹 TESTING CHECKLIST

After deployment, test these features:

- [ ] Homepage loads correctly
- [ ] All pages are accessible (Products, Portfolio, About, Contact)
- [ ] Contact form submission works
- [ ] Admin login works (test with Google OAuth)
- [ ] Admin can access dashboard
- [ ] Admin can manage products
- [ ] Admin can manage portfolio
- [ ] Admin can view and reply to contacts
- [ ] Images display correctly
- [ ] Mobile responsiveness works
- [ ] Custom fonts load properly

---

## 🔹 QUICK REFERENCE

### Your URLs to Configure:

**Replace these placeholders:**
- `your-project-name` = Your Vercel project name
- `your-supabase-project-ref` = Your Supabase project reference ID
- `csaprint.com` = Your actual custom domain (if applicable)

**Supabase Dashboard:**
```
Site URL: https://your-project-name.vercel.app
Redirect URLs: 
  - https://your-project-name.vercel.app/auth/callback
  - https://your-project-name.vercel.app/admin
  - https://your-project-name.vercel.app/admin/products
  - https://your-project-name.vercel.app/admin/portfolio
  - https://your-project-name.vercel.app/admin/contacts
```

**Google Cloud Console:**
```
Authorized JavaScript origins:
  - https://your-project-name.vercel.app
  - https://your-supabase-project-ref.supabase.co

Authorized redirect URIs:
  - https://your-supabase-project-ref.supabase.co/auth/v1/callback
```

---

## 🔹 TROUBLESHOOTING

### Issue: "Invalid redirect URL" error
**Solution:** Make sure the exact URL is added to Supabase redirect URLs

### Issue: Google OAuth not working
**Solution:** Verify JavaScript origins in Google Cloud Console include both Vercel and Supabase URLs

### Issue: Images not loading
**Solution:** Check that images are in the `public` folder and paths are correct

### Issue: Environment variables not working
**Solution:** 
1. Verify they're set in Vercel project settings
2. Redeploy after adding/changing environment variables

---

## 🔹 SUPPORT

If you encounter issues:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify all URLs are correctly configured
4. Ensure environment variables are set

---

**Deployment Date:** _Add date here_
**Deployed URL:** _Add your Vercel URL here_
**Custom Domain:** _Add custom domain here if applicable_
