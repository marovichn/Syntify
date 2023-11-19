"use client";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { FaPlay } from "react-icons/fa";
import { MdLibraryMusic } from "react-icons/md";

interface ListItemProps {
  name: string;
  image: string;
  href: string;
  library?: boolean;
}

const ListItem: FC<ListItemProps> = ({ name, image, href, library }) => {
  const router = useRouter();
  const { user } = useUser();
  const authModal = useAuthModal();

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      className='
        relative 
        group 
        flex 
        items-center 
        rounded-md 
        overflow-hidden 
        gap-x-4 
        bg-neutral-100/10 
        cursor-pointer 
        hover:bg-neutral-100/20 
        transition 
        pr-4
      '
    >
      <div className='relative min-h-[64px] min-w-[64px] h-full'>
        {!library && (
          <Image className='object-cover' src={image} fill alt='Image' />
        )}
        {library && <div className='w-full h-full flex items-center justify-center object-cover bg-blue-700'>
          <MdLibraryMusic size={30}/>
        </div>}
      </div>
      <p className='font-medium truncate py-5'>{name}</p>
      <div
        className='
          absolute 
          transition 
          opacity-0 
          rounded-full 
          flex 
          items-center 
          justify-center 
          bg-blue-700 
          p-3 
          drop-shadow-md 
          right-5
          group-hover:opacity-100 
          hover:scale-110
        '
      >
        <FaPlay className='text-white' size={16} />
      </div>
    </button>
  );
};

export default ListItem;
