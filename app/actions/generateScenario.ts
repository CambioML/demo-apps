import axios, { AxiosError, AxiosResponse } from 'axios';
import pollSearchResult from './pollSearchResult';
import { Event, Stock } from '../types/ScenarioTypes';

interface IParams {
  handleSuccess: (response: AxiosResponse) => void;
  handleError: (error: AxiosError) => void;
  stock: Stock;
  event: Event;
}

type KnowledgeMap = {
  [key: string]: string;
};

const knowledgeBaseMap: KnowledgeMap = {
  AAPL: '2c80b37b-2a82-4996-925b-984bb7b39c2f',
};

const generateScenario = async ({ stock, event, handleSuccess, handleError }: IParams) => {
  const epsillaAPIKey = process.env.NEXT_PUBLIC_EPSILLA_API_KEY || '';
  const epsillaAPIUrl = process.env.NEXT_PUBLIC_EPSILLA_API_CREATE_URL || '';
  // const question = "What is Apple's exposure to Taiwan and China? What is the risk if the Taiwan war happened?";
  const question = `What is the exposure of ${stock.title} to this potential event: ${event.title}?
  Here's a description of the event:${event.description}
  What is the risk if ${event.title} happened?`;
  console.log('Generating scenario...\nQuestion:', question, '\nStock:', stock, '\nEvent:', event);

  await axios
    .post(
      epsillaAPIUrl,
      {
        question: question,
        knowledgeBase: knowledgeBaseMap[stock.id],
      },
      {
        headers: {
          'X-API-Key': epsillaAPIKey,
          'Content-Type': 'application/json',
        },
      }
    )
    .then((response) => {
      pollSearchResult({ searchId: response.data.result.searchId, handleSuccess, handleError });
    })
    .catch((error: AxiosError) => {
      console.error('Error:', error);
      handleError(error);
    });
};

export default generateScenario;
