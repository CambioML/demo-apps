'use client';

import { useState } from 'react';
import useDashboardProjectModal, { ProjectModalState } from '@/app/hooks/InsightDashboard/useDashboardProjectModal';
import FormModal from '../FormModal';
import Heading from '../../Heading';
import { toast } from 'react-hot-toast';
import Dropzone from './Dropzone';
import { Blueprint, CloudArrowUp, FileMagnifyingGlass } from '@phosphor-icons/react';
import { uploadFile } from '@/app/actions/sustainabilityReport/uploadFile';
import { AxiosError } from 'axios';
import { addProject } from '@/app/actions/sustainabilityReport/addProject';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Input, Textarea } from '@material-tailwind/react';
import { extractReportContent } from '@/app/actions/sustainabilityReport/extractReportContent';
import useFetchData from '@/app/hooks/InsightDashboard/useFetchData';
import useDashboardStore from '@/app/hooks/InsightDashboard/dashboardStore';

interface DashboardProjectModalProps {
  projectLabel: string;
}

const DashboardProjectModal = ({ projectLabel = 'Project' }: DashboardProjectModalProps) => {
  const DashboardProjectModal = useDashboardProjectModal();
  const [isLoading, setIsLoading] = useState(false);
  const { reportsToAdd, setReportsToAdd, userId } = useDashboardStore();
  const { fetchAllData } = useFetchData();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({});

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      const { 'project-name': projectName, 'project-description': projectDescription } = data;
      console.log('Creating Project', projectName, projectDescription, userId);
      DashboardProjectModal.setProjectModalState(ProjectModalState.CREATING_PROJECT);

      const projectResponse = await addProject({
        userId: userId,
        projectName: projectName,
        projectDescription: projectDescription,
      });

      console.log('Project created:', projectResponse.projectId);
      DashboardProjectModal.setProjectModalState(ProjectModalState.UPLOADING);
      console.log('Uploading reports:', reportsToAdd);

      // Capture responses from uploadFile
      const uploadResponses = await Promise.all(
        reportsToAdd.map((report) =>
          uploadFile({
            file: report,
            projectId: projectResponse.projectId,
            userId: userId,
          })
        )
      );

      console.log('Uploads complete', uploadResponses);
      DashboardProjectModal.setProjectModalState(ProjectModalState.EXTRACTING_CONTENT);
      console.log('Extracting content:', reportsToAdd);

      // Capture responses from uploadFile
      const extractionResponse = await extractReportContent({
        projectId: projectResponse.projectId,
        userId: userId,
        reportIds: uploadResponses.map((response) => response.reportId),
      });

      console.log('Extraction complete complete', extractionResponse);
      fetchAllData();
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
      DashboardProjectModal.setProjectModalState(ProjectModalState.ADD_FILES);
      DashboardProjectModal.onClose();
      setReportsToAdd([]);
      setIsLoading(false);
      reset();
    }
  };

  const handleClose = () => {
    setReportsToAdd([]);
    DashboardProjectModal.onClose();
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title={`New ${projectLabel}`} subtitle="" center />
      {DashboardProjectModal.projectModalState === ProjectModalState.ADD_FILES && (
        <>
          <Input
            id="project-name"
            label={`${projectLabel} Name`}
            error={errors['project-name'] !== undefined}
            {...register('project-name', { required: true })}
          />
          <Textarea
            id="project-description"
            label={`${projectLabel} Description`}
            error={errors['project-description'] !== undefined}
            {...register('project-description', { required: true })}
            size="md"
          />{' '}
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
      {DashboardProjectModal.projectModalState === ProjectModalState.CREATING_PROJECT && (
        <div className="flex flex-col justify-center items-center gap-4 text-xl">
          Creating {projectLabel}
          <Blueprint size={40} className="animate-pulse" />
        </div>
      )}
      {DashboardProjectModal.projectModalState === ProjectModalState.UPLOADING && (
        <div className="flex flex-col justify-center items-center gap-4 text-xl">
          Uploading Files
          <CloudArrowUp size={40} className="animate-pulse" />
        </div>
      )}
      {DashboardProjectModal.projectModalState === ProjectModalState.EXTRACTING_CONTENT && (
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
      isOpen={DashboardProjectModal.isOpen}
      title=""
      actionLabel={`Add ${projectLabel}`}
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      actionDisabled={reportsToAdd.length === 0}
    />
  );
};

export default DashboardProjectModal;
