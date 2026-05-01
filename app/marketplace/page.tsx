'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FaultyTerminal from '@/components/FaultyTerminal';
import { APP_NAME, APP_DESCRIPTION } from '@/lib/constants';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="relative w-full min-h-screen bg-background overflow-hidden">
      {/* FaultyTerminal Background Effect */}
      {mounted && (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
          <FaultyTerminal
            scale={1.2}
            gridMul={[2, 1]}
            digitSize={1}
            timeScale={1}
            scanlineIntensity={0.15}
            glitchAmount={0.3}
            flickerAmount={0.2}
            noiseAmp={0.15}
            tint="#8b5cf6"
            mouseReact={false}
            pageLoadAnimation={true}
            brightness={0.4}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              {APP_NAME}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              {APP_DESCRIPTION}
            </p>
          </div>

          <div className="space-y-4 pt-8">
            <p className="text-lg text-foreground/80">
              Resell your Farcaster Collectible Casts with ease
            </p>
            <button 
              onClick={() => router.push('/marketplace')}
              className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary-dark transition-colors duration-200 font-medium"
            >
              Enter Marketplace
            </button>
          </div>

          <div className="pt-12 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div className="p-4 rounded-lg bg-card/50 border border-border">
              <div className="text-primary font-semibold">List</div>
              <div className="text-muted-foreground text-xs">Sell your items</div>
            </div>
            <div className="p-4 rounded-lg bg-card/50 border border-border">
              <div className="text-primary font-semibold">Bid</div>
              <div className="text-muted-foreground text-xs">Place auctions</div>
            </div>
            <div className="p-4 rounded-lg bg-card/50 border border-border">
              <div className="text-primary font-semibold">Earn</div>
              <div className="text-muted-foreground text-xs">Get rewards</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
