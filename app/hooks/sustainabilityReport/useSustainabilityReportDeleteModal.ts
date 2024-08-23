import { Attribute, Project, Report } from '@/app/types/SustainabilityReportTypes';
import { create } from 'zustand';

interface SustainabilityReportDeleteModalStore {
  isOpen: boolean;
  deleteItem: Attribute | Report | Project | null;
  projectId: string;
  onOpen: () => void;
  onClose: () => void;
  setDeleteItem: (deleteItem: Attribute | Report | Project) => void;
  setProjectId: (projectId: string) => void;
}

const useSustainabilityReportDeleteModal = create<SustainabilityReportDeleteModalStore>((set) => ({
  isOpen: false,
  deleteItem: null,
  projectId: '',
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setDeleteItem: (deleteItem: Attribute | Report | Project) => set({ deleteItem }),
  setProjectId: (projectId: string) => set({ projectId }),
}));

export default useSustainabilityReportDeleteModal;
