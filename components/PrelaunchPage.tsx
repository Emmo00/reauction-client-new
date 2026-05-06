'use client';

import { useState } from 'react';
import FaultyTerminal from '@/components/FaultyTerminal';
import JoinWaitlistButton from '@/components/JoinWaitlistButton';
import JoinWaitlistSuccess from '@/components/JoinWaitlistSuccess';
import JoinWaitlistFailed from '@/components/JoinWaitlistFailed';

export default function PrelaunchPage() {
  const [joinWaitlistSuccess, setJoinWaitlistSuccess] = useState(false);
  const [joinWaitlistFailed, setJoinWaitlistFailed] = useState(false);
  const [joinWaitlistErrorMessage, setJoinWaitlistErrorMessage] = useState<string | undefined>(undefined);
  const [retryJoinWaitlist, setRetryJoinWaitlist] = useState<() => Promise<boolean>>(() => Promise.resolve(false));
  const [isRetryingJoinWaitlist, setIsRetryingJoinWaitlist] = useState(false);

  const handleJoinWaitlistFailed = (error: string, onRetry: () => Promise<boolean>, isRetrying: boolean) => {
    setJoinWaitlistErrorMessage(error);
    setRetryJoinWaitlist(() => onRetry);
    setIsRetryingJoinWaitlist(isRetrying);
    setJoinWaitlistFailed(true);
  };

  if (joinWaitlistSuccess) {
    return <JoinWaitlistSuccess />;
  }

  if (joinWaitlistFailed) {
    return (
      <JoinWaitlistFailed
        errorMessage={joinWaitlistErrorMessage}
        onRetry={retryJoinWaitlist}
        isRetrying={isRetryingJoinWaitlist}
      />
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* FaultyTerminal Background */}
      <div className="absolute inset-0">
        <div className="relative h-full w-full opacity-25">
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
            tint="#8b5cf6"
            mouseReact={true}
            mouseStrength={0.5}
            pageLoadAnimation={false}
            brightness={1}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative flex min-h-screen flex-col items-center justify-center px-4">
        <div className="absolute bottom-12 left-4 space-y-4 sm:left-8">
          <h1 className="text-balance font-sans text-5xl font-bold leading-tight tracking-tight text-white">
            Resell and Auction
            <br /> Your Cast
            <br />
            Collectibles
          </h1>

          <p className="text-pretty font-sans leading-relaxed text-gray-200 max-w-lg">
            Give your collectibles a second life. Earn by reselling or auctioning your Farcaster NFTs.
          </p>

          <div className="pt-4">
            <JoinWaitlistButton
              setJoinWaitlistSuccess={() => setJoinWaitlistSuccess(true)}
              setJoinWaitlistFailed={handleJoinWaitlistFailed}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
