export enum GenerationStatus {
  READY = 'READY',
  GENERATING = 'GENERATING',
  GENERATED = 'GENERATED',
}

export type Report = {
  id: string;
  name: string;
  reportResults: { [key: string]: string };
  status: GenerationStatus;
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
