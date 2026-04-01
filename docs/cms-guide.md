# Your Website - Content Management Guide

This guide covers everything you need to know to manage your website through Sanity Studio. No coding is required for any of these tasks.


## Getting Started

### What is Sanity Studio?

Sanity Studio is the editing interface for your website. Think of it as the control panel where you create recipes, upload art, write blog posts, and customize how your site looks. Everything you do in the Studio shows up on your live website after you hit Publish.

### How to Access It

Open Sanity Studio by running the Studio locally or visiting your hosted Studio URL (your developer will provide this). You will see two main sections in the sidebar:

- **Content** - where you create and manage recipes, art posts, blog posts, products, and categories
- **Site Management** - where you control your homepage layout, site colors, and global settings


### How Publishing Works

1. Make your changes in the Studio
2. Click **Publish** in the bottom-right corner
3. Your website automatically rebuilds (this takes 1-3 minutes)
4. Your changes are live

Until you click Publish, your changes are saved as a draft that only you can see in the Studio. The live website does not change until you publish.


## Creating Content


### Creating a New Recipe

1. Go to Content then Recipes
2. Click the "+" button to create a new recipe
3. Fill in the fields:

**Required fields:**
- **Title** - the recipe name (this also generates the URL automatically)
- **Description** - a short summary (150-200 characters works best for search engines)
- **Main Image** - the hero photo for this recipe. Use a 4:3 aspect ratio (landscape). You can set the focal point by clicking "Edit" on the image and using the hotspot tool
- **Ingredients** - add each ingredient with amount, unit, name, and optional notes
- **Instructions** - add each step. You can include an optional photo and tip for each step
- **Published Date** - controls the sort order on the site

**Optional but recommended:**
- **Prep Time** and **Cook Time** - in minutes. These show up in search results
- **Servings** - how many servings the recipe makes
- **Difficulty** - Easy, Medium, or Hard
- **Categories** - link to one or more recipe categories
- **Dietary** - check any that apply (gluten-free, vegan, etc.)
- **Tags** - freeform tags for additional filtering

**For homepage features:**
- **Is Featured** - flag this if you want to be able to select it as the homepage featured recipe
- **Is Popular** - flag this if you want it eligible for the Popular Right Now section

4. Click Publish when done


### Creating an Art Post

1. Go to Content then Art & Painting
2. Click "+" to create a new post
3. Fill in:
   - **Title** - name of the piece or series
   - **Gallery** - upload one or more images. Use 1:1 (square) aspect ratio for best results. The first image is used as the thumbnail
   - **Medium** - e.g., "Oil on canvas", "Watercolor on paper"
   - **Dimensions** - e.g., "24 x 36 inches"
   - **For Sale** - toggle on if this piece is available. When enabled, Price and Purchase URL fields appear
   - **Process Video** - paste a YouTube or TikTok URL if you have a timelapse
4. Click Publish


### Creating a Fashion / Makeup Post

1. Go to Content then Fashion & Makeup
2. Click "+"
3. Fill in:
   - **Post Type** - choose: Fashion, Makeup, Cosplay, Hair, or Style Guide
   - **Gallery** - main photos. Use 3:4 (portrait) aspect ratio
   - **Behind the Scenes** - optional process or before/after shots
   - **Products Used** - add items with name, brand, and affiliate link
   - **Body** - optional long-form writeup using the rich text editor
4. Click Publish


### Creating a Blog Post

1. Go to Content then Blog Posts
2. Click "+"
3. Fill in:
   - **Title** and **Description**
   - **Main Image** - use a 16:10 landscape ratio
   - **Body** - the main content. Use the rich text editor to add formatting, links, and inline images
   - **Video URL** - optional embedded video
4. Click Publish


### Adding an Affiliate Product

1. Go to Content then Affiliate Products
2. Click "+"
3. Fill in:
   - **Title** - product name
   - **Image** - product photo (square works best)
   - **Affiliate URL** - the affiliate link (Amazon, etc.)
   - **Category** - Kitchen Tools, Ingredients, Art Supplies, or Other
   - **Price** - display price or price range
   - **Description** - why you recommend it
   - **Is Favorite** - toggle on for your top picks (these appear in a special section at the top of the shop page)
4. Click Publish


### Managing Categories

Categories organize your content and power the recipe category dropdown in the navigation.

1. Go to Content then Categories
2. To create a new category, click "+"
3. Fill in:
   - **Title** - category name (e.g., "Desserts", "Breads")
   - **Content Type** - which section this category belongs to (Recipe, Art, Fashion & Makeup, Blog)
   - **Image** - for recipe categories, this image appears in the homepage category grid. Use 4:3 landscape
4. Click Publish

