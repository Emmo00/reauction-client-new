'use client';

import Link from 'next/link';
import { Zap } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Zap className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="font-terminal font-bold text-lg text-primary">reauction</span>
        </Link>
        
        <nav className="flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
            Browse
          </Link>
          <Link href="/portfolio" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
            Portfolio
          </Link>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-sm font-terminal font-medium text-sm hover:bg-accent transition-colors border border-primary/30">
            Connect
          </button>
        </nav>
      </div>
    </header>
  );
}
