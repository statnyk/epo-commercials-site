# EPO Commercials - Launch TODO

## 🔴 BLOCKING (Must fix before launch)

- [ ] **Remove .env from Git** — never commit Supabase keys; use Vercel/hosting environment variables instead
- [ ] **Privacy Policy page** — GDPR requirement for any EU business, add route + footer link
- [ ] **Terms of Service page** — legal protection for the business
- [ ] **Cookie Consent banner** — EU cookie law compliance
- [ ] **Compress epo-jacket.png** — currently 1.2MB, should be <200KB (convert to WebP)
- [ ] **Verify Supabase RLS policies** — ensure parts table has Row Level Security: public read, authenticated-only write/delete

## 🟡 IMPORTANT (Fix before or shortly after launch)

### SEO
- [ ] Add `robots.txt` to public/
- [ ] Add `sitemap.xml` (or generate dynamically)
- [ ] Add `og:image` meta tag (social sharing preview image)
- [ ] Add `twitter:card` meta tags
- [ ] Add schema.org `LocalBusiness` JSON-LD structured data
- [ ] Add canonical URL tag

### Performance
- [ ] Add `loading="lazy"` to below-fold images
- [ ] Convert JPG team photos to WebP with fallback
- [ ] Add `srcset` for responsive image sizes
- [ ] Remove unused images in `src/assets/parts/`

### Accessibility
- [ ] Add `aria-label` to mobile menu toggle button
- [ ] Add skip-to-main-content link
- [ ] Add `aria-current="page"` for active nav links

### Error Handling
- [ ] Add React Error Boundary component
- [ ] Add timeout handling for Supabase API calls

## 🟢 NICE TO HAVE (Post-launch improvements)

- [ ] Add Google Analytics 4 (GA4) tracking
- [ ] Add error tracking (Sentry)
- [ ] Add PWA manifest.json for "Add to Home Screen"
- [ ] Add contact form (instead of just mailto: links)
- [ ] Add conversion tracking for phone call/email clicks
- [ ] Rate limiting on admin operations
- [ ] Implement image CDN for auto-optimization

## 🌐 HOSTING & DOMAIN SETUP

### Client Accounts Needed
- [ ] **Blacknight** — client's domain registrar account (for DNS settings)
- [ ] **Gmail/Google** — client's Google account (for Google Search Console, Analytics)
- [ ] **Vercel** — create account under client's email OR transfer project after deploy
- [ ] **Supabase** — ensure project is under client's account/email

### Domain Configuration
- [ ] Point domain DNS (Blacknight) to Vercel nameservers or add CNAME
- [ ] Configure `www.epocommercials.ie` → Vercel
- [ ] Enable SSL/HTTPS (automatic on Vercel)
- [ ] Set up `epocommercials.ie` redirect to `www` (or vice versa)
- [ ] Update `og:url` in index.html to final production URL

### Deployment
- [ ] Set environment variables in Vercel dashboard (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
- [ ] Connect Git repo to Vercel for auto-deploy
- [ ] Test production build locally (`npm run build && npm run preview`)
- [ ] Verify all pages work on production URL
- [ ] Test on mobile (iPhone Safari, Android Chrome)

### Post-Deploy Verification
- [ ] Submit sitemap to Google Search Console
- [ ] Test Open Graph tags with Facebook Sharing Debugger
- [ ] Run Google Lighthouse audit (target 90+ all categories)
- [ ] Run Google PageSpeed Insights
- [ ] Test all phone/email links work on mobile
- [ ] Verify admin login works on production
- [ ] Verify parts CRUD + image upload works on production

## 📋 CLIENT HANDOVER

- [ ] Document admin panel usage (how to add/edit/delete parts)
- [ ] Share Vercel dashboard access with client
- [ ] Share Supabase dashboard access with client
- [ ] Set up Google Search Console under client's Gmail
- [ ] Set up Google Analytics under client's Gmail
- [ ] Provide DNS instructions for Blacknight
