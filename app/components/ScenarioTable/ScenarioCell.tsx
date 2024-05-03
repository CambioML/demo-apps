import generateScenario from '@/app/actions/generateScenario';
import processResponse from '@/app/actions/processResponse';
import useScenarioStore, { ScenarioState } from '@/app/hooks/useScenarioStore';
import { AxiosError, AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

interface ScenarioCellProps {
  children: React.ReactNode;
  colId: string;
  colIdx: number;
  rowIdx: number;
}

const ScenarioCell = ({ children, colIdx, rowIdx }: ScenarioCellProps) => {
  const { scenarios, setShowDetail, setSelectedScenarioIdx, updateScenario } = useScenarioStore();

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
    console.log('[handleScenarioClick: scenarios', scenarios, rowIdx, colIdx);
    const newScenario = scenarios[rowIdx][colIdx];
    console.log('newScenario', newScenario, rowIdx, colIdx);
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
      {children}
    </div>
  );
};

export default ScenarioCell;
