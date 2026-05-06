import type { Metadata } from 'next';
import Script from 'next/script';

import '@/app/globals.css';
import { APP_NAME, APP_DESCRIPTION } from '@/lib/constants';
import { Providers } from '@/components/providers';
import { Geist as V0_Font_Geist, Geist_Mono as V0_Font_Geist_Mono, Source_Serif_4 as V0_Font_Source_Serif_4 } from 'next/font/google'

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
  other: {
    'talentapp:project_verification': 'f852c861ff5f9c44a22268c45813a514f4b3ed243e578c56b594a423cc1012b5e3f43f2eccd49535c4829c9e04a2076d8de35531c0bfbe3793359324013cf9cf',
  },
};

// Initialize fonts with fallbacks
const _geist = V0_Font_Geist({ 
  subsets: ['latin'], 
  weight: ["100","200","300","400","500","600","700","800","900"],
  fallback: ['system-ui', 'arial'],
  display: 'swap'
})
const _geistMono = V0_Font_Geist_Mono({ 
  subsets: ['latin'], 
  weight: ["100","200","300","400","500","600","700","800","900"],
  fallback: ['ui-monospace', 'SFMono-Regular', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
  display: 'swap'
})
const _sourceSerif_4 = V0_Font_Source_Serif_4({ 
  subsets: ['latin'], 
  weight: ["200","300","400","500","600","700","800","900"],
  fallback: ['Georgia', 'Times New Roman', 'serif'],
  display: 'swap'
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager Script */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-02J7C1M1DN"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-02J7C1M1DN');
            `,
          }}
        />
      </head>
      <body className={`font-sans ${_geist.className} ${_geistMono.className}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
