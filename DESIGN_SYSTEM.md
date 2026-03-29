# CSA Print & Design - Design System

## 🎨 Color Palette

### Base Colors (Monochromatic)
```
Background: #000000 (Black)
Foreground: #FFFFFF (White)
Gray Tones: #171717, #0a0a0a, #ededed
```

### CMYK Brand Colors

#### Cyan - Primary Interactive
```
Hex: #00b8d4
RGB: rgb(0, 184, 212)
Usage: Primary links, active navigation states, secondary CTAs
CSS Variable: var(--color-cyan)
Tailwind: text-[var(--color-cyan)]
```

#### Magenta - Call to Action
```
Hex: #e91e63
RGB: rgb(233, 30, 99)
Usage: Primary CTA buttons, contact highlights, important actions
CSS Variable: var(--color-magenta)
Tailwind: bg-[var(--color-magenta)]
```

#### Yellow - Accent & Success
```
Hex: #ffd600
RGB: rgb(255, 214, 0)
Usage: Success messages, badges, "New Service" tags, highlights
CSS Variable: var(--color-yellow)
Tailwind: border-[var(--color-yellow)]
```

## 📐 Typography

### Font Families
- **Sans Serif**: Geist Sans (Primary)
- **Monospace**: Geist Mono (Code/Technical)

### Font Sizes (Tailwind Classes)
```
Hero Headline: text-5xl sm:text-6xl md:text-7xl lg:text-8xl
Page Title: text-4xl
Subtitle: text-xl sm:text-2xl
Body: text-base
Small: text-sm
```

## 🎭 Component Patterns

### Buttons

#### Primary CTA (Magenta)
```tsx
<button className="px-8 py-4 bg-[var(--color-magenta)] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-[var(--color-magenta)]/50 transition-all min-h-[44px]">
  Button Text
</button>
```

#### Secondary CTA (Cyan)
```tsx
<button className="px-8 py-4 border-2 border-[var(--color-cyan)] text-[var(--color-cyan)] rounded-lg font-semibold hover:bg-[var(--color-cyan)] hover:text-black transition-all min-h-[44px]">
  Button Text
</button>
```

### Links
```tsx
<a className="text-gray-300 hover:text-[var(--color-cyan)] transition-colors">
  Link Text
</a>
```

### Cards
```tsx
<div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-[var(--color-cyan)] transition-colors">
  Card Content
</div>
```

## 📱 Responsive Breakpoints

```
sm: 640px   - Small devices (landscape phones)
md: 768px   - Medium devices (tablets)
lg: 1024px  - Large devices (desktops)
xl: 1280px  - Extra large devices
2xl: 1536px - 2X Extra large devices
```

## ✨ Animation Guidelines

### Page Transitions
```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -20 }}
transition={{ duration: 0.3 }}
```

### Hover Effects
```tsx
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```

### Gradient Animation
```tsx
animate={{
  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
}}
transition={{ duration: 5, repeat: Infinity }}
```

## 🎯 Touch Targets

All interactive elements must meet minimum touch target size:
- **Minimum**: 44px × 44px
- **Recommended**: 48px × 48px

```tsx
className="min-h-[44px] min-w-[44px]"
```

## 🌈 Gradient Patterns

### CMYK Gradient (Logo/Headlines)
```tsx
className="bg-gradient-to-r from-[var(--color-cyan)] via-[var(--color-magenta)] to-[var(--color-yellow)] bg-clip-text text-transparent"
```

### Background Gradient (Subtle)
```tsx
className="bg-gradient-to-br from-gray-900 to-black"
```

## 🔲 Spacing Scale

```
xs: 0.25rem (4px)
sm: 0.5rem (8px)
md: 1rem (16px)
lg: 1.5rem (24px)
xl: 2rem (32px)
2xl: 3rem (48px)
```

## 🎨 Shadow Effects

### Button Hover Shadow
```tsx
className="hover:shadow-lg hover:shadow-[var(--color-magenta)]/50"
```

### Card Shadow
```tsx
className="shadow-xl shadow-black/50"
```

## 🌐 Glassmorphism

### Navigation Bar
```tsx
className="bg-black/80 backdrop-blur-md"
```

### Mobile Menu
```tsx
className="bg-black/95 backdrop-blur-lg"
```

## ♿ Accessibility

- All interactive elements have proper ARIA labels
- Color contrast meets WCAG AA standards
- Focus states visible on all interactive elements
- Keyboard navigation supported
- Touch targets meet minimum size requirements

## 📋 Usage Examples

### Section Container
```tsx
<section className="min-h-screen bg-black text-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    {/* Content */}
  </div>
</section>
```

### Grid Layout (Products/Samples)
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {/* Items */}
</div>
```

### Image with CMYK Border
```tsx
<img 
  className="rounded-lg border-4 border-[var(--color-cyan)]" 
  alt="Description"
/>
```

## 🎬 Motion Principles

1. **Purposeful**: Every animation serves a purpose
2. **Smooth**: Use easing functions (easeInOut, spring)
3. **Fast**: Keep durations between 200-500ms
4. **Subtle**: Don't distract from content
5. **Responsive**: Respect prefers-reduced-motion

## 🔧 Implementation Notes

- Use Framer Motion for all animations
- Leverage Tailwind's utility classes
- Keep components modular and reusable
- Test on mobile devices regularly
- Maintain consistent spacing throughout

---

This design system ensures consistency across the entire CSA Print & Design website.
