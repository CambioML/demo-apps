import { Company, GenerationStatus, MetricFeedback, SustainabilityMetric } from '@/app/types/SustainabilityTypes';
import { create } from 'zustand';

interface SustainabilityStoreState {
  companies: Company[];
  metrics: SustainabilityMetric[];
  addCompany: (company: Company) => void;
  addMetric: (metric: SustainabilityMetric) => void;
  updateStatus: (companyIndex: number, status: GenerationStatus) => void;
  updateResults: (companyIndex: number, results: { [key: string]: MetricFeedback }) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const useSustainabilityStore = create<SustainabilityStoreState>((set) => ({
  companies: [],
  metrics: [],
  addCompany: (company) => set((state) => ({ companies: [...state.companies, company] })),
  isLoading: false,
  addMetric: (metric) => set((state) => ({ metrics: [...state.metrics, metric] })),
  updateStatus: (companyIndex, status) =>
    set((state) => ({
      companies: state.companies.map((company, index) => (index === companyIndex ? { ...company, status } : company)),
    })),
  updateResults: (companyIndex, results) =>
    set((state) => ({
      companies: state.companies.map((company, index) =>
        index === companyIndex ? { ...company, reportResults: results } : company
      ),
    })),
  setIsLoading: (isLoading) => set({ isLoading }),
}));

export default useSustainabilityStore;
