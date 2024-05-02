import axios, { AxiosError, AxiosResponse } from 'axios';

interface IParams {
  searchId: string;
  handleSuccess: (response: AxiosResponse) => void;
  handleError: (error: AxiosError) => void;
}
const getUrl = process.env.NEXT_PUBLIC_EPSILLA_API_SEARCH_GET_URL || '';
const epsillaAPIKey = process.env.NEXT_PUBLIC_EPSILLA_API_KEY || '';

const pollSearchResult = async ({ searchId, handleSuccess, handleError }: IParams) => {
  const timeoutDuration = 600000; // 10 minutes
  const pollInterval = 200; // 200 milliseconds
  const startTime = Date.now();
  const getConfig = {
    headers: {
      'X-API-Key': epsillaAPIKey,
      'Content-Type': 'application/json',
    },
  };
  const poll = async () => {
    if (Date.now() - startTime > timeoutDuration) {
      console.log('TIMEOUT');
      return;
    }
    axios
      .get(getUrl + `${searchId}`, getConfig)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.result.completed) {
            handleSuccess(response);
            return;
          } else {
            setTimeout(poll, pollInterval);
            return;
          }
        } else {
          return;
        }
      })
      .catch((e: AxiosError) => {
        console.error(e);
        handleError(e);
        return;
      });
  };
  poll();
};

export default pollSearchResult;
