# FaultyTerminal Component Placement Guide

## Overview
The FaultyTerminal component has been strategically integrated throughout the Reauction marketplace to create an immersive terminal-inspired aesthetic. This document details where and how the component is placed across the application.

---

## 1. Landing Page Hero Section (`/components/Hero.tsx`)

### Configuration:
```tsx
<FaultyTerminal
  scale={1.2}
  gridMul={[2, 1]}
  digitSize={1.2}
  timeScale={0.4}
  scanlineIntensity={0.2}
  glitchAmount={0.8}
  flickerAmount={0.5}
  noiseAmp={0.3}
  tint="#00d9ff"        // Cyan neon color
  mouseReact={false}    // Static animation
  pageLoadAnimation={true}
  brightness={0.6}
/>
```

### Placement:
- **Full-screen background effect** behind all hero content
- **Z-index layers**: Terminal at z-0, content overlaid at z-10
- **Impact**: Creates dramatic entrance effect with immersive terminal grid animation
- **Visual Effect**: Higher glitch (0.8) and flicker (0.5) for dramatic impact
- **Page Load**: Animation triggers on page load for engaging entrance

---

## 3. Portfolio Page (`/app/portfolio/page.tsx`)

### Configuration:
```tsx
<FaultyTerminal
  scale={1.2}
  gridMul={[2, 1]}
  digitSize={1}
  timeScale={0.5}
  scanlineIntensity={0.12}
  glitchAmount={0.5}
  flickerAmount={0.3}
  noiseAmp={0.25}
  tint="#a78bfa"        // Purple tint for portfolio
  mouseReact={false}    // Static animation
  pageLoadAnimation={false}
  brightness={0.4}
/>
```

