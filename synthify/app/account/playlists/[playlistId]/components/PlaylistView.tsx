"use client";

import CopyRights from "@/components/CopyRights";
import Header from "@/components/Header";
import MediaItem from "@/components/MediaItem";
import UserImage from "@/components/UserImage";
import useLoadImage from "@/hooks/useLoadImage";
import useOnPlay from "@/hooks/useOnPlay";
import { Playlist, Song } from "@/types";
import NextImage from "next/image"; // Renamed Next.js Image component
import { FC, useEffect, useState } from "react";

interface PlaylistDisplayProps {
  songs: Song[];
  playlist: Playlist;
}

const PlaylistDisplay: FC<PlaylistDisplayProps> = ({ songs, playlist }) => {
  const onPlay = useOnPlay(songs);
  const imageUrl = useLoadImage(playlist);
  const [averageHex, setAverageHex] = useState("");

  useEffect(() => {
    const loadImage = () => {
      const img = new Image();
      img.setAttribute("crossOrigin", "anonymous"); // Enable cross-origin for image
      img.src = imageUrl!;

      img.onload = () => {
        const context = document.createElement("canvas").getContext("2d");

        if (context) {
          context.imageSmoothingEnabled = true;
          context.drawImage(img, 0, 0, 1, 1);

          const rgbValues = Array.from(
            context.getImageData(0, 0, 1, 1).data.slice(0, 3)
          );

          if (rgbValues.length !== 3) {
            throw new Error(
              "RGB array must have three values (Red, Green, Blue)"
            );
          }

          for (const value of rgbValues) {
            if (value < 0 || value > 255 || isNaN(value)) {
              throw new Error("Invalid RGB value. Must be between 0 and 255.");
            }
          }

          const hexValues = rgbValues.map((value) => {
            const hex = value.toString(16).toUpperCase();
            return hex.length === 1 ? "0" + hex : hex;
          });

          const hexString = `#${hexValues.join("")}`;

          setAverageHex(hexString);
        } else {
          console.error("Error getting 2D context");
        }
      };

      img.onerror = (error: any) => {
        console.error("Error loading image:", error);
      };
    };

    if (imageUrl) {
      loadImage();
    }
  }, []);

  return (
    <>
      <Header
        className='from-neutral-900'
        styles={{
          backgroundImage: `linear-gradient(to bottom, ${averageHex} 0%, #171717 100%)`,
        }}
      >
        <div className='mt-10 '>
          <div
            className='
              flex 
              flex-col 
              lg:flex-row 
              items-center 
              gap-x-5
            '
          >
            <div className='relative h-[275px] w-[275px] lg:h-44 lg:w-44'>
              <NextImage
                className='object-cover rounded-xl '
                fill
                src={imageUrl!}
                alt='Playlist'
              />
            </div>
            <div className='flex flex-col gap-y-2 mt-4 md:mt-0'>
              <p className='hidden lg:block font-semibold text-sm'>Playlist</p>
              <h1
                className='
                  text-white 
                  text-4xl 
                  sm:text-5xl 
                  lg:text-7xl 
                  font-bold
                  mt-5
                  text-center
                  mb-2
                '
              >
                {playlist.title}
              </h1>
              <UserImage likedSongsAmount={songs.length} />
              <p className='hidden min-[0px]:max-lg:block font-normal text-sm text-center'>
                Playlist
              </p>
            </div>
          </div>
        </div>
      </Header>
      <div className='flex flex-col gap-y-2 w-full p-6'>
        {songs.map((song: any, index) => (
          <div key={song.id} className='flex items-center gap-x-4 w-full'>
            <div className='flex-1'>
              <MediaItem
                index={index + 1}
                onClick={(id: string) => onPlay(id)}
                data={song}
              />
            </div>
          </div>
        ))}
      </div>
      <CopyRights />
    </>
  );
};

export default PlaylistDisplay;
