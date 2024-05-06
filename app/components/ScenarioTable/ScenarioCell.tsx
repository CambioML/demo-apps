import generateScenario from '@/app/actions/generateScenario';
import processResponse from '@/app/actions/processResponse';
import useScenarioStore, { ScenarioState } from '@/app/hooks/useScenarioStore';
import { AxiosError, AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

interface ScenarioCellProps {
  colId: string;
  colIdx: number;
  rowIdx: number;
}

const ScenarioCell = ({ colIdx, rowIdx }: ScenarioCellProps) => {
  const { scenarios, setShowDetail, setSelectedScenarioIdx, updateScenario, selectedScenarioIdx } = useScenarioStore();

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
    if (!scenarios[rowIdx] || !scenarios[rowIdx][colIdx]) {
      console.log('Failed to generate scenario. Please try again.', scenarios);
      toast.error('Failed to generate scenario. Please try again.');
      return;
    }
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
      className={`w-full text-center cursor-pointer ${selectedScenarioIdx?.rowIdx === rowIdx && selectedScenarioIdx.colIdx === colIdx ? 'border-2 border-neutral-800 font-semibold' : 'border border-neutral-500'} py-4 rounded-lg  px-2 min-w-[200px] hover:text-white
      ${scenarios[rowIdx][colIdx].state === ScenarioState.READY && 'bg-violet-300 hover:bg-violet-600 '}
      ${scenarios[rowIdx][colIdx].state === ScenarioState.UPDATING && 'bg-amber-200 hover:bg-amber-400'}
      ${scenarios[rowIdx][colIdx].state === ScenarioState.UPDATED && 'bg-sky-300 hover:bg-sky-600'}
      `}
      onClick={handleScenarioClick}
    >
      {scenarios[rowIdx][colIdx].state === ScenarioState.READY && <>Generate Risk</>}
      {scenarios[rowIdx][colIdx].state === ScenarioState.UPDATING && <>Generating...</>}
      {scenarios[rowIdx][colIdx].state === ScenarioState.UPDATED && <>View Risk</>}
    </div>
  );
};

export default ScenarioCell;
