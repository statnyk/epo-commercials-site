# EPO Commercials - Launch TODO

## Morning Tasks (2026-03-19)

### Contact Form Setup (finish what we started)
1. [ ] Run SQL migration in Supabase dashboard (`vjguqdqafsmhfkqdwmua`) — create `contact_messages` table + RLS policies
   ```sql
   create table contact_messages (
     id uuid default gen_random_uuid() primary key,
     name text not null,
     email text not null,
     phone text,
     message text not null,
     read boolean default false,
     created_at timestamptz default now()
   );
   alter table contact_messages enable row level security;
   create policy "Anyone can submit a message" on contact_messages for insert to anon with check (true);
   create policy "Authenticated users can read messages" on contact_messages for select to authenticated using (true);
   create policy "Authenticated users can update messages" on contact_messages for update to authenticated using (true);
   create policy "Authenticated users can delete messages" on contact_messages for delete to authenticated using (true);
   ```
2. [ ] Deploy edge function:
   ```bash
   cd ~/Documents/Personal/epo-commercials-site/auto-garage-site
   npx supabase login
   npx supabase functions deploy send-contact-email --project-ref vjguqdqafsmhfkqdwmua --no-verify-jwt
   ```
3. [ ] Set Supabase secrets:
   ```bash
   npx supabase secrets set RESEND_API_KEY=your_key NOTIFY_EMAIL=aurel.statnyk@gmail.com --project-ref vjguqdqafsmhfkqdwmua
   ```
4. [ ] Test contact form — submit a message, check email arrives, check admin panel Messages tab

### Cleanup wrong project
5. [ ] Remove `contact_messages` table + edge function from `ewigdchaasqtgtauceva` (wrong project)

---

## Completed

- [x] Favicon (epo_3.svg)
- [x] Privacy Policy page + footer link
- [x] Cookie Consent banner
- [x] Compress epo-jacket.png (1.2MB → 155KB)
- [x] .env not tracked in Git
- [x] robots.txt + sitemap.xml
- [x] og:image + twitter:card meta tags
- [x] Schema.org LocalBusiness JSON-LD
- [x] loading="lazy" on below-fold images
- [x] aria-label on mobile menu button
- [x] React Error Boundary
- [x] Removed unused src/assets/parts/
- [x] Contact form page (/contact) — code done
- [x] Admin panel Messages tab — code done
- [x] Edge function for email notifications — code done
- [x] "Send us a Message" CTA on home page Contact section

## Still Remaining

### Blocking
- [ ] Verify Supabase RLS policies on `parts` table

### Hosting & Domain
- [ ] Set up Vercel under client's account
- [ ] Configure DNS at Blacknight → Vercel
- [ ] Set env vars in Vercel dashboard
- [ ] Google Search Console + Analytics under client's Gmail
- [ ] Test production build on mobile

### Nice to Have
- [ ] Google Analytics 4
- [ ] PWA manifest
- [ ] Error tracking (Sentry)
- [ ] Convert team photos to WebP
- [ ] Skip-to-main-content link

### Client Handover
- [ ] Document admin panel usage (parts + messages)
- [ ] Share Vercel + Supabase dashboard access
- [ ] Provide DNS instructions for Blacknight
