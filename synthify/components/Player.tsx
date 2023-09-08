"use client";

import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";
import useGetSongById from "@/hooks/usegetSongById";
import { FC } from "react";
import PlayerContent from "./PlayerContent";

interface PlayerProps {}

const Player: FC<PlayerProps> = ({}) => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);

  const songUrl = useLoadSongUrl(song!);

  if (!song || !songUrl || !player.activeId) {
    return null;
  }

  return (
    <div
      className='
        fixed 
        bottom-0 
        bg-black 
        w-full 
        py-2 
        h-[80px] 
        px-4
      '
    >
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  );
};

export default Player;
