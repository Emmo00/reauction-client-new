# FaultyTerminal Visual Map - Complete Integration Overview

## Application Structure with FaultyTerminal Placement

```
Reauction NFT Marketplace
│
├── ROOT LAYOUT (app/layout.tsx)
│   └── Dark theme enabled globally
│
└── PAGES & COMPONENTS WITH FAULTY TERMINAL
    │
    ├── 🎯 LANDING PAGE (app/page.tsx)
    │   │
    │   ├── Header Component
    │   │   └── Navigation links, wallet connection
    │   │
    │   ├── ⭐ HERO SECTION (components/Hero.tsx)
    │   │   │
    │   │   ├── 🖥️ FAULTY TERMINAL LAYER (z-0)
    │   │   │   ├── Full-screen background
    │   │   │   ├── Cyan tint (#00d9ff)
    │   │   │   ├── High glitch: 0.8
    │   │   │   ├── High flicker: 0.5
    │   │   │   └── Page load animation: ON
    │   │   │
    │   │   └── Content Overlay (z-10)
    │   │       ├── "reauction" title with neon glow
    │   │       ├── Tagline: "Terminal-Grade NFT Trading on Farcaster"
    │   │       ├── CTA buttons
    │   │       └── Stats grid (2 Modes, ∞ Possibilities, ↵ On-Chain)
    │   │
    │   └── MARKETPLACE SECTION
    │       ├── Search and filters
    │       ├── Tabs (All, Auction, Fixed-Price)
    │       └── Listing grid (6 mock NFTs with cards)
    │
    ├── 📊 MARKETPLACE PAGE (app/marketplace/page.tsx)
    │   │
    │   ├── Header Component
    │   │
    │   ├── 🖥️ FAULTY TERMINAL LAYER (z-0, fixed)
    │   │   ├── Full viewport coverage
    │   │   ├── Cyan tint (#00d9ff)
    │   │   ├── Subtle glitch: 0.4
    │   │   ├── Subtle flicker: 0.2
    │   │   ├── Brightness: 0.3
    │   │   └── pointer-events-none (doesn't block interactions)
    │   │
    │   └── Main Content (z-10, relative)
    │       ├── Page header ("Marketplace")
    │       ├── Search bar with icon
    │       ├── Filter/Sort buttons
    │       ├── Tab navigation (All, Auctions, Fixed-Price)
    │       └── NFT Grid (responsive)
    │           ├── Mobile: 1 column
    │           ├── Tablet: 2 columns
    │           └── Desktop: 3+ columns
    │               └── Each card includes:
    │                   ├── NFT image
    │                   ├── Title & Collection
    │                   ├── Sale type badge
    │                   ├── Price in ETH
    │                   └── [View] button
    │
    ├── 🖼️ NFT DETAIL PAGE (app/nft/[id]/page.tsx)
    │   │
    │   └── Content Layers
    │       ├── Header
    │       ├── NFT image showcase
    │       ├── Auction/Fixed-Price details
    │       ├── Bid history or price info
    │       └── CTA: [Bid Now] or [Buy Now]
    │
    ├── 👤 PORTFOLIO PAGE (app/portfolio/page.tsx)
    │   │
    │   ├── Header Component
    │   │
    │   ├── 🖥️ FAULTY TERMINAL LAYER (z-0, fixed)
    │   │   ├── Full viewport coverage
    │   │   ├── Purple tint (#a78bfa) - differentiates portfolio
    │   │   ├── Moderate glitch: 0.5
    │   │   ├── Moderate flicker: 0.3
    │   │   ├── Brightness: 0.4
    │   │   └── Mounted after hydration for SSR safety
    │   │
    │   └── Main Content (z-10, relative)
    │       │
    │       ├── Portfolio Overview
    │       │   ├── Total value badge
    │       │   ├── Active listings count
    │       │   └── Portfolio stats
    │       │
    │       ├── HOLDINGS TAB
    │       │   ├── User's NFT collection
    │       │   └── Listing cards (3 mock items)
    │       │
    │       ├── LISTINGS TAB
    │       │   ├── Active auctions
    │       │   └── Listing cards (2 mock items)
    │       │
    │       └── ACTIVITY TAB
    │           ├── Transaction history
    │           ├── Purchase/List/Bid actions
    │           └── Timestamps and prices
    │
    └── 🎨 MODALS (Global overlays)
        │
        ├── 🔨 AUCTION MODAL (components/AuctionModal.tsx)
        │   │
        │   ├── 🖥️ FAULTY TERMINAL BACKDROP (z-0)
        │   │   ├── Cyan tint (#00d9ff)
        │   │   ├── Opacity: 20%
        │   │   ├── Glitch: 0.6
        │   │   ├── Grid multiplier: [3, 2] - more visible
        │   │   └── Brightness: 0.4
        │   │
        │   └── Modal Content (z-10)
        │       ├── NFT image preview
        │       ├── Auction details
        │       │   ├── Current bid amount
        │       │   ├── Floor price
        │       │   ├── Time remaining
        │       │   └── Total bids count
        │       ├── Bid input field
        │       └── [Place Bid] button
        │
        ├── 💳 PURCHASE MODAL (components/PurchaseModal.tsx)
        │   │
        │   ├── 🖥️ FAULTY TERMINAL BACKDROP (z-0)
        │   │   ├── Green tint (#00ff88) - success color
        │   │   ├── Opacity: 20%
        │   │   ├── Glitch: 0.6
        │   │   ├── Grid multiplier: [3, 2]
        │   │   └── Brightness: 0.4
        │   │
        │   └── Modal Content (z-10)
        │       ├── Stage 1: Confirm Purchase
        │       │   ├── NFT image & details
        │       │   ├── Price breakdown
        │       │   └── [Confirm] button
        │       ├── Stage 2: Processing
        │       │   ├── Transaction spinner
        │       │   └── "Confirming transaction..."
        │       └── Stage 3: Success
        │           ├── Success checkmark
        │           ├── "Transaction confirmed"
        │           └── [View in Portfolio] link
        │
        └── ➕ CREATE LISTING MODAL (components/CreateListingModal.tsx)
            │
            ├── 🖥️ FAULTY TERMINAL BACKDROP (z-0)
            │   ├── Cyan tint (#00d9ff)
            │   ├── Opacity: 15% (most subtle)
            │   ├── Glitch: 0.6
            │   ├── Grid multiplier: [3, 2]
            │   └── Brightness: 0.3
            │
            └── Modal Content (z-10)
                ├── Sale type selector
                │   ├── Radio: Fixed Price
                │   └── Radio: Auction
                ├── Form fields
                │   ├── NFT Title input
                │   ├── Description textarea
                │   ├── Price/Start Price input
                │   ├── Duration picker
                │   └── Royalty percentage
                ├── File upload area
                └── [List NFT] button


```

