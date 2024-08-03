'use client';

import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useSustainabilityMetricModal from '@/app/hooks/sustainabilityReport/useSustainabilityMetricModal';
import FormModal from './FormModal';
import Heading from '../Heading';
import { toast } from 'react-hot-toast';
import {
  SustainabilityMetric,
  SustainabilityMetricCategory,
  SustainabilityMetricClassification,
} from '@/app/types/SustainabilityTypes';
import { Select, Option, Button, Input, Typography, Textarea } from '@material-tailwind/react';
import { getMetricFromName, sustainabilityMetrics } from '@/app/data/sustainabilityReport';
import useSustainabilityStore from '@/app/hooks/sustainabilityReport/useSustainabilityStore';

enum PAGES {
  ADD_METRIC,
  ADD_CUSTOM_METRIC,
}

const SustainabilityMetricModal = () => {
  const SustainabilityMetricModal = useSustainabilityMetricModal();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [selectedClassification, setSelectedClassification] = useState<string>();
  const [selectedCategory, setSelectedCategory] = useState<string>();

  const [optionMetrics, setOptionsMetrics] = useState<SustainabilityMetric[]>(sustainabilityMetrics);
  const { metrics, addMetric } = useSustainabilityStore();
  const [page, setPage] = useState(PAGES.ADD_METRIC);

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

  const handleClassificationChange = (classification: string) => {
    setValue('metric-classification', classification);
    setSelectedClassification(classification);
  };

  const handleCategoryChange = (category: string) => {
    setValue('metric-category', category);
    setSelectedCategory(category);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FieldValues>({});
  register('metric', { required: page === PAGES.ADD_METRIC });
  register('metric-classification', { required: page === PAGES.ADD_CUSTOM_METRIC });
  register('metric-category', { required: page === PAGES.ADD_CUSTOM_METRIC });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      const metric = getMetricFromName(data.metric);
      if (!metric) {
        throw new Error('Company not found');
      }
      addMetric(metric);
      SustainabilityMetricModal.onClose();
    } catch (error) {
      toast.error('Add metric failed. Please try again.');
    } finally {
      setPage(PAGES.ADD_METRIC);
      setIsLoading(false);
      reset();
    }
  };

  const onSubmitCustomMetric: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      console.log(data);
      const newMetric: SustainabilityMetric = {
        name: data['metric-name'],
        question: data['metric-question'],
        classification: data['metric-classification'],
        category: data['metric-category'],
        baselineResponse: data['metric-baseline'],
        bestPractice: data['metric-best-practice'],
        TCFDDisclosureRequirements: data['metric-tcfd'],
        IFRSS2DisclosureRequirements: data['metric-ISFRS2'],
      };
      addMetric(newMetric);
      SustainabilityMetricModal.onClose();
    } catch (error) {
      toast.error('Add metric failed. Please try again.');
    } finally {
      setIsLoading(false);
      reset();
      setPage(PAGES.ADD_METRIC);
    }
  };

  const handleClose = () => {
    setIsLoading(false);
    reset();
    SustainabilityMetricModal.onClose();
    setPage(PAGES.ADD_METRIC);
  };

  const addMetricBodyContent = (
    <>
      <div className="flex flex-col gap-4">
        <Heading title="Add Metric" subtitle="" center />
        <Button fullWidth className="col-span-3 xl:col-span-1" onClick={() => setPage(PAGES.ADD_CUSTOM_METRIC)}>
          Add Custom Metric
        </Button>
        <div className="w-full flex items-center gap-4">
          <hr className="flex-1 border-t border-gray-300" />
          <span className="text-gray-500">OR</span>
          <hr className="flex-1 border-t border-gray-300" />
        </div>{' '}
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
    </>
  );

  const addMetricCustomBodyContent = (
    <>
      <div className="flex flex-col gap-4">
        <Heading title="Add Custom Metric" subtitle="" center />
        <Typography variant="h5">General</Typography>
        <Input
          id="metric-name"
          label="Metric Name"
          error={errors['metric-name'] !== undefined}
          {...register('metric-name', { required: page === PAGES.ADD_CUSTOM_METRIC })}
        />
        <Input
          id="metric-question"
          label="Metric Question"
          error={errors['metric-question'] !== undefined}
          {...register('metric-question', { required: page === PAGES.ADD_CUSTOM_METRIC })}
        />
        <Typography variant="h5">Category and Classification</Typography>
        <Select
          id="metric-classification"
          label="Classification"
          value={selectedClassification}
          onChange={(e) => handleClassificationChange(e as string)}
          error={errors['metric-classification'] !== undefined}
        >
          {Object.values(SustainabilityMetricClassification).map((classification, i) => (
            <Option key={classification + i} value={classification}>
              {classification}
            </Option>
          ))}
        </Select>
        <Select
          id="metric-category"
          label="Category"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e as string)}
          error={errors['metric-classification'] !== undefined}
        >
          {Object.values(SustainabilityMetricCategory).map((category, i) => (
            <Option key={category + i} value={category}>
              {category}
            </Option>
          ))}
        </Select>
        <Typography variant="h5">Baseline and Ideal</Typography>
        <Textarea
          id="metric-baseline"
          label="Baseline Response"
          error={errors['metric-baseline'] !== undefined}
          {...register('metric-baseline', { required: page === PAGES.ADD_CUSTOM_METRIC })}
        />
        <Textarea
          id="metric-best-practice"
          label="Best Practice"
          error={errors['metric-best-practice'] !== undefined}
          {...register('metric-best-practice', { required: page === PAGES.ADD_CUSTOM_METRIC })}
        />
        <Typography variant="h5">Disclosure Requirements</Typography>
        <Textarea
          id="metric-TCFD"
          label="TCFD Disclosure Requirements"
          error={errors['metric-tcfd'] !== undefined}
          {...register('metric-tcfd', { required: page === PAGES.ADD_CUSTOM_METRIC })}
        />
        <Textarea
          id="metric-ISFRS2"
          label="ISFR S2 Disclosure Requirements"
          error={errors['metric-ISFRS2'] !== undefined}
          {...register('metric-ISFRS2', { required: page === PAGES.ADD_CUSTOM_METRIC })}
        />
      </div>
    </>
  );

  if (page === PAGES.ADD_METRIC) {
    return (
      <FormModal
        disabled={isLoading}
        isOpen={SustainabilityMetricModal.isOpen}
        title=""
        actionLabel="Add Metric"
        onClose={handleClose}
        onSubmit={handleSubmit(onSubmit)}
        body={addMetricBodyContent}
      />
    );
  }

  if (page === PAGES.ADD_CUSTOM_METRIC) {
    return (
      <FormModal
        disabled={isLoading}
        isOpen={SustainabilityMetricModal.isOpen}
        title=""
        actionLabel="Add Custom Metric"
        onClose={handleClose}
        onSubmit={handleSubmit(onSubmitCustomMetric)}
        secondaryAction={() => setPage(PAGES.ADD_METRIC)}
        secondaryActionLabel="Back"
        body={addMetricCustomBodyContent}
      />
    );
  }
};

export default SustainabilityMetricModal;
