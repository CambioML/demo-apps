'use client';

import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { isAttribute, isReport } from '@/app/types/SustainabilityReportTypes';

import FormModal from '../FormModal';
import Heading from '../../Heading';
import { toast } from 'react-hot-toast';
import { Typography } from '@material-tailwind/react';
import useSustainabilityReportDeleteModal from '@/app/hooks/sustainabilityReport/useSustainabilityReportDeleteModal';
import useSustainabilityStore from '@/app/hooks/sustainabilityReport/sustainabilityReportStore';
import { deleteAttribute } from '@/app/actions/sustainabilityReport/deleteAttribute';
import { deleteReports } from '@/app/actions/sustainabilityReport/deleteReports';
import useFetchSustainabilityData from '@/app/hooks/sustainabilityReport/useFetchSustainabilityData';

const SustainabilityReportDeleteModal = () => {
  const SustainabilityReportDeleteModal = useSustainabilityReportDeleteModal();
  const [isLoading, setIsLoading] = useState(false);
  const { userId, deleteStoreAttribute } = useSustainabilityStore();
  const { fetchAttributesThenProjects } = useFetchSustainabilityData();
  const { handleSubmit, reset } = useForm<FieldValues>({});

  const onSubmit: SubmitHandler<FieldValues> = async () => {
    try {
      setIsLoading(true);
      const deleteItemId = SustainabilityReportDeleteModal.deleteItem?.id;
      if (!deleteItemId) {
        throw new Error('Delete ID is missing');
      }
      if (isAttribute(SustainabilityReportDeleteModal.deleteItem)) {
        await deleteAttribute({ userId, attributeId: deleteItemId });
        deleteStoreAttribute(deleteItemId);
      } else if (isReport(SustainabilityReportDeleteModal.deleteItem)) {
        await deleteReports({
          userId,
          projectId: SustainabilityReportDeleteModal.projectId,
          reportIds: [deleteItemId],
        });
        console.log('deleting report', JSON.stringify(SustainabilityReportDeleteModal.deleteItem));
      }
      SustainabilityReportDeleteModal.onClose();
      fetch;
    } catch (error) {
      toast.error('Delete deleteItem failed. Please try again.');
    } finally {
      setIsLoading(false);
      reset();
      fetchAttributesThenProjects();
    }
  };

  const handleClose = () => {
    setIsLoading(false);
    reset();
    SustainabilityReportDeleteModal.onClose();
  };

  const bodyContent = (
    <>
      <div className="flex flex-col gap-4 items-center">
        <Heading title={`Delete ${SustainabilityReportDeleteModal.deleteItem?.name}`} subtitle="" center />
        <Typography color="gray" variant="h5">
          {`Are you sure you want to delete ${SustainabilityReportDeleteModal.deleteItem?.name}?`}
        </Typography>
      </div>
    </>
  );

  return (
    <FormModal
      disabled={isLoading}
      isOpen={SustainabilityReportDeleteModal.isOpen}
      title=""
      actionLabel="Delete"
      secondaryActionLabel="Cancel"
      secondaryAction={() => handleClose()}
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      redAction={true}
    />
  );
};

export default SustainabilityReportDeleteModal;
