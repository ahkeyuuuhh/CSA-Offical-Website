# Contact Form Testing Guide

## Quick Test Steps

### 1. Apply Database Changes
In Supabase SQL Editor, run this script:
```sql
-- Run the updated policies
-- Copy and paste from: supabase/03-create-policies.sql
```

### 2. Restart Your Dev Server
```bash
# Stop the current server (Ctrl+C)
npm run dev
```

### 3. Test as Regular User

1. Open browser to `http://localhost:3000`
2. Click "Login" or go to `/login`
3. Sign in with a regular user account (NOT the admin email)
4. Navigate to "Contact" page or go to `/contact`
5. Fill out the form:
   - Name: (auto-filled)
   - Email: (auto-filled)
   - Phone: `555-123-4567` (optional)
   - Service: Select "Custom Stickers"
   - Message: `This is a test message to verify the contact form is working correctly.`
6. Click "Send Message"
7. **Expected Result**: Green success message appears saying "Thank you! We'll get back to you soon."
8. **Check Console**: Should see "Contact submitted successfully" with an ID

### 4. Verify in Admin Panel

1. Sign out from the regular user account
2. Go to `/admin/login`
3. Sign in with admin email: `csaprintanddesign@gmail.com`
4. Navigate to "Contacts" or go to `/admin/contacts`
5. **Expected Result**: You should see the test contact message you just submitted
6. Click on the contact to view details
7. Try changing the status from "new" to "in_progress"

## What to Look For

### Success Indicators ✓
- Form submits without errors
- Green success message appears
- Form fields reset (except name/email)
- No red error messages
- Console shows "Contact submitted successfully"
- Contact appears in admin panel immediately
- Contact shows correct user info and message

### Failure Indicators ✗
- Red error message appears
- Console shows errors
- Form doesn't reset after submission
- Contact doesn't appear in admin panel
- Error message shows "User not authenticated"
- Error message shows "row-level security policy"

## Common Issues and Fixes

### Issue: "User not authenticated"
**Fix**: 
- Sign out and sign back in
- Check if session is valid
- Clear browser cookies and try again

### Issue: "Failed to submit contact: new row violates row-level security policy"
**Fix**:
1. Go to Supabase Dashboard
2. Open SQL Editor
3. Run `supabase/03-create-policies.sql`
4. Restart dev server

### Issue: Contact doesn't appear in admin panel
**Fix**:
- Verify you're signed in as `csaprintanddesign@gmail.com`
- Check if RLS policies allow admin to view contacts
- Run `supabase/verify-setup.sql` to check database setup

### Issue: Detailed error message in red box
**Fix**:
- Read the error message carefully
- Check browser console for more details
- Common errors:
  - Missing environment variables → Check `.env.local`
  - Database connection error → Check Supabase URL and key
  - Authentication error → Sign out and sign back in

## Browser Console Commands

Open browser console (F12) and run these to debug:

```javascript
// Check if user is authenticated
const { data } = await supabase.auth.getUser();
console.log('Current user:', data.user);

// Check Supabase connection
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
```

## Expected Database State After Test

After successful test, your database should have:
- 1 new row in `contacts` table
- `status` = 'new'
- `user_id` = the authenticated user's ID
- `created_at` = current timestamp
- All form fields populated correctly

## Next Steps After Successful Test

1. Test with different services (Business Cards, Photocards, etc.)
2. Test with and without phone number
3. Test status updates in admin panel
4. Test filtering and search in admin panel
5. Test with multiple users submitting contacts

## Rollback (If Needed)

If something goes wrong and you need to start fresh:

```sql
-- In Supabase SQL Editor
-- Delete all test contacts
DELETE FROM contacts WHERE message LIKE '%test message%';

-- Or delete all contacts (careful!)
-- DELETE FROM contacts;
```

## Success Criteria

The contact form is working correctly when:
- [x] User can submit form without errors
- [x] Success message appears
- [x] Contact appears in admin panel
- [x] Admin can view contact details
- [x] Admin can update contact status
- [x] No errors in browser console
- [x] Form validation works (required fields)
- [x] User info auto-fills correctly
