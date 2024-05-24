import { AxiosResponse } from 'axios';
import { ScenarioState, UpdateScenarioArgs } from '@/app/hooks/useScenarioStore';
import toast from 'react-hot-toast';
import { Scenario } from '@/app/types/ScenarioTypes';

interface IParams {
  rowIdx: number;
  colIdx: number;
  scenario: Scenario;
  response: AxiosResponse;
  updateScenario: ({ rowIdx, colIdx, newScenario }: UpdateScenarioArgs) => void;
}

const processResponse = ({ response, rowIdx, colIdx, scenario, updateScenario }: IParams) => {
  try {
    const newDetail = JSON.parse(response.data.result.content.Answer);
    const newReferences = response.data.result.content.References;
    updateScenario({
      rowIdx,
      colIdx,
      newScenario: { ...scenario, state: ScenarioState.UPDATED, detail: newDetail, references: newReferences },
    });
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
