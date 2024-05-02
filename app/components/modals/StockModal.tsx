'use client';

import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useStockModal from '@/app/hooks/useStockModal';
import FormModal from './FormModal';
import Heading from '../Heading';
import { toast } from 'react-hot-toast';
import Select from '../inputs/Select';
import useScenarioStore, { StockRowType } from '@/app/hooks/useScenarioStore';
import { Stock } from '@/app/types/ScenarioTypes';

const StockModal = () => {
  const StockModal = useStockModal();
  const [isLoading, setIsLoading] = useState(false);
  const { data, setData } = useScenarioStore();

  const options: Stock[] = [
    { id: 'AAPL', title: 'Apple' },
    { id: 'NVDA', title: 'Nvidia' },
    { id: 'TSLA', title: 'Tesla' },
  ];

  const addStock = (stockId: string, stockTitle: string) => {
    console.log('Adding stock', stockId, stockTitle);
    console.log('Current data:', data);
    // const newRow: StockRowType = { id: stockId, title: stockTitle };
    // // Update data state with new row
    // setData([...data, newRow]);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      stock: { id: '', title: '' },
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log('Submitting stock', data);
    try {
      setIsLoading(true);
      addStock(data.event.id, data.event.title);
      toast.success('Added Stock!');
      StockModal.onClose();
    } catch (error) {
      toast.error('Add stock failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Add Stock" subtitle="" center />
      <Select
        id="stock"
        disabled={isLoading}
        register={register}
        errors={errors}
        options={options}
        required
        callback={(option: Stock) => {
          setValue('stock', { id: option.id, title: option.title });
        }}
      />
    </div>
  );

  return (
    <FormModal
      disabled={isLoading}
      isOpen={StockModal.isOpen}
      title=""
      actionLabel="Add Stock"
      onClose={StockModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default StockModal;
