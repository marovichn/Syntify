"use client";

import { useEffect } from "react";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import qs from "query-string";
import Input from "@/components/Input";
import { AiOutlineSearch } from "react-icons/ai";

interface PlaylistSearchProps {
  playlist?: boolean;
}

const PlaylistSearch: FC<PlaylistSearchProps> = ({ playlist }) => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const debauncedValue = useDebounce<string>(value, 500);

  useEffect(() => {
    const query = {
      title: debauncedValue,
    };

    const url = qs.stringifyUrl({
      url: "/account/my-library/create-playlist/",
      query: query,
    });

    router.push(url);
  }, [debauncedValue, router]);

  return (
    <div className='relative'>
      <AiOutlineSearch className='absolute top-[26%] left-4' size={22} />
      <Input
        placeholder='Search for song name or an artist'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className='bg-neutral-700/50 focus:outline focus:outline-1 focus:outline-blue-500/70 font-bold rounded-full pl-12'
      />
    </div>
  );
};

export default PlaylistSearch;
