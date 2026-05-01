'use client';

import { useState } from 'react';
import { X, Upload } from 'lucide-react';
import FaultyTerminal from './FaultyTerminal';

interface CreateListingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateListingModal({ isOpen, onClose }: CreateListingModalProps) {
  const [saleType, setSaleType] = useState<'auction' | 'fixed'>('fixed');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    startPrice: '',
    endDate: '',
    royalty: '10',
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with terminal effect */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-0">
        <div className="absolute inset-0 opacity-15">
          <FaultyTerminal
            scale={2}
            gridMul={[3, 2]}
            digitSize={1.5}
            timeScale={0.3}
            scanlineIntensity={0.15}
            glitchAmount={0.6}
            flickerAmount={0.3}
            noiseAmp={0.2}
            tint="#00d9ff"
            mouseReact={false}
            pageLoadAnimation={false}
            brightness={0.3}
          />
        </div>
      </div>

      {/* Modal Content */}
      <div className="relative z-10 bg-card border border-primary/40 rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto terminal-glow">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-card/95 backdrop-blur-sm">
          <h2 className="font-terminal font-bold text-xl text-foreground">Create Listing</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-primary/10 rounded-sm transition-colors border border-border/50"
          >
            <X className="w-5 h-5 text-foreground/60" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Sale Type Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-terminal font-semibold text-foreground">Sale Type</label>
            <div className="flex gap-3">
              {(['fixed', 'auction'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setSaleType(type)}
                  className={`flex-1 px-4 py-3 rounded-sm font-terminal font-medium transition-all border ${
                    saleType === type
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-muted/30 text-foreground border-border hover:border-primary'
                  }`}
                >
                  {type === 'fixed' ? 'Fixed Price' : 'Auction'}
                </button>
              ))}
            </div>
          </div>

          {/* NFT Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-terminal font-semibold text-foreground">NFT Image</label>
            <div className="border-2 border-dashed border-border rounded-sm p-8 text-center hover:border-primary transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-foreground/40 mx-auto mb-3" />
              <p className="font-terminal text-sm text-foreground/70">Drag and drop or click to upload</p>
              <p className="text-xs text-foreground/50 mt-1">PNG, JPG, GIF up to 100MB</p>
            </div>
          </div>

          {/* Title and Description */}
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-terminal font-semibold text-foreground">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="NFT title"
              className="w-full px-4 py-2 bg-input border border-border rounded-sm font-terminal focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-terminal font-semibold text-foreground">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your NFT..."
              rows={4}
              className="w-full px-4 py-2 bg-input border border-border rounded-sm font-terminal focus:outline-none focus:border-primary transition-colors resize-none"
            />
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-2 gap-4">
            {saleType === 'fixed' ? (
              <div className="space-y-2">
                <label htmlFor="price" className="block text-sm font-terminal font-semibold text-foreground">Price (ETH)</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  className="w-full px-4 py-2 bg-input border border-border rounded-sm font-terminal focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <label htmlFor="startPrice" className="block text-sm font-terminal font-semibold text-foreground">Start Price (ETH)</label>
                  <input
                    type="number"
                    id="startPrice"
                    name="startPrice"
                    value={formData.startPrice}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    className="w-full px-4 py-2 bg-input border border-border rounded-sm font-terminal focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="endDate" className="block text-sm font-terminal font-semibold text-foreground">End Date</label>
                  <input
                    type="datetime-local"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-input border border-border rounded-sm font-terminal focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </>
            )}
          </div>

          {/* Royalty */}
          <div className="space-y-2">
            <label htmlFor="royalty" className="block text-sm font-terminal font-semibold text-foreground">Creator Royalty %</label>
            <input
              type="number"
              id="royalty"
              name="royalty"
              value={formData.royalty}
              onChange={handleChange}
              min="0"
              max="50"
              step="0.1"
              className="w-full px-4 py-2 bg-input border border-border rounded-sm font-terminal focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6 border-t border-border">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-sm font-terminal font-semibold hover:bg-accent transition-colors border border-primary/30"
            >
              Create Listing
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-transparent text-foreground rounded-sm font-terminal font-semibold border border-border hover:bg-muted/30 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
