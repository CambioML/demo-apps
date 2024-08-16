import { Attribute } from '@/app/types/SustainabilityReportTypes';
import { create } from 'zustand';

interface SustainabilityUpdateAttributeModalStore {
  isOpen: boolean;
  attribute: Attribute | null;
  onOpen: () => void;
  onClose: () => void;
  setAttribute: (attribute: Attribute) => void;
}

const useSustainabilityUpdateAttributeModal = create<SustainabilityUpdateAttributeModalStore>((set) => ({
  isOpen: false,
  attribute: null,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setAttribute: (attribute: Attribute) => set({ attribute }),
}));

export default useSustainabilityUpdateAttributeModal;