### Placement:
- **Fixed background** in user portfolio section
- **Purple tint** (#a78bfa) differentiates portfolio from marketplace
- **Mounted state check**: Only renders after component hydration
- **Effect**: Creates atmospheric backdrop for user holdings and activity

---

## 4. Auction Modal (`/components/AuctionModal.tsx`)

### Configuration:
```tsx
<FaultyTerminal
  scale={2}
  gridMul={[3, 2]}
  digitSize={1.5}
  timeScale={0.3}
  scanlineIntensity={0.15}
  glitchAmount={0.6}
  flickerAmount={0.3}
  noiseAmp={0.2}
  tint="#00d9ff"        // Cyan for auction actions
  mouseReact={false}    // Static animation
  pageLoadAnimation={false}
  brightness={0.4}
/>
```

### Placement:
- **Modal backdrop effect** behind auction interface
- **Opacity: 0.2** for subtle background presence
- **Z-index: 0** under modal content (z-10)
- **Grid multiplication**: Larger grid (3x2) for closer, more visible effect
- **Purpose**: Reinforces terminal aesthetic during critical auction interactions

---

## 5. Purchase Modal (`/components/PurchaseModal.tsx`)

### Configuration:
```tsx
<FaultyTerminal
  scale={2}
  gridMul={[3, 2]}
  digitSize={1.5}
  timeScale={0.3}
  scanlineIntensity={0.15}
  glitchAmount={0.6}
  flickerAmount={0.3}
  noiseAmp={0.2}
  tint="#00ff88"        // Green for successful purchases
  mouseReact={false}    // Static animation
  pageLoadAnimation={false}
  brightness={0.4}
/>
```

### Placement:
- **Modal backdrop effect** during purchase confirmation
- **Opacity: 0.2** for subtle background
- **Z-index: 0** under modal content
- **Green tint** (#00ff88) symbolizes successful transactions
- **Purpose**: Creates confident, secure atmosphere during payment flow

---

## 6. Create Listing Modal (`/components/CreateListingModal.tsx`)

### Configuration:
```tsx
<FaultyTerminal
  scale={2}
  gridMul={[3, 2]}
  digitSize={1.5}
  timeScale={0.3}
  scanlineIntensity={0.15}
  glitchAmount={0.6}
  flickerAmount={0.3}
  noiseAmp={0.2}
  tint="#00d9ff"        // Cyan for creation actions
  mouseReact={false}    // Static animation
  pageLoadAnimation={false}
  brightness={0.3}
/>
```

### Placement:
- **Modal backdrop effect** for NFT listing creation
- **Opacity: 0.15** (most subtle) to minimize distraction during form input
- **Z-index: 0** under modal content
- **Brightness: 0.3** for minimal visibility
- **Purpose**: Aesthetic consistency while maintaining form usability

---

## Configuration Parameter Guide

| Parameter | Hero | Marketplace | Portfolio | Modals |
|-----------|------|-------------|-----------|--------|
| **scale** | 1.2 | 1.5 | 1.2 | 2 |
| **gridMul** | [2,1] | [2,1] | [2,1] | [3,2] |
| **digitSize** | 1.2 | 1 | 1 | 1.5 |
| **timeScale** | 0.4 | 0.5 | 0.5 | 0.3 |
| **scanlineIntensity** | 0.2 | 0.1 | 0.12 | 0.15 |
| **glitchAmount** | 0.8 | 0.4 | 0.5 | 0.6 |
| **flickerAmount** | 0.5 | 0.2 | 0.3 | 0.3 |
| **brightness** | 0.6 | 0.3 | 0.4 | 0.4 |
| **opacity** | 100% | 100% | 100% | 20% |

---

## Animation Strategy

All FaultyTerminal instances use **static animation** (no mouse reactivity) for consistency:
- **pageLoadAnimation**: Only enabled on Hero for dramatic entrance
- **mouseReact**: Disabled across all instances for performance and consistency
- **timeScale**: Varied to create different animation speeds:
  - **Slower (0.3-0.4)**: Hero and modals for dramatic effect
  - **Faster (0.5)**: Marketplace and portfolio for subtle movement

---

## Z-Index Layering

### Hero Section:
```
z-10: Content (text, buttons)
z-0:  FaultyTerminal background
```

### Marketplace Page:
```
z-10: Header, search, listings, filters
z-0:  FaultyTerminal (fixed, covers full viewport)
pointer-events-none: Prevents interaction issues
```

### Modals:
```
z-50: Modal container (fixed)
z-10: Modal content (relative)
z-0:  FaultyTerminal backdrop (relative)
z-0:  Semi-transparent backdrop overlay
```

---

## Performance Considerations

1. **Mounted State Checks**: Hero and Portfolio only render FaultyTerminal after client hydration
2. **Fixed Positioning**: Marketplace uses fixed positioning to prevent layout recalculations
3. **pointer-events-none**: Marketplace FaultyTerminal doesn't capture click/touch events
4. **Limited Instances**: Maximum 6 FaultyTerminal instances per session
5. **Opacity Reduction**: Modal instances use 0.15-0.2 opacity to reduce GPU load

---

## Tint Color Strategy

- **#00d9ff (Cyan)**: Primary action pages (Hero, Marketplace, Auctions, Create Listings)
  - Represents "system active" / primary engagement
- **#00ff88 (Green)**: Success actions (Purchase Modal)
  - Represents "success" / confirmed transactions
- **#a78bfa (Purple)**: User profile/portfolio
  - Represents "personal space" / user data

---

## Responsive Design

FaultyTerminal components automatically scale based on viewport:
- **Mobile (424px)**: Canvas rendered at natural resolution
- **Tablet (640px+)**: Scale increases for visibility
- **Desktop (1024px+)**: Full scale with optimal grid multiplication

No CSS breakpoints needed—OGL canvas handles responsive scaling internally.

---

## Browser Compatibility

FaultyTerminal requires WebGL support:
- **Desktop**: All modern browsers (Chrome, Firefox, Safari, Edge)
- **Mobile**: iOS Safari 11+, Android Chrome 25+
- **Fallback**: None implemented (graceful degradation via `mounted` state)

---

## Future Enhancements

Potential optimizations without affecting current design:
1. **WebGL context sharing**: Reduce memory footprint with multiple instances
2. **Intersection Observer**: Lazy-load canvas only when visible
3. **Service Worker caching**: Pre-cache WebGL shader compilation
4. **Animation synchronization**: Sync all instances to reduce computational load

