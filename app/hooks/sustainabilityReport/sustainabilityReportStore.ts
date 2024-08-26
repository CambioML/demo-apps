import { create } from 'zustand';
import { Report, GenerationStatus, Attribute, Project } from '@/app/types/SustainabilityReportTypes';

interface SustainabilityStoreState {
  userId: string;
  reports: Report[];
  projects: Project[];
  reportsToAdd: File[];
  attributes: Attribute[];
  setUserId: (userId: string) => void;
  addReports: (newReports: Report[]) => void;
  addProjects: (newProjects: Project[]) => void;
  addAttributes: (newAttributes: Attribute[]) => void;
  updateStoreAttribute: (attributeId: string, newAttribute: Attribute) => void;
  deleteStoreAttribute: (attributeId: string) => void;
  deleteStoreReport: (reportId: string) => void;
  deleteStoreProject: (projectId: string) => void;
  deleteAttributeForProject: (attributeId: string) => void;
  addReportsToAdd: (newReports: File[]) => void;
  setReportsToAdd: (newReports: File[]) => void;
  updateStatus: (projectId: string, status: GenerationStatus) => void;
  updateResults: (projectId: string, results: { [key: string]: string }) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const useSustainabilityStore = create<SustainabilityStoreState>((set) => ({
  userId: '',
  projects: [],
  reports: [],
  reportsToAdd: [],
  attributes: [],
  setUserId: (userId) => set({ userId }),
  addProjects: (newProjects) =>
    set((state) => {
      const existingProjectIds = new Set(state.projects.map((project) => project.id));
      const filteredProjects = newProjects.filter((project) => !existingProjectIds.has(project.id));
      return { projects: [...state.projects, ...filteredProjects] };
    }),
  deleteStoreProject: (projectId) =>
    set((state) => ({
      projects: state.projects.filter((project) => project.id !== projectId),
    })),
  addAttributes: (newAttributes) =>
    set((state) => {
      const existingAttributeIds = new Set(state.attributes.map((attribute) => attribute.id));
      const filteredAttributes = newAttributes.filter((attribute) => !existingAttributeIds.has(attribute.id));
      return { attributes: [...state.attributes, ...filteredAttributes] };
    }),
  updateStoreAttribute: (attributeId, newAttribute) =>
    set((state) => ({
      attributes: state.attributes.map((attribute) => (attribute.id === attributeId ? newAttribute : attribute)),
    })),
  deleteStoreAttribute: (attributeId) =>
    set((state) => ({
      attributes: state.attributes.filter((attribute) => attribute.id !== attributeId),
    })),
  addReports: (newReports) =>
    set((state) => {
      const existingReportIds = new Set(state.reports.map((report) => report.id));
      const filteredReports = newReports.filter((report) => !existingReportIds.has(report.id));
      return { reports: [...state.reports, ...filteredReports] };
    }),
  isLoading: false,
  addReportsToAdd: (newReports) => set((state) => ({ reportsToAdd: [...state.reportsToAdd, ...newReports] })),
  setReportsToAdd: (newReports) => set({ reportsToAdd: newReports }),
  deleteStoreReport: (reportId) =>
    set((state) => ({
      reports: state.reports.filter((report) => report.id !== reportId),
    })),
  deleteAttributeForProject: (attributeId: string) => {
    set((state: { projects: Project[] }) => ({
      projects: state.projects.map((project) => ({
        ...project,
        projectResults: Object.fromEntries(
          Object.entries(project.projectResults).filter(([key]) => key !== attributeId)
        ),
      })),
    }));
  },
  updateResults: (projectId, results) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === projectId ? { ...project, projectResults: results } : project
      ),
    })),
  updateStatus: (projectId, status) =>
    set((state) => ({
      projects: state.projects.map((project) => (project.id === projectId ? { ...project, status } : project)),
    })),
  setIsLoading: (isLoading) => set({ isLoading }),
}));

export default useSustainabilityStore;
