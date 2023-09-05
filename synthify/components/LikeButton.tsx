import { FC, useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { BiHeart } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { useSessionContext } from "@supabase/auth-helpers-react";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { toast } from "react-hot-toast";
import { error } from "console";

interface LikeButtonProps {
  songId: string;
}

const LikeButton: FC<LikeButtonProps> = ({ songId }) => {
  const [liked, setLiked] = useState(false);
  const router = useRouter();
  const { supabaseClient } = useSessionContext();

  const authModal = useAuthModal();
  const { user } = useUser();

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", songId)
        .single();

      if (!error && data) {
        setLiked(true);
      }
    };

    fetchData();
  }, [songId, supabaseClient, user?.id]);

  const handleLike = async () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (liked) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", songId);

      if (error) {
        toast.error("Something went wrong");
      } else {
        setLiked(false);
      }
    } else {
      const { error } = await supabaseClient
        .from("liked_songs")
        .insert({ song_id: songId, user_id: user.id });

      if (error) {
        toast.error("Something went wrong");
      }else{
        setLiked(true);
        toast.success("Song liked!")
      }
    }

    router.refresh();
  };

  const Icon = liked ? FaHeart : BiHeart;

  return (
    <button
      className='
        cursor-pointer 
        hover:opacity-75 
        transition
        hover:scale-150
      '
      onClick={handleLike}
    >
      <Icon size={22} className='text-blue-700' />
    </button>
  );
};

export default LikeButton;
