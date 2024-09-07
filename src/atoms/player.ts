import { atom } from 'jotai';

export const playerAtom = atom({
  playing: false,
  pending: false,
});
