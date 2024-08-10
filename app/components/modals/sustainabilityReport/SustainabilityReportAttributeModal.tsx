'use client';

import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import FormModal from '../FormModal';
import Heading from '../../Heading';
import { toast } from 'react-hot-toast';
import { Input } from '@material-tailwind/react';
import useSustainabilityReportAttributeModal from '@/app/hooks/sustainabilityReport/useSustainabilityReportAttributeModal';
import { addAttribute } from '@/app/actions/sustainabilityReport/addAttribute';
import useSustainabilityStore from '@/app/hooks/sustainabilityReport/sustainabilityReportStore';
import useFetchSustainabilityData from '@/app/hooks/sustainabilityReport/useFetchSustainabilityData';

const SustainabilityReportAttributeModal = () => {
  const SustainabilityReportAttributeModal = useSustainabilityReportAttributeModal();
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useSustainabilityStore();
  const { fetchAttributes } = useFetchSustainabilityData();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({});

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      const { 'attribute-name': attributeName, 'attribute-description': attributeDescription } = data;
      console.log(attributeName, attributeDescription);
      await addAttribute({ userId, attributeName, attributeDescription });
      fetchAttributes();
      SustainabilityReportAttributeModal.onClose();
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
    SustainabilityReportAttributeModal.onClose();
  };

  const bodyContent = (
    <>
      <div className="flex flex-col gap-4">
        <Heading title="New Attribute" subtitle="" center />
        <Input
          id="attribute-name"
          label="Attribute Name"
          error={errors['attribute-name'] !== undefined}
          {...register('attribute-name', { required: true })}
        />
        <Input
          id="attribute-description"
          label="Attribute Description"
          error={errors['attribute-description'] !== undefined}
          {...register('attribute-description', { required: true })}
        />
      </div>
    </>
  );

  return (
    <FormModal
      disabled={isLoading}
      isOpen={SustainabilityReportAttributeModal.isOpen}
      title=""
      actionLabel="Add Attribute"
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default SustainabilityReportAttributeModal;
