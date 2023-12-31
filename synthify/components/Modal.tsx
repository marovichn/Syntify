"use client";
import { FC } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onChange,
  title,
  description,
  children,
}) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay className='bg-neutral-900/80 backdrop-blur-sm fixed inset-0' />
        <Dialog.Content className='fixed drop-shadow-md border border-neutral-700 top-[50%] left-[50%] max-h-full h-full md:h-auto md:max-h-[85vh] w-full md:w-[90vw] md:max-w-[450px] translate-x-[-50%]  translate-y-[-50%] p-[25px] pt-[55px] rounded-md bg-neutral-800 focus:outline-none'>
          <Dialog.Title className='text-3xl font-extrabold text-center mb-4 '>
            {title}
          </Dialog.Title>
          <Dialog.Description className='mb-10 text-xs leading-normal text-center -mt-4 text-blue-700 font-bold'>
            {description}
          </Dialog.Description>
          <div>{children}</div>
          <Dialog.Close asChild>
            <button className='absolute top-[10px] right-[10px] text-neutral-400 hover:text-white inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:outline-none'>
              <IoMdClose size={20} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
