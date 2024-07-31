'use client';

import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useSustainabilityMetricModal from '@/app/hooks/sustainabilityReport/useSustainabilityMetricModal';
import FormModal from './FormModal';
import Heading from '../Heading';
import { toast } from 'react-hot-toast';
import { SustainabilityMetric } from '@/app/types/SustainabilityTypes';
import { Select, Option } from '@material-tailwind/react';
import { getMetricFromName, sustainabilityMetrics } from '@/app/data/sustainabilityReport';
import useSustainabilityStore from '@/app/hooks/sustainabilityReport/useSustainabilityStore';

const SustainabilityMetricModal = () => {
  const SustainabilityMetricModal = useSustainabilityMetricModal();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [optionMetrics, setOptionsMetrics] = useState<SustainabilityMetric[]>(sustainabilityMetrics);
  const { metrics, addMetric } = useSustainabilityStore();

  useEffect(() => {
    const newOptionMetrics = sustainabilityMetrics.filter((metric) => {
      return !metrics.some((m) => m.name === metric.name);
    });
    setOptionsMetrics(newOptionMetrics);
  }, [metrics]);

  const handleChange = (reportName: string) => {
    setValue('metric', reportName);
    setSelectedFile(reportName);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FieldValues>({});

  register('metric', { required: true });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      const metric = getMetricFromName(data.metric);
      if (!metric) {
        throw new Error('Company not found');
      }
      addMetric(metric);
      toast.success('Added Company!');
      SustainabilityMetricModal.onClose();
    } catch (error) {
      toast.error('Add metric failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Add Metric" subtitle="" center />
      <Select
        id="metric"
        label="Select a Metric"
        value={selectedFile}
        onChange={(e) => handleChange(e as string)}
        error={errors['metric'] !== undefined}
      >
        {optionMetrics.map((metric: SustainabilityMetric, i: number) => (
          <Option key={metric.name + i} value={metric.name}>
            {metric.name}
          </Option>
        ))}
      </Select>
    </div>
  );

  return (
    <FormModal
      disabled={isLoading}
      isOpen={SustainabilityMetricModal.isOpen}
      title=""
      actionLabel="Add Metric"
      onClose={SustainabilityMetricModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default SustainabilityMetricModal;
