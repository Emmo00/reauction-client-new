'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, Clock, Zap, TrendingUp } from 'lucide-react';

interface AuctionModalProps {
  isOpen: boolean;
  onClose: () => void;
  nft: {
    id: string;
    title: string;
    collection: string;
    image: string;
    currentBid: string;
    floorPrice: string;
    endTime: string;
    bidsCount: number;
    description: string;
    creator: string;
  };
}

export function AuctionModal({ isOpen, onClose, nft }: AuctionModalProps) {
  const [bidAmount, setBidAmount] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      {/* Modal Content */}
      <div className="relative z-10 bg-card border border-primary/40 rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto terminal-glow">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-card/95 backdrop-blur-sm">
          <h2 className="font-terminal font-bold text-xl text-foreground">{nft.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-primary/10 rounded-sm transition-colors border border-border/50"
          >
            <X className="w-5 h-5 text-foreground/60" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* NFT Preview */}
          <div className="relative h-64 rounded-sm overflow-hidden border border-border">
            <Image
              src={nft.image}
              alt={nft.title}
              fill
              className="object-cover"
            />
          </div>

          {/* NFT Info */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted/50 border border-border rounded-sm">
                <p className="text-xs text-foreground/60 font-terminal uppercase">Collection</p>
                <p className="font-terminal font-semibold text-foreground mt-1">{nft.collection}</p>
              </div>
              <div className="p-4 bg-muted/50 border border-border rounded-sm">
                <p className="text-xs text-foreground/60 font-terminal uppercase">Creator</p>
                <p className="font-terminal font-semibold text-foreground mt-1">{nft.creator}</p>
              </div>
            </div>

            {/* Description */}
            <div className="p-4 bg-muted/30 border border-border rounded-sm">
              <p className="text-sm text-foreground/70">{nft.description}</p>
            </div>
          </div>

          {/* Auction Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-muted/50 border border-border rounded-sm text-center">
              <p className="text-xs text-foreground/60 font-terminal">Current Bid</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <Zap className="w-4 h-4 text-accent" />
                <span className="font-terminal font-bold text-primary">{nft.currentBid}</span>
              </div>
            </div>
            <div className="p-3 bg-muted/50 border border-border rounded-sm text-center">
              <p className="text-xs text-foreground/60 font-terminal">Floor</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="font-terminal font-bold text-foreground">{nft.floorPrice}</span>
              </div>
            </div>
            <div className="p-3 bg-muted/50 border border-border rounded-sm text-center">
              <p className="text-xs text-foreground/60 font-terminal">Bids</p>
              <p className="font-terminal font-bold text-accent text-lg mt-2">{nft.bidsCount}</p>
            </div>
          </div>

          {/* Time Remaining */}
          <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-sm flex items-center gap-3">
            <Clock className="w-5 h-5 text-destructive" />
            <div>
              <p className="text-xs text-foreground/60 font-terminal">Auction Ends In</p>
              <p className="font-terminal font-bold text-foreground">{nft.endTime}</p>
            </div>
          </div>

          {/* Bidding Section */}
          <div className="space-y-4 pt-4 border-t border-border">
            <h3 className="font-terminal font-semibold text-foreground">Place Your Bid</h3>

            <div className="flex gap-3">
              <input
                type="number"
                placeholder="Enter bid amount (ETH)"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className="flex-1 px-4 py-3 bg-input border border-border rounded-sm font-terminal focus:outline-none focus:border-primary transition-colors"
              />
              <button className="px-6 py-3 bg-accent text-accent-foreground rounded-sm font-terminal font-semibold hover:bg-primary transition-colors border border-accent/30 hover:border-primary/50">
                Place Bid
              </button>
            </div>

            <p className="text-xs text-foreground/50 font-terminal">
              Minimum bid: {nft.currentBid} ETH
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <button className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-sm font-terminal font-semibold hover:bg-accent transition-colors border border-primary/30">
              Make Offer
            </button>
            <button className="flex-1 px-4 py-3 bg-transparent text-primary rounded-sm font-terminal font-semibold border border-primary/50 hover:bg-primary/5 transition-colors">
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
