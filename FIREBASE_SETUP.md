# Firebase Setup Guide

## Problem
The application cannot save or retrieve orders because Firestore security rules are not configured. Both user-facing order creation and admin dashboard order viewing are blocked by permission errors.

## Solution

### Step 1: Install Firebase CLI
```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase
```bash
firebase login
```

### Step 3: Deploy Firestore Rules
Navigate to your project directory and run:
```bash
firebase deploy --only firestore:rules
```

### Step 4: Verify Rules Were Deployed
Check the Firebase Console:
1. Go to https://console.firebase.google.com
2. Select project: `erli-83f37`
3. Navigate to Firestore Database → Rules tab
4. Confirm the new rules are in effect

## Rules Explanation

The `firestore.rules` file contains:

- **Create**: Anyone can create new orders (unauthenticated users placing orders)
- **Read**: Only authenticated users can read orders (admin dashboard access)
- **Update**: Only authenticated users can update order status (admin changing order status)

## Testing Flow After Deployment

1. **User Places Order**:
   - Visit home page (/)
   - Fill in phone number and select data plan
   - Click "Pay" and complete payment
   - Order is saved to Firestore

2. **Admin Views Orders**:
   - Visit /admin/login
   - Register new admin account or login
   - View all orders on /admin dashboard
   - Update order status as needed

## Verification Checklist

- [ ] Firebase CLI installed
- [ ] Logged into Firebase
- [ ] `firestore.rules` deployed
- [ ] User can place orders without error
- [ ] Admin can view orders on dashboard
- [ ] Admin can update order status
