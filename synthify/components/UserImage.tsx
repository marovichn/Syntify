"use client";

import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import { FC } from "react";
import { FaUserAlt } from "react-icons/fa";

interface UserImageProps {}

const UserImage: FC<UserImageProps> = ({}) => {
  const { user } = useUser();

  return (
    <>
      {user?.user_metadata?.avatar_url ? (
        <div className='h-[34px] w-[35px] bg-white flex items-center justify-center rounded-full'>
          <Image
            src={user?.user_metadata?.avatar_url}
            width={30}
            height={30}
            alt='user image'
            className='rounded-full'
          />
        </div>
      ) : (
        <div className='h-[34px] w-[35px] bg-white flex items-center justify-center rounded-full'>
          <FaUserAlt className='text-black' size={15} />
        </div>
      )}
      <p className='font-bold'>
        {user?.user_metadata?.name} •
        <span className='font-normal'>3 songs</span>
      </p>
    </>
  );
};

export default UserImage;
