'use client';

import FaultyTerminal from "@/components/FaultyTerminal";

export default function JoinWaitlistSuccess() {
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
            tint="#8b5cf6"
            mouseReact={true}
            mouseStrength={0.5}
            pageLoadAnimation={false}
            brightness={1}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-4 px-4">
        <h1 className="text-4xl font-bold text-primary">🎉 Success!</h1>
        <p className="text-foreground text-lg">
          You've been added to the waitlist.
        </p>
        <p className="text-muted-foreground">
          We'll notify you when Reauction launches.
        </p>
      </div>
    </div>
  );
}
