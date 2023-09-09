import { create } from "zustand";

interface SubscriptionModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSubscriptionModal = create<SubscriptionModalStore>((set) => ({
  isOpen: true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSubscriptionModal;
