'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FaultyTerminal from '@/components/FaultyTerminal';

const mockListings = [
  {
    id: '1',
    title: 'Neon Genesis #001',
    collection: 'Digital Artifacts',
    image: 'https://picsum.photos/400',
    saleType: 'auction' as const,
    price: '12.5',
    currency: 'ETH',
    endTime: '2h 30m',
    bids: 8
  },
  {
    id: '2',
    title: 'Terminal Dreams #042',
    collection: 'Code Canvas',
    image: 'https://picsum.photos/400',
    saleType: 'fixed' as const,
    price: '5.0',
    currency: 'ETH'
  },
  {
    id: '3',
    title: 'Cyber Pulse #156',
    collection: 'Digital Artifacts',
    image: 'https://picsum.photos/400',
    saleType: 'auction' as const,
    price: '8.7',
    currency: 'ETH',
    endTime: '5h 15m',
    bids: 12
  },
  {
    id: '4',
    title: 'Pixelated Dreams #203',
    collection: 'Retro Future',
    image: 'https://picsum.photos/400',
    saleType: 'fixed' as const,
    price: '3.2',
    currency: 'ETH'
  },
  {
    id: '5',
    title: 'Matrix Cascade #089',
    collection: 'Code Canvas',
    image: 'https://picsum.photos/400',
    saleType: 'auction' as const,
    price: '15.3',
    currency: 'ETH',
    endTime: '1h 45m',
    bids: 5
  },
  {
    id: '6',
    title: 'Glitch Harmony #071',
    collection: 'Digital Artifacts',
    image: 'https://picsum.photos/400',
    saleType: 'fixed' as const,
    price: '7.5',
    currency: 'ETH'
  },
  {
    id: '7',
    title: 'Quantum Fields #112',
    collection: 'Code Canvas',
    image: 'https://picsum.photos/400',
    saleType: 'auction' as const,
    price: '11.2',
    currency: 'ETH',
    endTime: '3h 20m',
    bids: 7
  },
  {
    id: '8',
    title: 'Void Echo #334',
    collection: 'Digital Artifacts',
    image: 'https://picsum.photos/400',
    saleType: 'fixed' as const,
    price: '9.8',
    currency: 'ETH'
  },
  {
    id: '9',
    title: 'Synthesis #555',
    collection: 'Retro Future',
    image: 'https://picsum.photos/400',
    saleType: 'auction' as const,
    price: '6.4',
    currency: 'ETH',
    endTime: '4h 10m',
    bids: 3
  },
];

export default function Marketplace() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredListings = mockListings
    .filter(listing => {
      if (activeTab === 'auction' && listing.saleType !== 'auction') return false;
      if (activeTab === 'fixed' && listing.saleType !== 'fixed') return false;
      if (searchQuery && !listing.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return parseFloat(a.price) - parseFloat(b.price);
      if (sortBy === 'price-high') return parseFloat(b.price) - parseFloat(a.price);
      return 0;
    });

  return (
    <div className="min-h-screen bg-background">
      {/* FaultyTerminal Background */}
      <div className="absolute inset-0">
        {mounted && (
          <div className="relative h-full w-full opacity-25 pointer-events-none">
            <FaultyTerminal
              className=""
              style={{}}
              scale={1}
              gridMul={[2, 1]}
              digitSize={2}
              timeScale={1}
              pause={false}
              scanlineIntensity={1}
              glitchAmount={1}
              flickerAmount={1}
              noiseAmp={1}
              chromaticAberration={0}
              dither={0}
              curvature={0}
              tint="#8b5cf6"
              mouseReact={true}
              mouseStrength={0.5}
              pageLoadAnimation={false}
              brightness={0.9}
            />
          </div>
        )}
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <button
            onClick={() => router.push('/')}
            className="text-2xl font-bold text-primary hover:text-primary-light transition-colors"
          >
            reauction
          </button>
          <div
            onClick={() => router.push('/portfolio')}
            className="flex items-center gap-3 p-1.5 pr-4 rounded-full border border-border/50 bg-card/40 backdrop-blur-sm hover:border-primary/50 hover:bg-card/70 transition-all duration-200 cursor-pointer select-none group"
          >
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-border/50 group-hover:border-primary/50 transition-colors duration-200">
              <img
                src="https://picsum.photos/id/64/40/40"
                alt="Profile"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                alice_farcaster
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                0x8b...a79c
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section className="relative z-10 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Resell and Auction Your Cast Collectibles</h1>
          <p className="text-muted-foreground">Give your collectibles a second life.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Controls */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Search NFTs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 bg-card border border-border rounded text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-card border border-border rounded text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="latest">Latest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-border/50">
              {['all', 'auction', 'fixed'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 font-medium transition-colors ${activeTab === tab
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                  {tab === 'all' && `All Items (${mockListings.length})`}
                  {tab === 'auction' && `Auctions (${mockListings.filter(l => l.saleType === 'auction').length})`}
                  {tab === 'fixed' && `Fixed Price (${mockListings.filter(l => l.saleType === 'fixed').length})`}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <div
                key={listing.id}
                onClick={() => router.push(`/nft/${listing.id}`)}
                className="group rounded border border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden hover:border-primary/50 transition-all duration-200 hover:shadow-lg hover:shadow-primary/20 cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-48 bg-secondary-dark/30 overflow-hidden">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded">
                    {listing.saleType === 'auction' ? 'Auction' : 'Fixed'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-foreground line-clamp-2">{listing.title}</h3>
                    <p className="text-sm text-muted-foreground">{listing.collection}</p>
                  </div>

                  {listing.endTime && (
                    <p className="text-xs text-primary/80 font-medium">{listing.endTime}</p>
                  )}

                  {listing.bids && (
                    <p className="text-xs text-muted-foreground">{listing.bids} bids</p>
                  )}

                  <div className="pt-2 border-t border-border/50">
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="text-2xl font-bold text-primary">{listing.price} {listing.currency}</p>
                  </div>

                  <button className="w-full py-2 bg-primary text-primary-foreground rounded font-medium hover:bg-primary-dark transition-colors">
                    {listing.saleType === 'auction' ? 'Place Bid' : 'Buy Now'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredListings.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No listings found</p>
              <p className="text-muted-foreground text-sm mt-2">Try adjusting your search or filters</p>
            </div>
          )}

          {/* Results Count */}
          {filteredListings.length > 0 && (
            <div className="flex justify-between items-center pt-8 border-t border-border/50 mt-8">
              <p className="text-sm text-muted-foreground">
                Showing {filteredListings.length} of {mockListings.length} items
              </p>
              <button className="px-4 py-2 text-sm border border-border rounded hover:bg-card transition-colors">
                Load More
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 bg-card/30 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
            <div>
              <p className="font-bold text-primary text-lg">reauction</p>
              <p className="text-sm text-muted-foreground mt-1">NFT Marketplace on Farcaster</p>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Docs</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Twitter</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Discord</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
