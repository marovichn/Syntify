"use client";

import AuthModal from "@/components/AuthModal";
import SubscribeModal from "@/components/SubscribeModal";
import UploadModal from "@/components/UploadModal";
import { ProductWithPrice } from "@/types";
import { useEffect, useState } from "react";

import { FC } from 'react'

interface ModalProviderProps {
  products: ProductWithPrice[];
}

const ModalProvider: FC<ModalProviderProps> = ({products}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <UploadModal/>
      <SubscribeModal products={products}/>
    </>
  );
};

export default ModalProvider;
