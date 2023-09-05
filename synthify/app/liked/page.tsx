import { FC } from "react";
import Header from "@/components/Header";
import Image from "next/image";
import { getLikedSongs } from "@/actions/getLikedSongs";
import UserImage from "@/components/UserImage";

interface searchPageProps {}

export const revalidate = 0;

const searchPage: FC<searchPageProps> = ({}) => {
  const likedSongs = getLikedSongs();

  return (
    <div className='bg-neutral-900 rounded-xl h-full -w-full overflow-hidden overflow-y-auto'>
      <Header className='from-white via-blue-700 to-neutral-900 pb-16'>
        <div className='mb-2 flex mt-8 gap-y-6'>
          <Image
            alt='like'
            height={200}
            width={200}
            className='rounded-xl'
            src='/images/like.jpg'
          />
          <div className='flex flex-col ml-8'>
            <p className='ml-1 text-lg'>Playlist</p>
            <h1 className=' mt-5  font-extrabold text-transparent min-[0px]:max-sm:text-4xl text-8xl bg-clip-text bg-gradient-to-r from-white to-white pb-3'>
              Liked Songs
            </h1>
            <div className='flex ml-1 mt-2 gap-x-4 items-center justify-start'>
              <UserImage/>
            </div>
          </div>
        </div>
      </Header>
    </div>
  );
};

export default searchPage;
