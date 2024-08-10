'use client';

import { useState } from 'react';
import useCDPSustainabilityReportModal from '@/app/hooks/CDPsustainabilityReport/useCDPSustainabilityReportModal';
import FormModal from './FormModal';
import Heading from '../Heading';
import { toast } from 'react-hot-toast';
import Dropzone from '../CDPSustainabilityReport/Dropzone';
import useCDPSustainabilityStore from '@/app/hooks/CDPsustainabilityReport/useCDPSustainabilityStore';

const CDPSustainabilityReportModal = () => {
  const CDPSustainabilityReportModal = useCDPSustainabilityReportModal();
  const [isLoading, setIsLoading] = useState(false);
  const { addReports, reportsToAdd, setReportsToAdd } = useCDPSustainabilityStore();

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      console.log('Reports to add:', reportsToAdd);
      addReports(reportsToAdd);
      CDPSustainabilityReportModal.onClose();
    } catch (error) {
      toast.error('Add company failed. Please try again.');
    } finally {
      setReportsToAdd([]);
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setReportsToAdd([]);
    CDPSustainabilityReportModal.onClose();
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
      isOpen={CDPSustainabilityReportModal.isOpen}
      title=""
      actionLabel={`Add Report${reportsToAdd.length > 0 ? ` (${reportsToAdd.length})` : ''}`}
      onClose={handleClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default CDPSustainabilityReportModal;
