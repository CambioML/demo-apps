import axios from 'axios';

interface IParams {
  userId: string;
  attributeName: string;
  attributeDescription: string;
}

export const addAttribute = async ({ userId, attributeName, attributeDescription }: IParams) => {
  return await axios
    .post(process.env.NEXT_PUBLIC_PORTFOLIO_INSIGHT_API_URL + '/add-attribute', {
      userId: userId,
      attributeName: attributeName,
      attributeDescription: attributeDescription,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Error fetching reports. Please try again.');
      throw error;
    });
};
