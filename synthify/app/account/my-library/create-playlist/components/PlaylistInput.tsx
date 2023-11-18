"use client";

import { FC, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { toast } from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import uniqid from "uniqid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { Song } from "@/types";
import SelectSongsLibrary from "./SelectSongsLibrary";

interface PlaylistInputProps {songs: Song[]}

const PlaylistInput: FC<PlaylistInputProps> = ({songs}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const { register, handleSubmit, reset, formState } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const onSubmit = async (values: FieldValues) => {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user) {
        toast.error("Missing fields");
        return;
      }
      const uniqueId = uniqid();

      //upload song
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueId}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        return toast.error("Failed song upload");
      }

      //upload image
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${values.title}-${uniqueId}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });

      if (imageError) {
        setIsLoading(false);
        return toast.error("Failed image upload");
      }

      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData?.path,
          song_path: songData?.path,
        });

      if (supabaseError) {
        setIsLoading(false);
        toast.error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      reset();
      toast.success("Song uploaded successfully");
    } catch (err) {
      toast.error(`Something went wrong`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=''>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col items-left justify-center gap-y-4'
      >
        <h1 className="font-bold text-2xl">Playlist Title</h1>
        <Input
          id='title'
          disabled={isLoading}
          {...register("title", {
            required: true,
          })}
          placeholder='Playlist Title'
        />
        <div>
          <SelectSongsLibrary songs={songs}></SelectSongsLibrary>
        </div>
        <Button disabled={isLoading} type='submit' className='bg-blue-700'>
          Create Playlist
        </Button>
      </form>
    </div>
  );
};

export default PlaylistInput;
