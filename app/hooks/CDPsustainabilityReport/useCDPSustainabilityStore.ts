import { CDPReport, GenerationStatus, MetricFeedback, SustainabilityMetric } from '@/app/types/CDPSustainabilityTypes';
import { create } from 'zustand';

interface SustainabilityStoreState {
  reports: CDPReport[];
  reportsToAdd: CDPReport[];
  metrics: SustainabilityMetric[];
  addReports: (newReports: CDPReport[]) => void;
  addReportsToAdd: (newReports: CDPReport[]) => void;
  setReportsToAdd: (newReports: CDPReport[]) => void;
  addMetric: (metric: SustainabilityMetric) => void;
  updateStatus: (reportIndex: number, status: GenerationStatus) => void;
  updateResults: (reportIndex: number, results: { [key: string]: MetricFeedback }) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const useCDPSustainabilityStore = create<SustainabilityStoreState>((set) => ({
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

export default useCDPSustainabilityStore;
