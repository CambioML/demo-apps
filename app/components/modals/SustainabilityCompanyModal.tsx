'use client';

import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useSustainabilityCompanyModal from '@/app/hooks/sustainabilityReport/useSustainabilityCompanyModal';
import FormModal from './FormModal';
import Heading from '../Heading';
import { toast } from 'react-hot-toast';
import { Company } from '@/app/types/SustainabilityTypes';
import { Select, Option } from '@material-tailwind/react';
import { getCompanyFromReport, sustainabilityCompanies } from '@/app/data/sustainabilityReport';
import useSustainabilityStore from '@/app/hooks/sustainabilityReport/useSustainabilityStore';

const SustainabilityCompanyModal = () => {
  const SustainabilityCompanyModal = useSustainabilityCompanyModal();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [optionCompanies, setOptionsCompanies] = useState<Company[]>(sustainabilityCompanies);
  const { addCompany, companies } = useSustainabilityStore();

  useEffect(() => {
    const newOptionCompanies = sustainabilityCompanies.filter((company) => {
      return !companies.some((c) => c.sustainabilityReport === company.sustainabilityReport);
    });
    setOptionsCompanies(newOptionCompanies);
  }, [companies]);

  const handleChange = (reportName: string | undefined) => {
    if (!reportName) {
      return;
    }
    setValue('company', reportName);
    setSelectedFile(reportName);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FieldValues>({});

  register('company', { required: true });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      const company = getCompanyFromReport(data.company);
      if (!company) {
        throw new Error('Company not found');
      }
      addCompany(company);
      toast.success('Added Company!');
      SustainabilityCompanyModal.onClose();
    } catch (error) {
      toast.error('Add company failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Add Company" subtitle="" center />
      <Select
        id="company"
        label="Select a Company"
        value={selectedFile}
        onChange={handleChange} // Ensure the right value is extracted
        error={Boolean(errors['company'])}
      >
        {optionCompanies.map((company: Company) => (
          <Option key={company.sustainabilityReport} value={company.sustainabilityReport}>
            {company.companyName}
          </Option>
        ))}
      </Select>
    </div>
  );

  return (
    <FormModal
      disabled={isLoading}
      isOpen={SustainabilityCompanyModal.isOpen}
      title=""
      actionLabel="Add Company"
      onClose={SustainabilityCompanyModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default SustainabilityCompanyModal;
