import { atomWithStorage } from 'jotai/utils';
import { Media } from '@/types';

type PlaylistAtomType = {
  name: string;
  category: string;
  index: number;
  items: Media[];
};

export const playlistAtom = atomWithStorage<PlaylistAtomType>(
  'ambient.playlist',
  {
    name: '',
    category: '',
    index: -1,
    items: [],
  },
  undefined,
  { getOnInit: true }
);
