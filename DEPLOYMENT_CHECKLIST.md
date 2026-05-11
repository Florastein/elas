# Netlify Deployment Checklist

## Pre-Deployment

- [x] React Router setup with correct routes
- [x] Firebase configuration with environment variables
- [x] Firestore security rules deployed
- [x] Paystack integration configured
- [x] LocalStorage removed (uses only Firebase)
- [x] Admin authentication working locally
- [x] Order placement & display working locally

## Netlify Configuration

- [x] `netlify.toml` created with SPA redirect rules
- [x] `public/_redirects` created as backup
- [x] Build command configured: `npm run build`
- [x] Publish directory: `dist`
- [x] .env file cleaned (removed extra keys)

## Before Pushing to Netlify

1. **Verify build works locally**:
   ```bash
   npm run build
   npm run preview
   ```
   Test all routes work in preview mode.

2. **Test production build**:
   - Home page loads (/)
   - Can place order
   - Admin login works (/admin/login)
   - Admin dashboard loads (/admin)
   - Order status updates work

3. **Check environment variables are correct**:
   ```bash
   cat .env
   ```

## Deploy Process

### Option 1: GitHub Integration (Recommended)

```bash
git add .
git commit -m "Configure Netlify deployment with SPA routing"
git push origin main
```
Then connect repository to Netlify dashboard.

### Option 2: Netlify CLI

```bash
npm run build
netlify deploy --prod
```

### Option 3: Netlify Dashboard

1. Go to https://app.netlify.com
2. Create new site from Git
3. Select your repository
4. Configure build settings
5. Add environment variables
6. Deploy

## Post-Deployment

1. **Check deployment status** in Netlify dashboard
2. **Test all routes**:
   - https://your-site.netlify.app/
   - https://your-site.netlify.app/admin/login
   - https://your-site.netlify.app/admin
   - https://your-site.netlify.app/nonexistent (should load home)

3. **Test functionality**:
   - [ ] Home page loads without 404
   - [ ] Can submit phone number
   - [ ] Payment modal opens
   - [ ] Admin login works
   - [ ] Admin can view orders
   - [ ] Order status updates work

4. **Browser console**:
   - No 404 errors for routes
   - Firebase connection working
   - No CORS errors

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Routes return 404 | Clear cache, redeploy, check netlify.toml |
| Firebase not connecting | Check environment variables in Netlify dashboard |
| Payment not working | Verify Paystack key in .env and Netlify |
| Admin dashboard blank | Check Firestore rules deployed |
| Images not loading | Check public folder is included in build |

## Environment Variables Template

Copy these to Netlify → Site Settings → Build & Deploy → Environment Variables:

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

## Monitoring

After deployment:
- Monitor Netlify Analytics
- Check Function logs if using edge functions
- Monitor Firebase usage
- Monitor Paystack transactions

## Rollback

If issues occur after deployment:
1. Go to Netlify Dashboard → Deploys
2. Find the previous successful deployment
3. Click "Publish deploy" to rollback instantly
