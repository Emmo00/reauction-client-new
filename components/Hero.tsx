'use client';

import { useEffect, useState } from 'react';
import FaultyTerminal from './FaultyTerminal';
import { ArrowRight, Zap } from 'lucide-react';

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {mounted && (
        <div className="absolute inset-0 z-0">
          <FaultyTerminal
            scale={1.2}
            gridMul={[2, 1]}
            digitSize={1.2}
            timeScale={0.4}
            scanlineIntensity={0.2}
            glitchAmount={0.8}
            flickerAmount={0.5}
            noiseAmp={0.3}
            tint="#00d9ff"
            mouseReact={false}
            pageLoadAnimation={true}
            brightness={0.6}
          />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-7xl font-terminal font-bold text-primary drop-shadow-lg">
              <span className="animate-neon-glow">reauction</span>
            </h1>
            <p className="text-xl sm:text-2xl text-foreground/80 font-terminal">
              Terminal-Grade NFT Trading on Farcaster
            </p>
          </div>

          <p className="max-w-2xl mx-auto text-lg text-foreground/70 leading-relaxed">
            Experience the next generation of decentralized NFT commerce. Seamless auctions, instant trades, 
            and complete transparency—all within your Farcaster ecosystem.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <button className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-sm font-terminal font-semibold text-base hover:bg-accent transition-all border border-primary/30 hover:border-accent/50 hover:shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2">
              <span>Launch Marketplace</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-transparent text-primary rounded-sm font-terminal font-semibold text-base border border-primary/50 hover:border-primary hover:bg-primary/5 transition-all">
              Learn More
            </button>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-16 text-center">
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl font-terminal text-accent font-bold">2</div>
              <p className="text-sm text-foreground/60">Sale Modes</p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl font-terminal text-accent font-bold">∞</div>
              <p className="text-sm text-foreground/60">Possibilities</p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl font-terminal text-accent font-bold">↵</div>
              <p className="text-sm text-foreground/60">On-Chain</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
