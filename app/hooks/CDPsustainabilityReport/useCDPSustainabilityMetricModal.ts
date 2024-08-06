import { create } from 'zustand';

interface CDPSustainabilityMetricModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCDPSustainabilityMetricModal = create<CDPSustainabilityMetricModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCDPSustainabilityMetricModal;
