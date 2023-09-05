import { FC } from "react";
import { FaHeart } from "react-icons/fa";
import { BiHeart } from "react-icons/bi";

interface LikeButtonProps {
  songId: string;
  liked: boolean;
}

const LikeButton: FC<LikeButtonProps> = ({ songId, liked }) => {
  return (
    <button
      className='
        cursor-pointer 
        hover:opacity-75 
        transition
      '
      onClick={()=>{}}
    >
      {liked ? (
        <FaHeart size={20} className='text-blue-700' />
      ) : (
        <BiHeart size={20} className='text-blue-700' />
      )}
    </button>
  );
};

export default LikeButton;
