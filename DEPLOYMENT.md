# 🚀 CarbClean Deployment Guide

## Quick Deploy to Vercel

### Option 1: Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally (if not already installed)
npm install -g vercel

# Deploy to production
npm run deploy

# OR manually
vercel --prod
```

### Option 2: Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Import this Git repository
3. Vercel will auto-detect the configuration from `vercel.json`
4. Click "Deploy"

## Build Commands

```bash
# Build web version locally
npm run build:web

# Start development server
npm start

# Start web-only development
npm run web
```

## Environment Setup

The app is configured to work on:
- ✅ **Web** (Primary deployment target - carbcleantruckcheck.app)
- ✅ **iOS** (via Expo Go or TestFlight)
- ✅ **Android** (via Expo Go or APK)

## Deployment Configuration

All deployment settings are in `vercel.json`:
- Build command: `npx expo export -p web`
- Output directory: `dist`
- Framework: Auto-detected Expo

## Post-Deployment Checklist

After deploying, verify:

1. ✅ App loads at carbcleantruckcheck.app
2. ✅ Green apple logo displays correctly
3. ✅ **VIN OCR Upload works** (click "Upload VIN Image" button)
4. ✅ Manual VIN entry works
5. ✅ Dashboard navigation works
6. ✅ All 6 dashboard features accessible
7. ✅ Dark mode theme applied
8. ✅ Mobile responsive

## Troubleshooting

### Issue: VIN OCR not working
**Solution:** Make sure:
- Tesseract.js is installed (`npm install`)
- Image file is clear and well-lit
- VIN is visible in the photo

### Issue: Build fails
**Solution:**
```bash
# Clear cache and rebuild
rm -rf node_modules dist .expo
npm install
npm run build:web
```

### Issue: Assets not loading
**Solution:** Check `vercel.json` headers configuration. Assets should cache for 1 year.

## Custom Domain Setup

To use `carbcleantruckcheck.app`:

1. In Vercel dashboard, go to Project Settings
2. Navigate to "Domains"
3. Add `carbcleantruckcheck.app`
4. Configure DNS:
   - Type: `A`
   - Name: `@`
   - Value: Vercel's IP (provided by Vercel)
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`

## Performance Optimization

The app includes:
- ✅ Asset caching (1 year)
- ✅ SPA routing via rewrites
- ✅ Optimized images (Sharp)
- ✅ Code splitting (Expo)

## Analytics Tracking

Analytics are configured in `utils/analytics.ts` with UTM parameters for:
- Campaign tracking
- Source tracking
- User behavior

---

**Need help?** Check the main [README.md](./README.md) for feature documentation.
