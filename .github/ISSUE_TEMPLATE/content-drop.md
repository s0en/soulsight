---
name: "Content Drop"
about: Add a new SoulSight story drop
title: "[Drop] <drop title>"
labels: ["codex:change", "content"]
---

## Drop details
- **Title**:
- **Slug**: (lowercase-with-dashes)
- **Date**: YYYY-MM-DD
- **Cover image**: /assets/images/<file>.png
- **Excerpt**: Short teaser text

## Acceptance criteria
- Added entry in `soulsight_site/data/drops.json`
- Drop renders in `/gallery.html` and `/drops/<slug>`
- Feeds (`rss.xml`, `sitemap.xml`) updated
- Netlify Deploy Preview loads correctly
