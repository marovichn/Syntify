"use client";

import { FC, useState } from "react";
import Modal from "./Modal";
import useUploadModal from "@/hooks/useUploadModal";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import { toast } from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import uniqid from "uniqid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

interface UploadModalProps {}

const UploadModal: FC<UploadModalProps> = ({}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { onClose, isOpen } = useUploadModal();
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

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      onClose();
    }
  };

  const onSubmit = async (values: FieldValues) => {
    try {
      console.log(values);
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
      onClose();
      toast.success("Song uploaded successfully");
    } catch (err) {
      toast.error(`Something went wrong`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title='Add a song'
      description='Upload an .mp3 file to your account'
      isOpen={isOpen}
      onChange={onChange}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col items-left justify-center gap-y-4'
      >
        <Input
          id='title'
          disabled={isLoading}
          {...register("title", {
            required: true,
          })}
          placeholder='Song title'
        />
        <Input
          id='author'
          disabled={isLoading}
          {...register("author", {
            required: true,
          })}
          placeholder='Song author'
        />
        <div className='flex flex-col gap-y-2'>
          <div className='pb-1 pt-2'>Select a song file</div>
          <Input
            id='song'
            type='file'
            disabled={isLoading}
            {...register("song", {
              required: true,
            })}
            accept='.mp3'
          />
        </div>
        <div className='flex flex-col gap-y-2'>
          <div className='pb-1 pt-2'>Select a song cover</div>
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
        <Button disabled={isLoading} type='submit' className='bg-blue-700'>
          Upload
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
