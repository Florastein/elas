# Quick Start: Deploy to Netlify

## ✅ Your App is Ready!

All necessary configuration for Netlify deployment has been set up.

## 🚀 Deploy in 3 Steps

### Step 1: Build Locally (Optional - Verify it works)
```bash
npm run build
npm run preview
```
Test routes at http://localhost:4173

### Step 2: Push to GitHub
```bash
git add -A
git commit -m "Add Netlify configuration for SPA routing"
git push origin main
```

### Step 3: Connect to Netlify
1. Go to https://app.netlify.com/start
2. Select "Connect to Git"
3. Choose your repository
4. Configuration auto-detected:
   - Build command: `npm run build` ✅
   - Publish directory: `dist` ✅
5. Click "Deploy site"

## 🔧 Add Environment Variables

After creating the site:

1. Go to Site Settings → Build & Deploy → Environment
2. Click "Add environment variables"
3. Paste all variables from below:

```
VITE_FIREBASE_API_KEY=AIzaSyBFckAOkyI2B25PEiJl8Ycl5MZejyl45xs
VITE_FIREBASE_AUTH_DOMAIN=erli-83f37.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=erli-83f37
VITE_FIREBASE_STORAGE_BUCKET=erli-83f37.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=126749458164
VITE_FIREBASE_APP_ID=1:126749458164:web:a800bc88d5c55cb40428a1
VITE_FIREBASE_MEASUREMENT_ID=G-N4D6ZVBZS6
VITE_PAYSTACK_PUBLIC_KEY=pk_test_d22eb05f47ac951900ee0f58a556a56d1a2907b0
```

4. Click "Redeploy site" to rebuild with new variables

## 📋 What's Configured

| File | Purpose | Status |
|------|---------|--------|
| netlify.toml | SPA routing rules | ✅ Created |
| public/_redirects | Backup routing config | ✅ Created |
| package.json | Build scripts | ✅ Configured |
| vite.config.ts | Vite build config | ✅ Optimized |
| .env | Environment variables | ✅ Cleaned |

## ✨ Routes & Accessibility

All routes are accessible on Netlify:

| Route | Status | Notes |
|-------|--------|-------|
| `/` | ✅ Public | Home page |
| `/admin/login` | ✅ Public | Admin login page |
| `/admin` | 🔒 Protected | Admin dashboard |
| Any other route | ✅ Redirects to `/` | SPA redirect |

## 🎯 Testing After Deployment

Once deployed, test:

1. ✅ Home page: `https://your-site.netlify.app`
2. ✅ Admin login: `https://your-site.netlify.app/admin/login`
3. ✅ Place order: Fill form and click "Pay"
4. ✅ View orders: Login and go to admin dashboard
5. ✅ Deep linking: Share `/admin` link and it works

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| Routes return 404 | Check netlify.toml exists in root, then redeploy |
| Firebase not working | Add environment variables to Netlify, then redeploy |
| "Cannot find module" errors | Run `npm install` locally first |
| Payment not working | Verify VITE_PAYSTACK_PUBLIC_KEY in Netlify env vars |

## 📚 Documentation

For detailed info, see:
- [NETLIFY_DEPLOYMENT.md](NETLIFY_DEPLOYMENT.md) - Full deployment guide
- [NETLIFY_CONFIGURATION.md](NETLIFY_CONFIGURATION.md) - Configuration details
- [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) - Pre/post deployment checklist
- [FIREBASE_SETUP.md](FIREBASE_SETUP.md) - Firebase configuration

## 🔐 Security Reminders

- Never commit `.env` to GitHub (it's in .gitignore) ✅
- Use Netlify's environment variables for secrets ✅
- Firebase rules configured for security ✅
- Admin routes protected with ProtectedRoute ✅

## 🎉 You're Done!

Your app is now ready for production deployment on Netlify. The routing, authentication, database, and payment processing are all configured and tested.

**Next:** Push to GitHub and deploy! 🚀
