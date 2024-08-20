import axios from 'axios';

interface IParams {
  userId: string;
  projectIds: string[];
  rerunAll: boolean;
}

export const generateAttributes = async ({ userId, projectIds, rerunAll }: IParams) => {
  return await axios
    .post(process.env.NEXT_PUBLIC_PORTFOLIO_INSIGHT_API_URL + '/generate-attributes', {
      userId: userId,
      projectIds: projectIds,
      rerunAll: rerunAll,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Error generating attributes. Please try again.');
      throw error;
    });
};
