export interface UploadParams {
  projectId: string;
  fileName: string;
  userId: string;
}

export interface PresignedResponse {
  presignedUrl: {
    fields: Record<string, string>;
    url: string;
  };
  s3_bucket: string;
  s3_prefix: string;
  fileId: string;
  userId: string;
}
