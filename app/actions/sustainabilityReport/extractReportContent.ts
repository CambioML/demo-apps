import axios from 'axios';

interface IParams {
  userId: string;
  projectId: string;
  reportIds: string[];
}

export const extractReportContent = async ({ userId, projectId, reportIds }: IParams) => {
  const data = {
    userId: userId,
    projectId: projectId,
    reportIds: reportIds,
  };
  return await axios
    .post(process.env.NEXT_PUBLIC_PORTFOLIO_INSIGHT_API_URL + '/extract-content', data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Error adding attribute. Please try again.');
      throw error;
    });
};
