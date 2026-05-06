'use client';

import { useRouter } from 'next/navigation';

export default function DocsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
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

      {/* Main Content */}
      <section className="relative z-10 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Title */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-2">Documentation</h1>
            <p className="text-muted-foreground">Learn about Reauction and how it works</p>
          </div>

          {/* Content */}
          <div className="space-y-8 prose prose-invert max-w-none">
            {/* What is Reauction */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">What is Reauction?</h2>
              <p className="text-foreground/90 leading-relaxed">
                Reauction is a marketplace for Farcaster cast collectibles — a place where the social web meets true digital ownership.
              </p>
            </div>

            {/* Background */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">A Bit of Background</h3>
              <p className="text-foreground/90 leading-relaxed mb-4">
                Farcaster, the decentralized social protocol, introduced a feature that lets users collect casts (posts) from other users. When a cast is published, anyone can participate in an auction, and the winner receives the cast as a verifiable on-chain collectible — essentially owning a piece of someone's social history.
              </p>
              <p className="text-foreground/90 leading-relaxed mb-4">
                It's a meaningful feature. But once you win that collectible, you hit a wall. There's nowhere to go with it. You can't sell it, trade it, or pass it on. The collectible just sits there.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                That's the problem Reauction solves.
              </p>
            </div>

            {/* What Reauction Does */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">What Reauction Does</h3>
              <p className="text-foreground/90 leading-relaxed mb-6">
                Reauction is the secondary marketplace for Farcaster cast collectibles. It gives collectors a destination — somewhere to bring their collectibles and actually do something with them.
              </p>
              <p className="text-foreground/90 leading-relaxed mb-6">
                If you own a cast collectible and want to sell it, you can list it on Reauction in one of two ways:
              </p>

              <div className="space-y-4 mb-6">
                <div className="pl-4 border-l-2 border-primary">
                  <h4 className="font-semibold text-foreground mb-2">Auction listing</h4>
                  <p className="text-foreground/90">
                    Start an auction and let the market decide. Other users can place bids, and when the auction closes, the highest bidder wins the collectible.
                  </p>
                </div>

                <div className="pl-4 border-l-2 border-primary">
                  <h4 className="font-semibold text-foreground mb-2">Fixed listing</h4>
                  <p className="text-foreground/90">
                    Set a price and sell directly. No waiting, no bidding — just a straightforward sale to the first buyer who wants it.
                  </p>
                </div>
              </div>

              <p className="text-foreground/90 leading-relaxed">
                On the other side, if you're looking to acquire collectibles from creators or moments you care about, Reauction is where you come to browse, bid, and buy.
              </p>
            </div>

            {/* Why It Matters */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Why It Matters</h3>
              <p className="text-foreground/90 leading-relaxed mb-4">
                Cast collectibles are more than just digital memorabilia. They represent a moment in the social graph — a post from a creator you follow, a viral take, a first post from someone who later became well-known. As Farcaster grows, the cultural and speculative value of these collectibles will only grow with it.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                Reauction exists to make that value liquid. It creates a real market where collectibles can find their right owners, and where holding a Farcaster cast collectible means something beyond just winning an original auction.
              </p>
            </div>

            {/* CTA */}
            <div className="pt-8 border-t border-border/50">
              <h3 className="text-xl font-bold text-foreground mb-4">Ready to start?</h3>
              <p className="text-foreground/90 leading-relaxed mb-6">
                Browse available listings, or put your first collectible up for sale.
              </p>
              <button
                onClick={() => router.push('/')}
                className="px-6 py-3 bg-primary text-primary-foreground rounded font-medium hover:bg-primary-dark transition-colors"
              >
                Go to Marketplace
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 bg-card/30 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
            <div>
              <p className="font-bold text-primary text-lg">reauction</p>
              <p className="text-sm text-muted-foreground mt-1">Collectibles Marketplace on Farcaster</p>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="/docs" className="text-muted-foreground hover:text-primary transition-colors">Docs</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Twitter</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Discord</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
