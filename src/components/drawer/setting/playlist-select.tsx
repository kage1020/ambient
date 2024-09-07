'use client';

import { Label, Select } from 'flowbite-react';
import usePlayer from '@/hooks/use-player';
import { LanguageTranslation } from '@/types';

type PlaylistSelectProps = {
  t: LanguageTranslation;
  playlists: string[];
};

export default function PlaylistSelect({ t, playlists }: PlaylistSelectProps) {
  const { selectPlaylist, playlistState } = usePlayer();

  return (
    <div className='p-4'>
      <Label htmlFor='current-playlist' className='block mb-2'>
        {t['Current Playlist']}
      </Label>
      <Select
        id='current-playlist'
        theme={{
          field: {
            select: {
              base: 'block w-full border disabled:cursor-not-allowed disabled:opacity-50',
              colors: {
                gray: 'focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
              },
            },
          },
        }}
        value={playlistState.name || t['Choose a playlist']}
        onChange={(e) => selectPlaylist(e.target.value)}
      >
        <option disabled>{t['Choose a playlist']}</option>
        {playlists.map((p, i) => (
          <option key={i} value={p}>
            {p}
          </option>
        ))}
      </Select>
    </div>
  );
}
