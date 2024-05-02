import useInfoModal from '@/app/hooks/useInfoModal';
import useScenarioStore from '@/app/hooks/useScenarioStore';
import { ScenarioReference } from '@/app/types/ScenarioTypes';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface ReferenceLinkButtonProps {
  uuid: string;
}

const generateReferenceContent = (reference: ScenarioReference) => {
  return (
    <div className="flex flex-col">
      <div className="font-semibold text-lg">Title</div>
      <div>{reference.Title ? reference.Title : reference.Filename}</div>
      <div className="font-semibold font-semibold text-lg pt-4">Content</div>

      {reference.Metadata.DataSourceType === 'web' ? (
        <>
          <div>{JSON.parse(reference.Content).content}</div>
          <div className="font-semibold font-semibold text-lg pt-4">Source</div>
          <a href={reference.Filename} className="text-blue-500 underline" target="_blank" rel="noreferrer">
            {reference.Filename}
          </a>
        </>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: reference?.Content || 'Cannot retrieve reference' }} />
      )}
    </div>
  );
};

const ReferenceLinkButton = ({ uuid }: ReferenceLinkButtonProps) => {
  const { selectedScenarioIdx, scenarios } = useScenarioStore();
  const infoModal = useInfoModal();
  const [label, setLabel] = useState<string>('Ref');

  useEffect(() => {
    if (!selectedScenarioIdx) return;
    const scenario = scenarios[selectedScenarioIdx.rowIdx][selectedScenarioIdx.colIdx];
    const referenceIdx = scenario.references.findIndex((ref: ScenarioReference) => ref.ID === uuid);

    setLabel(`Ref ${referenceIdx + 1}`);
  }, []);

  const handleReferenceClick = () => {
    if (!selectedScenarioIdx) return;
    const scenario = scenarios[selectedScenarioIdx.rowIdx][selectedScenarioIdx.colIdx];
    console.log(scenario);
    const reference = scenario.references.find((ref: ScenarioReference) => ref.ID === uuid);
    if (!reference) {
      toast.error('Reference not found');
      return;
    }
    infoModal.setContent(generateReferenceContent(reference));
    infoModal.onOpen();
  };

  return (
    <button className="bg-neutral-100 hover:bg-neutral-200 px-1 rounded-sm" key={uuid} onClick={handleReferenceClick}>
      {label}
    </button>
  );
};

export default ReferenceLinkButton;
