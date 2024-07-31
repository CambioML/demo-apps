'use client';

import useMetricDetailModal from '@/app/hooks/sustainabilityReport/useMetricDetailModal';
import Heading from '../Heading';
import Modal from './Modal';

const MetricDetailModal = () => {
  const MetricDetailModal = useMetricDetailModal();
  const bodyContent = (
    <div className="h-full w-full flex flex-col gap-4">
      <Heading title={MetricDetailModal.metricName} subtitle="" center />
      <div className="h-[70vh] min-h-[300px] w-full overflow-auto flex flex-col">
        {MetricDetailModal.metricFeedback &&
          Object.entries(MetricDetailModal.metricFeedback).map(([key, value], index) => (
            <div key={key} className={`flex flex-col gap-2 p-4 ${index % 2 === 1 && 'bg-gray-100'}`}>
              <div className="flex gap-2">
                <div className="w-1/3 font-semibold">{key}</div>
                <div className="w-2/3 whitespace-pre-line">{value}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );

  return <Modal isOpen={MetricDetailModal.isOpen} onClose={MetricDetailModal.onClose} body={bodyContent} />;
};

export default MetricDetailModal;
