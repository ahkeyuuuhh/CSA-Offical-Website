# Admin Access - Email-Based Security

## Overview

The admin interface is now secured by email address. Only `csaprintanddesign@gmail.com` can access the admin dashboard.

## How It Works

- **Admin Email:** `csaprintanddesign@gmail.com`
- **Access Control:** Checked on every admin page load
- **Security:** Email verification happens both in the app and database level

## Setup Steps

### 1. Update Database Policies (Required)

Run the updated SQL script in Supabase:

1. Go to Supabase Dashboard → SQL Editor
2. Copy and paste `supabase/03-create-policies.sql`
3. Click **Run**

This updates the Row Level Security policies to check for the admin email.

### 2. Sign In with Admin Account

1. Go to `http://localhost:3001/login`
2. Click "Continue with Google"
3. Sign in with `csaprintanddesign@gmail.com`

### 3. Access Admin Dashboard

Once signed in with the admin email, you can access:

- **Dashboard:** `http://localhost:3001/admin`
- **Contacts:** `http://localhost:3001/admin/contacts`

## Adding More Admin Emails

To add more admin emails, update the `ADMIN_EMAILS` array in:

**File:** `lib/supabase/admin.ts`

```typescript
const ADMIN_EMAILS = [
  'csaprintanddesign@gmail.com',
  'another-admin@example.com',  // Add more here
];
```

Then update the RLS policies in Supabase to include the new emails:

```sql
CREATE POLICY "Admins can view all contacts" ON contacts
  FOR SELECT USING (
    auth.jwt() ->> 'email' IN ('csaprintanddesign@gmail.com', 'another-admin@example.com')
  );
```

## Security Features

✅ **Email-based authentication** - No database setup required
✅ **Google OAuth** - Secure sign-in
✅ **Row Level Security** - Database-level protection
✅ **Client-side checks** - Immediate redirect for non-admins
✅ **Server-side validation** - Database policies enforce access

## Testing

### Test as Admin:
1. Sign in with `csaprintanddesign@gmail.com`
2. Go to `/admin` - Should see dashboard
3. Go to `/admin/contacts` - Should see contacts list

### Test as Regular User:
1. Sign in with any other Google account
2. Go to `/admin` - Should redirect to home page
3. Go to `/contact` - Should work normally

## Troubleshooting

### Can't access admin dashboard
- ✅ Make sure you're signed in with `csaprintanddesign@gmail.com`
- ✅ Check that you ran the updated SQL policies
- ✅ Try logging out and logging back in

### "Permission denied" errors
- ✅ Re-run the `03-create-policies.sql` script
- ✅ Make sure the email in the policy matches exactly
- ✅ Check browser console for specific errors

## No Database Setup Required!

Unlike the previous version, you don't need to manually add users to the `admin_users` table. The system automatically checks the email address when you sign in.

Simply sign in with `csaprintanddesign@gmail.com` and you'll have full admin access!
