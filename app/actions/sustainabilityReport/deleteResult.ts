import axios from 'axios';

interface IParams {
  userId: string;
  projectId: string;
  attributeId: string;
}

export const deleteResult = async ({ userId, projectId, attributeId }: IParams) => {
  console.log('Deleting result...', userId, projectId, attributeId);
  return await axios
    .delete(process.env.NEXT_PUBLIC_PORTFOLIO_INSIGHT_API_URL + '/delete-result', {
      params: {
        userId: userId,
        projectId: projectId,
        attributeId: attributeId,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Error deleting result. Please try again.');
      throw error;
    });
};
