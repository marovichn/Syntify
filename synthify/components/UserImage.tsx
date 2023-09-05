"use client";

import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { FaUserAlt } from "react-icons/fa";

interface UserImageProps {}

const UserImage: FC<UserImageProps> = ({}) => {
  const { user } = useUser();

  return (
    <div className='flex gap-x-4 items-center lg:justify-start justify-center'>
      <Link href="/account">
      {user?.user_metadata?.avatar_url ? (
        <Image
          src={user?.user_metadata?.avatar_url}
          width={30}
          height={30}
          alt='user image'
          className='rounded-full border-2 border-white'
        />
      ) : (
        <div className='h-[35px] w-[35px] bg-white flex items-center justify-center rounded-full '>
          <FaUserAlt className='text-black' />
        </div>
      )}</Link>
      <p className='font-bold '>
        {user?.user_metadata?.name} •
        <span className='font-normal'>{"  "}3 songs</span>
      </p>
    </div>
  );
};

export default UserImage;
