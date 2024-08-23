'use client';

import { useState } from 'react';
import useSustainabilityReportAddFileModal, {
  AddFileModalState,
} from '@/app/hooks/sustainabilityReport/useSustainabilityReportAddFileModal';
import FormModal from '../FormModal';
import Heading from '../../Heading';
import { toast } from 'react-hot-toast';
import Dropzone from '../../SustainabilityReport/Dropzone';
import useSustainabilityStore from '@/app/hooks/sustainabilityReport/sustainabilityReportStore';
import { CloudArrowUp, FileMagnifyingGlass } from '@phosphor-icons/react';
import { uploadFile } from '@/app/actions/sustainabilityReport/uploadFile';
import { AxiosError } from 'axios';
import useFetchSustainabilityData from '@/app/hooks/sustainabilityReport/useFetchSustainabilityData';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { extractReportContent } from '@/app/actions/sustainabilityReport/extractReportContent';

const SustainabilityReportAddFileModal = () => {
  const SustainabilityReportAddFileModal = useSustainabilityReportAddFileModal();
  const [isLoading, setIsLoading] = useState(false);
  const { reportsToAdd, setReportsToAdd, userId, projects } = useSustainabilityStore();
  const { fetchAttributesThenProjects } = useFetchSustainabilityData();

  const { handleSubmit, reset } = useForm<FieldValues>({});

  const onSubmit: SubmitHandler<FieldValues> = async () => {
    try {
      setIsLoading(true);
      SustainabilityReportAddFileModal.setAddFileModalState(AddFileModalState.UPLOADING);
      console.log('Uploading reports:', reportsToAdd);

      const uploadResponses = await Promise.all(
        reportsToAdd.map((report) =>
          uploadFile({
            file: report,
            projectId: SustainabilityReportAddFileModal.projectId,
            userId: userId,
          })
        )
      );

      console.log('Uploads complete', uploadResponses);
      SustainabilityReportAddFileModal.setAddFileModalState(AddFileModalState.EXTRACTING_CONTENT);
      console.log('Extracting content:', reportsToAdd);

      // Capture responses from uploadFile
      const extractionResponse = await extractReportContent({
        projectId: SustainabilityReportAddFileModal.projectId,
        userId: userId,
        reportIds: uploadResponses.map((response) => response.reportId),
      });

      console.log('Extraction complete complete', extractionResponse);
      fetchAttributesThenProjects();
      await fetchAttributesThenProjects();
    } catch (error) {
      if (error instanceof AxiosError) {
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

        toast.error('A network or server error occurred. Please try again.');
      } else {
        console.error('An error occurred:', error);
        toast.error('Add company failed. Please try again.');
      }
    } finally {
      SustainabilityReportAddFileModal.setAddFileModalState(AddFileModalState.ADD_FILES);
      SustainabilityReportAddFileModal.onClose();
      setReportsToAdd([]);
      setIsLoading(false);
      reset();
    }
  };

  const handleClose = () => {
    setReportsToAdd([]);
    SustainabilityReportAddFileModal.onClose();
  };

  const getProjectName = () => {
    const projectIds = projects.filter((project) => project.id === SustainabilityReportAddFileModal.projectId);
    if (projectIds[0]) return projectIds[0].name;
    return '';
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title={`Add Files to ${getProjectName()}`} subtitle="" center />
      {SustainabilityReportAddFileModal.addFileModalState === AddFileModalState.ADD_FILES && (
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
      {SustainabilityReportAddFileModal.addFileModalState === AddFileModalState.UPLOADING && (
        <div className="flex flex-col justify-center items-center gap-4 text-xl">
          Uploading Files
          <CloudArrowUp size={40} className="animate-pulse" />
        </div>
      )}
      {SustainabilityReportAddFileModal.addFileModalState === AddFileModalState.EXTRACTING_CONTENT && (
        <div className="flex flex-col justify-center items-center gap-4 text-xl">
          Extracting Content
          <FileMagnifyingGlass size={40} className="animate-pulse" />
        </div>
      )}
    </div>
  );

  return (
    <FormModal
      disabled={isLoading}
      isOpen={SustainabilityReportAddFileModal.isOpen}
      title=""
      actionLabel={`Add File ${reportsToAdd.length > 0 ? `(${reportsToAdd.length})` : ''}`}
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      actionDisabled={reportsToAdd.length === 0}
    />
  );
};

export default SustainabilityReportAddFileModal;
