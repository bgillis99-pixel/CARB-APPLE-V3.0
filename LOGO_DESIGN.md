# CARB Logo Design

## Concept

The CARB logo is a play on the classic Apple logo, reimagined for the green carbon tracking initiative:

- **Green Apple**: Granny Smith apple color (#9BC53D) representing the "green" environmental focus
- **C-Shaped Bite**: An exaggerated bite taken from the apple forms the letter "C" for CARB
- **Premium Finish**: Silver-green metallic shine gives it a professional, high-quality appearance
- **Trucker Appeal**: Clean, bold design that looks modern and trustworthy

## Design Files

### SVG Files (Vector - Best Quality)

- `assets/logo-green-apple-c.svg` - Main logo with C-shaped apple
- `assets/logo-full-carb.svg` - Full logo with "arb" text in cursive (like a worm)

### PNG Files (Generated)

- `assets/icon.png` (1024x1024) - Main app icon
- `assets/favicon.png` (48x48) - Website favicon
- `assets/icon-192.png` (192x192) - PWA icon
- `assets/icon-512.png` (512x512) - PWA icon
- `assets/apple-touch-icon.png` (180x180) - iOS home screen

## Brand Colors

- **Primary Green**: #9BC53D (Granny Smith)
- **Dark Green**: #7A9B2E (Shadows/depth)
- **Leaf Green**: #6B8E23
- **Accent Light**: #D4E89E (Highlights)

## Usage

### Web/Share Links

The logo is configured in `app.json` for:
- Open Graph previews
- Social media sharing
- PWA installation
- Favicon display

### Homepage Design

The homepage (`app/index.tsx`) features:
- Dark background (#1a1a1a) for contrast
- Prominent logo with green glow effect
- "C" emphasized in brand green
- "ARB" in light weight font
- "TRUCKER APPROVED" badge
- Sleek, professional aesthetic

## Regenerating Icons

To regenerate PNG icons from the SVG source:

```bash
node scripts/generate-icons.js
```

## Professional Polish

The current design provides a solid technical foundation. For production:

1. **Consider hiring a designer** to refine:
   - Logo curves and proportions
   - Shine/reflection effects
   - Typography for "arb" worm text
   - Color palette refinement

2. **Create variations**:
   - Dark mode version
   - Monochrome version
   - Different sizes optimized for clarity

3. **Brand guidelines**:
   - Minimum sizes
   - Clear space requirements
   - Do's and don'ts

## Next Steps

- [ ] Get designer feedback on logo concept
- [ ] Create marketing materials with logo
- [ ] Test logo visibility at different sizes
- [ ] Create social media assets
- [ ] Design app store screenshots
