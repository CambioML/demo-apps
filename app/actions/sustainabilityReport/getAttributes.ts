import axios from 'axios';

interface IParams {
  userId: string;
}

export const getAttributes = async ({ userId }: IParams) => {
  return await axios
    .get(process.env.NEXT_PUBLIC_PORTFOLIO_INSIGHT_API_URL + '/get-attributes', {
      params: {
        userId: userId,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Error fetching attributes. Please try again.');
      throw error;
    });
};
