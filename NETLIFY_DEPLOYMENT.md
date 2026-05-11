# Netlify Deployment Guide

## Configuration Overview

Your application is configured for seamless Netlify deployment with proper client-side routing support.

### Key Files

- **netlify.toml** - Deployment configuration with SPA redirect rules
- **vite.config.ts** - Optimized for production builds
- **package.json** - Build scripts configured for Netlify

## Deployment Steps

### Step 1: Connect to Netlify

Option A: Using Netlify CLI
```bash
npm install -g netlify-cli
netlify login
```

Option B: Connect via GitHub
1. Push your code to GitHub
2. Go to https://app.netlify.com
3. Click "New site from Git"
4. Select your repository
5. Build settings will auto-detect (or use below)

### Step 2: Build Configuration

If not auto-detected, use these settings:

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 18 (or higher)

### Step 3: Environment Variables

Add these to Netlify Site Settings → Build & Deploy → Environment:

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

### Step 4: Deploy

```bash
netlify deploy --prod
```

Or simply push to main branch if connected via Git.

## Routes & Accessibility

All routes are accessible on Netlify:

| Route | Type | Public |
|-------|------|--------|
| `/` | Home/Hero | ✅ Yes |
| `/admin/login` | Admin Login | ✅ Yes |
| `/admin` | Admin Dashboard | 🔒 Protected |

### How SPA Routing Works

The `netlify.toml` redirect rule:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

This ensures:
1. All requests go to `index.html` initially
2. React Router loads and handles client-side routing
3. Protected routes (ProtectedRoute component) redirect to login if needed
4. Back button and deep-linking work correctly

## Troubleshooting

### Routes return 404

**Problem**: Typing `/admin/login` directly returns 404
**Solution**: Already configured in `netlify.toml` - redeploy or clear cache

### Environment variables not loading

**Problem**: Firebase or Paystack not working
**Solution**: 
1. Verify variables in Netlify dashboard
2. Redeploy after adding variables
3. Check browser console for errors

### CORS errors with Firebase

**Problem**: Firestore requests blocked
**Solution**:
1. Check Firebase security rules are deployed
2. Verify project ID matches in .env
3. Check Firebase authentication domain settings

## Production Checklist

- [ ] Firebase security rules deployed
- [ ] Environment variables added to Netlify
- [ ] Build command verified (`npm run build`)
- [ ] Publish directory set to `dist`
- [ ] Custom domain configured (optional)
- [ ] HTTPS enabled (automatic)
- [ ] Tested all routes after deployment
- [ ] Admin dashboard accessible
- [ ] Payment processing working

## Rollback

To rollback to a previous deployment:
1. Go to Deploys in Netlify dashboard
2. Find the previous successful deploy
3. Click "Publish deploy"

## Support

- Netlify Docs: https://docs.netlify.com
- Firebase Hosting: https://firebase.google.com/docs/hosting
- React Router: https://reactrouter.com
