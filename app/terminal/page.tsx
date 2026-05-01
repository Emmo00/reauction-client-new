'use client';

import { useState, useEffect } from 'react';
import FaultyTerminal from '@/components/FaultyTerminal';


export default function Marketplace() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setMounted(true);
        }, 1000);
    }, []);

    return (
        <div className="min-h-screen bg-background">
            {/* FaultyTerminal Background */}
            <div className="absolute inset-0">
                {mounted && (
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
                )}
            </div>

            hii

            <p>hellp</p>
        </div>
    );
}
