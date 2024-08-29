import { create } from 'zustand';

interface DashboardAttributeModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useDashboardAttributeModal = create<DashboardAttributeModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useDashboardAttributeModal;
