'use client';

import { useState } from 'react';
import useSustainabilityReportProjectModal, {
  ProjectModalState,
} from '@/app/hooks/sustainabilityReport/useSustainabilityReportProjectModal';
import FormModal from '../FormModal';
import Heading from '../../Heading';
import { toast } from 'react-hot-toast';
import Dropzone from '../../SustainabilityReport/Dropzone';
import useSustainabilityStore from '@/app/hooks/sustainabilityReport/sustainabilityReportStore';
import { Blueprint, CloudArrowUp } from '@phosphor-icons/react';
import { uploadFile } from '@/app/actions/sustainabilityReport/uploadFile';
import { AxiosError } from 'axios';
import useFetchSustainabilityData from '@/app/hooks/sustainabilityReport/useFetchSustainabilityData';
import { addProject } from '@/app/actions/sustainabilityReport/addProject';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Input, Textarea } from '@material-tailwind/react';

const SustainabilityReportProjectModal = () => {
  const SustainabilityReportProjectModal = useSustainabilityReportProjectModal();
  const [isLoading, setIsLoading] = useState(false);
  const { reportsToAdd, setReportsToAdd, userId } = useSustainabilityStore();
  const { fetchAttributesThenProjects } = useFetchSustainabilityData();

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
      console.log('Creating Project', projectName, projectDescription);
      SustainabilityReportProjectModal.setProjectModalState(ProjectModalState.CREATING_PROJECT);

      const projectResponse = await addProject({
        userId: userId,
        projectName: projectName,
        projectDescription: projectDescription,
      });

      console.log('Project created:', projectResponse.projectId);
      SustainabilityReportProjectModal.setProjectModalState(ProjectModalState.UPLOADING);
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
      fetchAttributesThenProjects();
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
      SustainabilityReportProjectModal.setProjectModalState(ProjectModalState.ADD_FILES);
      SustainabilityReportProjectModal.onClose();
      setReportsToAdd([]);
      setIsLoading(false);
      reset();
    }
  };

  const handleClose = () => {
    setReportsToAdd([]);
    SustainabilityReportProjectModal.onClose();
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="New Company" subtitle="" center />
      {SustainabilityReportProjectModal.projectModalState === ProjectModalState.ADD_FILES && (
        <>
          <Input
            id="project-name"
            label="Company Name"
            error={errors['project-name'] !== undefined}
            {...register('project-name', { required: true })}
          />
          <Textarea
            id="project-description"
            label="Company Description"
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
      {SustainabilityReportProjectModal.projectModalState === ProjectModalState.CREATING_PROJECT && (
        <div className="flex flex-col justify-center items-center gap-4 text-xl">
          Creating Project
          <Blueprint size={40} className="animate-pulse" />
        </div>
      )}
      {SustainabilityReportProjectModal.projectModalState === ProjectModalState.UPLOADING && (
        <div className="flex flex-col justify-center items-center gap-4 text-xl">
          Uploading Files
          <CloudArrowUp size={40} className="animate-pulse" />
        </div>
      )}
    </div>
  );

  return (
    <FormModal
      disabled={isLoading}
      isOpen={SustainabilityReportProjectModal.isOpen}
      title=""
      actionLabel={`Add Company`}
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      actionDisabled={reportsToAdd.length === 0}
    />
  );
};

export default SustainabilityReportProjectModal;
