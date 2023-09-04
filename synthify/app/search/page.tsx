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
          <h1 className='text-white text-4xl font-extrabold'>Search</h1>
          <SearchInput />
        </div>
      </Header>
      <SearchContent songs={songs}/>
    </div>
  );
};

export default searchPage;
