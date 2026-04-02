# Contact Form Fix - Complete Setup Guide

## Problem
Contact form submissions were failing with error "Error submitting contact: {}"

## Root Causes Identified
1. Insufficient error handling in the submission function
2. Missing RLS policy for users to view their own contacts
3. Unclear error messages making debugging difficult

## Solutions Implemented

### 1. Enhanced Error Handling
Updated `lib/supabase/admin.ts` with:
- Detailed error messages showing the actual error from Supabase
- Better logging for debugging
- Explicit null checks for user authentication
- Clear error codes and messages

### 2. Updated RLS Policies
Added policy in `supabase/03-create-policies.sql`:
```sql
CREATE POLICY "Users can view own contacts" ON contacts
  FOR SELECT USING (auth.uid() = user_id);
```

### 3. Improved UI Error Display
Updated `app/contact/page.tsx` with:
- Detailed error message display
- Better error state management
- Extended error display time (8 seconds)
- Console logging for debugging

## Setup Instructions

### Step 1: Apply Database Changes
Run these SQL scripts in your Supabase SQL Editor in order:

1. **Create Tables** (if not already done):
```bash
# Run: csa-marketing-website/supabase/01-create-tables.sql
```

2. **Enable RLS** (if not already done):
```bash
# Run: csa-marketing-website/supabase/02-enable-rls.sql
```

3. **Update Policies** (REQUIRED):
```bash
# Run: csa-marketing-website/supabase/03-create-policies.sql
```

4. **Create Indexes** (optional but recommended):
```bash
# Run: csa-marketing-website/supabase/04-create-indexes.sql
```

### Step 2: Verify Environment Variables
Check your `.env.local` file has:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Step 3: Restart Development Server
```bash
npm run dev
```

### Step 4: Test the Contact Form

1. **Sign in as a regular user** (not admin)
2. Go to `/contact`
3. Fill out the form with:
   - Name (auto-filled from user profile)
   - Email (auto-filled from user profile)
   - Phone (optional)
   - Service (select from dropdown)
   - Message (required)
4. Click "Send Message"

### Step 5: Verify in Admin Panel

1. **Sign out** from regular user account
2. **Sign in as admin** using `csaprintanddesign@gmail.com`
3. Go to `/admin/contacts`
4. You should see the submitted contact message

## Troubleshooting

### Error: "User not authenticated"
- User needs to be signed in to submit contact form
- Check if user session is valid
- Try signing out and signing back in

### Error: "Failed to submit contact: new row violates row-level security policy"
- RLS policies not applied correctly
- Re-run `03-create-policies.sql`
- Verify user is authenticated with `auth.uid()`

### Error: "Missing Supabase environment variables"
- Check `.env.local` file exists
- Verify `NEXT_PUBLIC_SUPABASE_URL` is set
- Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set
- Restart dev server after adding env vars

### Contacts not showing in admin panel
- Verify you're signed in with admin email: `csaprintanddesign@gmail.com`
- Check browser console for errors
- Verify RLS policies allow admin to view all contacts

### Still getting errors?
Check the browser console for detailed error messages. The new error handling will show:
- Exact error message from Supabase
- Error code
- Authentication status
- Submission details (with user_id redacted)

## Database Schema Reference

### Contacts Table
```sql
CREATE TABLE contacts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### RLS Policies
- Users can INSERT their own contacts
- Users can SELECT their own contacts
- Admin can SELECT all contacts
- Admin can UPDATE all contacts

## Testing Checklist

- [ ] Database tables created
- [ ] RLS enabled on contacts table
- [ ] RLS policies applied
- [ ] Environment variables set
- [ ] Dev server restarted
- [ ] User can sign in
- [ ] User can submit contact form
- [ ] Success message appears after submission
- [ ] Admin can view submitted contacts
- [ ] Contact status can be updated by admin

## Success Indicators

When working correctly:
1. User submits form → sees green success message
2. Form fields reset (except name/email)
3. Admin panel shows new contact with status "new"
4. No errors in browser console
5. Contact appears immediately in admin panel

## Additional Notes

- Contact submissions are tied to authenticated users
- Each contact stores the user_id of who submitted it
- Admin email is hardcoded as `csaprintanddesign@gmail.com`
- Status options: new, in_progress, completed, archived
- All timestamps are in UTC
