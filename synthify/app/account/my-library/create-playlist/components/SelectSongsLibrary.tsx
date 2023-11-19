"use client";

import { FC, useState } from "react";
import { TbPlaylist } from "react-icons/tb";
import { Song } from "@/types";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import SelectButton from "./SelectButton";
import PlaylistSearch from "./PlaylistSearch";
import Button from "@/components/Button";

interface SelectSongsLibraryProps {
  songs: Song[];
  isLoading: boolean;
  onPassSelectedIds: (ids: string[]) => void;
}

const SelectSongsLibrary: FC<SelectSongsLibraryProps> = ({
  songs,
  isLoading,
  onPassSelectedIds,
}) => {
  const onPlay = useOnPlay(songs);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  if (songs.length === 0) {
    return (
      <div className='flex flex-col'>
        <div className='flex items-center justify-between'>
          <div className='flex items-start gap-x-2 flex-col gap-y-3 w-full'>
            <div className='flex items-center justify-start gap-x-2'>
              <TbPlaylist size={26} className='text-neutral-400' />
              <p className='text-neutral-400 font-bold text-md'>
                Select songs from your library
              </p>
            </div>
            <div className='w-full'>
              <PlaylistSearch playlist></PlaylistSearch>
            </div>
          </div>
        </div>
        <div className='flex items-center justify-center pt-8'>
          No songs found :(
        </div>
      </div>
    );
  }

  const handleSelection = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds((prev) => prev.filter((itemId) => itemId !== id));
    } else {
      setSelectedIds((prev) => [...prev, id]);
    }
  };

  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between'>
        <div className='flex items-start gap-x-2 flex-col gap-y-3 w-full'>
          <div className='flex items-center justify-start gap-x-2'>
            <TbPlaylist size={26} className='text-neutral-400' />
            <p className='text-neutral-400 font-bold text-md'>
              Select songs from your library
            </p>
          </div>
          <div className='w-full'>
            <PlaylistSearch playlist></PlaylistSearch>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-y-2 mt-4'>
        {songs.map((song) => (
          <div
            key={song.id}
            className='flex items-center gap-x-4 w-full justify-between'
          >
            <div
              className='
          max-md:w-[300px]'
            >
              <MediaItem onClick={(id: string) => onPlay(id)} data={song} />
            </div>
            <SelectButton
              selected={selectedIds.includes(song.id)}
              onSelected={(id) => handleSelection(id)}
              songId={song.id}
            />
          </div>
        ))}
      </div>
      <Button
        disabled={isLoading}
        onClick={() => onPassSelectedIds(selectedIds)}
        type='submit'
        className='bg-blue-700 mt-4'
      >
        Create Playlist
      </Button>
    </div>
  );
};

export default SelectSongsLibrary;
