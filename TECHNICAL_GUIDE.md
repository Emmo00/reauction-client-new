# Reauction NFT Marketplace - Technical Implementation Guide

## Project Overview

Reauction is a modern NFT marketplace built on the Farcaster platform with support for auctions and fixed-price sales. The application features a terminal-inspired dark aesthetic powered by the FaultyTerminal component, optimized for both mobile and desktop experiences.

## Technology Stack

### Frontend
- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS v4 with custom terminal theme
- **UI Components**: shadcn/ui
- **3D Effects**: FaultyTerminal (react-bits) with OGL
- **State Management**: Zustand (optional, for complex state)
- **Data Fetching**: SWR (recommended for client-side caching)

### Backend (To be implemented)
- **Authentication**: Farcaster Quick Auth SDK
- **Blockchain**: Base (EVM chain)
- **Smart Contracts**: Solidity for auction and fixed-price sale logic
- **Database**: Supabase PostgreSQL (recommended)
- **Storage**: Vercel Blob for image assets

### Web3
- **Wallet Integration**: wagmi + viem
- **Transaction Signing**: EIP-1193 provider
- **Contract Interaction**: ethers.js v6

## Project Structure

```
/vercel/share/v0-project/
├── app/
│   ├── layout.tsx              # Root layout with dark theme setup
│   ├── page.tsx                # Landing page with hero & marketplace preview
│   ├── globals.css             # Design tokens and terminal styles
│   ├── portfolio/
│   │   └── page.tsx            # User portfolio with holdings and activity
│   ├── marketplace/
│   │   └── page.tsx            # Full marketplace with search & filters
│   └── nft/
│       └── [id]/page.tsx       # Individual NFT detail page
├── components/
│   ├── FaultyTerminal.tsx      # Terminal background effect component
│   ├── Header.tsx              # Navigation header
│   ├── Hero.tsx                # Landing page hero section
│   ├── ListingCard.tsx         # NFT listing card in grid
│   ├── AuctionModal.tsx        # Auction bidding interface
│   ├── PurchaseModal.tsx       # Fixed-price purchase flow
│   └── CreateListingModal.tsx  # NFT listing creation form
├── hooks/
│   ├── useAuctions.ts          # Auction management logic
│   └── useFixedPriceSales.ts   # Fixed-price sales logic
├── lib/
│   └── utils.ts                # Utility functions and cn() helper
├── public/
│   └── [assets]
└── tailwind.config.ts          # Tailwind configuration with terminal theme
```

## Design System

### Color Palette (Terminal-Inspired)
- **Primary**: `#00d9ff` (Neon Cyan) - Main interactive elements
- **Accent**: `#00ff88` (Acid Green) - Secondary accents, highlights
- **Secondary**: `#a78bfa` (Purple) - Tertiary elements
- **Background**: `#0a0e27` (Deep Navy) - Main background
- **Card**: `#111833` (Dark Slate) - Card/container backgrounds
- **Border**: `#1e2749` (Border Blue) - Borders and dividers
- **Foreground**: `#e8eef7` (Off-White) - Text and foreground elements
- **Muted**: `#3d4563` (Gray) - Muted text and secondary elements

### Typography
- **Primary Font**: Geist (sans-serif) - Default body and UI text
- **Terminal Font**: JetBrains Mono (monospace) - Labels, code, terminal elements
- **Font Sizes**: Follow Tailwind scale (sm, base, lg, xl, 2xl, 3xl, etc.)

### Components
All components use terminal-inspired styling with:
- Monospace typography for critical information
- Neon glow effects on hover
- Glassmorphism backgrounds
- Subtle scan line and glitch effects
- Dark theme enforced throughout

## Key Features Implementation

### 1. FaultyTerminal Integration

The FaultyTerminal component is integrated into:
- **Landing Hero** (`/components/Hero.tsx`) - Full-screen animated background
- **Portfolio Hero** (`/app/portfolio/page.tsx`) - User portfolio background
- **Modals** (AuctionModal, PurchaseModal) - Subtle effects in backdrops

Configuration for subtle effect:
```typescript
<FaultyTerminal
  scale={1.2}
  gridMul={[2, 1]}
  digitSize={1.2}
  timeScale={0.4}
  scanlineIntensity={0.2}    // Subtle scanlines
  glitchAmount={0.8}         // Minimal glitch
  flickerAmount={0.5}        // Light flicker
  noiseAmp={0.3}             // Some noise
  tint="#00d9ff"             // Cyan tint
  mouseReact={false}         // Static animation
  pageLoadAnimation={true}   // Fade-in on load
  brightness={0.6}           // Dim background
/>
```

### 2. Marketplace Features

#### Auction System
- **Browse Auctions**: Filter and search auctions
- **Place Bids**: Real-time bid placement with validation
- **Time Tracking**: Live countdown to auction end
- **Bid History**: View all bids on an NFT

#### Fixed-Price Sales
- **Instant Purchase**: Direct NFT purchase at set price
- **Price Display**: Clear pricing with royalty info
- **Inventory**: Track available items

#### User Portfolio
- **Holdings**: Display owned NFTs
- **Listed Items**: Track currently listed for sale
- **Activity Log**: History of all transactions

### 3. Modal Dialogs

