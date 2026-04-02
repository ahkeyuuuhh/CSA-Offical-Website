# Contact Form - README

## 🎯 Quick Start

The contact form has been fixed and enhanced with better error handling. Follow these 3 steps:

### 1. Update Database
```sql
-- In Supabase SQL Editor, run:
-- File: supabase/03-create-policies.sql
```

### 2. Restart Server
```bash
npm run dev
```

### 3. Test It
- Sign in as user → Go to `/contact` → Submit form → See success ✓
- Sign in as admin → Go to `/admin/contacts` → See submitted contact ✓

## 📚 Documentation

| File | Purpose |
|------|---------|
| **QUICK_FIX_STEPS.md** | 3-step quick fix guide |
| **CONTACT_FORM_FIX.md** | Detailed setup & troubleshooting |
| **TEST_CONTACT_FORM.md** | Step-by-step testing guide |
| **CONTACT_FORM_COMPLETE.md** | Complete implementation docs |
| **CONTACT_FLOW.md** | Visual flow diagrams |
| **CHANGES_SUMMARY.md** | What changed and why |

## 🔧 What Was Fixed

1. **Better Error Messages** - Shows actual error instead of "{}"
2. **Database Policy** - Added policy for users to view own contacts
3. **UI Improvements** - Better error display with details
4. **Logging** - Console logs for debugging

## ✅ How to Verify

```sql
-- Run in Supabase SQL Editor:
SELECT policyname FROM pg_policies WHERE tablename = 'contacts';
-- Should show 4 policies
```

## 🚨 Troubleshooting

| Problem | Solution |
|---------|----------|
| "User not authenticated" | Sign out and sign back in |
| "row-level security policy" | Re-run `03-create-policies.sql` |
| Contact not in admin panel | Sign in as `csaprintanddesign@gmail.com` |
| Generic error | Check browser console for details |

## 📖 Read This First

**New to this project?** → Start with `QUICK_FIX_STEPS.md`

**Need detailed help?** → Read `CONTACT_FORM_FIX.md`

**Want to test?** → Follow `TEST_CONTACT_FORM.md`

**Need complete docs?** → See `CONTACT_FORM_COMPLETE.md`

## 🎓 How It Works

```
User submits form
    ↓
Validates authentication
    ↓
Saves to database
    ↓
Shows success message
    ↓
Admin sees in panel
```

## 🔐 Security

- Only authenticated users can submit
- Users can only view their own contacts
- Admin can view all contacts
- RLS enforced at database level

## 📞 Admin Email

Current admin: `csaprintanddesign@gmail.com`

To add more admins, update:
- `lib/supabase/admin.ts` - ADMIN_EMAILS array
- `supabase/03-create-policies.sql` - RLS policies

## 🎉 Success Indicators

When working correctly:
- ✅ Form submits without errors
- ✅ Green success message appears
- ✅ Form resets after submission
- ✅ Contact appears in admin panel
- ✅ No red error messages
- ✅ No console errors

## 🛠️ Files Modified

- `lib/supabase/admin.ts` - Enhanced error handling
- `app/contact/page.tsx` - Better error display
- `supabase/03-create-policies.sql` - Added user view policy

## 📦 SQL Scripts

| Script | Purpose |
|--------|---------|
| `01-create-tables.sql` | Create database tables |
| `02-enable-rls.sql` | Enable row-level security |
| `03-create-policies.sql` | Create RLS policies (UPDATED) |
| `04-create-indexes.sql` | Create database indexes |
| `verify-setup.sql` | Verify database setup |
| `check-policies.sql` | Check current policies |

## 🚀 Next Steps

1. Run `03-create-policies.sql` in Supabase
2. Restart dev server
3. Test contact form
4. Verify in admin panel
5. Done! 🎉

## 💡 Tips

- Always check browser console for errors
- Use `verify-setup.sql` to check database
- Test with both user and admin accounts
- Keep `.env.local` file secure
- Restart server after env changes

## 📝 Status Options

- **new** - Just submitted
- **in_progress** - Admin working on it
- **completed** - Request fulfilled
- **archived** - Closed

## 🔗 Related Pages

- User contact form: `/contact`
- Admin contacts panel: `/admin/contacts`
- Admin login: `/admin/login`
- User login: `/login`

## ⚡ Quick Commands

```bash
# Start dev server
npm run dev

# Check for TypeScript errors
npm run build

# Format code
npm run format
```

## 📊 Database Tables

- **contacts** - Stores contact form submissions
- **admin_users** - Stores admin user records (optional)
- **analytics_events** - Stores page view analytics

## 🎯 Key Features

- ✅ Google OAuth authentication
- ✅ Auto-fill user info
- ✅ Form validation
- ✅ Success/error feedback
- ✅ Admin panel management
- ✅ Status tracking
- ✅ Search and filter
- ✅ Detailed error messages

## 🔍 Debugging

```javascript
// In browser console (F12)
// Check current user
const { data } = await supabase.auth.getUser();
console.log(data.user);

// Check Supabase config
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);
```

## 📧 Contact Flow

1. User signs in
2. Goes to /contact
3. Fills form
4. Submits
5. Saved to database
6. Admin sees in panel
7. Admin updates status
8. Done!

## 🎨 UI States

- **Idle** - Form ready for input
- **Submitting** - Showing loading state
- **Success** - Green success message
- **Error** - Red error message with details

## 🔒 Environment Variables

Required in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
```

## 📈 What's New

- Enhanced error handling
- Detailed error messages
- Better logging
- User view policy
- Comprehensive documentation
- Testing guides
- Verification scripts

## ✨ That's It!

The contact form is now fixed and ready to use. Messages from users will appear in the admin panel at `/admin/contacts`.

For more details, check the documentation files listed above.
