'use client';

import { useState } from 'react';
import useSustainabilityReportModal from '@/app/hooks/sustainabilityReport/useSustainabilityReportModal';
import FormModal from './FormModal';
import Heading from '../Heading';
import { toast } from 'react-hot-toast';
import Dropzone from '../SustainabilityReport/Dropzone';
import useSustainabilityStore from '@/app/hooks/sustainabilityReport/useSustainabilityStore';

const SustainabilityReportModal = () => {
  const SustainabilityReportModal = useSustainabilityReportModal();
  const [isLoading, setIsLoading] = useState(false);
  const { addReports, reportsToAdd, setReportsToAdd } = useSustainabilityStore();

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      console.log('Reports to add:', reportsToAdd);
      addReports(reportsToAdd);
      SustainabilityReportModal.onClose();
    } catch (error) {
      toast.error('Add company failed. Please try again.');
    } finally {
      setReportsToAdd([]);
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setReportsToAdd([]);
    SustainabilityReportModal.onClose();
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="New CDP Report" subtitle="" center />
      <Dropzone />
      {reportsToAdd.length > 0 && (
        <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto">
          {reportsToAdd.map((report, index) => (
            <div key={index} className="text-gray-800 whitespace-nowrap bg-gray-200 rounded-full px-2 py-1">
              {report.sustainabilityReport.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <FormModal
      disabled={isLoading}
      isOpen={SustainabilityReportModal.isOpen}
      title=""
      actionLabel={`Add Report${reportsToAdd.length > 0 ? ` (${reportsToAdd.length})` : ''}`}
      onClose={handleClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default SustainabilityReportModal;
