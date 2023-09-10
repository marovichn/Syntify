"use client";

import useLoadImage from "@/hooks/useLoadImage";
import usePlayer from "@/hooks/usePlayer";
import { Song } from "@/types";
import Image from "next/image";
import { FC } from "react";
import { FaPlay } from "react-icons/fa";

interface MediaItemProps {
  onClick?: (id: string) => void;
  data: Song;
  index?: number;
}

const MediaItem: FC<MediaItemProps> = ({ onClick, data, index }) => {
  const player = usePlayer();
  const imageUrl = useLoadImage(data);

  const handleClikc = () => {
    if (onClick) {
      return onClick(data.id);
    }

    return player.setId(data.id)
  };

  return (
    <div
      onClick={handleClikc}
      className='
        flex 
        items-center 
        gap-x-3 
        cursor-pointer 
        hover:bg-neutral-800/50 
        w-full 
        p-2
        pr-3 
        rounded-md
        group
      '
    >
      {index && (
        <div className='block'>
          <div className='w-12 items-center justify-center flex h-12 rounded-md min-w-12'>
            <div className='group-hover:hidden font-semibold text-gray-500 mt-[2px] '>
              {index}
            </div>
            <FaPlay className='group-hover:block hidden' />
          </div>
        </div>
      )}
      <div
        className='
          relative 
          rounded-md 
          min-h-[48px] 
          min-w-[48px] 
          overflow-hidden
        '
      >
        <Image
          fill
          src={imageUrl || "/images/music-placeholder.png"}
          alt='MediaItem'
          className='object-cover'
        />
      </div>
      <div className='flex flex-col gap-y-1 overflow-hidden'>
        <p className='text-white truncate'>{data.title}</p>
        <p className='text-neutral-400 text-sm truncate'>
          Song • By {data.author}
        </p>
      </div>
    </div>
  );
};

export default MediaItem;
