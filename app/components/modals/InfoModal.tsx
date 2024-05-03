'use client';

import useInfoModal from '@/app/hooks/useInfoModal';
import Modal from './Modal';

const InfoModal = () => {
  const InfoModal = useInfoModal();

  const bodyContent = (
    <div className="flex items-start justify-center w-full h-full md:h-fit md:max-h-[80vh] overflow-y-auto p-4">
      <div className="h-fit text-neutral-700 p-1 flex flex-col items-start justify-start gap-2 w-full">
        {InfoModal.content}
      </div>
    </div>
  );

  return <Modal isOpen={InfoModal.isOpen} onClose={InfoModal.onClose} body={bodyContent} />;
};

export default InfoModal;