---

## FaultyTerminal Instance Summary Table

| Location | Type | Tint | Opacity | Glitch | Flicker | Brightness | Purpose |
|----------|------|------|---------|--------|---------|-----------|---------|
| Hero | Full-screen | Cyan | 100% | 0.8 | 0.5 | 0.6 | Dramatic entrance |
| Marketplace | Background | Cyan | 100% | 0.4 | 0.2 | 0.3 | Subtle feed effect |
| Portfolio | Background | Purple | 100% | 0.5 | 0.3 | 0.4 | Personal space |
| Auction Modal | Backdrop | Cyan | 20% | 0.6 | 0.3 | 0.4 | Action atmosphere |
| Purchase Modal | Backdrop | Green | 20% | 0.6 | 0.3 | 0.4 | Success reinforcement |
| Create Modal | Backdrop | Cyan | 15% | 0.6 | 0.3 | 0.3 | Minimal distraction |

---

## Visual Hierarchy

### Primary Terminal Effects (Immersive):
1. **Hero Section** - Full intensity, page load animation
2. **Marketplace Feed** - Subtle but visible, covers entire viewport
3. **Portfolio Page** - Moderate with purple tint differentiation

### Secondary Terminal Effects (Accent):
4. **Auction Modal** - 20% opacity, cyan backdrop
5. **Purchase Modal** - 20% opacity, green backdrop  
6. **Create Listing Modal** - 15% opacity, cyan backdrop

---

## User Journey with FaultyTerminal

```
User Enters Landing Page
    ↓
🖥️ HERO TERMINAL EFFECT LOADS
    ↓ (Dramatic entrance with glitch animation)
    ↓
User clicks "Launch Marketplace"
    ↓
🖥️ MARKETPLACE TERMINAL EFFECT STARTS
    ↓ (Subtle background grid animation)
    ↓
User browses NFTs with terminal backdrop
    ↓
User clicks "Bid Now" on auction → 🖥️ AUCTION MODAL TERMINAL EFFECT
    ↓
User clicks "Buy Now" on fixed price → 🖥️ PURCHASE MODAL TERMINAL EFFECT
    ↓
User clicks "Create Listing" → 🖥️ CREATE MODAL TERMINAL EFFECT
    ↓
User navigates to Portfolio → 🖥️ PORTFOLIO TERMINAL EFFECT (Purple tint)
    ↓
All effects provide cohesive terminal-inspired aesthetic throughout journey
```

---

## Device Responsiveness

### Mobile (424px - Farcaster Mini App):
- Hero: FaultyTerminal scales proportionally
- Marketplace: Fixed background adapts to viewport
- Modals: Canvas renders at mobile resolution
- All interactions remain smooth (WebGL handles scaling)

### Tablet (640px+):
- Grid multiplier maintains visual clarity
- Terminal effects scale for larger viewport
- All effects remain visible and impactful

### Desktop (1024px+):
- Full-scale FaultyTerminal with maximum grid visibility
- Effects cover entire expanded viewport
- Optimal performance with modern GPU

---

## Configuration Summary

All 6 FaultyTerminal instances share these consistent properties:
- ✅ **Mouse reactivity**: DISABLED (static animation only)
- ✅ **Page load animation**: Only Hero = TRUE, others = FALSE
- ✅ **Color scheme**: Cyan (primary), Green (success), Purple (portfolio)
- ✅ **Z-index strategy**: Background at z-0, content at z-10+
- ✅ **Opacity control**: Scaled from 15%-100% based on location
- ✅ **Performance**: Mounted state checks, fixed positioning, pointer-events-none

