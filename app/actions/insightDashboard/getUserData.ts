import axios from 'axios';

interface IParams {
  userId: string;
}

export const getUserData = async ({ userId }: IParams) => {
  return await axios
    .get(process.env.NEXT_PUBLIC_INSIGHT_DASHBOARD_API_URL + '/get-user-data', {
      params: {
        userId: userId,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Error fetching projects. Please try again.');
      throw error;
    });
};
