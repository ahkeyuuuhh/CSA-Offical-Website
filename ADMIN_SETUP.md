# Admin Dashboard Setup Guide

## Overview

The admin dashboard allows authorized users to:
- View all contact form submissions
- Track analytics and statistics
- Manage contact status (new, in progress, completed, archived)
- Search and filter contacts
- View detailed contact information

## Database Setup

### Step 1: Run the SQL Schema

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Open the file `supabase/schema.sql` from this project
4. Copy all the SQL code
5. Paste it into the Supabase SQL Editor
6. Click **Run** to execute the schema

This will create:
- `contacts` table - stores form submissions
- `admin_users` table - tracks admin access
- `analytics_events` table - tracks user events
- Row Level Security policies
- Indexes for performance

### Step 2: Add Admin Users

After running the schema, you need to manually add admin users to the `admin_users` table.

1. In Supabase, go to **Authentication** → **Users**
2. Find the user you want to make an admin
3. Copy their **User ID** (UUID)
4. Go to **Table Editor** → **admin_users**
5. Click **Insert** → **Insert row**
6. Fill in:
   - `user_id`: Paste the UUID you copied
   - `email`: The user's email address
7. Click **Save**

## Accessing the Admin Dashboard

### Admin Routes

- `/admin` - Main dashboard with stats and overview
- `/admin/contacts` - Manage all contact submissions
- `/admin/analytics` - View analytics (coming soon)

### Access Control

- Only users listed in the `admin_users` table can access admin pages
- Non-admin users are automatically redirected to the home page
- Users must be logged in with Google OAuth

## Features

### Dashboard (`/admin`)

- **Statistics Cards**:
  - Total Contacts
  - New This Week
  - In Progress
  - Completed

- **Quick Actions**:
  - Manage Contacts
  - View Analytics

- **Recent Contacts**: Shows the 5 most recent submissions

### Contacts Management (`/admin/contacts`)

- **Search**: Search by name, email, or message content
- **Filter by Status**: Filter contacts by their current status
- **Contact Cards**: Click any contact to view full details
- **Status Management**: Update contact status directly from the detail modal

### Contact Statuses

- **New**: Just submitted, not yet reviewed
- **In Progress**: Currently being handled
- **Completed**: Successfully resolved
- **Archived**: Closed or no longer active

## UI Design

The admin interface uses the same design system as the main website:
- DarkVeil background with purple hue
- Glassmorphism cards
- Smooth animations with Framer Motion
- Consistent color scheme and typography
- Responsive design for all screen sizes

## Testing the Admin System

### 1. Create a Test Contact

1. Go to `/contact` on your website
2. Sign in with Google
3. Fill out and submit the contact form
4. You should see a success message

### 2. Access Admin Dashboard

1. Make sure your user is added to `admin_users` table
2. Go to `/admin`
3. You should see the dashboard with your test contact

### 3. Manage Contacts

1. Go to `/admin/contacts`
2. Click on your test contact
3. Try changing its status
4. The status should update immediately

## Troubleshooting

### "Access Denied" or Redirected to Home

**Solution**: Make sure your user ID is in the `admin_users` table:
1. Check your user ID in Supabase Authentication
2. Verify it exists in the `admin_users` table
3. Make sure the email matches

### Contacts Not Showing Up

**Solution**: Check the database:
1. Go to Supabase Table Editor → `contacts`
2. Verify the contact was inserted
3. Check the browser console for errors
4. Verify Row Level Security policies are set up correctly

### "Permission Denied" Errors

**Solution**: RLS policies might not be set up:
1. Re-run the schema.sql file
2. Make sure all policies were created
3. Check that your user is authenticated

## Adding More Admins

To add more admin users:

```sql
INSERT INTO admin_users (user_id, email)
VALUES ('user-uuid-here', 'admin@example.com');
```

Or use the Supabase Table Editor as described in Step 2 above.

## Security Notes

- Admin access is controlled by the `admin_users` table
- Row Level Security ensures only admins can view/edit contacts
- Regular users can only insert their own contacts
- All database operations are protected by RLS policies

## Next Steps (Optional Enhancements)

- Add email notifications when new contacts arrive
- Export contacts to CSV
- Add notes/comments to contacts
- Create custom analytics dashboards
- Add user activity logs
- Implement contact assignment to team members
