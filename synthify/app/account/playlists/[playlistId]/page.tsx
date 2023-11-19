import { FC } from "react";
import Header from "@/components/Header";
import { getPlaylistByPlaylistId } from "@/actions/getPlaylistByPlaylistId";
import { getSongBySongId } from "@/actions/getSongBySongId";
import MediaItem from "@/components/MediaItem";
import PlaylistDisplay from "./components/PlaylistView";

interface pageProps {
  params: {
    playlistId: string;
  };
}

const page: FC<pageProps> = async ({ params }) => {
  const [currentPlaylist] = await getPlaylistByPlaylistId(params.playlistId);
  const songs = await Promise.all(
    (JSON.parse(currentPlaylist.playlist_songs) as string[]).map(
      async (id: string) => {
        const [song] = await getSongBySongId(id);
        return song;
      }
    )
  );
  return (
    <div
      className='
        bg-neutral-900 
        rounded-lg 
        h-full 
        w-full 
        overflow-hidden 
        overflow-y-auto
      '
    >
      <PlaylistDisplay songs={songs} playlist={currentPlaylist} />
    </div>
  );
};

export default page;
