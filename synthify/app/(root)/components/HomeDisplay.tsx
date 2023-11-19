"use client";

import { Playlist, Song } from "@/types";
import { FC } from "react";
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import PageContent from "@/app/(root)/components/PageContent";
import CopyRights from "@/components/CopyRights";
import useLoadImage from "@/hooks/useLoadImage";
import { twMerge } from "tailwind-merge";
import usePlayer from "@/hooks/usePlayer";

interface HomeDisplayProps {
  songs: Song[];
  playlists: Playlist[];
}

const HomeDisplay: FC<HomeDisplayProps> = ({ songs, playlists }) => {
  const player = usePlayer();

  return (
    <div
      className={twMerge(
        "bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto min-[0px]:max-md:w-[97%] min-[0px]:max-md:mx-auto",
        player.activeId && " max-md:h-[calc(100%-55px)]"
      )}
    >
      <Header>
        <div className='mb-2'>
          <h1 className='mt-6 font-extrabold text-transparent min-[0px]:max-sm:text-4xl text-6xl bg-clip-text bg-gradient-to-r from-white to-white pb-4'>
            Welcome back
          </h1>
          <div
            className='
              grid 
              grid-cols-1 
              sm:grid-cols-2 
              xl:grid-cols-3 
              2xl:grid-cols-4 
              gap-3 
              mt-4
            '
          >
            <ListItem
              name='Liked Songs'
              image='/images/like.png'
              href='liked'
            />
            {playlists &&
              playlists.map(async (playlist) => {
                return (
                  <ListItem
                    key={playlist.id}
                    name={playlist.title}
                    image={playlist.image_path}
                    href={`/account/playlists/${playlist.id}`}
                    playlist={playlist}
                  />
                );
              })}
            <ListItem
              name='Your Library'
              image='/images/like.png'
              href='/account/my-library'
              library
            />
          </div>
        </div>
      </Header>
      <div className='mt-2 mb-7  px-6'>
        <div className='flex justify-between items-center'>
          <h1 className='text-white text-3xl font-semibold'>Newest songs</h1>
        </div>
        <PageContent songs={songs} />
      </div>
      <CopyRights />
    </div>
  );
};

export default HomeDisplay;
