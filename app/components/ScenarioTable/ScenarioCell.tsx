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
  const { scenarios, showDetail, setShowDetail, setSelectedScenarioIdx, updateScenario, selectedScenarioIdx, data } =
    useScenarioStore();

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
    console.log('Current data', data);
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

  const getStateStyles = () => {
    if (scenarios[rowIdx][colIdx].state === ScenarioState.READY) return 'bg-gray-500 hover:shadow-md ';
    if (scenarios[rowIdx][colIdx].state === ScenarioState.UPDATING) return 'bg-gray-900 animate-pulse';
    return 'bg-gray-900';
  };

  return (
    <div className="w-full h-[50px] py-1 px-2">
      <div
        className={`w-full h-full text-md flex items-center justify-center text-center cursor-pointer text-white ${selectedScenarioIdx?.rowIdx === rowIdx && selectedScenarioIdx.colIdx === colIdx && showDetail ? 'border-2 border-gray-800 font-bold' : 'font-semibold'} rounded-lg  px-2 min-w-[200px]
      ${getStateStyles()}
      `}
        onClick={handleScenarioClick}
      >
        {scenarios[rowIdx][colIdx].state === ScenarioState.READY && <>GENERATE RISK</>}
        {scenarios[rowIdx][colIdx].state === ScenarioState.UPDATING && <>GENERATING...</>}
        {scenarios[rowIdx][colIdx].state === ScenarioState.UPDATED && <>VIEW</>}
      </div>
    </div>
  );
};

export default ScenarioCell;
