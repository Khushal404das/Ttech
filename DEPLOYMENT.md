# Ttech SOLUTIONS - Deployment Guide

## Pre-Deployment Checklist

### 1. Update Domain References

Replace `https://yourdomain.com` in the following files with your actual domain:

- [ ] `public/robots.txt` (Line 10)
- [ ] `public/sitemap.xml` (All `<loc>` tags)
- [ ] `src/components/SEO.tsx` (Line 17)
- [ ] `src/components/StructuredData.tsx` (Lines 8, 9, 11, 41, 42, 66)

**Quick Find & Replace:**
```bash
# In PowerShell (from project root):
(Get-Content -Path 'public\robots.txt') -replace 'https://yourdomain.com', 'https://YOUR-ACTUAL-DOMAIN.com' | Set-Content -Path 'public\robots.txt'

(Get-Content -Path 'public\sitemap.xml') -replace 'https://yourdomain.com', 'https://YOUR-ACTUAL-DOMAIN.com' | Set-Content -Path 'public\sitemap.xml'

(Get-Content -Path 'src\components\SEO.tsx') -replace 'https://yourdomain.com', 'https://YOUR-ACTUAL-DOMAIN.com' | Set-Content -Path 'src\components\SEO.tsx'

(Get-Content -Path 'src\components\StructuredData.tsx') -replace 'https://yourdomain.com', 'https://YOUR-ACTUAL-DOMAIN.com' | Set-Content -Path 'src\components\StructuredData.tsx'
```

### 2. Environment Variables

Create `.env.production` from `.env.production.example`:

```bash
Copy-Item .env.production.example .env.production
```

Then edit `.env.production` with your actual values.

### 3. Build for Production

```bash
npm run build
```

Verify build succeeds and check output in `/dist` folder.

---

## Deployment Options

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel --prod
   ```

3. **Configure Domain:**
   - Go to Vercel dashboard
   - Add your custom domain
   - Update DNS records as instructed

4. **Environment Variables:**
   - Add in Vercel dashboard under Settings → Environment Variables
   - Add all variables from `.env.production`

### Option 2: Netlify

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy:**
   ```bash
   netlify deploy --prod --dir=dist
   ```

3. **Configure:**
   - Add custom domain in Netlify dashboard
   - Add environment variables in Build & Deploy settings

### Option 3: Firebase Hosting

1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login:**
   ```bash
   firebase login
   ```

3. **Initialize (if not already done):**
   ```bash
   firebase init hosting
   ```
   - Select your Firebase project
   - Set public directory to `dist`
   - Configure as single-page app: Yes
   - Don't overwrite index.html

4. **Deploy:**
   ```bash
   npm run build
   firebase deploy --only hosting
   ```

### Option 4: Manual Upload (Any Static Host)

1. **Build:**
   ```bash
   npm run build
   ```

2. **Upload `/dist` folder contents** to your hosting provider:
   - AWS S3 + CloudFront
   - DigitalOcean Spaces
   - GitHub Pages
   - Any static hosting

3. **Configure:**
   - Enable HTTPS
   - Set up 404 redirect to index.html (for client-side routing)

---

## Post-Deployment Steps

### 1. Verify Deployment

- [ ] Visit your domain
- [ ] Test all pages: `/`, `/services`, `/work`, `/contact`
- [ ] Test 404 page (visit non-existent URL)
- [ ] Verify favicon appears
- [ ] Test mobile responsiveness

### 2. Verify SEO Files

- [ ] Visit `yourdomain.com/robots.txt` - should display correctly
- [ ] Visit `yourdomain.com/sitemap.xml` - should display XML
- [ ] Visit `yourdomain.com/favicon.svg` - should display icon
- [ ] Visit `yourdomain.com/og-image.svg` - should display OG image

### 3. Test Functionality

- [ ] Contact form submission
- [ ] WhatsApp button opens correctly
- [ ] Email button opens correctly
- [ ] All navigation links work
- [ ] All social media links work

### 4. SEO Validation

**Google Search Console:**
1. Go to https://search.google.com/search-console
2. Add your property (domain or URL prefix)
3. Verify ownership
4. Submit sitemap: `https://yourdomain.com/sitemap.xml`

