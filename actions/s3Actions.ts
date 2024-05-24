'use server';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

interface uploadFileToS3Props {
  fileForm: FormData;
}

export const uploadFileToS3 = async ({ fileForm }: uploadFileToS3Props) => {
  // Configure AWS with your credentials
  const accessKeyId = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || '';
  const secretAccessKey = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || '';
  const bucketName = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME || '';
  const region = process.env.NEXT_PUBLIC_AWS_REGION || '';

  if (!accessKeyId || !secretAccessKey || !bucketName || !region) {
    throw new Error('Missing AWS configuration');
  }

  const credentials = {
    accessKeyId,
    secretAccessKey,
  };
  const s3Client = new S3Client({ credentials, region });

  const file = fileForm.get('file') as File;
  if (!file) {
    throw new Error('No file provided');
  }

  // Convert the file to a Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const params = {
    Bucket: bucketName,
    Key: file.name, // You can customize the key (file name) as needed
    Body: buffer,
    ContentType: file.type, // Ensure the correct MIME type is set
  };

  try {
    // Upload file to S3
    const command = new PutObjectCommand(params);
    const response = await s3Client.send(command);
    console.log('File uploaded successfully', response);
  } catch (error) {
    console.error('Error uploading file', error);
  }
};
