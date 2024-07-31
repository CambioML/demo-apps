import { create } from 'zustand';

interface SustainabilityMetricModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSustainabilityMetricModal = create<SustainabilityMetricModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSustainabilityMetricModal;
