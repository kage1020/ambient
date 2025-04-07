'use client';

import { useEffect, useState } from 'react';
import { Button, Label, Select, TextInput } from 'flowbite-react';
import { HiTrash as TrashIcon } from 'react-icons/hi';
import { usePlayer } from '@/hooks/use-player';
import { useTranslation } from '@/hooks/use-translation';
import { theme } from '@/libs/tw';

type PlaylistSelectProps = {
  selectedPlaylistName: string | null;
  playlistNames: string[];
};

export function PlaylistSelect({ selectedPlaylistName, playlistNames }: PlaylistSelectProps) {
  const { remotePlaylists, selectPlaylist, setRemotePlaylists } = usePlayer();
  const [url, setUrl] = useState('');
  const t = useTranslation();

  const deleteRemotePlaylist = (playlist: string) => {
    setRemotePlaylists(remotePlaylists.filter((p) => p !== playlist));
    setUrl('');
    selectPlaylist('');
  };

  useEffect(() => {
    if (selectedPlaylistName?.startsWith('http')) {
      setUrl(selectedPlaylistName);
    }
  }, [selectedPlaylistName]);

  return (
    <div className='p-4 space-y-2'>
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
        value={selectedPlaylistName || t['Choose a playlist']}
        onChange={(e) => selectPlaylist(e.target.value)}
      >
        <option disabled>{t['Choose a playlist']}</option>
        {[...playlistNames, ...remotePlaylists].map((p, i) => (
          <option key={i} value={p}>
            {p}
          </option>
        ))}
      </Select>
      <div className='flex items-center space-x-2'>
        <TextInput
          className='flex-1'
          placeholder={t['Input playlist URL']}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onBlur={() => selectPlaylist(url)}
        />
        <Button
          color='red'
          size='xs'
          onClick={() => deleteRemotePlaylist(url)}
          theme={theme('button', {
            color: {
              red: 'dark:bg-transparent',
            },
          })}
        >
          <TrashIcon size={24} />
        </Button>
      </div>
    </div>
  );
}
