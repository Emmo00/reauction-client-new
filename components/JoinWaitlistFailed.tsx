'use client';

import { Button } from "@/components/ui/button";
import FaultyTerminal from "@/components/FaultyTerminal";

interface Props {
  errorMessage?: string;
  onRetry: () => Promise<boolean>;
  isRetrying: boolean;
}

export default function JoinWaitlistFailed({
  errorMessage,
  onRetry,
  isRetrying,
}: Props) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      {/* FaultyTerminal Background */}
      <div className="absolute inset-0">
        <div className="relative h-full w-full opacity-25 pointer-events-none">
          <FaultyTerminal
            className=""
            style={{}}
            scale={1.5}
            gridMul={[2, 1]}
            digitSize={1.2}
            timeScale={1}
            pause={false}
            scanlineIntensity={1}
            glitchAmount={1}
            flickerAmount={1}
            noiseAmp={1}
            chromaticAberration={0}
            dither={0}
            curvature={0}
            tint="#ef4444"
            mouseReact={true}
            mouseStrength={0.5}
            pageLoadAnimation={false}
            brightness={1}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-6 px-4 max-w-md">
        <h1 className="text-4xl font-bold text-red-500">⚠️ Error</h1>
        <div className="space-y-2">
          <p className="text-foreground text-lg">
            Failed to join the waitlist
          </p>
          {errorMessage && (
            <p className="text-muted-foreground text-sm">
              {errorMessage}
            </p>
          )}
        </div>

        <Button
          size="lg"
          onClick={onRetry}
          disabled={isRetrying}
          className="w-full"
        >
          {isRetrying ? "Retrying..." : "Try Again"}
        </Button>
      </div>
    </div>
  );
}
