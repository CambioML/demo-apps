import axios from 'axios';

interface IParams {
  userId: string;
}

export const getProjects = async ({ userId }: IParams) => {
  return await axios
    .get(process.env.NEXT_PUBLIC_PORTFOLIO_INSIGHT_API_URL + '/get-projects', {
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
