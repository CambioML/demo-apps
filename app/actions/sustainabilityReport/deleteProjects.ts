import axios from 'axios';

interface IParams {
  userId: string;
  projectIds: string[];
}

export const deleteProjects = async ({ userId, projectIds }: IParams) => {
  const data = {
    userId: userId,
    projectIds: projectIds,
  };
  return await axios
    .post(process.env.NEXT_PUBLIC_PORTFOLIO_INSIGHT_API_URL + '/delete-projects', data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Error adding attribute. Please try again.');
      throw error;
    });
};
