export enum GenerationStatus {
  READY = 'READY',
  GENERATING = 'GENERATING',
  GENERATED = 'GENERATED',
}

export type Report = {
  id: string;
  name: string;
};

export type Dashboard = {
  dashboardId: string;
  dashboardName: string;
  dashboardDescription: string;
  projectLabel: string;
  attributes: Attribute[];
  projects: Project[];
};

export type Project = {
  id: string;
  name: string;
  description: string;
  projectResults: { [key: string]: string };
  reports: Report[];
  status: GenerationStatus;
};

export type RawProject = {
  id: string;
  name: string;
  description: string;
  lastUpdateAt: string;
  createdAt: string;
  userId: string;
};

export type Attribute = {
  id: string;
  name: string;
  description: string;
};

export type RawReport = {
  extractedContent: string;
  lastUpdatedTimestamp: string;
  originalFileName: string;
  reportId: string;
  results: { [key: string]: string };
  s3Bucket: string;
  s3Prefix: string;
  uploadedTimestamp: string;
  userId: string;
};

export function isReport(obj: any): obj is Report {
  // Ensure obj has the Report-specific fields
  return (
    obj &&
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    !('projectResults' in obj) && // Ensure it doesn't have Project-specific fields
    !('reports' in obj) &&
    !('type' in obj) && // Ensure it doesn't have Attribute-specific fields
    !('description' in obj)
  );
}

export function isProject(obj: any): obj is Project {
  return (
    obj &&
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.description === 'string' &&
    typeof obj.projectResults === 'object'
  );
}

export function isAttribute(obj: any): obj is Attribute {
  return (
    obj &&
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.description === 'string' &&
    !('projectResults' in obj) && // Ensure it doesn't have Project-specific fields
    !('reports' in obj) && // Ensure it doesn't have Project-specific fields
    !('status' in obj)
  ); // Ensure it doesn't have Project-specific fields
}
