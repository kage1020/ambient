export class Random {
  x = 123456789;
  y = 362436069;
  z = 521288629;
  w: number;

  constructor(seed: number) {
    this.w = Math.abs(Math.floor(seed));
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
