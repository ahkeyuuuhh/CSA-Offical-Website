# Quick Start - Email Setup

## 🚀 3 Steps to Enable Email Sending

### Step 1: Get API Key (2 minutes)
1. Go to https://resend.com
2. Sign up (free)
3. Click "API Keys"
4. Click "Create API Key"
5. Copy the key (starts with `re_`)

### Step 2: Add to .env.local (30 seconds)
Create or edit `.env.local` in `csa-marketing-website` folder:
```env
RESEND_API_KEY=re_your_key_here
```

### Step 3: Restart Server (30 seconds)
```bash
npm run dev
```

## ✅ Test It

1. Go to http://localhost:3000/admin/contacts
2. Click any contact
3. Type a reply
4. Click "Send Reply"
5. Check the user's email inbox!

## 🎉 That's It!

Users will now receive your replies via email!

## 🐛 Not Working?

### Email not sending?
- Check `.env.local` has the key
- Restart server after adding key
- Check browser console for errors

### Email in spam?
- Verify your domain at resend.com
- Add SPF/DKIM DNS records
- Use verified domain in "from" address

## 📧 Email Preview

Users receive a professional email with:
- Purple gradient header
- Your reply message
- Contact information
- Professional footer

## 💡 Pro Tip

Test with your own email first to see how it looks!

---

**Need more help?** See `EMAIL_SETUP_GUIDE.md`
