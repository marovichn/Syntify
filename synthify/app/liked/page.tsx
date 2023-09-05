import { FC } from "react";
import SearchContent from "../search/components/SearchContent";
import Header from "@/components/Header";

interface searchPageProps {}

const searchPage: FC<searchPageProps> = async ({}) => {
  return (
    <div className='bg-neutral-900 rounded-xl h-full -w-full overflow-hidden overflow-y-auto'>
      <Header className='from-white via-blue-700 to-neutral-900 pb-16'>
        <div className='mb-2 flex flex-col gap-y-6'>
          <h1 className=' mt-5  font-extrabold text-transparent min-[0px]:max-sm:text-4xl text-6xl bg-clip-text bg-gradient-to-r from-white to-white pb-3'>
            Liked Songs Playlist
          </h1>
        </div>
      </Header>
    </div>
  );
};

export default searchPage;
