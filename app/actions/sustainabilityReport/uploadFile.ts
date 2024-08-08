import axios from 'axios';
import toast from 'react-hot-toast';
import { PresignedResponse, UploadParams } from './apiInterface';

interface IParams {
  file: File | undefined;
  userId: string;
}

interface Config {
  params: UploadParams;
}

export const uploadFile = async ({ file, userId }: IParams) => {
  if (!file) {
    toast.error('No file selected');
    return;
  }
  const file_name = file.name;
  const getConfig: Config = {
    params: {
      userId: userId,
      fileName: file_name,
    },
  };

  return await axios
    .get<PresignedResponse>(process.env.NEXT_PUBLIC_PORTFOLIO_INSIGHT_API_URL + '/upload', getConfig)
    .then((response) => {
      const data = response.data as PresignedResponse;
      console.log(`PresignedResponse for ${file.name}:`, data);
      const postData = new FormData();
      Object.entries(data.presignedUrl.fields).forEach(([key, value]) => {
        postData.append(key, value);
      });
      postData.append('file', file);
      return axios
        .post(data.presignedUrl.url, postData)
        .then((response) => {
          if (response.status !== 204) {
            throw new Error(`Error uploading file: ${file.name}. Please try again.`);
          }
          return { reportId: data.fileId, response };
        })
        .catch((error) => {
          toast.error(`Error uploading file: ${file.name}. Please try again.`);
          return error;
        });
    })
    .catch((error) => {
      toast.error(`Error uploading file: ${file.name}. Please try again.`);
      return error;
    });
};
