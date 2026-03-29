# CSA Print & Design - Project Structure

## Directory Structure

```
csa-marketing-website/
├── app/
│   ├── about/
│   │   └── page.tsx          # About page
│   ├── contact/
│   │   └── page.tsx          # Contact page
│   ├── products/
│   │   └── page.tsx          # Products catalog page
│   ├── samples/
│   │   └── page.tsx          # Samples gallery page
│   ├── favicon.ico
│   ├── globals.css           # Global styles with CMYK colors
│   ├── layout.tsx            # Root layout with Navigation
│   └── page.tsx              # Home page with Hero
├── components/
│   ├── Hero.tsx              # Animated hero section
│   ├── Navigation.tsx        # Responsive navigation with mobile menu
│   └── PageTransition.tsx    # Page transition wrapper
├── public/                   # Static assets
├── .gitignore
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

## Technical Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## CMYK Brand Colors

Defined in `app/globals.css`:

- **Cyan**: `#00b8d4` - Used for primary links and active navigation
- **Magenta**: `#e91e63` - Used for CTA buttons and contact highlights
- **Yellow**: `#ffd600` - Used for success messages and badges

Access in components via CSS variables:
- `var(--color-cyan)`
- `var(--color-magenta)`
- `var(--color-yellow)`

Or via Tailwind classes:
- `text-[var(--color-cyan)]`
- `bg-[var(--color-magenta)]`
- `border-[var(--color-yellow)]`

## Key Features Implemented

1. **Responsive Navigation**
   - Desktop: Horizontal menu
   - Mobile: Glassmorphic drawer menu
   - Touch-friendly (44px minimum touch targets)

2. **Hero Section**
   - Animated gradient background
   - Text animations with Framer Motion
   - Scroll indicator
   - CTA buttons with hover effects

3. **Page Transitions**
   - Smooth fade and slide animations
   - Handled by PageTransition component

4. **Mobile-First Design**
   - All components optimized for mobile
   - Responsive grid layouts ready for products/samples
   - Touch-optimized interactions

## Next Steps

1. Add product catalog with filtering
2. Implement image gallery for samples
3. Create about/team section with bios
4. Build contact form
5. Add client carousel
6. Integrate social media links
7. Add React Bits components for enhanced visuals
