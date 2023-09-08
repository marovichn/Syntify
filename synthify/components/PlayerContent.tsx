import { Song } from "@/types";
import { FC, useState } from "react";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import Slider from "./Slider";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: FC<PlayerContentProps> = ({ song, songUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0);
  const [preVolume, setPreVolume] = useState(0);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 h-full'>
      <div className='flex w-full justify-start'>
        <div className='flex items-center gap-x-4  overflow-hidden'>
          <div className='w-[83%]'>
            <MediaItem data={song} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      </div>

      <div
        className='
            flex 
            md:hidden 
            col-auto 
            w-full 
            justify-end 
            items-center
          '
      >
        <div
          onClick={() => {}}
          className='
              h-10
              w-10
              flex 
              items-center 
              justify-center 
              rounded-full 
              bg-white 
              p-1 
              cursor-pointer
            '
        >
          <Icon size={30} className='text-black' />
        </div>
      </div>

      <div
        className='
            hidden
            h-full
            md:flex 
            justify-center 
            items-center 
            w-full 
            max-w-[722px] 
            gap-x-6
          '
      >
        <AiFillStepBackward
          onClick={() => {}}
          size={30}
          className='
              text-neutral-400 
              cursor-pointer 
              hover:text-white 
              transition
            '
        />
        <div
          onClick={() => {}}
          className='
              flex 
              items-center 
              justify-center
              h-10
              w-10 
              rounded-full 
              bg-white 
              p-1 
              cursor-pointer
            '
        >
          <Icon size={30} className='text-black' />
        </div>
        <AiFillStepForward
          onClick={() => {}}
          size={30}
          className='
              text-neutral-400 
              cursor-pointer 
              hover:text-white 
              transition
            '
        />
      </div>

      <div className='hidden md:flex w-full justify-end pr-2'>
        <div className='flex items-center gap-x-2 w-[120px]'>
          <VolumeIcon
            onClick={toggleMute}
            className='cursor-pointer'
            size={26}
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
