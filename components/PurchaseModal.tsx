'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, CheckCircle, AlertCircle } from 'lucide-react';
import FaultyTerminal from './FaultyTerminal';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  nft: {
    id: string;
    title: string;
    collection: string;
    image: string;
    price: string;
    royalty: string;
    seller: string;
    description: string;
  };
}

export function PurchaseModal({ isOpen, onClose, nft }: PurchaseModalProps) {
  const [stage, setStage] = useState<'confirm' | 'processing' | 'success'>('confirm');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with terminal effect */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-0">
        <div className="absolute inset-0 opacity-20">
          <FaultyTerminal
            scale={2}
            gridMul={[3, 2]}
            digitSize={1.5}
            timeScale={0.3}
            scanlineIntensity={0.15}
            glitchAmount={0.6}
            flickerAmount={0.3}
            noiseAmp={0.2}
            tint="#00ff88"
            mouseReact={false}
            pageLoadAnimation={false}
            brightness={0.4}
          />
        </div>
      </div>

      {/* Modal Content */}
      <div className="relative z-10 bg-card border border-accent/40 rounded-sm max-w-xl w-full terminal-glow">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-card/95 backdrop-blur-sm">
          <h2 className="font-terminal font-bold text-xl text-foreground">
            {stage === 'success' ? 'Purchase Complete' : 'Confirm Purchase'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-primary/10 rounded-sm transition-colors border border-border/50"
          >
            <X className="w-5 h-5 text-foreground/60" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {stage === 'confirm' && (
            <div className="space-y-6">
              {/* NFT Preview */}
              <div className="relative h-48 rounded-sm overflow-hidden border border-border">
                <Image
                  src={nft.image}
                  alt={nft.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* NFT Details */}
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-foreground/60 font-terminal uppercase">{nft.collection}</p>
                  <p className="font-terminal font-bold text-lg text-foreground mt-1">{nft.title}</p>
                </div>

                <p className="text-sm text-foreground/70">{nft.description}</p>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 p-4 bg-muted/30 border border-border rounded-sm">
                <div className="flex justify-between items-center">
                  <span className="text-foreground/70 font-terminal">Price</span>
                  <span className="font-terminal font-bold text-foreground">{nft.price} ETH</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground/70 font-terminal">Royalty ({nft.royalty}%)</span>
                  <span className="font-terminal text-sm text-foreground/60">
                    {(parseFloat(nft.price) * parseFloat(nft.royalty) / 100).toFixed(4)} ETH
                  </span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between items-center">
                  <span className="text-foreground/70 font-terminal font-semibold">Total</span>
                  <span className="font-terminal font-bold text-primary text-lg">
                    {(parseFloat(nft.price) * (1 + parseFloat(nft.royalty) / 100)).toFixed(4)} ETH
                  </span>
                </div>
              </div>

              {/* Seller Info */}
              <div className="p-3 bg-secondary/10 border border-secondary/30 rounded-sm">
                <p className="text-xs text-foreground/60 font-terminal">Seller</p>
                <p className="font-terminal font-semibold text-foreground mt-1">{nft.seller}</p>
              </div>

              {/* Warning */}
              <div className="flex gap-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-sm">
                <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-100">
                  <p className="font-terminal font-semibold">Verify Details</p>
                  <p className="text-xs mt-1 text-yellow-200/80">
                    Please confirm this purchase on the blockchain. This action cannot be undone.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setStage('processing')}
                  className="flex-1 px-4 py-3 bg-accent text-accent-foreground rounded-sm font-terminal font-semibold hover:bg-accent/90 transition-colors border border-accent/30"
                >
                  Confirm Purchase
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-3 bg-transparent text-foreground rounded-sm font-terminal font-semibold border border-border hover:bg-muted/30 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {stage === 'processing' && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="w-16 h-16 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="font-terminal font-semibold text-foreground">Processing Transaction</p>
              <p className="text-sm text-foreground/60 text-center">
                Confirming your purchase on the blockchain...
              </p>
              <button
                onClick={() => setStage('success')}
                className="mt-6 px-6 py-2 bg-primary/20 border border-primary text-primary rounded-sm font-terminal text-sm hover:bg-primary/30 transition-colors"
              >
                Simulate Completion
              </button>
            </div>
          )}

          {stage === 'success' && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <CheckCircle className="w-16 h-16 text-accent animate-bounce" />
              <p className="font-terminal font-bold text-lg text-foreground">Purchase Successful!</p>
              <div className="text-center space-y-2">
                <p className="text-sm text-foreground/70">Transaction confirmed on Base</p>
                <p className="font-terminal text-xs text-primary/70">
                  0x1234...5678
                </p>
              </div>
              <div className="pt-6 flex flex-col gap-3 w-full">
                <button
                  onClick={onClose}
                  className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-sm font-terminal font-semibold hover:bg-accent transition-colors border border-primary/30"
                >
                  View NFT
                </button>
                <button
                  onClick={onClose}
                  className="w-full px-4 py-3 bg-transparent text-foreground rounded-sm font-terminal font-semibold border border-border hover:bg-muted/30 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
