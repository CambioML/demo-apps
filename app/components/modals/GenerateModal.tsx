'use client';

import useGenerateModal from '@/app/hooks/useGenerateModal';
import Modal from './Modal';

const GenerateModal = () => {
  const GenerateModal = useGenerateModal();

  const bodyContent = (
    <div className="flex items-start justify-center w-auto h-full md:h-[500px] overflow-y-auto p-4">
      <div className="h-fit text-gray-700 p-1 flex flex-col items-start justify-start gap-2">
        {GenerateModal.content}
      </div>
    </div>
  );

  return <Modal isOpen={GenerateModal.isOpen} onClose={GenerateModal.onClose} body={bodyContent} />;
};

export default GenerateModal;
