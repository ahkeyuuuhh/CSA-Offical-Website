# Quick Setup - Contact System V2

## 🚀 3 Steps to Upgrade

### Step 1: Run Migration (2 minutes)
In Supabase SQL Editor:
```sql
-- Copy and paste from: supabase/migrate-contacts.sql
```

### Step 2: Update Policies (1 minute)
In Supabase SQL Editor:
```sql
-- Copy and paste from: supabase/03-create-policies.sql
```

### Step 3: Restart Server (30 seconds)
```bash
npm run dev
```

## ✅ Test It

### As User:
1. Go to `/contact`
2. Submit form
3. See success modal ✓

### As Admin:
1. Go to `/admin`
2. See compact dashboard ✓
3. Go to `/admin/contacts`
4. See centered search & tabs ✓
5. Click contact → auto-marks as read ✓
6. Reply to contact ✓
7. Delete contact ✓

## 🎨 What Changed

### User Side:
- Success modal (not green bar)
- Error modal with details

### Admin Side:
- Smaller, compact UI
- Centered search bar
- Tabs: All, Unread, Read, Replied
- Auto-mark as read
- Reply functionality
- Delete functionality

## 📧 Email Setup (Optional)

To enable email replies:

1. Install Resend:
```bash
npm install resend
```

2. Add to `.env.local`:
```env
RESEND_API_KEY=your_key_here
```

3. Uncomment code in `app/api/send-reply/route.ts`

## 🐛 Issues?

### Migration fails
→ Run `supabase/01-create-tables.sql` first

### Policies error
→ Re-run `supabase/03-create-policies.sql`

### Contact not marking as read
→ Check browser console, verify admin signed in

### Reply not sending
→ Email service not configured (check console logs)

## 📊 New Status System

- **unread** - Just submitted
- **read** - Admin viewed it
- **replied** - Admin sent reply
- **archived** - Closed

## ✨ That's It!

Your contact system is now upgraded with modern UI and reply functionality!

For detailed docs, see: `CONTACT_SYSTEM_V2_SETUP.md`
