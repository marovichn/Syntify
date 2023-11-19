import { FC, useState, useEffect } from "react";
import { BiCheckCircle, BiPlusCircle } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";

interface SelectButtonProps {
  songId: string;
  onSelected: (songId: string) => void;
  selected: boolean;
}

const SelectButton: FC<SelectButtonProps> = ({
  songId,
  onSelected,
  selected,
}) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();
  const { user } = useUser();

  useEffect(() => {
    if (!user?.id) {
      return;
    }
  }, [songId, supabaseClient, user?.id]);

  const handleSelect = () => {
    onSelected(songId);
  };

  const Icon = selected ? BiCheckCircle : BiPlusCircle;

  return (
    <div className='p-3 bg-blue-600/60 flex items-center justify-center rounded-lg'>
      <div
        className='
        cursor-pointer 
        hover:opacity-75 
        transition
        hover:scale-150
      '
        onClick={handleSelect}
      >
        <Icon size={22} className='text-white' />
      </div>
    </div>
  );
};

export default SelectButton;
