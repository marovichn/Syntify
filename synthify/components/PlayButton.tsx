import { FaPlay } from "react-icons/fa";

const PlayButton = () => {
  return (
    <button
      className='
        transition 
        opacity-0 
        rounded-full 
        flex 
        items-center 
        justify-center 
        bg-neutral-200/70 
        p-3
        drop-shadow-md 
        translate
        translate-y-1/4
        group-hover:opacity-100 
        hover:bg-neutral-200 
        group-hover:translate-y-0
        hover:scale-110
      '
    >
      <FaPlay className='text-blue-700 pl-1' size={20} />
    </button>
  );
};

export default PlayButton;
