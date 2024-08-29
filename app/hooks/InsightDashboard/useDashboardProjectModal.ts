import { create } from 'zustand';

export enum ProjectModalState {
  ADD_FILES,
  CREATING_PROJECT,
  UPLOADING,
  EXTRACTING_CONTENT,
  SUCCESS,
}

interface DashboardProjectModalStore {
  isOpen: boolean;
  content: React.ReactElement | null;
  projectModalState: ProjectModalState;
  onOpen: () => void;
  onClose: () => void;
  setContent: (content: React.ReactElement) => void;
  setProjectModalState: (projectModalState: ProjectModalState) => void;
}

const useDashboardProjectModal = create<DashboardProjectModalStore>((set) => ({
  isOpen: false,
  content: null,
  projectModalState: ProjectModalState.ADD_FILES,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setContent: (content) => set({ content }),
  setProjectModalState: (projectModalState) => set({ projectModalState }),
}));

export default useDashboardProjectModal;
