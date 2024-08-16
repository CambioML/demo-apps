import { Attribute, Report } from '@/app/types/SustainabilityReportTypes';
import { create } from 'zustand';

interface SustainabilityReportDeleteModalStore {
  isOpen: boolean;
  deleteItem: Attribute | Report | null;
  onOpen: () => void;
  onClose: () => void;
  setDeleteItem: (deleteItem: Attribute | Report) => void;
}

const useSustainabilityReportDeleteModal = create<SustainabilityReportDeleteModalStore>((set) => ({
  isOpen: false,
  deleteItem: null,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setDeleteItem: (deleteItem: Attribute | Report) => set({ deleteItem }),
}));

export default useSustainabilityReportDeleteModal;
