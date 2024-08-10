import axios from 'axios';

interface IParams {
  userId: string;
}

export const getReports = async ({ userId }: IParams) => {
  return await axios
    .get(process.env.NEXT_PUBLIC_PORTFOLIO_INSIGHT_API_URL + '/get-reports', {
      params: {
        userId: userId,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Error fetching reports. Please try again.');
      throw error;
    });
};