For the homepage category grid to show a category, it must have Content Type set to "Recipe" AND have an image uploaded.


## Homepage Curation

Go to Site Management then Homepage Settings. The fields are organized into collapsible sections.


### Setting the Featured Recipe

1. Open the **Featured Content** section
2. Click the Featured Recipe field
3. Search for and select the recipe you want in the hero section
4. Publish

The featured recipe appears as the large hero section near the top of the homepage with the copper "Featured Recipe" badge.


### Choosing Popular Right Now Recipes

1. In the **Featured Content** section, find Popular Recipes
2. Add up to 5 recipe references
3. Drag to reorder them (the order here determines the 01-05 ranking on the site)
4. Publish


### Setting Up The Latest Section

1. Open the **The Latest Section** group
2. Choose a mode:
   - **Auto** - automatically shows your 8 most recent recipes (recommended if you post regularly)
   - **Manual** - lets you hand-pick exactly which recipes appear
3. If you chose Manual, a new field appears where you can pick up to 8 recipes
4. Publish


### Adding Videos to Watch the Latest

1. Open the **Video Section** group
2. **Featured Video** - this is the large video card. Enter the URL, title, platform (YouTube/TikTok/Instagram), and duration
3. **Latest Videos** - add more videos below. The first one in this list appears next to the featured video. Add up to 4-5 videos total
4. Publish


### Updating Beyond the Kitchen

1. Open the **Beyond the Kitchen** section
2. You can customize:
   - **Section Label** - the small uppercase text (default: "Beyond the Kitchen")
   - **Heading** - the main heading text
   - **Subheading** - the paragraph below the heading
   - **Art Portal Card** - select an art post to feature, and optionally upload a custom image
   - **Shop Portal Card** - set the title, description, and button text
3. Publish


### Editing Search Bar Text

1. Open the **Search Bar** section
2. Edit the heading, placeholder text, and button text
3. Publish


### Editing Newsletter Section Text

1. Open the **Newsletter** section
2. Edit the heading, subheading, button text, email placeholder, and the utility bar CTA text
3. Publish


### Changing the Season Label

1. Open the **Season / Branding** section
2. Set the Season Label (e.g., "Summer 2026", "Holiday Baking")
3. Publish


### Showing or Hiding Sections

1. Open the **Section Visibility** section
2. Toggle any section on or off:
   - Utility Bar (the dark green bar at the very top)
   - Newsletter CTA in the utility bar
   - Browse by Category grid
   - Featured Recipe hero
   - Search bar
   - The Latest / Watch the Latest tabs
   - Popular Right Now
   - About block
   - Beyond the Kitchen portal
   - Newsletter signup section
3. Publish

Hiding a section does not delete its content. You can turn it back on anytime and everything will reappear.


## Site Customization

Go to Site Management then Site Settings.


### Changing Your Site Colors

