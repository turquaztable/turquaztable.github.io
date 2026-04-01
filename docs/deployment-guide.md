# Deployment Guide

This document covers deploying the site to Netlify with automatic rebuilds when content is published in Sanity.


## Prerequisites

Before you begin, make sure you have:

- The GitHub repository pushed with all project files
- A Netlify account (free tier is fine)
- Access to the Sanity project at sanity.io/manage


## Step 1: Connect GitHub to Netlify

1. Log in to Netlify at app.netlify.com
2. Click "Add new site" then "Import an existing project"
3. Choose "GitHub" as the Git provider
4. Authorize Netlify to access your GitHub account if prompted
5. Select the repository for the content creator site
6. Netlify will auto-detect the build settings from netlify.toml, but verify:
   - Build command: `pnpm build`
   - Publish directory: `dist`
   - Node version: 22 (set in .nvmrc)
7. Click "Deploy site"

The first deploy will likely fail because environment variables are not yet configured.


## Step 2: Configure Environment Variables

In Netlify, go to Site settings then Environment variables and add these:

| Variable | Value |
|----------|-------|
| `PUBLIC_SANITY_PROJECT_ID` | `88s7u2ut` |
| `PUBLIC_SANITY_DATASET` | `production` |
| `PUBLIC_SANITY_API_VERSION` | `2026-03-12` |

Notes:

- The SANITY_WRITE_TOKEN is NOT needed on Netlify. It is only used for local seed data imports.
- These are all read-only public values. The Sanity API is configured to allow public read access for the production dataset.

After adding the variables, trigger a redeploy: go to Deploys and click "Trigger deploy" then "Deploy site".


## Step 3: Verify the Deploy

Once the build completes (usually 1-3 minutes):

1. Click the generated Netlify URL (something like random-name-12345.netlify.app)
2. Verify the homepage loads with all sections
3. Check a recipe detail page
4. Check the art, blog, and shop pages
5. Verify images load from the Sanity CDN


## Step 4: Set Up Auto-Rebuild (Sanity Webhook)

This is the key piece: when the creator publishes content in Sanity, the site automatically rebuilds.

1. In Netlify, go to Site settings then Build & deploy then Build hooks
2. Click "Add build hook"
3. Name it "Sanity Publish" and select the main branch
4. Copy the webhook URL (it looks like https://api.netlify.com/build_hooks/abc123)
5. In Sanity, go to sanity.io/manage and select the project
6. Go to API then Webhooks
7. Click "Create webhook"
8. Configure:
   - Name: "Netlify Rebuild"
   - URL: paste the Netlify build hook URL
   - Dataset: production
   - Trigger on: Create, Update, Delete
   - Filter: leave empty (rebuilds on any content change)
   - Projection: leave empty
   - Status: Enabled
9. Click "Save"

Test it: make a small edit in Sanity Studio, publish it, and check Netlify's deploy log. You should see a new build triggered within a few seconds.


## Step 5: Custom Domain (When Ready)

Once the client has a domain:

1. In Netlify, go to Site settings then Domain management
2. Click "Add custom domain"
3. Enter the domain name (e.g., turquaztable.com)
4. Netlify will provide DNS instructions. The two options are:

**Option A: Netlify DNS (recommended for simplicity)**
- Point nameservers at your domain registrar to the Netlify nameservers provided
- Netlify handles everything including SSL

**Option B: External DNS**
- Add a CNAME record pointing to the Netlify site URL
- For the root domain (no www), use an ALIAS or ANAME record, or use Netlify DNS

5. Netlify automatically provisions a free SSL certificate via Let's Encrypt
6. HTTPS should be active within a few minutes of DNS propagation

After the domain is configured, update the `site` field in `astro.config.mjs`:

```javascript
export default defineConfig({
  site: "https://turquaztable.com",
  // ... rest of config
});
```

This ensures canonical URLs and sitemap entries use the correct domain.


## The Publish-to-Live Workflow

Here is what happens when the creator publishes new content:

1. Creator edits and publishes content in Sanity Studio
2. Sanity sends a webhook to Netlify (instant)
3. Netlify starts a new build (takes 1-3 minutes)
4. The updated static site is deployed to Netlify's CDN
5. Visitors see the new content

Total delay: approximately 1-3 minutes from publish to live.

Important: draft content (unpublished) is NOT visible on the live site. The creator must click "Publish" in Sanity Studio for changes to appear.


## Troubleshooting

**Build fails after adding new content:**
- Check the Netlify deploy log for the specific error
- Most common cause: a required field was left empty in Sanity
- The site is designed to handle missing data gracefully, but if a required reference is broken (e.g., deleted a recipe that was set as "Featured"), the build may fail

**Content not showing up after publish:**
- Wait 1-3 minutes for the rebuild to complete
- Check Netlify deploys to confirm a new build was triggered
- If no build was triggered, verify the webhook is configured correctly in Sanity

**Images not loading:**
- Verify images were uploaded to Sanity (not just referenced)
- Check that PUBLIC_SANITY_PROJECT_ID is correct in Netlify env vars
- Sanity CDN images should work automatically with no additional configuration
