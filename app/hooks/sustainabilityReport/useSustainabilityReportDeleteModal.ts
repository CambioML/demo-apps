import { Attribute, Project, Report } from '@/app/types/SustainabilityReportTypes';
import { create } from 'zustand';

interface SustainabilityReportDeleteModalStore {
  isOpen: boolean;
  deleteItem: Attribute | Report | Project | null;
  projectId: string;
  attributeId: string;
  onOpen: () => void;
  onClose: () => void;
  setDeleteItem: (deleteItem: Attribute | Report | Project) => void;
  setProjectId: (projectId: string) => void;
  setAttributeId: (attributeId: string) => void;
}

const useSustainabilityReportDeleteModal = create<SustainabilityReportDeleteModalStore>((set) => ({
  isOpen: false,
  deleteItem: null,
  projectId: '',
  attributeId: '',
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setAttributeId: (attributeId: string) => set({ attributeId }),
  setDeleteItem: (deleteItem: Attribute | Report | Project) => set({ deleteItem }),
  setProjectId: (projectId: string) => set({ projectId }),
}));

export default useSustainabilityReportDeleteModal;
