# Veridian Estates — Premium Luxury Real Estate Website Template

Veridian Estates is a modern, responsive, and performance-optimized luxury real estate website template. Designed for professional brokers, property developers, and real estate agencies looking for a high-end web presence.

---

## Package Directory Structure

```
Real Estate Website/
├── Template/                  # Ready-to-deploy website files
│   ├── css/                   # Styled components & layouts
│   │   ├── base.css
│   │   ├── components.css
│   │   ├── main.css
│   │   └── variables.css      # Easy color and font customization
│   ├── js/                    # Interactive functionality
│   │   ├── app.js             # Logic for filter, modal, sliders
│   │   └── data.js            # Properties and agent data arrays
│   ├── assets/                # Local optimized assets
│   │   ├── images/            # Local high-quality property & agent WebP photos
│   │   └── favicons/          # Icons, apple touch icons, site manifest
│   ├── index.html             # Main entry point (fully semantic & SEO optimized)
│   ├── robots.txt             # Search crawler instructions
│   └── sitemap.xml            # SEO sitemap template
├── Documentation/             # Detailed offline documentation
│   ├── index.html             # Styled documentation site
│   ├── css/
│   │   └── doc-style.css
│   └── images/
├── README.md                  # Quickstart guide
├── LICENSE.txt                # License terms
├── CHANGELOG.md               # Version history
├── SUPPORT.md                 # Support instructions
└── CREDITS.md                 # Asset attributions
```

---

## Quick Start Installation

1. Copy the contents of the `Template` directory to your web server (e.g. via FTP, or configure on AWS, Vercel, Netlify, Github Pages, etc.).
2. Customize the website branding, properties list, and agent bios:
   * **Styles**: Edit color tokens in `Template/css/variables.css` to instantly change the theme's colors.
   * **Branding & Meta**: Open `Template/index.html` and update the `<title>`, description metadata, logo SVG/text, and phone/address info.
   * **Data**: Edit `Template/js/data.js` to add your own real estate listings and staff profiles.
3. Verify that your server supports static HTML/CSS/JS.

---

## Features

- **Pixel Perfect Responsive Layout**: Mobile, tablet, and desktop visual excellence (tested from 320px to 1920px).
- **Interactive Property Filter**: Real-time property searching, category filtering, and bedroom/budget selectors with debounce.
- **Testimonial Slider**: Fully custom touch/mouse interactive slide transitions with keyboard arrow access.
- **Inquiry Modal Dialog**: Accessible, keyboard-trapped modal forms with real-time field validation.
- **Premium Aesthetics**: curating neutral colors, custom Playfair Display serif headings, micro-interactions, and animations.
- **Accessibility (WCAG AA Compliant)**: Proper skip links, visible keyboard outlines, ARIA attributes, and label descriptors.
- **SEO & Performance Optimized**: Local compressed WebPs, structured JSON-LD schemas, OG/Twitter metadata, and Lighthouse 95+ targeted performance.

---

## Customization

For full setup guidelines, customization instructions, and troubleshooting tips, please check out the styled offline documentation site inside the `Documentation` folder: `Documentation/index.html`.
