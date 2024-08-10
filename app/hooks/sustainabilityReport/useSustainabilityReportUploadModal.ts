import { create } from 'zustand';

export enum UploadModalState {
  ADD_FILES,
  UPLOADING,
  SUCCESS,
}

interface SustainabilityReportUploadModalStore {
  isOpen: boolean;
  content: React.ReactElement | null;
  uploadModalState: UploadModalState;
  onOpen: () => void;
  onClose: () => void;
  setContent: (content: React.ReactElement) => void;
  setUploadModalState: (uploadModalState: UploadModalState) => void;
}

const useSustainabilityReportUploadModal = create<SustainabilityReportUploadModalStore>((set) => ({
  isOpen: false,
  content: null,
  uploadModalState: UploadModalState.ADD_FILES,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setContent: (content) => set({ content }),
  setUploadModalState: (uploadModalState) => set({ uploadModalState }),
}));

export default useSustainabilityReportUploadModal;
