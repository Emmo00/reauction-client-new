'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FaultyTerminal from '@/components/FaultyTerminal';

const mockPortfolioData = {
  holdings: [
    {
      id: '1',
      title: 'Neon Genesis #001',
      collection: 'Digital Artifacts',
      image: 'https://picsum.photos/400',
      value: '12.5',
      currency: 'ETH',
      upForSale: true,
      saleType: 'auction',
      currentPrice: '12.5'
    },
    {
      id: '2',
      title: 'Terminal Dreams #042',
      collection: 'Code Canvas',
      image: 'https://picsum.photos/400',
      value: '5.0',
      currency: 'ETH',
      upForSale: true,
      saleType: 'fixed',
      currentPrice: '5.0'
    },
    {
      id: '3',
      title: 'Cyber Pulse #156',
      collection: 'Digital Artifacts',
      image: 'https://picsum.photos/400',
      value: '8.7',
      currency: 'ETH',
      upForSale: false
    },
    {
      id: '4',
      title: 'Pixelated Dreams #203',
      collection: 'Retro Future',
      image: 'https://picsum.photos/400',
      value: '3.2',
      currency: 'ETH',
      upForSale: true,
      saleType: 'fixed',
      currentPrice: '3.2'
    },
    {
      id: '5',
      title: 'Matrix Cascade #089',
      collection: 'Digital Artifacts',
      image: 'https://picsum.photos/400',
      value: '6.5',
      currency: 'ETH',
      upForSale: false
    }
  ],
  activities: [
    {
      id: '1',
      type: 'listing_created',
      item: 'Neon Genesis #001',
      action: 'Listed for auction',
      price: '12.5 ETH',
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      type: 'bid_placed',
      item: 'Terminal Dreams #042',
      action: 'Bid placed',
      price: '5.0 ETH',
      timestamp: '5 hours ago'
    },
    {
      id: '3',
      type: 'purchase',
      item: 'Cyber Pulse #156',
      action: 'Purchased',
      price: '8.7 ETH',
      timestamp: '1 day ago'
    },
    {
      id: '4',
      type: 'listing_created',
      item: 'Pixelated Dreams #203',
      action: 'Listed for sale',
      price: '3.2 ETH',
      timestamp: '3 days ago'
    }
  ]
};

export default function Portfolio() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'holdings' | 'forSale' | 'activity'>('holdings');

  useEffect(() => {
    setMounted(true);
  }, []);

  const forSaleItems = mockPortfolioData.holdings.filter(item => item.upForSale);
  const totalValue = mockPortfolioData.holdings.reduce((sum, item) => sum + parseFloat(item.value), 0);

  return (
    <div className="min-h-screen bg-background">
      {mounted && (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-25">
          <FaultyTerminal
            scale={1.5}
            gridMul={[2, 1]}
            digitSize={1}
            timeScale={0.3}
            scanlineIntensity={0.1}
            glitchAmount={0.2}
            flickerAmount={0.1}
            noiseAmp={0.1}
            tint="#8b5cf6"
            mouseReact={false}
            pageLoadAnimation={false}
            brightness={0.3}
          />
        </div>
      )}

      {/* Header */}
      <header className="relative z-10 border-b border-border/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <button
            onClick={() => router.push('/')}
            className="text-2xl font-bold text-primary hover:text-primary-light transition-colors"
          >
            reauction
          </button>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 text-sm text-foreground/70 hover:text-foreground transition-colors"
          >
            ← Back
          </button>
        </div>
      </header>

      {/* Portfolio Stats */}
      <section className="relative z-10 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-4 animate-in fade-in duration-500">
            <h1 className="text-4xl font-bold text-foreground">My Portfolio</h1>
            <p className="text-muted-foreground">Manage your NFT collection</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            <div className="p-6 rounded-lg border border-border/50 bg-card/40 backdrop-blur-sm animate-in fade-in duration-500 delay-100">
              <p className="text-sm text-muted-foreground mb-2">Total Holdings</p>
              <p className="text-3xl font-bold text-primary">{mockPortfolioData.holdings.length}</p>
            </div>
            <div className="p-6 rounded-lg border border-border/50 bg-card/40 backdrop-blur-sm animate-in fade-in duration-500 delay-200">
              <p className="text-sm text-muted-foreground mb-2">Total Value</p>
              <p className="text-3xl font-bold text-primary">{totalValue.toFixed(1)} ETH</p>
            </div>
            <div className="p-6 rounded-lg border border-border/50 bg-card/40 backdrop-blur-sm animate-in fade-in duration-500 delay-300">
              <p className="text-sm text-muted-foreground mb-2">For Sale</p>
              <p className="text-3xl font-bold text-primary">{forSaleItems.length}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex gap-4 border-b border-border/50 mb-8">
            {[
              { id: 'holdings', label: 'Holdings' },
              { id: 'forSale', label: 'For Sale' },
              { id: 'activity', label: 'Activity' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-3 font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Holdings Tab */}
          {activeTab === 'holdings' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockPortfolioData.holdings.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => router.push(`/nft/${item.id}`)}
                  className="group rounded-lg border border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden hover:border-primary/50 transition-all duration-200 hover:shadow-lg hover:shadow-primary/20 cursor-pointer animate-in fade-in duration-500"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="relative h-48 bg-secondary-dark/30 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {item.upForSale && (
                      <div className="absolute top-3 right-3 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded">
                        For Sale
                      </div>
                    )}
                  </div>

                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-foreground line-clamp-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.collection}</p>
                    </div>

                    <div className="pt-2 border-t border-border/50">
                      <p className="text-sm text-muted-foreground">Value</p>
                      <p className="text-2xl font-bold text-primary">{item.value} {item.currency}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* For Sale Tab */}
          {activeTab === 'forSale' && (
            <div>
              {forSaleItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {forSaleItems.map((item, idx) => (
                    <div
                      key={item.id}
                      onClick={() => router.push(`/nft/${item.id}`)}
                      className="group rounded-lg border border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden hover:border-primary/50 transition-all duration-200 hover:shadow-lg hover:shadow-primary/20 cursor-pointer animate-in fade-in duration-500"
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <div className="relative h-48 bg-secondary-dark/30 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 right-3 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded">
                          {item.saleType === 'auction' ? 'Auction' : 'Fixed Price'}
                        </div>
                      </div>

                      <div className="p-4 space-y-3">
                        <div>
                          <h3 className="font-semibold text-foreground line-clamp-2">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.collection}</p>
                        </div>

                        <div className="pt-2 border-t border-border/50">
                          <p className="text-sm text-muted-foreground">Asking Price</p>
                          <p className="text-2xl font-bold text-primary">{item.currentPrice} {item.currency}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No items for sale</p>
                  <p className="text-muted-foreground text-sm mt-2">List your NFTs to appear here</p>
                </div>
              )}
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div className="space-y-3">
              {mockPortfolioData.activities.map((activity, idx) => (
                <div
                  key={activity.id}
                  className="p-4 rounded-lg border border-border/50 bg-card/40 backdrop-blur-sm hover:bg-card/60 transition-all duration-200 animate-in fade-in duration-500"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{activity.item}</p>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">{activity.price}</p>
                      <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
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

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .fade-in {
          animation-name: fadeIn;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  );
}
