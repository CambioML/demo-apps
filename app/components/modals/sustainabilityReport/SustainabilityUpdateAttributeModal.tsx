'use client';

import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import FormModal from '../FormModal';
import Heading from '../../Heading';
import { toast } from 'react-hot-toast';
import { Input, Textarea } from '@material-tailwind/react';
import useSustainabilityUpdateAttributeModal from '@/app/hooks/sustainabilityReport/useSustainabilityUpdateAttributeModal';
import useSustainabilityStore from '@/app/hooks/sustainabilityReport/sustainabilityReportStore';
import { updateAttribute } from '@/app/actions/sustainabilityReport/updateAttribute';
import { Attribute } from '@/app/types/SustainabilityReportTypes';

const SustainabilityUpdateAttributeModal = () => {
  const SustainabilityUpdateAttributeModal = useSustainabilityUpdateAttributeModal();
  const [isLoading, setIsLoading] = useState(false);
  const { userId, updateStoreAttribute } = useSustainabilityStore();

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
      const attributeId = SustainabilityUpdateAttributeModal.attribute?.id;
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

      SustainabilityUpdateAttributeModal.onClose();
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
    SustainabilityUpdateAttributeModal.onClose();
  };

  const bodyContent = (
    <>
      <div className="flex flex-col gap-4">
        <Heading title="Update Attribute" subtitle="" center />
        <Input
          id="attribute-name"
          label="Attribute Name"
          defaultValue={SustainabilityUpdateAttributeModal.attribute?.name || ''}
          error={errors['attribute-name'] !== undefined}
          {...register('attribute-name', { required: true })}
        />
        <Textarea
          id="attribute-description"
          label="Attribute Description"
          defaultValue={SustainabilityUpdateAttributeModal.attribute?.description || ''}
          error={errors['attribute-description'] !== undefined}
          {...register('attribute-description', { required: true })}
        />
      </div>
    </>
  );

  return (
    <FormModal
      disabled={isLoading}
      isOpen={SustainabilityUpdateAttributeModal.isOpen}
      title=""
      actionLabel="Update"
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default SustainabilityUpdateAttributeModal;
