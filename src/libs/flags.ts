import { FeatureFlag } from '@/types';

export function getFlags(): FeatureFlag {
  return {
    seek: process.env.NEXT_PUBLIC_FLAG_SEEK === 'true',
    fader: process.env.NEXT_PUBLIC_FLAG_FADER === 'true',
    volume: process.env.NEXT_PUBLIC_FLAG_VOLUME === 'true',
  };
}
