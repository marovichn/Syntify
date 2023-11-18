"use client";

import { FC } from "react";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import { Song } from "@/types";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import useSubscriptionModal from "@/hooks/useSubscriptionModal";
import { BiListPlus } from "react-icons/bi";
import { useRouter } from "next/navigation";

interface AccountLibraryProps {
  songs: Song[];
}

const AccountLibrary: FC<AccountLibraryProps> = ({ songs }) => {
  const subscribeModal = useSubscriptionModal();
  const onPlay = useOnPlay(songs);
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user, subscription } = useUser();
  const router = useRouter();

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (!subscription) {
      return subscribeModal.onOpen();
    }

    return uploadModal.onOpen();
  };
  const onPlaylistClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (!subscription) {
      return subscribeModal.onOpen();
    }

    router.push("/account/my-library/create-playlist")
  };

  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between px-5 pt-4'>
        <div className='inline-flex items-center gap-x-2'>
          <TbPlaylist size={26} className='text-neutral-400' />
          <p className='text-neutral-400 font-bold text-md'>
            Your Account Library
          </p>
        </div>
        <div className='flex items-center justify-center gap-x-2'>
          <AiOutlinePlus
            onClick={onClick}
            size={20}
            className='text-neutral-400 cursor-pointer hover:text-white transition'
          />
          <BiListPlus
            onClick={onPlaylistClick}
            size={29}
            className='text-neutral-400 cursor-pointer hover:text-white transition'
          />
        </div>
      </div>
      <div className='flex flex-col gap-y-2 mt-4 px-3'>
        {songs.map((song) => (
          <MediaItem
            onClick={(id: string) => onPlay(id)}
            key={song.id}
            data={song}
          />
        ))}
      </div>
    </div>
  );
};

export default AccountLibrary;
