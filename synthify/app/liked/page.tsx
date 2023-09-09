import { FC } from "react";
import Header from "@/components/Header";
import Image from "next/image";
import { getLikedSongs } from "@/actions/getLikedSongs";
import UserImage from "@/components/UserImage";
import LikedContent from "./components/LikedContent";
import CopyRights from "@/components/CopyRights";

interface searchPageProps {}

export const revalidate = 0;

const searchPage: FC<searchPageProps> =async ({}) => {
  const likedSongs = await getLikedSongs();
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
      <Header className='from-white via-blue-700 to-neutral-900'>
        <div className='mt-10 '>
          <div
            className='
              flex 
              flex-col 
              lg:flex-row 
              items-center 
              gap-x-5
            '
          >
            <div className='relative h-[325px] w-[325px] lg:h-44 lg:w-44'>
              <Image
                className='object-cover rounded-xl '
                fill
                src='/images/like.png'
                alt='Playlist'
              />
            </div>
            <div className='flex flex-col gap-y-2 mt-4 md:mt-0'>
              <p className='hidden lg:block font-semibold text-sm'>Playlist</p>
              <h1
                className='
                  text-white 
                  text-4xl 
                  sm:text-5xl 
                  lg:text-7xl 
                  font-bold
                  mt-5
                  text-center
                '
              >
                Liked Songs
              </h1>
              <UserImage/>
              <p className='hidden min-[0px]:max-lg:block font-normal text-sm text-center'>
                Playlist
              </p>
            </div>
          </div>
        </div>
      </Header>
      <LikedContent songs={likedSongs} />
      <CopyRights />
    </div>
  );
};

export default searchPage;
