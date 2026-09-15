# UI Update — Colorful Art Studio Hero

## Changes

- Added `frontend/public/studio-hero-bg.jpg` as a colorful painterly hero backdrop with acrylic/oil paint tubes, palette, brushes, canvas texture and studio details.
- Updated `frontend/src/styles.css` to use the new painterly background, translucent paper overlays, colorful accent washes, decorative texture, and improved responsive behavior.
- The hero portrait remains the user's supplied artwork at `frontend/public/artworks/artwork-1.png`; it is displayed in the framed hero card instead of using a generated portrait.
- The hero image now uses `object-fit: contain` so the supplied portrait is not unnecessarily cropped.
- Added `overflow-x: hidden` to prevent horizontal clipping/scrolling on smaller screens.
- Added subtle painterly accents to the gallery, commission and contact sections.

## Run

From the frontend directory:

```bash
npm install
npm run dev -- --host 0.0.0.0
```

The background asset is referenced as:

```css
background: var(--paper) url('/studio-hero-bg.jpg') center/cover no-repeat;
```
