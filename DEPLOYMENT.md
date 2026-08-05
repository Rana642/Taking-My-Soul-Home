# Deployment & Domain Setup

## Architecture
```
takingmysoulhome.com          → Vercel        (Next.js frontend, public)
www.takingmysoulhome.com      → Vercel        (redirects to apex)
cms.takingmysoulhome.com      → Hostinger     (WordPress backend / GraphQL API, admin-only)
```
- Frontend repo: `github.com/Rana642/Taking-My-Soul-Home` → auto-deploys to Vercel on every push to `main`.
- WordPress is currently at the Hostinger temp URL `olive-echidna-540346.hostingersite.com`.

> **Important:** the site is still on placeholder content and is **noindex** on purpose. Connecting the domain now is fine (it just makes the site reachable at the real URL) — but do **not** flip indexing on until real content is in. See "Go-live" at the bottom.

---

## Part A — Point `takingmysoulhome.com` at Vercel (frontend)

1. **Vercel** → your Project → **Settings → Domains → Add** →
   - add `takingmysoulhome.com`
   - add `www.takingmysoulhome.com`
2. Vercel will show the **exact DNS records** to create. Typically:
   | Type | Name/Host | Value |
   |---|---|---|
   | `A` | `@` (apex) | `76.76.21.21` |
   | `CNAME` | `www` | `cname.vercel-dns.com` |
   > Use whatever Vercel actually displays — those values are authoritative.
3. **Where to add these records:** your domain's DNS manager.
   - If the domain is registered/managed at **Hostinger**: hPanel → **Domains → DNS / Nameservers → DNS Zone (Manage DNS records)**.
   - If it's at another registrar (GoDaddy/Namecheap/etc.): add them in that registrar's DNS panel.
4. Wait for DNS to propagate (minutes–few hours). Vercel then **auto-issues SSL** and shows the domain as "Valid".

---

## Part B — Point `cms.takingmysoulhome.com` at the WordPress (Hostinger)

Goal: serve the existing WordPress (currently `olive-echidna-...hostingersite.com`) at `cms.takingmysoulhome.com`.

1. In **hPanel**, make sure `takingmysoulhome.com` is added to the account, then create the **subdomain** `cms` (Domains → Subdomains), **pointing it to the WordPress site's folder**.
   - If the WordPress site is a separate "website" in hPanel, use **Hostinger's "change website domain" / add-domain** option to attach `cms.takingmysoulhome.com` to that WordPress install.
2. Once `cms.takingmysoulhome.com` resolves to the WordPress, the WP address must be updated from the temp URL to the new one. **Tell Claude tomorrow** and it will do this safely via Novamira (WP-CLI):
   ```
   wp option update home    https://cms.takingmysoulhome.com
   wp option update siteurl https://cms.takingmysoulhome.com
   wp search-replace 'olive-echidna-540346.hostingersite.com' 'cms.takingmysoulhome.com' --all-tables
   ```
   (Do the URL change **after** DNS resolves + SSL is active, not before — otherwise wp-admin can lock you out.)
3. Keep the backend **noindex** (already set: Settings → Reading → "Discourage search engines" is on).

---

## Part C — Vercel environment variables

Vercel → Project → **Settings → Environment Variables** (then Redeploy):

| Variable | Value (now) | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://takingmysoulhome.com` | canonical/OG/sitemap base |
| `WORDPRESS_GRAPHQL_URL` | `https://cms.takingmysoulhome.com/graphql` | ✅ set in Vercel; cms subdomain live |
| `NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL` | `https://cms.takingmysoulhome.com/graphql` | ✅ set (client-side, used by SearchModal) |
| `NEXT_PUBLIC_ALLOW_INDEXING` | *(leave unset / false)* | **only set to `true` at real launch** |

---

## Go-live checklist (LATER — after real content, not now)
- [ ] Real content replaces placeholders (Step 11): real videos, images, audio, stats.
- [ ] Set `NEXT_PUBLIC_ALLOW_INDEXING=true` in Vercel + redeploy (turns off noindex, opens robots.txt).
- [ ] Submit `https://takingmysoulhome.com/sitemap.xml` to Google Search Console + Bing.
- [ ] Add Google Analytics 4.
- [ ] Final QA (mobile, links, PageSpeed).

---

## Quick status
- Domain: **`takingmysoulhome.com` → Vercel** (frontend), **`cms.takingmysoulhome.com` → Hostinger** (WordPress). Both SSL-active. DNS managed at Vercel (nameservers). Hostinger IP for cms A-record: `145.79.24.54`.
- Frontend live: `https://taking-my-soul-home.vercel.app` + `https://takingmysoulhome.com` (noindex, auto-deploy from `main`)
- Backend live: `https://cms.takingmysoulhome.com/graphql` (WordPress, seeded, noindex)
- **Step 9 DONE + verified on production:** the live Vercel site pulls all content (series/episodes/blog/audio/resources) and images from cms via GraphQL, with 5-min ISR. WordPress edits go live automatically.
- **Next:** Step 10 (wire contact form / newsletter / donations) and/or Step 11 (real content replaces placeholders), then Step 12 cleanup, Step 13 launch (flip `NEXT_PUBLIC_ALLOW_INDEXING=true` + Search Console).