**Bing Webmaster Tools:**
1. Go to https://www.bing.com/webmasters
2. Add your site
3. Verify ownership
4. Submit sitemap

### 5. Social Sharing Test

**Facebook Sharing Debugger:**
- Visit: https://developers.facebook.com/tools/debug/
- Enter your URLs
- Click "Scrape Again" to refresh cache

**Twitter Card Validator:**
- Visit: https://cards-dev.twitter.com/validator
- Enter your URLs
- Verify preview looks correct

### 6. Performance Testing

**Lighthouse Audit:**
1. Open Chrome DevTools (F12)
2. Go to Lighthouse tab
3. Run audit for:
   - Performance
   - Accessibility
   - Best Practices
   - SEO

**Target Scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

**PageSpeed Insights:**
- Visit: https://pagespeed.web.dev/
- Test your domain
- Check both mobile and desktop

---

## Continuous Deployment (Optional)

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci --legacy-peer-deps
        
      - name: Build
        run: npm run build
        env:
          VITE_SITE_URL: ${{ secrets.VITE_SITE_URL }}
          VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
          # Add other env vars
          
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          working-directory: ./
```

---

## Monitoring & Maintenance

### Regular Tasks

**Weekly:**
- Check Google Search Console for errors
- Review site analytics
- Test contact form

**Monthly:**
- Run Lighthouse audit
- Check for broken links
- Review and update content
- Check for dependency updates

**Quarterly:**
- Full SEO audit
- Performance optimization review
- Security update check
- Backup website

### Useful Commands

```bash
# Check for outdated dependencies
npm outdated

# Update dependencies (carefully)
npm update --legacy-peer-deps

# Rebuild after updates
npm run build

# Check bundle size
npm run build -- --mode production --profile
```

---

## Troubleshooting

### Build Fails

**Issue:** `npm run build` fails

**Solutions:**
1. Clear node_modules: `Remove-Item -Recurse -Force node_modules`
2. Reinstall: `npm install --legacy-peer-deps`
3. Try again: `npm run build`

### Routing Issues (404s on refresh)

**Issue:** Page works initially but 404 on refresh

**Solution:** Configure server/hosting for SPA:

**Vercel:** Create `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**Netlify:** Create `_redirects` in `/public`:
```
/*    /index.html   200
```

**Firebase:** Already configured in `firebase.json`

### SEO Not Working

**Issue:** Google not indexing pages

**Checklist:**
- [ ] Sitemap submitted to Search Console
- [ ] robots.txt allows Googlebot
- [ ] No meta noindex tags (except 404)
- [ ] Pages load correctly
- [ ] Wait 1-2 weeks for initial indexing

---

## Support

**Questions?**
- Check documentation: This file
- Review SEO audit report
- Test in browser DevTools
- Check browser console for errors

**Need Help?**
Contact: teatech.solutionz@gmail.com
WhatsApp: +92 348 9763998

---

## Quick Reference

**Important URLs:**
- Production site: https://YOUR-DOMAIN.com
- Robots.txt: https://YOUR-DOMAIN.com/robots.txt
- Sitemap: https://YOUR-DOMAIN.com/sitemap.xml
- OG Image: https://YOUR-DOMAIN.com/og-image.svg

**Key Files:**
- Build output: `/dist`
- Environment: `.env.production`
- SEO config: `src/components/SEO.tsx`
- Structured data: `src/components/StructuredData.tsx`

**Commands:**
- Build: `npm run build`
- Dev server: `npm run dev`
- Type check: `npm run lint`
- Preview build: `npm run preview`

---

**Last Updated:** October 4, 2026  
**Version:** 1.0.0
