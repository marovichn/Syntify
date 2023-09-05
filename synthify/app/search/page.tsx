import { getSongsByTitle } from "@/actions/getSongsByTitle";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import { FC } from "react";
import SearchContent from "./components/SearchContent";

interface searchPageProps {
  searchParams: {
    title: string;
  };
}

const searchPage: FC<searchPageProps> = async ({ searchParams }) => {
  const songs = await getSongsByTitle(searchParams.title);

  return (
    <div className='bg-neutral-900 rounded-xl h-full -w-full overflow-hidden overflow-y-auto'>
      <Header className='from-blue-600 '>
        <div className='mb-2 flex flex-col gap-y-6'>
          <h1 className='mt-5 font-extrabold text-transparent min-[0px]:max-sm:text-4xl text-6xl bg-clip-text bg-gradient-to-r from-white to-white'>
            Search
          </h1>
          <SearchInput />
        </div>
      </Header>
      <SearchContent songs={songs} />
    </div>
  );
};

export default searchPage;
