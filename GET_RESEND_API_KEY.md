# How to Get Resend API Key (5 Minutes)

## 🚨 IMPORTANT: Email is NOT Working Yet!

Your `.env.local` file is missing the `RESEND_API_KEY`. That's why users aren't receiving emails.

The system is saving replies to the database, but NOT sending actual emails.

## ✅ Fix It Now (5 Minutes)

### Step 1: Sign Up for Resend (2 minutes)

1. Go to: **https://resend.com**
2. Click "Sign Up" (top right)
3. Enter your email address
4. Check your email for verification link
5. Click the verification link
6. Complete your profile

### Step 2: Get Your API Key (1 minute)

1. After signing in, you'll see the dashboard
2. Click "API Keys" in the left sidebar
3. Click "Create API Key" button
4. Give it a name like "CSA Marketing Website"
5. Click "Create"
6. **COPY THE KEY** (it starts with `re_`)
   - ⚠️ You can only see it once!
   - It looks like: `re_123abc456def789ghi`

### Step 3: Add to .env.local (1 minute)

1. Open `csa-marketing-website/.env.local`
2. Find this line:
   ```env
   RESEND_API_KEY=your_resend_api_key_here
   ```
3. Replace `your_resend_api_key_here` with your actual key:
   ```env
   RESEND_API_KEY=re_123abc456def789ghi
   ```
4. Save the file

### Step 4: Restart Server (1 minute)

**IMPORTANT:** You MUST restart the server!

```bash
# Stop the server (press Ctrl+C in terminal)
# Then start it again:
npm run dev
```

### Step 5: Test It!

1. Go to http://localhost:3000/admin/contacts
2. Click on a contact
3. Type a test reply
4. Click "Send Reply"
5. You should see: "✅ Reply sent successfully! The user received your email..."
6. Check the user's email inbox - they should have the email!

## 🎯 How to Know It's Working

### Before (Email NOT Configured):
```
⚠️ Reply saved to database, but email was NOT sent. 
Please configure RESEND_API_KEY in .env.local to enable email sending.
```

### After (Email Working):
```
✅ Reply sent successfully! The user received your email at user@email.com
```

## 📧 What the User Will Receive

Once configured, users will receive:
- **From:** CSA Prints <onboarding@resend.dev>
- **Subject:** Re: Your Contact Form Submission
- **Content:** Beautiful HTML email with your reply

## 🐛 Troubleshooting

### "I signed up but don't see API Keys"
→ Check left sidebar, click "API Keys"

### "I can't find my API key"
→ Create a new one, you can have multiple

### "Email still not sending after adding key"
→ Did you restart the server? You MUST restart!

### "User still not receiving email"
→ Check spam folder
→ Verify email address is correct
→ Check Resend dashboard for delivery status

## 💰 Pricing

**Free Tier:**
- 100 emails per day
- 3,000 emails per month
- Perfect for testing and small sites

**Paid Plans:**
- Start at $20/month for 50,000 emails
- See: https://resend.com/pricing

## 🔐 Security

- Keep your API key secret
- Never commit it to Git
- `.env.local` is already in `.gitignore`
- Only use it on the server (never client-side)

## ✅ Quick Checklist

- [ ] Signed up at resend.com
- [ ] Verified email
- [ ] Created API key
- [ ] Copied the key (starts with `re_`)
- [ ] Added to `.env.local`
- [ ] Saved the file
- [ ] Restarted server
- [ ] Tested sending reply
- [ ] User received email

## 🎉 That's It!

Once you add the API key and restart the server, emails will be sent immediately!

---

**Current Status:** ⚠️ Email NOT configured
**After Setup:** ✅ Email working!

**Get your key now:** https://resend.com
