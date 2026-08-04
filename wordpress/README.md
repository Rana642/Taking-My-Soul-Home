# WordPress backend (headless) — setup guide

The Next.js frontend (on Vercel) reads content from a headless WordPress via
**WPGraphQL**. WordPress is **admin-only** — visitors never see it. This folder
holds the setup that makes WordPress speak the same shape as the frontend's
`src/types.ts`.

```
takingmysoulhome.com        → Vercel (public Next.js frontend)
cms.takingmysoulhome.com    → Hostinger WordPress (admin only, GraphQL API)
```

---

## 1. Create the WordPress site on Hostinger

1. hPanel → **Domains → Subdomains** → create `cms` → `cms.takingmysoulhome.com`.
2. hPanel → **Website → Auto Installer → WordPress** → install it **into the `cms` subdomain**.
3. Log in at `cms.takingmysoulhome.com/wp-admin`.

> Tip: keep a **staging** copy for experiments (Novamira / testing), and only
> push verified changes to this one. Turn on Hostinger backups.

## 2. Install the required plugins

wp-admin → **Plugins → Add New**, install + activate:

1. **WPGraphQL**
2. **Advanced Custom Fields** (free is enough)
3. **WPGraphQL for ACF**

## 3. Install this plugin (registers the content model)

Copy `tmsh-headless.php` into WordPress:

- **Easiest:** `wp-content/mu-plugins/tmsh-headless.php` (create the `mu-plugins`
  folder if missing — it auto-activates, can't be turned off by accident), **or**
- `wp-content/plugins/tmsh-headless/tmsh-headless.php` then activate under Plugins.

Upload via hPanel **File Manager** or FTP. This creates:

| Content type | GraphQL name | Key fields (ACF) |
|---|---|---|
| **Series** | `series` / `allSeries` | tagline, isFeatured, `series_tag` taxonomy |
| **Episode** | `episode` / `episodes` | series (relation), duration, youtubeEmbedId, views, transcript, keyTakeaways[], audioDownloadUrl |
| **Resource** | `resource` / `resources` | resourceType, category, fileSize, description, downloadUrl |
| **Audio Track** | `audioTrack` / `audioTracks` | author, audioCategory, duration, audioUrl, description |
| **Blog** | built-in `post` | + readTime, isCornerstone |

Title / excerpt / featured image / date come from WordPress core.

## 4. Verify the GraphQL API

Open **GraphQL IDE** (wp-admin → GraphQL) and run:

```graphql
{
  episodes(first: 3) {
    nodes {
      title
      excerpt
      date
      featuredImage { node { sourceUrl } }
      episodeFields {
        duration
        youtubeEmbedId
        transcript
        series { ... on Series { title } }
      }
    }
  }
}
```

You should get JSON back. The endpoint is:

```
https://cms.takingmysoulhome.com/graphql
```

## 5. Lock it down (before real content)

- **Discourage search engines:** Settings → Reading → check "Discourage search
  engines" (the API subdomain must not be indexed — only the Vercel site is).
- **CORS / access:** WPGraphQL is public read by default (fine for published
  content). Keep drafts private. Don't expose wp-admin publicly beyond your team.
- Strong admin passwords + 2FA; keep WP + plugins updated.

## 6. Connect the frontend (Step 9)

In Vercel → Project → Settings → Environment Variables:

```
WORDPRESS_GRAPHQL_URL = https://cms.takingmysoulhome.com/graphql
```

Then Step 9 swaps the frontend's reads from `src/data/mockData.ts` to live
GraphQL queries (with ISR, so published changes go live automatically).

---

### Notes / open items
- `episodeCount` on Series is **derived** (count linked episodes) — not a stored field.
- Slugs: WordPress gives every post a real `slug` field, replacing the
  title-derived slugs the frontend uses now (`src/lib/content.ts`).
- If you later need author `sameAs` social links, book ISBNs, etc. (the SEO
  TODOs from Step 6), those can live as ACF fields on an "author/about" options page.
