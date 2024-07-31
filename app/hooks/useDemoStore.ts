import { create } from 'zustand';

export enum TabType {
  ScenarioDash = 'scenario-dash',
  ReportGenerator = 'report-generator',
  Settings = 'settings',
}

interface DemoStore {
  tab: TabType;
  settab: (tab: TabType) => void;
}

const useDemoStore = create<DemoStore>((set) => ({
  tab: TabType.ScenarioDash,
  settab: (tab: TabType) => set({ tab }),
}));

export default useDemoStore;
