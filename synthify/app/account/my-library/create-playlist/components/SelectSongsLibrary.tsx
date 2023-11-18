"use client";

import { FC, useState } from "react";
import { TbPlaylist } from "react-icons/tb";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import { Song } from "@/types";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import useSubscriptionModal from "@/hooks/useSubscriptionModal";
import { useRouter } from "next/navigation";
import SelectButton from "./SelectButton";

interface SelectSongsLibraryProps {
  songs: Song[];
}

const SelectSongsLibrary: FC<SelectSongsLibraryProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  if (songs.length === 0) {
    return (
      <div
        className='
          flex 
          flex-col 
          gap-y-2 
          w-full 
          px-6 
          text-neutral-400
        '
      >
        No songs found.
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
        <div className='inline-flex items-center gap-x-2'>
          <TbPlaylist size={26} className='text-neutral-400' />
          <p className='text-neutral-400 font-bold text-md'>
            Select songs from your library
          </p>
        </div>
      </div>
      <div className='flex flex-col gap-y-2 mt-4'>
        {songs.map((song) => (
          <div key={song.id} className='flex items-center gap-x-4 w-full'>
            <div className='flex-1'>
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
    </div>
  );
};

export default SelectSongsLibrary;