All modals feature:
- FaultyTerminal backdrop with reduced opacity
- Semi-transparent card backgrounds
- Monospace typography for inputs
- Smooth transitions and hover effects
- Mobile-responsive design

### 4. Responsive Design

Breakpoints:
- **Mobile**: 0-640px (single column)
- **Tablet**: 640-1024px (2 columns)
- **Desktop**: 1024px+ (3 columns)

## API Integration Points (To Be Implemented)

### Farcaster Authentication
```typescript
// Use Farcaster Quick Auth SDK
import { getFarcasterUser } from '@farcaster/hub-web';

const user = await getFarcasterUser(signer);
```

### Marketplace API Endpoints
```
GET  /api/auctions           # List all auctions
POST /api/auctions           # Create new auction
GET  /api/auctions/:id       # Get auction details
POST /api/auctions/:id/bid   # Place bid

GET  /api/listings           # List fixed-price items
POST /api/listings           # Create listing
POST /api/listings/:id/buy   # Purchase NFT

GET  /api/portfolio/:userId  # Get user portfolio
POST /api/portfolio/import   # Import NFT to portfolio
```

### Smart Contract Interactions

#### Auction Smart Contract
```solidity
contract AuctionHouse {
    function createAuction(
        address nftAddress,
        uint256 tokenId,
        uint256 startPrice,
        uint256 duration
    ) external returns (uint256 auctionId);
    
    function placeBid(uint256 auctionId) external payable;
    
    function endAuction(uint256 auctionId) external;
}
```

#### Fixed-Price Sale Smart Contract
```solidity
contract Marketplace {
    function list(
        address nftAddress,
        uint256 tokenId,
        uint256 price
    ) external;
    
    function purchase(uint256 listingId) external payable;
    
    function delist(uint256 listingId) external;
}
```

## Development Workflow

### 1. Setup
```bash
cd /vercel/share/v0-project
pnpm install
pnpm dev
```

### 2. Build Components
- Create new components in `/components`
- Use existing UI components from shadcn/ui
- Follow terminal aesthetic guidelines

### 3. Add Pages
- Create route files in `/app`
- Use dynamic routes for NFT details `[id]`
- Implement FaultyTerminal backgrounds as needed

### 4. State Management
For global state, use Zustand (already installed):
```typescript
import { create } from 'zustand';

const useStore = create((set) => ({
  // state and actions
}));
```

### 5. Data Fetching
Use SWR for client-side caching:
```typescript
import useSWR from 'swr';

const { data, error, isLoading } = useSWR('/api/listings', fetcher);
```

## Styling Guidelines

### Terminal Elements
- Use `font-terminal` class for monospace text
- Apply `terminal-glow` class for neon effects
- Use `terminal-border` for outlined elements

### Color Usage
- Primary (`text-primary`) for main interactive elements
- Accent (`text-accent`) for highlights and CTAs
- Muted (`text-muted-foreground`) for secondary text

### Spacing
- Follow Tailwind spacing scale (gap-4, px-6, py-3)
- Use flexbox for layouts (default method)
- Grid for complex 2D layouts

## Performance Optimization

### Image Optimization
```typescript
import Image from 'next/image';

<Image
  src={url}
  alt="description"
  width={500}
  height={500}
  placeholder="blur"
  blurDataURL="..."
/>
```

### Code Splitting
- Each route automatically code-splits
- Use dynamic imports for heavy components

### FaultyTerminal Performance
- Memoize FaultyTerminal components
- Only enable on critical pages
- Use reduced settings on mobile

## Testing Checklist

- [ ] Mobile responsiveness (375px, 424px, 768px)
- [ ] Dark theme consistency
- [ ] FaultyTerminal rendering on low-end devices
- [ ] Modal interactions and transitions
- [ ] Form validation and error states
- [ ] Navigation and routing
- [ ] Image loading and lazy loading
- [ ] Accessibility (keyboard navigation, screen readers)

## Next Steps for Production

1. **Authentication**: Implement Farcaster Quick Auth
2. **Database**: Set up Supabase PostgreSQL
3. **Smart Contracts**: Deploy to Base network
4. **Wallet Integration**: Connect Web3Modal/wagmi
5. **API Routes**: Build backend in `/app/api`
6. **Real-time Updates**: Implement WebSockets for live bids
7. **Image Storage**: Upload to Vercel Blob
8. **Testing**: Add Jest and React Testing Library
9. **Deployment**: Deploy to Vercel

## Environment Variables (To Configure)

```bash
NEXT_PUBLIC_FARCASTER_HUB_URL=
FARCASTER_APP_ID=
FARCASTER_APP_SECRET=

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

NEXT_PUBLIC_RPC_URL=
NEXT_PUBLIC_CHAIN_ID=8453  # Base mainnet

NEXT_PUBLIC_NFT_CONTRACT=
NEXT_PUBLIC_AUCTION_CONTRACT=
NEXT_PUBLIC_MARKETPLACE_CONTRACT=
```

## Resources

- [Farcaster Docs](https://docs.farcaster.xyz)
- [Next.js 16 Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Supabase Documentation](https://supabase.com/docs)
- [wagmi Documentation](https://wagmi.sh)

This technical guide provides the foundation for further development. Each section should be expanded with specific implementations as the project progresses.
