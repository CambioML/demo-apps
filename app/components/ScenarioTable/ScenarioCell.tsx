import generateScenario from '@/app/actions/generateScenario';
import processResponse from '@/app/actions/processResponse';
import useScenarioStore, { ScenarioState } from '@/app/hooks/useScenarioStore';
import { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface ScenarioCellProps {
  colId: string;
  colIdx: number;
  rowIdx: number;
}

const ScenarioCell = ({ colIdx, rowIdx }: ScenarioCellProps) => {
  const { scenarios, setShowDetail, setSelectedScenarioIdx, updateScenario } = useScenarioStore();
  const [label, setLabel] = useState<string>('View Risk');

  useEffect(() => {
    const state = scenarios[rowIdx][colIdx].state;
    if (state === ScenarioState.READY) {
      setLabel('Generate Risk');
    } else if (state === ScenarioState.UPDATING) {
      setLabel('Updating...');
    } else if (state === ScenarioState.UPDATED) {
      setLabel('View Risk');
    }
  }, [scenarios, colIdx, rowIdx]);

  const handleSuccess = (response: AxiosResponse) => {
    const newScenario = scenarios[rowIdx][colIdx];
    processResponse({
      response,
      rowIdx,
      colIdx,
      scenario: newScenario,
      updateScenario,
    });
  };

  const handleError = (error: AxiosError) => {
    console.error('error', error);
    toast.error('Failed to generate scenario. Please try again.');
    const newScenario = scenarios[rowIdx][colIdx];
    updateScenario({
      rowIdx,
      colIdx,
      newScenario: { ...newScenario, state: ScenarioState.READY },
    });
  };

  const handleScenarioClick = async () => {
    const newScenario = scenarios[rowIdx][colIdx];
    setSelectedScenarioIdx({ rowIdx, colIdx });
    setShowDetail(true);
    if (newScenario.state === ScenarioState.READY) {
      updateScenario({
        rowIdx,
        colIdx,
        newScenario: { ...newScenario, state: ScenarioState.UPDATING },
      });
      await generateScenario({ handleSuccess, stock: newScenario.stock, event: newScenario.event, handleError });
    }
  };

  return (
    <div
      className="w-full text-center cursor-pointer border border-neutral-500 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-500 hover:text-white
      px-2
      "
      onClick={handleScenarioClick}
    >
      {label}
    </div>
  );
};

export default ScenarioCell;
