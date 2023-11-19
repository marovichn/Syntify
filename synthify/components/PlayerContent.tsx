"use client";

//@ts-ignore
import useSound from "use-sound";
import { useEffect, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";

import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";

import LikeButton from "./LikeButton";
import MediaItem from "./MediaItem";
import Slider from "./Slider";
import { BiRepeat, BiShuffle } from "react-icons/bi";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeat, setRepeat] = useState(false);
  const [isShuffle, setShuffle] = useState(false);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };
  
  const onShuffle = () => {
    if (player.ids.length === 0) {
      return;
    }

    const shuffledIds = [...player.ids];
    for (let i = shuffledIds.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledIds[i], shuffledIds[j]] = [shuffledIds[j], shuffledIds[i]];
    }

    const shuffledActiveId = shuffledIds[0]; // Select the first ID from the shuffled array
    player.setId(shuffledActiveId);
  };

  const onRepeat = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      if (player.ids.length === 1 || isRepeat) {
        onRepeat();
      } else if (isShuffle) {
        onShuffle();
      } else {
        onPlayNext();
      }
      setIsPlaying(false);
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };
  const toggleRepeat = () => {
    setRepeat((p) => {
      return !p;
    });
  };
  const toggleShuffle = () => {
    setShuffle((prev) => {
      return !prev;
    });
  };

  return (
    <div
      className='grid grid-cols-2 max-md:grid-cols-1 md:grid-cols-3 h-full
        relative'
    >
      <div className='flex w-full justify-start items-center'>
        <div className='flex items-center gap-x-4 overflow-hidden max-md:w-full'>
          <div className='w-[83%] max-md:w-full'>
            <MediaItem data={song} />
          </div>
          <div className='p-2 flex items-center justify-center'>
            <LikeButton songId={song.id} />
          </div>
        </div>
      </div>

      <div className='hidden max-md:flex w-full justify-start mt-3 pr-2 pl-3 gap-x-3'>
        <div
          className='
            hidden
            h-full
            max-md:flex 
            justify-start 
            items-center 
            w-full 
            max-w-[722px] 
            gap-x-6
            
          '
        >
          <AiFillStepBackward
            onClick={onPlayPrevious}
            size={20}
            className='
              text-neutral-400 
              cursor-pointer 
              hover:text-white 
              transition
            '
          />
          <div
            onClick={handlePlay}
            className='
              flex 
              items-center 
              justify-center
              h-8
              w-8 
              rounded-full 
              bg-white 
              p-1 
              cursor-pointer
            '
          >
            <Icon size={20} className='text-black' />
          </div>
          <AiFillStepForward
            onClick={onPlayNext}
            size={20}
            className='
              text-neutral-400 
              cursor-pointer 
              hover:text-white 
              transition
            '
          />
        </div>
        <div className='flex items-center justify-center gap-x-3'>
          <BiRepeat
            onClick={toggleRepeat}
            className={
              isRepeat
                ? "text-blue-700 hover:text-blue-500 "
                : "cursor-pointer hover:text-blue-700 transition"
            }
          ></BiRepeat>
          <BiShuffle
            onClick={toggleShuffle}
            className={
              isShuffle
                ? "text-blue-700 hover:text-blue-500 "
                : "cursor-pointer hover:text-blue-700 transition"
            }
          ></BiShuffle>
        </div>
        <div className='flex items-center gap-x-2 w-[90px]'>
          <VolumeIcon
            onClick={toggleMute}
            className='cursor-pointer'
            size={34}
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
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
          onClick={onPlayPrevious}
          size={30}
          className='
              text-neutral-400 
              cursor-pointer 
              hover:text-white 
              transition
            '
        />
        <div
          onClick={handlePlay}
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
          onClick={onPlayNext}
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
          <div className='flex items-center justify-center gap-x-3'>
            <BiRepeat
              onClick={toggleRepeat}
              className={
                isRepeat
                  ? "text-blue-700 hover:text-blue-500 "
                  : "cursor-pointer hover:text-blue-700 transition"
              }
            ></BiRepeat>
            <BiShuffle
              onClick={toggleShuffle}
              className={
                isShuffle
                  ? "text-blue-700 hover:text-blue-500 "
                  : "cursor-pointer hover:text-blue-700 transition"
              }
            ></BiShuffle>
          </div>
          <VolumeIcon
            onClick={toggleMute}
            className='cursor-pointer'
            size={34}
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