1. Open the **Color Theme** section
2. Enter hex color codes for any colors you want to change. Leave a field empty to keep the default. The fields are:
   - **Page Background** - the main page background (default: #FAFAF7, warm off-white)
   - **Card & Panel Background** - cards, navigation bar, panels (default: #FFFFFF, white)
   - **Primary Accent Color** - buttons, active states, highlights (default: #2BA89E, turquoise)
   - **Primary Dark Color** - headings, navigation background, search bar (default: #1B5E58, deep teal)
   - **Secondary Accent Color** - badges, featured labels, subscribe button (default: #C47A2E, copper)
   - **Main Text Color** - body text and headings (default: #1A1A1A, near-black)
   - **Secondary Text Color** - descriptions and nav links (default: #4A4A4A, dark gray)
   - **Muted Text Color** - captions, timestamps (default: #8A8A8A, light gray)
   - **Warm Background** - about section and hover states (default: #F5F0E8, cream)
   - **Divider Color** - section dividers and card borders (default: #E5E2DC, light gray)
3. Publish

Colors must be in hex format (e.g., #FF5733). You can use any color picker tool online to find hex codes.

Tip: if you want to try a completely different color scheme, you only need to change the Primary Accent, Primary Dark, and Secondary Accent colors. The text and background colors usually work well as-is.


### Showing or Hiding Navigation Links

1. Open the **Navigation** section
2. Toggle which pages appear in the main navigation:
   - Art (default: shown)
   - Fashion (default: hidden)
   - Blog (default: shown)
   - Shop (default: shown)
3. Publish

Note: HOME, RECIPES, and ABOUT always appear in the navigation and cannot be hidden. Hiding a nav link does not delete the page - visitors can still access it directly via the URL.


### Updating the About Section

1. Open the **About Section** group
2. **Homepage About Block** - the small section with your photo and a short intro:
   - Heading (e.g., "Hi, I'm [Your Name]")
   - Body Text (keep this short - 2-3 sentences)
   - Photo (square recommended)
   - Link Text (the text for the "More About Me" link)
3. **About Page - Full Body Text** - the longer text for the full /about page. You can separate paragraphs with blank lines
4. **About Page - Large Photo** - a larger photo for the full About page. If left empty, the homepage photo is used
5. Publish


### Changing the Logo

1. Open the **Site Identity** section
2. Upload a logo image. If you remove the logo, the site name text is displayed instead
3. Publish


### Updating Social Links

Go to Homepage Settings then open the **Social Links** section:
1. Add, remove, or reorder your social profiles
2. Each entry needs a Platform (Instagram, YouTube, TikTok, Pinterest, Facebook, Twitter/X) and Profile URL
3. These links appear in the utility bar and footer
4. Publish


### Editing the Footer Tagline

1. In Site Settings, open the **Footer** section
2. Edit the tagline text that appears under your name in the footer
3. Publish


## Page Settings

Each major page on the site has its own settings panel in Sanity Studio. Go to Page Settings in the sidebar to find them.


### About Page Settings

Controls the "Let's Connect" section at the bottom of the About page.

1. Open Page Settings then About Page
2. Available settings:
   - **Intro Heading** - override the heading at the top of the page. Leave empty to use the default from Site Settings
   - **Section Heading** - the heading for the connect section (default: "Let's Connect")
   - **Section Body Text** - the paragraph below the heading
   - **Show/Hide Buttons** - toggle the "Get in Touch" and "Subscribe" buttons individually
   - **Button Text** - override the label on each button
   - **Button Link** - override where each button links to
3. Publish


### Shop Page Settings

Controls the shop page layout, FTC disclosure, and local orders.

1. Open Page Settings then Shop Page
2. Available settings:

**FTC Disclosure:**
   - Toggle the affiliate disclosure banner on or off
   - Edit the disclosure text

**Top Picks:**
   - Toggle the Top Picks section on or off
   - Change the section heading (default: "Top Picks")

**Category Display:**
   - Drag to reorder how product categories appear on the page
   - Override the display label for any category

**Local Orders:**
   - Enable to show a section for items available for local pickup (separate from affiliate products)
   - Set the heading, description, and availability note
   - Add items with name, description, price, and optional photo
   - Add ordering instructions (how to place an order)

3. Publish


### Contact Page Settings

Controls the heading, intro, and contact topic sections.

1. Open Page Settings then Contact Page
2. Available settings:
   - **Page Heading** - the main heading (default: "Let's Connect")
   - **Page Intro** - the paragraph below the heading
   - **Section Visibility** - show or hide General Inquiries, Press & Collaborations, and Art Commissions individually
   - **Section Text** - edit the heading and description for each section
   - **Custom Sections** - add additional contact topic sections beyond the three built-in ones
3. Publish


### Art Page Settings

Controls the art gallery listing page heading and optional callout.

1. Open Page Settings then Art Page
2. Available settings:
   - **Page Heading** - the heading at the top (default: "Art & Painting")
   - **Intro Text** - optional paragraph below the heading
   - **Show Intro** - toggle the intro text on or off
   - **Callout Section** - an optional highlighted section below the gallery. Use for commissions info, exhibition announcements, or featured messages. Includes heading, body text, and optional image
3. Publish


### Fashion Page Settings

Same pattern as Art Page Settings.

1. Open Page Settings then Fashion Page
2. Available settings:
   - **Page Heading** - the heading at the top (default: "Fashion & Makeup")
   - **Intro Text** - optional paragraph below the heading
   - **Show Intro** - toggle the intro text on or off
   - **Callout Section** - optional highlighted section below the gallery
3. Publish


## Image Guidelines

### Recommended Aspect Ratios

| Content Type | Aspect Ratio | Example Size | Where It Appears |
|--------------|--------------|-------------|------------------|
| Recipes | 4:3 (landscape) | 1200 x 900 | Recipe cards, hero, detail page |
| Art | 1:1 (square) | 1200 x 1200 | Art cards, gallery |
| Fashion | 3:4 (portrait) | 900 x 1200 | Fashion cards, gallery |
| Blog | 16:10 (wide) | 1200 x 750 | Blog cards, detail page |
| Categories | 4:3 (landscape) | 800 x 600 | Homepage category grid |
| Products | 1:1 (square) | 800 x 800 | Shop page cards |
| About (homepage) | 1:1 (square) | 400 x 400 | Small about block |
| Sharing image | ~1200 x 630 | 1200 x 630 | Social media previews |

### Using the Hotspot Tool

When you upload an image, click "Edit" to access the hotspot and crop tools:
- **Hotspot** (the circle) - marks the most important part of the image. The site will always keep this area visible even when cropping for different screen sizes
- **Crop** (the rectangle) - sets the crop boundaries

This is especially useful for portrait photos used as square thumbnails, or landscape photos used in different aspect ratios across the site.

### Alt Text

Always add alt text to your images. This helps with:
- Accessibility (screen readers read this text to visually impaired visitors)
- SEO (search engines use alt text to understand image content)

Good alt text describes what is in the image: "Freshly baked sourdough focaccia topped with rosemary and sea salt" is better than "bread" or "IMG_4521".

### Minimum Resolutions

For sharp images on high-resolution screens, upload images at least twice the display size. The site automatically generates smaller versions for faster loading.

- Recipe images: at least 1200px wide
- Art gallery images: at least 1200px on the shortest side
- Thumbnails and cards: at least 800px wide


## Quick Reference

### Common Tasks

| Task | Where | Steps |
|------|-------|-------|
| Add a new recipe | Content > Recipes > + | Fill in fields, publish |
| Feature a recipe on homepage | Site Management > Homepage Settings > Featured Content | Select recipe, publish |
| Add a video | Site Management > Homepage Settings > Video Section | Enter URL and details, publish |
| Change a color | Site Management > Site Settings > Color Theme | Enter hex code, publish |
| Hide a homepage section | Site Management > Homepage Settings > Section Visibility | Toggle off, publish |
| Hide a nav link | Site Management > Site Settings > Navigation | Toggle off, publish |
| Update about text | Site Management > Site Settings > About Section | Edit text, publish |
| Add affiliate product | Content > Affiliate Products > + | Fill in fields, publish |
| Change season label | Site Management > Homepage Settings > Season / Branding | Edit text, publish |
| Edit about page buttons | Page Settings > About Page > Let's Connect | Toggle or rename buttons, publish |
| Edit shop FTC disclosure | Page Settings > Shop Page > FTC Disclosure | Edit text or toggle off, publish |
| Enable local orders | Page Settings > Shop Page > Local Orders | Toggle on, add items, publish |
| Reorder shop categories | Page Settings > Shop Page > Category Display | Drag to reorder, publish |
| Edit contact sections | Page Settings > Contact Page | Edit text or toggle sections, publish |
| Add art page callout | Page Settings > Art Page > Callout Section | Toggle on, add heading and text, publish |


### Where to Find Settings

| Setting | Location |
|---------|----------|
| Featured recipe | Homepage Settings > Featured Content |
| Popular recipes | Homepage Settings > Featured Content |
| Latest section mode | Homepage Settings > The Latest Section |
| Videos | Homepage Settings > Video Section |
| Section show/hide | Homepage Settings > Section Visibility |
| Social links | Homepage Settings > Social Links |
| Newsletter text | Homepage Settings > Newsletter |
| Search bar text | Homepage Settings > Search Bar |
| Beyond the Kitchen text | Homepage Settings > Beyond the Kitchen |
| Site name and logo | Site Settings > Site Identity |
| Colors | Site Settings > Color Theme |
| Nav link visibility | Site Settings > Navigation |
| About section content | Site Settings > About Section |
| Footer tagline | Site Settings > Footer |
| About page buttons | Page Settings > About Page |
| Shop page disclosure | Page Settings > Shop Page > FTC Disclosure |
| Shop top picks heading | Page Settings > Shop Page > Top Picks |
| Shop category order | Page Settings > Shop Page > Category Display |
| Local orders | Page Settings > Shop Page > Local Orders |
| Contact page sections | Page Settings > Contact Page |
| Art page heading and intro | Page Settings > Art Page |
| Fashion page heading and intro | Page Settings > Fashion Page |


### Troubleshooting

**My changes are not showing up on the website:**
- Did you click Publish? Draft changes are not visible on the live site
- Wait 1-3 minutes after publishing for the site to rebuild
- Try clearing your browser cache or opening the site in a private/incognito window

**A section disappeared from the homepage:**
- Check Homepage Settings > Section Visibility to make sure it is not toggled off

**A navigation link is missing:**
- Check Site Settings > Navigation to make sure it is not toggled off

**Images look blurry or cropped oddly:**
- Check the aspect ratio guidelines above
- Use the hotspot tool to mark the important part of the image
- Upload higher resolution images (at least 1200px wide)

**I accidentally deleted something:**
- Sanity keeps a revision history. Open the document and click the clock icon in the top bar to see past versions and restore them

**The recipe is not showing in "Popular Right Now":**
- Make sure you added it to the Popular Recipes list in Homepage Settings > Featured Content (just flagging Is Popular on the recipe itself is not enough)
