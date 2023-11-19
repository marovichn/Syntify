"use client";

import { FC, useState } from "react";
import { TbPlaylist, TbPlaylistAdd } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import { Playlist, Song } from "@/types";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import useSubscriptionModal from "@/hooks/useSubscriptionModal";
import { BiListPlus } from "react-icons/bi";
import { useRouter } from "next/navigation";
import PlaylistItem from "./PlaylistItem";
import Button from "@/components/Button";

interface AccountLibraryProps {
  songs: Song[];
  playlists: Playlist[];
}

const AccountLibrary: FC<AccountLibraryProps> = ({ songs, playlists }) => {
  const [songView, setSongView] = useState(true);
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

    router.push("/account/my-library/create-playlist");
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
      <div className='px-6 pt-5 flex items-center justify-start gap-x-4'>
        <div
          onClick={() => setSongView(true)}
          className={
            songView
              ? "font-bold text-white cursor-pointer"
              : "text-gray-400 font-semibold cursor-pointer"
          }
        >
          My Songs
        </div>
        <div
          onClick={() => setSongView(false)}
          className={
            !songView
              ? "font-bold text-white cursor-pointer"
              : "text-gray-400 font-semibold cursor-pointer"
          }
        >
          My Playlists
        </div>
      </div>
      {songView && (
        <div className='flex flex-col gap-y-2 mt-4 px-3'>
          {songs.map((song) => (
            <MediaItem
              onClick={(id: string) => onPlay(id)}
              key={song.id}
              data={song}
            />
          ))}
        </div>
      )}
      {!songView && (
        <div className='flex flex-col gap-y-2 mt-4 px-3'>
          {playlists &&
            playlists.map((playlist) => (
              <PlaylistItem
                onClick={(id: string) =>
                  router.push(`/account/playlists/${id}`)
                }
                key={playlist.id}
                data={playlist}
              />
            ))}
          {!playlists ||
            (playlists.length === 0 && (
              <div className='px-3 flex flex-col items-start justify-start gap-y-5 w-[300px]'>
                No playlists
                <Button
                  className='flex items-center justify-center gap-x-2'
                  onClick={() =>
                    router.push("/account/my-library/create-playlist")
                  }
                >
                  <TbPlaylistAdd size={25} /> Create Playlist
                </Button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default AccountLibrary;
