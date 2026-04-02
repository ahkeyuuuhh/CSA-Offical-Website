# Quick Fix Steps - Contact Form

## 🚀 3 Steps to Fix

### Step 1: Update Database Policies
In Supabase SQL Editor, run:
```sql
-- Copy and paste ALL content from:
-- csa-marketing-website/supabase/03-create-policies.sql
```

### Step 2: Restart Dev Server
```bash
# Press Ctrl+C to stop current server
npm run dev
```

### Step 3: Test
1. Sign in as regular user (not admin)
2. Go to http://localhost:3000/contact
3. Fill form and click "Send Message"
4. Should see green success message ✓

## ✅ Verify It Works

### As User:
- Go to `/contact`
- Submit form
- See green success message
- No red errors

### As Admin:
- Sign in with `csaprintanddesign@gmail.com`
- Go to `/admin/contacts`
- See the submitted contact
- Can update status

## 🔍 Quick Checks

### Check 1: Policies Exist
Run in Supabase SQL Editor:
```sql
SELECT policyname FROM pg_policies WHERE tablename = 'contacts';
```
Should show 4 policies.

### Check 2: Environment Variables
Check `.env.local` has:
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### Check 3: User Authenticated
Before submitting, user must be signed in.

## ❌ If Still Broken

### Error: "User not authenticated"
→ Sign out and sign back in

### Error: "row-level security policy"
→ Re-run Step 1 (update policies)

### Error: "Missing Supabase environment variables"
→ Check `.env.local` file exists with correct values

### Contact doesn't show in admin
→ Make sure signed in as `csaprintanddesign@gmail.com`

## 📚 More Help

- **Detailed Guide**: `CONTACT_FORM_FIX.md`
- **Testing Guide**: `TEST_CONTACT_FORM.md`
- **Complete Docs**: `CONTACT_FORM_COMPLETE.md`

## 🎯 What Changed

1. Better error messages (shows actual error)
2. Added policy for users to view own contacts
3. Improved error display in UI
4. Better logging for debugging

## ⚡ That's It!

The contact form should now work. Messages from users will appear in the admin panel at `/admin/contacts`.
