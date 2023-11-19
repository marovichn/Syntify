import { getSongsByUserId } from '@/actions/getSongsByUserId';
import Library from '@/components/Library'
import { FC } from 'react'
import AccountLibrary from './components/AccountLibrary';
import Header from '@/components/Header';
import { getPlaylistsByUserId } from '@/actions/getPlaylistsByUserId';

interface pageProps {
  
}

const page: FC<pageProps> =async ({}) => {
  const userSongs = await getSongsByUserId();
  const playlists = await getPlaylistsByUserId();
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
      <Header>
        <></>
      </Header>
      <AccountLibrary playlists={playlists} songs={userSongs}></AccountLibrary>
    </div>
  );
}

export default page