"use client";

import Modal from "@/components/Modal";
import { useEffect, useState } from "react";

const ModalProvider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Modal 
      title='Test'
      description='Test'
      isOpen
      onChange={() => {}}
      >
        Test
      </Modal>
    </>
  );
};

export default ModalProvider;
