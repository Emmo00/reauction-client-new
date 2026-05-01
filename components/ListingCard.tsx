'use client';

import Image from 'next/image';
import { Heart, Zap, Clock } from 'lucide-react';
import { useState } from 'react';

interface ListingCardProps {
  id: string;
  title: string;
  collection: string;
  image: string;
  saleType: 'auction' | 'fixed';
  price: string;
  currency: string;
  endTime?: string;
  bids?: number;
}

export function ListingCard({ id, title, collection, image, saleType, price, currency, endTime, bids }: ListingCardProps) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="group relative rounded-sm overflow-hidden border border-border hover:border-primary transition-colors duration-300">
      <div className="relative h-56 bg-muted overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="absolute top-3 right-3">
          <button
            onClick={() => setLiked(!liked)}
            className="p-2 rounded-sm bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-all border border-border/50"
          >
            <Heart className={`w-4 h-4 ${liked ? 'fill-current text-accent' : ''}`} />
          </button>
        </div>

        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-full py-2 px-3 bg-primary text-primary-foreground rounded-sm font-terminal text-sm font-semibold hover:bg-accent transition-colors border border-primary/30">
            {saleType === 'auction' ? 'Place Bid' : 'Buy Now'}
          </button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <p className="text-xs text-foreground/50 font-terminal uppercase tracking-wide">{collection}</p>
          <h3 className="font-terminal font-semibold text-foreground line-clamp-1">{title}</h3>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/30">
          <div className="space-y-1">
            <p className="text-xs text-foreground/50 font-terminal">
              {saleType === 'auction' ? 'Highest Bid' : 'Price'}
            </p>
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-accent" />
              <span className="font-terminal font-bold text-primary">
                {price} <span className="text-xs text-foreground/60">{currency}</span>
              </span>
            </div>
          </div>

          {saleType === 'auction' ? (
            <div className="space-y-1 text-right">
              <p className="text-xs text-foreground/50 font-terminal">Bids</p>
              <p className="font-terminal font-bold text-foreground">{bids || 0}</p>
            </div>
          ) : (
            <div className="space-y-1 text-right">
              <p className="text-xs text-foreground/50 font-terminal">Listed</p>
              <p className="font-terminal text-sm text-accent">Available</p>
            </div>
          )}
        </div>

        {saleType === 'auction' && endTime && (
          <div className="flex items-center gap-2 text-xs text-foreground/60 pt-2 border-t border-border/30">
            <Clock className="w-3 h-3" />
            <span className="font-terminal">{endTime}</span>
          </div>
        )}
      </div>
    </div>
  );
}
