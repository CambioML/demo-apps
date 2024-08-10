'use client';

import { useState } from 'react';
import useSustainabilityReportUploadModal, {
  UploadModalState,
} from '@/app/hooks/sustainabilityReport/useSustainabilityReportUploadModal';
import FormModal from '../FormModal';
import Heading from '../../Heading';
import { toast } from 'react-hot-toast';
import Dropzone from '../../SustainabilityReport/Dropzone';
import useSustainabilityStore from '@/app/hooks/sustainabilityReport/sustainabilityReportStore';
import { CloudArrowUp } from '@phosphor-icons/react';
import { uploadFile } from '@/app/actions/sustainabilityReport/uploadFile';
import { AxiosError } from 'axios';
import useFetchSustainabilityData from '@/app/hooks/sustainabilityReport/useFetchSustainabilityData';

const SustainabilityReportUploadModal = () => {
  const SustainabilityReportUploadModal = useSustainabilityReportUploadModal();
  const [isLoading, setIsLoading] = useState(false);
  const { reportsToAdd, setReportsToAdd, userId } = useSustainabilityStore();
  const { fetchReports } = useFetchSustainabilityData();

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      console.log('Reports to add:', reportsToAdd);
      SustainabilityReportUploadModal.setUploadModalState(UploadModalState.UPLOADING);
      console.log('Uploading reports:', reportsToAdd);

      // Capture responses from uploadFile
      const uploadResponses = await Promise.all(
        reportsToAdd.map((report) =>
          uploadFile({
            file: report,
            userId,
          })
        )
      );

      console.log('Uploads complete', uploadResponses);
      fetchReports();
    } catch (error) {
      if (error instanceof AxiosError) {
        // Log the AxiosError details
        console.error('AxiosError occurred:', {
          message: error.message,
          code: error.code,
          response: error.response
            ? {
                status: error.response.status,
                data: error.response.data,
              }
            : null,
        });

        // Show a user-friendly error message
        toast.error('A network or server error occurred. Please try again.');
      } else {
        console.error('An error occurred:', error);
        toast.error('Add company failed. Please try again.');
      }
    } finally {
      SustainabilityReportUploadModal.setUploadModalState(UploadModalState.ADD_FILES);
      SustainabilityReportUploadModal.onClose();
      setReportsToAdd([]);
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setReportsToAdd([]);
    SustainabilityReportUploadModal.onClose();
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="New Report" subtitle="" center />
      {SustainabilityReportUploadModal.uploadModalState === UploadModalState.ADD_FILES && (
        <>
          <Dropzone />
          {reportsToAdd.length > 0 && (
            <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto">
              {reportsToAdd.map((report, index) => (
                <div key={index} className="text-gray-800 whitespace-nowrap bg-gray-200 rounded-full px-2 py-1">
                  {report.name}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {SustainabilityReportUploadModal.uploadModalState === UploadModalState.UPLOADING && (
        <div className="flex flex-col justify-center items-center gap-4 text-xl">
          Uploading
          <CloudArrowUp size={40} className="animate-pulse" />
        </div>
      )}
    </div>
  );

  return (
    <FormModal
      disabled={isLoading}
      isOpen={SustainabilityReportUploadModal.isOpen}
      title=""
      actionLabel={`Add Report${reportsToAdd.length > 0 ? ` (${reportsToAdd.length})` : ''}`}
      onClose={handleClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default SustainabilityReportUploadModal;
