import { Playlist, Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getImageUrl = async (song: Song | Playlist): Promise<any> => {
  const supabaseClient = createServerComponentClient({
    cookies: cookies,
  });
  if (!song) {
    return null;
  }

  const { data: imageData } = supabaseClient.storage
    .from("images")
    .getPublicUrl(song.image_path);

  return imageData.publicUrl;
};

export default getImageUrl;
