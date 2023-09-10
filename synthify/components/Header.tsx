"use client";

import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { FaUserAlt } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import useSubscriptionModal from "@/hooks/useSubscriptionModal";
import usePlayer from "@/hooks/usePlayer";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const player = usePlayer();
  const subscribeMo = useSubscriptionModal();
  const router = useRouter();
  const { onOpen } = useAuthModal();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    player.reset();
    router.refresh();

    if (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={twMerge(
        `
        h-fit 
        bg-gradient-to-b 
        from-blue-800
        p-6
        `,
        className
      )}
    >
      <div className='w-full mb-4 flex items-center justify-between'>
        <div className='hidden md:flex gap-x-2 items-center'>
          <button
            onClick={() => router.back()}
            className='
              rounded-full 
              bg-black/60 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            '
          >
            <RxCaretLeft className='text-white' size={35} />
          </button>
          <button
            onClick={() => router.forward()}
            className='
              rounded-full 
              bg-black/60 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            '
          >
            <RxCaretRight className='text-white' size={35} />
          </button>
        </div>
        <div className='flex md:hidden gap-x-2 items-center'>
          <button
            onClick={() => router.push("/")}
            className='
              rounded-full 
              p-2 
              bg-white 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            '
          >
            <HiHome className='text-black' size={20} />
          </button>
          <button
            onClick={() => router.push("/search")}
            className='
              rounded-full 
              p-2 
              bg-white 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            '
          >
            <BiSearch className='text-black' size={20} />
          </button>
        </div>
        <div className='flex justify-between items-center gap-x-4'>
          <Button className=' w-32 right-[210px]' onClick={subscribeMo.onOpen}>
            Buy premium
          </Button>
          {user ? (
            <div className='flex gap-x-4 items-center'>
              <Button
                onClick={handleLogout}
                className='bg-white px-6 py-2 text-black font-extrabold text-md'
              >
                Logout
              </Button>
              <Button
                onClick={() => router.push("/account")}
                className={twMerge(
                  "bg-white p-[3px] flex items-center justify-center",
                  user?.user_metadata?.avatar_url &&
                    "p-0 border-2 border-black/50"
                )}
              >
                {user?.user_metadata?.avatar_url ? (
                  <Image
                    src={user?.user_metadata?.avatar_url}
                    width={36}
                    height={36}
                    alt='user image'
                    className='rounded-full'
                  />
                ) : (
                  <div className='h-[35px] w-[35px] bg-white flex items-center justify-center rounded-full '>
                    <FaUserAlt className='text-black' />
                  </div>
                )}
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={onOpen}
                  className='bg-transparent text-neutral-300 hover:opacity-75'
                >
                  Sign Up
                </Button>
              </div>
              <div>
                <Button
                  onClick={onOpen}
                  className=' text-blue-700 px-6 py-2 bg-white font-extrabold text-md'
                >
                  Log In
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
