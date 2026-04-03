# Email Setup Guide - Resend Integration

## 🎯 Overview

The contact reply system now sends actual emails to users using Resend. This guide will help you set it up.

## ✅ What's Already Done

1. ✅ Resend library installed (`npm install resend`)
2. ✅ Email API route created (`app/api/send-reply/route.ts`)
3. ✅ Beautiful HTML email template
4. ✅ Error handling and fallbacks
5. ✅ Success modal instead of alert

## 🚀 Quick Setup (5 Minutes)

### Step 1: Get Resend API Key

1. Go to [resend.com](https://resend.com)
2. Sign up for free account
3. Verify your email
4. Go to API Keys section
5. Click "Create API Key"
6. Copy the key (starts with `re_`)

### Step 2: Add to Environment Variables

Add to your `.env.local` file:

```env
RESEND_API_KEY=re_your_api_key_here
```

### Step 3: Verify Domain (Optional but Recommended)

For production, verify your domain:

1. In Resend dashboard, go to "Domains"
2. Click "Add Domain"
3. Enter your domain (e.g., `csaprint.com`)
4. Add DNS records as instructed
5. Wait for verification

### Step 4: Update From Email (If Domain Verified)

If you verified a domain, update the "from" email in `app/api/send-reply/route.ts`:

```typescript
from: 'CSA Prints <noreply@yourdomain.com>',
```

### Step 5: Restart Server

```bash
npm run dev
```

### Step 6: Test It!

1. Go to `/admin/contacts`
2. Click on a contact
3. Type a reply
4. Click "Send Reply"
5. Check the user's email inbox!

## 📧 Email Template

The email includes:
- Beautiful gradient header
- Your reply message
- Contact information
- Professional footer
- Responsive design

## 🎨 Email Preview

```
┌─────────────────────────────────────┐
│  CSA Prints & Design                │ ← Purple gradient header
├─────────────────────────────────────┤
│                                     │
│  Thank you for contacting us...     │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Your reply message here     │   │ ← Reply box
│  └─────────────────────────────┘   │
│                                     │
│  If you have questions...           │
│                                     │
│  ─────────────────────────────────  │
│  CSA Prints & Design                │
│  Email: info@csaprint.com           │
│  Phone: (555) 123-4567              │
└─────────────────────────────────────┘
```

## 🔧 Configuration Options

### Change Email Template

Edit `app/api/send-reply/route.ts`:

```typescript
html: `
  <div style="...">
    <!-- Your custom HTML here -->
  </div>
`
```

### Change From Name

```typescript
from: 'Your Business Name <noreply@yourdomain.com>',
```

### Change Subject

```typescript
subject: 'Your Custom Subject',
```

## 🐛 Troubleshooting

### Email not sending

**Check 1: API Key**
```bash
# Verify .env.local has the key
cat .env.local | grep RESEND_API_KEY
```

**Check 2: Server Restarted**
```bash
# Restart dev server after adding env var
npm run dev
```

**Check 3: Console Logs**
- Open browser console (F12)
- Check for error messages
- Look for "Email sent successfully" log

### "Email service not configured" message

→ RESEND_API_KEY not set in `.env.local`
→ Restart server after adding key

### Email goes to spam

→ Verify your domain in Resend
→ Add SPF and DKIM records
→ Use verified domain in "from" address

### Rate limits

Free tier limits:
- 100 emails/day
- 3,000 emails/month

Upgrade for more: [resend.com/pricing](https://resend.com/pricing)

## 📊 Features

### What Works Now

- ✅ Actual email sending
- ✅ Beautiful HTML template
- ✅ Success modal (not alert)
- ✅ Error handling
- ✅ Fallback if email fails
- ✅ Console logging
- ✅ Reply saved to database

### Email Features

- ✅ Responsive design
- ✅ Professional styling
- ✅ Contact information
- ✅ Reply-to enabled
- ✅ HTML formatting
- ✅ Line breaks preserved

## 🎯 Testing Checklist

- [ ] RESEND_API_KEY added to `.env.local`
- [ ] Server restarted
- [ ] Admin can send reply
- [ ] Success modal appears
- [ ] User receives email
- [ ] Email looks good
- [ ] Reply-to works
- [ ] No console errors

## 💡 Pro Tips

1. **Test with your own email first**
   - Send a test reply to yourself
   - Check spam folder
   - Verify formatting

2. **Verify domain for production**
   - Improves deliverability
   - Reduces spam score
   - Professional appearance

3. **Monitor usage**
   - Check Resend dashboard
   - Track email delivery
   - Watch rate limits

4. **Customize template**
   - Match your brand colors
   - Add logo
   - Update contact info

## 🔐 Security

- ✅ API key in environment variable (not code)
- ✅ Server-side only (not exposed to client)
- ✅ Input validation
- ✅ Error handling
- ✅ Rate limiting (by Resend)

## 📈 Monitoring

Check Resend dashboard for:
- Emails sent
- Delivery rate
- Bounce rate
- Open rate (if tracking enabled)

## 🎉 Success Indicators

When working correctly:
- ✅ Admin sends reply
- ✅ Success modal appears
- ✅ User receives email within seconds
- ✅ Email looks professional
- ✅ No errors in console
- ✅ Reply saved to database

## 🚀 Next Steps

1. Add API key to `.env.local`
2. Restart server
3. Test with your email
4. Verify domain (optional)
5. Customize template (optional)
6. Deploy to production

## 📞 Support

If you need help:
1. Check Resend docs: [resend.com/docs](https://resend.com/docs)
2. Check console for errors
3. Verify API key is correct
4. Ensure server restarted

## ✨ That's It!

Your contact system now sends real emails! Users will receive professional, branded replies directly to their inbox.

---

**Quick Start:**
1. Get API key from resend.com
2. Add to `.env.local`
3. Restart server
4. Test it!
