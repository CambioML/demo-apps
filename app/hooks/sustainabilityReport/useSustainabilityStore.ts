import { Report, GenerationStatus, MetricFeedback, SustainabilityMetric } from '@/app/types/SustainabilityTypes';
import { create } from 'zustand';

interface SustainabilityStoreState {
  reports: Report[];
  reportsToAdd: Report[];
  metrics: SustainabilityMetric[];
  addReports: (newReports: Report[]) => void;
  addReportsToAdd: (newReports: Report[]) => void;
  setReportsToAdd: (newReports: Report[]) => void;
  addMetric: (metric: SustainabilityMetric) => void;
  updateStatus: (reportIndex: number, status: GenerationStatus) => void;
  updateResults: (reportIndex: number, results: { [key: string]: MetricFeedback }) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const useSustainabilityStore = create<SustainabilityStoreState>((set) => ({
  reports: [],
  metrics: [],
  reportsToAdd: [],
  addReports: (reports) => set((state) => ({ reports: [...state.reports, ...reports] })),
  isLoading: false,
  addReportsToAdd: (newReports) => set((state) => ({ reportsToAdd: [...state.reportsToAdd, ...newReports] })),
  setReportsToAdd: (newReports) => set({ reportsToAdd: newReports }),
  addMetric: (metric) => set((state) => ({ metrics: [...state.metrics, metric] })),
  updateStatus: (reportIndex, status) =>
    set((state) => ({
      reports: state.reports.map((report, index) => (index === reportIndex ? { ...report, status } : report)),
    })),
  updateResults: (reportIndex, results) =>
    set((state) => ({
      reports: state.reports.map((report, index) =>
        index === reportIndex ? { ...report, reportResults: results } : report
      ),
    })),
  setIsLoading: (isLoading) => set({ isLoading }),
}));

export default useSustainabilityStore;
