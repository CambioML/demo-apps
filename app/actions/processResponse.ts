import { AxiosResponse } from 'axios';
import { Scenario } from '../types/ScenarioTypes';
import { ScenarioState, UpdateScenarioArgs } from '../hooks/useScenarioStore';
import toast from 'react-hot-toast';

interface IParams {
  rowIdx: number;
  colIdx: number;
  scenario: Scenario;
  response: AxiosResponse;
  updateScenario: ({ rowIdx, colIdx, newScenario }: UpdateScenarioArgs) => void;
}

const processResponse = ({ response, rowIdx, colIdx, scenario, updateScenario }: IParams) => {
  try {
    console.log('success', response.data);
    const newDetail = JSON.parse(response.data.result.content.Answer);
    const newReferences = response.data.result.content.References;
    updateScenario({
      rowIdx,
      colIdx,
      newScenario: { ...scenario, state: ScenarioState.UPDATED, detail: newDetail, references: newReferences },
    });
    console.log('newDetail', newDetail);
    console.log('newReferences', newReferences);
  } catch (error) {
    console.error('error', error);
    toast.error('Error processing response. Please try again.');
    updateScenario({
      rowIdx,
      colIdx,
      newScenario: { ...scenario, state: ScenarioState.READY },
    });
  }
};

export default processResponse;
