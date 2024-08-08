export enum GenerationStatus {
  READY = 'READY',
  GENERATING = 'GENERATING',
  GENERATED = 'GENERATED',
}

export type Report = {
  id: string;
  name: string;
  reportResults: { attributeName: string; attributeResult: string }[];
  status: GenerationStatus;
};

export type Attribute = {
  id: string;
  attributeName: string;
  attributeDescription: string;
};

export type RawReport = {
  extractedContent: string;
  lastUpdatedTimestamp: string;
  originalFileName: string;
  reportId: string;
  results: { attributeName: string; attributeResult: string }[];
  s3Bucket: string;
  s3Prefix: string;
  uploadedTimestamp: string;
  userId: string;
};
