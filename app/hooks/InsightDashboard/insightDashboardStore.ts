import { create } from 'zustand';
import { Dashboard } from '@/app/types/InsightDashboardTypes';

interface InsightDashboardStoreState {
  userId: string;
  dashboardId: string;
  dashboards: Dashboard[];
  reportsToAdd: File[];
  isLoading: boolean;
  setUserId: (userId: string) => void;
  setDashboards: (newDashboards: Dashboard[]) => void;
  setIsLoading: (isLoading: boolean) => void;
}

const useInsightDashboardStore = create<InsightDashboardStoreState>((set) => ({
  userId: '',
  dashboardId: '',
  dashboards: [],
  reportsToAdd: [],
  isLoading: false,
  setUserId: (userId) => set({ userId }),
  setDashboards: (newDashboards) => set({ dashboards: newDashboards }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));

export default useInsightDashboardStore;
