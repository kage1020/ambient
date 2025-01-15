import { atomWithStorage } from 'jotai/utils';
import { defaultOption } from '@/const';
import { PlaylistOption } from '@/types';

type PlayerAtomType = {
  playing: boolean;
  duration: number;
  volume: number;
  options: PlaylistOption;
};

export const playerAtom = atomWithStorage<PlayerAtomType>(
  'ambient.player',
  {
    playing: false,
    duration: 0,
    volume: 1,
    options: defaultOption,
  },
  undefined,
  { getOnInit: true }
);
