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

interface PlaylistInputProps {
  songs: Song[];
}

const PlaylistInput: FC<PlaylistInputProps> = ({ songs }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const { register, handleSubmit, reset, formState } = useForm<FieldValues>({
    defaultValues: {
      title: "",
    },
  });
  const handleSubmitting = (ids: string[]) => {
    const uniqueIds = [...new Set(ids)];
    setSelectedIds(uniqueIds);
  };

  const onSubmit = async (values: FieldValues) => {
    try {
      setIsLoading(true);
      const imageFile = values.image?.[0];

      if (!user || !imageFile) {
        toast.error("Missing fields");
        return;
      }
      const uniqueId = uniqid();

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
        .from("playlists")
        .insert({
          user_id: user.id,
          title: values.title,
          playlist_songs: JSON.stringify(selectedIds),
          image_path: imageData?.path,
        });

      if (supabaseError) {
        setIsLoading(false);
        toast.error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      reset();
      toast.success("Playlist Created");
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
        className='flex flex-col items-left justify-center gap-y-6 '
      >
        <h1 className='font-bold text-2xl'>Playlist Title</h1>
        <Input
          id='title'
          disabled={isLoading}
          {...register("title", {
            required: true,
          })}
          placeholder='Playlist Title'
        />
        <div className='flex flex-col gap-y-2'>
          <div className='pb-1 pt-2'>Select playlist cover</div>
          <Input
            id='image'
            type='file'
            disabled={isLoading}
            {...register("image", {
              required: true,
            })}
            accept='.jpg, .png, .jpeg'
          />
        </div>
        <SelectSongsLibrary
          onPassSelectedIds={handleSubmitting}
          isLoading={isLoading}
          songs={songs}
        ></SelectSongsLibrary>
      </form>
    </div>
  );
};

export default PlaylistInput;
