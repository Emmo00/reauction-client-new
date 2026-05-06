import type { Metadata } from 'next';
import Marketplace from '@/components/Marketplace';
import { APP_NAME, APP_DESCRIPTION } from '@/lib/constants';
import { getMiniAppEmbedMetadata } from '@/lib/utils';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const embedMetadata = getMiniAppEmbedMetadata();
  
  return {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    openGraph: {
      title: APP_NAME,
      description: APP_DESCRIPTION,
      images: [embedMetadata.imageUrl],
    },
    other: {
      'fc:frame': JSON.stringify(embedMetadata),
      'fc:miniapp': JSON.stringify(embedMetadata),
    },
  };
}

export default function Home() {
  return <Marketplace />;
}
