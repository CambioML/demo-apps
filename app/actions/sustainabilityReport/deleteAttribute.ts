import axios from 'axios';

interface IParams {
  userId: string;
  attributeId: string;
}

export const deleteAttribute = async ({ userId, attributeId }: IParams) => {
  const data = {
    userId: userId,
    attributeId: attributeId,
  };
  return await axios
    .patch(process.env.NEXT_PUBLIC_PORTFOLIO_INSIGHT_API_URL + '/delete-attribute', data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Error adding attribute. Please try again.');
      throw error;
    });
};
