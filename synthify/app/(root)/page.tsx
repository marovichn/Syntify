import { getSongs } from "@/actions/getSongs";
import { getPlaylistsByUserId } from "@/actions/getPlaylistsByUserId";
import HomeDisplay from "./components/HomeDisplay";

export const revalidate = 0;

const Home = async () => {
  const songs = await getSongs();
  const playlists = await getPlaylistsByUserId();

  return <HomeDisplay songs={songs} playlists={playlists}></HomeDisplay>;
};
export default Home;
