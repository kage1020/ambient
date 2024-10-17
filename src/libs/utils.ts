import { Media } from '@/types';

class Random {
  x = 123456789;
  y = 362436069;
  z = 521288629;
  w: number;

  constructor(seed: number) {
    this.w = seed;
  }

  next() {
    const t = this.x ^ (this.x << 11);
    this.x = this.y;
    this.y = this.z;
    this.z = this.w;
    this.w = this.w ^ (this.w >> 19) ^ t ^ (t >> 8);
    return this.w;
  }
}

export function shuffleMedia(mediaList: Media[], seed?: number): Media[] {
  const random = new Random(seed || 0);
  return mediaList
    .map((m) => ({ ...m, r: random.next() }))
    .sort((a, b) => a.r - b.r)
    .map((m) => ({ ...m, r: undefined }));
}

export function scrollIntoView(element: HTMLElement | null) {
  if (!element) return;

  const rect = element.getBoundingClientRect();
  element.parentElement?.scrollTo({
    top: element.offsetTop - (window.innerHeight - rect.height) / 2,
    behavior: 'smooth',
  });
}

export function debounce<T extends (...args: any[]) => any>(fn: T, delay = 300) {
  let timer: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      return fn(...args);
    }, delay);
  };
}
