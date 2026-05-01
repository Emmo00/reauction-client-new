'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FaultyTerminal from '@/components/FaultyTerminal';

const mockNFTData: Record<string, any> = {
  '1': {
    id: '1',
    title: 'Neon Genesis #001',
    collection: 'Digital Artifacts',
    image: 'https://picsum.photos/400',
    saleType: 'auction',
    currentPrice: '12.5',
    floorPrice: '10.0',
    currency: 'ETH',
    endTime: '2h 30m',
    bids: 8,
    owner: '0x1234...5678',
    creator: '0xabcd...ef01',
    description: 'A stunning digital artwork featuring neon colors and geometric patterns.',
    properties: [
      { name: 'Rarity', value: 'Legendary' },
      { name: 'Color', value: 'Neon' },
      { name: 'Style', value: 'Abstract' }
    ]
  },
  '2': {
    id: '2',
    title: 'Terminal Dreams #042',
    collection: 'Code Canvas',
    image: 'https://picsum.photos/400',
    saleType: 'fixed',
    price: '5.0',
    currency: 'ETH',
    owner: '0x9876...4321',
    creator: '0x5678...90ab',
    description: 'An exploration of terminal aesthetics merged with dreamlike imagery.',
    properties: [
      { name: 'Resolution', value: '4K' },
      { name: 'Generated', value: 'Algorithmic' },
      { name: 'Theme', value: 'Cyberpunk' }
    ]
  }
};

const mockBids = [
  { bidder: '0xaaaa...bbbb', amount: 12.5, time: '2 min ago' },
  { bidder: '0xcccc...dddd', amount: 12.0, time: '15 min ago' },
  { bidder: '0xeeee...ffff', amount: 11.5, time: '1h ago' },
  { bidder: '0x1111...2222', amount: 11.0, time: '2h ago' }
];

