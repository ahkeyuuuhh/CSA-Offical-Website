# Contact Form - Complete Implementation

## Overview
The contact form allows authenticated users to send messages to the admin. Messages are stored in the database and can be viewed/managed in the admin panel.

## What Was Fixed

### 1. Enhanced Error Handling
- Added detailed error messages showing exact Supabase errors
- Improved logging for debugging
- Better user feedback with specific error details
- Extended error display time to 8 seconds

### 2. Database Policies
- Added policy for users to view their own contacts
- Maintained admin access to view all contacts
- Ensured proper RLS (Row Level Security) configuration

### 3. UI Improvements
- Better error message display with details
- Console logging for debugging
- Clear success/error states

## Files Modified

1. **lib/supabase/admin.ts**
   - Enhanced `submitContact()` function with better error handling
   - Added detailed logging
   - Improved error messages

2. **app/contact/page.tsx**
   - Added `errorMessage` state
   - Enhanced error display UI
   - Improved console logging

3. **supabase/03-create-policies.sql**
   - Added "Users can view own contacts" policy
   - Maintained all existing admin policies

## Files Created

1. **CONTACT_FORM_FIX.md** - Detailed setup and troubleshooting guide
2. **TEST_CONTACT_FORM.md** - Step-by-step testing instructions
3. **supabase/verify-setup.sql** - Database verification script
4. **supabase/check-policies.sql** - Quick policy check script

## How It Works

### User Flow
1. User signs in with Google OAuth
2. User navigates to `/contact` page
3. Form auto-fills with user's name and email
4. User fills in optional phone, service, and required message
5. User clicks "Send Message"
6. System validates and submits to database
7. Success message appears and form resets

### Admin Flow
1. Admin signs in with `csaprintanddesign@gmail.com`
2. Admin navigates to `/admin/contacts`
3. Admin sees all submitted contacts
4. Admin can filter by status (new, in_progress, completed, archived)
5. Admin can search contacts
6. Admin can click contact to view details
7. Admin can update contact status

### Database Flow
```
User submits form
    ↓
submitContact() called
    ↓
Validates user authentication
    ↓
Inserts into contacts table with user_id
    ↓
RLS policy checks: auth.uid() = user_id ✓
    ↓
Contact saved with status 'new'
    ↓
Admin can view via admin policy
```

## Database Schema

### Contacts Table
```sql
contacts (
  id UUID PRIMARY KEY,
  user_id UUID → auth.users(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

### RLS Policies
1. **Users can insert own contacts** - INSERT with `auth.uid() = user_id`
2. **Users can view own contacts** - SELECT with `auth.uid() = user_id`
3. **Admins can view all contacts** - SELECT with email check
4. **Admins can update all contacts** - UPDATE with email check

## Setup Instructions

### Quick Setup (3 Steps)

1. **Run SQL Scripts** (in Supabase SQL Editor):
   ```sql
   -- Run these in order:
   -- 1. supabase/01-create-tables.sql
   -- 2. supabase/02-enable-rls.sql
   -- 3. supabase/03-create-policies.sql (UPDATED - must re-run)
   -- 4. supabase/04-create-indexes.sql
   ```

2. **Verify Setup**:
   ```sql
   -- Run: supabase/verify-setup.sql
   -- Should show 4 policies on contacts table
   ```

3. **Restart Dev Server**:
   ```bash
   npm run dev
   ```

### Verification

Run `supabase/check-policies.sql` to verify all policies exist:
- ✓ Admins can update all contacts
- ✓ Admins can view all contacts
- ✓ Users can insert own contacts
- ✓ Users can view own contacts

## Testing

Follow the guide in `TEST_CONTACT_FORM.md`:

1. Sign in as regular user
2. Go to `/contact`
3. Submit test message
4. Verify success message
5. Sign in as admin
6. Go to `/admin/contacts`
7. Verify contact appears
8. Update status

## Error Messages Explained

### "User not authenticated"
- User session expired or invalid
- Solution: Sign out and sign back in

### "Failed to submit contact: new row violates row-level security policy"
- RLS policies not applied correctly
- Solution: Re-run `03-create-policies.sql`

### "Missing Supabase environment variables"
- `.env.local` file missing or incomplete
- Solution: Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### "Failed to submit contact: [specific error]"
- Shows exact Supabase error
- Check browser console for details
- Verify database connection and schema

## Troubleshooting

### Contact form shows error
1. Check browser console for detailed error
2. Verify user is authenticated
3. Check `.env.local` has correct values
4. Verify database policies are applied
5. Run `verify-setup.sql` to check database

### Contact doesn't appear in admin panel
1. Verify signed in as `csaprintanddesign@gmail.com`
2. Check RLS policies allow admin to view
3. Refresh the page
4. Check browser console for errors

### Form submits but shows error
1. Check if contact was actually saved (check database)
2. Might be a display issue - check console
3. Verify success/error state logic

## Security Features

1. **Authentication Required** - Only signed-in users can submit
2. **RLS Policies** - Users can only insert/view their own contacts
3. **Admin Access** - Only admin email can view all contacts
4. **Input Validation** - Required fields enforced
5. **User ID Tracking** - Each contact tied to authenticated user

## Admin Email

The admin email is hardcoded in:
- `lib/supabase/admin.ts` - `ADMIN_EMAILS` array
- `supabase/03-create-policies.sql` - RLS policies

Current admin: `csaprintanddesign@gmail.com`

To add more admins, update both locations.

## Status Options

- **new** - Just submitted, not yet reviewed
- **in_progress** - Admin is working on it
- **completed** - Request fulfilled
- **archived** - Closed/archived

## API Reference

### submitContact()
```typescript
submitContact({
  name: string,
  email: string,
  phone?: string,
  service?: string,
  message: string
}): Promise<Contact>
```

### getContacts()
```typescript
getContacts(): Promise<Contact[]>
```

### updateContactStatus()
```typescript
updateContactStatus(
  contactId: string,
  status: 'new' | 'in_progress' | 'completed' | 'archived'
): Promise<Contact>
```

## Success Checklist

- [x] Enhanced error handling in submitContact()
- [x] Added detailed error messages
- [x] Updated RLS policies
- [x] Added user view policy
- [x] Improved UI error display
- [x] Created setup documentation
- [x] Created testing guide
- [x] Created verification scripts
- [x] No TypeScript errors
- [x] Proper logging for debugging

## Next Steps

1. Run `supabase/03-create-policies.sql` in Supabase
2. Restart dev server
3. Follow `TEST_CONTACT_FORM.md` to test
4. Verify contact appears in admin panel

## Support

If issues persist:
1. Check `CONTACT_FORM_FIX.md` for detailed troubleshooting
2. Run `verify-setup.sql` to check database state
3. Check browser console for detailed errors
4. Verify environment variables are set
5. Ensure user is authenticated before submitting
