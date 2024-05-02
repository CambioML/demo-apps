import { create } from 'zustand';

interface InfoModalStore {
  isOpen: boolean;
  content: React.ReactElement | null;
  onOpen: () => void;
  onClose: () => void;
  setContent: (content: React.ReactElement) => void;
}

const useInfoModal = create<InfoModalStore>((set) => ({
  isOpen: false,
  content: null,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setContent: (content) => set({ content }),
}));

export default useInfoModal;
