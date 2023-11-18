"use client";

import { useEffect } from "react";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import qs from "query-string";
import Input from "./Input";
import { AiOutlineSearch } from "react-icons/ai";

interface SearchInputProps {}

const SearchInput: FC<SearchInputProps> = ({}) => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const debauncedValue = useDebounce<string>(value, 500);

  useEffect(() => {
    const query = {
      title: debauncedValue,
    };

    const url = qs.stringifyUrl({
      url: "/search",
      query: query,
    });

    router.push(url);
  }, [debauncedValue, router]);

  return (
    <div className='relative'>
      <AiOutlineSearch className='absolute top-[26%] left-4' size={22} />
      <Input
        placeholder='What do you want to listen to?'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className='bg-neutral-700/50 focus:outline focus:outline-1 focus:outline-blue-500/70 font-bold rounded-full pl-12'
      />
    </div>
  );
};

export default SearchInput;
