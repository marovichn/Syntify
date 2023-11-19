"use client";

import Header from "@/components/Header";

import AccountContent from "./components/AccountContent";
import CopyRights from "@/components/CopyRights";

const Account = () => {
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
