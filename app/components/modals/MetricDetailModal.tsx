'use client';

import useMetricDetailModal from '@/app/hooks/sustainabilityReport/useMetricDetailModal';
import Heading from '../Heading';
import Modal from './Modal';

const MetricDetailModal = () => {
  const { isOpen, onClose, metricName, metricFeedback, metricColor, metricLevel } = useMetricDetailModal();
  const bodyContent = (
    <div className="h-full w-full flex flex-col gap-4">
      <div className="flex flex-col w-full items-center justify-center">
        <Heading title={metricName} subtitle="" center />
        <span className={`${metricColor} text-white py-2 px-4 rounded-xl text-xl`}>{metricLevel}</span>
      </div>
      <div className="h-[70vh] min-h-[300px] w-full overflow-auto flex flex-col">
        {metricFeedback &&
          Object.entries(metricFeedback).map(([key, value], index) => (
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

  return <Modal isOpen={isOpen} onClose={onClose} body={bodyContent} />;
};

export default MetricDetailModal;
