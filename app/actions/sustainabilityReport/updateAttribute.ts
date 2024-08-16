import axios from 'axios';

interface IParams {
  userId: string;
  attributeId: string;
  attributeName: string;
  attributeDescription: string;
}

export const updateAttribute = async ({ userId, attributeId, attributeName, attributeDescription }: IParams) => {
  return await axios
    .patch(process.env.NEXT_PUBLIC_PORTFOLIO_INSIGHT_API_URL + '/update-attribute', {
      userId: userId,
      attributeId: attributeId,
      attributeName: attributeName,
      attributeDescription: attributeDescription,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Error updating attribute. Please try again.');
      throw error;
    });
};
