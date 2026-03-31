# Quick Admin Setup - 5 Minutes

Follow these steps to get the admin dashboard running:

## Step 1: Set Up Database (2 minutes)

1. Go to your Supabase project: https://supabase.com/dashboard
2. Click on your project: `tgrzihvydxzakhwgfhut`
3. Go to **SQL Editor** (left sidebar)
4. Click **New Query**

5. Copy and paste each SQL file in order:
   - First: `supabase/01-create-tables.sql`
   - Second: `supabase/02-enable-rls.sql`
   - Third: `supabase/03-create-policies.sql`
   - Fourth: `supabase/04-create-indexes.sql`
   
6. Click **Run** after pasting each one

## Step 2: Make Yourself an Admin (1 minute)

1. In Supabase, go to **Authentication** → **Users**
2. Find your Google account in the list
3. Click on it and copy the **User ID** (it's a long UUID like `123e4567-e89b-12d3-a456-426614174000`)

4. Go to **Table Editor** → **admin_users**
5. Click **Insert** → **Insert row**
6. Fill in:
   - `user_id`: Paste your User ID
   - `email`: Your Google email
7. Click **Save**

## Step 3: Test the System (2 minutes)

### Test Contact Form:
1. Go to `http://localhost:3000/contact`
2. You should already be logged in
3. Fill out the form and submit
4. You should see a success message

### Test Admin Dashboard:
1. Go to `http://localhost:3000/admin`
2. You should see the dashboard with stats
3. Click "Manage Contacts"
4. You should see your test contact
5. Click on it to view details
6. Try changing the status

## Troubleshooting

### Error: "Maximum update depth exceeded"
✅ FIXED! The AuthContext has been updated to prevent this error.

### Can't access /admin
- Make sure you added your user_id to the `admin_users` table
- Check that the user_id matches exactly (copy-paste it)
- Try logging out and logging back in

### Contact form not saving
- Check browser console for errors
- Verify the tables were created in Supabase
- Make sure RLS policies are enabled

### "Permission denied" errors
- Re-run the SQL scripts in order
- Make sure you're logged in
- Verify your user is in `admin_users` table

## Quick Test Checklist

- [ ] Database tables created
- [ ] Your user added to admin_users
- [ ] Can access /contact page
- [ ] Can submit contact form
- [ ] Can access /admin page
- [ ] Can see dashboard stats
- [ ] Can view contacts list
- [ ] Can update contact status

## What You Should See

### Dashboard (/admin):
- 4 stat cards showing contact counts
- 2 quick action buttons
- List of recent contacts

### Contacts Page (/admin/contacts):
- Search bar
- Status filter buttons
- List of all contacts
- Click any contact to see details
- Change status in the modal

## Need Help?

If something isn't working:
1. Check the browser console (F12) for errors
2. Check the Supabase logs
3. Verify all SQL scripts ran successfully
4. Make sure your .env.local has the correct credentials
