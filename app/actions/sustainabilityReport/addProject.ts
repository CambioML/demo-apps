import axios from 'axios';

interface IParams {
  userId: string;
  projectName: string;
  projectDescription: string;
}

export const addProject = async ({ userId, projectName, projectDescription }: IParams) => {
  return await axios
    .post(process.env.NEXT_PUBLIC_PORTFOLIO_INSIGHT_API_URL + '/add-project', {
      userId: userId,
      projectName: projectName,
      projectDescription: projectDescription,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Error adding project. Please try again.');
      throw error;
    });
};
