export enum GenerationStatus {
  READY = 'READY',
  GENERATING = 'GENERATING',
  GENERATED = 'GENERATED',
}

export type Report = {
  id: string;
  name: string;
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
