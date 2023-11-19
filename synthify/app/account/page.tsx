"use client";

import Header from "@/components/Header";

import AccountContent from "./components/AccountContent";
import CopyRights from "@/components/CopyRights";
import usePlayer from "@/hooks/usePlayer";
import { twMerge } from "tailwind-merge";

const Account = () => {
  const player = usePlayer();
  return (
    <div
      className={twMerge(
        "bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto",
        player.activeId && " max-md:h-[calc(100%-55px)]"
      )}
    >
      <Header className='from-blue-700'>
        <div className='mb-2 flex flex-col gap-y-6 mt-10'>
          <h1 className='text-white text-5xl font-semibold'>
            Account Settings
          </h1>
        </div>
      </Header>
      <AccountContent />
      <div className='absolute bottom-0 flex items-center justify-center w-full'>
        <CopyRights></CopyRights>
      </div>
    </div>
  );
};

export default Account;
