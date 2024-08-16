'use client';

import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import FormModal from '../FormModal';
import Heading from '../../Heading';
import { toast } from 'react-hot-toast';
import { Typography } from '@material-tailwind/react';
import useSustainabilityReportDeleteModal from '@/app/hooks/sustainabilityReport/useSustainabilityReportDeleteModal';
import useSustainabilityStore from '@/app/hooks/sustainabilityReport/sustainabilityReportStore';
import { deleteAttribute } from '@/app/actions/sustainabilityReport/deleteAttribute';

const SustainabilityReportDeleteModal = () => {
  const SustainabilityReportDeleteModal = useSustainabilityReportDeleteModal();
  const [isLoading, setIsLoading] = useState(false);
  const { userId, deleteStoreAttribute } = useSustainabilityStore();

  const { handleSubmit, reset } = useForm<FieldValues>({});

  const onSubmit: SubmitHandler<FieldValues> = async () => {
    try {
      setIsLoading(true);
      const attributeId = SustainabilityReportDeleteModal.attribute?.id;
      if (!attributeId) {
        throw new Error('Attribute ID is missing');
      }
      await deleteAttribute({ userId, attributeId });
      deleteStoreAttribute(attributeId);
      SustainabilityReportDeleteModal.onClose();
    } catch (error) {
      toast.error('Add attribute failed. Please try again.');
    } finally {
      setIsLoading(false);
      reset();
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
        <Heading title={`Delete ${SustainabilityReportDeleteModal.attribute?.name}`} subtitle="" center />
        <Typography color="gray" variant="h5">
          Are you sure you want to delete this attribute?
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
    />
  );
};

export default SustainabilityReportDeleteModal;
