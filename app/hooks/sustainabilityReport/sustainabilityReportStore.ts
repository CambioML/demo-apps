import { create } from 'zustand';
import { Report, GenerationStatus, Attribute } from '@/app/types/SustainabilityReportTypes';

interface SustainabilityStoreState {
  userId: string;
  reports: Report[];
  reportsToAdd: File[];
  attributes: Attribute[];
  setUserId: (userId: string) => void;
  addReports: (newReports: Report[]) => void;
  addAttributes: (newAttributes: Attribute[]) => void;
  addReportsToAdd: (newReports: File[]) => void;
  setReportsToAdd: (newReports: File[]) => void;
  updateStatus: (reportId: string, status: GenerationStatus) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const useSustainabilityStore = create<SustainabilityStoreState>((set) => ({
  userId: 'test_user_id1',
  reports: [],
  reportsToAdd: [],
  attributes: [],
  setUserId: (userId) => set({ userId }),
  addAttributes: (newAttributes) =>
    set((state) => {
      const existingAttributeIds = new Set(state.attributes.map((attribute) => attribute.id));
      const filteredAttributes = newAttributes.filter((attribute) => !existingAttributeIds.has(attribute.id));
      return { attributes: [...state.attributes, ...filteredAttributes] };
    }),
  addReports: (newReports) =>
    set((state) => {
      const existingReportIds = new Set(state.reports.map((report) => report.id));
      const filteredReports = newReports.filter((report) => !existingReportIds.has(report.id));
      return { reports: [...state.reports, ...filteredReports] };
    }),
  isLoading: false,
  addReportsToAdd: (newReports) => set((state) => ({ reportsToAdd: [...state.reportsToAdd, ...newReports] })),
  setReportsToAdd: (newReports) => set({ reportsToAdd: newReports }),
  updateStatus: (reportId, status) =>
    set((state) => ({
      reports: state.reports.map((report) => (report.id === reportId ? { ...report, status } : report)),
    })),
  setIsLoading: (isLoading) => set({ isLoading }),
}));

export default useSustainabilityStore;
