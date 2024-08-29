import { create } from 'zustand';

export enum AddFileModalState {
  ADD_FILES,
  UPLOADING,
  EXTRACTING_CONTENT,
  SUCCESS,
}

interface DashboardAddFileModalStore {
  isOpen: boolean;
  content: React.ReactElement | null;
  addFileModalState: AddFileModalState;
  projectId: string;
  onOpen: () => void;
  onClose: () => void;
  setContent: (content: React.ReactElement) => void;
  setProjectId: (projectId: string) => void;
  setAddFileModalState: (addFileModalState: AddFileModalState) => void;
}

const useDashboardAddFileModal = create<DashboardAddFileModalStore>((set) => ({
  isOpen: false,
  content: null,
  addFileModalState: AddFileModalState.ADD_FILES,
  projectId: '',
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setContent: (content) => set({ content }),
  setProjectId: (projectId) => set({ projectId }),
  setAddFileModalState: (addFileModalState) => set({ addFileModalState }),
}));

export default useDashboardAddFileModal;
