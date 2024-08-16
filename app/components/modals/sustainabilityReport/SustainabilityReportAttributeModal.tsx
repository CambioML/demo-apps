'use client';

import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import FormModal from '../FormModal';
import Heading from '../../Heading';
import { toast } from 'react-hot-toast';
import { Input, Select, Option, Textarea } from '@material-tailwind/react';
import useSustainabilityReportAttributeModal from '@/app/hooks/sustainabilityReport/useSustainabilityReportAttributeModal';
import { addAttribute } from '@/app/actions/sustainabilityReport/addAttribute';
import useSustainabilityStore from '@/app/hooks/sustainabilityReport/sustainabilityReportStore';
import useFetchSustainabilityData from '@/app/hooks/sustainabilityReport/useFetchSustainabilityData';
import { AttributeTemplates } from '@/app/data/SustainabilityReport';

enum AttributeModalState {
  NEW,
  TEMPLATE,
}

const SustainabilityReportAttributeModal = () => {
  const SustainabilityReportAttributeModal = useSustainabilityReportAttributeModal();
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useSustainabilityStore();
  const { fetchAttributes } = useFetchSustainabilityData();
  const [modalState, setModalState] = useState(AttributeModalState.NEW);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FieldValues>({});
  register('attribute-template', { required: modalState === AttributeModalState.TEMPLATE });

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

  const onSubmitTemplate: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      const attributes = JSON.parse(data['attribute-template']);
      console.log(attributes);
      for (const attribute of attributes) {
        await addAttribute({ userId, attributeName: attribute.name, attributeDescription: attribute.description });
      }
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

  const newBodyContent = (
    <>
      <div className="flex flex-col gap-4">
        <Heading title="New Attribute" subtitle="" center />
        <Input
          id="attribute-name"
          label="Attribute Name"
          error={errors['attribute-name'] !== undefined}
          {...register('attribute-name', { required: modalState === AttributeModalState.NEW })}
        />
        <Textarea
          id="attribute-description"
          label="Attribute Description"
          error={errors['attribute-description'] !== undefined}
          {...register('attribute-description', { required: modalState === AttributeModalState.NEW })}
          size="md"
        />
      </div>
    </>
  );

  const handleSelectChange = (value: string) => {
    setValue('attribute-template', value);
  };

  const templateBodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Template" subtitle="" center />
      <Select
        id="attribute-template"
        label="Select Template"
        onChange={(value) => handleSelectChange(value as string)} // Cast the value to string and handle change
      >
        {AttributeTemplates.map((template) => (
          <Option key={template.name} value={JSON.stringify(template.attributes)}>
            {template.name}
          </Option>
        ))}
      </Select>
      {errors['attribute-template'] && <p className="text-red-500 text-sm">Template selection is required.</p>}
    </div>
  );

  if (modalState === AttributeModalState.NEW) {
    return (
      <FormModal
        disabled={isLoading}
        isOpen={SustainabilityReportAttributeModal.isOpen}
        title=""
        actionLabel="Add Attribute"
        secondaryAction={() => setModalState(AttributeModalState.TEMPLATE)}
        secondaryActionLabel="Pick Template"
        onClose={handleClose}
        onSubmit={handleSubmit(onSubmit)}
        body={newBodyContent}
      />
    );
  }
  if (modalState === AttributeModalState.TEMPLATE) {
    return (
      <FormModal
        disabled={isLoading}
        isOpen={SustainabilityReportAttributeModal.isOpen}
        title=""
        actionLabel="Add Template"
        secondaryAction={() => setModalState(AttributeModalState.NEW)}
        secondaryActionLabel="Create New"
        onClose={handleClose}
        onSubmit={handleSubmit(onSubmitTemplate)}
        body={templateBodyContent}
      />
    );
  }
};

export default SustainabilityReportAttributeModal;
