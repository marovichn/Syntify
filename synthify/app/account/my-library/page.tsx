import { getSongsByUserId } from '@/actions/getSongsByUserId';
import Library from '@/components/Library'
import { FC } from 'react'
import AccountLibrary from './components/AccountLibrary';

interface pageProps {
  
}

const page: FC<pageProps> =async ({}) => {
  const userSongs = await getSongsByUserId();
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
      <AccountLibrary songs={userSongs}></AccountLibrary>
    </div>
  );
}

export default page