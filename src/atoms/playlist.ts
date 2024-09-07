import { atom } from 'jotai';
import { defaultOption } from '@/const';
import { Media, PlaylistOption } from '@/types';

type PlaylistAtomType = {
  name: string;
  category: string;
  index: number;
  items: Media[];
  options: PlaylistOption;
};

export const playlistAtom = atom<PlaylistAtomType>({
  name: '',
  category: '',
  index: -1,
  items: [],
  options: defaultOption,
});
