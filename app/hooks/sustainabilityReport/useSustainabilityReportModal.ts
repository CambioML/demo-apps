import { create } from 'zustand';

interface SustainabilityCompanyModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSustainabilityCompanyModal = create<SustainabilityCompanyModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSustainabilityCompanyModal;
