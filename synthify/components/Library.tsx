"use client";

import { FC } from "react";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import { Song } from "@/types";
import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import useSubscriptionModal from "@/hooks/useSubscriptionModal";
import { BiArrowFromLeft } from "react-icons/bi";
import Button from "./Button";
import { useRouter } from "next/navigation";

interface LibraryProps {
  songs: Song[];
}

const Library: FC<LibraryProps> = ({ songs }) => {
  const subscribeModal = useSubscriptionModal();
  const onPlay = useOnPlay(songs);
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const router = useRouter()
  const { user, subscription } = useUser();

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (!subscription) {
      return subscribeModal.onOpen();
    }

    return uploadModal.onOpen();
  };

  return (
    <div className='flex flex-col'>
      <div
        onClick={() => router.push("/account/my-library")}
        className='flex items-center justify-between px-5 pt-4 cursor-pointer hover:text-white group'
      >
        <div className='inline-flex items-center gap-x-2 '>
          <TbPlaylist
            size={26}
            className='text-neutral-400 group-hover:text-white'
          />
          <p className='text-neutral-400 font-bold text-md group-hover:text-white'>
            Your Library
          </p>
        </div>
        <BiArrowFromLeft
          className='text-neutral-400 group-hover:text-white'
          size={25}
        />
      </div>
      <div className='flex flex-col gap-y-2 mt-4 px-3 pb-5'>
        <div className='flex flex-col gap-y-1 px-1'>
          {songs.slice(0, 8).map((song) => (
            <MediaItem
              onClick={(id: string) => onPlay(id)}
              key={song.id}
              data={song}
            />
          ))}
        </div>
        <Button
          onClick={() => router.push("/account/my-library")}
          className='mt-5 bg-neutral-700  hover:bg-neutral-500'
        >
          See all
        </Button>
      </div>
    </div>
  );
};

export default Library;
