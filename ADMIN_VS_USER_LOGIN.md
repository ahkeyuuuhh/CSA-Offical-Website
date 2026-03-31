# Admin vs User Login - Separate Authentication Flows

## Overview

The system now has TWO separate login pages:

1. **User Login** (`/login`) - For regular users who want to send contact messages
2. **Admin Login** (`/admin/login`) - For CSA Print & Design administrators only

## User Login Flow

### Purpose
Regular users who want to send contact messages through the website.

### Access
- **URL:** `/login`
- **Redirect After Login:** `/contact`
- **Who Can Use:** Anyone with a Google account

### Flow
1. User visits `/contact`
2. Not logged in → Redirected to `/login`
3. Clicks "Continue with Google"
4. Signs in with any Google account
5. Redirected back to `/contact`
6. Name and email auto-filled from Google account
7. Can submit contact form

## Admin Login Flow

### Purpose
CSA Print & Design administrators who need to access the admin dashboard.

### Access
- **URL:** `/admin/login`
- **Redirect After Login:** `/admin`
- **Who Can Use:** ONLY `csaprintanddesign@gmail.com`

### Flow
1. Admin visits `/admin` or `/admin/contacts`
2. Not logged in → Redirected to `/admin/login`
3. Clicks "Sign in with Google (Admin)"
4. Signs in with `csaprintanddesign@gmail.com`
5. System checks if email is authorized
6. If authorized → Redirected to `/admin` dashboard
7. If NOT authorized → Error message shown

### Security
- ✅ Email verification on every page load
- ✅ Non-admin accounts cannot access admin pages
- ✅ Separate login page makes it clear this is restricted
- ✅ All access attempts can be logged

## Key Differences

| Feature | User Login | Admin Login |
|---------|-----------|-------------|
| URL | `/login` | `/admin/login` |
| Purpose | Send contact messages | Manage dashboard |
| Redirect | `/contact` | `/admin` |
| Access | Any Google account | Admin email only |
| Design | Friendly, welcoming | Secure, restricted |
| Icon | Login arrow | Shield |

## Pages and Access Control

### Public Pages (No Login Required)
- `/` - Home
- `/products` - Products
- `/samples` - Portfolio
- `/about` - About Us

### User Pages (Any Logged-In User)
- `/contact` - Contact form

### Admin Pages (Admin Email Only)
- `/admin` - Dashboard
- `/admin/contacts` - Manage contacts
- `/admin/analytics` - Analytics (future)

## Testing

### Test User Login
1. Go to `/login`
2. Sign in with any Google account
3. Should redirect to `/contact`
4. Try to access `/admin` → Should redirect to `/admin/login` with error

### Test Admin Login
1. Go to `/admin/login`
2. Sign in with `csaprintanddesign@gmail.com`
3. Should redirect to `/admin`
4. Should see dashboard with stats

### Test Non-Admin Trying Admin
1. Go to `/admin/login`
2. Sign in with a different Google account
3. Should see error: "Access denied. This account is not authorized..."
4. Should NOT be able to access `/admin`

## Visual Design

### User Login Page
- Purple/magenta theme
- Friendly welcome message
- "Continue with Google" button
- Terms and privacy notice

### Admin Login Page
- Purple/pink gradient shield icon
- "Admin Access" heading
- "Restricted area" warning
- "Sign in with Google (Admin)" button
- Link back to main website
- Security notice at bottom

## URLs Summary

**For Regular Users:**
- Login: `http://localhost:3000/login`
- After login: `http://localhost:3000/contact`

**For Admins:**
- Login: `http://localhost:3000/admin/login`
- After login: `http://localhost:3000/admin`
- Contacts: `http://localhost:3000/admin/contacts`

## Adding More Admin Emails

To add more admin emails, update `lib/supabase/admin.ts`:

```typescript
const ADMIN_EMAILS = [
  'csaprintanddesign@gmail.com',
  'another-admin@example.com',  // Add here
];
```

## Security Notes

- Admin login page clearly states it's restricted
- Non-admin users see error message immediately
- Admin pages check authorization on every load
- Database policies enforce email-based access
- All authentication uses Google OAuth (secure)
