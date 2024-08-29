import { Attribute } from '@/app/types/SustainabilityReportTypes';
import { create } from 'zustand';

interface DashboardUpdateAttributeModalStore {
  isOpen: boolean;
  attribute: Attribute | null;
  onOpen: () => void;
  onClose: () => void;
  setAttribute: (attribute: Attribute) => void;
}

const useDashboardUpdateAttributeModal = create<DashboardUpdateAttributeModalStore>((set) => ({
  isOpen: false,
  attribute: null,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setAttribute: (attribute: Attribute) => set({ attribute }),
}));

export default useDashboardUpdateAttributeModal;
