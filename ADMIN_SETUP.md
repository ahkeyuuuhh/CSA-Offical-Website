# Admin Dashboard Setup Guide

## Overview

The admin dashboard allows authorized users to:
- View all contact form submissions
- Track analytics and statistics (Total Contacts, Contacts Today, Website Visits)
- Manage contact status (new, in progress, completed, archived)
- Search and filter contacts
- View detailed contact information

## Admin Access

### Email-Based Admin Access

Admin access is controlled by email address. Only the following email can access the admin panel:
- `csaprintanddesign@gmail.com`

No database setup is required for admin users - access is granted automatically based on email.

### Separate Admin Login

- **User Login**: `/login` - For regular users to access the contact form
- **Admin Login**: `/admin/login` - Dedicated login page for administrators

After logging in:
- Regular users are redirected to `/contact`
- Admin users are redirected to `/admin` dashboard

## Database Setup

### Run the SQL Schema Files

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Run each SQL file in order:
   - `supabase/01-create-tables.sql` - Creates tables
   - `supabase/02-enable-rls.sql` - Enables Row Level Security
   - `supabase/03-create-policies.sql` - Creates security policies
   - `supabase/04-create-indexes.sql` - Creates performance indexes

This will create:
- `contacts` table - stores form submissions
- `admin_users` table - tracks admin access (not used with email-based auth)
- `analytics_events` table - tracks page views and user events
- Row Level Security policies
- Indexes for performance

## Features

### Dashboard (`/admin`)

- **Statistics Cards**:
  - Total Contacts - Total number of contact submissions
  - Contacts Today - Number of contacts received today
  - Website Visits - Total page views tracked across the site

- **Recent Contacts**: Shows the 10 most recent submissions with status badges

- **Quick Navigation**: Click "View All Contacts" to go to the contacts management page

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

### "Access Denied" or Redirected to Login

**Solution**: Make sure you're logging in with the admin email:
1. Go to `/admin/login`
2. Sign in with Google using `csaprintanddesign@gmail.com`
3. You should be redirected to the admin dashboard

### Contacts Not Showing Up

**Solution**: Check the database:
1. Go to Supabase Table Editor → `contacts`
2. Verify the contact was inserted
3. Check the browser console for errors
4. Verify Row Level Security policies are set up correctly

### "Permission Denied" Errors

**Solution**: RLS policies might not be set up:
1. Re-run the SQL files in order (01-04)
2. Make sure all policies were created
3. Check that your user is authenticated

### Website Visits Showing 0

**Solution**: Page view tracking needs time to accumulate:
1. Visit different pages on the site (home, products, portfolio, about, contact)
2. Wait a few seconds for tracking to complete
3. Refresh the admin dashboard
4. The count should increase

## Adding More Admins

To add more admin emails, edit the file `lib/supabase/admin.ts`:

```typescript
const ADMIN_EMAILS = [
  'csaprintanddesign@gmail.com',
  'another-admin@example.com'  // Add more emails here
];
```

## Security Notes

- Admin access is controlled by email address in `lib/supabase/admin.ts`
- Row Level Security ensures only authenticated users can insert their own contacts
- Admin users can view and manage all contacts
- All database operations are protected by RLS policies
- User navigation and footer are hidden from admin pages

## Page View Tracking

The website automatically tracks page views for analytics:
- Home page (`/`)
- Products page (`/products`)
- Portfolio page (`/samples`)
- About page (`/about`)
- Contact page (`/contact`)

Page views are stored in the `analytics_events` table and displayed on the admin dashboard.

## Next Steps (Optional Enhancements)

- Add email notifications when new contacts arrive
- Export contacts to CSV
- Add notes/comments to contacts
- Create custom analytics dashboards
- Add user activity logs
- Implement contact assignment to team members
- Add product and portfolio management functionality
