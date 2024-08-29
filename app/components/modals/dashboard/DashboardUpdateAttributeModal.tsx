'use client';

import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import FormModal from '../FormModal';
import Heading from '../../Heading';
import { toast } from 'react-hot-toast';
import { Input, Textarea } from '@material-tailwind/react';
import useDashboardUpdateAttributeModal from '@/app/hooks/InsightDashboard/useDashboardUpdateAttributeModal';
import useDashboardStore from '@/app/hooks/InsightDashboard/dashboardStore';
import { updateAttribute } from '@/app/actions/sustainabilityReport/updateAttribute';
import { Attribute } from '@/app/types/SustainabilityReportTypes';

const DashboardUpdateAttributeModal = () => {
  const DashboardUpdateAttributeModal = useDashboardUpdateAttributeModal();
  const [isLoading, setIsLoading] = useState(false);
  const { userId, updateStoreAttribute } = useDashboardStore();

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
      const attributeId = DashboardUpdateAttributeModal.attribute?.id;
      if (!attributeId) {
        throw new Error('Attribute ID is missing');
      }
      await updateAttribute({ userId, attributeId, attributeName, attributeDescription });
      const updatedAttribute: Attribute = {
        id: attributeId,
        name: attributeName,
        description: attributeDescription,
      };
      updateStoreAttribute(attributeId, updatedAttribute);

      DashboardUpdateAttributeModal.onClose();
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
    DashboardUpdateAttributeModal.onClose();
  };

  const bodyContent = (
    <>
      <div className="flex flex-col gap-4">
        <Heading title="Update Attribute" subtitle="" center />
        <Input
          id="attribute-name"
          label="Attribute Name"
          defaultValue={DashboardUpdateAttributeModal.attribute?.name || ''}
          error={errors['attribute-name'] !== undefined}
          {...register('attribute-name', { required: true })}
        />
        <Textarea
          id="attribute-description"
          label="Attribute Description"
          defaultValue={DashboardUpdateAttributeModal.attribute?.description || ''}
          error={errors['attribute-description'] !== undefined}
          {...register('attribute-description', { required: true })}
        />
      </div>
    </>
  );

  return (
    <FormModal
      disabled={isLoading}
      isOpen={DashboardUpdateAttributeModal.isOpen}
      title=""
      actionLabel="Update"
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default DashboardUpdateAttributeModal;
