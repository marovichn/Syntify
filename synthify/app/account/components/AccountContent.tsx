"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useUser } from "@/hooks/useUser";
import Button from "@/components/Button";
import useSubscriptionModal from "@/hooks/useSubscriptionModal";
import { postData } from "@/libs/helpers";
import { TbPlaylist } from "react-icons/tb";

const AccountContent = () => {
  const router = useRouter();
  const subscribeModal = useSubscriptionModal();
  const { isLoading, subscription, user } = useUser();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  const redirectToCustomerPortal = async () => {
    setLoading(true);
    try {
      const { url, error } = await postData({
        url: "/api/create-portal-link",
      });
      window.location.assign(url);
    } catch (error) {
      if (error) return alert((error as Error).message);
    }
    setLoading(false);
  };

  return (
    <div className='mb-7 px-6'>
      {!subscription && (
        <div className='flex flex-col gap-y-4'>
          <p>No active plan.</p>
          <Button onClick={subscribeModal.onOpen} className='w-[300px]'>
            Subscribe
          </Button>
        </div>
      )}
      {subscription && (
        <div className='flex flex-col gap-y-4'>
          <p>
            You are currently on the
            <b> {subscription?.prices?.products?.name} </b>
            plan.
          </p>
          <Button
            disabled={loading || isLoading}
            onClick={redirectToCustomerPortal}
            className='w-[300px]'
          >
            Open customer portal
          </Button>
        </div>
      )}
      <div className='mt-4 w-[300px]'>
        <p className='mb-4 font-bold'>Go to</p>
        <Button
          onClick={() => router.push("/account/my-library")}
          className='flex items-center justify-center gap-x-3 bg-white text-blue-500'
        >
          <TbPlaylist />
          My Library
        </Button>
      </div>
    </div>
  );
};

export default AccountContent;