export default function NFTDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [showBidModal, setShowBidModal] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [bidError, setBidError] = useState('');
  const [transactionType, setTransactionType] = useState<'bid' | 'buy'>('bid');

  const nft = mockNFTData[params.id] || mockNFTData['1'];

  useEffect(() => {
    setMounted(true);
  }, []);

  const validateBid = (amount: string) => {
    const bid = parseFloat(amount);
    const currentHighest = parseFloat(nft.currentPrice);
    const minimumBid = currentHighest * 1.05;

    if (!amount) {
      setBidError('Please enter a bid amount');
      return false;
    }
    if (isNaN(bid)) {
      setBidError('Please enter a valid number');
      return false;
    }
    if (bid <= currentHighest) {
      setBidError(`Bid must be higher than ${currentHighest} ETH`);
      return false;
    }
    if (bid < minimumBid) {
      setBidError(`Minimum bid increase is 5% (${minimumBid.toFixed(2)} ETH)`);
      return false;
    }
    setBidError('');
    return true;
  };

  const handlePlaceBid = () => {
    if (validateBid(bidAmount)) {
      setTransactionType('bid');
      setShowBidModal(false);
      setShowSuccess(true);
    }
  };

  const handleBuyNow = () => {
    setTransactionType('buy');
    setShowBuyModal(false);
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {mounted && (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
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

      <header className="relative z-10 border-b border-border/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <button
            onClick={() => router.push('/marketplace')}
            className="text-2xl font-bold text-primary hover:text-primary-light transition-colors"
          >
            reauction
          </button>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 text-sm text-foreground/70 hover:text-foreground transition-colors"
          >
            ← Back
          </button>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="animate-in fade-in duration-500">
            <div className="rounded-lg overflow-hidden border border-border/50 bg-card/40 backdrop-blur-sm">
              <img
                src={nft.image}
                alt={nft.title}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <div className="space-y-8 animate-in fade-in duration-500 delay-100">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-primary font-semibold uppercase tracking-wider">{nft.collection}</p>
                <h1 className="text-4xl font-bold text-foreground">{nft.title}</h1>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">By</span>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Created by</p>
                  <p className="font-semibold text-foreground">{nft.creator}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 p-6 rounded-lg border border-primary/30 bg-primary/5">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {nft.saleType === 'auction' ? 'Current Bid' : 'Price'}
                </p>
                <p className="text-3xl font-bold text-primary">
                  {nft.currentPrice || nft.price} {nft.currency}
                </p>
              </div>

              {nft.saleType === 'auction' && (
                <div className="pt-4 border-t border-border/50 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Total Bids</p>
                    <p className="text-lg font-semibold text-foreground">{nft.bids}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Ends in</p>
                    <p className="text-lg font-semibold text-primary">{nft.endTime}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {nft.saleType === 'auction' ? (
                <button
                  onClick={() => setShowBidModal(true)}
                  className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary-dark transition-all duration-200 transform hover:scale-105 active:scale-95"
                >
                  Place a Bid
                </button>
              ) : (
                <button
                  onClick={() => setShowBuyModal(true)}
                  className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary-dark transition-all duration-200 transform hover:scale-105 active:scale-95"
                >
                  Buy Now
                </button>
              )}
            </div>

            <div className="space-y-4 p-6 rounded-lg border border-border/50 bg-card/40 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-foreground">Description</h3>
              <p className="text-muted-foreground leading-relaxed">{nft.description}</p>
            </div>

            <div className="space-y-4 p-6 rounded-lg border border-border/50 bg-card/40 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-foreground">Properties</h3>
              <div className="grid grid-cols-2 gap-3">
                {nft.properties.map((prop: any, idx: number) => (
                  <div key={idx} className="p-3 rounded border border-border/50 bg-background/50">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">{prop.name}</p>
                    <p className="font-semibold text-foreground">{prop.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-lg border border-border/50 bg-card/40 backdrop-blur-sm">
              <p className="text-sm text-muted-foreground">Owned by</p>
              <p className="text-lg font-semibold text-foreground mt-1">{nft.owner}</p>
            </div>
          </div>
        </div>
      </main>

      {/* Place Bid Modal */}
      {showBidModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowBidModal(false)}
          />
          <div className="relative bg-background border border-primary/50 rounded-lg p-8 max-w-md w-full transform animate-in zoom-in-95 duration-300 shadow-2xl">
            <h2 className="text-2xl font-bold text-foreground mb-6">Place Your Bid</h2>

            <div className="mb-6 space-y-3 max-h-40 overflow-y-auto">
              <p className="text-sm font-semibold text-primary mb-3">Recent Bids</p>
              {mockBids.map((bid, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded border transition-all duration-200 ${
                    idx === 0
                      ? 'border-primary/50 bg-primary/10'
                      : 'border-border/50 bg-card/40'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-foreground">{bid.amount} ETH</p>
                      <p className="text-xs text-muted-foreground">{bid.bidder}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{bid.time}</p>
                  </div>
                  {idx === 0 && <p className="text-xs text-primary mt-2 font-semibold">HIGHEST BID</p>}
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">
                  Your Bid (ETH)
                </label>
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => {
                    setBidAmount(e.target.value);
                    setBidError('');
                  }}
                  placeholder={`Minimum: ${(parseFloat(nft.currentPrice) * 1.05).toFixed(2)} ETH`}
                  className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                />
              </div>

              {bidError && (
                <p className="text-sm text-red-500 animate-in fade-in duration-200">{bidError}</p>
              )}

              <p className="text-xs text-muted-foreground">
                Minimum increase: 5% ({(parseFloat(nft.currentPrice) * 1.05).toFixed(2)} ETH)
              </p>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setShowBidModal(false)}
                className="flex-1 py-2 border border-border rounded-lg text-foreground hover:bg-card transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handlePlaceBid}
                className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary-dark transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                Place Bid
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Buy Now Modal */}
      {showBuyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowBuyModal(false)}
          />
          <div className="relative bg-background border border-primary/50 rounded-lg p-8 max-w-md w-full transform animate-in zoom-in-95 duration-300 shadow-2xl">
            <h2 className="text-2xl font-bold text-foreground mb-4">Confirm Purchase</h2>
            <p className="text-muted-foreground mb-6">Are you sure you want to buy this NFT?</p>

            <div className="p-4 rounded-lg border border-border/50 bg-card/40 mb-6 space-y-2">
              <p className="font-semibold text-foreground">{nft.title}</p>
              <p className="text-sm text-muted-foreground">{nft.collection}</p>
              <div className="pt-2 border-t border-border/50 mt-3">
                <p className="text-xs text-muted-foreground">Price</p>
                <p className="text-2xl font-bold text-primary">{nft.price} ETH</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowBuyModal(false)}
                className="flex-1 py-2 border border-border rounded-lg text-foreground hover:bg-card transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary-dark transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => {
              setShowSuccess(false);
              router.push('/portfolio');
            }}
          />
          <div className="relative bg-background border border-primary/50 rounded-lg p-8 max-w-md w-full transform animate-in zoom-in-95 duration-300 shadow-2xl text-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 animate-pulse">
              <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-2">
              {transactionType === 'bid' ? 'Bid Placed!' : 'Purchase Complete!'}
            </h2>
            <p className="text-muted-foreground mb-6">
              {transactionType === 'bid'
                ? `Your bid of ${bidAmount} ETH has been placed successfully.`
                : `You have successfully purchased ${nft.title}`}
            </p>

            <button
              onClick={() => {
                setShowSuccess(false);
                router.push('/portfolio');
              }}
              className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary-dark transition-all duration-200"
            >
              View Portfolio
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoomIn95 {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-in {
          animation: fadeIn 0.3s ease-out;
        }
        .zoom-in-95 {
          animation: zoomIn95 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
