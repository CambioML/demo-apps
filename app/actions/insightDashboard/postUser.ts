import axios from 'axios';

interface IParams {
  userId: string;
}

export const postUser = async ({ userId }: IParams) => {
  return await axios
    .post(process.env.NEXT_PUBLIC_INSIGHT_DASHBOARD_API_URL + '/user', {
      userId: userId,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('Error adding user. Please try again.');
      throw error;
    });
};
