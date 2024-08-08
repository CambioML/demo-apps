import { create } from 'zustand';

interface SustainabilityReportAttributeModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSustainabilityReportAttributeModal = create<SustainabilityReportAttributeModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSustainabilityReportAttributeModal;
