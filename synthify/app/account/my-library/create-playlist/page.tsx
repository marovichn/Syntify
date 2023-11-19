import Header from "@/components/Header";
import { FC } from "react";
import PlaylistInput from "./components/PlaylistInput";
import { getSongsByUserId } from "@/actions/getSongsByUserId";
import { getSongsByTitle } from "@/actions/getSongsByTitle";

interface pageProps {
  searchParams: {
    title: string;
  };
}

const page: FC<pageProps> = async ({ searchParams }) => {
  const songs = await getSongsByTitle(searchParams.title);

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
      <Header className='from-blue-600 '>
        <div className='mb-2 flex flex-col gap-y-6'>
          <h1 className='mt-5 font-extrabold text-transparent min-[0px]:max-sm:text-4xl text-6xl bg-clip-text bg-gradient-to-r from-white to-white'>
            Create Playlist
          </h1>
        </div>
      </Header>
      <div className=' px-8 py-5'>
        <PlaylistInput songs={songs}></PlaylistInput>
      </div>
    </div>
  );
};

export default page;
