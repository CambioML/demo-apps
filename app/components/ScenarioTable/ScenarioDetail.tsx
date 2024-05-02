import useScenarioStore, { ScenarioState } from '@/app/hooks/useScenarioStore';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../UI/LoadingSpinner';
import { ArrowCounterClockwise, X } from '@phosphor-icons/react';
import Button from '../Button';
import { AxiosError, AxiosResponse } from 'axios';
import toast from 'react-hot-toast';
import generateScenario from '@/app/actions/generateScenario';
import { Scenario } from '@/app/types/ScenarioTypes';
import DetailTable from './DetailTable';
import processResponse from '@/app/actions/processResponse';

const Tag = ({ tag }: { tag: string | undefined }) => {
  return tag ? <div className="bg-neutral-100 rounded-full px-4 py-2 text-lg">{tag}</div> : null;
};

const ScenarioDetail = () => {
  const { selectedScenarioIdx, scenarios, updateScenario } = useScenarioStore();
  const [selectedScenario, setSelectedScenario] = useState<Scenario>();

  useEffect(() => {
    if (!selectedScenarioIdx || !scenarios[selectedScenarioIdx.rowIdx]) return;
    setSelectedScenario(scenarios[selectedScenarioIdx.rowIdx][selectedScenarioIdx.colIdx]);
  }, [selectedScenarioIdx, scenarios]);

  const handleSuccess = (response: AxiosResponse) => {
    if (!selectedScenarioIdx || !selectedScenario) return;
    processResponse({
      response,
      rowIdx: selectedScenarioIdx.rowIdx,
      colIdx: selectedScenarioIdx.colIdx,
      scenario: selectedScenario,
      updateScenario,
    });
  };

  const handleError = (error: AxiosError) => {
    console.error('error', error);
    toast.error('Failed to generate scenario');
    if (!selectedScenarioIdx || !selectedScenario) return;

    updateScenario({
      rowIdx: selectedScenarioIdx.rowIdx,
      colIdx: selectedScenarioIdx.colIdx,
      newScenario: { ...selectedScenario, state: ScenarioState.READY },
    });
  };

  const handleGenerateRetry = async () => {
    if (!selectedScenarioIdx || !selectedScenario) return;

    updateScenario({
      rowIdx: selectedScenarioIdx?.rowIdx,
      colIdx: selectedScenarioIdx?.colIdx,
      newScenario: { ...selectedScenario, state: ScenarioState.UPDATING },
    });
    await generateScenario({
      handleSuccess,
      stock: selectedScenario.stock,
      event: selectedScenario.event,
      handleError,
    });
  };

  return (
    <div className="w-full h-full flex flex-col items-start justify-center gap-4">
      {selectedScenario?.state === ScenarioState.READY && (
        <div className="w-full h-full flex items-center justify-center">
          <Button label="Generate" onClick={handleGenerateRetry} labelIcon={ArrowCounterClockwise} small />
        </div>
      )}
      {selectedScenario?.state === ScenarioState.UPDATING && (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            Generating <span className="font-semibold">{selectedScenario?.stock.id}</span>
            <X size={16} />
            <span className="font-semibold">{selectedScenario?.event.title}</span>
          </div>
          <LoadingSpinner />
        </div>
      )}
      {selectedScenario?.state === ScenarioState.UPDATED && (
        <>
          <div className="p-4 flex w-full items-center justify-center shrink-0 text-xl gap-2">
            <Tag tag={selectedScenario?.stock.id} />
            <X className="text-sky-500 shrink-0" size={20} />
            <Tag tag={selectedScenario?.event.title} />
          </div>
          <div className="flex flex-col items-start w-full h-full overflow-auto relative border-solid border-2 border-neutral-100 rounded-lg min-h-[600px]">
            <DetailTable detail={selectedScenario?.detail} />
          </div>
          <Button label="Regenerate" onClick={handleGenerateRetry} labelIcon={ArrowCounterClockwise} small />
        </>
      )}
    </div>
  );
};

export default ScenarioDetail;
