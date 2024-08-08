export interface UploadParams {
  userId: string;
  fileName: string;
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
